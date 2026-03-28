// Debug endpoint — gated behind SECURITY_TOKEN, do not expose publicly
import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint is permanently disabled in production.
  // Re-enable locally by temporarily restoring the original implementation.
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
