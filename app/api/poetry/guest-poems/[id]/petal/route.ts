import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createServerClient();
  }
}

async function countPetals(supabase: ReturnType<typeof createServerClient>, guestPoemId: string) {
  const { count } = await supabase
    .from('guest_poem_petals')
    .select('*', { count: 'exact', head: true })
    .eq('guest_poem_id', guestPoemId);
  return count || 0;
}

// Count + whether this session has left a petal.
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const supabase = getSupabase();

  const count = await countPetals(supabase, params.id);

  if (!sessionId) return NextResponse.json({ count, hasPetaled: false });

  const { data } = await supabase
    .from('guest_poem_petals')
    .select('id')
    .eq('guest_poem_id', params.id)
    .eq('session_id', sessionId)
    .single();

  return NextResponse.json({ count, hasPetaled: !!data });
}

// Leave a petal.
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabase();
  const { sessionId } = await request.json().catch(() => ({ sessionId: null }));
  if (!sessionId) return NextResponse.json({ error: 'Session ID required' }, { status: 400 });

  const { error } = await supabase
    .from('guest_poem_petals')
    .insert({ guest_poem_id: params.id, session_id: sessionId });

  // 23505 = already left a petal; treat as success (idempotent).
  if (error && error.code !== '23505') {
    console.error('Error adding petal:', error);
    return NextResponse.json({ error: 'Failed to add petal' }, { status: 500 });
  }

  const count = await countPetals(supabase, params.id);
  return NextResponse.json({ count, hasPetaled: true });
}

// Take a petal back.
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabase();
  const { sessionId } = await request.json().catch(() => ({ sessionId: null }));
  if (!sessionId) return NextResponse.json({ error: 'Session ID required' }, { status: 400 });

  await supabase
    .from('guest_poem_petals')
    .delete()
    .eq('guest_poem_id', params.id)
    .eq('session_id', sessionId);

  const count = await countPetals(supabase, params.id);
  return NextResponse.json({ count, hasPetaled: false });
}
