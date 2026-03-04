import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { createPaymentData, getCheckoutUrl } from '@/lib/payfast';
import type { CartItem } from '@/types/database';

interface CheckoutRequest {
  items: CartItem[];
  customerEmail: string;
  customerName?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Validate PayFast environment variables
    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!merchantId || merchantId === 'undefined') {
      console.error('[checkout] PAYFAST_MERCHANT_ID is not set in environment variables');
      return NextResponse.json({ error: 'Payment configuration error — PAYFAST_MERCHANT_ID missing' }, { status: 500 });
    }
    if (!merchantKey || merchantKey === 'undefined') {
      console.error('[checkout] PAYFAST_MERCHANT_KEY is not set in environment variables');
      return NextResponse.json({ error: 'Payment configuration error — PAYFAST_MERCHANT_KEY missing' }, { status: 500 });
    }
    if (!siteUrl) {
      console.error('[checkout] NEXT_PUBLIC_SITE_URL is not set — return/cancel/notify URLs will be broken');
    }
    console.log('[checkout] PayFast config — merchant_id:', merchantId, '| sandbox:', process.env.NEXT_PUBLIC_PAYFAST_SANDBOX, '| site_url:', siteUrl);

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

    // Use admin client to look up product file paths from Storage
    const supabase = createAdminClient();

    // Look up id, file_path, guide_url for each product from the database
    const productSlugs = items.map((item) => item.slug);
    const { data: products } = await supabase
      .from('products')
      .select('id, slug, guide_url')
      .in('slug', productSlugs);

    const productIdMap = new Map(
      (products || []).map((p) => [p.slug, p.id as string]),
    );
    const guideUrlMap = new Map(
      (products || []).map((p) => [p.slug, (p as { guide_url?: string | null }).guide_url ?? null]),
    );

    // For multiple items, we'll create a combined order
    const itemDescription = items
      .map((item) => `${item.name} x${item.quantity}`)
      .join('; ');

    // Build order items with slug for PDF URL construction in webhook
    const orderItems = items.map((item) => ({
      product_id: item.product_id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      guide_url: guideUrlMap.get(item.slug) || null,
    }));

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: productIdMap.get(items[0].slug) ?? null,
        user_email: customerEmail,
        user_name: customerName || null,
        amount: total,
        currency: 'ZAR',
        status: 'pending',
        items: orderItems,
        metadata: {
          items: orderItems,
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

    // Log payment summary for debugging (no sensitive values)
    console.log('[checkout] PayFast payment — amount:', paymentData.amount, '| item:', paymentData.item_name, '| order:', order.id, '| url:', getCheckoutUrl());

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
