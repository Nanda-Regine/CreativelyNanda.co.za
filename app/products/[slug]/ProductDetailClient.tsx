'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/components/cart';
import { formatPrice } from '@/lib/utils';
import type { ProductCoverData } from '@/components/marketplace';

// ─── Fade-up helper ─────────────────────────────────────────────────────────────
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

// ─── Static per-product data ─────────────────────────────────────────────────────
const PRODUCT_META: Record<
  string,
  {
    category: string;
    audience: string;
    personas: { headline: string; body: string }[];
    related: string[];
  }
> = {
  'writers-sanctuary': {
    category: 'Creative',
    audience: 'Built for 500K+ aspiring African writers',
    personas: [
      {
        headline: "You're writing your first novel",
        body: 'And you have 200 unfinished documents scattered across Google Drive, Notes, and notebooks.',
      },
      {
        headline: "You're a blogger losing ideas",
        body: 'You have the ideas, but they vanish before they ever become a published post.',
      },
      {
        headline: "You're a poet ready to submit",
        body: 'You want to actually submit to journals and publications but have no system to track what, when, and where.',
      },
    ],
    related: ['creators-studio', 'music-artist-career-command-center'],
  },
  'creators-studio': {
    category: 'Creative',
    audience: 'Built for creators building a content business',
    personas: [
      {
        headline: "You're posting inconsistently",
        body: 'Great ideas when inspiration strikes. Radio silence when it doesn\'t. You need a system, not more motivation.',
      },
      {
        headline: "You're juggling brand deals",
        body: 'Collaborations are coming in but you\'re tracking them in your head and a crumpled notebook.',
      },
      {
        headline: "You want to monetise your content",
        body: 'You know there\'s money in what you create — you just need a business operating system to make it real.',
      },
    ],
    related: ['writers-sanctuary', 'music-artist-career-command-center'],
  },
  'music-artist-career-command-center': {
    category: 'Creative',
    audience: 'Built for African music artists & indie musicians',
    personas: [
      {
        headline: "You're releasing music without a plan",
        body: 'Drop day comes and nothing is ready — no promo, no pitch deck, no radio submission strategy.',
      },
      {
        headline: "You're losing royalties you're owed",
        body: 'Streams are happening but you\'re not tracking where the money is coming from or going to.',
      },
      {
        headline: "You want industry connections",
        body: 'You know your network is your net worth — but you have no system for following up or staying top of mind.',
      },
    ],
    related: ['creators-studio', 'writers-sanctuary'],
  },
  'varsity-academic-excellence': {
    category: 'Student',
    audience: 'Built for 1M+ SA university students',
    personas: [
      {
        headline: "You're overwhelmed by first year",
        body: 'Six modules, a part-time job, and no system. You\'re surviving, not studying.',
      },
      {
        headline: "You're aiming for academic merit",
        body: 'You know you\'re capable of distinctions but your current study method isn\'t matching your goals.',
      },
      {
        headline: "You're managing NSFAS or bursaries",
        body: 'Financial aid has requirements — minimum credits, academic standing — and you need to stay on top of them.',
      },
    ],
    related: ['high-school-academic-excellence', 'writers-sanctuary'],
  },
  'high-school-academic-excellence': {
    category: 'Student',
    audience: 'Built for matric students targeting distinctions',
    personas: [
      {
        headline: 'You want 7 distinctions in matric',
        body: 'You have the work ethic. You just need the system to make sure nothing falls through the cracks.',
      },
      {
        headline: "You're stressed about university applications",
        body: 'NSFAS, APS scores, closing dates — it\'s a lot. This keeps it all in one place.',
      },
      {
        headline: "You're balancing sport, life, and school",
        body: 'High performance in all three areas requires a schedule that actually works for your life.',
      },
    ],
    related: ['varsity-academic-excellence'],
  },
  'sme-command-center': {
    category: 'Business',
    audience: 'Built for 2M+ African entrepreneurs',
    personas: [
      {
        headline: "You're running a business from your phone",
        body: 'WhatsApp for clients. Voice notes for reminders. No CRM, no invoicing system, no visibility.',
      },
      {
        headline: "You're spending weekends on admin",
        body: 'Your business needs your attention — not your Sunday afternoons catching up on paperwork.',
      },
      {
        headline: "You've outgrown WhatsApp as a CRM",
        body: 'You know Salesforce exists but R4,000/month isn\'t happening. This is your bridge.',
      },
    ],
    related: ['creators-studio', 'writers-sanctuary'],
  },
};

