import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire AI Engineer | Services & Pricing — Nandawula Regine',
  description:
    'AI engineering services and transparent pricing from Nandawula Regine — Claude API integration, multi-agent systems, WhatsApp automation, SaaS builds, and fractional AI advisory. Remote-available. ZAR + USD pricing.',
  keywords: [
    // Hire-intent
    'hire AI engineer',
    'AI engineer services',
    'AI engineer pricing',
    'AI engineer rates South Africa',
    'freelance AI engineer',
    'contract AI engineer remote',
    // Service-specific
    'Claude API integration service',
    'multi-agent AI development',
    'WhatsApp AI automation service',
    'AI SaaS development',
    'Next.js development service',
    'Supabase development service',
    'fractional AI officer',
    'fractional CTO AI',
    'AI strategy consulting',
    // Geographic
    'AI consulting South Africa',
    'AI engineering South Africa',
    'web development South Africa',
    'developer for hire KuGompo City South Africa',
    // Intent
    'AI development pricing',
    'web development pricing South Africa',
    'how much does AI development cost South Africa',
    'Nandawula Kabali-Kagwa consulting',
    'Mirembe Muse consulting',
  ],
  openGraph: {
    title: 'Hire AI Engineer | Services & Pricing — Nandawula Regine',
    description:
      'Claude API agents, multi-agent systems, WhatsApp automation, SaaS builds. Transparent ZAR + USD pricing. Remote-available from South Africa.',
    url: 'https://creativelynanda.co.za/consulting',
    images: [{ url: 'https://creativelynanda.co.za/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire AI Engineer | Nandawula Regine',
    description:
      'AI engineering services with transparent pricing. Claude API, multi-agent systems, WhatsApp automation. Remote-available from South Africa.',
    images: ['https://creativelynanda.co.za/og-image.png'],
  },
  alternates: { canonical: 'https://creativelynanda.co.za/consulting' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
