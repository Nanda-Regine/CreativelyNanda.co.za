import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ orders: [] });
    }

    // Only return what's needed — name, guide_url, and order meta
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
