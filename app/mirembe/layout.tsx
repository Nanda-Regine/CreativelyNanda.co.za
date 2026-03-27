import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Mirembe Muse | Africa-First AI Products — South Africa',
  description:
    'Mirembe Muse (Pty) Ltd — seven Africa-first AI SaaS products, six Notion templates, and digital tools for African students, entrepreneurs, and creators. East London, South Africa.',
  path: '/mirembe',
  keywords: [
    'Mirembe Muse',
    'Africa-first SaaS',
    'African AI company South Africa',
    'Notion templates Africa',
    'StokvelOS',
    'AdminOS',
    'WatchSankofa',
    'VarsityOS Campus Compass',
    'African technology company',
    'East London South Africa startup',
    'Ubuntu technology',
  ],
});

export default function MirembeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
