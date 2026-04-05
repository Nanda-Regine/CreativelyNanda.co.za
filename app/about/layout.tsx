import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Nandawula Regine — AI Engineer, TypeScript Developer & Founder',
  description:
    'Nandawula Regine Kabali-Kagwa — AI Engineer, full-stack TypeScript developer, and founder of Mirembe Muse. Built 7 production AI apps in 9 months. Self-taught, 550+ commits, available for remote work globally. East London, South Africa.',
  path: '/about',
  keywords: [
    // Hire-intent discovery
    'Nandawula Regine Kabali-Kagwa',
    'AI engineer background',
    'AI engineer story',
    'self-taught AI engineer',
    'self-taught TypeScript developer',
    'developer portfolio about',
    // Differentiators
    '7 live AI apps',
    '550 GitHub commits',
    'nine months zero to production',
    'AI engineer from scratch',
    // Identity / community searches
    'African AI engineer',
    'black woman AI engineer',
    'black woman developer South Africa',
    'women in tech South Africa',
    'Ugandan South African developer',
    'Kabali-Kagwa',
    'Hlubi Xhosa developer',
    // Education / credentials
    'Nelson Mandela University developer',
    'SheCodes Africa graduate',
    // Founder
    'Mirembe Muse founder',
    'AI startup founder Africa',
    'Inside Her Roses published poet',
    // Origin
    'East London South Africa developer',
    'African developer origin story',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
