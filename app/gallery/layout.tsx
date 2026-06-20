import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Gallery — Nandawula Regine · Poetry, Performance, Culture & Art',
  description:
    'A gallery of Nandawula Regine Kabali-Kagwa — spoken-word performances, cultural photography across two continents, the Inside Her Roses collection, and painterly abstract art. East London, South Africa.',
  path: '/gallery',
  keywords: [
    'Nandawula Regine gallery',
    'Inside Her Roses',
    'spoken word performance South Africa',
    'African cultural photography',
    'Sotho Xhosa heritage',
    'abstract art East London',
    'African woman artist',
  ],
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
