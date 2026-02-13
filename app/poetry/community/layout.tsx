import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Poetry Community',
  description: 'Join the poetry community - share your voice, leave roses on poems, and connect with fellow poetry lovers.',
  path: '/poetry/community',
  keywords: ['poetry community', 'poetry reviews', 'Inside Her Roses'],
});

export default function PoetryCommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
