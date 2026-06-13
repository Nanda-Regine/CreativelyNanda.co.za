'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
  { value: '9 mo', label: 'Zero to Production' },
  { value: '15', label: 'Academic Distinctions' },
  { value: '6', label: 'Certifications' },
];

const ANCESTRAL_CLANS = [
  {
    clan: 'Kabali-Kagwa',
    origin: 'Ugandan',
    meaning: 'The healers and wealth-holders. Nandawula was a doctor of great means. I carry her name, her lineage, and her mandate to build.',
    symbol: '◈',
  },
  {
    clan: 'Tshawe · Hlubi · Msimanga',
    origin: 'Xhosa, Eastern Cape',
    meaning: 'The earth-keepers. The clans who held this land, told its stories, and taught that a place becomes yours only when you pour yourself into it.',
    symbol: '◆',
  },
  {
    clan: 'Thabizolo',
    origin: 'Sotho',
    meaning: 'The peacekeepers. Those who build bridges between worlds and between the person you were and the person you are becoming.',
    symbol: '◇',
  },
];

const STACK = [
  {
    category: 'AI & Machine Learning',
    accentColor: '#C9943A',
    colSpan: 2,
    skills: [
      { name: 'Claude API', level: 'Expert' as const, note: 'Prompt caching, multi-agent systems, RAG' },
      { name: 'Prompt Engineering', level: 'Expert' as const, note: 'Production cost optimisation, agent design' },
      { name: 'AI Agent Architecture', level: 'Expert' as const, note: '5-agent AdminOS, 6-agent VarsityOS' },
      { name: 'OpenAI GPT-4o', level: 'Advanced' as const, note: 'StokvelOS, comparison systems' },
      { name: 'RAG & Embeddings', level: 'Advanced' as const, note: 'Vector search, Nanda AI chatbot' },
      { name: 'Claude MCP', level: 'Expert' as const, note: 'Model Context Protocol — tool registration, server connections, production agent integrations' },
      { name: 'Claude Design', level: 'Advanced' as const, note: 'Visual generation pipelines, design system co-creation, brand brief iteration' },
      { name: 'LangChain', level: 'Intermediate' as const, note: 'Pipeline orchestration' },
    ],
  },
  {
    category: 'Frontend',
    accentColor: '#2D4A22',
    colSpan: 1,
    skills: [
      { name: 'Next.js 14 App Router', level: 'Expert' as const, note: 'Server Components, Edge, RSC' },
      { name: 'React 18', level: 'Expert' as const, note: 'Hooks, performance, RSC patterns' },
      { name: 'TypeScript (strict)', level: 'Expert' as const, note: 'Complex generics, type-safe APIs' },
      { name: 'Tailwind CSS', level: 'Expert' as const, note: 'Design systems, custom tokens' },
      { name: 'Framer Motion', level: 'Advanced' as const, note: 'Production animations, scroll-triggered' },
      { name: 'PWA Development', level: 'Advanced' as const, note: 'Offline-first, installable (VarsityOS)' },
      { name: 'Zustand', level: 'Advanced' as const, note: 'State management across all 8 apps' },
    ],
  },
  {
    category: 'Backend & Database',
    accentColor: '#C9A84C',
    colSpan: 1,
    skills: [
      { name: 'Supabase', level: 'Expert' as const, note: 'PostgreSQL, RLS, Auth, Realtime, Storage' },
      { name: 'PostgreSQL + RLS', level: 'Expert' as const, note: 'Multi-tenant row-level security' },
      { name: 'REST API Design', level: 'Expert' as const, note: 'Next.js API routes, webhook handlers' },
      { name: 'Vercel Edge Functions', level: 'Advanced' as const, note: 'Cron jobs, edge middleware, streaming' },
      { name: 'Node.js', level: 'Advanced' as const, note: 'Server-side logic, async/await patterns' },
      { name: 'Upstash Redis', level: 'Intermediate' as const, note: 'Rate limiting, session cache, dedup' },
    ],
  },
  {
    category: 'Payments & Commerce',
    accentColor: '#7A9E7E',
    colSpan: 1,
    skills: [
      { name: 'PayFast', level: 'Expert' as const, note: 'ZAR recurring SaaS, webhooks, prod' },
      { name: 'LemonSqueezy', level: 'Advanced' as const, note: 'International digital products' },
      { name: 'Xero API', level: 'Intermediate' as const, note: 'Invoice creation, client account sync' },
      { name: 'Wise', level: 'Intermediate' as const, note: 'USD/EUR/GBP/KES international receipt' },
    ],
  },
  {
    category: 'Messaging & Comms',
    accentColor: '#C9943A',
    colSpan: 1,
    skills: [
      { name: 'Meta WhatsApp Cloud API', level: 'Advanced' as const, note: 'Business webhooks, HMAC auth' },
      { name: 'Resend', level: 'Advanced' as const, note: 'Transactional email across all 7 apps' },
      { name: 'Firebase Push (VAPID)', level: 'Advanced' as const, note: 'Push notifications, shared key 5 apps' },
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    accentColor: '#2D4A22',
    colSpan: 1,
    skills: [
      { name: 'Vercel', level: 'Expert' as const, note: 'Deployments, cron, Edge, analytics' },
      { name: 'GitHub', level: 'Expert' as const, note: '1,000+ commits across 8+ repositories' },
      { name: 'Sentry', level: 'Advanced' as const, note: '5 error monitoring projects live' },
      { name: 'PostHog', level: 'Advanced' as const, note: 'Product analytics, 8 properties' },
      { name: 'Arcjet', level: 'Intermediate' as const, note: 'Rate limiting in API routes' },
    ],
  },
  {
    category: 'Creative & Marketing',
    accentColor: '#C1292E',
    colSpan: 2,
    skills: [
      { name: 'Brand Identity Design', level: 'Expert' as const, note: '8 distinct visual identities — AdminOS, VarsityOS, Sanyu Botanicals, K53, WatchSankofa, and more' },
      { name: 'Graphic Design', level: 'Advanced' as const, note: 'Figma, Canva — editorial design, product packaging concepts, social media systems' },
      { name: 'Digital Marketing', level: 'Advanced' as const, note: 'Content strategy, SEO, email campaigns, LinkedIn, AI-powered content engines' },
      { name: 'Content Strategy', level: 'Advanced' as const, note: 'SankofaSessions publication, The Current blog, multi-format content pipelines' },
      { name: 'Copywriting', level: 'Expert' as const, note: 'Published poet — brings editorial craft to product copy, landing pages, brand voice' },
      { name: 'Botanical Brand Architecture', level: 'Advanced' as const, note: 'Sanyu Botanicals — ancestral ingredient sourcing, product concept to market' },
    ],
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'The working world begins',
    body: 'Sales Assistant at Sportsmans Warehouse, East London. First job at 19. Four years across the entire store — sales floor, cashier, receiving. Learning how real retail operations run from the inside.',
    dot: 'bg-[#B8860B]',
    cardBg: '#FDF8EE',
    borderColor: '#B8860B20',
  },
  {
    year: '2020',
    title: 'The degree begins',
    body: 'Higher Certificate in Business Management at Nelson Mandela University. Studying and working simultaneously. Learning the language of commerce while living it.',
    dot: 'bg-[#B8860B]',
    cardBg: '#EEF2F8',
    borderColor: '#3B5EA620',
  },
  {
    year: 'October 2021',
    title: 'The book. The promotion.',
    body: 'Inside Her Roses published — a poetry collection. In the same year: promoted to Receiving Clerk at Sportsmans Warehouse. Building across every dimension at once.',
    dot: 'bg-[#C1292E]',
    cardBg: '#FDF0F0',
    borderColor: '#C1292E25',
  },
  {
    year: '2021–2023',
    title: 'The diploma years',
    body: 'Diploma in Business Management at NMU. Three years of systems thinking, strategy, and operational discipline — while still at Sportsmans Warehouse.',
    dot: 'bg-[#B8860B]',
    cardBg: '#F4F0E6',
    borderColor: '#B8860B20',
  },
  {
    year: '2023',
    title: 'Into hospitality',
    body: 'Joined Balkan Burger, Port Elizabeth. Junior Waitress → Senior Waitress → Marketing Assistant → Team Leader → Event Coordinator. An entirely new world of operations, people, and pressure.',
    dot: 'bg-[#B8860B]',
    cardBg: '#EEF6EE',
    borderColor: '#3A803A20',
  },
  {
    year: '2024',
    title: 'Advanced Diploma. Manager title.',
    body: 'Advanced Diploma in Business Management — 15 distinctions across three consecutive qualifications. Simultaneously: promoted to Manager at Balkan Burger. Running a restaurant. Training staff. Earning the kind of recommendations that speak for themselves.',
    dot: 'bg-[#C1292E]',
    cardBg: '#FDE9E9',
    borderColor: '#C1292E30',
  },
  {
    year: 'June 2025',
    title: 'The pivot begins',
    body: 'First line of code. SheCodes Plus. Python. JavaScript. The degree had been teaching systems thinking the whole time — the code was just a different syntax for the same logic.',
    dot: 'bg-[#C1292E]',
    cardBg: '#EEF0FD',
    borderColor: '#4B5CC420',
  },
  {
    year: 'September 2025',
    title: 'First app. Company born.',
    body: 'Cortex Hub Booking System deployed — first production application. Same month: Mirembe Muse (Pty) Ltd incorporated in South Africa. The founder identity becomes legal.',
    dot: 'bg-[#C1292E]',
    cardBg: '#FFF8E8',
    borderColor: '#C9A84C30',
  },
  {
    year: 'October–November 2025',
    title: 'The accessibility work',
    body: 'True Access App — full-stack location-based accessibility platform built with Supabase and Mapbox. First complex architecture. First real users.',
    dot: 'bg-[#C1292E]',
    cardBg: '#EEF8F4',
    borderColor: '#2A8A6020',
  },
  {
    year: 'December 2025',
    title: 'Systems, productised',
    body: 'Six Notion templates built and listed across Payhip, Gumroad, Etsy, LemonSqueezy, Notion Marketplace, Creative Market. The consulting brain becomes digital product.',
    dot: 'bg-[#C1292E]',
    cardBg: '#F6EEF8',
    borderColor: '#9B3DB820',
  },
  {
    year: 'January 2026',
    title: 'The portfolio as a product',
    body: 'CreativelyNanda.co.za — 72 commits. Multilingual. AI chatbot. Template sales. Poetry. Blog. This is not a resume. It is a deployed, revenue-generating application.',
    dot: 'bg-[#C1292E]',
    cardBg: '#E8F4FD',
    borderColor: '#1A7AB820',
  },
  {
    year: 'February–March 2026',
    title: 'Eight apps. One year.',
    body: 'Campus Compass · K53 Drill Master · StokvelOS · AdminOS · WatchSankofa · SankofaSessions · JarvisOS · Sanyu Botanicals — shipped solo under Mirembe Muse (Pty) Ltd. Eight AI products. 1,000+ commits. Paying clients. East London, South Africa.',
    dot: 'bg-[#C1292E]',
    cardBg: '#0A1128',
    borderColor: '#C1292E40',
    dark: true,
    current: true,
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] text-[#0A1128]">

      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A1128] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <FadeUp>
              <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C1292E] mb-6">
                Creative Technologist · AI Engineer · Poet
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-6">
                Retail floor to<br />
                restaurant manager<br />
                to published poet<br />
                to <span className="text-[#C1292E]">AI engineer.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="font-display text-xl italic text-[#C1292E] leading-relaxed max-w-xl">
                One year of code. Eight production apps. Paying clients. The arc was never accidental.
              </p>
            </FadeUp>
          </div>

          {/* Professional photo */}
          <FadeUp delay={0.3} className="hidden md:flex justify-center">
            <div className="relative w-80 h-96">
              <Image
                src="/assets/professional/nanda-professional.jpg"
                alt="Nandawula Regine Kabali-Kagwa"
                fill
                className="object-cover ring-2 ring-[#C1292E]/20"
                style={{ borderRadius: '32px 8px 32px 8px' }}
                priority
              />
            </div>
          </FadeUp>
        </div>

        {/* Stats bar */}
        <FadeUp delay={0.4} className="max-w-5xl mx-auto mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#0A1128] px-6 py-6 text-center hover:bg-[#1a2744] transition-colors"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-[#C1292E]">
                  {s.value}
                </div>
                <div className="text-xs text-white/50 tracking-widest uppercase mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── ANCESTRAL OPERATING SYSTEM ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              Ancestral Operating System
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
              I didn&apos;t start from zero.<br />
              I started from lineage.
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-2xl mb-12">
              Before the code, before the certifications, before the apps — there were
              the clans. Each one an operating system I run in parallel. Understanding
              where you come from changes how you build.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ANCESTRAL_CLANS.map((clan, i) => (
              <FadeUp key={clan.clan} delay={i * 0.1}>
                <div className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] border border-[#B8860B]/30 rounded-2xl p-8 hover:border-[#C1292E]/50 transition-colors group relative overflow-hidden" style={{ borderRadius: '32px 12px 32px 12px' }}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/10 group-hover:bg-[#C1292E]/15 transition-colors" style={{ borderRadius: '0 12px 0 100%' }} />
                  <div className="text-4xl text-[#B8860B] mb-4 font-display">{clan.symbol}</div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-1">
                    {clan.clan}
                  </h3>
                  <p className="text-[#B8860B] text-xs tracking-widest uppercase mb-4">
                    {clan.origin}
                  </p>
                  <p className="text-[#F5F0E8]/70 leading-relaxed text-sm">{clan.meaning}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/poetry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Read the poetry this lineage produced →
              </Link>
              <Link
                href="/mirembe"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#B8860B]/40 text-[#B8860B] rounded-full font-semibold hover:border-[#B8860B] hover:bg-[#B8860B]/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                See Mirembe Muse
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BIO / STORY ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              The Story
            </p>
            <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-6">
              Business degree.<br />Self-taught engineer.<br />Eight apps.<br />One year.
            </h2>
            <div className="space-y-5 text-[#4A3728] leading-relaxed">
              <p>
                I started on the retail floor of Sportsmans Warehouse at 19, learning how
                real operations work — inventory, people, service, systems. I studied
                Business Management at Nelson Mandela University while working, graduating
                with 15 distinctions across three consecutive qualifications. I managed
                a restaurant. I published a book of poetry. Then in June 2025, I wrote
                my first line of code.
              </p>
              <p>
                One year later: 8 production AI apps, 3 mobile apps, a registered South
                African company, and paying clients. Not demos. Production with payments,
                infrastructure, and real data depending on it working.
              </p>
              <p>
                The degree taught systems thinking. The hospitality work taught operations
                under pressure. The poetry taught how to speak to humans. The code was
                always going to be the third language.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              {/* Photo — coding */}
              <div className="relative w-full h-56 rounded-[24px] overflow-hidden mb-2">
                <Image
                  src="/assets/professional/nanda-coding.jpg"
                  alt="Nanda coding"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 bg-white/60 backdrop-blur-sm rounded-[24px] border border-[#0A1128]/10">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-3">
                  Currently
                </p>
                <ul className="space-y-3 text-[#0A1128]">
                  {[
                    'Running 8+ live apps — JarvisOS (15-wing AI OS), Sanyu Botanicals, AdminOS, VarsityOS, K53, StokvelOS, WatchSankofa, and 3 mobile apps',
                    'Open for select AI consulting — real clients, real outcomes',
                    'Publishing poetry. Launching products. Doing all of it.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-0.5 shrink-0">◆</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-[#0A1128] text-white rounded-[24px]">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-3">
                  Contact
                </p>
                <a
                  href="mailto:hello@creativelynanda.co.za"
                  className="text-white hover:text-[#C1292E] transition-colors font-medium"
                >
                  hello@creativelynanda.co.za
                </a>
                <p className="text-white/50 text-xs mt-2">East London, Eastern Cape, South Africa</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TECH STACK — EDITORIAL GRID ──────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6" style={{ background: '#1A1A1A' }}>
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              Skills & Tools
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              WHAT I BRING
            </h2>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', color: '#C9943A', margin: '0 0 40px 0', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              TO THE TABLE.
            </h2>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {STACK.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.06} className={group.colSpan === 2 ? 'col-span-2' : ''}>
                <div style={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderLeft: `4px solid ${group.accentColor}`,
                  padding: '20px',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: group.accentColor, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 14px 0' }}>
                    {group.category}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {group.skills.map((skill) => {
                      const fillPct = skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : '50%';
                      const fillColor = skill.level === 'Expert' ? group.accentColor : skill.level === 'Advanced' ? '#8A9E7A' : 'rgba(201,168,76,0.4)';
                      return (
                        <div key={skill.name}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                            <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>
                              {skill.name}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: fillColor, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                              {skill.level}
                            </span>
                          </div>
                          {/* Level bar */}
                          <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', width: '100%', marginBottom: '3px' }}>
                            <div style={{ height: '100%', width: fillPct, background: fillColor, transition: 'width 0.6s ease' }} />
                          </div>
                          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '11px', fontStyle: 'italic', color: 'rgba(245,240,232,0.4)', margin: 0 }}>
                            {skill.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* POPIA compliance block */}
          <FadeUp delay={0.3}>
            <div style={{
              borderTop: '1px solid rgba(201,148,58,0.25)',
              paddingTop: '24px',
              marginTop: '60px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                COMPLIANCE
              </span>
              <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', margin: 0, color: 'rgba(245,240,232,0.8)' }}>
                <strong>POPIA Compliant</strong> · Reg. No: <strong>2026-005658</strong> · Registered: 2026-04-03
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', margin: 0 }}>
                Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed 2025-08-28
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PHILOSOPHY & BOOKS ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto relative z-10">

          <FadeUp className="mb-6">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">The Intellectual Foundation</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[0.95]">
              The books that built<br />
              <span className="text-[#C9943A]">the engineer.</span>
            </h2>
          </FadeUp>

          {/* Jim Rohn hero quote */}
          <FadeUp delay={0.1} className="mb-14">
            <div className="bg-white/5 border border-[#C9943A]/25 rounded-2xl p-8 md:p-10">
              <p className="font-mono text-xs tracking-[0.28em] uppercase text-[#C9943A] mb-5">The Philosophy That Changed Everything · Jim Rohn</p>
              <blockquote className="font-display text-3xl md:text-4xl italic text-white leading-[1.2] mb-5">
                &ldquo;Don&apos;t wish it were easier.<br />Wish you were better.&rdquo;
              </blockquote>
              <p className="text-white/60 text-base leading-relaxed max-w-3xl">
                Rohn&apos;s principle that personal development compounds faster than any other investment
                changed the direction of my life. It&apos;s why I studied three degrees while working
                full-time. Why I taught myself to code after midnight shifts. Why I built 8 apps in a year
                without stopping to question whether I was &ldquo;allowed to.&rdquo; Discipline invested
                early pays differently at year five than at month six. Every certification, every app, every
                commit — this is the compound effect made visible.
              </p>
            </div>
          </FadeUp>

          {/* Books grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'The Art of War',
                author: 'Sun Tzu',
                color: '#C1292E',
                impact: 'Every feature I don\'t build is a victory. Every dependency I don\'t add is a strength. Efficiency is strategy — the product that does less, faster, defeats the product that does everything poorly.',
                quote: '"The supreme art of war is to subdue the enemy without fighting."',
                connection: 'AdminOS\'s 15-minute onboarding wasn\'t a marketing feature. It was a strategic one. Remove every obstacle before the user encounters resistance.',
              },
              {
                title: 'In Sheep\'s Clothing',
                author: 'George K. Simon',
                color: '#7B2FBE',
                impact: 'Understanding covert aggression changed how I read every professional relationship. Not to become cynical — to become clear-eyed. You can only build with honesty when you can identify when honesty isn\'t happening.',
                quote: '"The most important thing is being honest about who you are and who the other person is."',
                connection: 'Contracts before code. Scope in writing. These aren\'t defensive behaviors — they\'re how professionals protect the integrity of the work.',
              },
              {
                title: '48 Laws of Power',
                author: 'Robert Greene',
                color: '#C9943A',
                impact: 'Not a manual for manipulation — a map of human nature. As a young Black woman building a company in South Africa, not understanding power structures wouldn\'t have been virtuous. It would have been naive.',
                quote: '"The key to power is the ability to judge who is best able to further your interests in all situations."',
                connection: 'Why Mirembe Muse has proper legal incorporation, POPIA compliance, and professional engagement terms from day one. Structure protects vision.',
              },
              {
                title: 'The Millionaire Next Door',
                author: 'Thomas J. Stanley',
                color: '#2D4A22',
                impact: 'True wealth is built quietly. Not through performance and display — through discipline, frugality, and investing in what produces. This book fundamentally changed how I measure success.',
                quote: '"Whatever your income, always live below your means."',
                connection: 'All Mirembe Muse products are bootstrapped. No investors. No debt. Revenue reinvested into infrastructure. The wealth is in the compound, not the show.',
              },
            ].map((book, i) => (
              <FadeUp key={book.title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors h-full flex flex-col">
                  <div className="h-1 w-full" style={{ backgroundColor: book.color }} />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="font-display text-xl font-bold text-white mb-1">{book.title}</h3>
                      <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: book.color }}>{book.author}</p>
                      <p className="font-display italic text-white/50 text-sm leading-relaxed mb-4">{book.quote}</p>
                    </div>
                    <p className="text-white/65 text-sm leading-relaxed flex-1 mb-4">{book.impact}</p>
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-mono text-xs text-white/35 leading-relaxed"><span style={{ color: book.color }}>→ In practice:</span> {book.connection}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Additional reading note */}
          <FadeUp delay={0.3} className="mt-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 text-center">
              Also formative: The E-Myth Revisited · Think and Grow Rich · The Obstacle Is the Way · Man&apos;s Search for Meaning · The Richest Man in Babylon
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── TIMELINE — "How It Unfolded" ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <FadeUp>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
            The Journey
          </p>
          <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-16">
            How It Unfolded.
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#0A1128]/10" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <FadeUp key={`${item.year}-${i}`} delay={i * 0.05}>
                <div className="flex gap-8">
                  {/* Dot */}
                  <div className="shrink-0 mt-1.5">
                    <div className={`w-6 h-6 rounded-full ${item.dot} ring-4 ring-[#F5EFE6] relative z-10`} />
                  </div>

                  <div
                    className="pb-2 rounded-[24px] p-6 flex-1 relative overflow-hidden"
                    style={{
                      backgroundColor: item.cardBg,
                      border: `1px solid ${item.borderColor}`,
                    }}
                  >
                    {/* Soft grain overlay per card */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="font-display text-sm font-bold tracking-widest uppercase"
                          style={{ color: item.dark ? '#B8860B' : '#B8860B' }}
                        >
                          {item.year}
                        </span>
                        {item.current && (
                          <span className="px-2 py-0.5 bg-[#C1292E]/10 text-[#C1292E] text-xs rounded-full font-medium">
                            Now
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-display text-xl font-bold mb-2"
                        style={{ color: item.dark ? '#F5EFE6' : '#0A1128' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="leading-relaxed text-sm max-w-xl"
                        style={{ color: item.dark ? '#F5EFE6CC' : '#4A3728' }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              Work with Nanda
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let&apos;s build something<br />
              <span className="text-[#C1292E]">worth remembering.</span>
            </h2>
            <p className="text-[#F5F0E8]/60 text-lg mb-10 leading-relaxed">
              Whether you need AI engineering, strategic consulting, or a creative
              partner who understands African markets — the conversation starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                View Consulting Offers
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8] rounded-full font-semibold hover:border-[#C1292E] hover:text-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
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
