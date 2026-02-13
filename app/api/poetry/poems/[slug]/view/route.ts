import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

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

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id, view_count')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Insert view (unique constraint will silently prevent duplicates)
  await supabase
    .from('poem_views')
    .insert({
      poem_id: poem.id,
      session_id: sessionId,
    });

  // Get updated view count
  const { data: updatedPoem } = await supabase
    .from('poems')
    .select('view_count')
    .eq('id', poem.id)
    .single();

  return NextResponse.json({
    success: true,
    viewCount: updatedPoem?.view_count || poem.view_count || 0,
    sessionId,
  });
}
