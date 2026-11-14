import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nandawula Regine · Poet, Creative & Culture-Keeper',
  description:
    'Nandawula Regine Kabali-Kagwa: poet and AI engineer from KuGompo City (East London), South Africa. Author of Inside Her Roses (2021) and a performer, of the Nseenene of Buganda, the amaTshawe and the amaHlubi Msimanga.',
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
    'amaTshawe Xhosa',
    'amaHlubi',
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
