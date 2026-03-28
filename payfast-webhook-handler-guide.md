# 🔔 PAYFAST WEBHOOK HANDLER GUIDE
## For Claude Code - Order Processing & Fulfillment

**Version:** 1.0  
**Date:** February 5, 2026  
**Purpose:** Handle PayFast payment notifications (ITN - Instant Transaction Notification)

---

## 📋 TABLE OF CONTENTS

1. [Webhook Overview](#webhook-overview)
2. [Webhook Route Implementation](#webhook-route-implementation)
3. [Payment Status Handling](#payment-status-handling)
4. [Order Fulfillment Logic](#order-fulfillment-logic)
5. [Error Handling](#error-handling)
6. [Testing Webhooks](#testing-webhooks)

---

## 1. WEBHOOK OVERVIEW

### What Are PayFast Webhooks?

PayFast sends Instant Transaction Notifications (ITN) to your server when:
- Payment is successful
- Payment fails
- Payment is cancelled
- Subscription events occur (future use)

### Webhook Flow

```
1. User completes payment on PayFast → 
2. PayFast processes payment → 
3. PayFast sends POST to your notify_url →
4. Your webhook validates & processes →
5. You respond with HTTP 200 OK →
6. PayFast marks notification as delivered
```

### Critical Security Checks

Your webhook MUST verify:
1. ✅ Signature matches (tamper protection)
2. ✅ Request comes from PayFast IP
3. ✅ Amount matches order amount
4. ✅ Payment ID is valid
5. ✅ Server validation with PayFast

---

## 2. WEBHOOK ROUTE IMPLEMENTATION

### Main Webhook Handler

```typescript
// app/api/webhooks/payfast/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { verifyPayFastSignature } from '@/lib/payfast/verify-signature';
import { isPayFastIP } from '@/lib/payfast/verify-ip';
import { validatePaymentWithPayFast } from '@/lib/payfast/validate-payment';
import { fulfillOrder } from '@/lib/orders/fulfill-order';
import { sendPurchaseConfirmation } from '@/lib/emails/purchase-confirmation';

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';
    
    // Get POST data
    const formData = await request.formData();
    const postData: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      postData[key] = value.toString();
    });
    
    console.log('[PayFast Webhook] Received notification:', {
      m_payment_id: postData.m_payment_id,
      payment_status: postData.payment_status,
      amount_gross: postData.amount_gross,
      ip,
    });
    
    // SECURITY CHECK 1: Verify IP address
    const isSandbox = process.env.PAYFAST_SANDBOX_MODE === 'true';
    if (!isPayFastIP(ip, isSandbox)) {
      console.error('[PayFast Webhook] Invalid IP:', ip);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // SECURITY CHECK 2: Verify signature
    const receivedSignature = postData.signature;
    delete postData.signature; // Remove signature from data before verification
    
    const isValidSignature = verifyPayFastSignature(
      postData,
      receivedSignature,
      process.env.PAYFAST_PASSPHRASE
    );
    
    if (!isValidSignature) {
      console.error('[PayFast Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // SECURITY CHECK 3: Validate with PayFast server
    const isValidPayment = await validatePaymentWithPayFast(
      postData.m_payment_id,
      isSandbox
    );
    
    if (!isValidPayment) {
      console.error('[PayFast Webhook] Payment validation failed');
      return NextResponse.json({ error: 'Invalid payment' }, { status: 400 });
    }
    
    // Get order from database
    const supabase = createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', postData.m_payment_id)
      .single();
    
    if (orderError || !order) {
      console.error('[PayFast Webhook] Order not found:', postData.m_payment_id);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // SECURITY CHECK 4: Verify amount matches
    const expectedAmount = parseFloat(order.total).toFixed(2);
    const receivedAmount = parseFloat(postData.amount_gross).toFixed(2);
    
    if (expectedAmount !== receivedAmount) {
      console.error('[PayFast Webhook] Amount mismatch:', {
        expected: expectedAmount,
        received: receivedAmount,
      });
      
      // Update order with error
      await supabase
        .from('orders')
        .update({
          status: 'failed',
          payment_error: 'Amount mismatch',
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);
      
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
    }
    
    // Process payment based on status
    const paymentStatus = postData.payment_status;
    
    switch (paymentStatus) {
      case 'COMPLETE':
        await handleSuccessfulPayment(order, postData);
        break;
        
      case 'FAILED':
        await handleFailedPayment(order, postData);
        break;
        
      case 'CANCELLED':
        await handleCancelledPayment(order, postData);
        break;
        
      default:
        console.warn('[PayFast Webhook] Unknown payment status:', paymentStatus);
    }
    
    // IMPORTANT: Always return 200 OK to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('[PayFast Webhook] Error:', error);
    
    // Still return 200 to prevent PayFast from retrying
    // Log error for manual review
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

// Handle successful payment
async function handleSuccessfulPayment(
  order: any,
  paymentData: Record<string, string>
) {
  const supabase = createClient();
  
  try {
    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'completed',
        payment_status: 'paid',
        paid_at: new Date().toISOString(),
        payfast_payment_id: paymentData.pf_payment_id,
        payment_data: paymentData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);
    
    console.log('[PayFast Webhook] Order completed:', order.id);
    
    // Fulfill order (send download links, etc.)
    await fulfillOrder(order);
    
    // Send purchase confirmation email
    await sendPurchaseConfirmation(order);
    
    // Track analytics event
    await trackPurchaseEvent(order, paymentData);
    
  } catch (error) {
    console.error('[PayFast Webhook] Error handling successful payment:', error);
    
    // Mark for manual review
    await supabase
      .from('orders')
      .update({
        status: 'requires_attention',
        payment_error: 'Fulfillment error',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);
  }
}

// Handle failed payment
async function handleFailedPayment(
  order: any,
  paymentData: Record<string, string>
) {
  const supabase = createClient();
  
  await supabase
    .from('orders')
    .update({
      status: 'failed',
      payment_status: 'failed',
      payment_error: paymentData.payment_failure_reason || 'Payment failed',
      payment_data: paymentData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', order.id);
  
  console.log('[PayFast Webhook] Payment failed:', order.id);
  
  // Send payment failed email (optional)
  // await sendPaymentFailedEmail(order);
}

// Handle cancelled payment
async function handleCancelledPayment(
  order: any,
  paymentData: Record<string, string>
) {
  const supabase = createClient();
  
  await supabase
    .from('orders')
    .update({
      status: 'cancelled',
      payment_status: 'cancelled',
      payment_data: paymentData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', order.id);
  
  console.log('[PayFast Webhook] Payment cancelled:', order.id);
}

// Track purchase event for analytics
async function trackPurchaseEvent(
  order: any,
  paymentData: Record<string, string>
) {
  // Send to analytics (Google Analytics, PostHog, etc.)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'ZAR',
      items: order.items,
    });
  }
  
  // Can also send to PostHog or other analytics platforms
}
```

---

## 3. PAYMENT STATUS HANDLING

### PayFast Payment Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| `COMPLETE` | Payment successful | Fulfill order |
| `FAILED` | Payment declined | Mark as failed |
| `CANCELLED` | User cancelled | Mark as cancelled |
| `PENDING` | Payment processing | Wait for update |

### Order Status Flow

```
pending → COMPLETE → completed → fulfilled
        ↓ FAILED → failed
        ↓ CANCELLED → cancelled
```

---

## 4. ORDER FULFILLMENT LOGIC

### Fulfillment Function

```typescript
// lib/orders/fulfill-order.ts
import { createClient } from '@/lib/supabase/server';
import { sendDigitalDownload } from '@/lib/emails/digital-download';
import { generateDownloadToken } from '@/lib/downloads/generate-token';

export async function fulfillOrder(order: any) {
  const supabase = createClient();
  
  try {
    // Process each item in the order
    for (const item of order.items) {
      await fulfillOrderItem(order, item);
    }
    
    // Mark order as fulfilled
    await supabase
      .from('orders')
      .update({
        fulfilled_at: new Date().toISOString(),
        status: 'fulfilled',
      })
      .eq('id', order.id);
    
    console.log('[Order Fulfillment] Order fulfilled:', order.id);
    
  } catch (error) {
    console.error('[Order Fulfillment] Error:', error);
    throw error;
  }
}

async function fulfillOrderItem(order: any, item: any) {
  const supabase = createClient();
  
  switch (item.category) {
    case 'notion-template':
      await fulfillNotionTemplate(order, item);
      break;
      
    case 'poetry-book':
      if (item.metadata.requires_shipping) {
        await createShippingOrder(order, item);
      } else {
        await fulfillDigitalBook(order, item);
      }
      break;
      
    case 'ai-prompt':
    case 'code-snippet':
    case 'website-template':
    case 'operations-manual':
      await fulfillDigitalDownload(order, item);
      break;
      
    case 'bundle':
      // Bundle contains multiple items
      for (const bundleItemId of item.metadata.bundle_items) {
        const bundleItem = await supabase
          .from('products')
          .select('*')
          .eq('id', bundleItemId)
          .single();
        
        if (bundleItem.data) {
          await fulfillOrderItem(order, bundleItem.data);
        }
      }
      break;
      
    default:
      console.warn('[Order Fulfillment] Unknown category:', item.category);
  }
}

async function fulfillNotionTemplate(order: any, item: any) {
  const supabase = createClient();
  
  // Get Notion template URL from database
  const { data: product } = await supabase
    .from('products')
    .select('notion_template_url')
    .eq('id', item.product_id)
    .single();
  
  if (!product?.notion_template_url) {
    throw new Error('Notion template URL not found');
  }
  
  // Generate secure download token
  const downloadToken = await generateDownloadToken({
    order_id: order.id,
    product_id: item.product_id,
    expires_in: 30 * 24 * 60 * 60, // 30 days
  });
  
  // Send email with Notion template link
  await sendDigitalDownload({
    to: order.customer_email,
    customerName: order.customer_name,
    productName: item.name,
    downloadUrl: product.notion_template_url,
    accessToken: downloadToken,
    orderNumber: order.order_number,
  });
}

async function fulfillDigitalDownload(order: any, item: any) {
  const supabase = createClient();
  
  // Get download URL
  const { data: product } = await supabase
    .from('products')
    .select('download_url, file_name')
    .eq('id', item.product_id)
    .single();
  
  if (!product?.download_url) {
    throw new Error('Download URL not found');
  }
  
  // Generate secure download token
  const downloadToken = await generateDownloadToken({
    order_id: order.id,
    product_id: item.product_id,
    expires_in: 30 * 24 * 60 * 60, // 30 days
  });
  
  // Send email with download link
  await sendDigitalDownload({
    to: order.customer_email,
    customerName: order.customer_name,
    productName: item.name,
    downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${downloadToken}`,
    fileName: product.file_name,
    orderNumber: order.order_number,
  });
}

async function fulfillDigitalBook(order: any, item: any) {
  // Similar to digital download
  await fulfillDigitalDownload(order, item);
}

async function createShippingOrder(order: any, item: any) {
  const supabase = createClient();
  
  // Create shipping record
  await supabase.from('shipping_orders').insert({
    order_id: order.id,
    product_id: item.product_id,
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    shipping_address: order.shipping_address,
    status: 'pending',
    created_at: new Date().toISOString(),
  });
  
  // Send shipping confirmation email
  // await sendShippingConfirmation(order, item);
}
```

### Download Token Generation

```typescript
// lib/downloads/generate-token.ts
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

interface TokenData {
  order_id: string;
  product_id: string;
  expires_in: number; // seconds
}

export async function generateDownloadToken(data: TokenData): Promise<string> {
  const supabase = createClient();
  
  // Generate secure random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Calculate expiry date
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + data.expires_in);
  
  // Store token in database
  await supabase.from('download_tokens').insert({
    token,
    order_id: data.order_id,
    product_id: data.product_id,
    expires_at: expiresAt.toISOString(),
    created_at: new Date().toISOString(),
  });
  
  return token;
}

export async function validateDownloadToken(token: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('download_tokens')
    .select('*')
    .eq('token', token)
    .single();
  
  if (error || !data) return false;
  
  // Check if expired
  if (new Date(data.expires_at) < new Date()) {
    return false;
  }
  
  // Check download limit (optional)
  if (data.download_count >= 10) {
    return false;
  }
  
  // Increment download count
  await supabase
    .from('download_tokens')
    .update({ download_count: data.download_count + 1 })
    .eq('token', token);
  
  return true;
}
```

### Download Route

```typescript
// app/downloads/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateDownloadToken } from '@/lib/downloads/generate-token';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;
    
    // Validate token
    const isValid = await validateDownloadToken(token);
    
    if (!isValid) {
      return new NextResponse('Invalid or expired download link', {
        status: 403,
      });
    }
    
    // Get download details
    const supabase = createClient();
    const { data } = await supabase
      .from('download_tokens')
      .select(`
        *,
        products (
          download_url,
          file_name
        )
      `)
      .eq('token', token)
      .single();
    
    if (!data?.products?.download_url) {
      return new NextResponse('Download not found', { status: 404 });
    }
    
    // Redirect to actual file
    return NextResponse.redirect(data.products.download_url);
    
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Download failed', { status: 500 });
  }
}
```

---

## 5. ERROR HANDLING

### Webhook Retry Logic

PayFast will retry failed webhooks:
- Retry interval: 10 minutes
- Maximum retries: 5 attempts
- Always return 200 OK even on errors to prevent endless retries

### Error Logging

```typescript
// lib/logging/webhook-logger.ts
import { createClient } from '@/lib/supabase/server';

