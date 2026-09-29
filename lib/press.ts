/**
 * 📰 The Press — server data layer.
 *
 * One place that reads `blog_posts` for the press's reading pages, so the front
 * page, the article page and its layout (metadata + JSON-LD) agree on what a
 * post is. `cache()` dedupes the layout's fetch and the page's fetch into one
 * query per request.
 *
 * Supabase is the only source. The seed file used to be a fallback here; its
 * dates are `new Date()`-relative, so every deploy re-dated every article
 * (BUILD_JOURNEY §21). A Supabase error now throws, which under ISR keeps the
 * last good page rather than serving a dishonest one.
 *
 * Unpublished posts are readable only outside production, behind `?preview=1`,
 * through the service-role client. That is how new pieces are proofread on a
 * dev server before they are published; production never takes that path.
 */

// Server-only by construction: it reads the service-role client. No client
// component may import it (the `server-only` package is not installed here).
import { cache } from 'react';
import { createServerClient, createAdminClient } from '@/lib/supabase/server';
import { issueFor, IMPRINT_BY_CATEGORY, STUDIO_CATEGORIES, type Issue } from '@/lib/data/press-issues';
import { DRAFTS } from '@/lib/data/press-drafts';
import { diffWords, diffStats, type DiffSegment } from '@/lib/diff-words';

export interface PressPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[] | null;
  cover_image: string | null;
  reading_time: number | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  view_count: number;
  like_count: number;
}

export type PressCard = Omit<PressPost, 'content'> & {
  issue: Issue | null;
  imprintName: string;
  studio: boolean;
};

const CARD_FIELDS =
  'id,slug,title,excerpt,category,tags,cover_image,reading_time,is_published,published_at,created_at,updated_at,view_count,like_count';

const configured = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function imprintNameFor(category: string): string {
  return IMPRINT_BY_CATEGORY[category]?.name ?? STUDIO_CATEGORIES[category]?.name ?? category;
}

function toCard(p: Omit<PressPost, 'content'>): PressCard {
  return {
    ...p,
    issue: issueFor(p.published_at),
    imprintName: imprintNameFor(p.category),
    studio: !IMPRINT_BY_CATEGORY[p.category],
  };
}

/** Every published post, newest first, without bodies. */
export const getPressCards = cache(async (): Promise<PressCard[]> => {
  if (!configured()) return [];
  const { data, error } = await createServerClient()
    .from('blog_posts')
    .select(CARD_FIELDS)
    .eq('is_published', true)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });
  if (error) throw new Error(`[press] blog_posts list failed: ${error.message}`);
  return (data ?? []).map((p) => toCard(p as Omit<PressPost, 'content'>));
});

/** One post with its body. `preview` reads drafts, and only outside production. */
export const getPressPost = cache(async (slug: string, preview = false): Promise<PressPost | null> => {
  if (!configured()) return null;
  const canPreview = preview && process.env.NODE_ENV !== 'production' && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const client = canPreview ? createAdminClient() : createServerClient();
  let q = client.from('blog_posts').select(`${CARD_FIELDS},content`).eq('slug', slug);
  if (!canPreview) q = q.eq('is_published', true);
  const { data, error } = await q.maybeSingle();
  if (error) throw new Error(`[press] blog_posts read failed: ${error.message}`);
  return (data as PressPost | null) ?? null;
});

export const wordCount = (s: string) => (s.match(/\S+/g) ?? []).length;

// ─────────────────────────────────────────────────────────────────────────────
// Draft diffs
// ─────────────────────────────────────────────────────────────────────────────

export interface Revision {
  label: string;
  date: string | null;
  note?: string;
  words: number;
  /** The diff from the previous version. Empty for the first draft. */
  segments: DiffSegment[];
  added: number;
  removed: number;
}

/**
 * The essay's history, oldest first, ending in the published text. Null when
 * no real drafts are on file, and the article then claims nothing.
 */
export function getRevisions(post: Pick<PressPost, 'slug' | 'content' | 'published_at'>): Revision[] | null {
  const drafts = DRAFTS[post.slug];
  if (!drafts?.length) return null;
  const versions = [
    ...drafts.map((d, i) => ({ label: `Draft ${i + 1}`, date: d.date, note: d.note, content: d.content })),
    { label: 'As published', date: post.published_at?.slice(0, 10) ?? null, note: undefined, content: post.content },
  ];
  return versions.map((v, i) => {
    const segments = i === 0 ? [{ op: 'same' as const, text: v.content }] : diffWords(versions[i - 1].content, v.content);
    const { added, removed } = i === 0 ? { added: 0, removed: 0 } : diffStats(segments);
    return { label: v.label, date: v.date, note: v.note, words: wordCount(v.content), segments, added, removed };
  });
}
