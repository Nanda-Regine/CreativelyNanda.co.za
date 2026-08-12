/**
 * 🔨 /forge/floor — The Workshop Floor
 *
 * ⚠️ SERVER COMPONENT. `lib/forge-data.ts` reads the 1.21 MB corpus and must
 * stay on this side of the boundary — see the constraint at the top of that
 * file and `docs/THE_FORGE.md` §3. Everything below is reduced to plain
 * strings and numbers before it is handed to `<WorkshopFloor />`.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import WorkshopFloor, { type FloorCard } from '@/components/forge/WorkshopFloor';
import { getFloor, getFigures, getGithubTotals, getGithubLanguages, getCommitWall } from '@/lib/forge-data';
import { SCARS } from '@/lib/data/forge-scars';

export const metadata = createMetadata({
  title: 'The Workshop Floor — every build, one dossier each',
  description:
    'Nine working systems, each with the problem it solved, the technical decisions the constraint forced, and what those decisions cost. Written from 99,000 words of build journal and measured against 3,000 commits.',
  path: '/forge/floor',
  keywords: [
    'software build dossier',
    'technical decisions engineering',
    'architecture decision records',
    'multi-tenant Supabase RLS',
    'WhatsApp first product South Africa',
    'offline first PWA Africa',
    'prompt caching cost architecture',
    'South African software engineer',
    'African AI engineer',
    'build in public',
    'Nandawula Regine',
    'Mirembe Muse',
  ],
});

export default function WorkshopFloorPage() {
  const floor = getFloor();
  const totals = getGithubTotals();
  const figures = getFigures(SCARS.length);
  const wall = getCommitWall();

  const cards: FloorCard[] = floor.map(({ dossier, gh, sections, nights }) => ({
    slug: dossier.slug,
    name: dossier.name,
    kicker: dossier.kicker,
    standfirst: dossier.standfirst,
    accent: dossier.accent,
    logo: dossier.logo ?? null,
    commits: gh?.commits ?? 0,
    // Formatted here, on the server, once. A client calling toLocaleString can
    // disagree with the server's call — that is the hydration bug written up in
    // the Scar Room, and it is cheaper to never have the option.
    commitsLabel: (gh?.commits ?? 0).toLocaleString('en-ZA'),
    language: gh?.languages[0]?.name ?? null,
    live: gh?.live ?? null,
    isPrivate: gh?.isPrivate ?? false,
    span: gh?.firstCommit ? `${gh.firstCommit.slice(0, 7)} → ${gh.lastCommit.slice(0, 7)}` : null,
    sections,
    nights,
    decisions: dossier.decisions.length,
  }));

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Workshop Floor', path: '/forge/floor' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Workshop Floor',
      description: 'Build dossiers for nine working software systems — the problem, the decisions, the cost.',
      url: `${SITE_URL}/forge/floor`,
      isPartOf: { '@type': 'WebSite', name: 'Creatively Nanda', url: SITE_URL },
      // Each build is a real, reachable application. Declaring them as such is
      // what lets a search engine understand this page as a body of work rather
      // than as a list of article links.
      hasPart: floor
        .filter((f) => f.gh?.live)
        .map((f) => ({
          '@type': 'SoftwareApplication',
          name: f.dossier.name,
          description: f.dossier.standfirst,
          url: f.gh!.live,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          author: {
            '@type': 'Person',
            name: 'Nandawula Regine Kabali-Kagwa',
            url: SITE_URL,
          },
        })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkshopFloor
        cards={cards}
        figures={[
          { value: String(cards.length), label: 'builds on the floor' },
          { value: totals.commits.toLocaleString('en-ZA'), label: 'commits, measured' },
          { value: `${Math.round(figures.words / 1000)}k`, label: 'words of build journal' },
          { value: String(figures.nights), label: 'nights in the diary' },
          { value: String(totals.liveApps), label: 'live in production' },
        ]}
        languages={getGithubLanguages()}
        activity={wall.activity}
        generatedAt={wall.generatedAt}
      />
    </>
  );
}
