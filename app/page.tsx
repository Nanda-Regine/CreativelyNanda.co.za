'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
const COVERLINES_LEFT = [
  { label: 'AI Engineering', sub: 'Claude · Supabase · TypeScript' },
  { label: 'Notion Systems', sub: '6 templates live now' },
  { label: 'Poetry', sub: '"Inside Her Roses" out now' },
];

const COVERLINES_RIGHT = [
  { label: 'Consulting', sub: 'From R8,000/month' },
  { label: '7 SaaS Apps', sub: '300+ active users' },
  { label: 'Ubuntu × Code', sub: 'Africa-first infrastructure' },
];

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

// ─── Page ─────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen">

      {/* ── Grain texture overlay ─────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── COVER ──────────────────────────────────────────────────────────────
          100vh magazine cover: dark navy, Nanda's photo,
          masthead, coverlines left + right, name + tagline, price bar
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen min-h-[700px] overflow-hidden z-10"
        style={{ backgroundColor: '#0A1128' }}
      >
        {/* Photo — centered on mobile (pulled up), right-aligned on desktop */}
        <div
          className="absolute top-[28%] bottom-[8%] md:top-auto md:bottom-0 left-0 right-0 md:left-auto md:right-0 md:h-[92%] md:w-[48%] flex justify-center md:block"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <div className="relative h-full w-[72%] md:w-full">
            <Image
              src="/assets/professional/nanda-professional-2-transparent.png"
              alt="Nandawula Regine — AI Engineer & Creative Technologist"
              fill
              className="object-contain object-top md:object-bottom"
              priority
            />
          </div>
        </div>

        {/* Gradient overlay — heavier on mobile (bottom-up), left vignette on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/95 via-[#0A1128]/40 to-[#0A1128]/70 md:bg-none pointer-events-none md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 via-[#0A1128]/60 to-transparent pointer-events-none hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent pointer-events-none" />

        {/* MASTHEAD */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-28 md:pt-32">
          <div className="flex items-center gap-6">
            <span className="text-[#C9A84C] font-sans text-[10px] tracking-[0.3em] uppercase">
              Est. 2024
            </span>
            <span className="w-12 h-px bg-[#C9A84C]/40" />
          </div>
          <span className="text-[#C9A84C] font-sans text-[10px] tracking-[0.3em] uppercase">
            East London, South Africa
          </span>
        </div>

        {/* NAME + ISSUE line */}
        <div className="absolute top-24 md:top-28 left-0 right-0 text-center px-6 pt-12">
          <h1
            className="font-display font-bold text-white leading-none select-none"
            style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
          >
            CREATIVELY
            <br />
            <span className="text-[#C9A84C]">NANDA</span>
          </h1>
        </div>

        {/* COVERLINES LEFT */}
        <div className="absolute left-6 md:left-10 top-[45%] -translate-y-1/2 space-y-5 hidden sm:block">
          {COVERLINES_LEFT.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="border-l-2 border-[#C9A84C] pl-3"
            >
              <p className="font-display text-base font-bold text-white leading-none">{c.label}</p>
              <p className="font-sans text-[10px] text-white/50 mt-0.5">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* COVERLINES RIGHT */}
        <div className="absolute right-6 md:right-10 top-[45%] -translate-y-1/2 space-y-5 hidden sm:block text-right">
          {COVERLINES_RIGHT.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12 }}
              className="border-r-2 border-[#C9A84C] pr-3"
            >
              <p className="font-display text-base font-bold text-white leading-none">{c.label}</p>
              <p className="font-sans text-[10px] text-white/50 mt-0.5">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM PRICE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-0 left-0 right-0 bg-[#C9A84C] px-6 md:px-10 py-3 flex items-center justify-between"
        >
          <div className="flex gap-6 items-center">
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] font-bold">
              This Issue
            </span>
            <span className="font-sans text-[11px] text-[#1A1A1A]/60">
              AI Consulting · 7 SaaS Apps · Notion Templates · Poetry · Mirembe Muse
            </span>
          </div>
          <span className="font-display text-lg font-bold text-[#1A1A1A]">2026</span>
        </motion.div>

        {/* TAGLINE — bottom center above price bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-16 left-0 right-0 text-center px-6"
        >
          <p className="font-display italic text-xl md:text-2xl text-white/70 max-w-lg mx-auto">
            AI Engineer · Published Poet · Founder, Mirembe Muse
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-16 right-8 text-white/30 text-2xl hidden md:block"
        >
          ↓
        </motion.div>
      </section>

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
              <br />Seven apps.
              <br /><span className="text-[#C1292E]">Two years.</span>
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-[1.8] mb-8">
              I started at Nelson Mandela University studying business. While my classmates
              wrote case studies, I was shipping code. Today I build AI-powered tools for
              African entrepreneurs, students, and creators — backed by five ancestral lineages
              and a Ugandan word that means peace.
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
                { value: '7', label: 'Production Apps', color: 'text-[#C1292E]' },
                { value: '300+', label: 'Active Users', color: 'text-[#C1292E]' },
                { value: '2 yrs', label: 'Self-Taught', color: 'text-[#C1292E]' },
                { value: 'R300k', label: 'MRR Target', color: 'text-[#C1292E]' },
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
                <Link
                  href={`/products/${p.slug}`}
                  className="group block bg-white/60 backdrop-blur-sm border border-[#0A1128]/10 rounded-[24px] overflow-hidden hover:border-[#C1292E]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-[#E8DCC4] to-[#F5EFE6]">
                    <Image
                      src={p.cover}
                      alt={p.name}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                    {p.badge && (
                      <span className="absolute top-2 right-2 bg-[#C1292E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-[#B8860B] mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display font-bold text-[#0A1128] text-base leading-snug mb-1 group-hover:text-[#C1292E] transition-colors">
                      {p.name}
                    </h3>
                    <p className="font-display text-lg font-bold text-[#C1292E]">{p.price}</p>
                  </div>
                </Link>
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
