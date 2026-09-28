import { getFeedPosts, renderRss, renderJsonFeed, FEED_HEADERS, IMPRINTS, type Imprint } from '@/lib/feeds';

/** One feed per imprint: /feed/essays.xml, /feed/field-notes.json, … */
export const revalidate = 3600;
export const dynamicParams = false;

const FORMATS = ['xml', 'json'] as const;

export function generateStaticParams() {
  return (Object.keys(IMPRINTS) as Imprint[]).flatMap((imprint) => FORMATS.map((ext) => ({ file: `${imprint}.${ext}` })));
}

export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const [imprint, ext] = params.file.split('.') as [Imprint, (typeof FORMATS)[number]];
  if (!(imprint in IMPRINTS) || !FORMATS.includes(ext)) return new Response('Not found', { status: 404 });
  const posts = await getFeedPosts(imprint);
  return ext === 'xml'
    ? new Response(renderRss(posts, imprint), { headers: FEED_HEADERS.rss })
    : new Response(renderJsonFeed(posts, imprint), { headers: FEED_HEADERS.json });
}
