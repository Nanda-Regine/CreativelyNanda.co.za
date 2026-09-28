/**
 * 📰 The Press — imprints and the issue calendar.
 *
 * BUILD_JOURNEY §19.3: "Retire 'blog'. Publish in numbered issues — the site
 * already has Issue 002 on the cover and The Engineer's Issue 003; one issue
 * calendar for the whole house."
 *
 * The URLs stay at /blog/{category}/{slug}. Every one of them is indexed and in
 * the feeds, and the name a reader sees costs nothing to change while a URL
 * costs weeks of re-indexing. So "blog" is retired from the page, not the path.
 *
 * ── THE CALENDAR ──────────────────────────────────────────────────────────────
 * Issues were backfilled by date (decided 2026-09-28): a piece belongs to the
 * issue whose window contains its `published_at`. 001 and 002 match the numbers
 * already printed on the April and June covers; 003 is The Engineer's Issue.
 * To open the next issue, add it here with its window. Nothing else changes.
 *
 * Plain data, no server imports, so client components may read it.
 */

export const PRESS_NAME = 'The House of Roses Press';
export const PRESS_SHORT = 'The Press';

export type ImprintKey = 'essays' | 'field-notes' | 'letters';

export interface Imprint {
  key: ImprintKey;
  /** The `blog_posts.category` value this imprint publishes. */
  category: string;
  name: string;
  /** One line, for the masthead and the imprint page. */
  line: string;
}

/**
 * The press's own imprints. `letters` is declared and shows nowhere until a
 * post with that category exists: no imprint without its content (§19.5.1).
 */
export const IMPRINTS: Imprint[] = [
  { key: 'essays', category: 'writing', name: 'Essays', line: 'On writing, heritage, and building as a Black African woman.' },
  { key: 'field-notes', category: 'dev', name: 'Field Notes', line: 'How the builds were made, decision by decision.' },
  { key: 'letters', category: 'letters', name: 'Letters', line: 'Personal, and addressed to someone.' },
];

export const IMPRINT_BY_CATEGORY: Record<string, Imprint> = Object.fromEntries(IMPRINTS.map((i) => [i.category, i]));

/**
 * Categories that stay live at their URLs but are not the press's: the business
 * essays belong to Mirembe Muse, which has no journal yet, and the Notion guides
 * are product pages. Kept, never lost, just not on the masthead.
 */
export const STUDIO_CATEGORIES: Record<string, { name: string; href: string }> = {
  business: { name: 'From the studio', href: '/blog/business' },
  notion: { name: 'Notion guides', href: '/products' },
};

export interface Issue {
  number: number;
  title: string;
  /** As printed on the cover. */
  dated: string;
  /** Inclusive window, UTC dates. A piece belongs to the issue its date falls in. */
  from: string;
  to: string;
  /** A feature that lives outside the press, e.g. /engineer. */
  feature?: { href: string; title: string; line: string };
}

export const ISSUES: Issue[] = [
  {
    number: 1,
    title: 'The Launch Issue',
    dated: 'April 2026',
    from: '2026-01-01',
    to: '2026-04-30',
  },
  {
    number: 2,
    title: 'Eight Apps, One Year',
    dated: 'June 2026',
    from: '2026-05-01',
    to: '2026-06-30',
  },
  {
    number: 3,
    title: 'The Making of an Engineer',
    dated: 'August 2026',
    from: '2026-07-01',
    to: '2026-09-27',
    feature: {
      href: '/engineer',
      title: 'The Making of an Engineer',
      line: 'A career feature in five chapters. Zero to eight live products in a year.',
    },
  },
  {
    number: 4,
    title: 'The Proof Issue',
    dated: 'October 2026',
    from: '2026-09-28',
    to: '2026-12-31',
  },
];

export const CURRENT_ISSUE = ISSUES[ISSUES.length - 1];

/** `Issue 003` */
export const issueLabel = (n: number) => `Issue ${String(n).padStart(3, '0')}`;

/** The issue a date belongs to, or null if it falls outside every window. */
export function issueFor(date: string | null | undefined): Issue | null {
  if (!date) return null;
  const d = date.slice(0, 10);
  return ISSUES.find((i) => d >= i.from && d <= i.to) ?? null;
}
