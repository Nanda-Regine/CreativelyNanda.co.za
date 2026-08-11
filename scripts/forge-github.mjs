/**
 * The Forge — live repository ingest.
 *
 * `docs/THE_FORGE.md` §5.6 filed The Bench and The Commit Wall as **Phase B**,
 * blocked on a JarvisOS → CreativelyNanda push bridge, because the only source
 * of commit data it knew about was the `engineering_commits` table inside the
 * private JarvisOS database. The prose corpus yields 44 SHAs — far too thin.
 *
 * That premise was wrong. The commits are in GitHub, and a fine-grained PAT
 * reads them directly. This script pulls them, so:
 *
 *   - the numbers on the wing are MEASURED, not written down and left to drift
 *   - the Commit Wall ships in Phase A
 *   - nothing needs the private database, so the site never holds a JarvisOS
 *     credential (§6's whole reason for the bridge is satisfied by not needing one)
 *
 * ── SAFETY ────────────────────────────────────────────────────────────────────
 * Nine of these repositories are PRIVATE. Their commit subjects are being lifted
 * onto a public page, so every line passes the same gate as the prose corpus:
 *
 *   1. `scrubCredentials` — credential SHAPES redacted, and any message that
 *      trips it is dropped entirely rather than published with a placeholder.
 *      A commit subject is one line; there is nothing left worth reading.
 *   2. `SECURITY_SPECIFIC` — live-exposure write-ups stay out forever (§4.6).
 *      Unlike a prose section, a one-line subject is not worth a human's time
 *      to rescue, so here the probe drops rather than routing to review.
 *   3. `PRIVATE_MATTER` — named people, private records. Aggregates (counts,
 *      languages, week histogram) are always safe; only the text is risky.
 *
 * Aggregate statistics are published for every repo. Message text is published
 * only from repos on the `wall: true` list.
 *
 * ── RUNNING ───────────────────────────────────────────────────────────────────
 *   node scripts/forge-github.mjs            # writes lib/data/forge-github.json
 *   node scripts/forge-github.mjs --dry      # prints the summary, writes nothing
 *   node scripts/forge-github.mjs --why      # also lists every line a safety rule withheld
 *
 * Runs LOCALLY (where GITHUB_TOKEN is in .env.local) and the output is committed
 * — the same pattern as forge-ingest.mjs and upload-poem-wall.mjs. Vercel never
 * calls GitHub, so a build can never fail on a rate limit or a revoked token.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scrubCredentials } from './lib/redact-credentials.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'lib/data/forge-github.json');
const DRY = process.argv.includes('--dry');
const WHY = process.argv.includes('--why');
/** Every subject withheld by a safety rule, so the gate can be audited by eye. */
const audit = [];

