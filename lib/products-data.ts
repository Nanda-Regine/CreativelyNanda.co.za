import type { ProductCoverData } from '@/components/marketplace';

export interface ProductDetail {
  product: ProductCoverData;
  description: string;
  features: { title: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  testimonials: { author: string; role: string; content: string; rating: number }[];
}

// Full product data for detail pages - will be fetched from Supabase in production
export const PRODUCTS_DB: Record<string, ProductDetail> = {
  'nsfas-tracker': {
    product: {
      slug: 'nsfas-tracker',
      name: 'NSFAS Tracker',
      tagline: 'Stay on top of your NSFAS application with deadline reminders and status tracking',
      price: 149,
      originalPrice: 199,
      category: 'Student',
      badge: 'BESTSELLER',
      status: 'live',
      rating: 4.9,
      reviewCount: 127,
    },
    description: `The NSFAS Tracker is the ultimate Notion template designed specifically for South African students navigating the NSFAS application process. Stop missing deadlines and stay organized throughout your funding journey.

Built from real experience and feedback from over 500 students, this template includes everything you need to successfully apply, track, and manage your NSFAS funding.`,
    features: [
      { title: 'Deadline Countdown', description: 'Never miss a deadline with automatic countdown timers for all important dates', icon: 'clock' },
      { title: 'Document Checklist', description: 'Complete checklist of all required documents with status tracking', icon: 'check' },
      { title: 'Status Tracker', description: 'Track your application status through each stage of the process', icon: 'zap' },
      { title: 'Appeal Templates', description: 'Pre-written templates for appeals and correspondence', icon: 'file' },
      { title: 'Pro Tips Database', description: 'Insider tips from successful applicants to avoid common mistakes', icon: 'lightbulb' },
      { title: 'Mobile Ready', description: 'Access your tracker on any device with the Notion mobile app', icon: 'phone' },
    ],
    faqs: [
      { question: 'Do I need a Notion account?', answer: 'Yes, you\'ll need a free Notion account to use this template. Notion is free for personal use.' },
      { question: 'How do I get the template after purchase?', answer: 'You\'ll receive an email with a link to duplicate the template directly into your Notion workspace.' },
      { question: 'Is this updated for the 2026 application cycle?', answer: 'Yes! This template is updated for the latest NSFAS requirements and deadlines.' },
      { question: 'Can I get a refund?', answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.' },
    ],
    testimonials: [
      { author: 'Thabo M.', role: 'UCT Student', content: 'This template saved my application! I would have missed the deadline without the reminders.', rating: 5 },
      { author: 'Nomvula K.', role: 'Wits Student', content: 'So organized and easy to use. Worth every cent.', rating: 5 },
    ],
  },
};

// All products listing
export const ALL_PRODUCTS: ProductCoverData[] = [
  {
    slug: 'nsfas-tracker',
    name: 'NSFAS Tracker',
    tagline: 'Stay on top of your NSFAS application with deadline reminders and status tracking',
    price: 149,
    originalPrice: 199,
    category: 'Student',
    badge: 'BESTSELLER',
    status: 'live',
    rating: 4.9,
    reviewCount: 127,
  },
  {
    slug: 'varsity-survival-kit',
    name: 'Varsity Survival Kit',
    tagline: 'Everything you need to ace your first year at university',
    price: 249,
    category: 'Student',
    badge: 'NEW',
    status: 'live',
    rating: 4.8,
    reviewCount: 56,
  },
  {
    slug: 'freelancer-hub',
    name: 'Freelancer Hub',
    tagline: 'Complete Notion workspace for freelancers to manage clients, projects, and invoices',
    price: 349,
    category: 'Business',
    status: 'live',
    rating: 4.7,
    reviewCount: 34,
  },
  {
    slug: 'sme-hub',
    name: 'SME Hub',
    tagline: 'All-in-one business management system for small and medium enterprises',
    price: 499,
    category: 'Business',
    badge: 'POPULAR',
    status: 'live',
    rating: 4.9,
    reviewCount: 89,
  },
  {
    slug: 'salon-management',
    name: 'Salon Management',
    tagline: 'Streamline your salon operations with booking, inventory, and client management',
    price: 399,
    category: 'Business',
    status: 'live',
    rating: 4.6,
    reviewCount: 12,
  },
  {
    slug: 'matric-survival',
    name: 'Matric Survival',
    tagline: 'Study planner and exam prep system for matric students',
    price: 149,
    category: 'Student',
    badge: 'NEW',
    status: 'live',
  },
  {
    slug: 'inside-her-roses-ebook',
    name: 'Inside Her Roses',
    tagline: 'A poetry collection exploring love, loss, and self-discovery',
    price: 99,
    category: 'Creative',
    badge: 'BESTSELLER',
    status: 'live',
    rating: 5.0,
    reviewCount: 47,
  },
  {
    slug: 'poetry-companion',
    name: 'Poetry Companion',
    tagline: 'Notion template for poets to organize, write, and publish their work',
    price: 199,
    category: 'Creative',
    badge: 'NEW',
    status: 'live',
  },
];

// Related products for detail pages
export const RELATED_PRODUCTS: ProductCoverData[] = [
  {
    slug: 'varsity-survival-kit',
    name: 'Varsity Survival Kit',
    tagline: 'Everything you need to ace your first year at university',
    price: 249,
    category: 'Student',
    status: 'live',
    rating: 4.8,
    reviewCount: 56,
  },
  {
    slug: 'freelancer-hub',
    name: 'Freelancer Hub',
    tagline: 'Complete Notion workspace for freelancers',
    price: 349,
    category: 'Business',
    status: 'live',
    rating: 4.7,
    reviewCount: 34,
  },
  {
    slug: 'matric-survival',
    name: 'Matric Survival',
    tagline: 'Study planner and exam prep system',
    price: 149,
    category: 'Student',
    badge: 'NEW',
    status: 'live',
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  // Check detailed products first
  if (PRODUCTS_DB[slug]) return PRODUCTS_DB[slug];

  // Fallback: build a minimal ProductDetail from ALL_PRODUCTS
  const listing = ALL_PRODUCTS.find(p => p.slug === slug);
  if (listing) {
    return {
      product: listing,
      description: listing.tagline,
      features: [],
      faqs: [],
      testimonials: [],
    };
  }

  return undefined;
}

export function getAllProducts(): ProductCoverData[] {
  return ALL_PRODUCTS;
}
