import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Essays: The House of Roses Press',
  description:
    'Essays by Nandawula Regine on writing, heritage, looking closely, and building as a Black African woman. Published in numbered issues.',
  path: '/blog/writing',
  keywords: ['Nandawula Regine essays', 'African woman writer', 'poet essays', 'creative nonfiction South Africa', 'Inside Her Roses'],
});

export default function BlogWritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
