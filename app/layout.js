import './globals.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
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

export const metadata = {
  title: 'Nanda | Creative Technologist',
  description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
  manifest: '/manifest.json',
  themeColor: '#C41E3A',
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
    title: 'Nanda | Creative Technologist',
    description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Creatively Nanda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nanda | Creative Technologist',
    description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
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
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
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
      </body>
    </html>
  );
}
