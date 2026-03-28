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
    return createServerClient();
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, viewCount: 0, sessionId: '' });
  }

  const supabase = getSupabase();

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
      return NextResponse.json({ success: false, viewCount: 0, sessionId });
    }
    post = inserted;
  }

  // Try to insert a view (will fail silently if already exists due to unique constraint)
  const { error } = await supabase
    .from('blog_views')
    .insert({
      post_id: post.id,
      session_id: sessionId,
    });

  if (error && error.code !== '23505') {
    console.error('Error inserting view:', error);
  }

  // Count actual views from blog_views table for accuracy
  const { count } = await supabase
    .from('blog_views')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post.id);

  const viewCount = count || 0;

  // Sync the cached view_count on blog_posts
  await supabase
    .from('blog_posts')
    .update({ view_count: viewCount })
    .eq('id', post.id);

  return NextResponse.json({
    success: true,
    viewCount,
    sessionId,
  });
}
