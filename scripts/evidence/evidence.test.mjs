// Evidence Wing tests. Run: node --test scripts/evidence/
// Zero dependencies. .ts is compiled on the fly with esbuild into os.tmpdir().
// Missing expected files FAIL (never skip).
import { test, describe, mock, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);
const P = (...p) => path.join(ROOT, ...p);
const EV = P('lib', 'data', 'evidence');
const PUB = P('public', 'evidence-dev', 'adminos');

let tmp;
before(() => { tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'evidence-test-')); });
after(() => { if (tmp) fs.rmSync(tmp, { recursive: true, force: true }); });

function mustExist(file) {
  assert.ok(fs.existsSync(file), `expected file is missing: ${path.relative(ROOT, file)}`);
  return file;
}

async function compile(entryRel, name) {
  const entry = mustExist(P(...entryRel.split('/')));
  const esbuild = require(P('node_modules', 'esbuild'));
  const outfile = path.join(tmp, `${name}.mjs`);
  await esbuild.build({
    entryPoints: [entry], bundle: true, format: 'esm', platform: 'node',
    outfile, logLevel: 'silent', absWorkingDir: ROOT,
  });
  return import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
}

const readJson = (f) => JSON.parse(fs.readFileSync(mustExist(f), 'utf8'));

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next') continue;
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const STATUSES = new Set(['verified', 'self-reported', 'pending-source', 'retired']);

let claimsMod, mediaMod, casesMod, adminosCase, screens, manifest;
before(async () => {
  claimsMod = await compile('lib/data/evidence/claims.ts', 'claims');
  mediaMod = await compile('lib/data/evidence/media.ts', 'media');
  casesMod = await compile('lib/data/evidence/cases.ts', 'cases');
  screens = readJson(path.join(EV, 'adminos', 'screens.json'));
  manifest = readJson(path.join(EV, 'adminos', 'manifest.json'));
  adminosCase = casesMod.getCase('adminos');
});

function claimIdsInCase(c) {
  const ids = [];
  for (const s of c.slides) ids.push(...(s.claimIds ?? []));
  for (const n of c.arch) ids.push(...(n.claimIds ?? []));
  for (const p of c.proof) if (p.kind === 'claim') ids.push(p.claimId);
  ids.push(...c.coverClaims);
  return ids;
}

describe('Stale or unsourced claim', () => {
  test('every claim has value, ISO asOf, asOfLabel, source and an allowed status', () => {
    assert.ok(claimsMod.CLAIMS.length > 0, 'CLAIMS is empty');
    for (const c of claimsMod.CLAIMS) {
      const ctx = `claim ${c.id}`;
      assert.ok(typeof c.value === 'string' && c.value.trim(), `${ctx}: value`);
      assert.match(c.asOf, /^\d{4}-\d{2}(-\d{2})?$/, `${ctx}: asOf`);
      assert.ok(typeof c.asOfLabel === 'string' && c.asOfLabel.trim(), `${ctx}: asOfLabel`);
      assert.ok(typeof c.source === 'string' && c.source.trim(), `${ctx}: source`);
      assert.ok(STATUSES.has(c.status), `${ctx}: status ${c.status}`);
      if (c.sourceUrl !== undefined) assert.match(c.sourceUrl, /^https:\/\//, `${ctx}: sourceUrl must be https`);
    }
  });

  test('claim ids are unique', () => {
    const ids = claimsMod.CLAIMS.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length, 'duplicate claim id');
  });

  test('every claimId referenced from the adminos case resolves and none is retired', () => {
    assert.ok(adminosCase, 'getCase("adminos") returned nothing');
    const byId = new Map(claimsMod.CLAIMS.map((c) => [c.id, c]));
    const ids = claimIdsInCase(adminosCase);
    assert.ok(ids.length > 0, 'no claim ids referenced at all');
    for (const id of ids) {
      assert.ok(byId.has(id), `unresolved claimId: ${id}`);
      assert.notEqual(byId.get(id).status, 'retired', `retired claim referenced: ${id}`);
    }
  });
});

