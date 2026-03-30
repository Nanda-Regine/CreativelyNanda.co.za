import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Mirembe Muse',
  description: 'Mirembe Muse (Pty) Ltd - a creative technology and African botanical wellness company. Digital products, custom systems, and purpose-driven business.',
  path: '/mirembe',
  keywords: ['Mirembe Muse', 'creative technology', 'African wellness', 'digital products', 'South Africa'],
});

export default function MirembeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
