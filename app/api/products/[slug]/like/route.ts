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

async function getActualLikeCount(supabase: ReturnType<typeof createServerClient>, productId: string): Promise<number> {
  const { count } = await supabase
    .from('product_likes')
    .select('*', { count: 'exact', head: true })
    .eq('product_id', productId);
  return count || 0;
}

async function syncLikeCount(supabase: ReturnType<typeof createServerClient>, productId: string, count: number) {
  await supabase.from('products').update({ like_count: count }).eq('id', productId);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = getSupabase();
  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  const product = await resolveProduct(supabase, params.slug);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('product_likes')
    .insert({ product_id: product.id, session_id: sessionId });

  if (error && error.code === '23505') {
    const likeCount = await getActualLikeCount(supabase, product.id);
    return NextResponse.json({ success: false, alreadyLiked: true, likeCount });
  }

  if (error) {
    console.error('Error inserting product like:', error);
    return NextResponse.json({ error: 'Failed to like product' }, { status: 500 });
  }

  const likeCount = await getActualLikeCount(supabase, product.id);
  await syncLikeCount(supabase, product.id, likeCount);

  return NextResponse.json({ success: true, likeCount });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, likeCount: 0 });
  }

  const supabase = getSupabase();
  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  const product = await resolveProduct(supabase, params.slug);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('product_likes')
    .delete()
    .eq('product_id', product.id)
    .eq('session_id', sessionId);

  if (error) console.error('Error deleting product like:', error);

  const likeCount = await getActualLikeCount(supabase, product.id);
  await syncLikeCount(supabase, product.id, likeCount);

  return NextResponse.json({ success: true, likeCount });
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId || !isSupabaseConfigured()) {
    return NextResponse.json({ hasLiked: false, likeCount: 0 });
  }

  const supabase = getSupabase();
  const product = await resolveProduct(supabase, params.slug);

  if (!product) {
    return NextResponse.json({ hasLiked: false, likeCount: 0 });
  }

  const { data: like } = await supabase
    .from('product_likes')
    .select('id')
    .eq('product_id', product.id)
    .eq('session_id', sessionId)
    .single();

  const likeCount = await getActualLikeCount(supabase, product.id);

  return NextResponse.json({ hasLiked: !!like, likeCount });
}