describe('Media base misconfigured in prod', () => {
  const r = (raw, prod) => mediaMod.resolveMediaBase(raw, prod);

  test('unset falls back to /evidence-dev in dev and prod', () => {
    assert.equal(r(undefined, false), '/evidence-dev');
    assert.equal(r(undefined, true), '/evidence-dev');
  });

  test('accepts a site-relative path and the media origin', () => {
    assert.equal(r('/x', true), '/x');
    assert.equal(r('https://media.creativelynanda.co.za', true), 'https://media.creativelynanda.co.za');
  });

  for (const bad of ['http://media.creativelynanda.co.za', 'https://evil.com', 'javascript:alert(1)', '//evil.com']) {
    test(`rejects ${bad}: dev warns and falls back, prod throws`, () => {
      const warn = mock.method(console, 'warn', () => {});
      try {
        assert.equal(r(bad, false), '/evidence-dev');
        assert.equal(warn.mock.callCount(), 1, 'dev must warn');
      } finally { warn.mock.restore(); }
      assert.throws(() => r(bad, true));
    });
  }
});

describe('Redaction bypass and Missing image 404: screens and manifest', () => {
  test('every screen id exists in the manifest with w, h and widths', () => {
    assert.ok(Array.isArray(screens) && screens.length > 0, 'screens.json empty');
    for (const s of screens) {
      const m = manifest[s.id];
      assert.ok(m, `screen ${s.id} missing from manifest.json`);
      assert.ok(Number.isInteger(m.w) && m.w > 0, `${s.id}: w`);
      assert.ok(Number.isInteger(m.h) && m.h > 0, `${s.id}: h`);
      assert.ok(Array.isArray(m.widths) && m.widths.length > 0, `${s.id}: widths`);
    }
  });

  test('every screen has alt, caption and a reviewed date; manifest entry is redacted or screen is reviewed', () => {
    for (const s of screens) {
      assert.ok(s.alt && s.alt.trim(), `${s.id}: alt`);
      assert.ok(s.caption && s.caption.trim(), `${s.id}: caption`);
      assert.match(String(s.reviewed ?? ''), /^\d{4}-\d{2}-\d{2}$/, `${s.id}: reviewed`);
      assert.ok(manifest[s.id].redacted === true || s.reviewed, `${s.id}: neither redacted nor reviewed`);
    }
  });

  test('every listed webp and avif derivative exists under public/evidence-dev/adminos', () => {
    assert.ok(fs.existsSync(PUB), 'public/evidence-dev/adminos missing (run scripts/evidence/build-derivatives.mjs)');
    for (const s of screens) {
      const m = manifest[s.id];
      for (const w of m.widths) mustExist(path.join(PUB, `${s.id}-${w}.webp`));
      for (const w of m.avif ?? []) mustExist(path.join(PUB, `${s.id}-${w}.avif`));
    }
  });

  test('no file in public/evidence-dev/adminos lacks a manifest entry and no master.png is present', () => {
    const files = fs.readdirSync(PUB);
    for (const f of files) {
      assert.ok(!/\.master\.png$/i.test(f), `unredacted master in public: ${f}`);
      const m = f.match(/^(.+)-(\d+)\.(webp|avif)$/);
      assert.ok(m, `unexpected file in public/evidence-dev/adminos: ${f}`);
      const entry = manifest[m[1]];
      assert.ok(entry, `file without manifest entry: ${f}`);
      const list = m[3] === 'webp' ? entry.widths : entry.avif ?? [];
      assert.ok(list.includes(Number(m[2])), `file not listed in manifest: ${f}`);
    }
  });
});

