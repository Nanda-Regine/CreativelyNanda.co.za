import { getFeedPosts, renderJsonFeed, FEED_HEADERS } from '@/lib/feeds';

export const revalidate = 3600;

export async function GET() {
  return new Response(renderJsonFeed(await getFeedPosts()), { headers: FEED_HEADERS.json });
}
