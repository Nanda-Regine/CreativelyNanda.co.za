import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Order Cancelled',
  description: 'Your order was cancelled. No payment was processed.',
  path: '/checkout/cancelled',
  noIndex: true,
});

export default function CheckoutCancelledLayout({ children }: { children: React.ReactNode }) {
  return children;
}
