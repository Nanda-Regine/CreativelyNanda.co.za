'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ── helpers ──────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const GOLD = '#C9A84C';
const TERRA = '#C4613A';

// ── data ─────────────────────────────────────────────────────────────────────

const SAAS_APPS = [
  {
    slug: 'varsityos',
    name: 'VarsityOS',
    subtitle: 'Campus Compass',
    status: 'Beta',
    problem: '50%+ SA university dropout rate — and zero AI support for it.',
    impact: [
      '300+ active users',
      '6 AI agents covering study, budget, meals, wellness',
      'Crisis detection auto-surfaces SADAG + Lifeline SA helplines',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'PayFast', 'PWA'],
    liveUrl: 'https://campus-compass-phi.vercel.app',
    caseStudy: '/projects/varsityos',
    bg: '#0A1628',
  },
  {
    slug: 'k53-drill-master',
    name: 'K53 Drill Master',
    subtitle: null,
    status: 'Live',
    problem: "60% of South Africans fail their learner's licence — a barrier to employment.",
    impact: [
      '50+ paying subscribers at launch',
      '4.8/5 user rating',
      '600+ questions with SM-2 spaced repetition + isiXhosa support',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayFast'],
    liveUrl: 'https://nanda-k53-drill-master.vercel.app',
    caseStudy: '/projects/k53-drill-master',
    bg: '#1A2E1A',
  },
  {
    slug: 'stokvelos',
    name: 'StokvelOS',
    subtitle: null,
    status: 'Beta',
    problem: 'R50 billion moves through SA stokvels annually — 95% managed on paper.',
    impact: [
      'First AI-native stokvel platform in Africa',
      'AI fraud detection caught 2 discrepancies in beta',
      '100% contribution tracking accuracy vs manual records',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'PayFast'],
    liveUrl: 'https://stokvelos.co.za',
    caseStudy: '/projects/stokvelos',
    bg: '#1A0A05',
  },
  {
    slug: 'adminos',
    name: 'AdminOS',
    subtitle: null,
    status: 'Beta',
    problem: 'SA SMEs pay R11,200/month across fragmented tools — most of which they barely use.',
    impact: [
      '5 specialist AI agents replace 6 separate subscriptions',
      'WhatsApp-native inbox — no app switching',
      'Xero-integrated, PayFast-enabled, load-shedding-aware',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Upstash Redis', '360dialog'],
    liveUrl: 'https://adminos.co.za',
    caseStudy: '/projects/adminos',
    bg: '#0A0A0A',
    featured: true,
    rate: 'From R2,500/month',
  },
  {
    slug: 'watchsankofa',
    name: 'WatchSankofa',
    subtitle: null,
    status: 'Beta',
    problem: 'African creators have no streaming home built for them — only platforms built for Hollywood.',
    impact: [
      '85% revenue share for creators (Netflix pays ~7%)',
      'Flutterwave payouts — Africa-native monetisation',
      'Built on Sankofa principle: reclaiming what was lost',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Cloudinary', 'Flutterwave'],
    liveUrl: 'https://watchsankofa.co.za',
    caseStudy: '/projects/watchsankofa',
    bg: '#2C1810',
  },
  {
    slug: 'sankofasessions',
    name: 'SankofaSessions',
    subtitle: null,
    status: 'Beta',
    problem: 'African entrepreneurs have no dedicated media platform telling their stories.',
    impact: [
      'Standalone media publication + WatchSankofa content pipeline',
      'Features African founders and creators',
      'Builds the media flywheel that feeds the streaming platform',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Substack'],
    liveUrl: 'https://sankofasessions.co.za',
    caseStudy: '/projects/sankofasessions',
    bg: '#1A0A28',
  },
  {
    slug: 'creativelynanda',
    name: 'CreativelyNanda.co.za',
    subtitle: null,
    status: 'Live',
    problem: 'Most developer portfolios are templates. This one is a deployed product.',
    impact: [
      '72 commits — most iterated repo',
      'Multilingual support, AI chatbot, Notion template sales',
      '15% increase in contact form submissions since AI chatbot launch',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Resend', 'PayFast'],
    liveUrl: 'https://creativelynanda.co.za',
    caseStudy: '/projects/creativelynanda',
    bg: '#0A1A28',
  },
];

const CLIENT_WORK: { slug: string; type: string; name: string; problem: string; impact: string[]; deliverable: string; caseStudy: string; caseStudyLabel?: string }[] = [];

const LEARNING = [
  { name: 'True Access', desc: 'Full-stack location-based service platform — first complex app.', stack: ['Supabase', 'Mapbox GL', 'JavaScript'], liveUrl: null, videoUrl: null, cardBg: '#EEF6EE', border: '#3A803A20' },
  { name: 'GreenVault', desc: 'Token-based e-commerce — introduced payment flow concepts.', stack: ['React', 'Node.js', 'PostgreSQL'], liveUrl: null, videoUrl: '/assets/project-screen-record/GreenVault.mp4', cardBg: '#FDF8EE', border: '#B8860B20' },
  { name: 'Cortex Hub', desc: 'Booking system — multi-user state management foundations.', stack: ['React', 'Express', 'SQLite'], liveUrl: null, videoUrl: '/assets/project-screen-record/cortexhub-booking-system.mp4', cardBg: '#EEF2F8', border: '#3B5EA620' },
  { name: 'Netflix Landing', desc: 'Pixel-perfect CSS recreation — design precision training.', stack: ['HTML5', 'CSS3'], liveUrl: null, videoUrl: '/assets/project-screen-record/netflix-clone.mp4', cardBg: '#FDF0F0', border: '#C1292E20' },
  { name: 'YouTube Clone', desc: 'Interface recreation — component thinking and API consumption.', stack: ['React', 'YouTube API'], liveUrl: null, videoUrl: '/assets/project-screen-record/youtube-clone.mp4', cardBg: '#FFF8E8', border: '#C9A84C20' },
  { name: 'Weather App', desc: 'SheCodes-certified. First real API integration and deployment.', stack: ['JavaScript', 'OpenWeather API'], liveUrl: 'https://myweatherapp.vercel.app', videoUrl: null, cardBg: '#EEF0FD', border: '#4B5CC420' },
];

const STATS = [
  { n: '7', label: 'Live AI SaaS Products' },
  { n: 'R300k+', label: 'MRR Target' },
  { n: '36+', label: 'Technologies Used' },
  { n: '400+', label: 'GitHub Commits' },
];

type Filter = 'all' | 'saas' | 'client' | 'learning';

// ── sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const isLive = status === 'Live';
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
      style={{
        backgroundColor: isLive ? '#C9A84C20' : '#FFFFFF20',
        color: isLive ? GOLD : '#FFFFFF99',
        border: `1px solid ${isLive ? '#C9A84C60' : '#FFFFFF30'}`,
        fontFamily: 'var(--font-body, sans-serif)',
      }}
    >
      {status}
    </span>
  );
}

function StackPill({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: '#FFFFFF15',
        border: '1px solid #FFFFFF20',
        color: '#FFFFFFCC',
        fontFamily: 'var(--font-body, sans-serif)',
      }}
    >
      {label}
    </span>
  );
}

function SaaSCard({ app }: { app: typeof SAAS_APPS[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg overflow-hidden flex flex-col"
      style={{ backgroundColor: app.bg, border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="p-7 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className="font-display text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              {app.name}
            </h3>
            {app.subtitle && (
              <p className="text-white/50 text-xs mt-0.5" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
                {app.subtitle}
              </p>
            )}
          </div>
          <StatusBadge status={app.status} />
        </div>

        {/* Problem */}
        <p
          className="text-sm italic mb-5 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body, sans-serif)' }}
        >
          {app.problem}
        </p>

        {/* Impact */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {app.impact.map((line) => (
            <li
              key={line}
              className="text-sm flex items-start gap-2"
              style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>→</span>
              {line}
            </li>
          ))}
        </ul>

        {/* Featured rate */}
        {app.featured && app.rate && (
          <p className="text-sm font-semibold mb-4" style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
            {app.rate}
          </p>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {app.stack.slice(0, 5).map((s) => (
            <StackPill key={s} label={s} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-2 rounded-md transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            style={{
              backgroundColor: GOLD,
              color: '#1A1A1A',
              fontFamily: 'var(--font-body, sans-serif)',
            }}
          >
            Live App ↗
          </a>
          <Link
            href={app.caseStudy}
            className="text-xs font-semibold px-3 py-2 rounded-md transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            style={{
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-body, sans-serif)',
            }}
          >
            Case Study →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ClientCard({ item }: { item: typeof CLIENT_WORK[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg p-7 flex flex-col"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E2DA' }}
    >
      <p
        className="text-xs uppercase tracking-[0.15em] font-semibold mb-3"
        style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
      >
        {item.type}
      </p>
      <h3
        className="font-display text-2xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display, Georgia, serif)', color: '#1A1A1A' }}
      >
        {item.name}
      </h3>
      <p className="text-sm italic mb-5 leading-relaxed" style={{ color: '#6B6B6B' }}>
        {item.problem}
      </p>
      <ul className="space-y-1.5 mb-5 flex-1">
        {item.impact.map((line) => (
          <li key={line} className="text-sm flex items-start gap-2" style={{ color: '#4A4A4A' }}>
            <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>→</span>
            {line}
          </li>
        ))}
      </ul>
      <p className="text-xs mb-5" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
        Deliverable: {item.deliverable}
      </p>
      <Link
        href={item.caseStudy}
        className="text-sm font-medium hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
        style={{ color: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
      >
        {item.caseStudyLabel ?? 'View Case Study →'}
      </Link>
    </motion.div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const showSaaS = filter === 'all' || filter === 'saas';
  const showClient = filter === 'all' || filter === 'client';
  const showLearning = filter === 'all' || filter === 'learning';

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'saas', label: 'AI SaaS' },
    { id: 'client', label: 'Client Work' },
    { id: 'learning', label: 'Learning Projects' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', color: '#1A1A1A' }}>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <FadeUp>
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            7 live products.{' '}
            <span style={{ color: TERRA }}>One founder.</span>
            <br className="hidden md:block" />
            Built from East London, South Africa.
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: '#6B6B6B' }}>
            A complete body of work — from production SaaS platforms serving thousands of users,
            to client systems, to the learning projects that started it all.
          </p>
        </FadeUp>

        {/* Stats bar */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8"
               style={{ borderTop: '1px solid #E5E2DA', borderBottom: '1px solid #E5E2DA' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)', color: TERRA }}
                >
                  {s.n}
                </p>
                <p className="text-xs mt-1 uppercase tracking-[0.12em]" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                style={{
                  backgroundColor: filter === tab.id ? '#1A1A1A' : '#F2F0EB',
                  color: filter === tab.id ? '#FAFAF8' : '#6B6B6B',
                  fontFamily: 'var(--font-body, sans-serif)',
                  border: filter === tab.id ? 'none' : '1px solid #E5E2DA',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── SAAS SECTION ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSaaS && (
          <motion.section
            key="saas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto px-6 pb-20"
          >
            <FadeUp>
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
              >
                Mirembe Muse (Pty) Ltd
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                Seven products. One vision. Africa-first.
              </h2>
              <p className="text-base mb-10 max-w-2xl leading-relaxed" style={{ color: '#6B6B6B' }}>
                Built solo in twelve months. Each product targets a distinct African market failure —
                from student dropout rates to stokvel fraud to SME tool fragmentation.
              </p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-6">
              {SAAS_APPS.map((app) => (
                <SaaSCard key={app.slug} app={app} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── CLIENT WORK ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showClient && (
          <motion.section
            key="client"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto px-6 pb-20"
          >
            <div className="pt-4 pb-8 mb-2" style={{ borderTop: showSaaS ? '1px solid #E5E2DA' : 'none' }}>
              <FadeUp>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  Client Engagements
                </p>
                <h2
                  className="font-display text-3xl md:text-4xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  Real problems. Real businesses. Real results.
                </h2>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {CLIENT_WORK.map((item) => (
                <ClientCard key={item.slug} item={item} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── LEARNING PROJECTS ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLearning && (
          <motion.section
            key="learning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto px-6 pb-20"
            style={{ paddingTop: showSaaS || showClient ? '0' : '0' }}
          >
            <div
              className="pt-10 pb-8"
              style={{ borderTop: (showSaaS || showClient) ? '1px solid #E5E2DA' : 'none' }}
            >
              <FadeUp>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  The Foundation
                </p>
                <h2
                  className="font-display text-3xl md:text-4xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  Where it started.
                </h2>
                <p className="text-sm mb-10 max-w-xl" style={{ color: '#6B6B6B' }}>
                  These projects built the fundamentals that now run in production. Listed for completeness — not as the headline.
                </p>
              </FadeUp>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEARNING.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-5 rounded-lg relative overflow-hidden"
                  style={{ backgroundColor: item.cardBg, border: `1px solid ${item.border}` }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="font-display text-lg font-bold"
                      style={{ fontFamily: 'var(--font-display, Georgia, serif)', color: '#1A1A1A' }}
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] hover:opacity-70 transition-opacity"
                          style={{ color: TERRA, fontFamily: 'var(--font-body, sans-serif)' }}
                          title="Watch screen recording"
                        >
                          ▶ Demo
                        </a>
                      )}
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] hover:opacity-70 transition-opacity"
                          style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: '#6B6B6B' }}>
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: '#FAFAF8',
                          border: '1px solid #D4D0C8',
                          color: '#6B6B6B',
                          fontFamily: 'var(--font-body, sans-serif)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <FadeUp>
        <section
          className="max-w-6xl mx-auto px-6 py-20 text-center"
          style={{ borderTop: '1px solid #E5E2DA' }}
        >
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Have a project that needs this kind of thinking?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
            I take select client engagements alongside building Mirembe Muse. If you have a real
            problem and a serious brief, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consulting"
              className="px-7 py-3.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4613A]"
              style={{
                backgroundColor: TERRA,
                color: '#FAFAF8',
                fontFamily: 'var(--font-body, sans-serif)',
              }}
            >
              View Consulting Offers →
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
              style={{
                border: '1px solid #D4D0C8',
                color: '#1A1A1A',
                fontFamily: 'var(--font-body, sans-serif)',
              }}
            >
              Send a Brief →
            </Link>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