const HOW_IT_WORKS = [
  { step: '01', title: 'Purchase securely', body: 'via PayFast (ZAR) or card' },
  { step: '02', title: 'Instant delivery', body: 'Notion link + Quick-Start PDF via email immediately' },
  { step: '03', title: 'Duplicate the template', body: 'into your Notion workspace — one click' },
  { step: '04', title: 'Set up in 30 min', body: 'Follow the Quick-Start PDF and you\'re live' },
];

// ─── Props ──────────────────────────────────────────────────────────────────────
interface ProductDetailClientProps {
  slug: string;
  product: ProductCoverData;
  description: string;
  features: { title: string; description?: string; icon?: string }[];
  faqs: { question: string; answer: string }[];
  relatedProducts: ProductCoverData[];
  images?: string[];
}

export default function ProductDetailClient({
  slug,
  product,
  description,
  features,
  faqs,
  relatedProducts,
  images = [],
}: ProductDetailClientProps) {
  const { addItem, getItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const isInCart = !!getItem(product.slug);
  const meta = PRODUCT_META[slug] ?? {
    category: product.category,
    audience: '',
    personas: [],
    related: [],
  };

  // IntersectionObserver — show mobile bar when main CTA scrolls out of view
  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.slug,
      product_id: product.slug,
      slug: product.slug,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      thumbnail: product.thumbnail || (images.length > 0 ? images[0] : ''),
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  const coverImage = images[0] || product.thumbnail;
  const previewImages = images.slice(1, 4);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ── ABOVE THE FOLD ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C9A84C] text-sm transition-colors mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
          >
            ← Back to all templates
          </Link>

          <div className="grid lg:grid-cols-11 gap-12 items-start">
            {/* LEFT — Image (55%) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-[#F2F0EB] rounded-xl overflow-hidden border border-[#1A1A1A]/10">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl text-[#C9A84C]/20">◈</span>
                  </div>
                )}
              </div>

              {/* Thumbnail previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {previewImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] bg-[#F2F0EB] rounded-lg overflow-hidden border border-[#1A1A1A]/10"
                    >
                      <Image src={img} alt={`${product.name} preview ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Buy block (45%) — sticky on desktop */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              {/* Category badge */}
              <span className="inline-block bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full mb-4">
                {meta.category || product.category}
              </span>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-3">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="font-sans text-base italic text-[#6B6B6B] mb-3 leading-relaxed">
                  {product.tagline}
                </p>
              )}

              {meta.audience && (
                <p className="font-sans text-[13px] text-[#C9A84C] font-medium mb-4">
                  {meta.audience}
                </p>
              )}

              {/* Stars */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#C9A84C] text-base">★</span>
                  ))}
                </div>
                <span className="text-[#9B9B9B] text-[12px]">(Reviews coming soon)</span>
              </div>

              {/* Price */}
              <div className="mb-5">
                <span className="font-display text-5xl font-bold text-[#C4613A]">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Delivery badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: '⚡', label: 'Instant delivery' },
                  { icon: '♾', label: 'Lifetime access' },
                  { icon: '✓', label: '30-day guarantee' },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="flex items-center gap-1.5 text-[12px] text-[#6B6B6B] bg-[#F2F0EB] px-3 py-1.5 rounded-full"
                  >
                    <span className="text-[#C9A84C]">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Primary CTA */}
              <button
                ref={ctaRef}
                onClick={handleAddToCart}
                disabled={isAdding || product.status === 'coming-soon'}
                className={`w-full py-[14px] rounded-lg font-semibold text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                  isInCart
                    ? 'bg-green-600 text-white'
                    : 'bg-[#C9A84C] text-[#1A1A1A] hover:bg-[#C9A84C]/90 hover:scale-[1.01]'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isInCart
                  ? '✓ Added to cart'
                  : isAdding
                  ? 'Adding…'
                  : product.status === 'coming-soon'
                  ? 'Coming Soon'
                  : `Get ${product.name} — ${formatPrice(product.price)}`}
              </button>

              <p className="text-[12px] text-[#9B9B9B] text-center mt-2">
                Instant Notion link · Quick-Start PDF included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ───────────────────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="py-20 px-6 bg-[#F2F0EB]">
          <div className="max-w-5xl mx-auto">
            <FadeUp className="mb-10">
              <h2 className="font-display text-4xl font-bold text-[#1A1A1A]">What&apos;s inside</h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.07}>
                  <div className="bg-[#FAFAF8] border border-[#1A1A1A]/10 rounded-xl p-6 hover:border-[#C9A84C]/40 transition-colors h-full">
                    {f.icon && <div className="text-3xl mb-3">{f.icon}</div>}
                    <h3 className="font-sans font-semibold text-[#1A1A1A] text-[14px] mb-2">
                      {f.title}
                    </h3>
                    {f.description && (
                      <p className="text-[#6B6B6B] text-[13px] leading-relaxed">{f.description}</p>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Description */}
            {description && (
              <FadeUp delay={0.2} className="mt-10 max-w-2xl">
                <div className="space-y-4 text-[#6B6B6B] leading-[1.8]">
                  {description.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeUp>
            )}
          </div>
        </section>
      )}

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────────── */}
      {meta.personas.length > 0 && (
        <section className="py-20 px-6 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto">
            <FadeUp className="mb-10">
              <h2 className="font-display text-4xl font-bold italic text-[#1A1A1A]">
                Built for you if…
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-5">
              {meta.personas.map((p, i) => (
                <FadeUp key={p.headline} delay={i * 0.1}>
                  <div className="border border-[#1A1A1A]/10 rounded-xl p-6 bg-[#F2F0EB] hover:border-[#C9A84C]/30 transition-colors h-full">
                    <h3 className="font-sans font-semibold text-[#1A1A1A] text-[14px] mb-2">
                      {p.headline}
                    </h3>
                    <p className="text-[#6B6B6B] text-[13px] leading-relaxed">{p.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F2F0EB]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12">
            <h2 className="font-display text-4xl font-bold text-[#1A1A1A]">How it works</h2>
          </FadeUp>

          {/* Desktop horizontal steps with dashed connector */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            {/* Dashed gold line connector */}
            <div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 8px, transparent 8px, transparent 18px)',
              }}
            />
            {HOW_IT_WORKS.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1} className="text-center px-4 relative">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="font-display text-lg font-bold text-[#C9A84C]">{s.step}</span>
                </div>
                <h3 className="font-sans font-semibold text-[#1A1A1A] text-[14px] mb-1">
                  {s.title}
                </h3>
                <p className="text-[#6B6B6B] text-[13px] leading-relaxed">{s.body}</p>
              </FadeUp>
            ))}
          </div>

          {/* Mobile vertical steps */}
          <div className="md:hidden space-y-6">
            {HOW_IT_WORKS.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border-2 border-[#C9A84C] flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-[#C9A84C]">{s.step}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-sans font-semibold text-[#1A1A1A] text-[14px] mb-1">
                      {s.title}
                    </h3>
                    <p className="text-[#6B6B6B] text-[13px] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-20 px-6 bg-[#FAFAF8]">
          <div className="max-w-3xl mx-auto">
            <FadeUp className="mb-10">
              <h2 className="font-display text-4xl font-bold text-[#1A1A1A]">
                Frequently asked
              </h2>
            </FadeUp>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <div className="border border-[#1A1A1A]/10 rounded-xl overflow-hidden bg-[#F2F0EB]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#E8E2D8]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                    >
                      <span className="font-sans font-semibold text-[#1A1A1A] pr-4 text-[14px]">
                        {faq.question}
                      </span>
                      <span className="text-[#C9A84C] shrink-0 text-lg">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-[#6B6B6B] text-[14px] leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CROSS-SELL / RELATED ─────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-6 bg-[#F2F0EB]">
          <div className="max-w-5xl mx-auto">
            <FadeUp className="mb-10">
              <h2 className="font-display text-4xl font-bold italic text-[#1A1A1A]">
                You might also want
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-5">
              {relatedProducts.slice(0, 2).map((rp, i) => (
                <FadeUp key={rp.slug} delay={i * 0.1}>
                  <Link
                    href={`/products/${rp.slug}`}
                    className="group flex gap-4 bg-white border border-[#1A1A1A]/10 rounded-xl p-5 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    <div className="relative w-20 h-20 bg-[#F2F0EB] rounded-lg overflow-hidden shrink-0">
                      {rp.thumbnail && (
                        <Image src={rp.thumbnail} alt={rp.name} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1 group-hover:text-[#C4613A] transition-colors">
                        {rp.name}
                      </h3>
                      {rp.tagline && (
                        <p className="text-[#6B6B6B] text-[13px] italic mb-2 line-clamp-1">
                          {rp.tagline}
                        </p>
                      )}
                      <span className="font-display text-base font-bold text-[#C4613A]">
                        {formatPrice(rp.price)}
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY MOBILE CTA BAR ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] flex items-center gap-3 px-4 py-3 md:hidden"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{product.name}</p>
              <p className="font-display text-lg font-bold text-[#C9A84C]">
                {formatPrice(product.price)}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                isInCart ? 'bg-green-600 text-white' : 'bg-[#C9A84C] text-[#1A1A1A]'
              }`}
            >
              {isInCart ? '✓ In cart' : 'Buy Now'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
