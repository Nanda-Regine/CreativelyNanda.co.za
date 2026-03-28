import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'The Current — Blog by Nandawula Regine Kabali-Kagwa | AI Engineer & Creative Technologist',
  description:
    'Tech case studies, creative writing essays, and business insights from an African AI Engineer. Deep dives on K53 Drill Master, Campus Compass, PayFast integration, PoetryTube, and building apps for South African communities.',
  path: '/blog',
  keywords: [
    'African AI engineer blog',
    'South Africa tech blog',
    'K53 Drill Master case study',
    'Campus Compass case study',
    'PoetryTube case study',
    'PayFast integration tutorial',
    'Supabase Next.js tutorial',
    'building apps for Africa',
    'black woman developer blog',
    'creative technologist writing',
    'Nanda Kabali-Kagwa blog',
    'African developer case study',
    'NSFAS app development',
    'South African startup tech',
    'web development South Africa',
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
