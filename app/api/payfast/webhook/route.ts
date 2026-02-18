import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyWebhookSignature, validatePayfastIP } from '@/lib/payfast';
import { sendPurchaseConfirmation } from '@/lib/email';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://creativelynanda.co.za';

/**
 * PayFast Webhook Handler (ITN - Instant Transaction Notification)
 *
 * PayFast sends POST notifications when payment status changes.
 * Docs: https://developers.payfast.co.za/docs#step-3-confirm-payment
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body as text for form data
    const body = await request.text();
    const params = new URLSearchParams(body);
    const data: Record<string, string> = {};

    params.forEach((value, key) => {
      data[key] = value;
    });

    console.log('PayFast webhook received:', data);

    // Validate source IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    if (!validatePayfastIP(ip)) {
      console.error('Invalid PayFast IP:', ip);
      return NextResponse.json({ error: 'Invalid source' }, { status: 403 });
    }

    // Verify signature
    if (!verifyWebhookSignature(data)) {
      console.error('Invalid PayFast signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Extract payment details
    const orderId = data.m_payment_id;
    const paymentStatus = data.payment_status;
    const pfPaymentId = data.pf_payment_id;
    const amountGross = parseFloat(data.amount_gross || '0');

    if (!orderId) {
      console.error('Missing order ID in PayFast webhook');
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Get the order with its download token
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      console.error('Order not found:', orderId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Verify amount matches (convert to Rands for comparison)
    const expectedAmount = order.amount / 100;
    if (Math.abs(amountGross - expectedAmount) > 0.01) {
      console.error('Amount mismatch:', { expected: expectedAmount, received: amountGross });
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
    }

    // Map PayFast status to our status
    let status: 'pending' | 'completed' | 'failed' | 'refunded' = 'pending';

    switch (paymentStatus) {
      case 'COMPLETE':
        status = 'completed';
        break;
      case 'FAILED':
        status = 'failed';
        break;
      case 'PENDING':
        status = 'pending';
        break;
      case 'CANCELLED':
        status = 'failed';
        break;
      default:
        console.warn('Unknown PayFast status:', paymentStatus);
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status,
        payfast_payment_id: pfPaymentId,
        payfast_transaction_id: data.pf_payment_id,
        metadata: {
          ...((order.metadata as object) || {}),
          payfast_data: data,
        },
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order:', updateError);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    console.log(`Order ${orderId} updated to status: ${status}`);

    // Sync purchase_count for each product in the order
    if (status === 'completed') {
      try {
        const orderItems = (order.items as Array<{ product_id: string }>) || [];
        const productIds = [...new Set(orderItems.map((item) => item.product_id).filter(Boolean))];

        for (const productId of productIds) {
          const { count } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed')
            .contains('items', JSON.stringify([{ product_id: productId }]));

          await supabase
            .from('products')
            .update({ purchase_count: count || 0 })
            .eq('id', productId);
        }
      } catch (syncError) {
        console.error('Error syncing purchase counts:', syncError);
      }
    }

    // Send confirmation email for completed orders
    if (status === 'completed' && order.user_email) {
      try {
        // Parse items from order items field
        const orderItems = (order.items as Array<{ name: string; price: number; quantity: number }>) || [];

        // Build download links using the order's unique download token
        // Each link points to /api/downloads/[token]?item=N
        // The download API validates the token and serves a signed Storage URL
        const downloadToken = order.download_token;
        const downloadLinks = orderItems.map((item, index) => ({
          name: item.name,
          url: `${SITE_URL}/api/downloads/${downloadToken}${orderItems.length > 1 ? `?item=${index}` : ''}`,
        }));

        await sendPurchaseConfirmation({
          to: order.user_email,
          customerName: order.user_name || undefined,
          orderNumber: orderId.substring(0, 8).toUpperCase(),
          orderDate: new Date().toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          items: orderItems,
          total: order.amount / 100,
          downloadLinks,
          locale: 'en',
        });

        console.log(`Confirmation email sent to ${order.user_email}`);
      } catch (emailError) {
        // Log but don't fail the webhook - email can be retried
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    // PayFast expects a 200 response with no body
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PayFast also sends GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
