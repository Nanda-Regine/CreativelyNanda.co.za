import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Field Notes: The House of Roses Press',
  description:
    'Field notes from the Forge: how Nandawula Regine builds AI products for South Africa, decision by decision. K53 Drill Master, VarsityOS, True Access, JarvisOS, PayFast, Supabase, Claude.',
  path: '/blog/dev',
  keywords: ['engineering field notes', 'South African software engineer', 'Next.js Supabase case study', 'Claude API production', 'building for budget Android', 'PayFast integration'],
});

export default function BlogDevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
