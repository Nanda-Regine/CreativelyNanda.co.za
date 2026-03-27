'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { ProductCoverData } from '@/components/marketplace';
import { formatPrice } from '@/lib/utils';

// ─── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Static data ────────────────────────────────────────────────────────────────
const BUNDLES = [
  {
    id: 'student-bundle',
    name: 'The Student Stack',
    forWho: 'For families with students at both matric and varsity.',
    includes: ['Varsity Academic Excellence Engine', 'High School Academic Excellence Engine'],
    originalPrice: 528,
    bundlePrice: 420,
    saving: 108,
    href: '/products/student-bundle',
  },
  {
    id: 'creator-bundle',
    name: 'The Creator Stack',
    forWho: 'For content creators building a writing or creator business.',
    includes: ["The Writer's Sanctuary", "The Creator's Studio"],
    originalPrice: 698,
    bundlePrice: 549,
    saving: 149,
    href: '/products/creator-bundle',
  },
];

const PRODUCT_META: Record<string, { badge?: string; audience: string; features: string[] }> = {
  'writers-sanctuary': {
    badge: 'BESTSELLER',
    audience: 'Built for 500K+ aspiring African writers',
    features: ['Daily writing tracker', 'Project pipeline & submissions', 'Character & world-building vault'],
  },
  'creators-studio': {
    badge: 'NEW',
    audience: 'Built for creators building a content business',
    features: ['Content calendar & batch planner', 'Brand kit & media kit builder', 'Revenue & collab tracker'],
  },
  'music-artist-career-command-center': {
    audience: 'Built for African music artists & indie musicians',
    features: ['Release planner & promo timeline', 'Royalty & streams tracker', 'Network & pitch manager'],
  },
  'varsity-academic-excellence': {
    audience: 'Built for 1M+ SA university students',
    features: ['Semester planner & GPA tracker', 'Assignment & exam vault', 'Study group & NSFAS manager'],
  },
  'high-school-academic-excellence': {
    audience: 'Built for matric students targeting distinctions',
    features: ['Subject tracker & daily study plan', 'Past papers & marks analyser', 'University application pipeline'],
  },
  'sme-command-center': {
    badge: 'POPULAR',
    audience: 'Built for 2M+ African entrepreneurs',
    features: ['CRM & client pipeline', 'Invoice, expense & cash-flow tracker', 'Social media & content planner'],
  },
};

const CROSS_SELLS = [
  {
    bought: 'Varsity Engine template',
    nextLevel: 'VarsityOS / Campus Compass',
    change: 'Nova AI companion, 24/7 support, crisis detection, budget AI — from R49/month',
    href: 'https://campus-compass-phi.vercel.app',
    cta: 'Try Campus Compass →',
  },
  {
    bought: 'SME Command Center template',
    nextLevel: 'AdminOS',
    change: '5 AI agents, WhatsApp-native inbox, automated debt recovery — from R4,500/month',
    href: 'https://adminos.co.za',
    cta: 'Try AdminOS →',
  },
  {
    bought: "Writer's Sanctuary or Creator's Studio",
    nextLevel: 'SankofaSessions + WatchSankofa',
    change: 'Publish your story. Stream your work. 85% revenue share.',
    href: 'https://watchsankofa.co.za',
    cta: 'Join WatchSankofa →',
  },
];

const TRUST = [
  {
    icon: '✓',
    title: 'Instant delivery',
    body: 'Your Notion link arrives immediately after purchase. No waiting.',
  },
  {
    icon: '♾',
    title: 'Lifetime access',
    body: 'Buy once. Access forever. Updates included automatically.',
  },
  {
    icon: '◈',
    title: '30-day guarantee',
    body: 'Not the right fit? Full refund within 30 days. No questions asked.',
  },
];

const REVIEWS = [
  {
    quote:
      'The SME Command Center gave me more clarity about my business in one week than two years of spreadsheets. Everything is in one place.',
    author: 'Thandi M.',
    role: 'Small Business Owner, Johannesburg',
  },
  {
    quote:
      'As a matric student, I was completely overwhelmed. The Academic Engine gave me a system. I passed.',
    author: 'Sipho K.',
    role: 'Matric Student, Cape Town',
  },
];

const CATEGORIES = ['All', 'Creative', 'Student', 'Business'];

