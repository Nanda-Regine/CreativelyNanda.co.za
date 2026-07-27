import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poetry Games — Word Search, Magnetic Poetry & Finish the Line | Creatively Nanda',
  description:
    'A little play room for word-lovers: a poetry word search, drag-and-drop magnetic poetry, and a finish-the-line game. Interactive literary games for poets and aspiring writers by Nandawula Regine.',
  keywords: ['poetry games', 'word search', 'magnetic poetry', 'finish the line', 'literary games', 'word games for writers', 'interactive poetry', 'Nandawula Regine'],
  openGraph: {
    title: 'Poetry Games — The Play Room',
    description: 'Word search, magnetic poetry, finish-the-line. Small, addictive ways to fall for words.',
    type: 'website',
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
