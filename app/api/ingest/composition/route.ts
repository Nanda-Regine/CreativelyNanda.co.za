import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

function slugify(s: string): string {
  return (
    (s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60) || 'untitled'
  )
}

const CATEGORY_BY_FORMAT: Record<string, 'dev' | 'writing' | 'business'> = {
  devto_technical: 'dev',
  linkedin_article: 'business',
  substack_essay: 'writing',
  medium_thread: 'writing',
}

// Authenticated ingest for drafts composed in JarvisOS (Scholar -> The Composer).
// Creates an UNPUBLISHED blog_posts row so Nanda reviews + publishes from /admin/blog.
// Guarded by a shared secret; returns 503 until CN_INGEST_SECRET is set in the CN env.
export async function POST(req: NextRequest) {
  const secret = process.env.CN_INGEST_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Ingest not configured' }, { status: 503 })
  }

  const provided = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim()
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.title || !body?.content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 422 })
  }

  const category = CATEGORY_BY_FORMAT[String(body.format)] ?? 'writing'
  const slug = `${slugify(String(body.title))}-${Date.now().toString(36)}`
  const excerpt = typeof body.excerpt === 'string' ? body.excerpt.slice(0, 300) : null
  const tags = Array.isArray(body.tags) ? body.tags.slice(0, 8).map(String) : []

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        title: String(body.title).slice(0, 300),
        content: String(body.content),
        excerpt,
        category,
        tags,
        is_published: false,
      })
      .select('id, slug')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { ok: true, id: data.id, slug: data.slug, url: `/blog/${category}/${data.slug}` },
      { status: 201 },
    )
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'ingest failed' },
      { status: 500 },
    )
  }
}
