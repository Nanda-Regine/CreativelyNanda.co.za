'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MagazineCover from '@/components/MagazineCover';

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    slug: 'sme-command-center',
    cover: '/assets/products/sme/cover.png',
    name: 'SME Command Center',
    price: 'R449',
    category: 'Business',
    badge: 'POPULAR',
  },
  {
    slug: 'writers-sanctuary',
    cover: '/assets/products/writers-sanctuary/cover.png',
    name: "Writer's Sanctuary",
    price: 'R299',
    category: 'Creative',
    badge: 'BESTSELLER',
  },
  {
    slug: 'varsity-academic-excellence',
    cover: '/assets/products/varsity/cover.png',
    name: 'Varsity Engine',
    price: 'R279',
    category: 'Student',
    badge: null,
  },
  {
    slug: 'creators-studio',
    cover: '/assets/products/creators-studio/cover.png',
    name: "Creator's Studio",
    price: 'R399',
    category: 'Creative',
    badge: 'NEW',
  },
  {
    slug: 'music-artist-career-command-center',
    cover: '/assets/products/music-artist/cover.png',
    name: 'Music Artist CC',
    price: 'R389',
    category: 'Creative',
    badge: null,
  },
  {
    slug: 'high-school-academic-excellence',
    cover: '/assets/products/high-school/cover.png',
    name: 'High School Engine',
    price: 'R249',
    category: 'Student',
    badge: null,
  },
];

const TESTIMONIALS = [
  {
    initials: 'BI',
    name: 'Bojan Ivanović',
    title: 'Co-Founder, Balkan Burger Pty Ltd',
    quote: 'Nanda is one of those rare gems who not only meets expectations but consistently redefines what excellence looks like. In short, Nanda is a powerhouse of talent and energy!',
  },
  {
    initials: 'ZJ',
    name: 'Zintle Joko',
    title: 'Entrepreneur | Founder of Joko & Co',
    quote: 'She is the best person I have ever worked with. Her attention to detail is unmatched, and she has a gift for balancing efficiency with creativity in a way that makes everything run smoothly.',
  },
  {
    initials: 'AG',
    name: 'Amy Gajjar',
    title: 'Award-Winning Creative Consultant | Woolworths',
    quote: 'Not only is she an amazing leader, but her attention to detail is extremely admirable. Her positivity and can-do attitude is truly inspirational and she is an asset to any business she works with.',
  },
  {
    initials: 'NC',
    name: 'Nicole Carlisle',
    title: 'Team Member, Balkan Burger',
    quote: 'Having such a supportive and inspiring manager made a lasting impact on my growth, both professionally and personally. She is one of the most helpful, efficient, and kind leaders I\'ve worked with.',
  },
];

