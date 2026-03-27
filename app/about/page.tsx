'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '7', label: 'Production Apps' },
  { value: '2', label: 'Years of Building' },
  { value: '15', label: 'Academic Distinctions' },
  { value: '6', label: 'Certifications' },
];

const ANCESTRAL_CLANS = [
  {
    clan: 'Ncube',
    origin: 'Ndebele / Zimbabwe',
    meaning: 'The innovators — those who build what has never been built before.',
    symbol: '◈',
  },
  {
    clan: 'Nkosi',
    origin: 'Zulu / South Africa',
    meaning: 'The leaders — those who speak truth before it is comfortable.',
    symbol: '◆',
  },
  {
    clan: 'Dlamini',
    origin: 'Swazi / eSwatini',
    meaning: 'The protectors — those who hold space for others to grow.',
    symbol: '◇',
  },
];

const BADGE_GROUPS = [
  {
    category: 'AI & Engineering',
    color: 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20',
    badges: ['Claude API', 'OpenAI', 'LangChain', 'Next.js', 'TypeScript', 'Supabase', 'Python'],
  },
  {
    category: 'Design & Creative',
    color: 'bg-[#C4613A]/10 text-[#C4613A] border border-[#C4613A]/20',
    badges: ['Figma', 'Framer Motion', 'Tailwind CSS', 'Brand Identity', 'Editorial Design'],
  },
  {
    category: 'Business & Strategy',
    color: 'bg-navy/10 text-navy border border-navy/20',
    badges: ['Product Strategy', 'Go-to-Market', 'Pricing Models', 'Financial Analysis', 'SWOT / PESTLE'],
  },
  {
    category: 'Craft & Expression',
    color: 'bg-cherry/10 text-cherry border border-cherry/10',
    badges: ['Spoken Word Poetry', 'Luthier Arts', 'Public Speaking', 'Content Creation', 'Notion Systems'],
  },
];

