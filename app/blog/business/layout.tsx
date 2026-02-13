import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Business Insights',
  description: 'Insights on entrepreneurship, freelancing, building a creative business, and navigating the non-linear path from hospitality to tech in South Africa.',
  path: '/blog/business',
  keywords: ['business', 'entrepreneurship', 'freelancing', 'Mirembe Muse', 'South Africa'],
});

export default function BlogBusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