// ─────────────────────────────────────────────────────────────────────────────
// The map: repository → the build the Forge calls it.
//
// `app` MUST match the `app` field in forge-corpus.json or the Workshop Floor
// cannot join the prose to the numbers. `wall` gates commit-message publication.
// ─────────────────────────────────────────────────────────────────────────────
const BUILDS = [
  {
    key: 'jarvisos',
    app: 'JarvisOS',
    repo: 'Nanda-Regine/JarvisOS',
    title: 'JarvisOS',
    kicker: 'The personal operating system',
    live: 'https://jarvis-os-wine.vercel.app',
    wall: true,
  },
  {
    key: 'mirembe-muse',
    app: null, // no build journal in the corpus — numbers only
    repo: 'Nanda-Regine/MirembeApp',
    title: 'Mirembe Muse',
    kicker: 'The studio itself',
    live: 'https://mirembemuse.co.za',
    logo: 'mirembe',
    wall: true,
  },
  {
    key: 'creativelynanda',
    app: 'CreativelyNanda',
    repo: 'Nanda-Regine/CreativelyNanda.co.za',
    title: 'CreativelyNanda',
    kicker: 'This house',
    live: 'https://creativelynanda.co.za',
    wall: true,
  },
  {
    key: 'adminos',
    app: 'AdminOS',
    repo: 'Nanda-Regine/AdminOS',
    title: 'AdminOS',
    kicker: 'WhatsApp-first back office',
    live: 'https://adminos.co.za',
    wall: true,
  },
  {
    key: 'campus-compass',
    app: 'Campus Compass',
    repo: 'Nanda-Regine/campus-compass',
    title: 'VarsityOS',
    kicker: 'The student operating system',
    live: 'https://varsityos.co.za',
    logo: 'varsity',
    wall: true,
  },
  {
    key: 'k53',
    app: 'K53 Drill Master',
    repo: 'Nanda-Regine/nanda-k53-drill-master',
    title: 'K53 Drill Master',
    kicker: 'Offline-first licence drills',
    live: 'https://k53drillmaster.co.za',
    logo: 'k53',
    wall: true,
  },
  {
    key: 'bb-mothership',
    app: 'BB MotherShip',
    repo: 'Nanda-Regine/BB-MotherShip-Deluxe',
    title: 'BB MotherShip',
    kicker: 'Salon operations',
    live: 'https://bb-mothership-deluxe.vercel.app',
    // A real client's operation. Aggregates only — never their commit subjects.
    wall: false,
  },
  {
    key: 'stokvelos',
    app: 'StokvelOS',
    repo: 'Nanda-Regine/StokvelOS',
    title: 'StokvelOS',
    kicker: 'Rotating savings, digitised',
    live: 'https://stokvelos.co.za',
    wall: true,
  },
  {
    key: 'sanyu',
    app: null,
    repo: 'Nanda-Regine/sanyubotanicals',
    title: 'Sanyu Botanicals',
    kicker: 'The botanical line',
    live: 'https://sanyubotanicals.vercel.app',
    logo: 'sanyu',
    wall: true,
  },
  {
    key: 'watchsankofa',
    app: 'WatchSankofa',
    repo: 'Nanda-Regine/AfriFlix',
    title: 'WatchSankofa',
    kicker: 'African film, streamed',
    live: 'https://watchsankofa.co.za',
    wall: true,
  },
  {
    key: 'trueaccess',
    app: 'TrueAccess',
    repo: 'Nanda-Regine/TrueAccApp',
    title: 'TrueAccess',
    kicker: 'Access control',
    live: 'https://true-access-app.vercel.app',
    wall: true,
  },
  {
    key: 'selves-of-us',
    app: null,
    repo: 'Nanda-Regine/theselvesofus',
    title: 'The Selves of Us',
    kicker: 'A newer room',
    live: 'https://selves-of-us.vercel.app',
    wall: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HTTP
// ─────────────────────────────────────────────────────────────────────────────
function readToken() {
  const env = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8');
  const m = env.match(/^GITHUB_TOKEN=(.*)$/m);
  if (!m) throw new Error('GITHUB_TOKEN missing from .env.local');
  return m[1].trim().replace(/^["']|["']$/g, '');
}

const TOKEN = readToken();
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'forge-ingest',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * The ingest that built the prose corpus lost a whole 51 KB journal to a single
 * TLS timeout and wrote a smaller file without complaint — that scar is written
 * up in the Scar Room this data feeds. So: retry, and let the caller decide
 * whether a miss is fatal. Never silently shrink the output.
 */
async function gh(url, { retries = 4 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      // 202 = GitHub is computing the statistic; it wants to be asked again.
      if (res.status === 202) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      if (res.status === 403 || res.status === 429) {
        const reset = Number(res.headers.get('x-ratelimit-reset') || 0) * 1000;
        const wait = Math.max(2000, Math.min(60000, reset - Date.now()));
        console.warn(`   rate limited, waiting ${Math.round(wait / 1000)}s`);
        await sleep(wait);
        continue;
      }
      return { status: res.status, headers: res.headers, body: res.status === 204 ? null : await res.json() };
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`   ${err.message} — retry ${attempt + 1}/${retries}`);
      await sleep(1000 * 2 ** attempt);
    }
  }
  throw new Error(`gave up on ${url}`);
}

/** Total commit count without paging the whole history: ask for one per page. */
function totalFromLink(link) {
  if (!link) return null;
  const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return m ? Number(m[1]) : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// The commit-wall gate
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Things that are nobody's business regardless of which repo they came from.
 *
 * ⚠️ Tuned against 1,478 real subjects, because the first draft of this regex
 * was a lesson in over-blocking. It matched the bare word `client` and threw
 * away `client/server validation mismatch` and `lazy-initialize Resend client`;
 * it matched `R\d{3}` as a salary figure and threw away `correct R111/R118 art
 * from the official chart` — those are K53 ROAD SIGN CODES. A privacy filter
 * that eats a third of the good lines does not read as careful, it reads as
 * broken, and the temptation is then to switch it off entirely.
 *
 * So: match the RISK, not the vocabulary. A named person, a real address, a
 * salary, an invoice. Public pricing is on her own sites already.
 */
const PRIVATE_MATTER =
  /(@[a-z0-9._%+-]+\.[a-z]{2,}|\b(salary|payslip|pay slip|therapy|menstrual|cycle log|medical record|diagnos)|\bclient (name|list|contact|detail|email|phone)s?\b)/i;

/**
 * A named individual. Case-SENSITIVE, and that is the whole point.
 *
 * ⚠️ The first draft folded this into `PRIVATE_MATTER` above, which is built
 * with the `i` flag — and under `i`, `[A-Z]` matches lowercase too. So
 * `for [A-Z][a-z]+ [A-Z][a-z]+` ("for Firstname Surname") also matched "for the alpha
 * run", "for the Notion line", and 109 other perfectly ordinary subjects. The
 * filter looked strict and was actually just deleting the room.
 *
 * A case-insensitive regex cannot reason about capitalisation. If a rule
 * depends on case, it needs its own expression.
 */
const NAMED_PERSON = /\b(for|with|from|to)\s+[A-Z][a-z]{2,}\s+[A-Z][a-z]{2,}\b/;

/**
 * Live-exposure disclosure. §4.6 of the spec is explicit: the raw write-ups
 * stay out forever, and the room instead carries one hand-written essay about
 * the CLASS of bug. These apps are still running. "Closed four live exposures"
 * is a true sentence and a bad idea.
 *
 * ⚠️ Also narrowed after `--why`. The first draft matched any security-adjacent
 * noun — `RLS`, `passphrase`, `bearer`, `.env` — and threw away
 * "trim passphrase when verifying ITN signature" and a dozen RLS migrations,
 * which disclose nothing at all and are among the better lines she has written.
 *
 * What actually carries risk is DISCLOSURE: that a specific hole existed, or
 * still needs closing. Match that, not the topic.
 */
const SECURITY_SPECIFIC =
  /(expos(ure|ed|ing)\b|\bleaked?\b|secrets? to rotate|rotate (the )?(key|secret|token|credential)|critical (exposure|vulnerab)|\bCVE-|key (sat|was|got) .*(commit|push)|from being committed|dormant api keys|wire \d+ dormant)/i;

/** Machine noise. True of the message, not of the engineer. */
const CHORE =
  /^(merge|revert|bump|chore\(deps\)|deps|initial commit|update readme|wip\b|\.{3}|typo|lint|format|prettier|rename|cleanup|test:?\s*$|add files via upload|create [a-z0-9._-]+$|update [a-z0-9._-]+$)/i;

/**
 * Score a commit subject for the Commit Wall.
 *
 * The premise of the room is that her commit messages are not labels, they are
 * sentences — "the claim guard had never seen the assets", "the re-render would
 * have been a silent no-op that reported success". A subject earns its place by
 * having a *clause*: a subject, a verb and a turn. Everything below is a proxy
 * for that, and the room is capped well under the number that pass, so the bar
 * being imperfect costs nothing.
 */
function scoreSubject(subject) {
  const body = subject.replace(/^[a-z]+(\([^)]*\))?!?:\s*/i, '').trim();
  if (body.length < 34 || body.length > 140) return 0;

  let score = 0;

  // A finite verb — the difference between a sentence and a label. This is the
  // single strongest signal; `feat: dark mode` has no verb, and neither does
  // any of the 900 subjects that score zero here.
  if (/\b(had|has|was|were|would|will|could|never|still|already|turns out|used to|is|are|isn't|wasn't|doesn't|didn't)\b/i.test(body)) score += 3;
  // The vocabulary of a failure discovered — the register the room lives in.
  if (/\b(silent|silently|no-op|drift|drifted|leak|lost|dropped|stale|wrong|broke|broken|never|disagree|understated|overstated|off by|race|timeout|regress|root cause|mismatch|shadow|dead|unreachable|starved|failing|failed|false)\b/i.test(body)) score += 3;
  // Verification — §4's "how you knew it worked", the line a CTO reads for.
  if (/\b(verified|proved|measured|reproduc|confirmed|counted|audited|end-to-end|real)\b/i.test(body)) score += 2;
  // Opens on a determiner: "the re-render…", "every services price…". A subject
  // that begins with an article is almost always a sentence.
  if (/^\W*(the|a|an|it|this|that|every|both|one|two|three|four|five|nine|ten|from)\b/i.test(body)) score += 2;
  // Connectives — the turn in the middle.
  if (/\b(because|so that|but|while|until|before|after|when|then|instead|rather than|and)\b/i.test(body)) score += 1;
  // An em-dash is how she writes the second half of a thought.
  if (/—|–/.test(body)) score += 1;

  return score;
}

/**
 * The bar. At 5 the wall is ~60–80 lines out of ~3,000 commits — roughly 2%.
 *
 * That ratio is the room's whole argument. A wall of 3,098 commits is a log
 * file with a serif font; a wall of seventy is an edit. The header states the
 * true total, so nothing is hidden by showing a selection.
 */
const WALL_FLOOR = 4;

function walllineFrom(commit, build) {
  const subject = (commit.commit?.message || '').split('\n')[0].trim();
  if (!subject) return null;

  // 1. Credential shapes — drop, do not placeholder. One line, nothing to save.
  const { found } = scrubCredentials(subject);
  if (found.length) return { dropped: 'credential', subject };

  // 2. Security specifics — §4.6. The essay in the Scar Room covers this ground
  //    on purpose; the raw line does not get to.
  if (SECURITY_SPECIFIC.test(subject)) return { dropped: 'security', subject };

  // 3. Named people, private records.
  if (PRIVATE_MATTER.test(subject) || NAMED_PERSON.test(subject)) {
    return { dropped: 'private', subject };
  }

  // 4. Machine noise.
  if (CHORE.test(subject)) return { dropped: 'chore', subject };

  const score = scoreSubject(subject);
  if (score < WALL_FLOOR) return { dropped: 'score', subject };

  return {
    build: build.key,
    title: build.title,
    date: (commit.commit?.author?.date || '').slice(0, 10),
    sha: (commit.sha || '').slice(0, 7),
    subject,
    // The conventional-commit type, when she used one — a legible facet filter
    // and, read across a year, a genuine profile of where the work went.
    type: (subject.match(/^([a-z]+)(\([^)]*\))?!?:/i) || [])[1]?.toLowerCase() || null,
    score,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-repo ingest
// ─────────────────────────────────────────────────────────────────────────────
async function ingestBuild(build) {
  const base = `https://api.github.com/repos/${build.repo}`;
  process.stdout.write(`→ ${build.title.padEnd(20)}`);

  const meta = await gh(base);
  if (meta.status !== 200) {
    console.log(`  ✗ ${meta.status}`);
    return { build: null, wall: [], error: `${build.repo} → HTTP ${meta.status}` };
  }
  const r = meta.body;

  // Total commits — one-per-page, read the `rel="last"` cursor.
  const head = await gh(`${base}/commits?per_page=1`);
  const commits = totalFromLink(head.headers.get('link')) ?? (Array.isArray(head.body) ? head.body.length : 0);

  // The very first commit, from the far end of that same cursor.
  let firstCommit = null;
  if (commits > 1) {
    const tail = await gh(`${base}/commits?per_page=1&page=${commits}`);
    firstCommit = tail.body?.[0]?.commit?.author?.date?.slice(0, 10) ?? null;
  }

  const langs = (await gh(`${base}/languages`)).body || {};
  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, bytes, pct: Math.round((bytes / totalBytes) * 1000) / 10 }));

  // 52 weeks of commit counts — a real activity histogram, not a decoration.
  const part = await gh(`${base}/stats/participation`);
  const activity = Array.isArray(part.body?.all) ? part.body.all : [];

  // Commit subjects for the wall.
  const wall = [];
  const dropped = { credential: 0, security: 0, private: 0, chore: 0, score: 0 };
  if (build.wall) {
    const PAGES = Math.min(12, Math.ceil(commits / 100)); // whole history, up to 1,200
    for (let page = 1; page <= PAGES; page++) {
      const res = await gh(`${base}/commits?per_page=100&page=${page}`);
      if (res.status !== 200 || !Array.isArray(res.body)) break;
      for (const c of res.body) {
        const line = walllineFrom(c, build);
        if (!line) continue;
        if (line.dropped) {
          dropped[line.dropped]++;
          // A filter nobody can inspect is a filter nobody can trust. `--why`
          // prints what was withheld and under which rule, which is how the
          // over-blocking `client`/`R123` draft was caught in the first place.
          if (WHY && line.dropped !== 'chore' && line.dropped !== 'score') {
            audit.push({ rule: line.dropped, repo: build.title, subject: line.subject });
          }
          continue;
        }
        wall.push(line);
      }
    }
  }

  console.log(
    `  ${String(commits).padStart(5)} commits · ${languages[0]?.name ?? '—'} · ` +
      `wall ${String(wall.length).padStart(3)} (dropped ${Object.values(dropped).reduce((a, b) => a + b, 0)})`
  );

  return {
    build: {
      key: build.key,
      app: build.app,
      title: build.title,
      kicker: build.kicker,
      repo: build.repo,
      repoUrl: `https://github.com/${build.repo}`,
      // A private repo's URL is a 404 for a visitor. Say so rather than link it.
      isPrivate: !!r.private,
      description: r.description || null,
      live: build.live || r.homepage || null,
      logo: build.logo || null,
      commits,
      firstCommit,
      lastCommit: (r.pushed_at || '').slice(0, 10),
      createdAt: (r.created_at || '').slice(0, 10),
      sizeKb: r.size,
      topics: r.topics || [],
      languages,
      activity,
      defaultBranch: r.default_branch,
    },
    wall,
    droppedCounts: dropped,
    error: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
const builds = [];
const wall = [];
const errors = [];
const droppedTotal = { credential: 0, security: 0, private: 0, chore: 0, score: 0 };

console.log(`\nThe Forge — live repository ingest\n${'─'.repeat(72)}`);

for (const b of BUILDS) {
  const out = await ingestBuild(b);
  if (out.error) { errors.push(out.error); continue; }
  builds.push(out.build);
  wall.push(...out.wall);
  for (const k of Object.keys(droppedTotal)) droppedTotal[k] += out.droppedCounts[k] || 0;
}

// Wall ordering: newest first, and capped per build so JarvisOS's 950 commits
// cannot swallow the room. Diversity beats volume — a wall of one repo is a log.
const PER_BUILD_CAP = 16;
const perBuild = {};
const wallCurated = wall
  .sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.score - a.score)
  .filter((l) => {
    perBuild[l.build] = (perBuild[l.build] || 0) + 1;
    return perBuild[l.build] <= PER_BUILD_CAP;
  });

const totals = {
  repos: builds.length,
  commits: builds.reduce((a, b) => a + b.commits, 0),
  liveApps: builds.filter((b) => b.live).length,
  codeBytes: builds.reduce((a, b) => a + b.languages.reduce((x, l) => x + l.bytes, 0), 0),
  weeksLogged: Math.max(0, ...builds.map((b) => b.activity.filter((n) => n > 0).length)),
  wallLines: wallCurated.length,
  earliestCommit: builds.map((b) => b.firstCommit).filter(Boolean).sort()[0] || null,
};

// Language totals across the whole body of work — one honest ring, not twelve.
const langTotals = {};
for (const b of builds) for (const l of b.languages) langTotals[l.name] = (langTotals[l.name] || 0) + l.bytes;
const languages = Object.entries(langTotals)
  .sort((a, b) => b[1] - a[1])
  .map(([name, bytes]) => ({ name, bytes, pct: Math.round((bytes / totals.codeBytes) * 1000) / 10 }));

// ── Refuse to write a shrunken file. The 51 KB journal that vanished to one TLS
// timeout did so because the ingest treated a partial read as a successful one.
if (errors.length) {
  console.error(`\n✗ ${errors.length} repo(s) failed — refusing to write a partial corpus:`);
  errors.forEach((e) => console.error(`   ${e}`));
  process.exit(1);
}
if (builds.length < BUILDS.length) {
  console.error(`\n✗ expected ${BUILDS.length} builds, got ${builds.length} — not writing.`);
  process.exit(1);
}

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  generatedBy: 'scripts/forge-github.mjs',
  note:
    'Measured from the GitHub API at build time and committed. Vercel never calls GitHub. ' +
    'Commit subjects are published only from repos flagged wall:true, and every line passed ' +
    'the credential/sensitivity/private-matter gate in scripts/lib/redact-credentials.mjs.',
  totals,
  // The gate's own numbers, published with the data it produced. A room that
  // filters its source and does not say by how much is claiming to be a
  // complete record; the Commit Wall reads `withheld` off this rather than
  // carrying a number somebody typed once and never updated.
  gate: {
    ...droppedTotal,
    withheld: droppedTotal.credential + droppedTotal.security + droppedTotal.private,
    unremarkable: droppedTotal.chore + droppedTotal.score,
  },
  languages,
  builds,
  wall: wallCurated,
};

