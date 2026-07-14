import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'The Poet Who Codes',
  description:
    'Two tongues — the language of longing and the language of systems. On being a poet, an AI engineer, and a founder in one body. The bridge between Inside Her Roses and Mirembe Muse.',
  path: '/poetry/poet-who-codes',
  keywords: [
    'poet who codes', 'creative technologist', 'AI engineer poet',
    'Nanda Regine', 'Ubuntu code', 'Mirembe Muse', 'poetry and code',
  ],
});

export default function PoetWhoCodesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
