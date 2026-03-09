import crypto from 'crypto';
import {
  PAYFAST_CONFIG,
  getPayfastUrl,
  PAYFAST_NOTIFY_URL,
  PAYFAST_RETURN_URL,
  PAYFAST_CANCEL_URL,
} from './config';

export interface PayfastPaymentData {
  // Merchant details
  merchant_id: string;
  merchant_key: string;

  // Buyer details
  email_address: string;
  name_first?: string;
  name_last?: string;

  // Transaction details
  m_payment_id: string; // Our order ID
  amount: string; // In Rands, 2 decimal places
  item_name: string;
  item_description?: string;

  // URLs
  return_url: string;
  cancel_url: string;
  notify_url: string;

  // Optional
  email_confirmation?: '0' | '1';
  confirmation_address?: string;
}

/**
 * PHP urlencode-compatible encoding to match PayFast's signature verification.
 * encodeURIComponent leaves !'()* unencoded; PHP urlencode encodes them.
 */
function phpUrlencode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%20/g, '+')
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

/**
 * Generate MD5 signature for PayFast
 */
export function generateSignature(data: Record<string, string>, passphrase?: string): string {
  // Create parameter string — preserve insertion order to match what the browser POSTs to PayFast.
  // PayFast verifies using the field order it receives, so we must NOT sort alphabetically here.
  const params = Object.keys(data)
    .filter((key) => key !== 'signature' && data[key] !== '')
    .map((key) => `${key}=${phpUrlencode(data[key])}`)
    .join('&');

  // Add passphrase if provided
  const signatureString = passphrase ? `${params}&passphrase=${phpUrlencode(passphrase)}` : params;

  // Generate MD5 hash
  return crypto.createHash('md5').update(signatureString).digest('hex');
}

/**
 * Create PayFast payment data object
 */
export function createPaymentData({
  orderId,
  amount,
  itemName,
  itemDescription,
  buyerEmail,
  buyerFirstName,
  buyerLastName,
}: {
  orderId: string;
  amount: number; // In cents
  itemName: string;
  itemDescription?: string;
  buyerEmail: string;
  buyerFirstName?: string;
  buyerLastName?: string;
}): Record<string, string> {
  // Convert cents to Rands with 2 decimal places
  const amountInRands = (amount / 100).toFixed(2);

  // Build in PayFast's EXACT canonical field order.
  // PayFast verifies the signature using this order — any deviation causes a 400.
  // Order: merchant_id, merchant_key, return_url, cancel_url, notify_url,
  //        name_first*, name_last*, email_address, m_payment_id, amount,
  //        item_name, item_description*   (* = optional, omit when empty)
  const data: Record<string, string> = {};
  data.merchant_id  = PAYFAST_CONFIG.merchantId;
  data.merchant_key = PAYFAST_CONFIG.merchantKey;
  data.return_url   = `${PAYFAST_RETURN_URL}?order_id=${orderId}`;
  data.cancel_url   = PAYFAST_CANCEL_URL;
  data.notify_url   = PAYFAST_NOTIFY_URL;
  if (buyerFirstName)   data.name_first        = buyerFirstName.substring(0, 100);
  if (buyerLastName)    data.name_last         = buyerLastName.substring(0, 100);
  data.email_address  = buyerEmail;
  data.m_payment_id   = orderId;
  data.amount         = amountInRands;
  data.item_name      = itemName.substring(0, 100);
  if (itemDescription) data.item_description  = itemDescription.substring(0, 255);

  // Generate signature
  const signature = generateSignature(data, PAYFAST_CONFIG.passphrase);

  return { ...data, signature };
}

/**
 * Get PayFast checkout URL
 */
export function getCheckoutUrl(): string {
  return getPayfastUrl();
}

/**
 * Verify PayFast webhook signature
 */
export function verifyWebhookSignature(data: Record<string, string>): boolean {
  const receivedSignature = data.signature;
  if (!receivedSignature) return false;

  // Remove signature from data before verification
  const { signature: _, ...dataWithoutSignature } = data;

  const calculatedSignature = generateSignature(dataWithoutSignature, PAYFAST_CONFIG.passphrase);

  return receivedSignature === calculatedSignature;
}

/**
 * Validate PayFast source IP
 * PayFast only sends webhooks from specific IPs
 */
export function validatePayfastIP(ip: string): boolean {
  const validIPs = [
    '197.97.145.144',
    '197.97.145.145',
    '197.97.145.146',
    '197.97.145.147',
    '41.74.179.194',
    '41.74.179.195',
    '41.74.179.196',
    '41.74.179.197',
  ];

  // In sandbox mode, allow all IPs
  if (PAYFAST_CONFIG.sandbox) return true;

  return validIPs.includes(ip);
}

export * from './config';
