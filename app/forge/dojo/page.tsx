/**
 * 🥋 /forge/dojo — The Dojo
 *
 * Joins each drill to its scar here, on the server, so the client component
 * receives only the few fields it shows and never imports the scar file.
 * Hand-written content only; no corpus import, so no §3 exposure.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL, personRef } from '@/lib/seo';
import DojoRoom, { type DojoItem } from '@/components/forge/DojoRoom';
import { DRILLS } from '@/lib/data/forge-drills';
import { SCAR_BY_SLUG } from '@/lib/data/forge-scars';

export const metadata = createMetadata({
  title: 'The Dojo — debugging drills from real production incidents',
  description:
    'Eight debugging drills built from real incidents: here is the symptom exactly as it arrived — what is the cause? Commit to a diagnosis, then see why every wrong answer was tempting. Pagination defaults, payment signatures, React hydration, regex flags.',
  path: '/forge/dojo',
  keywords: [
    'debugging exercises',
    'debugging practice real bugs',
    'root cause analysis practice',
    'guess the bug',
    'React hydration error 425 cause',
    'PayFast signature mismatch',
    'regex case insensitive character class',
    'silent failure debugging',
    'South African software engineer',
    'African AI engineer',
    'Nandawula Regine',
  ],
});

export default function DojoPage() {
  const items: DojoItem[] = DRILLS.map((drill) => {
    const scar = SCAR_BY_SLUG[drill.scar];
    if (!scar) throw new Error(`Drill points at a scar that does not exist: ${drill.scar}`);
    return { drill, title: scar.title, build: scar.build, buildSlug: scar.buildSlug };
  });

  const options = DRILLS.reduce((n, d) => n + d.options.length, 0);
  const builds = new Set(items.map((i) => i.build)).size;

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Dojo', path: '/forge/dojo' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: 'The Dojo — debugging drills from real incidents',
      description: 'Diagnose the root cause of real production incidents from their symptoms.',
      url: `${SITE_URL}/forge/dojo`,
      author: personRef(),
      inLanguage: 'en-ZA',
      educationalLevel: 'intermediate',
      about: ['Debugging', 'Root cause analysis', 'Software engineering'],
      isPartOf: { '@type': 'WebSite', name: 'Creatively Nanda', url: SITE_URL },
      hasPart: items.map((i) => ({
        '@type': 'Question',
        name: i.drill.symptom,
        url: `${SITE_URL}/forge/dojo#${i.drill.scar}`,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <DojoRoom
        items={items}
        figures={[
          { value: String(DRILLS.length), label: 'drills' },
          { value: String(options), label: 'hypotheses, each explained' },
          { value: String(builds), label: 'systems they broke' },
          { value: '0', label: 'invented bugs' },
        ]}
      />
    </>
  );
}
