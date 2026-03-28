import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Projects — 9 Live Applications by Nandawula Regine',
  description:
    'Explore 9 live applications built by Nandawula Regine Kabali-Kagwa — AI-powered tools, accessibility platforms, SaaS products, and community impact apps. From StokvelOS to K53 Drill Master to True Access App.',
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
