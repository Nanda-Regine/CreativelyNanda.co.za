import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Notion Templates & Digital Products | Mirembe Muse — South Africa',
  description:
    'Premium Notion templates built for South African students, creatives, musicians, and SMEs. Writers Sanctuary, Creators Studio, Music Artist Career Command Center, Academic Excellence hubs, and SME Command Center. From R249.',
  path: '/products',
  keywords: [
    'Notion templates South Africa',
    'Writers Sanctuary Notion template',
    'Creators Studio Notion template',
    'Music Artist Career Command Center',
    'High School Academic Excellence Notion',
    'Varsity Academic Excellence Notion',
    'SME Command Center South Africa',
    'student Notion template South Africa',
    'business Notion template ZAR',
    'digital products South Africa',
    'Mirembe Muse templates',
    'buy Notion template South Africa',
    'creative entrepreneur tools Africa',
    'NSFAS student planner',
    'South African digital products',
  ],
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