const TIMELINE = [
  {
    year: '2022',
    title: 'Business degree begins',
    body: 'Enrolled at Nelson Mandela University — BCom General Management. Learned the language of markets, strategy, and people.',
    dot: 'bg-[#C9A84C]',
  },
  {
    year: '2023',
    title: 'First line of code',
    body: 'Picked up Python and JavaScript alongside the degree. Realized software was just structured thinking — something business school had been training me for all along.',
    dot: 'bg-[#C9A84C]',
  },
  {
    year: 'Early 2024',
    title: 'First production app shipped',
    body: 'Launched the CreativelyNanda portfolio — deployed on Vercel, live to the world. The moment that changed everything.',
    dot: 'bg-[#C4613A]',
  },
  {
    year: 'Mid 2024',
    title: 'Mirembe Muse is born',
    body: 'Built a full e-commerce platform for Mirembe Muse with Supabase, PayFast, and Resend. First paying customers within 30 days.',
    dot: 'bg-[#C4613A]',
  },
  {
    year: 'Late 2024',
    title: 'AI pivot',
    body: 'Completed AWS ML Foundations and Google AI certifications. Integrated Claude and OpenAI APIs into production. Started calling myself an AI engineer.',
    dot: 'bg-[#C4613A]',
  },
  {
    year: '2025',
    title: '7 apps. Real users.',
    body: 'Shipped True Access, VisionBoard Pro, PoetryTube, and the Notion Template Suite. 250+ active users across products. All self-funded.',
    dot: 'bg-[#C4613A]',
  },
  {
    year: 'March 2026',
    title: 'Consulting opens',
    body: 'Opened AI consulting engagements for African businesses. First enterprise client signed. The degree, the code, the clans — all converging.',
    dot: 'bg-cherry',
    current: true,
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function About() {
  const [ancestralExpanded, setAncestralExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Brand tagline — replaces old quote attribution */}
        <FadeUp>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-[#C9A84C] mb-6">
            Creative Technologist · AI Engineer · Poet
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-[#1A1A1A] leading-[0.9] mb-6">
            Built from<br />
            <span className="text-cherry">ancestry</span>.<br />
            Powered by<br />
            <span className="text-[#C9A84C]">code.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2} className="mt-8">
          <p className="font-display text-2xl md:text-3xl text-[#6B6B6B] leading-relaxed max-w-2xl italic">
            "Technology should amplify humanity, not replace it. Every line of
            code, every design decision, every word — in service of connection."
          </p>
          <p className="mt-3 text-sm text-[#C9A84C] tracking-widest uppercase font-medium">
            — Nanda · CreativelyNanda.co.za
          </p>
        </FadeUp>

        {/* Stats bar */}
        <FadeUp delay={0.3} className="mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A1A]/10 rounded-2xl overflow-hidden border border-[#1A1A1A]/10">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#FAFAF8] px-6 py-6 text-center hover:bg-[#F5F0E8] transition-colors"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-[#C9A84C]">
                  {s.value}
                </div>
                <div className="text-xs text-[#6B6B6B] tracking-widest uppercase mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── ANCESTRAL OPERATING SYSTEM (position 2, right after hero) ─────────── */}
      <section className="py-20 px-6 bg-[#1A1A1A] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Ancestral Operating System
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
              I didn&apos;t start from zero.<br />
              I started from lineage.
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-2xl mb-12">
              Before the code, before the certifications, before the apps — there were
              the clans. Each one an operating system I run in parallel: the innovator,
              the leader, the protector. Understanding where you come from changes how
              you build.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ANCESTRAL_CLANS.map((clan, i) => (
              <FadeUp key={clan.clan} delay={i * 0.1}>
                <div className="border border-[#C9A84C]/30 rounded-2xl p-8 hover:border-[#C9A84C] transition-colors group">
                  <div className="text-4xl text-[#C9A84C] mb-4 font-display">{clan.symbol}</div>
                  <h3 className="font-display text-2xl font-bold text-[#F5F0E8] mb-1">
                    {clan.clan}
                  </h3>
                  <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4">
                    {clan.origin}
                  </p>
                  <p className="text-[#F5F0E8]/70 leading-relaxed text-sm">{clan.meaning}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA for ancestral section */}
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/poetry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                Read the poetry this lineage produced
                <span className="text-lg">→</span>
              </Link>
              <Link
                href="/mirembe"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#C9A84C]/40 text-[#C9A84C] rounded-full font-semibold hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                See Mirembe Muse
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BIO / STORY ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              The Story
            </p>
            <h2 className="font-display text-4xl font-bold text-[#1A1A1A] mb-6">
              Business degree.<br />Self-taught engineer.<br />Seven apps. Two years.
            </h2>
            <div className="space-y-5 text-[#6B6B6B] leading-relaxed">
              <p>
                I started at Nelson Mandela University studying Business Management — learning
                the language of markets, strategy, and capital. While my classmates were writing
                case studies, I was writing code. Not because I had to, but because I saw the
                gap between what business needed and what tech could deliver in Africa.
              </p>
              <p>
                I taught myself JavaScript, TypeScript, React, and eventually AI integration —
                not in a bootcamp, but by shipping real products to real users. Every error
                message was a lesson. Every deployment was a milestone.
              </p>
              <p>
                Today I sit at the intersection of business strategy and AI engineering. I build
                tools that make African entrepreneurs more powerful, more efficient, and more
                connected to global markets.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              <div className="p-8 bg-[#F5F0E8] rounded-2xl">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">
                  Currently
                </p>
                <ul className="space-y-3 text-[#1A1A1A]">
                  {[
                    'AI consultant for African businesses',
                    'Founder of Mirembe Muse',
                    'Building 3 new SaaS products',
                    'Writing poetry that sells books',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#C9A84C] mt-0.5 shrink-0">◆</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-navy text-beige rounded-2xl">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">
                  Contact
                </p>
                <a
                  href="mailto:hello@mirembemuse.co.za"
                  className="text-beige hover:text-[#C9A84C] transition-colors font-medium"
                >
                  hello@mirembemuse.co.za
                </a>
                <p className="text-beige/50 text-xs mt-2">Port Elizabeth, South Africa</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SKILLS — BADGE CLUSTER (replaces old skills list) ─────────────────── */}
      <section className="py-20 px-6 bg-[#F5F0E8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Skills & Tools
            </p>
            <h2 className="font-display text-4xl font-bold text-[#1A1A1A] mb-12">
              What I bring to the table.
            </h2>
          </FadeUp>

          <div className="space-y-8">
            {BADGE_GROUPS.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.08}>
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3 font-medium">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${group.color}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <FadeUp>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
            The Journey
          </p>
          <h2 className="font-display text-4xl font-bold text-[#1A1A1A] mb-16">
            How it unfolded.
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#1A1A1A]/10" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.07}>
                <div className="flex gap-8">
                  {/* Dot */}
                  <div className="shrink-0 mt-1.5">
                    <div className={`w-6 h-6 rounded-full ${item.dot} ring-4 ring-[#FAFAF8] relative z-10`} />
                  </div>

                  <div className="pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-sm font-bold text-[#C9A84C] tracking-widest uppercase">
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 bg-cherry/10 text-cherry text-xs rounded-full font-medium">
                          Now
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6B6B6B] leading-relaxed text-sm max-w-xl">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1A1A1A] text-[#F5F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Work with Nanda
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let&apos;s build something<br />
              <span className="text-[#C9A84C]">worth remembering.</span>
            </h2>
            <p className="text-[#F5F0E8]/60 text-lg mb-10 leading-relaxed">
              Whether you need AI engineering, strategic consulting, or a creative
              partner who understands African markets — the conversation starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                View Consulting Offers
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8] rounded-full font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
