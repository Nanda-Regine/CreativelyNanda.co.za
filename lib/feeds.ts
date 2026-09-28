/**
 * Feeds — RSS 2.0 and JSON Feed 1.1 for the writing on this site.
 *
 * BUILD_JOURNEY §19.5 item 3: people now ask assistants "who is…", and feed
 * readers, aggregators and AI crawlers all read feeds before they read pages.
 *
 * Only the two imprints that belong to CreativelyNanda are syndicated —
 * *Essays* (`writing`) and *Field Notes* (`dev`). `business` posts belong on
 * Mirembe Muse (positioning rule) and `notion` posts are product guides, so
 * neither is put into a feed from here.
 *
 * Source is Supabase `blog_posts` (published only). The seed file is NOT a
 * fallback here: its dates are `new Date()` relative, so a feed built from it
 * would re-date every entry on every deploy and readers would see them all as
 * new. An empty feed is better than a dishonest one.
 */
import { createServerClient } from '@/lib/supabase/server';
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from '@/lib/seo';

export type Imprint = 'essays' | 'field-notes';

export const IMPRINTS: Record<Imprint, { category: string; title: string; description: string }> = {
  essays: {
    category: 'writing',
    title: 'Essays',
    description: 'Essays by Nandawula Regine Kabali-Kagwa — on writing, heritage, and building as a Black African woman.',
  },
  'field-notes': {
    category: 'dev',
    title: 'Field Notes',
    description: 'Field notes from the Forge — how Nandawula Regine Kabali-Kagwa builds AI products for Africa, decision by decision.',
  },
};

export interface FeedPost {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[] | null;
  cover_image: string | null;
  published_at: string;
  updated_at: string | null;
}

export async function getFeedPosts(imprint?: Imprint, limit = 50): Promise<FeedPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return [];
  const categories = imprint ? [IMPRINTS[imprint].category] : Object.values(IMPRINTS).map((i) => i.category);
  const { data, error } = await createServerClient()
    .from('blog_posts')
    .select('slug,title,excerpt,content,category,tags,cover_image,published_at,updated_at')
    .eq('is_published', true)
    .in('category', categories)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[feeds] blog_posts query failed:', error.message);
    return [];
  }
  return (data ?? []) as FeedPost[];
}

export const postUrl = (p: Pick<FeedPost, 'category' | 'slug'>) => `${SITE_URL}/blog/${p.category}/${p.slug}`;

const imageUrl = (src: string | null) => (!src ? undefined : src.startsWith('http') ? src : `${SITE_URL}${src}`);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function feedMeta(imprint?: Imprint) {
  const i = imprint ? IMPRINTS[imprint] : null;
  return {
    title: i ? `${i.title} — ${SITE_NAME}` : `${SITE_NAME} — Essays & Field Notes`,
    description: i
      ? i.description
      : 'Essays and field notes by Nandawula Regine Kabali-Kagwa — Ugandan-South African poet and AI engineer.',
    home: i ? `${SITE_URL}/blog/${i.category}` : `${SITE_URL}/blog`,
    self: (ext: 'xml' | 'json') => (imprint ? `${SITE_URL}/feed/${imprint}.${ext}` : `${SITE_URL}/feed.${ext}`),
  };
}

export function renderRss(posts: FeedPost[], imprint?: Imprint): string {
  const m = feedMeta(imprint);
  const items = posts
    .map((p) => {
      const url = postUrl(p);
      const cats = [IMPRINTS[p.category === 'dev' ? 'field-notes' : 'essays'].title, ...(p.tags ?? [])]
        .map((c) => `      <category>${esc(c)}</category>`)
        .join('\n');
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      <dc:creator>${esc(AUTHOR_NAME)}</dc:creator>
${cats}
      <description>${esc(p.excerpt ?? '')}</description>
    </item>`;
    })
    .join('\n');
  const lastBuild = posts[0] ? new Date(posts[0].updated_at ?? posts[0].published_at).toUTCString() : new Date(0).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(m.title)}</title>
    <link>${m.home}</link>
    <description>${esc(m.description)}</description>
    <language>en-za</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${m.self('xml')}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

export function renderJsonFeed(posts: FeedPost[], imprint?: Imprint): string {
  const m = feedMeta(imprint);
  const author = { name: AUTHOR_NAME, url: SITE_URL };
  return JSON.stringify(
    {
      version: 'https://jsonfeed.org/version/1.1',
      title: m.title,
      home_page_url: m.home,
      feed_url: m.self('json'),
      description: m.description,
      language: 'en-ZA',
      authors: [author],
      items: posts.map((p) => ({
        id: postUrl(p),
        url: postUrl(p),
        title: p.title,
        summary: p.excerpt ?? undefined,
        // Full text as written (Markdown) — the whole point is to be readable
        // by machines without scraping the page.
        content_text: p.content,
        image: imageUrl(p.cover_image),
        date_published: new Date(p.published_at).toISOString(),
        date_modified: p.updated_at ? new Date(p.updated_at).toISOString() : undefined,
        tags: p.tags ?? undefined,
        authors: [author],
      })),
    },
    null,
    2,
  );
}

export const FEED_HEADERS = {
  rss: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  json: { 'Content-Type': 'application/feed+json; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
};
