import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/debug/products — diagnose why Supabase products may not be loading
// Protected by admin token — only accessible to authenticated admins.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token || token !== process.env.SECURITY_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !hasAnonKey) {
    return NextResponse.json({
      ok: false,
      error: 'Missing env vars: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
    }, { status: 500 });
  }

  try {
    const supabase = createServerClient();

    const { data, error, count } = await supabase
      .from('products')
      .select('slug, name, status, thumbnail, is_featured', { count: 'exact' });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message, details: error.details, hint: error.hint }, { status: 500 });
    }

    const liveCount = data?.filter(p => p.status === 'live').length ?? 0;

    return NextResponse.json({
      ok: true,
      supabaseUrl,
      totalRows: count,
      liveProducts: liveCount,
      products: data?.map(p => ({
        slug: p.slug,
        status: p.status,
        hasThumbnail: !!p.thumbnail,
        isFeatured: p.is_featured,
      })),
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
