/**
 * 🌙 /forge/nights — The Long Night
 *
 * ⚠️ SERVER COMPONENT. The corpus is reduced here to a list of dates, titles and
 * app names — never a body. See `getNights()` in `lib/forge-data.ts` and the
 * reasoning at the top of `components/forge/LongNight.tsx`.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import LongNight, { type NightRow } from '@/components/forge/LongNight';
import { getNightsByMonth, getNights, getFigures } from '@/lib/forge-data';
import { BUILD_DOSSIERS } from '@/lib/data/forge-builds';
import { SCARS } from '@/lib/data/forge-scars';
import corpus from '@/lib/data/forge-corpus.json';

export const metadata = createMetadata({
  title: 'The Long Night — the build diary, night by night',
  description:
    'The dated working diary of a solo engineer building eight products: every logged session, newest first, by its own title. Build-in-public as it actually happened rather than as it would be summarised afterwards.',
  path: '/forge/nights',
  keywords: [
    'build in public diary',
    'engineering work log',
    'solo developer build journal',
    'software build sessions',
    'night shift engineering',
    'African AI engineer',
    'South African software engineer',
    'Nandawula Regine',
    'JarvisOS',
  ],
});

/** A day label like "29 Jul", formatted once, on the server. */
function dayLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  });
}

export default function LongNightPage() {
  const months = getNightsByMonth().map((m) => ({
    month: m.month,
    nights: m.nights.map(
      (n): NightRow => ({
        date: n.date,
        day: dayLabel(n.date),
        month: n.month,
        app: n.app,
        title: n.title,
        words: n.words,
        headline: n.headline,
      })
    ),
  }));

  const all = getNights();
  const figures = getFigures(SCARS.length);

  const counts = all.reduce<Record<string, number>>((acc, n) => {
    acc[n.app] = (acc[n.app] || 0) + 1;
    return acc;
  }, {});

  const accentFor = (app: string) =>
    BUILD_DOSSIERS.find((d) => d.name === app || d.key.replace(/-/g, ' ') === app.toLowerCase())?.accent ??
    // Campus Compass is filed under its repository name in the corpus and its
    // product name on the floor; match it explicitly rather than by coincidence.
    (app === 'Campus Compass' ? '#4B5FD6' : '#C9943A');

  const apps = Object.entries(counts)
    .map(([name, count]) => ({ name, count, accent: accentFor(name) }))
    .sort((a, b) => b.count - a.count);

  const dates = all.map((n) => n.date).sort();
  const span = {
    from: dates[0] ?? '',
    to: dates[dates.length - 1] ?? '',
  };

  // Sessions logged but not datable. Stated on the page rather than quietly
  // dropped — §5.4 is explicit that this room must not imply it is complete.
  const totalSessions = (corpus.entries as { class: string }[]).filter((e) => e.class === 'session').length;
  const undated = Math.max(0, totalSessions - all.length);

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Long Night', path: '/forge/nights' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Long Night',
      description: 'The dated build diary — every logged working session, newest first.',
      url: `${SITE_URL}/forge/nights`,
      isPartOf: { '@type': 'WebSite', name: 'Creatively Nanda', url: SITE_URL },
      author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa', url: SITE_URL },
      // A count a crawler can trust, matched to what the page actually renders.
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: all.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <LongNight
        months={months}
        apps={apps}
        span={span}
        undated={undated}
        figures={[
          { value: String(all.length), label: 'dated nights' },
          { value: String(apps.length), label: 'builds worked on' },
          { value: String(months.length), label: 'months of record' },
          { value: `${Math.round(figures.words / 1000)}k`, label: 'words written down' },
        ]}
      />
    </>
  );
}
