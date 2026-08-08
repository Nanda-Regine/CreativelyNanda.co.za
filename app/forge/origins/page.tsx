import { Metadata } from 'next';
import OriginsFeature from '@/components/forge/OriginsFeature';
import { ORIGINS } from '@/lib/data/forge-origins';

export const metadata: Metadata = {
  title: 'Where It Started | The nine foundation projects — Nandawula Regine',
  description:
    'The build chronicle behind a self-taught engineer: nine foundation projects, sequenced in six layers from raw HTML to real-time systems and payment webhooks. Each with its brief, its build, and the lesson kept.',
  keywords: [
    'self-taught developer journey',
    'foundation projects portfolio',
    'how to learn full-stack development',
    'African software engineer',
    'South African developer portfolio',
    'PayFast ITN integration',
    'Supabase Postgres tsrange',
    'Mapbox accessibility platform',
    'learning architecture developer',
    'Nandawula Regine',
    'Mirembe Muse',
  ],
  openGraph: {
    title: 'Where It Started | The nine foundation projects',
    description:
      'Nine projects, six layers, one sequence — the chronicle of how a poet learned to build. Each project ends on the lesson it taught.',
    url: 'https://creativelynanda.co.za/forge/origins',
    type: 'article',
    images: [{ url: 'https://creativelynanda.co.za/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where It Started | The nine foundation projects',
    description: 'Nine projects, six layers, one sequence. The build chronicle.',
    images: ['https://creativelynanda.co.za/og-image.png'],
  },
  alternates: { canonical: 'https://creativelynanda.co.za/forge/origins' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

// An ItemList of the nine, so the sequence itself is machine-readable — the
// order is the argument the room is making.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Where It Started — the nine foundation projects',
  url: 'https://creativelynanda.co.za/forge/origins',
  isPartOf: { '@type': 'WebSite', name: 'CreativelyNanda', url: 'https://creativelynanda.co.za' },
  about: {
    '@type': 'Person',
    name: 'Nandawula Regine Kabali-Kagwa',
    jobTitle: 'AI Engineer',
    worksFor: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd' },
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: ORIGINS.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: ORIGINS.map((p) => ({
      '@type': 'ListItem',
      position: p.n,
      item: {
        '@type': 'SoftwareSourceCode',
        name: p.title,
        description: p.subtitle,
        codeRepository: p.github,
        programmingLanguage: p.stack,
        author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa' },
      },
    })),
  },
};

export default function OriginsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <OriginsFeature />
    </>
  );
}
