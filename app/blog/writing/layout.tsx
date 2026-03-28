import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Writing & Poetry Articles',
  description: 'Articles on creative writing, poetry, storytelling, and the intersection of words and technology. By published poet Nanda Regine.',
  path: '/blog/writing',
  keywords: ['writing', 'poetry', 'creative writing', 'storytelling', 'Inside Her Roses'],
});

export default function BlogWritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
