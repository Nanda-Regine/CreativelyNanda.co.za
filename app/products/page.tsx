'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Sparkles,
  GraduationCap,
  Briefcase,
  Palette,
  Heart,
  ArrowRight,
  ShoppingBag,
  Star,
  Zap,
  Shield,
  Mail,
} from 'lucide-react';
import { ProductCoverCard, FloatingShapes } from '@/components/marketplace';
import type { ProductCoverData } from '@/components/marketplace';
import { Button, Badge } from '@/components/ui';
import { shopCategoryThemes, getShopTheme } from '@/lib/shop-themes';
import { ALL_PRODUCTS as PRODUCTS } from '@/lib/products-data';

const CATEGORIES = [
  { name: 'All', icon: Sparkles, color: 'from-cherry to-pink-500' },
  { name: 'Student', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
  { name: 'Business', icon: Briefcase, color: 'from-emerald-500 to-teal-500' },
  { name: 'Creative', icon: Palette, color: 'from-pink-500 to-purple-500' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = PRODUCTS.find((p) => p.badge === 'BESTSELLER') || PRODUCTS[0];
  const studentProducts = PRODUCTS.filter((p) => p.category === 'Student');
  const businessProducts = PRODUCTS.filter((p) => p.category === 'Business');
  const creativeProducts = PRODUCTS.filter((p) => p.category === 'Creative');

  return (
    <div className="min-h-screen bg-navy">
      {/* Magazine Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-cherry/30" />

        {/* Floating orbs with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cherry/20 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl"
          style={{
            x: -mousePosition.x * 1.5,
            y: -mousePosition.y * 1.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          {/* Masthead */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-beige/30" />
            <span className="text-beige/60 text-sm tracking-[0.3em] uppercase font-medium">
              The Nanda Marketplace
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-beige/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-beige mb-6">
              Premium{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cherry via-pink-400 to-cherry bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                Digital
              </motion.span>
              <br />
              Products
            </h1>
            <p className="text-xl md:text-2xl text-beige/70 max-w-2xl mx-auto leading-relaxed mb-12">
              Handcrafted templates, tools, and resources designed to help you thrive
            </p>
          </motion.div>

          {/* Category badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.name
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-cherry/25`
                      : 'bg-white/10 backdrop-blur-sm text-beige/80 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/50" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-beige/20 rounded-full text-beige placeholder:text-beige/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-24">
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
              className="fill-parchment"
            />
          </svg>
        </div>
      </section>

      {/* Search Results or Category View */}
      {searchQuery ? (
        <section className="py-16 px-6 bg-parchment">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-navy">
                Search Results
                <span className="ml-2 text-navy/40">({filteredProducts.length})</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-cherry hover:underline"
              >
                Clear search
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-navy/20 mx-auto mb-4" />
                <p className="text-navy/60 text-lg">No products found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, i) => (
                  <ProductCoverCard key={product.slug} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : selectedCategory !== 'All' ? (
        <section className="py-16 px-6 bg-parchment">
          <div className="max-w-7xl mx-auto">
            <CategorySection
              category={selectedCategory}
              products={filteredProducts}
            />
          </div>
        </section>
      ) : (
        <>
          {/* Featured Product Spotlight */}
          <section className="py-16 px-6 bg-parchment">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-cherry/10 text-cherry rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Editor's Choice
                </span>
                <h2 className="text-3xl font-display font-bold text-navy">
                  Featured This Season
                </h2>
              </motion.div>

              <ProductCoverCard product={featuredProduct} variant="featured" />
            </div>
          </section>

          {/* Student Products */}
          <section className="py-16 px-6 bg-gradient-to-b from-parchment via-amber-50/30 to-parchment">
            <div className="max-w-7xl mx-auto">
              <CategorySection category="Student" products={studentProducts} />
            </div>
          </section>

          {/* Business Products */}
          <section className="py-16 px-6 bg-gradient-to-b from-parchment via-emerald-50/30 to-parchment">
            <div className="max-w-7xl mx-auto">
              <CategorySection category="Business" products={businessProducts} />
            </div>
          </section>

          {/* Creative Products */}
          <section className="py-16 px-6 bg-gradient-to-b from-parchment via-pink-50/30 to-parchment">
            <div className="max-w-7xl mx-auto">
              <CategorySection category="Creative" products={creativeProducts} />
            </div>
          </section>

          {/* Trust Badges */}
          <section className="py-16 px-6 bg-cream">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: ShoppingBag, label: 'Happy Customers', value: '500+' },
                  { icon: Zap, label: 'Instant Delivery', value: '24/7' },
                  { icon: Shield, label: 'Money-Back', value: '30 Days' },
                  { icon: Star, label: 'Average Rating', value: '4.9/5' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-6 bg-parchment rounded-2xl shadow-sm"
                  >
                    <stat.icon className="w-8 h-8 text-cherry mx-auto mb-3" />
                    <p className="text-2xl font-display font-bold text-navy">{stat.value}</p>
                    <p className="text-sm text-navy/60 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="relative py-24 px-6 bg-navy overflow-hidden">
            <FloatingShapes theme="business" />

            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cherry to-pink-500 mb-8"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-display font-bold text-beige mb-6">
                  Get{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-pink-400">
                    Early Access
                  </span>
                </h2>
                <p className="text-lg text-beige/70 mb-10 max-w-xl mx-auto">
                  Join the waitlist for exclusive discounts and early access to new product launches.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-beige/20 text-beige placeholder:text-beige/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
                  />
                  <motion.button
                    className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// Category Section Component
function CategorySection({ category, products }: { category: string; products: ProductCoverData[] }) {
  const theme = getShopTheme(category);
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Student: GraduationCap,
    Business: Briefcase,
    Creative: Palette,
    Wellness: Heart,
  };
  const Icon = icons[category] || Sparkles;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-10"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-navy">{theme.name}</h2>
            <p className="text-sm text-navy/60">{theme.description}</p>
          </div>
        </div>
        <span className="text-sm text-navy/40">{products.length} products</span>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCoverCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
