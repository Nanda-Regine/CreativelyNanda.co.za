/**
 * PayFast Configuration
 *
 * PayFast is a South African payment gateway.
 * Docs: https://developers.payfast.co.za/docs
 */

export const PAYFAST_CONFIG = {
  merchantId: process.env.PAYFAST_MERCHANT_ID!,
  merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
  sandbox: process.env.NEXT_PUBLIC_PAYFAST_SANDBOX === 'true',
};

export const PAYFAST_URLS = {
  sandbox: 'https://sandbox.payfast.co.za/eng/process',
  production: 'https://www.payfast.co.za/eng/process',
};

export const getPayfastUrl = () =>
  PAYFAST_CONFIG.sandbox ? PAYFAST_URLS.sandbox : PAYFAST_URLS.production;

export const PAYFAST_NOTIFY_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payfast/webhook`;
export const PAYFAST_RETURN_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`;
export const PAYFAST_CANCEL_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancelled`;
