import { NextResponse } from 'next/server';
import { allowRequest, clientIp } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

/**
 * Guard for PUBLIC routes that write data or send email. Returns a response to send back
 * (429 rate limited, 403 failed Turnstile) or null when the request may proceed.
 * Never use on payfast, webhook, ingest or admin routes.
 */
export async function guardPublicForm(req: Request, scope: string, turnstileToken: unknown): Promise<NextResponse | null> {
  if (!(await allowRequest(req, 'form', scope))) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }
  const ts = await verifyTurnstile(turnstileToken, clientIp(req));
  if (!ts.ok) {
    return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 403 });
  }
  return null;
}
