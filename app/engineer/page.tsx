import { Metadata } from 'next';
import EngineerFeature from '@/components/engineer/EngineerFeature';

export const metadata: Metadata = {
  title: 'The Making of an Engineer | Nandawula Regine — From Zero to a 15-Wing AI OS',
  description:
    'A career feature: how Nandawula Regine Kabali-Kagwa went from her first line of code in July 2025 to eight live AI products and a 15-wing personal AI operating system in one year. Multi-agent systems, RAG, model routing, and the fifteen distinctions underneath it all.',
  keywords: [
    'Nandawula Regine engineer',
    'self-taught AI engineer',
    'AI engineer career story',
    'African AI engineer',
    'AI engineer South Africa',
    'Claude API developer',
    'multi-agent systems developer',
    'RAG developer',
    'full-stack AI engineer',
    'from zero to engineer',
    'Mirembe Muse',
    'CreativelyNanda',
    'KuGompo City developer',
  ],
  openGraph: {
    title: 'The Making of an Engineer | Nandawula Regine',
    description:
      'From her first line of code to a 15-wing AI operating system in one year. A Vogue-style career feature on the poet who codes.',
    images: [{ url: 'https://creativelynanda.co.za/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    url: 'https://creativelynanda.co.za/engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Making of an Engineer | Nandawula Regine',
    description: 'Zero to a 15-wing AI OS in one year. The engineering evolution, told as a photo essay.',
    images: ['https://creativelynanda.co.za/og-image.png'],
  },
  alternates: { canonical: 'https://creativelynanda.co.za/engineer' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Nandawula Regine Kabali-Kagwa',
    jobTitle: 'AI Engineer',
    description:
      'Self-taught AI engineer and founder of Mirembe Muse. Built eight live AI products and a 15-wing personal AI operating system within one year of writing her first line of code.',
    url: 'https://creativelynanda.co.za/engineer',
    worksFor: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nelson Mandela University' },
    knowsAbout: [
      'Claude API', 'Multi-agent systems', 'Retrieval-augmented generation', 'Next.js',
      'TypeScript', 'Supabase', 'WhatsApp Cloud API', 'Prompt engineering', 'PayFast',
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'KuGompo City', addressRegion: 'Eastern Cape', addressCountry: 'ZA' },
  },
};

export default function EngineerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <EngineerFeature />
    </>
  );
}
