import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function isAdminRequest(request: Request): boolean {
  const token = process.env.SECURITY_TOKEN;
  if (!token) return false;
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${token}`;
}

// Create a new blog post — requires admin token
export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const supabase = createServerClient();

  try {
    const body = await request.json();

    // Allowlist only expected fields — never insert raw body
    const { title, slug, content, category, excerpt, cover_image, is_featured, is_published, contributor_id } = body;

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({ title, slug, content, category, excerpt, cover_image, is_featured, is_published, contributor_id })
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
  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const rawLimit = parseInt(searchParams.get('limit') || '50');
  const limit = Math.min(Math.max(1, rawLimit), 100);

  try {
    const supabase = createServerClient();

    let query = supabase
      .from('blog_posts')
      .select(`*, contributor:contributors(*)`)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (category) query = query.eq('category', category);
    if (featured === 'true') query = query.eq('is_featured', true);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json([]);
  }
}
