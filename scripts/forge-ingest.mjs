// Ingest every build journal Nanda has written — across GitHub repos, the
// OneDrive dossier folder, and this repo's project-docs — and parse them into
// one structured corpus for The Forge wing.
//
//   node scripts/forge-ingest.mjs
//
// Emits lib/data/forge-corpus.json (the manifest the /forge rooms consume) and
// prints a coverage report.
//
// The journals are INTERNAL writing. They contain security findings, client
// names and cost figures. Nothing here is publishable on ingest: every entry
// lands with `review: 'pending'`, and anything matching the sensitivity probe
// is additionally marked `sensitive: true`. Curation is a separate, human gate
// — see docs/THE_FORGE.md. This script only ever reads and classifies.

import { scrubCredentials, isSensitive } from './lib/redact-credentials.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ONEDRIVE = join(ROOT, '..', '..');

// ─── Sources ────────────────────────────────────────────────────────────────
// kind: 'diary'      → chronological, newest-first, one h2 per work session
//       'dossier'    → thematic (Vision / Stack / Architecture / Phase N)
//       'chronicle'  → the foundation projects (Brief / Build / Lesson)
//
// priority breaks ties when the same section survives in two sources. The git
// copies are the ones Nanda keeps updated, so they outrank the OneDrive folder.
const SOURCES = [
  // The war diaries — written as the work happened.
  { app: 'JarvisOS',         kind: 'diary',    priority: 3, file: join(ONEDRIVE, 'JarvisOS', 'BUILD_JOURNEY.md') },
  { app: 'AdminOS',          kind: 'diary',    priority: 3, gh: ['AdminOS', 'BUILD_JOURNEY.md'] },
  { app: 'BB MotherShip',    kind: 'diary',    priority: 3, gh: ['BB-MotherShip-Deluxe', 'BUILD_JOURNEY.md'] },
  { app: 'K53 Drill Master', kind: 'diary',    priority: 3, gh: ['nanda-k53-drill-master', 'BUILDLOG_k53.md'] },
  { app: 'Sankofa Sessions', kind: 'diary',    priority: 3, gh: ['sankofasessions', 'BUILD_JOURNEY_SANKOFASESSIONS.md'] },

  // The dossiers — written after the fact, as architecture record. For several
  // of these apps (StokvelOS, WatchSankofa, Campus Compass) this is the only source.
  { app: 'AdminOS',          kind: 'dossier',  priority: 2, gh: ['AdminOS', 'BUILD_JOURNEY_ADMINOS.md'] },
  { app: 'AdminOS',          kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'adminos-build-journey.md') },
  { app: 'CreativelyNanda',  kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'creativelynanda-build-journey.md') },
  { app: 'K53 Drill Master', kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'k53-build-journey.md') },
  { app: 'WatchSankofa',     kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'sankofatv-build-journey.md') },
  { app: 'StokvelOS',        kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'stokvelos-build-journey.md') },
  { app: 'TrueAccess',       kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'trueaccess-build-journey.md') },
  { app: 'Campus Compass',   kind: 'dossier',  priority: 1, file: join(ONEDRIVE, 'build-journeys', 'varsityos-build-journey.md') },

  // The foundation chronicle — nine projects, Brief / Build / Lesson.
  { app: 'Foundations', kind: 'chronicle', priority: 3, file: join(ROOT, 'project-docs', 'BUILD_JOURNEY_WhereItStarted.md') },
];

