import './globals.css';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import NandaCompanion from '@/components/NandaCompanion';
import { I18nProvider } from '@/lib/i18n/context';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Nanda | Creative Technologist & AI Engineer',
  description:
    'Portfolio of Nandawula Regine Kabali-Kagwa — Creative Technologist, AI Engineer, Notion Systems Architect, and Published Poet based in East London, South Africa.',
  metadataBase: new URL('https://creativelynanda.co.za'),
  openGraph: {
    title: 'Nanda | Creative Technologist & AI Engineer',
    description:
      'Creative Technologist, AI Engineer, Notion Systems Architect, and Published Poet — East London, South Africa.',
    url: 'https://creativelynanda.co.za',
    siteName: 'CreativelyNanda',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nanda | Creative Technologist & AI Engineer',
    description:
      'Creative Technologist, AI Engineer, Notion Systems Architect, and Published Poet — East London, South Africa.',
    creator: '@creativelynanda',
    images: ['/opengraph-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID || '',
  },
  keywords: [
    'African AI engineer', 'creative technologist South Africa', 'Notion templates Africa',
    'Nandawula Kabali-Kagwa', 'Mirembe Muse', 'full-stack developer East London',
    'poetry South Africa', 'AI engineer portfolio', 'Next.js developer Africa',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://creativelynanda.co.za/#website',
      url: 'https://creativelynanda.co.za',
      name: 'CreativelyNanda',
      description:
        'Portfolio and digital marketplace of Nandawula Regine Kabali-Kagwa — Creative Technologist, AI Engineer, Notion Systems Architect, and Published Poet.',
      publisher: { '@id': 'https://creativelynanda.co.za/#person' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://creativelynanda.co.za/blog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://creativelynanda.co.za/#person',
      name: 'Nandawula Regine Kabali-Kagwa',
      url: 'https://creativelynanda.co.za',
      jobTitle: ['Creative Technologist', 'AI Engineer', 'Notion Systems Architect', 'Published Poet'],
      description:
        'African AI engineer and creative technologist building intelligent systems, Notion productivity templates, and poetry.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'East London',
        addressRegion: 'Eastern Cape',
        addressCountry: 'ZA',
      },
      sameAs: [
        'https://github.com/Nanda-Regine',
        'https://linkedin.com/in/nandawula-kabali-kagwa',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Next.js',
        'TypeScript',
        'Supabase',
        'Notion',
        'Python',
        'Poetry',
      ],
    },
    {
      '@type': 'Store',
      '@id': 'https://creativelynanda.co.za/#store',
      name: 'Mirembe Muse Digital Store',
      url: 'https://creativelynanda.co.za/products',
      description: 'Notion productivity templates for African students, creators, and entrepreneurs.',
      seller: { '@id': 'https://creativelynanda.co.za/#person' },
      currenciesAccepted: 'ZAR',
      paymentAccepted: 'PayFast, Credit Card, EFT',
      areaServed: { '@type': 'Country', name: 'South Africa' },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'ZAR',
        lowPrice: '249',
        highPrice: '499',
        offerCount: '6',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}

        {/* Crisp Live Chat */}
        {process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID && (
          <Script id="crisp-widget" strategy="afterInteractive">
            {`window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";(function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
          </Script>
        )}

        {/* Hotjar — heatmaps & session recordings */}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && (
          <Script id="hotjar" strategy="afterInteractive">
            {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
          </Script>
        )}

        {/* PostHog — product analytics */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <Script id="posthog" strategy="afterInteractive">
            {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'}',capture_pageview:true,capture_pageleave:true})`}
          </Script>
        )}

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <I18nProvider>
          <Navigation />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </I18nProvider>
        <NandaCompanion />
        <Analytics />
      </body>
    </html>
  );
}
