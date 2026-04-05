import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Projects | Nandawula Regine Kabali-Kagwa — AI Engineer South Africa',
  description:
    'Explore 7 live AI SaaS products built by Nandawula Regine Kabali-Kagwa — from StokvelOS to K53 Drill Master. African-first engineering from East London, South Africa. 550+ GitHub commits.',
  path: '/projects',
  keywords: [
    'African developer projects',
    'AI-powered apps South Africa',
    'StokvelOS stokvel management app',
    'K53 Drill Master driving test app',
    'True Access accessibility app',
    'Campus Compass student app',
    'Nandawula Regine projects',
    'full-stack developer portfolio Africa',
    'Next.js TypeScript Supabase apps',
    'Mapbox geolocation app Africa',
    'PayFast payment integration',
    'OpenAI app development South Africa',
  ],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
