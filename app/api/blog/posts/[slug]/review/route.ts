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

/** Look up a post by slug, auto-seeding from seed data if necessary */
async function resolvePost(supabase: ReturnType<typeof createServerClient>, slug: string) {
  let { data: post } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!post) {
    const seedPost = seedPosts.find((p) => p.slug === slug);
    if (!seedPost) return null;

    const { data: inserted } = await supabase
      .from('blog_posts')
      .upsert(seedPost, { onConflict: 'slug' })
      .select('id')
      .single();

    post = inserted;
  }

  return post;
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const supabase = getSupabase();

  const body = await request.json();
  const { authorName, authorEmail, content, rating } = body;

  if (!authorName || !content) {
    return NextResponse.json(
      { error: 'Name and content are required' },
      { status: 400 }
    );
  }

  if (content.length < 10) {
    return NextResponse.json(
      { error: 'Review must be at least 10 characters' },
      { status: 400 }
    );
  }

  if (content.length > 1000) {
    return NextResponse.json(
      { error: 'Review must be less than 1000 characters' },
      { status: 400 }
    );
  }

  const post = await resolvePost(supabase, params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Insert review — auto-approved so it shows immediately
  const { data: review, error } = await supabase
    .from('blog_reviews')
    .insert({
      post_id: post.id,
      author_name: authorName,
      author_email: authorEmail || null,
      content: content.trim(),
      rating: rating || null,
      is_approved: true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you! Your review is now live.',
    review,
  });
}

// Get approved reviews for a post
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  const supabase = getSupabase();

  const post = await resolvePost(supabase, params.slug);

  if (!post) {
    return NextResponse.json([]);
  }

  const { data: reviews, error } = await supabase
    .from('blog_reviews')
    .select('*')
    .eq('post_id', post.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json([]);
  }

  return NextResponse.json(reviews);
}

// Admin delete a review
export async function DELETE(request: Request) {
  const supabase = getSupabase();
  const { reviewId } = await request.json();

  if (!reviewId) {
    return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('blog_reviews')
    .delete()
    .eq('id', reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
