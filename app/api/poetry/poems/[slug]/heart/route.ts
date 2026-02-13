import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

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
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Try to insert a heart (trigger auto-increments heart_count)
  const { error } = await supabase
    .from('poem_hearts')
    .insert({
      poem_id: poem.id,
      session_id: sessionId,
    });

  if (error && error.code === '23505') {
    return NextResponse.json({
      success: false,
      alreadyHearted: true,
      heartCount: poem.heart_count,
    });
  }

  // Read back the updated count (trigger already incremented it)
  const { data: updatedPoem } = await supabase
    .from('poems')
    .select('heart_count')
    .eq('id', poem.id)
    .single();

  return NextResponse.json({
    success: true,
    heartCount: updatedPoem?.heart_count || poem.heart_count + 1,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

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
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Delete the heart (trigger auto-decrements heart_count)
  await supabase
    .from('poem_hearts')
    .delete()
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId);

  // Read back the updated count
  const { data: updatedPoem } = await supabase
    .from('poems')
    .select('heart_count')
    .eq('id', poem.id)
    .single();

  return NextResponse.json({
    success: true,
    heartCount: updatedPoem?.heart_count || Math.max(0, poem.heart_count - 1),
  });
}

// Check if user has hearted
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ hasHearted: false });
  }

  const supabase = createServerClient();

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id, heart_count')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Check if hearted
  const { data: heart } = await supabase
    .from('poem_hearts')
    .select('id')
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId)
    .single();

  return NextResponse.json({
    hasHearted: !!heart,
    heartCount: poem.heart_count,
  });
}
