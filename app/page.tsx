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
  { label: '7 SaaS Apps', sub: '250+ active users' },
  { label: 'Ubuntu × Code', sub: 'Africa-first infrastructure' },
];

const PRODUCTS = [
  {
    slug: 'sme-command-center',
    name: 'SME Command Center',
    price: 'R449',
    category: 'Business',
    badge: 'POPULAR',
  },
  {
    slug: 'writers-sanctuary',
    name: "Writer's Sanctuary",
    price: 'R299',
    category: 'Creative',
    badge: 'BESTSELLER',
  },
  {
    slug: 'varsity-academic-excellence',
    name: 'Varsity Engine',
    price: 'R279',
    category: 'Student',
    badge: null,
  },
  {
    slug: 'creators-studio',
    name: "Creator's Studio",
    price: 'R399',
    category: 'Creative',
    badge: 'NEW',
  },
  {
    slug: 'music-artist-career-command-center',
    name: 'Music Artist CC',
    price: 'R389',
    category: 'Creative',
    badge: null,
  },
  {
    slug: 'high-school-academic-excellence',
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

      {/* ── COVER ──────────────────────────────────────────────────────────────
          100vh magazine cover: dark terracotta gradient, Nanda's photo,
          masthead, coverlines left + right, name + tagline, price bar
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen min-h-[700px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2A1A0A 0%, #3D1F0D 40%, #1A0A05 100%)',
        }}
      >
        {/* Photo — right-aligned, transparent bg preferred */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="absolute right-0 bottom-0 h-[95%] w-auto max-w-[55%]"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <div className="relative h-full w-[500px]">
            <Image
              src="/assets/professional/nanda-cover.png"
              alt="Nandawula Regine — AI Engineer & Creative Technologist"
              fill
              className="object-contain object-bottom"
              priority
              onError={() => {}} // graceful — photo is optional
            />
          </div>
        </motion.div>

        {/* Gradient overlay — vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A0A]/90 via-[#2A1A0A]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A0A]/80 via-transparent to-transparent pointer-events-none" />

        {/* MASTHEAD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-28 md:pt-32"
        >
          <div className="flex items-center gap-6">
            <span className="text-[#C9A84C] font-sans text-[10px] tracking-[0.3em] uppercase">
              Est. 2024
            </span>
            <span className="w-12 h-px bg-[#C9A84C]/40" />
          </div>
          <span className="text-[#C9A84C] font-sans text-[10px] tracking-[0.3em] uppercase">
            East London, South Africa
          </span>
        </motion.div>

        {/* NAME + ISSUE line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-24 md:top-28 left-0 right-0 text-center px-6 pt-12"
        >
          <h1
            className="font-display font-bold text-white leading-none select-none"
            style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
          >
            CREATIVELY
            <br />
            <span className="text-[#C9A84C]">NANDA</span>
          </h1>
        </motion.div>

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

      {/* ── EDITORIAL INTRO ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              The Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#1A1A1A] leading-[0.95] mb-6">
              Business degree.
              <br />Self-taught engineer.
              <br />Seven apps.
              <br /><span className="text-[#C4613A]">Two years.</span>
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
                className="px-6 py-3 bg-[#1A1A1A] text-white rounded-full font-semibold text-sm hover:bg-[#C4613A] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
              >
                Read the full story →
              </Link>
              <Link
                href="/consulting"
                className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-full font-semibold text-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                Hire me
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '7', label: 'Production Apps', color: 'text-[#C9A84C]' },
                { value: '250+', label: 'Active Users', color: 'text-[#C4613A]' },
                { value: '2 yrs', label: 'Self-Taught', color: 'text-[#C9A84C]' },
                { value: 'R300k', label: 'MRR Target', color: 'text-[#C4613A]' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#F2F0EB] rounded-2xl p-6 text-center border border-[#1A1A1A]/5"
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
      <section className="py-24 px-6 bg-[#F2F0EB]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
                Digital Products
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-[#1A1A1A]">
                Six systems for African life.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#C9A84C] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
            >
              View all 6 + bundles →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group block bg-white border border-[#1A1A1A]/10 rounded-xl overflow-hidden hover:border-[#C9A84C]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                >
                  <div className="relative aspect-video bg-[#F2F0EB]">
                    <Image
                      src={`/assets/products/${p.slug}/cover.png`}
                      alt={p.name}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                    {p.badge && (
                      <span className="absolute top-2 right-2 bg-[#C4613A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-[#C9A84C] mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display font-bold text-[#1A1A1A] text-base leading-snug mb-1 group-hover:text-[#C4613A] transition-colors">
                      {p.name}
                    </h3>
                    <p className="font-display text-lg font-bold text-[#C4613A]">{p.price}</p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — dark section ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
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
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-7 hover:border-[#C9A84C]/30 transition-colors h-full flex flex-col">
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
              className="inline-block px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              View all consulting offers →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-5xl md:text-6xl italic text-[#1A1A1A] leading-[1.1] mb-8">
              &ldquo;Technology should amplify humanity,
              not replace it. Every line of code —
              in service of connection.&rdquo;
            </p>
            <p className="text-[#C9A84C] font-sans text-sm tracking-widest uppercase font-medium">
              — Nanda · AI Engineer & Creative Technologist
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BOTTOM CTA — terracotta ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C4613A]">
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
                className="px-8 py-4 bg-white text-[#C4613A] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
