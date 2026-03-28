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

  const { data: product } = await supabase
    .from('products')
    .select('id')
    .eq('slug', params.slug)
    .single();

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('product_views')
    .insert({ product_id: product.id, session_id: sessionId });

  if (error && error.code !== '23505') {
    console.error('Error inserting product view:', error);
  }

  const { count } = await supabase
    .from('product_views')
    .select('*', { count: 'exact', head: true })
    .eq('product_id', product.id);

  const viewCount = count || 0;

  await supabase.from('products').update({ view_count: viewCount }).eq('id', product.id);

  return NextResponse.json({ success: true, viewCount, sessionId });
}
