#!/usr/bin/env node
// Roster gate. Exit 1 with a list of failures.
// Usage: node scripts/studio/check-roster.mjs
// Bundles the TypeScript data with esbuild into the OS temp dir (nothing is written to the repo).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);
const esbuild = require(path.join(ROOT, 'node_modules', 'esbuild'));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'roster-check-'));
const fails = [];
const fail = (m) => fails.push(m);

async function load(rel, name) {
  const outfile = path.join(tmp, `${name}.mjs`);
  await esbuild.build({
    entryPoints: [path.join(ROOT, rel)],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    absWorkingDir: ROOT,
    nodePaths: [path.join(ROOT, 'node_modules')],
    logLevel: 'error',
    loader: { '.json': 'json' },
  });
  return import(pathToFileURL(outfile).href);
}

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

try {
  const roster = await load('lib/data/roster.ts', 'roster');
  const schema = await load('lib/data/roster.schema.ts', 'schema');
  const claims = await load('lib/data/evidence/claims.ts', 'claims');
  const phone = await load('lib/data/app-screens.ts', 'screens');
  const { ROSTER, LIVE, MIREMBE_PORTFOLIO_NAMES } = roster;

  // 1. schema
  const keys = new Set();
  for (const a of ROSTER) {
    const r = schema.RosterAppSchema.safeParse(a);
    if (!r.success) fail(`${a.key}: schema: ${r.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
    if (keys.has(a.key)) fail(`${a.key}: duplicate key`);
    keys.add(a.key);
    if (a.key.includes('-')) fail(`${a.key}: key contains a hyphen`);
    if (contrast(a.accentInk, a.paper) < 4.5) fail(`${a.key}: accentInk on paper is ${contrast(a.accentInk, a.paper).toFixed(2)}:1, need 4.5`);
  }

  // 2. live count equals the claim, and is 17
  const claim = claims.CLAIMS.find((c) => c.id === 'studio.live-count');
  if (!claim) fail('claim studio.live-count is missing');
  else if (claim.status !== 'verified') fail('claim studio.live-count must be verified');
  else if (Number(claim.value) !== LIVE.length) fail(`live count ${LIVE.length} does not equal claim studio.live-count ${claim.value}`);
  if (LIVE.length !== 17) fail(`live count is ${LIVE.length}, expected 17`);

  // 3. facts
  const by = Object.fromEntries(ROSTER.map((a) => [a.key, a]));
  for (const k of ['watchsankofa', 'sankofasessions']) if (by[k]?.status !== 'in-development') fail(`${k} must be in-development`);
  if (by.trueaccess?.relationship !== 'co-founded') fail('trueaccess must be co-founded');
  if (by.trueaccess && /\bclient\b|50\/50/i.test(`${by.trueaccess.name} ${by.trueaccess.line} ${by.trueaccess.host}`)) fail('trueaccess copy must not say "client"');
  if (by.taektwo?.relationship !== 'venture') fail('taektwo must be venture');

  // 4. names equal the dated portfolio list
  const a = LIVE.map((x) => x.name).sort().join('|');
  const b = [...MIREMBE_PORTFOLIO_NAMES.names].sort().join('|');
  if (a !== b) fail(`live names differ from MIREMBE_PORTFOLIO_NAMES (${MIREMBE_PORTFOLIO_NAMES.asOf})`);

  // 5. cross-references exist in their stores
  for (const x of ROSTER) {
    if (x.phone) {
      const n = phone.SCREENS.filter((s) => s.app === x.phone).length;
      if (!n) fail(`${x.key}: phone '${x.phone}' has no screens`);
      const sa = phone.STUDIO_APPS.find((s) => s.key === x.phone);
      if (sa && (sa.paper !== x.paper || sa.accent !== x.accent || sa.accentInk !== x.accentInk)) fail(`${x.key}: paper/accent differ from STUDIO_APPS`);
    }
    if (x.cover.kind === 'phone' && !phone.SCREEN_BY_ID[x.cover.id]) fail(`${x.key}: phone cover ${x.cover.id} not found`);
    if (x.cover.kind === 'phone' && x.cover.kind && !x.phone) fail(`${x.key}: phone cover without phone key`);
    if (x.desk) {
      const f = path.join(ROOT, 'lib', 'data', 'evidence', x.desk, 'screens.json');
      if (!fs.existsSync(f)) fail(`${x.key}: no screens.json for desk '${x.desk}'`);
      else {
        const scr = JSON.parse(fs.readFileSync(f, 'utf8'));
        if (x.cover.kind === 'desk' && !scr.some((s) => s.id === x.cover.id)) fail(`${x.key}: desk cover ${x.cover.id} not in screens.json`);
        for (const s of scr) if (!s.reviewed) fail(`${x.key}: desk screen ${s.id} has no reviewed date`);
      }
    }
    if (x.cover.kind === 'desk' && !x.desk) fail(`${x.key}: desk cover without desk key`);
    if (x.caseFile) {
      const f = path.join(ROOT, 'lib', 'data', 'evidence', x.caseFile, 'case.ts');
      if (!fs.existsSync(f)) fail(`${x.key}: case file '${x.caseFile}' missing`);
    }
  }
} catch (e) {
  fail(`could not load data: ${e.message}`);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (fails.length) {
  console.error(`check-roster: ${fails.length} problem(s)`);
  for (const f of fails) console.error(' - ' + f);
  process.exit(1);
}
console.log('check-roster: ok');
