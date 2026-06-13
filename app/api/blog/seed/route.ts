import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts } from '@/scripts/seed-blog-posts';

// Check if Supabase is configured
function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// POST /api/blog/seed - Seed blog posts
export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      message: 'Database not configured. Using seed data fallback.',
      usingFallback: true,
      posts: blogPosts.map(p => ({ slug: p.slug, title: p.title, category: p.category }))
    });
  }

  const supabase = createServerClient();

  try {
    // Upsert all blog posts (insert new, update existing by slug)
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(blogPosts, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error('Error seeding posts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: `Successfully upserted ${data.length} blog posts!`,
      posts: data.map(p => ({ slug: p.slug, title: p.title, category: p.category })),
    });
  } catch (err) {
    console.error('Error in seed:', err);
    return NextResponse.json({ error: 'Failed to seed posts' }, { status: 500 });
  }
}

// GET - Check seeding status
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      count: blogPosts.length,
      usingFallback: true,
      posts: blogPosts.map(p => ({ slug: p.slug, title: p.title, category: p.category, is_published: p.is_published })),
    });
  }

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, title, category, is_published')
      .order('published_at', { ascending: false });

    if (error) {
      return NextResponse.json({
        count: blogPosts.length,
        usingFallback: true,
        posts: blogPosts.map(p => ({ slug: p.slug, title: p.title, category: p.category, is_published: p.is_published })),
      });
    }

    return NextResponse.json({
      count: data?.length || 0,
      posts: data,
    });
  } catch {
    return NextResponse.json({
      count: blogPosts.length,
      usingFallback: true,
      posts: blogPosts.map(p => ({ slug: p.slug, title: p.title, category: p.category, is_published: p.is_published })),
    });
  }
}

// DELETE - Clear all posts (for reseeding)
export async function DELETE() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: 'Database not configured. Using seed data fallback.' });
  }

  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      console.error('Error deleting posts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'All posts deleted. Ready for reseeding.' });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
