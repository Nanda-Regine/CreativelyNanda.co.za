import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Blog - The Current',
  description: 'Articles on web development, creative writing, and business insights. A digital magazine where code, creativity, and commerce converge.',
  path: '/blog',
  keywords: ['blog', 'web development', 'creative writing', 'business', 'tech articles', 'South Africa'],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
