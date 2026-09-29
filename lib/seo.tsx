import type { Metadata } from 'next';

// ============================================================
// CONSTANTS
// ============================================================

export const SITE_URL = 'https://creativelynanda.co.za';
export const SITE_NAME = 'Creatively Nanda';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const TWITTER_HANDLE = '@creativelynanda';
export const AUTHOR_NAME = 'Nandawula Regine Kabali-Kagwa';

// ============================================================
// ONE NAME, ONE ENTITY (BUILD_JOURNEY §19.5 item 2)
// ============================================================
// The certificates say Kabali-Kagwa, the site leads with Regine. Without a
// shared @id, every author/publisher/about block on the site describes a
// separate, unconnected person. Every Person node points at PERSON_ID, and the
// full record lives once, in generatePersonJsonLd() in the root layout.

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const AUTHOR_ALTERNATE_NAMES = [
  'Nandawula Kabali-Kagwa',
  'Nandawula Regine',
  'Nanda Regine',
  'CreativelyNanda',
];

/**
 * Wikidata item for Nanda, e.g. 'Q123456789'. Empty until the item exists —
 * see project-docs/wikidata-entry.md for the statements to submit. Once set,
 * it joins sameAs and becomes the strongest single identity signal.
 */
export const WIKIDATA_ID = '';

export const SAME_AS = [
  'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/',
  'https://github.com/Nanda-Regine',
  'https://x.com/CreativelyNanda',
  'https://www.instagram.com/nanda.regine/',
  ...(WIKIDATA_ID ? [`https://www.wikidata.org/wiki/${WIKIDATA_ID}`] : []),
];

/**
 * Feed discovery <link>s. Metadata `alternates` is replaced, not merged, by any
 * page that sets its own — so createMetadata re-declares these on every page.
 */
export const FEED_ALTERNATES = {
  'application/rss+xml': [{ url: `${SITE_URL}/feed.xml`, title: 'Creatively Nanda · Essays & Field Notes' }],
  'application/feed+json': [{ url: `${SITE_URL}/feed.json`, title: 'Creatively Nanda · Essays & Field Notes' }],
};

/** Point at the canonical Person. Use for every author, publisher and about. */
export function personRef() {
  return { '@type': 'Person' as const, '@id': PERSON_ID, name: AUTHOR_NAME, url: SITE_URL };
}

// ============================================================
// METADATA HELPER
// ============================================================

interface PageSEO {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  noIndex = false,
  keywords,
}: PageSEO): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/'
    ? 'Nanda | Creative Technologist'
    : `${title} | Creatively Nanda`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
      types: FEED_ALTERNATES,
    },
    openGraph: {
      type: ogType,
      locale: 'en_ZA',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: TWITTER_HANDLE,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    }),
  };
}