// ─── Page component ─────────────────────────────────────────────────────────────
interface ProductsClientProps {
  products: ProductCoverData[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const productsRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] pt-32 pb-24 px-6 text-center">
        <FadeUp>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-6">
            Mirembe Muse Digital Products
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-bold italic text-white leading-[0.9] mb-6">
            Transformation
            <br />has a template.
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-sans text-lg text-white/70 max-w-[560px] mx-auto mb-8 leading-relaxed">
            Six Notion systems for African students, entrepreneurs, and creators. Instant
            delivery. Lifetime access. Designed for real life on this continent.
          </p>
          <p className="font-sans text-[12px] text-white/40 tracking-[0.08em] mb-10">
            500+ buyers across Africa · Instant Notion delivery · 30-day money-back guarantee
            · Lifetime access
          </p>
        </FadeUp>

        {/* Category filter tabs */}
        <FadeUp delay={0.3} className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); scrollToProducts(); }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                activeCategory === cat
                  ? 'bg-[#C9A84C] text-[#1A1A1A]'
                  : 'bg-transparent text-white/60 border border-white/20 hover:border-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeUp>

        <FadeUp delay={0.35}>
          <button
            onClick={scrollToProducts}
            className="text-white/40 text-sm animate-bounce"
            aria-label="Scroll to products"
          >
            ↓
          </button>
        </FadeUp>
      </section>

      {/* ── SECTION 2: BUNDLES ──────────────────────────────────────────────── */}
      {activeCategory === 'All' && (
        <section className="py-20 px-6 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto">
            <FadeUp className="text-center mb-12">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
                Best Value
              </p>
              <h2 className="font-display text-4xl font-bold text-[#1A1A1A]">
                More value. Same instant delivery.
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-6">
              {BUNDLES.map((b, i) => (
                <FadeUp key={b.id} delay={i * 0.1}>
                  <div className="bg-[#F2F0EB] border-2 border-[#C9A84C]/40 rounded-2xl p-8 hover:border-[#C9A84C] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-3xl font-bold text-[#1A1A1A]">
                        {b.name}
                      </h3>
                      <span className="bg-[#C9A84C] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-3">
                        SAVE R{b.saving}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] italic text-sm mb-5">{b.forWho}</p>
                    <ul className="space-y-2 mb-6">
                      {b.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[#1A1A1A] text-sm">
                          <span className="text-[#C9A84C]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-end gap-3 mb-6">
                      <span className="font-display text-4xl font-bold text-[#C4613A]">
                        R{b.bundlePrice}
                      </span>
                      <span className="text-[#9B9B9B] line-through text-lg mb-1">
                        R{b.originalPrice}
                      </span>
                    </div>
                    <Link
                      href={b.href}
                      className="block w-full text-center py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#C9A84C]/90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                    >
                      Get {b.name} — R{b.bundlePrice}
                    </Link>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: INDIVIDUAL PRODUCTS ─────────────────────────────────── */}
      <section ref={productsRef} className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-8">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
              All Templates
            </p>
            <h2 className="font-display text-4xl font-bold text-[#1A1A1A]">
              Six systems. Every season of your life.
            </h2>
          </FadeUp>

          {/* Light-mode filter tabs */}
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                  activeCategory === cat
                    ? 'bg-[#C9A84C] text-[#1A1A1A]'
                    : 'bg-transparent text-[#6B6B6B] border border-[#1A1A1A]/15 hover:border-[#C9A84C]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {filtered.map((product, i) => {
                const meta = PRODUCT_META[product.slug] ?? { audience: '', features: [] };
                const badgeLabel = (product.badge ?? meta.badge) as string | undefined;
                return (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    badge={badgeLabel}
                    audience={meta.audience}
                    features={meta.features}
                    index={i}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-[#6B6B6B] py-12">
              No templates in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── SECTION 4: CROSS-SELL ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F2F0EB]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
              Want the Full Experience?
            </p>
            <h2 className="font-display text-4xl font-bold italic text-[#1A1A1A] mb-4">
              The templates are where you start.
              <br />The apps are where you scale.
            </h2>
            <p className="text-[#6B6B6B] max-w-[560px] mx-auto text-sm leading-relaxed">
              Every Notion template has a SaaS equivalent — an AI-powered app that does the
              work automatically. Start with the template. Graduate to the app.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5">
            {CROSS_SELLS.map((c, i) => (
              <FadeUp key={c.nextLevel} delay={i * 0.1}>
                <div className="bg-white border border-[#C9A84C]/20 rounded-lg p-6 hover:border-[#C9A84C]/60 transition-colors h-full flex flex-col">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1">
                    You bought:
                  </p>
                  <p className="text-[#1A1A1A] text-sm mb-3">{c.bought}</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1">
                    Next level:
                  </p>
                  <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-3">
                    {c.nextLevel}
                  </h3>
                  <p className="text-[#6B6B6B] text-[13px] leading-relaxed flex-1 mb-4">
                    {c.change}
                  </p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#C9A84C] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
                  >
                    {c.cta}
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: TRUST ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {TRUST.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.1}>
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-8 text-center">
                  <div className="text-[#C9A84C] text-3xl font-display mb-4">{t.icon}</div>
                  <h3 className="font-sans font-semibold text-white mb-2">{t.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: REVIEWS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
              What Buyers Say
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            {REVIEWS.map((r, i) => (
              <FadeUp key={r.author} delay={i * 0.1}>
                <div
                  className="border-l-4 border-[#C9A84C] pl-6"
                  data-placeholder="true"
                >
                  <p className="font-display text-4xl text-[#C9A84C] leading-none mb-3">&ldquo;</p>
                  <p className="font-sans text-base text-[#1A1A1A] leading-[1.7] mb-4">
                    {r.quote}
                  </p>
                  <p className="text-[#6B6B6B] text-[13px]">
                    — {r.author}, {r.role}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2} className="text-center mt-8">
            <p className="text-[#9B9B9B] text-xs italic">
              Placeholder testimonials — replace with verified buyer reviews when available.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 7: BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C4613A] text-center">
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-tight mb-5">
              Your system is waiting.
            </h2>
            <p className="font-sans text-white/80 text-lg mb-10 leading-relaxed">
              Every template includes a Quick-Start PDF, a Notion link, and lifetime access
              from the moment you purchase. Pick yours.
            </p>
            <button
              onClick={scrollToProducts}
              className="px-10 py-4 bg-white text-[#1A1A1A] rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse All Templates
            </button>
            <p className="text-white/60 text-xs mt-6">
              Questions?{' '}
              <a
                href="mailto:hello@mirembemuse.co.za"
                className="underline hover:text-white transition-colors"
              >
                hello@mirembemuse.co.za
              </a>
            </p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

// ─── Product card ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  badge,
  audience,
  features,
  index,
}: {
  product: ProductCoverData;
  badge?: string;
  audience: string;
  features: string[];
  index: number;
}) {
  const badgeColor: Record<string, string> = {
    BESTSELLER: 'bg-[#C4613A] text-white',
    NEW: 'bg-[#C4613A] text-white',
    POPULAR: 'bg-[#C4613A] text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-white border border-[#1A1A1A]/10 rounded-xl overflow-hidden hover:border-[#C9A84C]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] h-full flex flex-col"
      >
        {/* Cover image */}
        <div className="relative aspect-[4/3] bg-[#F2F0EB]">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <span className="bg-[#C9A84C] text-[#1A1A1A] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            {badge && (
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeColor[badge] ?? 'bg-[#C4613A] text-white'}`}>
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-1 leading-snug">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-[#6B6B6B] text-[13px] italic mb-2 leading-snug">
              {product.tagline}
            </p>
          )}
          {audience && (
            <p className="text-[#C9A84C] text-[12px] font-medium mb-3">{audience}</p>
          )}

          {features.length > 0 && (
            <ul className="space-y-1 mb-4 flex-1">
              {features.map((f) => (
                <li key={f} className="text-[#6B6B6B] text-[13px] flex items-start gap-1.5">
                  <span className="text-[#C9A84C] shrink-0 mt-0.5">·</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1A1A1A]/5">
            <div>
              <div className="font-display text-2xl font-bold text-[#C4613A]">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="text-[11px] text-[#6B6B6B]">Instant delivery</span>
              </div>
            </div>
            <span className="text-sm text-[#6B6B6B] group-hover:text-[#C9A84C] transition-colors font-medium">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
