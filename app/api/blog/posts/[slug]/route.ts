import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts } from '@/scripts/seed-blog-posts';

// Check if Supabase is configured
function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Fallback to seed data if Supabase not configured
  if (!isSupabaseConfigured()) {
    const seedPost = blogPosts.find(p => p.slug === params.slug);
    if (!seedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...seedPost,
      id: seedPost.slug,
      created_at: seedPost.published_at,
      view_count: 0,
      like_count: 0,
      contributor: null,
      reviews: [],
    });
  }

  try {
    const supabase = createServerClient();

    // Simple select — no joins to avoid FK/RLS failures
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_published', true)
      .single();

    if (error || !post || !post.content) {
      // Try seed data as fallback
      const seedPost = blogPosts.find(p => p.slug === params.slug);
      if (!seedPost) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({
        ...seedPost,
        id: seedPost.slug,
        created_at: seedPost.published_at,
        view_count: 0,
        like_count: 0,
        contributor: null,
        reviews: [],
      });
    }

    return NextResponse.json({ ...post, contributor: null, reviews: [] });
  } catch {
    // Fallback to seed data on error
    const seedPost = blogPosts.find(p => p.slug === params.slug);
    if (!seedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...seedPost,
      id: seedPost.slug,
      created_at: seedPost.published_at,
      view_count: 0,
      like_count: 0,
      contributor: null,
      reviews: [],
    });
  }
}