export async function logWebhookError(
  orderId: string,
  error: any,
  paymentData: Record<string, string>
) {
  const supabase = createClient();
  
  await supabase.from('webhook_logs').insert({
    order_id: orderId,
    status: 'error',
    error_message: error.message,
    error_stack: error.stack,
    payment_data: paymentData,
    created_at: new Date().toISOString(),
  });
  
  // Send alert to admin (Slack, email, etc.)
  await sendAdminAlert({
    title: 'Webhook Processing Error',
    orderId,
    error: error.message,
  });
}
```

### Manual Order Review

```typescript
// app/api/admin/orders/retry-fulfillment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fulfillOrder } from '@/lib/orders/fulfill-order';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const { orderId } = await request.json();
    
    // Get order
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // Retry fulfillment
    await fulfillOrder(order);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Retry fulfillment error:', error);
    return NextResponse.json(
      { error: 'Failed to retry fulfillment' },
      { status: 500 }
    );
  }
}

function isAdmin(user: any): boolean {
  // Check if user is admin
  return user.email === 'hello@creativelynanda.co.za';
}
```

---

## 6. TESTING WEBHOOKS

### Local Testing with ngrok

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js dev server
npm run dev

# In another terminal, expose localhost
ngrok http 3000

# Use the ngrok URL as your notify_url
# Example: https://abc123.ngrok.io/api/webhooks/payfast
```

