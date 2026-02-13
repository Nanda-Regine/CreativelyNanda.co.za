import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Poetry Collection',
  description: 'Browse poems from Inside Her Roses by Nanda Regine. Categories include Romance, Sensual, Life, Personal, Depth, and Empowering.',
  path: '/poetry/collection',
  keywords: ['poetry collection', 'Inside Her Roses', 'poems', 'Nanda Regine'],
});

export default function PoetryCollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
