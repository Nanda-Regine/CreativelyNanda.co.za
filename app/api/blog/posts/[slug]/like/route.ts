import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    // Fall back to anon client if service role key not set
    return createServerClient();
  }
}

/** Look up a post by slug, auto-seeding from seed data if necessary */
async function resolvePost(supabase: ReturnType<typeof createServerClient>, slug: string) {
  let { data: post } = await supabase
    .from('blog_posts')
    .select('id, like_count')
    .eq('slug', slug)
    .single();

  if (!post) {
    const seedPost = seedPosts.find((p) => p.slug === slug);
    if (!seedPost) return null;

    const { data: inserted } = await supabase
      .from('blog_posts')
      .upsert(seedPost, { onConflict: 'slug' })
      .select('id, like_count')
      .single();

    if (!inserted) return null;
    post = inserted;
  }

  return post;
}

/** Count actual likes from the blog_likes table */
async function getActualLikeCount(supabase: ReturnType<typeof createServerClient>, postId: string): Promise<number> {
  const { count, error } = await supabase
    .from('blog_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  if (error) {
    console.error('Error counting likes:', error);
    return 0;
  }

  return count || 0;
}

/** Sync the cached like_count on blog_posts with the actual count */
async function syncLikeCount(supabase: ReturnType<typeof createServerClient>, postId: string, count: number) {
  await supabase
    .from('blog_posts')
    .update({ like_count: count })
    .eq('id', postId);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = getSupabase();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  const post = await resolvePost(supabase, params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Try to insert a like
  const { error } = await supabase
    .from('blog_likes')
    .insert({
      post_id: post.id,
      session_id: sessionId,
    });

  if (error && error.code === '23505') {
    // Unique constraint violation - already liked
    const likeCount = await getActualLikeCount(supabase, post.id);
    return NextResponse.json({
      success: false,
      alreadyLiked: true,
      likeCount,
    });
  }

  if (error) {
    console.error('Error inserting like:', error);
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }

  // Get the real count from the likes table and sync it
  const likeCount = await getActualLikeCount(supabase, post.id);
  await syncLikeCount(supabase, post.id, likeCount);

  return NextResponse.json({
    success: true,
    likeCount,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = getSupabase();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  const post = await resolvePost(supabase, params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Delete the like
  const { error } = await supabase
    .from('blog_likes')
    .delete()
    .eq('post_id', post.id)
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error deleting like:', error);
  }

  // Get the real count from the likes table and sync it
  const likeCount = await getActualLikeCount(supabase, post.id);
  await syncLikeCount(supabase, post.id, likeCount);

  return NextResponse.json({
    success: true,
    likeCount,
  });
}

// Check if user has liked
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId || !isSupabaseConfigured()) {
    return NextResponse.json({ hasLiked: false, likeCount: 0 });
  }

  const supabase = getSupabase();

  const post = await resolvePost(supabase, params.slug);

  if (!post) {
    return NextResponse.json({ hasLiked: false, likeCount: 0 });
  }

  // Check if liked
  const { data: like } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('post_id', post.id)
    .eq('session_id', sessionId)
    .single();

  // Get real count from likes table
  const likeCount = await getActualLikeCount(supabase, post.id);

  return NextResponse.json({
    hasLiked: !!like,
    likeCount,
  });
}
