import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createServerClient();

  // Get post with contributor and approved reviews
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      contributor:contributors(*),
      reviews:blog_reviews(*)
    `)
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single();

  if (error || !post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Filter to only approved reviews
  post.reviews = (post.reviews || []).filter((r: { is_approved: boolean }) => r.is_approved);

  return NextResponse.json(post);
}