// ============================================================
// JSON-LD COMPONENT
// ============================================================

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============================================================
// JSON-LD GENERATORS
// ============================================================

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
    publisher: personRef(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR_NAME,
    givenName: 'Nandawula',
    familyName: 'Kabali-Kagwa',
    alternateName: AUTHOR_ALTERNATE_NAMES,
    url: SITE_URL,
    image: `${SITE_URL}/assets/professional/nanda-professional-2-transparent.png`,
    jobTitle: 'AI Engineer & Creative Technologist',
    description:
      'Nandawula Regine Kabali-Kagwa is a Ugandan-South African poet and AI engineer based in KuGompo City (East London), Eastern Cape, author of the poetry collection Inside Her Roses and founder of Mirembe Muse (Pty) Ltd. She builds production AI systems (Claude agents, multi-agent architectures, WhatsApp automation and SaaS platforms) for African businesses, and writes, performs and publishes poetry rooted in Buganda and South African oral traditions.',
    worksFor: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd', url: 'https://mirembemuse.co.za' },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Nelson Mandela University',
      address: { '@type': 'PostalAddress', addressLocality: 'Gqeberha', addressCountry: 'ZA' },
    },
    knowsAbout: [
      // Writing
      'Poetry',
      'Spoken Word',
      'Performance Poetry',
      // AI / LLM
      'Artificial Intelligence',
      'Large Language Models',
      'Claude API',
      'Anthropic Claude',
      'OpenAI GPT-4o',
      'Multi-Agent AI Systems',
      'AI Agents',
      'Prompt Engineering',
      'Prompt Caching',
      'RAG Systems',
      'Retrieval-Augmented Generation',
      'Vector Embeddings',
      'AI Application Development',
      'LLM Engineering',
      // Frontend / Full-Stack
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Progressive Web Apps',
      // Backend / Data
      'Supabase',
      'PostgreSQL',
      'Row Level Security',
      'Multi-tenant Architecture',
      'REST APIs',
      'Webhook Integration',
      'Cron Jobs',
      'Redis',
      // Integrations
      'Meta WhatsApp Cloud API',
      'WhatsApp Business API',
      'PayFast',
      'Stripe',
      'Wise',
      'Mapbox GL JS',
      'Cloudinary',
      // Craft
      'Systems Architecture',
      'Production TypeScript',
      'Full-Stack Development',
      'SaaS Development',
      'Business Automation',
      'Notion Systems Architecture',
      // Context
      'Africa-first Technology',
      'South African Tech Ecosystem',
      'African Entrepreneurship',
      'Remote Engineering',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'KuGompo City',
      addressRegion: 'Eastern Cape',
      addressCountry: 'ZA',
    },
    sameAs: SAME_AS,
    nationality: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Country', name: 'Uganda' },
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Poet',
        occupationalCategory: '27-3043.05',
        skills: 'Poetry, spoken word performance, editing, publishing',
      },
      {
        '@type': 'Occupation',
        name: 'AI Engineer',
        occupationalCategory: '15-1299.09',
        skills: 'Claude API, multi-agent systems, LLM integration, TypeScript, Supabase',
      },
      {
        '@type': 'Occupation',
        name: 'Full-Stack Developer',
        occupationalCategory: '15-1257.00',
        skills: 'Next.js, React, TypeScript, PostgreSQL, Vercel',
      },
      {
        '@type': 'Occupation',
        name: 'AI Consultant',
        skills: 'AI strategy, business automation, WhatsApp AI, prompt engineering',
      },
    ],
    seeks: {
      '@type': 'Demand',
      name: 'Remote AI Engineering or Full-Stack Development engagements',
      description: 'Available for remote contract, fractional, or full-time AI engineering and full-stack development roles globally. Specialising in Claude API, multi-agent systems, and production TypeScript.',
    },
  };
}

interface BlogPostSEO {
  title: string;
  description: string;
  slug: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string | null;
  authorName?: string;
  readingTime?: number | null;
  tags?: string[];
}

export function generateBlogPostingJsonLd(post: BlogPostSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.category}/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    ...(post.coverImage && {
      image: post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`,
    }),
    author:
      !post.authorName || post.authorName === AUTHOR_NAME
        ? personRef()
        : { '@type': 'Person', name: post.authorName },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-192x192.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.category}/${post.slug}` },
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(', ') }),
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    inLanguage: 'en',
  };
}

interface ProductReviewSEO {
  authorName: string;
  rating: number;
  content: string;
  datePublished: string;
}

interface ProductSEO {
  name: string;
  description: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  category: string;
  status: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  image?: string;
  reviews?: ProductReviewSEO[];
  purchaseCount?: number;
}

export function generateProductJsonLd(product: ProductSEO) {
  const availability = product.status === 'live'
    ? 'https://schema.org/InStock'
    : 'https://schema.org/PreOrder';

  const offers: Record<string, unknown> = {
    '@type': 'Offer',
    url: `${SITE_URL}/products/${product.slug}`,
    priceCurrency: product.currency || 'ZAR',
    price: product.price.toFixed(2),
    availability,
    seller: { '@type': 'Organization', name: product.brand || 'CreativelyNanda' },
  };

  if (product.originalPrice && product.originalPrice > product.price) {
    offers.priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${SITE_URL}/products/${product.slug}`,
    image: product.image ? (product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`) : `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    brand: { '@type': 'Brand', name: product.brand || 'CreativelyNanda' },
    category: product.category,
    offers,
  };

  if (product.rating && product.reviewCount && product.reviewCount > 0) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      reviewCount: product.reviewCount,
    };
  }

  // Individual reviews for Google rich results
  if (product.reviews && product.reviews.length > 0) {
    jsonLd.review = product.reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.authorName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.content,
      datePublished: review.datePublished,
    }));
  }

  return jsonLd;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

interface PoemSEO {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
}

export function generatePoemJsonLd(poem: PoemSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: poem.title,
    description: poem.excerpt,
    url: `${SITE_URL}/poetry/collection/${poem.slug}`,
    author: personRef(),
    genre: 'Poetry',
    isPartOf: {
      '@type': 'Book',
      name: 'Inside Her Roses',
      author: personRef(),
    },
    inLanguage: 'en',
  };
}
