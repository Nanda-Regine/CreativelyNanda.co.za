import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulting | Nandawula Regine — AI Engineering & Product Strategy',
  description:
    'AI integration, fractional AI advisory, and one-on-one strategy sessions from the founder of seven Africa-first AI products. Available for select engagements globally.',
  keywords: [
    'AI consulting South Africa',
    'fractional AI officer',
    'AI engineering consulting',
    'Africa AI strategy',
    'Nandawula Kabali-Kagwa consulting',
    'hire AI engineer Africa',
    'product strategy AI',
    'Mirembe Muse consulting',
  ],
  openGraph: {
    title: 'Consulting | Nandawula Regine — AI Engineering & Product Strategy',
    description:
      'AI integration, fractional advisory, and strategy sessions from the founder of seven Africa-first AI products.',
    url: 'https://creativelynanda.co.za/consulting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulting | Nandawula Regine',
    description:
      'AI engineering and product strategy consulting — Africa-first, globally available.',
  },
  alternates: { canonical: 'https://creativelynanda.co.za/consulting' },
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
