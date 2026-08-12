/**
 * 🩹 /forge/scars — The Scar Room
 *
 * The content is hand-written in `lib/data/forge-scars.ts` and imports no
 * corpus, so this page has no §3 exposure at all. It still reads the corpus for
 * its figures, which is why it is a server component.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import ScarRoom from '@/components/forge/ScarRoom';
import { SCARS } from '@/lib/data/forge-scars';
import { getFigures } from '@/lib/forge-data';

export const metadata = createMetadata({
  title: 'The Scar Room — what broke, and why the system allowed it',
  description:
    'Nine postmortems from a year of shipping: what broke, how it was found, the actual root cause, the fix, and what the night cost. Including the pagination default that killed four dashboards for a month, and the signature bug that broke every payment.',
  path: '/forge/scars',
  ogType: 'article',
  keywords: [
    'software postmortem',
    'root cause analysis engineering',
    'production incident write-up',
    'silent failure monitoring',
    'PayFast signature bug',
    'React hydration error 425',
    'Supabase listUsers pagination',
    'engineering blameless postmortem',
    'South African software engineer',
    'African AI engineer',
    'Nandawula Regine',
  ],
});

export default function ScarRoomPage() {
  const figures = getFigures(SCARS.length);
  const written = SCARS.filter((s) => s.written).length;

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Scar Room', path: '/forge/scars' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Scar Room',
      description: 'Nine engineering postmortems — what broke, how it was found, the cause, the fix, the cost.',
      url: `${SITE_URL}/forge/scars`,
      isPartOf: { '@type': 'WebSite', name: 'Creatively Nanda', url: SITE_URL },
      author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa', url: SITE_URL },
      // Each scar is its own TechArticle so a search engine can surface the one
      // that matches the bug somebody is currently searching for. That is the
      // whole SEO argument for this room: these are the queries engineers type.
      hasPart: SCARS.map((s) => ({
        '@type': 'TechArticle',
        headline: s.title,
        description: s.summary,
        url: `${SITE_URL}/forge/scars#${s.slug}`,
        author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa' },
        inLanguage: 'en-ZA',
        about: s.build,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScarRoom
        scars={SCARS}
        figures={[
          { value: String(SCARS.length), label: 'postmortems' },
          { value: String(written), label: 'written for this room' },
          { value: String(figures.sessions), label: 'sessions they came out of' },
          { value: figures.commits.toLocaleString('en-ZA'), label: 'commits behind them' },
        ]}
      />
    </>
  );
}
