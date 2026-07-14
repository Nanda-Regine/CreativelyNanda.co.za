import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Stage — Spoken Word by Nanda Regine',
  description:
    'Watch Nanda Regine perform her poetry live — spoken word, open-mic nights and stage performances from Nelson Mandela Bay and beyond.',
  keywords: [
    'Nanda Regine spoken word',
    'South African poet performance',
    'live poetry Nelson Mandela Bay',
    'African spoken word artist',
    'Inside Her Roses live',
  ],
  openGraph: {
    title: 'The Stage — Spoken Word by Nanda Regine',
    description: 'The voice behind the verse. Watch Nanda perform live.',
    images: ['/assets/performance/nmb-perform-1.jpg'],
    type: 'video.other',
  },
};

export default function StageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
