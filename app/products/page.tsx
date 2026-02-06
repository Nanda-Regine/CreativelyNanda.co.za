'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ProductCard, Button, Badge, Input } from '@/components/ui';
import type { Product } from '@/components/ui/ProductCard';

// Sample products data - will be fetched from Supabase in production
const PRODUCTS: Product[] = [
  {
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
  {
    slug: 'varsity-survival-kit',
    name: 'Varsity Survival Kit',
    tagline: 'Everything you need to ace your first year at university',
    price: 24900,
    thumbnail: '/assets/products/varsity-kit.jpg',
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
    price: 34900,
    thumbnail: '/assets/products/freelancer-hub.jpg',
    category: 'Business',
    status: 'live',
    rating: 4.7,
    reviewCount: 34,
  },
  {
    slug: 'sme-hub',
    name: 'SME Hub',
    tagline: 'All-in-one business management system for small and medium enterprises',
    price: 49900,
    thumbnail: '/assets/products/sme-hub.jpg',
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
    price: 39900,
    thumbnail: '/assets/products/salon-mgmt.jpg',
    category: 'Business',
    status: 'beta',
    rating: 4.6,
    reviewCount: 12,
  },
  {
    slug: 'matric-survival',
    name: 'Matric Survival',
    tagline: 'Study planner and exam prep system for matric students',
    price: 14900,
    thumbnail: '/assets/products/matric-survival.jpg',
    category: 'Student',
    badge: 'LAUNCHING',
    status: 'coming-soon',
  },
  {
    slug: 'inside-her-roses-ebook',
    name: 'Inside Her Roses (eBook)',
    tagline: 'A poetry collection exploring love, loss, and self-discovery',
    price: 9900,
    thumbnail: '/assets/poetry-book/book-cover-1.jpg',
    category: 'Creative',
    status: 'live',
    rating: 5.0,
    reviewCount: 47,
  },
  {
    slug: 'poetry-companion',
    name: 'Poetry Companion',
    tagline: 'Notion template for poets to organize, write, and publish their work',
    price: 19900,
    thumbnail: '/assets/products/poetry-companion.jpg',
    category: 'Creative',
    status: 'coming-soon',
  },
];

const CATEGORIES = ['All', 'Student', 'Business', 'Creative'];

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
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-navy">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              Digital Products
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-beige mb-4">
              The Nanda Marketplace
            </h1>
            <p className="text-lg md:text-xl text-beige/70 max-w-2xl mx-auto">
              Templates, tools, and resources designed to help you thrive in business, studies, and creative pursuits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-cream border-b border-navy/10 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  size="sm"
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-parchment border border-navy/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cherry/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-navy/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-navy mb-2">No products found</h2>
              <p className="text-navy/60">Try adjusting your filters or search query</p>
            </div>
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
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

      {/* CTA Section */}
      <section className="py-16 px-4 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-beige mb-4">
            Need something custom?
          </h2>
          <p className="text-beige/70 mb-8">
            I offer consulting services for custom Notion setups, SaaS development, and business automation.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full"
            onClick={() => (window.location.href = '/contact')}
          >
            Let&apos;s Talk
          </Button>
        </div>
      </section>
    </div>
  );
}
