import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Wall — Poems, Page by Page | Nandawula Regine',
  description:
    'A pinned-paper wall of Nandawula Regine’s poems as they first lived on @nanda.regine — each Instagram carousel a poem told page by page, with painted art cards between. Part of the House of Roses.',
  keywords: [
    'Nandawula Regine poetry', 'Inside Her Roses', 'poem wall', 'visual poetry',
    'South African poet', 'spoken word poet', 'poem cards', 'nanda.regine',
  ],
  openGraph: {
    title: 'The Wall — Poems, Page by Page',
    description: 'A pinned-paper wall of poems told page by page. Part of the House of Roses.',
    type: 'website',
    url: 'https://creativelynanda.co.za/poetry/wall',
  },
  alternates: { canonical: 'https://creativelynanda.co.za/poetry/wall' },
};

export default function WallLayout({ children }: { children: React.ReactNode }) {
  return children;
}
