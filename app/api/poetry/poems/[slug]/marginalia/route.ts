import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';
import { POEMS } from '@/lib/poems-data';

// Marginalia — line-anchored whispers left by readers in the Annotated depth
// mode. Public ones become collective art; the most-whispered line glows.
// Auto-approved to stay live (mirrors the roses convention), soft-deletable.

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

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabase();
  const body = await request.json().catch(() => ({}));
  const { lineIndex, body: text, author, sessionId, isAnonymous } = body ?? {};

  if (typeof lineIndex !== 'number' || lineIndex < 0) {
    return NextResponse.json({ error: 'A valid lineIndex is required' }, { status: 400 });
  }
  const clean = typeof text === 'string' ? text.trim() : '';
  if (clean.length < 1 || clean.length > 280) {
    return NextResponse.json({ error: 'A whisper must be 1–280 characters' }, { status: 400 });
  }

  const poem = await resolvePoem(supabase, params.slug);
  if (!poem) return NextResponse.json({ error: 'Poem not found' }, { status: 404 });

  const { data: whisper, error } = await supabase
    .from('poem_marginalia')
    .insert({
      poem_id: poem.id,
      line_index: lineIndex,
      body: clean,
      author: isAnonymous ? null : (author || null),
      session_id: sessionId || null,
      visibility: 'public',
      status: 'approved',
    })
    .select('id, line_index, body, author, status, created_at')
    .single();

  if (error) {
    console.error('Error leaving whisper:', error);
    return NextResponse.json({ error: 'Failed to leave whisper' }, { status: 500 });
  }

  return NextResponse.json({ success: true, whisper });
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabase();

  const poem = await resolvePoem(supabase, params.slug);
  if (!poem) return NextResponse.json([]);

  const { data: whispers, error } = await supabase
    .from('poem_marginalia')
    .select('id, line_index, body, author, status, created_at')
    .eq('poem_id', poem.id)
    .eq('visibility', 'public')
    .in('status', ['approved', 'featured'])
    .is('deleted_at', null)
    .order('line_index', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching marginalia:', error);
    return NextResponse.json([]);
  }

  return NextResponse.json(whispers ?? []);
}
