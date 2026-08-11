/**
 * The Forge — publish preflight.
 *
 * ── WHY THIS EXISTS ───────────────────────────────────────────────────────────
 *
 * Twice now, a real person's name has come within one commit of a public page,
 * and neither time was it caught by the thing built to catch it:
 *
 *   1. **2026-08-08.** Corpus section S03 — a long, genuinely good write-up of a
 *      database bug — contains a real name in the middle of it. It scored
 *      `sensitive: false` on the ingest probe and scored well enough to reach
 *      the curation shortlist. Only a human reading it kept it out.
 *   2. **2026-08-12.** Writing up the scar about that very problem, the author
 *      of the Scar Room used that same real name as the illustrative example,
 *      in three files, one of which is a public page and two of which are in a
 *      public repository. The prose gate does not apply to hand-written prose,
 *      so nothing looked at it. A one-off sweep caught it before the commit.
 *
 * The pattern is worth stating plainly: **the gate is always pointed at the
 * generated artefact, and the leak keeps happening in the hand-written one.**
 * Curated content feels safe precisely because a person wrote it, which is the
 * same reason nobody checks it.
 *
 * So this sweeps EVERYTHING the wing publishes from — generated data and
 * hand-written prose alike — and it runs before a commit, not after.
 *
 * ── RUNNING ───────────────────────────────────────────────────────────────────
 *   node scripts/forge-preflight.mjs
 *
 * Exit 0 = clean. Exit 1 = something to look at. It is deliberately noisy about
 * near-misses rather than silent about them: a preflight that reports nothing is
 * indistinguishable from a preflight that is not running.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scrubCredentials } from './lib/redact-credentials.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Everything that becomes, or describes, a public page in the Forge wing. */
const TARGETS = [
  'lib/data/forge-github.json',
  'lib/data/forge-builds.ts',
  'lib/data/forge-scars.ts',
  'lib/data/forge-origins.ts',
  'lib/forge-data.ts',
  'scripts/forge-github.mjs',
  'scripts/forge-ingest.mjs',
  'scripts/forge-curate.mjs',
  'docs/THE_FORGE.md',
  ...fs.readdirSync(path.join(ROOT, 'components/forge')).map((f) => `components/forge/${f}`),
];

/**
 * Names that must never appear anywhere, in any file, for any reason —
 * including as an example, including in a comment, including in a doc.
 *
 * ⚠️ Add to this list rather than deleting an occurrence and moving on. The
 * whole point is that the second occurrence was written by someone who had just
 * finished reading about the first one.
 *
 * Stored lowercase; matched case-insensitively.
 */
const FORBIDDEN_NAMES = [
  'roy hewett',
  // ↑ a real record in a real database, encountered in JarvisOS corpus section
  //   S03. Kept here so it cannot be reintroduced by someone quoting the scar.
];

const CHECKS = [
  {
    name: 'credential shapes',
    fatal: true,
    run: (text) => scrubCredentials(text).found,
  },
  {
    name: 'forbidden names',
    fatal: true,
    run: (text) => {
      const lower = text.toLowerCase();
      return FORBIDDEN_NAMES.filter((n) => lower.includes(n));
    },
  },
  {
    name: 'email addresses',
    fatal: true,
    run: (text) => {
      const hits = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || [];
      // Her own published contact address is meant to be public; a third
      // party's is not. Anything else is a finding.
      return [...new Set(hits)].filter(
        (e) => !/@(creativelynanda|mirembemuse)\.co\.za$/i.test(e) && !/@(next|vercel|upstash|arcjet|ducanh\d*)\//i.test(e)
      );
    },
  },
  {
    name: 'money figures that could be a salary',
    fatal: false,
    run: (text) => {
      // Published prices are fine and are all over the products. A five- or
      // six-figure rand amount in the engineering wing is worth a second look.
      const hits = text.match(/\bR\s?\d{2,3}[  ,]\d{3}(?:\.\d{2})?\b/g) || [];
      return [...new Set(hits)];
    },
  },
];

let fatalCount = 0;
let warnCount = 0;

console.log(`\nThe Forge — publish preflight\n${'─'.repeat(72)}`);

for (const rel of TARGETS) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const text = fs.readFileSync(abs, 'utf8');

  for (const check of CHECKS) {
    const findings = check.run(text);
    if (!findings.length) continue;
    const mark = check.fatal ? '🔴' : '⚠️ ';
    console.log(`${mark} ${rel}`);
    console.log(`     ${check.name}: ${findings.join(', ')}`);
    if (check.fatal) fatalCount++;
    else warnCount++;
  }
}

console.log('─'.repeat(72));
console.log(`  ${TARGETS.filter((t) => fs.existsSync(path.join(ROOT, t))).length} files swept`);

if (fatalCount) {
  console.error(`\n✗ ${fatalCount} blocking finding(s). Do not commit.\n`);
  process.exit(1);
}
if (warnCount) {
  console.log(`\n⚠️  ${warnCount} thing(s) worth a look. Not blocking.\n`);
} else {
  console.log('\n✓ clean\n');
}
