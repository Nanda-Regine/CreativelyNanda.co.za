import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const supabase = createServerClient();

  let query = supabase
    .from('poems')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('collection', category);
  }

  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching poems:', error);
    return NextResponse.json({ error: 'Failed to fetch poems' }, { status: 500 });
  }

  return NextResponse.json(data);
}