### Testing Checklist

- [ ] Test successful payment webhook
- [ ] Test failed payment webhook
- [ ] Test cancelled payment webhook
- [ ] Test invalid signature (should reject)
- [ ] Test invalid IP (should reject)
- [ ] Test amount mismatch (should reject)
- [ ] Test duplicate webhook (should handle gracefully)
- [ ] Test fulfillment for each product type
- [ ] Test email sending
- [ ] Test download token generation
- [ ] Test download token expiry
- [ ] Verify order status updates correctly
- [ ] Test manual retry fulfillment

### Webhook Testing Tool

```typescript
// scripts/test-webhook.ts
import crypto from 'crypto';

async function testWebhook() {
  const testData = {
    m_payment_id: 'test-order-123',
    pf_payment_id: '1234567',
    payment_status: 'COMPLETE',
    item_name: 'Test Order',
    item_description: 'Test',
    amount_gross: '149.00',
    amount_fee: '7.81',
    amount_net: '141.19',
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    name_first: 'Test',
    name_last: 'User',
    email_address: 'test@example.com',
  };
  
  // Generate signature
  const signature = generateSignature(testData, process.env.PAYFAST_PASSPHRASE);
  
  // Send webhook
  const response = await fetch('http://localhost:3000/api/webhooks/payfast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-forwarded-for': '197.97.145.144', // PayFast IP
    },
    body: new URLSearchParams({
      ...testData,
      signature,
    }),
  });
  
  console.log('Response:', await response.text());
}

function generateSignature(data: Record<string, string>, passPhrase?: string) {
  let pfOutput = '';
  for (let key in data) {
    if (data[key] !== '') {
      pfOutput += `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}&`;
    }
  }
  
  let getString = pfOutput.slice(0, -1);
  if (passPhrase) {
    getString += `&passphrase=${encodeURIComponent(passPhrase).replace(/%20/g, '+')}`;
  }
  
  return crypto.createHash('md5').update(getString).digest('hex');
}

testWebhook();
```

---

## 📝 CRITICAL REMINDERS FOR CLAUDE CODE

1. **Always return 200 OK** - Even on errors, to prevent endless retries
2. **Verify ALL security checks** - Signature, IP, amount, server validation
3. **Log everything** - Webhook events are critical for debugging
4. **Handle idempotency** - Same webhook may arrive multiple times
5. **Async fulfillment** - Don't block webhook response waiting for fulfillment
6. **Email errors to admin** - When fulfillment fails
7. **Test thoroughly** - Use ngrok for local testing
8. **Monitor webhook logs** - Check regularly for failed webhooks

---

**End of Webhook Handler Guide**