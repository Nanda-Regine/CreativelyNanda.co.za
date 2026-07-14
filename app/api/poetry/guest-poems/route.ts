import { NextResponse } from 'next/server';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';

function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createServerClient();
  }
}

// Submit a poem to the Guest Garden — lands as 'pending' for Nanda to approve.
export async function POST(request: Request) {
  const supabase = getSupabase();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const content = typeof body.content === 'string' ? body.content.trim() : '';
  const authorName = typeof body.authorName === 'string' ? body.authorName.trim() : '';
  const authorEmail = typeof body.authorEmail === 'string' ? body.authorEmail.trim() : '';
  const isAnonymous = body.isAnonymous === true;
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : null;

  if (!title || title.length > 120) {
    return NextResponse.json({ error: 'A title is required (max 120 characters).' }, { status: 400 });
  }
  if (content.length < 20) {
    return NextResponse.json({ error: 'Your poem needs at least 20 characters.' }, { status: 400 });
  }
  if (content.length > 4000) {
    return NextResponse.json({ error: 'Your poem is a little long (max 4000 characters).' }, { status: 400 });
  }

  const { error } = await supabase.from('guest_poems').insert({
    title,
    content,
    author_name: isAnonymous ? null : authorName || null,
    author_email: authorEmail || null,
    is_anonymous: isAnonymous,
    session_id: sessionId,
    status: 'pending',
  });

  if (error) {
    console.error('Error submitting guest poem:', error);
    return NextResponse.json({ error: 'Could not submit your poem. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you — your poem has been planted. Nanda reads every one before it blooms in the garden.',
  });
}

// Public list — only approved/featured poems, and never the submitter's email.
export async function GET() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('guest_poems')
    .select('id, title, content, author_name, is_anonymous, status, created_at')
    .in('status', ['approved', 'featured'])
    .order('status', { ascending: false }) // 'featured' before 'approved'
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error listing guest poems:', error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data ?? []);
}
