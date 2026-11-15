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
import { SCREENS, STUDIO_APPS } from '@/lib/data/app-screens';
import { LIVE, BENCH } from '@/lib/data/roster';
import { CLAIM_BY_ID } from '@/lib/data/evidence/claims';
import { getFloors, mixOf } from '@/lib/data/studio-floor';

const BANDS: Omit<ShelfBand, 'cards'>[] = [
  { band: 'own', title: 'Own products', note: 'Built, owned and run by Mirembe Muse.' },
  { band: 'client', title: 'Client platforms and partners', note: 'Built for clients, with one co-founded platform and one media studio under the Mirembe Muse roof.' },
  { band: 'internal', title: 'Internal', note: 'The systems the studio runs on.' },
];

export const metadata = createMetadata({
  title: 'The App Studio: 17 live products, real screens from each',
  description:
    'The shelf of all 17 live Mirembe Muse products, labelled by relationship, and real screenshots from each product on its own floor, on the phone and on the desk: study planning, NSFAS budgeting, road-sign drills, a business OS and a hand-made storefront. Built by Nandawula Regine.',
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

export default async function AppStudioPage() {
  const liveCount = Number(CLAIM_BY_ID['studio.live-count'].value);
  const floors = await getFloors();
  const byKey = new Map(floors.map((f) => [f.app.key, f]));
  const bands: ShelfBand[] = BANDS.map((b) => ({
    ...b,
    cards: LIVE.filter((a) => a.band === b.band)
      .sort((x, y) => x.order - y.order)
      .map((app) => {
        const f = byKey.get(app.key);
        const desk = f?.shots.find((s) => s.kind === 'desk');
        // A plate becomes a real desk screen as soon as one is captured.
        const cover = app.cover.kind === 'plate' && desk ? { kind: 'desk' as const, id: desk.id } : app.cover;
        return { app, screens: f?.shots.length, floor: Boolean(f), cover };
      }),
  }));
  const total = floors.reduce((n, f) => n + f.shots.length, 0);
  const chapters = floors.reduce((n, f) => n + f.chapters.length, 0);
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
        mix={mixOf(floors, 5)}
        floors={floors.map((f) => ({ key: f.app.key, name: f.app.name, accent: f.app.accent, count: f.shots.length }))}
        total={total}
        shelf={<Shelf bands={bands} bench={BENCH} liveCount={liveCount} />}
        figures={[
          { value: String(total), label: 'real screens' },
          { value: String(liveCount), label: 'live products' },
          { value: String(chapters), label: 'chapters' },
          { value: '0', label: 'mock-ups' },
        ]}
      />
    </>
  );
}