console.log(`${'─'.repeat(72)}`);
console.log(`  ${totals.repos} repositories · ${totals.commits.toLocaleString()} commits`);
console.log(`  first commit ${totals.earliestCommit} · ${(totals.codeBytes / 1e6).toFixed(1)} MB of code`);
console.log(`  languages: ${languages.slice(0, 5).map((l) => `${l.name} ${l.pct}%`).join(' · ')}`);
console.log(`  commit wall: ${wallCurated.length} lines kept`);
console.log(`  dropped: ${Object.entries(droppedTotal).map(([k, v]) => `${k} ${v}`).join(' · ')}`);

if (WHY) {
  console.log(`\n── withheld by a safety rule ${'─'.repeat(44)}`);
  for (const rule of ['credential', 'security', 'private']) {
    const rows = audit.filter((a) => a.rule === rule);
    if (!rows.length) continue;
    console.log(`\n  ${rule.toUpperCase()} (${rows.length})`);
    rows.slice(0, 40).forEach((a) => console.log(`    ${a.repo.padEnd(18)}${a.subject.slice(0, 96)}`));
  }
  console.log('');
}

if (DRY) {
  console.log('\n--dry — nothing written.\n');
  console.log(wallCurated.slice(0, 15).map((l) => `  ${l.date}  ${l.subject}`).join('\n'));
} else {
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`\n✓ ${path.relative(ROOT, OUT)} — ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB\n`);
}
