/**
 * The Forge — server-side data layer.
 *
 * 🔴 THIS MODULE READS `lib/data/forge-corpus.json` (1.21 MB) AND MUST NEVER BE
 *    IMPORTED FROM A `'use client'` FILE, DIRECTLY OR TRANSITIVELY.
 *
 * `docs/THE_FORGE.md` §3 states the constraint and the reason: the corpus holds
 * every section still marked `review: 'pending'` plus everything the sensitivity
 * probe flagged. Importing it into a client component ships the entire
 * unreviewed build journal to anyone who opens devtools, and the curation gate
 * becomes decorative. Everything here therefore reduces the corpus to small,
 * explicitly-shaped values *before* they cross into a client component.
 *
 * The rule to apply when adding to this file: a function may read the corpus,
 * but its return type must be something you would be happy to see in the page
 * source, because that is exactly where it is going.
 *
 * GitHub data (`forge-github.json`, 37 KB) has no such constraint — it passed
 * its own gate at ingest time in `scripts/forge-github.mjs` — but it is read
 * here too so that both sources are joined in one place.
 */

import corpus from '@/lib/data/forge-corpus.json';
import github from '@/lib/data/forge-github.json';
import { BUILD_DOSSIERS, type BuildDossier } from '@/lib/data/forge-builds';

// ─────────────────────────────────────────────────────────────────────────────
// Types — the corpus JSON is untyped on disk, so it is narrowed once here.
// ─────────────────────────────────────────────────────────────────────────────

interface CorpusEntry {
  id: string;
  app: string;
  source: string;
  journalKind: string;
  session: string | null;
  heading: string;
  level: number;
  date: string | null;
  class: string;
  words: number;
  sensitive: boolean;
  review: string;
  body: string;
}

const ENTRIES = corpus.entries as unknown as CorpusEntry[];

export interface GithubBuild {
  key: string;
  app: string | null;
  title: string;
  kicker: string;
  repo: string;
  repoUrl: string;
  isPrivate: boolean;
  description: string | null;
  live: string | null;
  logo: string | null;
  commits: number;
  firstCommit: string | null;
  lastCommit: string;
  createdAt: string;
  sizeKb: number;
  topics: string[];
  languages: { name: string; bytes: number; pct: number }[];
  activity: number[];
  defaultBranch: string;
}

export interface WallLine {
  build: string;
  title: string;
  date: string;
  sha: string;
  subject: string;
  type: string | null;
  score: number;
}

const GH = github as unknown as {
  generatedAt: string;
  totals: {
    repos: number;
    commits: number;
    liveApps: number;
    codeBytes: number;
    weeksLogged: number;
    wallLines: number;
    earliestCommit: string | null;
  };
  gate: {
    credential: number;
    security: number;
    private: number;
    chore: number;
    score: number;
    /** Dropped by a SAFETY rule. The number the Commit Wall states. */
    withheld: number;
    /** Dropped for being a label rather than a sentence. Not a safety matter. */
    unremarkable: number;
  };
  languages: { name: string; bytes: number; pct: number }[];
  builds: GithubBuild[];
  wall: WallLine[];
};

/**
 * Sections that never render anywhere, on any route. §4.2 of the spec.
 * Applied at every read rather than once at import, so a new call site cannot
 * accidentally opt out of it by forgetting.
 */
const isPublishable = (e: CorpusEntry) =>
  e.class !== 'manifest' && e.class !== 'security' && !e.sensitive;

// ─────────────────────────────────────────────────────────────────────────────
// The threshold figures
// ─────────────────────────────────────────────────────────────────────────────

export interface ForgeFigures {
  /** Builds with a journal in the corpus. */
  journalled: number;
  /** Words of build journal, all sources. */
  words: number;
  /** Work sessions logged. */
  sessions: number;
  /** Commits, measured from the GitHub API. */
  commits: number;
  /** Repositories measured. */
  repos: number;
  /** Nights in the dated diary. */
  nights: number;
  /** Postmortems written up. */
  scars: number;
  /** Date of the earliest commit across the measured repositories. */
  since: string | null;
}

