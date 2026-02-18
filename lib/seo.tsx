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
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
    publisher: { '@type': 'Person', name: AUTHOR_NAME },
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
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/assets/professional/nanda-professional-2-transparent.png`,
    jobTitle: 'Creative Technologist',
    worksFor: { '@type': 'Organization', name: 'Mirembe Muse (Pty) Ltd' },
    alumniOf: { '@type': 'EducationalOrganization', name: 'Nelson Mandela University' },
    knowsAbout: ['Web Development', 'Next.js', 'React', 'Notion', 'Poetry', 'AI', 'Digital Products'],
    address: { '@type': 'PostalAddress', addressLocality: 'East London', addressCountry: 'ZA' },
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
    author: {
      '@type': 'Person',
      name: post.authorName || AUTHOR_NAME,
      url: SITE_URL,
    },
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
    author: { '@type': 'Person', name: AUTHOR_NAME },
    genre: 'Poetry',
    isPartOf: {
      '@type': 'Book',
      name: 'Inside Her Roses',
      author: { '@type': 'Person', name: AUTHOR_NAME },
    },
    inLanguage: 'en',
  };
}
