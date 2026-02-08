import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

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

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Insert rose (pending approval)
  const { data: rose, error } = await supabase
    .from('poem_roses')
    .insert({
      poem_id: poem.id,
      content: content.trim(),
      author_name: isAnonymous ? null : authorName || null,
      author_email: authorEmail || null,
      is_anonymous: isAnonymous || false,
      status: 'pending',
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
    message: 'Thank you for your rose! It will be visible once approved.',
    rose,
  });
}

// Get approved roses for a poem
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  // Get the poem
  const { data: poem } = await supabase
    .from('poems')
    .select('id')
    .eq('slug', params.slug)
    .single();

  if (!poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Get approved roses
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
