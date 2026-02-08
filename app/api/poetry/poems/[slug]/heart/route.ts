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

  // Try to insert a heart
  const { error } = await supabase
    .from('poem_hearts')
    .insert({
      poem_id: poem.id,
      session_id: sessionId,
    });

  if (error && error.code === '23505') {
    // Already hearted
    return NextResponse.json({
      success: false,
      alreadyHearted: true,
      heartCount: poem.heart_count,
    });
  }

  // Increment heart count on poem
  const { data: updatedPoem } = await supabase
    .from('poems')
    .update({ heart_count: poem.heart_count + 1 })
    .eq('id', poem.id)
    .select('heart_count')
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

  // Delete the heart
  const { error } = await supabase
    .from('poem_hearts')
    .delete()
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId);

  if (!error) {
    // Decrement heart count
    await supabase
      .from('poems')
      .update({ heart_count: Math.max(0, poem.heart_count - 1) })
      .eq('id', poem.id);
  }

  return NextResponse.json({
    success: !error,
    heartCount: Math.max(0, poem.heart_count - 1),
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
