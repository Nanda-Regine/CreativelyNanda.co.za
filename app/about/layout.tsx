import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nandawula Regine — Poet, Creative & Culture-Keeper',
  description:
    'Nandawula Regine Kabali-Kagwa — published poet (Inside Her Roses), performer and creative from KuGompo City, South Africa. Nine documented generations across four nations: Nseenene of Buganda, AmaTshawe, AmaHlubi and Msimanga.',
  path: '/about',
  keywords: [
    'Nandawula Regine Kabali-Kagwa',
    'Inside Her Roses',
    'South African poet',
    'Ugandan poet',
    'Ugandan South African poet',
    'Ugandan diaspora writer',
    'Buganda Nseenene clan',
    'Luganda heritage',
    'African woman poet',
    'spoken word Eastern Cape',
    'Nseenene clan Buganda',
    'AmaTshawe Xhosa',
    'AmaHlubi',
    'Msimanga Thabizolo',
    'Kabali-Kagwa lineage',
    'KuGompo City South Africa poet',
    'East London South Africa poet',
    'KuGompo City formerly East London',
    'African heritage storytelling',
    'Buganda Kingdom clans',
    'Drakensberg Hlubi',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
