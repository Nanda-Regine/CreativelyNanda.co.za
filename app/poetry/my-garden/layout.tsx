import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

// The page is a client component, so its metadata lives here. Without it the
// page inherited /poetry's canonical and declared itself a duplicate of it.
export const metadata: Metadata = createMetadata({
  title: 'My Garden · Your Plot in the Poetry Garden',
  description:
    'A private garden that grows as you read Inside Her Roses by Nandawula Regine: every poem you open plants a seed, the ones you keep bloom, and your own poems grow a bed of their own.',
  path: '/poetry/my-garden',
  keywords: ['poetry garden', 'saved poems', 'writing prompts', 'Inside Her Roses', 'Nandawula Regine'],
});

export default function MyGardenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
