import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'The House of Roses Press: essays and field notes by Nandawula Regine',
  description:
    'Essays and field notes by Nandawula Regine Kabali-Kagwa, Ugandan-South African poet and AI engineer, published in numbered issues. How the builds were made, decision by decision, and writing on heritage and craft.',
  path: '/blog',
  keywords: [
    'Nandawula Regine essays',
    'African AI engineer field notes',
    'South African software engineering writing',
    'building apps for South Africa',
    'Black woman engineer essays',
    'poet who codes',
    'K53 Drill Master engineering',
    'True Access accessibility app',
    'VarsityOS Campus Compass build',
    'JarvisOS personal AI operating system',
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
