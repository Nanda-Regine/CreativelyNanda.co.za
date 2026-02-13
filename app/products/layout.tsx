import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Digital Products & Templates',
  description: 'Premium Notion templates and digital products for South African students, businesses, and creatives. NSFAS trackers, business hubs, and poetry collections from R99.',
  path: '/products',
  keywords: ['Notion templates', 'digital products', 'NSFAS tracker', 'student templates', 'business tools', 'South Africa'],
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
