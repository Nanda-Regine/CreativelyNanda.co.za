/**
 * 📱 /forge/studio — The App Studio
 *
 * Plain data only (lib/data/app-screens.ts); no corpus import, so no §3
 * exposure. The screens are served by Cloudinary; the source folders are not
 * deployed.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL, personRef } from '@/lib/seo';
import AppStudio from '@/components/forge/AppStudio';
import Shelf, { type ShelfBand } from '@/components/forge/studio/Shelf';
import { SCREENS, STUDIO_APPS, chaptersOf } from '@/lib/data/app-screens';
import { LIVE, BENCH, type RosterApp } from '@/lib/data/roster';
import { CLAIM_BY_ID } from '@/lib/data/evidence/claims';
import adminosScreens from '@/lib/data/evidence/adminos/screens.json';
import jarvisScreens from '@/lib/data/evidence/jarvis/screens.json';
import sanyuScreens from '@/lib/data/evidence/sanyu/screens.json';

const DESK_COUNT: Record<string, number> = { adminos: adminosScreens.length, jarvis: jarvisScreens.length, sanyu: sanyuScreens.length };

const screensOf = (a: RosterApp) => SCREENS.filter((s) => s.app === a.phone).length + (a.desk ? DESK_COUNT[a.desk] ?? 0 : 0);

const BANDS: Omit<ShelfBand, 'cards'>[] = [
  { band: 'own', title: 'Own products', note: 'Built, owned and run by Mirembe Muse.' },
  { band: 'client', title: 'Client platforms and partners', note: 'Built for clients, with one co-founded platform and one media studio under the Mirembe Muse roof.' },
  { band: 'internal', title: 'Internal', note: 'The systems the studio runs on.' },
];

export const metadata = createMetadata({
  title: 'The App Studio: 17 live products and 100 real screens',
  description:
    'The shelf of all 17 live Mirembe Muse products, labelled by relationship, and a hundred real screenshots from VarsityOS, K53 Drill Master and Sanyu Botanicals in phone frames: study planning, NSFAS budgeting, campus safety, road-sign drills and a hand-made storefront. Built by Nandawula Regine.',
  path: '/forge/studio',
  keywords: [
    'app screenshots portfolio',
    'mobile app UI South Africa',
    'VarsityOS student app',
    'K53 learner licence app',
    'NSFAS budget app',
    'campus safety app South Africa',
    'Next.js PWA portfolio',
    'African AI engineer',
    'Nandawula Regine',
  ],
});

export default function AppStudioPage() {
  const liveCount = Number(CLAIM_BY_ID['studio.live-count'].value);
  const bands: ShelfBand[] = BANDS.map((b) => ({
    ...b,
    cards: LIVE.filter((a) => a.band === b.band)
      .sort((x, y) => x.order - y.order)
      .map((app) => ({ app, screens: screensOf(app) })),
  }));
  const chapters = STUDIO_APPS.reduce((n, a) => n + chaptersOf(a.key).length, 0);

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The App Studio', path: '/forge/studio' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The App Studio',
      url: `${SITE_URL}/forge/studio`,
      author: personRef(),
      hasPart: STUDIO_APPS.map((a) => ({
        '@type': 'SoftwareApplication',
        name: a.name,
        url: a.live,
        description: a.line,
        applicationCategory: a.key === 'sanyu' ? 'ShoppingApplication' : 'EducationalApplication',
        operatingSystem: 'Web, Android, iOS (PWA)',
        creator: personRef(),
        screenshot: SCREENS.filter((s) => s.app === a.key)
          .slice(0, 6)
          .map((s) => `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_720/creativelynanda/app-screens/${s.app}/${s.id}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <AppStudio
        liveCount={liveCount}
        shelf={<Shelf bands={bands} bench={BENCH} liveCount={liveCount} />}
        figures={[
          { value: String(SCREENS.length), label: 'real screens' },
          { value: String(liveCount), label: 'live products' },
          { value: String(chapters), label: 'chapters' },
          { value: '0', label: 'mock-ups' },
        ]}
      />
    </>
  );
}
