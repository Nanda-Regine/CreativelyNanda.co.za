import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Check if Supabase is configured
function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Posts are written only by the admin server actions (service role) and
// scripts/publish-press.mjs. The unauthenticated POST that used to live here
// inserted with the anon key and relied on an open RLS policy; removed 2026-09-28.

export async function GET(request: Request) {
  // Return empty array if Supabase not configured (fallback to seed data)
  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const supabase = createServerClient();

    let query = supabase
      .from('blog_posts')
      .select('*')
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
      // Return empty array so fallback works
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json([]);
  }
}
