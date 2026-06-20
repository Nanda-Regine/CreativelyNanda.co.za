import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nandawula Regine — Poet, Creative & Culture-Keeper',
  description:
    'Nandawula Regine Kabali-Kagwa — published poet (Inside Her Roses), performer and creative from East London, South Africa. Nine documented generations across four nations: Nseenene of Buganda, AmaTshawe, AmaHlubi and Msimango.',
  path: '/about',
  keywords: [
    'Nandawula Regine Kabali-Kagwa',
    'Inside Her Roses',
    'South African poet',
    'African woman poet',
    'spoken word Eastern Cape',
    'Nseenene clan Buganda',
    'AmaTshawe Xhosa',
    'AmaHlubi',
    'Msimango Thabizolo',
    'Kabali-Kagwa lineage',
    'East London South Africa poet',
    'African heritage storytelling',
    'Buganda Kingdom clans',
    'Drakensberg Hlubi',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
