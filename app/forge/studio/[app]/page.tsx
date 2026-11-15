/**
 * /forge/studio/[app] - one product's floor, phone and desk screens together.
 * Static for every roster app that has captured screens, 404 for the rest.
 * Only this app's screen data is resolved (lib/data/studio-floor.ts), so the
 * route ships one product's manifests, not all of them.
 */
import { notFound } from 'next/navigation';
import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL, personRef } from '@/lib/seo';
import { getFloor, getFloors, getReel } from '@/lib/data/studio-floor';
import StudioFloor, { type NextDoor } from '@/components/forge/studio/StudioFloor';
import { screenUrl, mediaBase } from '@/lib/data/evidence/media';
import { cldScreenId } from '@/lib/data/app-screens';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getFloors()).map((f) => ({ app: f.app.key }));
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ app: string }> }) {
  const { app } = await paramsPromise;
  const f = await getFloor(app);
  return createMetadata({
    title: f ? `${f.app.name}: ${f.shots.length} real screens` : 'App Studio floor',
    description: f ? `${f.shots.length} real screens from ${f.app.name}, by chapter, on phone and desk. ${f.app.line}` : 'App Studio floor',
    path: `/forge/studio/${app}`,
  });
}

export default async function FloorPage({ params: paramsPromise }: { params: Promise<{ app: string }> }) {
  const { app } = await paramsPromise;
  const floor = await getFloor(app);
  if (!floor) notFound();

  const floors = await getFloors();
  const reel = await getReel(app);
  const at = floors.findIndex((f) => f.app.key === app);
  const n = floors.length > 1 ? floors[(at + 1) % floors.length] : null;
  const nextCover = n ? (n.shots.find((s) => s.kind === 'desk') ?? n.shots[0]) : null;
  const next: NextDoor | null = n && nextCover ? { key: n.app.key, name: n.app.name, paper: n.app.paper, accentInk: n.app.accentInk, shot: nextCover, host: n.app.host } : null;

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const screenshot = floor.shots.slice(0, 6).map((s) => (s.kind === 'desk' ? screenUrl(s.id, 960) : `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_720/${cldScreenId(s)}`));

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbJsonLd([
            { name: 'Home', path: '' },
            { name: 'The Forge', path: '/forge' },
            { name: 'The App Studio', path: '/forge/studio' },
            { name: floor.app.name, path: `/forge/studio/${app}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: floor.app.name,
            description: floor.app.line,
            url: `${SITE_URL}/forge/studio/${app}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            creator: personRef(),
            screenshot,
            ...(floor.app.liveUrl ? { sameAs: floor.app.liveUrl } : {}),
          },
        ]}
      />
      <StudioFloor floor={floor} next={next} reel={reel} mediaBase={mediaBase()} />
    </>
  );
}
