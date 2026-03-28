import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Development Articles',
  description: 'Technical articles on React, Next.js, AI integration, Notion systems, and modern web development. Written by a full-stack developer in South Africa.',
  path: '/blog/dev',
  keywords: ['development', 'React', 'Next.js', 'AI', 'web development', 'tutorials'],
});

export default function BlogDevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
