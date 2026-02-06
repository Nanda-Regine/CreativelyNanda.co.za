'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  Shield,
  Zap,
  Download,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button, Badge, ProductCard } from '@/components/ui';
import { useCartStore } from '@/components/cart';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/components/ui/ProductCard';

// Sample product data - will be fetched from Supabase in production
const PRODUCTS_DB: Record<string, {
  product: Product;
  description: string;
  features: { title: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  testimonials: { author: string; role: string; content: string; rating: number }[];
}> = {
  'nsfas-tracker': {
    product: {
      slug: 'nsfas-tracker',
      name: 'NSFAS Tracker',
      tagline: 'Stay on top of your NSFAS application with deadline reminders and status tracking',
      price: 14900,
      originalPrice: 19900,
      thumbnail: '/assets/products/nsfas-tracker.jpg',
      category: 'Student',
      badge: 'BESTSELLER',
      status: 'live',
      rating: 4.9,
      reviewCount: 127,
    },
    description: `The NSFAS Tracker is the ultimate Notion template designed specifically for South African students navigating the NSFAS application process. Stop missing deadlines and stay organized throughout your funding journey.

Built from real experience and feedback from over 500 students, this template includes everything you need to successfully apply, track, and manage your NSFAS funding.`,
    features: [
      {
        title: 'Deadline Countdown',
        description: 'Never miss a deadline with automatic countdown timers for all important dates',
        icon: 'clock',
      },
      {
        title: 'Document Checklist',
        description: 'Complete checklist of all required documents with status tracking',
        icon: 'check',
      },
      {
        title: 'Status Tracker',
        description: 'Track your application status through each stage of the process',
        icon: 'zap',
      },
      {
        title: 'Appeal Templates',
        description: 'Pre-written templates for appeals and correspondence',
        icon: 'file',
      },
      {
        title: 'Pro Tips Database',
        description: 'Insider tips from successful applicants to avoid common mistakes',
        icon: 'lightbulb',
      },
      {
        title: 'Mobile Ready',
        description: 'Access your tracker on any device with the Notion mobile app',
        icon: 'phone',
      },
    ],
    faqs: [
      {
        question: 'Do I need a Notion account?',
        answer: 'Yes, you\'ll need a free Notion account to use this template. Notion is free for personal use.',
      },
      {
        question: 'How do I get the template after purchase?',
        answer: 'You\'ll receive an email with a link to duplicate the template directly into your Notion workspace.',
      },
      {
        question: 'Is this updated for the 2026 application cycle?',
        answer: 'Yes! This template is updated for the latest NSFAS requirements and deadlines.',
      },
      {
        question: 'Can I get a refund?',
        answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
      },
    ],
    testimonials: [
      {
        author: 'Thabo M.',
        role: 'UCT Student',
        content: 'This template saved my application! I would have missed the deadline without the reminders.',
        rating: 5,
      },
      {
        author: 'Nomvula K.',
        role: 'Wits Student',
        content: 'So organized and easy to use. Worth every cent.',
        rating: 5,
      },
    ],
  },
};

// Related products
const RELATED_PRODUCTS: Product[] = [
  {
    slug: 'varsity-survival-kit',
    name: 'Varsity Survival Kit',
    tagline: 'Everything you need to ace your first year at university',
    price: 24900,
    thumbnail: '/assets/products/varsity-kit.jpg',
    category: 'Student',
    status: 'live',
  },
  {
    slug: 'freelancer-hub',
    name: 'Freelancer Hub',
    tagline: 'Complete Notion workspace for freelancers',
    price: 34900,
    thumbnail: '/assets/products/freelancer-hub.jpg',
    category: 'Business',
    status: 'live',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem, getItem } = useCartStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Get product data
  const productData = PRODUCTS_DB[slug];

  if (!productData) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-navy mb-4">Product not found</h1>
          <Link href="/products">
            <Button variant="primary" className="rounded-full">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { product, description, features, faqs, testimonials } = productData;
  const isInCart = !!getItem(product.slug);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.slug,
      product_id: product.slug,
      slug: product.slug,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      thumbnail: product.thumbnail,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-cream shadow-lg"
          >
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="primary">{product.badge}</Badge>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <Badge variant="outline" className="w-fit mb-2">
              {product.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-3">
              {product.name}
            </h1>

            <p className="text-lg text-navy/70 mb-4">{product.tagline}</p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-navy/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-navy/60">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-cherry">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-navy/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="success">Save {discount}%</Badge>
                </>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              {product.status === 'coming-soon' ? (
                <Button variant="secondary" size="lg" fullWidth disabled className="rounded-full">
                  Coming Soon
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="rounded-full"
                  leftIcon={isInCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  onClick={handleAddToCart}
                  loading={isAdding}
                >
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-cream rounded-xl">
              <div className="flex flex-col items-center text-center">
                <Download className="w-6 h-6 text-cherry mb-2" />
                <span className="text-xs text-navy/70">Instant Access</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-cherry mb-2" />
                <span className="text-xs text-navy/70">30-Day Guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="w-6 h-6 text-cherry mb-2" />
                <span className="text-xs text-navy/70">Lifetime Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-navy mb-6">About This Product</h2>
          <div className="prose prose-navy max-w-none">
            {description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-navy/80 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-navy mb-8 text-center">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-cream rounded-xl"
              >
                <div className="w-10 h-10 bg-cherry/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-cherry" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-navy/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-12 px-4 bg-cream">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-navy mb-8 text-center">
              What Customers Say
            </h2>
            <div className="space-y-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 bg-parchment rounded-xl"
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-navy/80 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.author}</p>
                    <p className="text-sm text-navy/60">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-navy mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-cream rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-navy">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-navy/50" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy/50" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-navy/70">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-navy mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Buy Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-cream border-t border-navy/10 md:hidden z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-navy/60">{product.name}</p>
            <p className="text-lg font-bold text-cherry">{formatPrice(product.price)}</p>
          </div>
          <Button
            variant="primary"
            className="rounded-full"
            leftIcon={isInCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}
