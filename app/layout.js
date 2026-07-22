import './globals.css';
import { Cormorant_Garamond, Manrope, Bebas_Neue, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import NandaAssistant from '@/components/NandaAssistant';
import { CartProvider } from '@/components/cart';
import { I18nProvider } from '@/lib/i18n';
import { generateWebSiteJsonLd, generatePersonJsonLd, JsonLd } from '@/lib/seo';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Nandawula Regine Kabali-Kagwa | Poet, Creative & Culture-Keeper — South Africa',
  description:
    'Nandawula Regine Kabali-Kagwa — published poet (Inside Her Roses), performer and creative from East London, South Africa. Nine documented generations across four nations: Nseenene of Buganda, AmaTshawe, AmaHlubi and Msimango. For software, AI engineering and consulting, visit Mirembe Muse.',
  keywords: [
    // Identity
    'Nandawula Regine Kabali-Kagwa',
    'Nanda Regine',
    'CreativelyNanda',
    'Mirembe Muse',
    // Core roles — what hiring managers search
    'AI engineer',
    'AI engineer for hire',
    'AI engineer remote',
    'LLM engineer',
    'LLM developer',
    'AI application developer',
    'machine learning engineer',
    'full-stack AI developer',
    'full-stack TypeScript developer',
    'senior TypeScript developer',
    'Next.js developer',
    'React developer',
    // Tech-specific searches
    'Claude API developer',
    'Anthropic Claude developer',
    'Claude API engineer',
    'multi-agent AI systems',
    'multi-agent developer',
    'prompt engineer',
    'RAG developer',
    'LangChain developer',
    'Supabase developer',
    'Supabase architect',
    'Next.js 14 developer',
    'production TypeScript',
    // Geographic + remote
    'AI engineer South Africa',
    'African AI engineer',
    'developer South Africa',
    'South African developer',
    'remote developer Africa',
    'remote AI engineer',
    'East London South Africa developer',
    'African developer for hire',
    // Consulting / freelance searches
    'hire AI engineer',
    'AI consultant Africa',
    'AI consulting South Africa',
    'fractional AI officer',
    'AI strategy consultant',
    'WhatsApp AI automation',
    'business automation South Africa',
    'PayFast developer South Africa',
    // Portfolio / hiring intent
    'AI engineer portfolio',
    'developer portfolio Africa',
    'TypeScript portfolio',
    'full-stack portfolio',
    // Products & projects
    'StokvelOS',
    'VarsityOS',
    'AdminOS',
    'K53 Drill Master',
    'WatchSankofa',
    // Background
    'women in tech South Africa',
    'black woman developer',
    'African tech entrepreneur',
    'Nelson Mandela University graduate',
    'published poet South Africa',
    'Inside Her Roses',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Creatively Nanda',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://creativelynanda.co.za',
    siteName: 'Creatively Nanda',
    title: 'Nandawula Regine Kabali-Kagwa | AI Engineer & Full-Stack Developer',
    description:
      'AI Engineer and full-stack TypeScript developer. Builds production Claude API agents, multi-agent systems, and SaaS platforms for global and African clients. 7 live AI products. Available for remote engagements.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nandawula Regine Kabali-Kagwa — Creative Technologist & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nandawula Regine | AI Engineer & Full-Stack Developer — South Africa',
    description:
      'AI Engineer building production Claude agents, multi-agent systems, and SaaS platforms. 7 live AI products. Remote-available. South Africa.',
    images: ['/og-image.png'],
    creator: '@creativelynanda',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://creativelynanda.co.za',
  },
  verification: {
    google: '7rJEg1oSdQCjC8KlEE28mTq7fuGPOW08kSOKvHJKBB8',
  },
};

export const viewport = {
  themeColor: '#C41E3A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${bebasNeue.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <head>
        <JsonLd data={generateWebSiteJsonLd()} />
        <JsonLd data={generatePersonJsonLd()} />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5ZMQ7H4M');`}
        </Script>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-body">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5ZMQ7H4M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <I18nProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <NandaAssistant />
          </CartProvider>
        </I18nProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D6T4LD5XDE"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D6T4LD5XDE');
          `}
        </Script>
        <Analytics />
              <script src="/mm-feedback.js" data-app="creativelynanda" defer></script>
      </body>
    </html>
  );
}
