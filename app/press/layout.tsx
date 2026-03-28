import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Kit | Nandawula Regine Kabali-Kagwa — Creative Technologist & AI Engineer',
  description:
    'Official press kit for Nandawula Regine Kabali-Kagwa. Bios, fast facts, speaking topics, media assets, and press inquiries for Africa\'s Creative Technologist and AI Engineer.',
  keywords: [
    'Nandawula Regine Kabali-Kagwa press kit',
    'Nanda press kit',
    'African creative technologist media kit',
    'AI engineer speaker South Africa',
    'tech speaker Africa',
    'Black woman tech speaker',
    'inside her roses poet',
    'Mirembe Muse founder',
    'African entrepreneur speaker',
    'women in tech South Africa',
  ],
  openGraph: {
    title: 'Press Kit | Nandawula Regine — Africa\'s Creative Technologist',
    description:
      'Official media resources for Nandawula Regine Kabali-Kagwa — AI Engineer, Published Poet, and Founder of Mirembe Muse.',
    images: ['/og-press.jpg'],
    type: 'profile',
    url: 'https://creativelynanda.co.za/press',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit | Nandawula Regine',
    description: 'Official media kit — bios, fast facts, speaking topics, and press resources.',
    images: ['/og-press.jpg'],
  },
  alternates: {
    canonical: 'https://creativelynanda.co.za/press',
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
