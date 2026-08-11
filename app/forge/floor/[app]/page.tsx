/**
 * 🔨 /forge/floor/[app] — one build's dossier
 *
 * Statically generated for every dossier slug. `generateStaticParams` is the
 * only place the corpus is touched per-route, which keeps §3's constraint easy
 * to hold: the corpus is read at build time and never at request time.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import BuildDossierView from '@/components/forge/BuildDossierView';
import { getFloor, getFloorEntry } from '@/lib/forge-data';
import { BUILD_DOSSIERS } from '@/lib/data/forge-builds';
import { SCAR_BY_SLUG } from '@/lib/data/forge-scars';

export function generateStaticParams() {
  return BUILD_DOSSIERS.map((d) => ({ app: d.slug }));
}

export async function generateMetadata({ params }: { params: { app: string } }): Promise<Metadata> {
  const entry = getFloorEntry(params.app);
  if (!entry) return createMetadata({ title: 'Not found', description: 'No such build.', path: `/forge/floor/${params.app}`, noIndex: true });

  const { dossier: d, gh } = entry;

  return createMetadata({
    title: `${d.name} — ${d.kicker}`,
    description: `${d.standfirst} ${d.decisions.length} technical decisions with their reasoning, and what they cost.`.slice(0, 300),
    path: `/forge/floor/${d.slug}`,
    ogType: 'article',
    keywords: [
      d.name,
      `${d.name} architecture`,
      `${d.name} build`,
      ...d.stack.slice(0, 6),
      'technical decisions',
      'engineering build journal',
      'South African software engineer',
      'Nandawula Regine',
      ...(gh?.live ? [gh.live.replace(/^https?:\/\//, '')] : []),
    ],
  });
}

export default function BuildDossierPage({ params }: { params: { app: string } }) {
  const entry = getFloorEntry(params.app);
  if (!entry) notFound();

  const { dossier: d, gh, sections, nights } = entry;

  // Neighbours follow the floor's own order (by commit weight), so walking the
  // dossiers with prev/next matches walking the index down the page.
  const floor = getFloor();
  const i = floor.findIndex((f) => f.dossier.slug === d.slug);
  const at = (n: number) => {
    const f = floor[n];
    return f ? { slug: f.dossier.slug, name: f.dossier.name } : null;
  };

  const scars = (d.scars ?? [])
    .map((slug) => SCAR_BY_SLUG[slug])
    .filter(Boolean)
    .map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }));

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Workshop Floor', path: '/forge/floor' },
      { name: d.name, path: `/forge/floor/${d.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${d.name} — ${d.kicker}`,
      description: d.standfirst,
      url: `${SITE_URL}/forge/floor/${d.slug}`,
      author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd' },
      inLanguage: 'en-ZA',
      about: d.stack,
      // The decisions are the substance of the page, so they are declared as the
      // article's sections rather than left as unstructured prose.
      articleSection: d.decisions.map((x) => x.title),
      ...(gh?.lastCommit ? { dateModified: gh.lastCommit } : {}),
      ...(gh?.firstCommit ? { datePublished: gh.firstCommit } : {}),
    },
    ...(gh?.live
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: d.name,
            description: d.standfirst,
            url: gh.live,
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa', url: SITE_URL },
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <BuildDossierView
        dossier={d}
        meta={{
          commitsLabel: (gh?.commits ?? 0).toLocaleString('en-ZA'),
          span: gh?.firstCommit ? `${gh.firstCommit} → ${gh.lastCommit}` : null,
          lastCommit: gh?.lastCommit ?? null,
          languages: gh?.languages.map((l) => ({ name: l.name, pct: l.pct })) ?? [],
          activity: gh?.activity ?? [],
          live: gh?.live ?? null,
          isPrivate: gh?.isPrivate ?? false,
          repo: gh?.repoUrl ?? null,
          sections,
          nights,
        }}
        scars={scars}
        neighbours={{ prev: at(i - 1), next: at(i + 1) }}
      />
    </>
  );
}
