import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';
import { POEMS } from '@/lib/poems-data';

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createServerClient();
  }
}

async function resolvePoem(supabase: ReturnType<typeof createServerClient>, slug: string) {
  let { data: poem } = await supabase
    .from('poems')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!poem) {
    const local = POEMS.find(p => p.slug === slug);
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

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabase();

  const body = await request.json();
  const { content, authorName, authorEmail, isAnonymous } = body;

  if (!content) {
    return NextResponse.json(
      { error: 'Content is required' },
      { status: 400 }
    );
  }

  if (content.length < 5) {
    return NextResponse.json(
      { error: 'Review must be at least 5 characters' },
      { status: 400 }
    );
  }

  if (content.length > 500) {
    return NextResponse.json(
      { error: 'Review must be less than 500 characters' },
      { status: 400 }
    );
  }

  const poem = await resolvePoem(supabase, params.slug);

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Insert rose (auto-approved)
  const { data: rose, error } = await supabase
    .from('poem_roses')
    .insert({
      poem_id: poem.id,
      content: content.trim(),
      author_name: isAnonymous ? null : authorName || null,
      author_email: authorEmail || null,
      is_anonymous: isAnonymous || false,
      status: 'approved',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating rose:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you for your rose!',
    rose,
  });
}

// Get approved roses for a poem
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabase();

  const poem = await resolvePoem(supabase, params.slug);

  if (!poem) {
    return NextResponse.json([]);
  }

  // Get approved/featured roses (admin client bypasses RLS, so filter explicitly)
  const { data: roses, error } = await supabase
    .from('poem_roses')
    .select('*')
    .eq('poem_id', poem.id)
    .in('status', ['approved', 'featured'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching roses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }

  return NextResponse.json(roses);
}
