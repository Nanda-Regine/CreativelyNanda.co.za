import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  // Get session ID from request body or generate one
  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId || crypto.randomUUID();

  // First get the post ID
  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, view_count')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Try to insert a view (will fail silently if already exists due to unique constraint)
  const { error } = await supabase
    .from('blog_views')
    .insert({
      post_id: post.id,
      session_id: sessionId,
    });

  // If successful, the trigger will increment view_count
  // If duplicate, no error is thrown but nothing happens

  // Get updated view count
  const { data: updatedPost } = await supabase
    .from('blog_posts')
    .select('view_count')
    .eq('id', post.id)
    .single();

  return NextResponse.json({
    success: !error,
    viewCount: updatedPost?.view_count || post.view_count,
    sessionId,
  });
}
