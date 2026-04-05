'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  Check,
  Shield,
  Zap,
  Download,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '@/components/cart';
import { formatPrice } from '@/lib/utils';
import { ProductCoverCard } from '@/components/marketplace';
import { ProductLikeButton } from '@/components/shop/ProductLikeButton';
import { ProductViewCounter } from '@/components/shop/ProductViewCounter';
import { ProductReviews } from '@/components/shop/ProductReviews';
import { ProductGallery } from '@/components/shop/ProductGallery';
import type { ProductCoverData } from '@/components/marketplace';

interface ProductDetailClientProps {
  slug: string;
  product: ProductCoverData;
  description: string;
  features: { title: string; description?: string; icon?: string }[];
  faqs: { question: string; answer: string }[];
  relatedProducts: ProductCoverData[];
  images?: string[];
}

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const isInCart = !!getItem(product.slug);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Short hook: first sentence only
  const hook = description.split(/[.\n]/)[0].trim();

  const handleShare = async () => {
    const url = `${window.location.origin}/products/${slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text: product.tagline, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

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
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="-mt-20 min-h-screen" style={{ background: '#F5EFE6' }}>

      {/* ── HERO ── editorial navy */}
      <section style={{ background: '#0A1128', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: GRAIN_SVG, backgroundSize: '300px 300px',
          opacity: 0.08, pointerEvents: 'none', zIndex: 1,
        }} />
        {/* Gold nebula */}
        <div style={{
          position: 'absolute', right: '-5%', top: '10%', width: '55%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,148,58,0.12) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
        {/* Cherry nebula */}
        <div style={{
          position: 'absolute', left: '-5%', bottom: '0', width: '40%', height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(193,41,46,0.10) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Gold spine */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
          background: 'linear-gradient(to bottom, #C9943A, rgba(201,148,58,0.3))',
          zIndex: 10,
        }} />

        <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24" style={{ zIndex: 5 }}>
          {/* Back + meta row */}
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white/80 transition-colors tracking-widest uppercase"
            >
              ← Products
            </Link>
            <div className="flex items-center gap-3">
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#C9943A', border: '1px solid rgba(201,148,58,0.4)',
                padding: '3px 10px', borderRadius: '20px',
              }}>
                {product.category}
              </span>
              {product.badge && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#fff', backgroundColor: '#C1292E',
                  padding: '3px 10px', borderRadius: '20px',
                }}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            {/* Left — info */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.01em',
                  color: '#FFFFFF', marginBottom: '20px',
                }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  fontStyle: 'italic', color: 'rgba(245,240,232,0.7)',
                  lineHeight: 1.5, marginBottom: '32px', maxWidth: '540px',
                }}
              >
                {hook}.
              </motion.p>

              {/* Views */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <ProductViewCounter slug={slug} variant="badge" />
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-baseline gap-4 mb-10"
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  {formatPrice(product.price / 100)}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                      {formatPrice(product.originalPrice / 100)}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                      color: '#fff', backgroundColor: '#C9943A',
                      padding: '3px 10px', borderRadius: '20px',
                    }}>
                      SAVE {discount}%
                    </span>
                  </>
                )}
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                {product.status === 'coming-soon' ? (
                  <span style={{
                    padding: '14px 36px', borderRadius: '50px',
                    background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
                  }}>
                    Coming Soon
                  </span>
                ) : (
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '14px 36px', borderRadius: '50px',
                      background: isInCart ? '#2D6A4F' : '#C1292E',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      boxShadow: isInCart ? '0 4px 20px rgba(45,106,79,0.4)' : '0 4px 20px rgba(193,41,46,0.4)',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </motion.button>
                )}

                <ProductLikeButton slug={slug} variant="floating" />

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    position: 'relative', padding: '12px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                  }}
                >
                  <Share2 size={18} />
                  {showCopied && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)',
                        fontSize: '11px', color: '#fff', background: 'rgba(10,17,40,0.9)',
                        padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap',
                      }}
                    >
                      Link copied!
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{
                  display: 'flex', gap: '24px', flexWrap: 'wrap',
                  borderTop: '1px solid rgba(201,148,58,0.2)', paddingTop: '20px',
                }}
              >
                {[
                  { icon: Download, label: 'Instant access' },
                  { icon: Shield, label: '30-day guarantee' },
                  { icon: Zap, label: 'Lifetime updates' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={14} color="#C9943A" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.55)', textTransform: 'uppercase' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — cover image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="hidden lg:block"
            >
              {(images.length > 0 || product.thumbnail) && (
                <div style={{
                  borderRadius: '8px 32px 8px 32px',
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(201,148,58,0.2)',
                  aspectRatio: '3/4',
                  position: 'relative',
                }}>
                  <Image
                    src={images[0] || product.thumbnail || ''}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="380px"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom border */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,148,58,0.4), transparent)' }} />
      </section>

      {/* ── GALLERY ── */}
      {images.length >= 2 && (
        <section style={{ background: '#F5EFE6', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
          <div className="max-w-5xl mx-auto">
            <ProductGallery images={images} productName={product.name} />
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      {features.length > 0 && (
        <section style={{ background: '#0A1128', padding: 'clamp(56px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: GRAIN_SVG, backgroundSize: '300px 300px',
            opacity: 0.06, pointerEvents: 'none',
          }} />
          <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <FadeUp>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9943A', marginBottom: '12px' }}>
                What&apos;s included
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '48px', lineHeight: 1 }}>
                Everything in the box.
              </h2>
            </FadeUp>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '2px' }}>
              {features.map((feature, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <div style={{
                    padding: '24px',
                    borderBottom: '1px solid rgba(201,148,58,0.12)',
                    borderRight: '1px solid rgba(201,148,58,0.08)',
                  }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#C9943A', fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>◆</span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px 0' }}>
                          {feature.title}
                        </p>
                        {feature.description && (
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.6, margin: 0 }}>
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      <section style={{ background: '#F5EFE6' }}>
        <ProductReviews slug={slug} productName={product.name} />
      </section>

      {/* ── FAQs ── */}
      {faqs.length > 0 && (
        <section style={{ background: '#F0E8DC', padding: 'clamp(56px, 8vw, 96px) 24px' }}>
          <div className="max-w-3xl mx-auto">
            <FadeUp>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C1292E', marginBottom: '12px' }}>
                Questions
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#0A1128', marginBottom: '40px' }}>
                Frequently asked.
              </h2>
            </FadeUp>

            <div>
              {faqs.map((faq, i) => (
                <FadeUp key={i} delay={i * 0.04}>
                  <div style={{ borderBottom: '1px solid rgba(10,17,40,0.12)' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', padding: '20px 0',
                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#0A1128', paddingRight: '16px' }}>
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: '#C1292E', fontSize: '20px', flexShrink: 0, lineHeight: 1 }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(10,17,40,0.65)', lineHeight: 1.7, paddingBottom: '20px' }}>
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

      {/* ── RELATED ── */}
      {relatedProducts.length > 0 && (
        <section style={{ background: '#F5EFE6', padding: 'clamp(56px, 8vw, 96px) 24px' }}>
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9943A', marginBottom: '8px' }}>
                    Also from the store
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#0A1128', margin: 0 }}>
                    You might also like.
                  </h2>
                </div>
                <Link
                  href="/products"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: '#C1292E', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  All products <ArrowRight size={12} />
                </Link>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.08}>
                  <ProductCoverCard product={p} index={i} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY MOBILE BUY BAR ── */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="md:hidden"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '12px 16px',
          background: 'rgba(10,17,40,0.97)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,148,58,0.2)',
          display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 40,
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', margin: '0 0 2px 0' }}>
            {product.name}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            {formatPrice(product.price / 100)}
          </p>
        </div>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '12px 24px', borderRadius: '50px',
            background: isInCart ? '#2D6A4F' : '#C1292E',
            color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: 'none', cursor: 'pointer',
          }}
        >
          {isInCart ? <Check size={16} /> : <ShoppingCart size={16} />}
          {isInCart ? 'Added' : 'Add to Cart'}
        </motion.button>
      </motion.div>

    </div>
  );
}
