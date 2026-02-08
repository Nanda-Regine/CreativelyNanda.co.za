import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Create a new blog post
export async function POST(request: Request) {
  const supabase = createServerClient();

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const limit = parseInt(searchParams.get('limit') || '50');

  const supabase = createServerClient();

  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      contributor:contributors(*)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }

  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }

  return NextResponse.json(data);
}
