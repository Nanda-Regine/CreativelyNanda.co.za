import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Lineage — The soil the roses grew from',
  description:
    "Nanda Regine's ancestry: the Nseenene Clan of the Buganda Kingdom, AmaTshawe of the Xhosa nation, AmaHlubi, and Msimanga oThabizolo — the four royal houses behind Inside Her Roses.",
  path: '/poetry/lineage',
  keywords: [
    'Nseenene clan', 'Buganda Kingdom', 'AmaTshawe', 'Xhosa royal house',
    'AmaHlubi', 'Msimanga', 'oThabizolo', 'Nanda Regine lineage', 'Ubuntu',
  ],
});

export default function LineageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
