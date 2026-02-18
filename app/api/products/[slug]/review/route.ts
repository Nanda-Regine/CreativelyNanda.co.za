import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';

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

async function resolveProduct(supabase: ReturnType<typeof createServerClient>, slug: string) {
  const { data: product } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single();
  return product;
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
  const { authorName, content, rating } = body;

  if (!authorName || !content) {
    return NextResponse.json({ error: 'Name and review are required' }, { status: 400 });
  }

  if (content.length < 10) {
    return NextResponse.json({ error: 'Review must be at least 10 characters' }, { status: 400 });
  }

  if (content.length > 1000) {
    return NextResponse.json({ error: 'Review must be less than 1000 characters' }, { status: 400 });
  }

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating between 1-5 is required' }, { status: 400 });
  }

  const product = await resolveProduct(supabase, params.slug);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Insert review — auto-approved (is_approved defaults to true)
  const { data: review, error } = await supabase
    .from('testimonials')
    .insert({
      product_id: product.id,
      author_name: authorName,
      content: content.trim(),
      rating,
      is_approved: true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }

  // Sync review_count and rating on products table
  const { data: stats } = await supabase
    .from('testimonials')
    .select('rating')
    .eq('product_id', product.id)
    .eq('is_approved', true);

  if (stats && stats.length > 0) {
    const reviewCount = stats.length;
    const avgRating = stats.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount;
    await supabase
      .from('products')
      .update({ review_count: reviewCount, rating: Math.round(avgRating * 10) / 10 })
      .eq('id', product.id);
  }

  return NextResponse.json({ success: true, review });
}

// Get approved reviews for a product
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  const supabase = getSupabase();
  const product = await resolveProduct(supabase, params.slug);

  if (!product) {
    return NextResponse.json([]);
  }

  const { data: reviews, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('product_id', product.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json([]);
  }

  return NextResponse.json(reviews);
}
