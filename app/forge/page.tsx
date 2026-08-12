import { Metadata } from 'next';
import ForgeThreshold, { type ForgeStats } from '@/components/forge/ForgeThreshold';
import { ORIGINS } from '@/lib/data/forge-origins';

// ⚠️ SERVER-ONLY IMPORT. forge-corpus.json is 1.21 MB and contains every section
// still marked `review: 'pending'` plus everything flagged `sensitive`. It must
// never be imported from a 'use client' file, directly or transitively — doing
// so ships the entire unreviewed build journal to the browser and makes the
// curation gate decorative. Here it is reduced to four integers before crossing
// into the client component. See docs/THE_FORGE.md §3.
import corpus from '@/lib/data/forge-corpus.json';
import { getGithubTotals } from '@/lib/forge-data';

export const metadata: Metadata = {
  title: 'The Forge | The workshop behind the poems — Nandawula Regine',
  description:
    'A wing of the house where the code lives. Not a portfolio — a workshop: build journals, postmortems, the wrong turns and the nights something broke. Engineering as a creative medium.',
  keywords: [
    'build in public engineer',
    'engineering build journal',
    'software postmortems',
    'AI engineer portfolio',
    'African AI engineer',
    'South African software engineer',
    'self-taught engineer',
    'Nandawula Regine',
    'Mirembe Muse',
    'KuGompo City developer',
  ],
  openGraph: {
    title: 'The Forge | The workshop behind the poems',
    description:
      'The garden is where she writes. This is where she builds — drafts, wrong turns, and the reason things broke.',
    url: 'https://creativelynanda.co.za/forge',
    type: 'website',
    images: [{ url: 'https://creativelynanda.co.za/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Forge | The workshop behind the poems',
    description: 'Not a portfolio. A workshop.',
    images: ['https://creativelynanda.co.za/og-image.png'],
  },
  alternates: { canonical: 'https://creativelynanda.co.za/forge' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The Forge',
  description: 'The engineering wing of CreativelyNanda — build journals, postmortems and foundation projects.',
  url: 'https://creativelynanda.co.za/forge',
  isPartOf: { '@type': 'WebSite', name: 'CreativelyNanda', url: 'https://creativelynanda.co.za' },
  about: {
    '@type': 'Person',
    name: 'Nandawula Regine Kabali-Kagwa',
    jobTitle: 'AI Engineer',
    worksFor: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd' },
  },
};

// Derived at build time so the threshold never states a number that has drifted
// from the corpus it claims to describe. The commit count comes from the GitHub
// API rather than from the prose, for the same reason.
function readStats(): ForgeStats {
  const entries = corpus.entries as { app: string; words: number; class: string }[];
  const totals = getGithubTotals();
  return {
    apps: new Set(entries.map((e) => e.app)).size,
    words: entries.reduce((a, e) => a + e.words, 0),
    sessions: entries.filter((e) => e.class === 'session').length,
    projects: ORIGINS.length,
    commits: totals.commits.toLocaleString('en-ZA'),
    repos: totals.repos,
  };
}

export default function ForgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <ForgeThreshold stats={readStats()} />
    </>
  );
}
