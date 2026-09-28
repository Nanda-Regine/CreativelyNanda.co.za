import { getFeedPosts, renderRss, FEED_HEADERS } from '@/lib/feeds';

// Regenerated at most hourly — a new essay reaches readers within the hour
// without every feed poll hitting Supabase.
export const revalidate = 3600;

export async function GET() {
  return new Response(renderRss(await getFeedPosts()), { headers: FEED_HEADERS.rss });
}
