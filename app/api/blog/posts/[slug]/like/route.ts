import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
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

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = createServerClient();

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
    return NextResponse.json({
      success: false,
      alreadyLiked: true,
      likeCount: post.like_count || 0,
    });
  }

  // Get updated like count
  const { data: updatedPost } = await supabase
    .from('blog_posts')
    .select('like_count')
    .eq('id', post.id)
    .single();

  return NextResponse.json({
    success: true,
    likeCount: updatedPost?.like_count || (post.like_count || 0) + 1,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = createServerClient();

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
  await supabase
    .from('blog_likes')
    .delete()
    .eq('post_id', post.id)
    .eq('session_id', sessionId);

  // Get updated like count
  const { data: updatedPost } = await supabase
    .from('blog_posts')
    .select('like_count')
    .eq('id', post.id)
    .single();

  return NextResponse.json({
    success: true,
    likeCount: updatedPost?.like_count || Math.max(0, (post.like_count || 0) - 1),
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

  const supabase = createServerClient();

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

  return NextResponse.json({
    hasLiked: !!like,
    likeCount: post.like_count || 0,
  });
}
