import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  }

  try {
    const supabase = createServerClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select('id, amount, currency, status, metadata')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