export function getFigures(scarCount: number): ForgeFigures {
  return {
    journalled: new Set(ENTRIES.map((e) => e.app)).size,
    words: ENTRIES.reduce((a, e) => a + e.words, 0),
    sessions: ENTRIES.filter((e) => e.class === 'session').length,
    commits: GH.totals.commits,
    repos: GH.totals.repos,
    nights: getNights().length,
    scars: scarCount,
    since: GH.totals.earliestCommit,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// The Long Night — the dated diary
// ─────────────────────────────────────────────────────────────────────────────

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/**
 * Pull an ISO date out of a session heading.
 *
 * The corpus's own `date` field is not usable for ordering: it holds whatever
 * the ingest matched, which includes strings like `"Session 18, 2026"`. This
 * re-derives from the heading and returns null rather than guessing, because
 * §5.4 of the spec is explicit that a timeline which implies the record starts
 * when the dates start would be telling a lie about 2025. Undated sessions are
 * not shown in this room at all; Origins carries the beginning, in prose.
 */
export function parseSessionDate(heading: string): string | null {
  const iso = heading.match(/(20\d\d)-(\d\d)-(\d\d)/);
  if (iso) return iso[0];

  // "July 29–30 2026" · "Jul 16 2026" · "May 14, 2026" · "Aug 2–3 2026"
  const md = heading.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:\s*[–—-]\s*\d{1,2})?,?\s+(20\d\d)/i
  );
  if (md) {
    return `${md[3]}-${String(MONTHS[md[1].toLowerCase()]).padStart(2, '0')}-${md[2].padStart(2, '0')}`;
  }

  // "10 Jul 2026"
  const dm = heading.match(
    /\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(20\d\d)/i
  );
  if (dm) {
    return `${dm[3]}-${String(MONTHS[dm[2].toLowerCase()]).padStart(2, '0')}-${dm[1].padStart(2, '0')}`;
  }

  return null;
}

/**
 * Strip the trailing date parenthetical from a session heading so the title
 * reads as a title. "THE NIGHT OF THE SILENT FAILURES (July 29–30 2026)" is a
 * date stamped onto a good name; the room renders the date in its own column.
 */
const MONTH_WORD = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
const DAY_RANGE = '\\d{1,2}(?:\\s*[–—/-]\\s*\\d{1,2})?';

/**
 * The journals stamp dates onto headings in six different shapes, at both ends:
 *
 *   THE NIGHT OF THE SILENT FAILURES (July 29–30 2026)
 *   Jul 16 2026 — DASHBOARD SYNC + FRESHNESS
 *   2026-07-21 — Outreach engine deepened
 *   Session 12 — 2026-07-18 · Security P0 shipped
 *   Optimization Pass — 10 Jul 2026
 *   Bridge — 12–13 Jul 2026 (summary)
 *
 * All six are removed, in that order, because the room renders the date in its
 * own column and a title that repeats it reads as a database row. Applied in
 * sequence rather than as one expression: a single regex covering all six was
 * unreadable and, when it was wrong, wrong invisibly.
 */
// A date stamp is sometimes followed by a note — "— 12–13 Jul 2026 (summary)".
// Allowed as an optional tail on the date rules ONLY, so that a parenthetical
// which is part of the title survives: "Multi-Location Provisioning (PE 2
// readiness) — 10 Jul 2026" must keep its bracket and lose its date.
const TAIL_NOTE = '(?:\\s*\\([^)]*\\))?';

const HEADING_NOISE: RegExp[] = [
  // trailing parenthetical carrying a year
  /\s*\([^)]*20\d\d[^)]*\)\s*$/i,
  // trailing "— 10 Jul 2026" / "— 12–13 Jul 2026 (summary)"
  new RegExp(`\\s*[—–·-]\\s*${DAY_RANGE}\\s+${MONTH_WORD}\\s+20\\d\\d${TAIL_NOTE}\\s*$`, 'i'),
  // trailing "— Jul 16 2026" / "— July 29–30, 2026"
  new RegExp(`\\s*[—–·-]\\s*${MONTH_WORD}\\s+${DAY_RANGE},?\\s+20\\d\\d${TAIL_NOTE}\\s*$`, 'i'),
  // trailing ISO
  new RegExp(`\\s*[—–·-]\\s*20\\d\\d-\\d\\d-\\d\\d(?:[/–—-]\\d{1,2})?${TAIL_NOTE}\\s*$`),
  // leading "Session 12 — 2026-07-18 · " (the label goes too; it numbers nothing
  // a reader can use, and the room is already an ordered list)
  /^session\s+\d+\s*[—–·-]\s*20\d\d-\d\d-\d\d(?:[/–—-]\d{1,2})?\s*[—–·-]?\s*/i,
  // leading ISO
  /^20\d\d-\d\d-\d\d(?:[/–—-]\d{1,2})?\s*[—–·-]\s*/,
  // leading "Jul 16 2026 — "
  new RegExp(`^${MONTH_WORD}\\s+${DAY_RANGE},?\\s+20\\d\\d\\s*[—–·-]\\s*`, 'i'),
];

function cleanHeading(h: string): string {
  let out = h;
  for (const re of HEADING_NOISE) out = out.replace(re, '');
  // A heading can carry noise at both ends; one more pass catches the pair.
  for (const re of HEADING_NOISE) out = out.replace(re, '');
  return out.replace(/^[\s—–·-]+|[\s—–·-]+$/g, '').trim();
}

