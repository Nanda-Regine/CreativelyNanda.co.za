'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Star, TrendingUp } from 'lucide-react';
import { ProductCard, Button, Badge, Input } from '@/components/ui';
import type { Product } from '@/components/ui/ProductCard';

// Placeholder image for products without thumbnails
const PLACEHOLDER_IMAGE = '/assets/professional/nanda-consulting.jpg';

// Sample products data - will be fetched from Supabase in production
const PRODUCTS: Product[] = [
  {
    slug: 'nsfas-tracker',
    name: 'NSFAS Tracker',
    tagline: 'Stay on top of your NSFAS application with deadline reminders and status tracking',
    price: 149,
    originalPrice: 199,
    thumbnail: PLACEHOLDER_IMAGE,
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
    thumbnail: PLACEHOLDER_IMAGE,
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
    thumbnail: PLACEHOLDER_IMAGE,
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
    thumbnail: PLACEHOLDER_IMAGE,
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
    thumbnail: PLACEHOLDER_IMAGE,
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
    thumbnail: PLACEHOLDER_IMAGE,
    category: 'Student',
    badge: 'NEW',
    status: 'live',
  },
  {
    slug: 'inside-her-roses-ebook',
    name: 'Inside Her Roses (eBook)',
    tagline: 'A poetry collection exploring love, loss, and self-discovery',
    price: 99,
    thumbnail: '/assets/poetry-book/book-cover-1.jpg',
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
    thumbnail: PLACEHOLDER_IMAGE,
    category: 'Creative',
    badge: 'NEW',
    status: 'live',
  },
];

const CATEGORIES = [
  { name: 'All', icon: Sparkles },
  { name: 'Student', icon: Star },
  { name: 'Business', icon: TrendingUp },
  { name: 'Creative', icon: Sparkles },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-cream to-beige">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-navy via-navy to-cherry/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cherry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-beige/10 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" size="lg" pill className="mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Digital Products
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-beige mb-6">
              The Nanda{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-beige">
                Marketplace
              </span>
            </h1>
            <p className="text-lg md:text-xl text-beige/80 max-w-2xl mx-auto leading-relaxed">
              Handcrafted templates, tools, and resources designed to help you thrive in business, studies, and creative pursuits.
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-16">
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
              className="fill-parchment"
            />
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-cherry/10 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'primary' : 'ghost'}
                    size="sm"
                    className={`rounded-full whitespace-nowrap ${
                      selectedCategory === category.name
                        ? 'shadow-lg shadow-cherry/25'
                        : 'hover:bg-navy/5'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                    leftIcon={<Icon className="w-4 h-4" />}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cherry/60" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-parchment border-2 border-navy/10 rounded-full text-sm focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-cream/50 rounded-3xl border-2 border-dashed border-navy/20"
            >
              <Filter className="w-16 h-16 text-cherry/30 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-semibold text-navy mb-2">No products found</h2>
              <p className="text-navy/60">Try adjusting your filters or search query</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ProductCard
                    product={product}
                    variant={index === 0 ? 'featured' : 'default'}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-beige/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Happy Customers', value: '500+' },
              { label: 'Templates Sold', value: '1,200+' },
              { label: 'Rating', value: '4.9/5' },
              { label: 'Categories', value: '3' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-cream rounded-2xl shadow-sm border border-cherry/10"
              >
                <p className="text-3xl font-display font-bold text-cherry">{stat.value}</p>
                <p className="text-sm text-navy/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-navy via-navy to-cherry/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-cherry/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-beige/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" size="lg" pill className="mb-6">
              Custom Solutions
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-beige mb-6">
              Need something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-beige">
                custom?
              </span>
            </h2>
            <p className="text-lg text-beige/80 mb-10 max-w-xl mx-auto">
              I offer consulting services for custom Notion setups, SaaS development, and business automation tailored to your needs.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              onClick={() => (window.location.href = '/contact')}
            >
              Let&apos;s Talk
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
