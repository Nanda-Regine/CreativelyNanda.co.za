import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

// A utility page, not content: kept out of search on purpose. Without its own
// metadata it inherited the homepage's title and canonical and claimed to be
// the homepage.
export const metadata: Metadata = createMetadata({
  title: 'Payment cancelled',
  description: 'Return page after a cancelled PayFast payment.',
  path: '/payfast/cancel',
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