export interface Night {
  date: string;
  /** Human month label, precomputed so no client formats a date. */
  month: string;
  app: string;
  title: string;
  words: number;
  /** True where the night's title alone carries the story. */
  headline: boolean;
}

let nightsCache: Night[] | null = null;

/**
 * The dated diary, newest first.
 *
 * Only the HEADING, date, app and word count cross into the room — never the
 * body. A session heading is a line she wrote as a title; a session body is a
 * work log written for an audience of one. The room is a ledger of nights, and
 * a ledger is exactly as much as can be published without a human having read
 * all 219 of them.
 */
export function getNights(): Night[] {
  if (nightsCache) return nightsCache;

  const nights = ENTRIES.filter((e) => e.class === 'session')
    .filter(isPublishable)
    .map((e) => {
      const date = parseSessionDate(e.heading) ?? parseSessionDate(e.session ?? '');
      if (!date) return null;
      const title = cleanHeading(e.heading);
      if (!title || title.length < 4) return null;
      return {
        date,
        month: new Date(`${date}T00:00:00Z`).toLocaleDateString('en-ZA', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }),
        app: e.app,
        title,
        words: e.words,
        // A title in full caps is one she wrote as a headline, not a label.
        headline: /^[^a-z]{12,}$/.test(title) || title.length > 46,
      } satisfies Night;
    })
    .filter((n): n is Night => n !== null);

  // Deduplicate: the same night is occasionally recorded in two journals.
  const seen = new Set<string>();
  nightsCache = nights
    .filter((n) => {
      const k = `${n.date}|${n.title.toLowerCase()}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.app.localeCompare(b.app));

  return nightsCache;
}

/** Nights grouped into months, for the room's spine. */
export function getNightsByMonth(): { month: string; nights: Night[] }[] {
  const groups: { month: string; nights: Night[] }[] = [];
  for (const n of getNights()) {
    const last = groups[groups.length - 1];
    if (last && last.month === n.month) last.nights.push(n);
    else groups.push({ month: n.month, nights: [n] });
  }
  return groups;
}

// ─────────────────────────────────────────────────────────────────────────────
// The Workshop Floor — dossier ⋈ measured repository
// ─────────────────────────────────────────────────────────────────────────────

export interface FloorEntry {
  dossier: BuildDossier;
  gh: GithubBuild | null;
  /** Sections of build journal behind this build. Shown as depth, not content. */
  sections: number;
  /** Nights in the dated diary attributable to this build. */
  nights: number;
}

export function getFloor(): FloorEntry[] {
  const nightCounts = getNights().reduce<Record<string, number>>((acc, n) => {
    acc[n.app] = (acc[n.app] || 0) + 1;
    return acc;
  }, {});

  return BUILD_DOSSIERS.map((dossier) => {
    const gh = GH.builds.find((b) => b.key === dossier.key) ?? null;
    const app = gh?.app ?? null;
    return {
      dossier,
      gh,
      sections: app ? ENTRIES.filter((e) => e.app === app && isPublishable(e)).length : 0,
      nights: app ? nightCounts[app] ?? 0 : 0,
    };
  }).sort((a, b) => (b.gh?.commits ?? 0) - (a.gh?.commits ?? 0));
}

export function getFloorEntry(slug: string): FloorEntry | null {
  return getFloor().find((f) => f.dossier.slug === slug) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// The Commit Wall
// ─────────────────────────────────────────────────────────────────────────────

export interface CommitWallData {
  lines: WallLine[];
  totals: typeof GH.totals;
  gate: typeof GH.gate;
  languages: typeof GH.languages;
  /** Commits per week across the last year, summed over every repository. */
  activity: number[];
  builds: { key: string; title: string; commits: number; accent: string }[];
  generatedAt: string;
}

export function getCommitWall(): CommitWallData {
  const weeks = Math.max(0, ...GH.builds.map((b) => b.activity.length));
  const activity = Array.from({ length: weeks }, (_, i) =>
    GH.builds.reduce((sum, b) => sum + (b.activity[i] ?? 0), 0)
  );

  const accentOf = (key: string) =>
    BUILD_DOSSIERS.find((d) => d.key === key)?.accent ?? '#C9943A';

  return {
    lines: GH.wall,
    totals: GH.totals,
    gate: GH.gate,
    languages: GH.languages,
    activity,
    builds: GH.builds
      .filter((b) => GH.wall.some((l) => l.build === b.key))
      .map((b) => ({ key: b.key, title: b.title, commits: b.commits, accent: accentOf(b.key) }))
      .sort((a, b) => b.commits - a.commits),
    generatedAt: GH.generatedAt,
  };
}

/** Every measured repository, for the Floor index header. */
export function getGithubTotals() {
  return GH.totals;
}

export function getGithubLanguages() {
  return GH.languages;
}
