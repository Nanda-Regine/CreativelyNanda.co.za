import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';
import { POEMS } from '@/lib/poems-data';
import { isValidFeeling } from '@/lib/feelings';

// Petals — the Reading Room ending gesture. One petal per reader (session) per
// poem, with an optional feeling tag that grows the poem's aura. Mirrors the
// heart/rose route conventions (admin client, auto-create the poems row).

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createServerClient();
  }
}

async function resolvePoem(supabase: ReturnType<typeof createServerClient>, slug: string) {
  let { data: poem } = await supabase.from('poems').select('id').eq('slug', slug).single();

  if (!poem) {
    const local = POEMS.find((p) => p.slug === slug);
    if (!local) return null;
    const { data: inserted } = await supabase
      .from('poems')
      .upsert(
        { slug: local.slug, title: local.title, content: local.content, excerpt: local.excerpt, view_count: 0 },
        { onConflict: 'slug' }
      )
      .select('id')
      .single();
    poem = inserted;
  }
  return poem;
}

// Aggregate a poem's bloom: total petals + feeling breakdown + this session's petal.
async function bloom(
  supabase: ReturnType<typeof createServerClient>,
  poemId: string,
  sessionId?: string | null
) {
  const { data: petals } = await supabase
    .from('poem_petals')
    .select('session_id, feeling')
    .eq('poem_id', poemId)
    .is('deleted_at', null);

  const rows = petals ?? [];
  const tally = new Map<string, number>();
  for (const p of rows) {
    if (p.feeling) tally.set(p.feeling, (tally.get(p.feeling) ?? 0) + 1);
  }
  const feelings = Array.from(tally.entries())
    .map(([feeling, count]) => ({ feeling, count }))
    .sort((a, b) => b.count - a.count);

  const mine = sessionId ? rows.find((p) => p.session_id === sessionId) : undefined;

  return {
    petalCount: rows.length,
    feelings,
    dominantFeeling: feelings[0]?.feeling ?? null,
    hasPetaled: Boolean(mine),
    myFeeling: mine?.feeling ?? null,
  };
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabase();
  const body = await request.json().catch(() => ({}));
  const { sessionId, feeling } = body ?? {};

  if (!sessionId || typeof sessionId !== 'string') {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }
  const cleanFeeling = isValidFeeling(feeling) ? feeling : null;

  const poem = await resolvePoem(supabase, params.slug);
  if (!poem) return NextResponse.json({ error: 'Poem not found' }, { status: 404 });

  // One petal per session — upsert so a reader can change how it left them,
  // and un-delete if they had previously withdrawn it.
  const { error } = await supabase
    .from('poem_petals')
    .upsert(
      { poem_id: poem.id, session_id: sessionId, feeling: cleanFeeling, deleted_at: null },
      { onConflict: 'poem_id,session_id' }
    );

  if (error) {
    console.error('Error leaving petal:', error);
    return NextResponse.json({ error: 'Failed to leave petal' }, { status: 500 });
  }

  const result = await bloom(supabase, poem.id, sessionId);
  return NextResponse.json({ success: true, ...result });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabase();
  const body = await request.json().catch(() => ({}));
  const { sessionId } = body ?? {};
  if (!sessionId) return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });

  const poem = await resolvePoem(supabase, params.slug);
  if (!poem) return NextResponse.json({ error: 'Poem not found' }, { status: 404 });

  await supabase
    .from('poem_petals')
    .update({ deleted_at: new Date().toISOString() })
    .eq('poem_id', poem.id)
    .eq('session_id', sessionId)
    .is('deleted_at', null);

  const result = await bloom(supabase, poem.id, sessionId);
  return NextResponse.json({ success: true, ...result });
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabase();
  const sessionId = new URL(request.url).searchParams.get('sessionId');

  const poem = await resolvePoem(supabase, params.slug);
  if (!poem) {
    return NextResponse.json({ petalCount: 0, feelings: [], dominantFeeling: null, hasPetaled: false, myFeeling: null });
  }

  const result = await bloom(supabase, poem.id, sessionId);
  return NextResponse.json(result);
}