describe('Case file integrity', () => {
  test('getCase returns adminos and undefined for anything else', () => {
    assert.ok(casesMod.getCase('adminos'));
    assert.equal(casesMod.getCase('other'), undefined);
  });

  test('every screen id used by slides, journey, heroScreens and video poster exists in screens.json', () => {
    const known = new Set(screens.map((s) => s.id));
    const used = [
      ...adminosCase.slides.map((s) => s.screen).filter(Boolean),
      ...adminosCase.journey.map((j) => j.screen),
      ...adminosCase.heroScreens,
      adminosCase.video.posterScreen,
    ];
    assert.ok(used.length > 0);
    for (const id of used) assert.ok(known.has(id), `unknown screen id: ${id}`);
  });

  test('journey has 5 stops and all are sample data', () => {
    assert.equal(adminosCase.journey.length, 5);
    for (const j of adminosCase.journey) assert.equal(j.sampleData, true, `${j.day}: sampleData`);
  });

  test('coverClaims has exactly 3 entries', () => {
    assert.equal(adminosCase.coverClaims.length, 3);
  });

  test('liveUrl is https and any sourceUrl in claims or case is https', () => {
    assert.match(adminosCase.liveUrl, /^https:\/\//);
    for (const c of claimsMod.CLAIMS) if (c.sourceUrl) assert.match(c.sourceUrl, /^https:\/\//, c.id);
    const walkObj = (o, trail) => {
      if (Array.isArray(o)) return o.forEach((v, i) => walkObj(v, `${trail}[${i}]`));
      if (o && typeof o === 'object') {
        for (const [k, v] of Object.entries(o)) {
          if (k === 'sourceUrl' && v) assert.match(v, /^https:\/\//, `${trail}.sourceUrl`);
          walkObj(v, `${trail}.${k}`);
        }
      }
    };
    walkObj(adminosCase, 'case');
  });
});

describe('Route indexed / in sitemap: routes are private', () => {
  test('every app/forge/cases page sets noIndex: true', () => {
    const pages = walk(P('app', 'forge', 'cases')).filter((f) => /[\\/]page\.(tsx|ts|jsx|js)$/.test(f));
    assert.ok(pages.length >= 2, `expected index and [app] pages, found ${pages.length}`);
    for (const f of pages) {
      assert.match(fs.readFileSync(f, 'utf8'), /noIndex:\s*true/, `${path.relative(ROOT, f)} lacks noIndex: true`);
    }
  });

  test('sitemap and navigation do not mention /forge/cases', () => {
    const sm = fs.readdirSync(P('app')).filter((f) => /^sitemap\./.test(f));
    assert.ok(sm.length > 0, 'app/sitemap.* not found');
    for (const f of sm) assert.ok(!fs.readFileSync(P('app', f), 'utf8').includes('/forge/cases'), `${f} lists /forge/cases`);
    const nav = fs.readFileSync(mustExist(P('components', 'layout', 'Navigation.tsx')), 'utf8');
    assert.ok(!nav.includes('/forge/cases'), 'Navigation.tsx links /forge/cases');
  });

  test('no inbound links to /forge/cases from app/, components/ or lib/ outside the wing itself', () => {
    const skip = [P('app', 'forge', 'cases'), P('components', 'forge', 'evidence')];
    const offenders = [];
    for (const dir of [P('app'), P('components'), P('lib')]) {
      for (const f of walk(dir)) {
        if (skip.some((s) => f.startsWith(s + path.sep))) continue;
        if (!/\.(tsx?|jsx?|mjs|json|mdx?)$/.test(f)) continue;
        if (fs.readFileSync(f, 'utf8').includes('/forge/cases')) offenders.push(path.relative(ROOT, f));
      }
    }
    assert.deepEqual(offenders, []);
  });
});

describe('Content rules (check-content.mjs)', () => {
  test('lib/data/evidence, components/forge/evidence and app/forge/cases have zero content hits', async () => {
    const { scanRoot } = await import(pathToFileURL(P('scripts', 'evidence', 'check-content.mjs')).href);
    const hits = scanRoot(ROOT);
    assert.deepEqual(hits.map((h) => `${h.file}:${h.line} [${h.rule}] ${h.text}`), []);
  });
});
