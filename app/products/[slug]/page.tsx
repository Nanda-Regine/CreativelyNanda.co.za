'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { ProductCoverCard } from '@/components/marketplace';
import { getShopPattern, FloatingShapes } from '@/components/marketplace';
import { useCartStore } from '@/components/cart';
import { formatPrice } from '@/lib/utils';
import { getShopTheme, getProductShape } from '@/lib/shop-themes';
import type { ProductCoverData } from '@/components/marketplace';

// Sample product data - will be fetched from Supabase in production
const PRODUCTS_DB: Record<string, {
  product: ProductCoverData;
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
const RELATED_PRODUCTS: ProductCoverData[] = [
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
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-beige mb-4">Product not found</h1>
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
  const theme = getShopTheme(product.category);
  const Pattern = getShopPattern(product.category);
  const shapePath = getProductShape(0);
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
      thumbnail: '',
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="min-h-screen bg-navy">
      {/* Magazine Hero */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgDark}`} />

        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${theme.bgMagazine} opacity-40`}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />

        {/* Pattern overlay */}
        <Pattern className={`${theme.textLight} opacity-20`} />

        {/* Floating orbs */}
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${theme.gradient} rounded-full opacity-20 blur-3xl`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Decorative shape at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-32"
          viewBox="0 0 120 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d={shapePath} fill="white" opacity="0.05" />
        </svg>

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 text-sm font-medium uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm text-white`}>
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-4 py-1.5 text-sm font-bold uppercase rounded-full bg-amber-500 text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {product.name}
              </h1>

              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/70">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-white/50 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-emerald-500 text-white">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {product.status === 'coming-soon' ? (
                  <Button variant="secondary" size="lg" disabled className="rounded-full px-10">
                    Coming Soon
                  </Button>
                ) : (
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all ${
                      isInCart
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-navy hover:bg-beige'
                    } shadow-xl`}
                  >
                    {isInCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right - Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:pl-12"
            >
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Download, label: 'Instant', sublabel: 'Access' },
                  { icon: Shield, label: '30-Day', sublabel: 'Guarantee' },
                  { icon: Zap, label: 'Lifetime', sublabel: 'Updates' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
                  >
                    <item.icon className="w-8 h-8 text-white mx-auto mb-3" />
                    <p className="text-white font-bold">{item.label}</p>
                    <p className="text-sm text-white/60">{item.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-20">
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
              className="fill-parchment"
            />
          </svg>
        </div>
      </section>

      {/* Description Section */}
      <section className={`py-20 px-6 bg-gradient-to-b from-parchment via-parchment to-cream`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${theme.gradient}`} />
              <h2 className="text-3xl font-display font-bold text-navy">About This Product</h2>
            </div>
            <div className="prose prose-lg prose-navy max-w-none">
              {description.split('\n\n').map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-navy/80 text-lg leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-6 bg-gradient-to-br ${theme.bg}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${theme.accent} text-white`}>
              <Sparkles className="w-4 h-4" />
              What's Included
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">
              Everything You Need
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-white rounded-2xl shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4`}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-navy/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-6 bg-navy relative overflow-hidden">
          <FloatingShapes theme={product.category.toLowerCase()} />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cherry/20 text-cherry-light rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Customer Love
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-beige">
                What People Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg text-beige/90 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-beige/60">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className={`py-20 px-6 bg-gradient-to-b from-cream to-parchment`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-parchment/50 transition-colors"
                >
                  <span className="font-bold text-navy pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-cherry flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy/50 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-navy/70 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 px-6 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-navy">You Might Also Like</h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-cherry hover:underline font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RELATED_PRODUCTS.map((relatedProduct, i) => (
              <motion.div
                key={relatedProduct.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCoverCard product={relatedProduct} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Buy Bar (Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-navy border-t border-white/10 md:hidden z-40"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-beige/70">{product.name}</p>
            <p className="text-xl font-bold text-white">{formatPrice(product.price)}</p>
          </div>
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
              isInCart ? 'bg-emerald-500' : 'bg-cherry'
            } text-white`}
          >
            {isInCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {isInCart ? 'Added' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
