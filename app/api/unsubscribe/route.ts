import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const base = process.env.JARVIS_INTERNAL_URL;
  if (!base) {
    return new NextResponse('Unsubscribe is unavailable right now.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const token = new URL(req.url).searchParams.get('token') ?? '';
  try {
    const res = await fetch(`${base}/api/magnet/unsubscribe?token=${encodeURIComponent(token)}`, { signal: AbortSignal.timeout(12000) })
    const html = await res.text().catch(() => 'Done.')
    return new NextResponse(html, { status: res.status, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  } catch {
    return new NextResponse('Could not reach the unsubscribe service. Please try again.', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