// ─── Section classifier ─────────────────────────────────────────────────────
// Ordered most-specific first: the first hit wins. Vocabulary is taken from the
// headings that actually recur in the journals, not from what a build log is
// assumed to contain. `Gotchas`, `Verified` and `Open / next` alone account for
// a large share of JarvisOS's subsections.
const CLASSES = [
  // Scaffolding first: file lists, route lists and env-var references are the
  // bulk of what looks "unclassified", and they are neither narrative nor
  // publishable. Catching them early stops them polluting the story classes.
  ['manifest',     /^(api routes?|files?\b|env\b|environment variables?|required env|env vars|new database tables?|database\b|db applied|inngest workers?|zustand store|typescript|types?$|migration files?|new enum types?|dependencies|integrations|notion env|to activate|what was added|changes$|new files)/i],
  ['scar',         /gotcha|battle scar|silent failure|footgun|regression|the bug|bug that|what broke|broke |went wrong|the night of|challenge|incident|postmortem|crash|risk flagged|the problem/i],
  ['security',     /security|exposure|vulnerab|hardening|leak|\brls\b|popia|compliance|impersonat/i],
  ['decision',     /owner (request|authorised|authorized|asked|decision|action)|owner:|decision|trade-?off|stack choice|why (we|not|it)|chose|the call/i],
  ['verified',     /verified|verification|evidence|proof|unit test|test suite|render(ed)? check|eyeball/i],
  ['audit',        /audit|verdict|diagnos|found not broken|scorecard|sweep|the theme|inventory/i],
  ['lesson',       /lesson|takeaway|principle|encoded|asked and answered|what .*taught|the rules that/i],
  ['open',         /open ?\/ ?next|^next\b|not started|backlog|todo|remaining|still to|live \+ next|what'?s left/i],
  ['shipped',      /shipped|fixed|deployed|new files|changes|migration files|what got built|closed|delivered|built|cleanup|complete/i],
  ['architecture', /architect|how it works|surfaces|data model|schema|multi-?tenant|infrastructure|stack|the loop|engine|pipeline/i],
  ['phase',        /^phase \d|^installment \d|^slice \d|^p\d\b|^\d+\s*[·.—-]/i],
  ['vision',       /vision|problem statement|overview|the brief|the idea|the goal|context|what ?& ?why/i],
];

// Anything tripping the vocabulary probe needs a human read before it can ever
// be public. Anything matching a credential SHAPE is redacted outright — see
// scripts/lib/redact-credentials.mjs for the incident that separated the two.
//
// The old regex here was `/\b(...|token|secret|password|...)\b/i` and it missed
// a live Supabase PAT, because `\btoken\b` does not match `ACCESS_TOKEN`:
// underscore is a word character, so there is no boundary before `TOKEN`.

function classify(heading, body) {
  const hay = `${heading}\n${body.slice(0, 400)}`;
  for (const [name, re] of CLASSES) if (re.test(heading)) return name;
  // Fall back to the opening of the body — diary subsections are often titled
  // with a proper noun ("VelvetFist — the missing half") and only reveal their
  // kind in the first sentence.
  for (const [name, re] of CLASSES) if (re.test(hay)) return name;
  return 'entry';
}

// Pull "(Aug 7 2026)" / "(July 29–30 2026)" out of a session heading.
function extractDate(heading) {
  const m = heading.match(/\(?\b([A-Z][a-z]{2,9} \d{1,2}(?:\s*[–-]\s*\d{1,2})?,? \d{4})/);
  return m ? m[1] : null;
}

// Linear scan, no nested quantifiers — a `(hex+separator)+` group backtracks
// catastrophically over 400 KB of prose. Tolerates the backticked form the
// journals actually use: commit `f9eaa93`.
const shas = (text) => [...text.matchAll(/\bcommits?\s+`?([0-9a-f]{7,40})\b/gi)].map((m) => m[1]);

// Nanda's own words, quoted in the journal: (owner: "clean current visuals
// first or we pile up posts that aren't working"). These are the most valuable
// lines in the corpus — the human directing the machine — and the journals use
// straight quotes, not typographic ones.
// Scan the whole section, not a leading window — in JarvisOS only half of these
// sit in the first 400 characters; the rest surface mid-paragraph.
function ownerQuote(heading, body) {
  const m = `${heading}\n${body}`
    .match(/(?:owner|nanda)[^"“\n]{0,40}["“]([^"”\n]{6,240})["”]/i);
  return m ? m[1] : null;
}

// ─── Markdown → sections ────────────────────────────────────────────────────
function parse(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let cur = null;
  let title = null;

  for (const line of lines) {
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (!h) {
      if (cur) cur.body.push(line);
      continue;
    }
    const [, hashes, text] = h;
    if (hashes.length === 1) { title = text.trim(); continue; }
    if (cur) out.push(cur);
    cur = { level: hashes.length, heading: text.trim(), body: [] };
  }
  if (cur) out.push(cur);
  return { title, sections: out };
}

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function readSource(src) {
  if (src.file) {
    if (!existsSync(src.file)) return null;
    return readFileSync(src.file, 'utf8');
  }
  const [repo, path] = src.gh;
  // The GitHub API TLS-handshakes out often enough on this connection that a
  // single blip used to silently shrink the corpus by a whole journal. Retry.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return execFileSync('gh', ['api', `repos/Nanda-Regine/${repo}/contents/${path}`,
        '-H', 'Accept: application/vnd.github.raw'],
        { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    } catch {
      if (attempt < 3) sleep(1500 * attempt);
    }
  }
  return null;
}

// ─── Run ────────────────────────────────────────────────────────────────────
const corpus = [];
const report = [];
/** Credentials scrubbed this run — reported loudly at the end, because each one
 *  is a key sitting in a source journal that still needs rotating at source. */
const redacted = [];
const missing = [];

for (const src of SOURCES) {
  const raw = readSource(src);
  const label = src.file ? src.file.split(/[\\/]/).pop() : src.gh.join('/');
  if (!raw) { missing.push(`${src.app} — ${label}`); continue; }

  const { title, sections } = parse(raw);
  let sessions = 0;
  let currentSession = null;
  let currentDate = null;

  for (const s of sections) {
    const text = s.body.join('\n').trim();

    if (s.level === 2) {
      sessions++;
      currentSession = s.heading;
      currentDate = extractDate(s.heading);
    }
    if (!text) continue; // pure container heading, nothing to carry

    // A diary's h2 IS the work session — a container with a preamble, not a
    // kind of moment. Only its h3s get classified. A dossier's h2 is thematic,
    // so it classifies like any other section.
    const isSession = src.kind === 'diary' && s.level === 2;

    // Redact BEFORE anything else touches the body, so no downstream field —
    // words, ownerQuote, the corpus file itself — can ever carry the raw value.
    const { text: safe, found: credentials } = scrubCredentials(text);
    if (credentials.length) {
      redacted.push({ app: src.app, heading: s.heading, credentials });
    }

    corpus.push({
      app: src.app,
      source: label,
      priority: src.priority,
      journalKind: src.kind,
      session: currentSession,
      heading: s.heading,
      level: s.level,
      class: isSession ? 'session' : classify(s.heading, safe),
      date: currentDate,
      words: safe.split(/\s+/).filter(Boolean).length,
      commits: shas(safe),
      ownerQuote: ownerQuote(s.heading, safe),
      // A section that carried a credential is sensitive no matter what its
      // prose looks like — the redaction is not a clean bill of health.
      sensitive: credentials.length > 0 || isSensitive(safe, s.heading),
      review: 'pending',   // nothing is publishable until a human says so
      body: safe,
    });
  }
  report.push({ app: src.app, kind: src.kind, source: label, title, sessions, sections: sections.length, kb: Math.round(raw.length / 1024) });
}

// ─── Dedup ──────────────────────────────────────────────────────────────────
// AdminOS is journalled three times (git diary + git dossier + the older
// OneDrive dossier), and the two dossiers overlap heavily. Key on app + heading
// + the opening of the body so genuinely distinct sections that share a heading
// ("Verified", "Gotchas") survive. On collision keep the higher-priority
// source, then the longer body.
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const seen = new Map();
const dropped = [];

for (const e of corpus) {
  const key = `${norm(e.app)}|${norm(e.heading)}|${norm(e.body).slice(0, 200)}`;
  const prev = seen.get(key);
  if (!prev) { seen.set(key, e); continue; }
  const winner = prev.priority !== e.priority
    ? (prev.priority > e.priority ? prev : e)
    : (prev.words >= e.words ? prev : e);
  seen.set(key, winner);
  dropped.push(winner === prev ? e : prev);
}

const deduped = [...seen.values()]
  .sort((a, b) => a.app.localeCompare(b.app) || a.level - b.level)
  .map((e, i) => ({ id: `${norm(e.app).replace(/ /g, '-')}-${i}`, ...e }));

// ─── Coverage report ────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n);
console.log('\n═══ SOURCES INGESTED ═══');
console.log(pad('APP', 20) + pad('KIND', 11) + pad('SESSIONS', 10) + pad('SECTIONS', 10) + 'SIZE');
for (const r of report) console.log(pad(r.app, 20) + pad(r.kind, 11) + pad(r.sessions, 10) + pad(r.sections, 10) + r.kb + ' KB');

// A partial ingest must never quietly overwrite a good corpus — that is how a
// journal disappears from the wing without anyone noticing.
if (missing.length) {
  console.log('\n═══ COULD NOT READ ═══');
  for (const m of missing) console.log('  ✗ ' + m);
  if (!process.argv.includes('--allow-partial')) {
    console.log('\n  REFUSING TO WRITE — the corpus would be missing the sources above.');
    console.log('  Re-run, or pass --allow-partial to write anyway.\n');
    process.exit(1);
  }
  console.log('\n  --allow-partial: writing an incomplete corpus.');
}

const outDir = join(ROOT, 'lib', 'data');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'forge-corpus.json'), JSON.stringify({
  generatedFrom: SOURCES.length,
  entries: deduped,
}, null, 2));

console.log(`\n═══ DEDUP ═══\n  ${corpus.length} parsed → ${deduped.length} kept · ${dropped.length} duplicates dropped`);
const dupBySource = dropped.reduce((a, e) => ((a[e.source] = (a[e.source] || 0) + 1), a), {});
for (const [k, v] of Object.entries(dupBySource).sort((a, b) => b[1] - a[1])) console.log(`    ${pad(k, 42)} −${v}`);

const by = (key) => deduped.reduce((a, e) => ((a[e[key]] = (a[e[key]] || 0) + 1), a), {});
console.log('\n═══ CORPUS BY SECTION CLASS ═══');
for (const [k, v] of Object.entries(by('class')).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${pad(k, 14)} ${pad(v, 6)} ${'█'.repeat(Math.round(v / 6))}`);
}

console.log('\n═══ CORPUS BY APP ═══');
for (const [k, v] of Object.entries(by('app')).sort((a, b) => b[1] - a[1])) console.log(`  ${pad(k, 20)} ${v}`);

const words = deduped.reduce((a, e) => a + e.words, 0);
const quotes = deduped.filter((e) => e.ownerQuote).length;
console.log(`\nTOTAL  ${deduped.length} sections · ${words.toLocaleString()} words · ${deduped.filter((e) => e.sensitive).length} flagged sensitive`);

if (redacted.length) {
  console.log(`\n🔴 ${redacted.length} section(s) carried live credentials. Redacted from the corpus:`);
  for (const r of redacted) console.log(`   ${r.credentials.join(', ')} — ${r.app} · ${r.heading}`);
  console.log(`\n   The corpus is clean. THE SOURCE JOURNAL IS NOT — the raw value is still`);
  console.log(`   sitting in that repo's history. Rotate the credential at its provider.`);
}
console.log(`       ${new Set(deduped.flatMap((e) => e.commits)).size} commits cited · ${quotes} owner quotes captured`);
console.log(`       ${((1 - by('class').entry / deduped.length) * 100).toFixed(1)}% classified`);
console.log('→ lib/data/forge-corpus.json\n');
