import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

// The page is a client component, so its metadata lives here. Without it the
// page inherited /poetry's canonical and declared itself a duplicate of it.
export const metadata: Metadata = createMetadata({
  title: 'My Garden — Your Plot in the Poetry Garden',
  description:
    'The poems you keep and the little garden your own writing grows, in the House of Roses by Nandawula Regine. It lives on your device, just for you.',
  path: '/poetry/my-garden',
  keywords: ['poetry garden', 'saved poems', 'writing prompts', 'Inside Her Roses', 'Nandawula Regine'],
});

export default function MyGardenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
