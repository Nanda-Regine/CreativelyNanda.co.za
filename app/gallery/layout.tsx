import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Gallery — Nandawula Regine · Portraits, Culture & Performance',
  description:
    'A photographic gallery of Nandawula Regine Kabali-Kagwa — thirteen image families across a decade: red-bodice portraits, Xhosa beadwork and ceremony, highland adventure, golden-hour gardens, the sea, and the poet at work. KuGompo City, South Africa.',
  path: '/gallery',
  keywords: [
    'Nandawula Regine gallery',
    'South African poet photography',
    'Xhosa beadwork portraits',
    'African woman portrait photography',
    'Inside Her Roses',
    'spoken word performance photos',
    'Basotho blanket highlands',
    'Sotho Xhosa heritage',
    'KuGompo City photography',
    'African editorial portraits',
    'creativelynanda gallery',
  ],
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
