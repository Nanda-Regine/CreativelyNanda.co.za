import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, viewCount: 0, sessionId: '' });
  }

  const supabase = createServerClient();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId || crypto.randomUUID();

  // First get the post ID
  let { data: post } = await supabase
    .from('blog_posts')
    .select('id, view_count')
    .eq('slug', params.slug)
    .single();

  // If post not found in Supabase, auto-seed it from seed data
  if (!post) {
    const seedPost = seedPosts.find((p) => p.slug === params.slug);
    if (!seedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { data: inserted } = await supabase
      .from('blog_posts')
      .upsert(seedPost, { onConflict: 'slug' })
      .select('id, view_count')
      .single();

    if (!inserted) {
      // Table might not exist yet — return gracefully
      return NextResponse.json({ success: false, viewCount: 0, sessionId });
    }
    post = inserted;
  }

  // Try to insert a view (will fail silently if already exists due to unique constraint)
  await supabase
    .from('blog_views')
    .insert({
      post_id: post.id,
      session_id: sessionId,
    });

  // Get updated view count
  const { data: updatedPost } = await supabase
    .from('blog_posts')
    .select('view_count')
    .eq('id', post.id)
    .single();

  return NextResponse.json({
    success: true,
    viewCount: updatedPost?.view_count || post.view_count || 0,
    sessionId,
  });
}
