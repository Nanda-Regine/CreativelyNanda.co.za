import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  // Get the post
  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, like_count')
    .eq('slug', params.slug)
    .single();

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
      likeCount: post.like_count,
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
    likeCount: updatedPost?.like_count || post.like_count + 1,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  // Get the post
  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, like_count')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Delete the like
  const { error } = await supabase
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
    success: !error,
    likeCount: updatedPost?.like_count || Math.max(0, post.like_count - 1),
  });
}

// Check if user has liked
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ hasLiked: false });
  }

  const supabase = createServerClient();

  // Get the post
  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, like_count')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
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
    likeCount: post.like_count,
  });
}
