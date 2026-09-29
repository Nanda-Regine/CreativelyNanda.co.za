/**
 * 📱 /forge/studio — The App Studio
 *
 * Plain data only (lib/data/app-screens.ts); no corpus import, so no §3
 * exposure. The screens are served by Cloudinary; the source folders are not
 * deployed.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL, personRef } from '@/lib/seo';
import AppStudio from '@/components/forge/AppStudio';
import { SCREENS, STUDIO_APPS, chaptersOf } from '@/lib/data/app-screens';

export const metadata = createMetadata({
  title: 'The App Studio: 100 real screens from three live products',
  description:
    'A hundred real screenshots from VarsityOS, K53 Drill Master and Sanyu Botanicals, shown in phone frames: study planning, NSFAS budgeting, campus safety, road-sign drills and a hand-made storefront. Built by Nandawula Regine.',
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
        figures={[
          { value: String(SCREENS.length), label: 'real screens' },
          { value: String(STUDIO_APPS.length), label: 'live products' },
          { value: String(chapters), label: 'chapters' },
          { value: '0', label: 'mock-ups' },
        ]}
      />
    </>
  );
}
