import { MetadataRoute } from 'next';
import { BUILD_DOSSIERS } from '@/lib/data/forge-builds';

/**
 * The sitemap.
 *
 * ⚠️ This file had drifted badly: it listed 25 URLs while the site served
 * roughly forty public routes, so the entire Forge wing, the poetry rooms, the
 * engineer feature, education, roots and the project pages were absent — not
 * blocked, just never declared. Search Console reads this file as the claim
 * about what exists, and a page that is only reachable by crawl is discovered
 * late and re-crawled rarely.
 *
 * The rule for keeping it honest: a route added under `app/` is added here in
 * the same commit. `changeFrequency` and `priority` are hints, not promises —
 * they are set from how often the page actually changes, not from how much
 * anyone would like it to rank.
 */

const BASE_URL = 'https://creativelynanda.co.za';

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

// ── The wings ────────────────────────────────────────────────────────────────
const CORE: Entry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
];

/**
 * The Forge — the engineering wing. High priority on purpose: these are the
 * pages that answer the queries an engineer actually types (a postmortem, an
 * architecture decision, a named bug), and they are the newest on the site.
 */
const FORGE: Entry[] = [
  { path: '/forge', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/forge/floor', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/forge/scars', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/forge/nights', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/forge/commits', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/forge/origins', changeFrequency: 'monthly', priority: 0.8 },
  // The career feature keeps its own URL and canonical — THE_FORGE.md §8 is
  // explicit that /engineer is well-indexed and must never be redirected.
  { path: '/engineer', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-engineer', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/education', changeFrequency: 'monthly', priority: 0.7 },
];

const POETRY: Entry[] = [
  { path: '/poetry', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/poetry/collection', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/poetry/wall', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/poetry/stage', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/poetry/lineage', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/poetry/poet-who-codes', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/poetry/games', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/poetry/community', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/poetry/my-garden', changeFrequency: 'monthly', priority: 0.5 },
];

const STORY: Entry[] = [
  { path: '/roots', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gallery', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/press', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/sanyu', changeFrequency: 'monthly', priority: 0.5 },
];

const SHOP: Entry[] = [
  { path: '/products', changeFrequency: 'weekly', priority: 0.7 },
  ...[
    'writers-sanctuary',
    'creators-studio',
    'music-artist-career-command-center',
    'high-school-academic-excellence',
    'varsity-academic-excellence',
    'sme-command-center',
  ].map((slug): Entry => ({ path: `/products/${slug}`, changeFrequency: 'monthly', priority: 0.8 })),
];

const LEGAL: Entry[] = [
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/returns', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: Entry[] = [
    ...CORE,
    ...FORGE,
    // Generated from the dossier list rather than typed out, so adding a build
    // to the Workshop Floor cannot leave its page undeclared.
    ...BUILD_DOSSIERS.map((d): Entry => ({
      path: `/forge/floor/${d.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...POETRY,
    ...STORY,
    ...SHOP,
    ...LEGAL,
  ];

  return entries.map((e) => ({
    url: `${BASE_URL}${e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
