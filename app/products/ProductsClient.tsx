'use client';

import { useState } from 'react';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  GraduationCap,
  Briefcase,
  Palette,
  Heart,
  Zap,
  Shield,
  Download,
  Globe,
} from 'lucide-react';
import { ProductCoverCard } from '@/components/marketplace';
import type { ProductCoverData } from '@/components/marketplace';
import { getShopTheme } from '@/lib/shop-themes';

const CATEGORIES = [
  { name: 'All', icon: Sparkles },
  { name: 'Creative', icon: Palette },
  { name: 'Student', icon: GraduationCap },
  { name: 'Business', icon: Briefcase },
];

interface ProductsClientProps {
  products: ProductCoverData[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const creativeProducts = products.filter((p) => p.category === 'Creative');
  const studentProducts = products.filter((p) => p.category === 'Student');
  const businessProducts = products.filter((p) => p.category === 'Business');

  return (
    <div className="min-h-screen bg-navy">

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy/95" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-cherry/60" />
            <span className="text-cherry text-sm tracking-[0.3em] uppercase font-semibold">
              Nanda Marketplace
            </span>
            <div className="h-px w-12 bg-cherry/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-beige mb-4 leading-tight"
          >
            Where Transformation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry via-pink-400 to-cherry">
              Has a Template
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-beige/60 text-lg max-w-xl mx-auto mb-10"
          >
            Notion systems built for African creatives, students, and entrepreneurs. Pre-populated, ready to use, designed for real life.
          </motion.p>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10 text-beige/50 text-sm"
          >
            {[
              { icon: Zap, text: 'Instant delivery' },
              { icon: Download, text: 'Quick-Start PDF included' },
              { icon: Globe, text: 'Notion template link emailed' },
              { icon: Shield, text: '30-day guarantee' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-cherry" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* Filter + Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          >
            {/* Category pills */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => { setSelectedCategory(cat.name); setSearchQuery(''); }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-cherry text-white shadow-lg'
                        : 'bg-white/10 text-beige/70 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beige/40" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-beige/20 text-beige text-sm placeholder:text-beige/35 focus:outline-none focus:border-cherry/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>

        {/* Wave into content */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-12">
            <path
              d="M0,40 C360,60 720,20 1080,40 C1260,50 1380,30 1440,40 L1440,60 L0,60 Z"
              fill="#faf7f2"
            />
          </svg>
        </div>
      </section>

      {/* Products — parchment texture */}
      <section
        className="py-16 px-6"
        style={{
          backgroundColor: '#faf7f2',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Search results */}
          {searchQuery ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-display font-bold text-navy">
                  Results for &ldquo;{searchQuery}&rdquo;
                  <span className="ml-2 text-navy/40 font-normal text-base">({filteredProducts.length})</span>
                </h2>
                <button onClick={() => setSearchQuery('')} className="text-sm text-cherry hover:underline">
                  Clear
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-navy/40">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No templates found matching &ldquo;{searchQuery}&rdquo;</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p, i) => (
                    <ProductCoverCard key={p.slug} product={p} index={i} />
                  ))}
                </div>
              )}
            </>
          ) : selectedCategory !== 'All' ? (
            <CategorySection category={selectedCategory} products={filteredProducts} />
          ) : (
            <div className="space-y-16">
              {creativeProducts.length > 0 && (
                <CategorySection category="Creative" products={creativeProducts} />
              )}
              {studentProducts.length > 0 && (
                <CategorySection category="Student" products={studentProducts} />
              )}
              {businessProducts.length > 0 && (
                <CategorySection category="Business" products={businessProducts} />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <TexturedSection texture={TEXTURES.marble} tone="navy" className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-beige/50 text-sm tracking-widest uppercase mb-3">Nanda Marketplace</p>
          <h2 className="text-3xl font-display font-bold text-beige mb-4">
            Productivity systems that serve communities
          </h2>
          <p className="text-beige/60 mb-6">
            Every template is built for a real problem affecting real people across Africa. Instant delivery. Lifetime access. 30-day guarantee.
          </p>
          <p className="text-cherry text-sm">
            Questions? <a href="mailto:hello@creativelynanda.co.za" className="underline">hello@creativelynanda.co.za</a>
          </p>
        </div>
      </TexturedSection>
    </div>
  );
}

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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow`}>
          <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-navy">{theme.name}</h2>
          <p className="text-xs text-navy/50">{theme.description}</p>
        </div>
        <span className="ml-auto text-xs text-navy/35">{products.length} template{products.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCoverCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
