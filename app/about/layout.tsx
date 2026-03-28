import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nandawula Regine Kabali-Kagwa — AI Engineer & Creative Technologist',
  description:
    'The story of Nandawula Regine Kabali-Kagwa — AI Engineer, Full-Stack Developer, Published Poet, and Founder of Mirembe Muse. Royal Ugandan-Xhosa heritage, 15 academic distinctions, 9 live applications. Based in East London, South Africa.',
  path: '/about',
  keywords: [
    'Nandawula Regine Kabali-Kagwa biography',
    'African AI engineer background',
    'creative technologist South Africa story',
    'self-taught developer Africa',
    'black woman tech South Africa',
    'Kabali-Kagwa clan Uganda',
    'Hlubi clan Xhosa',
    'Nelson Mandela University developer',
    'SheCodes Africa developer',
    'Mirembe Muse founder',
    'Inside Her Roses poet',
    'African entrepreneur background',
    'women in tech South Africa',
    'African developer origin story',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
