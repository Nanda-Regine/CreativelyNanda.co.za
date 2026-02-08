import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts } from '@/scripts/seed-blog-posts';

// POST /api/blog/seed - Seed blog posts
export async function POST() {
  const supabase = createServerClient();

  try {
    // Check if posts already exist
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('slug')
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        message: 'Blog posts already exist. Delete existing posts first if you want to reseed.',
        existing: true,
      });
    }

    // Insert all blog posts
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogPosts)
      .select();

    if (error) {
      console.error('Error seeding posts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: `Successfully seeded ${data.length} blog posts!`,
      posts: data.map(p => ({ slug: p.slug, title: p.title, category: p.category })),
    });
  } catch (err) {
    console.error('Error in seed:', err);
    return NextResponse.json({ error: 'Failed to seed posts' }, { status: 500 });
  }
}

// GET - Check seeding status
export async function GET() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, category, is_published')
    .order('published_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    count: data?.length || 0,
    posts: data,
  });
}

// DELETE - Clear all posts (for reseeding)
export async function DELETE() {
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
}