// ─── Testimonials slideshow ───────────────────────────────────────────────────────
function TestimonialsSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => { setPaused(true); setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const next = () => { setPaused(true); setActive(i => (i + 1) % TESTIMONIALS.length); };

  return (
    <section className="relative py-24 px-6 bg-[#0A1128] z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <FadeUp className="text-center mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-3">Recommendations</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold italic text-white leading-tight">
            What colleagues say.
          </h2>
        </FadeUp>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="bg-white/5 border border-white/10 rounded-[28px] p-7 md:p-10 h-full">
                <div className="text-[#B8860B]/30 text-5xl font-serif leading-none mb-4">&ldquo;</div>
                <p className="font-display text-lg md:text-xl italic text-white/90 leading-relaxed mb-6">
                  {TESTIMONIALS[active].quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C1292E] to-[#B8860B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {TESTIMONIALS[active].initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{TESTIMONIALS[active].name}</p>
                    <p className="text-white/40 text-xs">{TESTIMONIALS[active].title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPaused(true); setActive(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-[#C1292E] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full border border-white/20 text-white hover:border-[#C1292E] hover:text-[#C1292E] transition-all flex items-center justify-center text-sm">←</button>
            <button onClick={next} className="w-9 h-9 rounded-full border border-white/20 text-white hover:border-[#C1292E] hover:text-[#C1292E] transition-all flex items-center justify-center text-sm">→</button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/testimonials" className="text-[#B8860B] text-sm hover:underline">
            Read all 6 recommendations →
          </Link>
        </div>
      </div>
    </section>
  );
}

const BLOG_PREVIEW = [
  {
    slug: 'african-women-fifth-industrial-revolution-building-not-waiting',
    category: 'Writing',
    title: 'African Women and the Fifth Industrial Revolution: We Are Not Late Adopters',
    excerpt: 'The narrative that Africa is "catching up" to the 5IR misunderstands both Africa and the revolution. We are building the version of AI the continent actually needs.',
    accent: '#C1292E',
  },
  {
    slug: 'k53-sm2-spaced-repetition-south-africa-learners-licence',
    category: 'Dev',
    title: 'SM-2 in Production: How a 1980s Algorithm Fixed SA\'s 60% Learner\'s Licence Fail Rate',
    excerpt: 'K53 Drill Master uses the same spaced repetition algorithm behind Anki and Duolingo. Here\'s why a 40-year-old algorithm is still the most effective learning system ever built.',
    accent: '#B8860B',
  },
  {
    slug: 'watchsankofa-85-percent-revenue-share-african-creators',
    category: 'Business',
    title: 'WatchSankofa: Why 85% Revenue Share Isn\'t Charity — It\'s the Architecture of Justice',
    excerpt: 'Netflix pays creators approximately 7% of revenue. WatchSankofa pays 85%. This is not a competitive differentiator. It is a structural argument made in code.',
    accent: '#2D4A22',
  },
];

const SERVICES = [
  {
    title: 'AI Integration',
    body: 'Custom Claude/OpenAI agents embedded in your product or business workflow.',
    price: 'From R45,000',
    href: '/consulting',
  },
  {
    title: 'Fractional AI Officer',
    body: 'Monthly AI strategy, prototyping, and advisory. Embedded in your team.',
    price: 'From R18,000/mo',
    href: '/consulting',
  },
  {
    title: 'Business Automation',
    body: 'WhatsApp-native workflows, automated reporting, debt recovery pipelines.',
    price: 'From R8,000/mo',
    href: '/consulting',
  },
];

// ─── Product card with image fallback ────────────────────────────────────────────
function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group block bg-white/60 backdrop-blur-sm border border-[#0A1128]/10 rounded-[24px] overflow-hidden hover:border-[#C1292E]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
    >
      <div className="relative aspect-video bg-gradient-to-br from-[#E8DCC4] to-[#F5EFE6] flex items-center justify-center">
        {!imgFailed ? (
          <Image
            src={p.cover}
            alt={p.name}
            fill
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="font-display text-2xl font-bold text-[#0A1128]/20">{p.name[0]}</span>
        )}
        {p.badge && (
          <span className="absolute top-2 right-2 bg-[#C1292E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-sans text-[10px] tracking-widest uppercase text-[#B8860B] mb-1">{p.category}</p>
        <h3 className="font-display font-bold text-[#0A1128] text-base leading-snug mb-1 group-hover:text-[#C1292E] transition-colors">
          {p.name}
        </h3>
        <p className="font-display text-lg font-bold text-[#C1292E]">{p.price}</p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────────
export default function Home() {

  return (
    <main className="min-h-screen">

      {/* ── MAGAZINE COVER (100dvh) — negative margin to escape layout pt-20 ── */}
      <div className="-mt-20">
        <MagazineCover />
      </div>

      {/* ── POETRY INTERLUDE ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] py-20 px-6 z-10">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-8">
            Inside Her Roses · Published October 2021
          </p>
          <blockquote className="font-display text-3xl md:text-4xl italic text-white/90 leading-relaxed mb-6">
            &ldquo;she learned to speak in two tongues —<br />
            the language of systems<br />
            and the language of longing.&rdquo;
          </blockquote>
          <p className="text-white/30 text-sm mb-8">— Nandawula Regine Kabali-Kagwa</p>
          <a href="/poetry" className="text-[#C1292E] text-sm font-medium hover:underline">
            Read the collection →
          </a>
        </div>
      </section>

      {/* ── EDITORIAL INTRO ────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              The Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#0A1128] leading-[0.95] mb-6">
              Business degree.
              <br />Self-taught engineer.
              <br />Eight apps.
              <br /><span className="text-[#C1292E]">One year.</span>
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-[1.8] mb-8">
              After my degree, I taught myself to code. Then I started shipping. In one year from zero coding knowledge,
              I built eight AI-powered tools for African entrepreneurs, students, and creators —
              including JarvisOS, a 15-wing personal AI operating system — backed by five ancestral lineages and a Ugandan word that means peace.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#0A1128] text-white rounded-full font-semibold text-sm hover:bg-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1128]"
              >
                Read the full story →
              </Link>
              <Link
                href="/consulting"
                className="px-6 py-3 border border-[#0A1128]/20 text-[#0A1128] rounded-full font-semibold text-sm hover:border-[#C1292E] hover:text-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Hire me
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '8+', label: 'Production Apps', color: 'text-[#C1292E]' },
                { value: '1,000+', label: 'GitHub Commits', color: 'text-[#C1292E]' },
                { value: '1 Year', label: 'Self-Taught', color: 'text-[#C1292E]' },
                { value: '3+', label: 'Paying Clients', color: 'text-[#C1292E]' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/60 backdrop-blur-sm rounded-[24px] p-6 text-center border border-[#0A1128]/5"
                >
                  <div className={`font-display text-4xl font-bold ${s.color} mb-1`}>
                    {s.value}
                  </div>
                  <div className="text-xs text-[#6B6B6B] tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <TestimonialsSlideshow />

      {/* ── PRODUCTS GRID ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-white z-10">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-3">
                Digital Products
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-[#0A1128]">
                Six systems for African life.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#C1292E] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded"
            >
              View all 6 + bundles →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.06}>
                <ProductCard p={p} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — dark section ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#0A1128] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-35" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              AI Consulting
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-[0.95]">
              Africa&apos;s AI engineer.
              <br />
              <span className="text-[#C9A84C]">Available for select engagements.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <div className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] border border-white/10 rounded-xl p-7 hover:border-[#C1292E]/30 transition-colors h-full flex flex-col" style={{ borderRadius: '32px 12px 32px 12px' }}>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">{s.body}</p>
                  <p className="text-[#C9A84C] font-medium text-sm">{s.price}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center">
            <Link
              href="/consulting"
              className="inline-block px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
            >
              View all consulting offers →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-3">The Current</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-[#0A1128]">
                Writing from the build.
              </h2>
            </div>
            <Link href="/blog" className="text-sm text-[#C1292E] font-medium hover:underline">
              Read all 29 articles →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BLOG_PREVIEW.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
                  className="group flex flex-col bg-[#0A1128] rounded-[24px] overflow-hidden hover:ring-1 hover:ring-[#C1292E]/40 transition-all h-full"
                >
                  <div className="h-1 w-full" style={{ backgroundColor: post.accent }} />
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: post.accent }}>
                      {post.category}
                    </p>
                    <h3 className="font-display text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#C1292E] transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-[#C1292E] text-xs font-medium">Read article →</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE ───────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-5xl md:text-6xl italic text-[#0A1128] leading-[1.1] mb-8">
              &ldquo;Technology should amplify humanity,
              not replace it. Every line of code —
              in service of connection.&rdquo;
            </p>
            <p className="text-[#B8860B] font-sans text-sm tracking-widest uppercase font-medium">
              — Nanda · AI Engineer & Creative Technologist
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BOTTOM CTA — cherry ───────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#C1292E] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-tight mb-6">
              Let&apos;s build something
              <br />worth remembering.
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Consulting engagements. AI integrations. Speaking. Templates. Poetry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Work with Nanda
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Browse Templates
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
