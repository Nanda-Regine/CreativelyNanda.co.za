import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== 'object') throw new Error('bad');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 422 });
  }

  // Honeypot: bots fill it, humans never see it. Pretend success.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const source = typeof body.source === 'string' ? body.source.trim() : '';

  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }
  if (name.length > 100 || source.length > 50) {
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 422 });
  }

  const base = process.env.JARVIS_INTERNAL_URL;
  const secret = process.env.JARVIS_WEBHOOK_SECRET;
  if (!base || !secret) {
    return NextResponse.json({ error: 'Signups are not open yet' }, { status: 503 });
  }

  try {
    const res = await fetch(`${base}/api/magnet/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-jarvis-secret': secret },
      body: JSON.stringify({ email, name: name || undefined, brand: 'creativelynanda', source: source || 'cn_site' }),
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return NextResponse.json({ ok: true });
    if (res.status === 422) {
      return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 422 });
    }
    return NextResponse.json({ error: 'Something went wrong. Please try again shortly.' }, { status: 502 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again shortly.' }, { status: 502 });
  }
}
