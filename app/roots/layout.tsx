import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roots — The Nseenene, amaTshawe & Msimango Lineage | Nandawula Regine',
  description:
    'The heritage of Nandawula Regine Kabali-Kagwa across three nations: the Nseenene grasshopper clan of Buganda, the amaTshawe royal house of the Xhosa, and the amaHlubi Msimango clan — clan totems, mottoes and praise-poetry, told as an editorial journey.',
  keywords: [
    'Nseenene clan', 'Buganda clans', 'grasshopper clan', 'amaTshawe', 'Xhosa royal house',
    'Tshawe', 'amaHlubi', 'Msimango clan', 'izithakazelo', 'Apolo Kagwa', 'Kabali-Kagwa',
    'African heritage', 'clan lineage', 'Nandawula Regine',
  ],
  openGraph: {
    title: 'Roots — Three Nations, Nine Generations, One Voice',
    description:
      'The Nseenene of Buganda, the amaTshawe of the Xhosa, the Msimango of the Hlubi — the lineage behind the poet.',
    type: 'article',
  },
};

export default function RootsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
