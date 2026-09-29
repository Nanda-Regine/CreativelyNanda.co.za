import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

// A utility page, not content: kept out of search on purpose. Without its own
// metadata it inherited the homepage's title and canonical and claimed to be
// the homepage.
export const metadata: Metadata = createMetadata({
  title: 'Payment received',
  description: 'Return page after a PayFast payment.',
  path: '/payfast/return',
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
