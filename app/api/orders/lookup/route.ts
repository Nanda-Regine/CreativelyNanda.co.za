import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// Simple in-memory rate limiter: max 5 lookups per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, amount, currency, created_at, items')
      .eq('user_email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Order lookup error:', error);
      return NextResponse.json({ error: 'Failed to look up orders' }, { status: 500 });
    }

    if (!orders || orders.length === 0) {
      // Return same response whether email exists or not (prevents email enumeration)
      return NextResponse.json({ orders: [] });
    }

    const safeOrders = orders.map((order) => ({
      id: order.id.substring(0, 8).toUpperCase(),
      amount: order.amount,
      currency: order.currency,
      created_at: order.created_at,
      items: (order.items as Array<{ name: string; guide_url?: string | null; slug?: string }> || []).map((item) => ({
        name: item.name,
        guide_url: item.guide_url ?? null,
      })),
    }));

    return NextResponse.json({ orders: safeOrders });
  } catch (err) {
    console.error('Order lookup error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
