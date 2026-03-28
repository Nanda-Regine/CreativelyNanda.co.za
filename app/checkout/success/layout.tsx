import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Order Confirmed',
  description: 'Your order has been confirmed. Check your email for download details.',
  path: '/checkout/success',
  noIndex: true,
});

export default function CheckoutSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
