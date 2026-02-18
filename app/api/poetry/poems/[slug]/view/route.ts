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

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id, view_count')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Insert view (unique constraint will prevent duplicates)
  const { error } = await supabase
    .from('poem_views')
    .insert({
      poem_id: poem.id,
      session_id: sessionId,
    });

  if (error && error.code !== '23505') {
    console.error('Error inserting poem view:', error);
  }

  // Count actual views from poem_views table
  const { count } = await supabase
    .from('poem_views')
    .select('*', { count: 'exact', head: true })
    .eq('poem_id', poem.id);

  const viewCount = count || 0;

  // Sync the cached view_count on poems
  await supabase
    .from('poems')
    .update({ view_count: viewCount })
    .eq('id', poem.id);

  return NextResponse.json({
    success: true,
    viewCount,
    sessionId,
  });
}
