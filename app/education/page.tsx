import EducationView from '@/components/education/EducationView';
import { PERSON_ID, AUTHOR_ALTERNATE_NAMES } from '@/lib/seo';
import type { LedgerSeries } from '@/components/education/LearningLedger';
import { CREDENTIALS } from '@/lib/data/credentials';
// Server-only: reduced to one array of weekly totals before it reaches the
// client. (Never import lib/forge-data here — it pulls the 1.2 MB corpus.)
import github from '@/lib/data/forge-github.json';

const DAY = 86_400_000;

/**
 * GitHub's commit_activity is 52 weekly buckets, each starting on a Sunday, the
 * last one being the week the snapshot was taken. Summed across every measured
 * repo, that is the shipping curve the Ledger draws.
 */
function ledgerSeries(): LedgerSeries {
  const builds = github.builds as { activity: number[] }[];
  const len = Math.max(...builds.map((b) => b.activity.length));
  const weeks = Array.from({ length: len }, (_, i) =>
    builds.reduce((sum, b) => sum + (b.activity[i - (len - b.activity.length)] ?? 0), 0),
  );
  const measured = Date.parse(`${github.generatedAt}T00:00:00Z`);
  const lastSunday = measured - new Date(measured).getUTCDay() * DAY;
  const start = new Date(lastSunday - (len - 1) * 7 * DAY).toISOString().slice(0, 10);
  return { start, weeks, repos: builds.length, measuredAt: github.generatedAt };
}

/**
 * Every hung certificate as an EducationalOccupationalCredential on the Person,
 * plus the three NMU qualifications — so search engines and AI assistants read
 * the same record the Hall shows. Both names are declared: the certificates say
 * Kabali-Kagwa, the site leads with Regine (BUILD_JOURNEY §19.5 item 2).
 */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://creativelynanda.co.za/education',
  mainEntity: {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Nandawula Regine Kabali-Kagwa',
    alternateName: AUTHOR_ALTERNATE_NAMES,
    url: 'https://creativelynanda.co.za',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Nelson Mandela University',
      address: { '@type': 'PostalAddress', addressLocality: 'Gqeberha', addressCountry: 'ZA' },
    },
    hasCredential: [
      ...[
        ['Higher Certificate in Business Management', 'NQF Level 5', '2020'],
        ['Diploma in Business Management', 'NQF Level 6', '2023'],
        ['Advanced Diploma in Business Management', 'NQF Level 7', '2024'],
      ].map(([name, level, year]) => ({
        '@type': 'EducationalOccupationalCredential',
        name,
        credentialCategory: 'NQF qualification',
        educationalLevel: level,
        dateCreated: year,
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Nelson Mandela University' },
      })),
      ...CREDENTIALS.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.title,
        credentialCategory: 'certificate',
        dateCreated: c.date,
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        ...(c.credentialId ? { identifier: c.credentialId } : {}),
        ...(c.verifyUrl ? { url: c.verifyUrl } : {}),
        image: `https://creativelynanda.co.za${c.image.src}`,
      })),
    ],
  },
};

export default function EducationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <EducationView ledger={ledgerSeries()} />
    </>
  );
}
