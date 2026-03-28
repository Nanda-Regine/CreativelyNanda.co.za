import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createServerClient();
  }
}

/** Count actual hearts from the poem_hearts table */
async function getActualHeartCount(supabase: ReturnType<typeof createServerClient>, poemId: string): Promise<number> {
  const { count, error } = await supabase
    .from('poem_hearts')
    .select('*', { count: 'exact', head: true })
    .eq('poem_id', poemId);

  if (error) {
    console.error('Error counting hearts:', error);
    return 0;
  }

  return count || 0;
}

/** Sync the cached heart_count on poems with the actual count */
async function syncHeartCount(supabase: ReturnType<typeof createServerClient>, poemId: string, count: number) {
  await supabase
    .from('poems')
    .update({ heart_count: count })
    .eq('id', poemId);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabase();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  // Get or auto-create the poem record
  let poem: { id: string; heart_count: number } | null = null;
  const { data: existingPoem } = await supabase
    .from('poems')
    .select('id, heart_count')
    .eq('slug', params.slug)
    .single();

  if (existingPoem) {
    poem = existingPoem;
  } else {
    // Auto-create a minimal poem record so hearts can be stored
    const title = params.slug
      .split('-')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    const { data: newPoem } = await supabase
      .from('poems')
      .insert({ slug: params.slug, title, content: title, heart_count: 0 })
      .select('id, heart_count')
      .single();
    poem = newPoem;
  }

  if (!poem) {
    return NextResponse.json({ error: 'Failed to process poem' }, { status: 500 });
  }

  // Try to insert a heart
  const { error } = await supabase
    .from('poem_hearts')
    .insert({
      poem_id: poem.id,
      session_id: sessionId,
    });

  if (error && error.code === '23505') {
    const heartCount = await getActualHeartCount(supabase, poem.id);
    return NextResponse.json({
      success: false,
      alreadyHearted: true,
      heartCount,
    });
  }

  if (error) {
    console.error('Error inserting heart:', error);
    return NextResponse.json({ error: 'Failed to heart poem' }, { status: 500 });
  }

  // Get the real count and sync it
  const heartCount = await getActualHeartCount(supabase, poem.id);
  await syncHeartCount(supabase, poem.id, heartCount);

  return NextResponse.json({
    success: true,
    heartCount,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabase();

  const body = await request.json().catch(() => ({}));
  const sessionId = body.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id, heart_count')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ success: true, heartCount: 0 });
  }

  // Delete the heart
  const { error } = await supabase
    .from('poem_hearts')
    .delete()
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error deleting heart:', error);
  }

  // Get the real count and sync it
  const heartCount = await getActualHeartCount(supabase, poem.id);
  await syncHeartCount(supabase, poem.id, heartCount);

  return NextResponse.json({
    success: true,
    heartCount,
  });
}

// Check if user has hearted
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  const supabase = getSupabase();

  // Get the poem (no sessionId needed to get the count)
  const { data: poem } = await supabase
    .from('poems')
    .select('id, heart_count')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    // Poem not in Supabase yet - return zeros gracefully
    return NextResponse.json({ hasHearted: false, heartCount: 0 });
  }

  if (!sessionId) {
    // No session - just return current count without personal state
    const heartCount = await getActualHeartCount(supabase, poem.id);
    return NextResponse.json({ hasHearted: false, heartCount });
  }

  // Check if hearted
  const { data: heart } = await supabase
    .from('poem_hearts')
    .select('id')
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId)
    .single();

  // Get real count
  const heartCount = await getActualHeartCount(supabase, poem.id);

  return NextResponse.json({
    hasHearted: !!heart,
    heartCount,
  });
}
