import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'The Erasure Studio — make a poem from a poem',
  description:
    "Black out words in Nanda Regine's poems to reveal a new poem hidden inside. A playful erasure-poetry studio, then plant your creation in the Guest Garden.",
  path: '/poetry/erasure',
  keywords: ['erasure poetry', 'blackout poetry', 'writing tool', 'Nanda Regine', 'Inside Her Roses', 'poetry game'],
});

export default function ErasureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
