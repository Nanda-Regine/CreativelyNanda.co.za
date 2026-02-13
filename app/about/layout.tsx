import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nanda',
  description: 'Meet Nandawula Regine Kabali-Kagwa - Creative Technologist, Full-Stack Developer, Published Poet, and Founder of Mirembe Muse. Based in South Africa.',
  path: '/about',
  keywords: ['creative technologist', 'full-stack developer', 'published poet', 'Mirembe Muse', 'South Africa', 'Nanda Kabali-Kagwa'],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
