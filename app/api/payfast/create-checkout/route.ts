import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createPaymentData, getCheckoutUrl } from '@/lib/payfast';
import type { CartItem } from '@/types/database';

interface CheckoutRequest {
  items: CartItem[];
  customerEmail: string;
  customerName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, customerEmail, customerName } = body;

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    if (!customerEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Calculate total in cents
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order in database
    const supabase = createServerClient();

    // For multiple items, we'll create a combined order
    const itemNames = items.map((item) => item.name).join(', ');
    const itemDescription = items
      .map((item) => `${item.name} x${item.quantity}`)
      .join('; ');

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: items[0].product_id, // Primary product
        user_email: customerEmail,
        user_name: customerName || null,
        amount: total,
        currency: 'ZAR',
        status: 'pending',
        metadata: {
          items: items.map((item) => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Parse customer name
    const nameParts = customerName?.split(' ') || [];
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.slice(1).join(' ') || undefined;

    // Create PayFast payment data
    const paymentData = createPaymentData({
      orderId: order.id,
      amount: total,
      itemName: items.length === 1 ? items[0].name : `Order: ${items.length} items`,
      itemDescription: itemDescription.substring(0, 255),
      buyerEmail: customerEmail,
      buyerFirstName: firstName,
      buyerLastName: lastName,
    });

    // Return PayFast URL and form data
    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutUrl: getCheckoutUrl(),
      paymentData,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
