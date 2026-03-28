import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  // Get poem with approved roses (reviews)
  const { data: poem, error } = await supabase
    .from('poems')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single();

  if (error || !poem) {
    return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
  }

  // Get approved roses for this poem
  const { data: roses } = await supabase
    .from('poem_roses')
    .select('*')
    .eq('poem_id', poem.id)
    .in('status', ['approved', 'featured'])
    .order('created_at', { ascending: false });

  return NextResponse.json({
    ...poem,
    roses: roses || [],
  });
}
