'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterKey = 'saas' | 'origin' | 'client';

interface ProjectCard {
  slug: string;
  name: string;
  tagline?: string;
  status: 'Live' | 'Beta' | 'Complete';
  problem: string;
  impact: string[];
  hardThing?: string;
  metrics?: { label: string; value: string }[];
  stack: string[];
  liveUrl: string | null;
  liveLabel?: string;
  liveInternal?: boolean;
  bg: string;
  accent: string;
  category: FilterKey;
  shecodes?: boolean;
  featured?: boolean;
  rate?: string;
  githubUrl?: string | null;
}

// ── Project Data ───────────────────────────────────────────────────────────────

const PROJECTS: ProjectCard[] = [

  // ── AI SaaS ─────────────────────────────────────────────────────────────────

  {
    slug: 'jarvisos',
    name: 'JarvisOS',
    tagline: 'A 15-wing personal AI operating system. The most complex thing I\'ve built.',
    status: 'Live',
    problem: 'Running 8 products, creative work, health, and personal growth with disconnected tools creates catastrophic cognitive overhead. Every context switch costs execution.',
    impact: [
      '15 interconnected intelligence wings — CEO, Finance, Corpus RAG, Cycle, Body, Sanyu, Crisis/Sankofa, and 8 more',
      '1,194 personal knowledge chunks indexed via Upstash Vector — Corpus wing answers questions from your own documents',
      'Redis inter-wing signal protocol: 15 wings publish/subscribe without direct coupling — distributed architecture on a personal OS',
    ],
    hardThing: 'Redis pub/sub so 15 wings communicate without direct coupling — and a crisis detection system that routes to SADAG before anything else fires.',
    metrics: [
      { label: 'Intelligence wings', value: '15' },
      { label: 'RAG knowledge chunks', value: '1,194' },
      { label: 'AI cost reduction', value: '85%' },
      { label: 'SA languages', value: '11' },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Claude Sonnet + Haiku', 'Upstash Vector', 'Upstash Redis', 'Inngest', 'Supabase', 'PWA (offline-first)'],
    githubUrl: 'https://github.com/Nanda-Regine/JarvisOS',
    bg: '#0D0520',
    accent: '#7B2FBE',
    featured: true,
    category: 'saas',
  },
  {
    slug: 'adminos',
    name: 'AdminOS',
    tagline: 'Six specialist AI agents. One operating system. Built for South African SMEs.',
    status: 'Beta',
    problem: 'SA SMEs pay R11,200/month across fragmented tools — most of which they barely use.',
    impact: [
      '6 specialist AI agents: Alex (inbox), Chase (debt recovery), Care (wellness), Doc (documents), Insight (analytics), Pen (email)',
      'Per-tenant ZAR token budgets with hourly spike detection — AI cost controls built in from day one',
      'WhatsApp-native inbox, Xero accounting, load-shedding-aware PWA, companion React Native app',
    ],
    hardThing: 'Two Supabase clients in one codebase — the wrong one leaks cross-tenant data. UPDATE and DELETE revoked on the audit log at database privilege level.',
    metrics: [
      { label: 'AI agents', value: '6' },
      { label: 'Inngest functions', value: '25' },
      { label: 'Pricing', value: 'R2,500–R14,999' },
      { label: 'API routes', value: '60+' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Claude Sonnet + Haiku', 'Supabase', 'Inngest', 'Upstash Redis', 'Meta WhatsApp API', 'PayFast', 'Xero'],
    liveUrl: 'https://adminos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/AdminOS',
    bg: '#0A0A0A',
    accent: '#C9A84C',
    featured: true,
    rate: 'From R2,500/month',
    category: 'saas',
  },
  {
    slug: 'campus-compass',
    name: 'VarsityOS',
    status: 'Beta',
    problem: '50%+ SA university dropout rate — and zero AI support for it.',
    impact: [
      'Nova AI with two-block prompt caching — 8K token static SA student knowledge cached separately from live student context',
      'Crisis detection overrides rate limiting entirely — no quota ever delays a student in distress',
      '40+ route modules: budget, bursaries, career, meals, sleep, study groups, stokvel, tax, wellness',
    ],
    hardThing: 'Crisis detection runs before rate limiting and overrides it. No emergency was ever delayed by a quota.',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Claude Sonnet', 'Arcjet', 'Upstash Redis', 'PayFast', 'PWA', 'TWA (Play Store)'],
    liveUrl: 'https://campus-compass-phi.vercel.app',
    bg: '#0A1628',
    accent: '#4A90D9',
    category: 'saas',
  },
  {
    slug: 'k53-drill-master',
    name: 'K53 Drill Master',
    status: 'Live',
    problem: "60% of South Africans fail their learner's licence — a barrier to employment.",
    impact: [
      '11 game modes including SM-2 spaced repetition targeting weak spots — same algorithm as Anki',
      '395 road sign images extracted from official 2024 government PDFs via pdfjs-dist',
      '180KB gzipped JS, sub-3.2s TTI on MTN 3G — isiXhosa support built without a library (40KB saved)',
    ],
    hardThing: 'A routerless state machine as a security primitive — premium content that cannot be URL-scraped because the URL never encodes game state.',
    stack: ['React 18', 'Vite 5', 'Supabase', 'PayFast', 'SM-2 algorithm', 'pdfjs-dist', 'PWA', 'OpenAI GPT-4o-mini'],
    liveUrl: 'https://nanda-k53-drill-master.vercel.app',
    bg: '#1A2E1A',
    accent: '#52C41A',
    category: 'saas',
  },
  {
    slug: 'sanyu-botanicals',
    name: 'Sanyu Botanicals',
    status: 'Live',
    problem: 'African women carry generations of botanical knowledge their grandmothers trusted. The products that exist either ignore it or price it in USD.',
    impact: [
      'Ancestral hair care brand rooted in 5 clan lineages — Nsenene, Hlubi, Msimanga, Thabizolo, Tshawe',
      'Claude-powered hair consultation engine + private AI hair journal (Angel loyalty members only)',
      'Angel loyalty programme: Seed → Bloom → Royal Angel — physical QR card unlocks digital AI journal',
    ],
    hardThing: 'Physical-digital loyalty architecture — a QR card in the real world that unlocks a private AI-powered journal in the digital one.',
    stack: ['Next.js 14', 'TypeScript', 'Claude Sonnet + Haiku', 'PayFast', 'Supabase', 'Cloudinary', 'Resend'],
    liveUrl: 'https://sanyubotanicals.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/sanyu-botanicals',
    bg: '#130008',
    accent: '#C41E5A',
    category: 'saas',
  },
  {
    slug: 'stokvel-os',
    name: 'StokvelOS',
    status: 'Beta',
    problem: 'R11 billion moves through SA stokvels annually — 95% managed on paper.',
    impact: [
      'First AI-native stokvel management platform in Africa',
      'AI fraud detection flagged 2 financial discrepancies in beta that manual records missed',
      '100% contribution tracking accuracy vs. manual records',
    ],
    hardThing: 'Digitising the R11B stokvel market requires building for oral-tradition trust — fraud detection that respects community dynamics, not just flags them.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI GPT-4o-mini', 'PayFast'],
    liveUrl: '/upgrades?app=stokvelos',
    liveLabel: 'Upgrading →',
    liveInternal: true,
    bg: '#1A0A05',
    accent: '#C4613A',
    category: 'saas',
  },
  {
    slug: 'watchsankofa',
    name: 'WatchSankofa',
    status: 'Beta',
    problem: 'African creators have no streaming home built for them — only platforms built for Hollywood.',
    impact: [
      '85% revenue share for creators — Netflix pays ~7%',
      'Flutterwave payouts — Africa-native monetisation, no Stripe required',
      'Built on the Sankofa principle: what was lost can be reclaimed',
    ],
    hardThing: '85% revenue share when Netflix pays 7% — the architecture reflects the principle, not just the feature set.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Cloudinary', 'Flutterwave'],
    liveUrl: '/upgrades?app=watchsankofa',
    liveLabel: 'Upgrading →',
    liveInternal: true,
    bg: '#2C1810',
    accent: '#FF8C42',
    category: 'saas',
  },
  {
    slug: 'sankofasessions',
    name: 'SankofaSessions',
    status: 'Beta',
    problem: 'African entrepreneurs have no dedicated media platform telling their stories.',
    impact: [
      'Standalone editorial publication + WatchSankofa content pipeline',
      'Features African founders, creators, and builders',
      'The media flywheel that feeds the streaming platform',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Substack'],
    liveUrl: '/upgrades?app=sankofasessions',
    liveLabel: 'Upgrading →',
    liveInternal: true,
    bg: '#1A0A28',
    accent: '#9B59B6',
    category: 'saas',
  },
  {
    slug: 'creativelynanda',
    name: 'CreativelyNanda.co.za',
    status: 'Live',
    problem: 'Most developer portfolios are templates. This one is a deployed, revenue-generating product.',
    impact: [
      '100+ commits — most iterated repo in the portfolio',
      'Multilingual blog, AI chatbot, Notion template sales, poetry section, PayFast checkout',
      'Also serves as the PayFast universal payment hub routing ITN webhooks for 6 Mirembe Muse apps',
    ],
    hardThing: 'Also the PayFast universal payment hub for 6 other apps — one ITN webhook reads the m_payment_id prefix to route payments across the entire portfolio.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Resend', 'PayFast'],
    liveUrl: 'https://creativelynanda.co.za',
    bg: '#0A1A28',
    accent: '#C1292E',
    category: 'saas',
  },

  // ── Where It Started ─────────────────────────────────────────────────────────

  {
    slug: 'poetry-tube',
    name: 'PoetryTube',
    status: 'Beta',
    problem: "YouTube's algorithm has no concept of African spoken word poetry.",
    impact: [
      'Language-first discovery — isiZulu, Sesotho, Luganda as search filters',
      'Live applause via Supabase Realtime — zero polling, collective experience',
      'Built by a published poet who has lived the exact problem',
    ],
    hardThing: 'Live applause via Supabase Realtime — collective, simultaneous, zero polling.',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Mux', 'Tailwind CSS'],
    liveUrl: 'https://poetry-tube.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/PoetryTube',
    bg: '#0D0A1A',
    accent: '#7C3AED',
    category: 'origin',
  },
  {
    slug: 'cortex-hub',
    name: 'Cortex Hub Booking',
    status: 'Live',
    problem: 'SA creative hubs run on WhatsApp and paper booking registers — double bookings, lost revenue.',
    impact: [
      'PostgreSQL tsrange overlap logic — database enforces zero double-bookings, not application layer',
      'First PayFast ITN webhook implementation in the portfolio',
      'Direct architectural ancestor of the AdminOS booking system',
    ],
    hardThing: 'PostgreSQL tsrange overlap logic — the database enforces zero double-bookings, not the application layer.',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'PayFast', 'Resend', 'Tailwind CSS'],
    liveUrl: 'https://cortex-hub-booking-5e35.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/Cortex-Hub-Booking',
    bg: '#0A1520',
    accent: '#3B82F6',
    category: 'origin',
  },
  {
    slug: 'green-vault',
    name: 'GreenVault eCommerce',
    status: 'Live',
    problem: 'SA sustainable products are scattered across informal sellers and Instagram pages.',
    impact: [
      'Full PayFast ITN + signed Supabase Storage download flow — time-limited URLs, no permanent links',
      'Earth-toned design system that became the Mirembe Muse brand palette',
      'Complete eCommerce data model: cart → order → payment → fulfillment',
    ],
    hardThing: 'Signed Supabase Storage download URLs that expire after delivery — no permanent download links, no piracy surface.',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'PayFast', 'Resend', 'Tailwind CSS'],
    liveUrl: 'https://green-valut-e-commerce-store-demo.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo',
    bg: '#061A06',
    accent: '#4ADE80',
    category: 'origin',
  },
  {
    slug: 'youtube-clone',
    name: 'YouTube Clone',
    status: 'Complete',
    problem: 'Before building WatchSankofa, you have to understand what you\'re improving upon.',
    impact: [
      'Full YouTube UI in raw HTML/CSS — no framework, no API, no shortcuts',
      'Custom @CreativelyNanda thumbnails: poetry, code, lookbook, identity',
      'Built July 13, 2025 — the very first project. The foundation of everything.',
    ],
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'CSS Grid', 'Flexbox'],
    liveUrl: null,
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda-Youtube-clone',
    bg: '#1C1200',
    accent: '#FBBF24',
    shecodes: true,
    category: 'origin',
  },
  {
    slug: 'weather-app',
    name: 'MoodCast Weather App',
    status: 'Live',
    problem: 'Weather apps give you data. What does a published poet build when she gets a weather brief?',
    impact: [
      'Original poems for every weather condition — rain, sun, wind, clouds, storms',
      'South Africa load shedding mood card — the most shared feature in testing',
      'First live API integration — SheCodes Plus certified',
    ],
    hardThing: 'A weather app that generates original poems — every condition has a poem written by a published poet who has lived each one.',
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'OpenWeatherMap API', 'Geolocation API'],
    liveUrl: 'https://my-weather-app-rho-lyart.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/my-weather-app',
    bg: '#150A20',
    accent: '#A78BFA',
    shecodes: true,
    category: 'origin',
  },
  {
    slug: 'netflix-clone',
    name: 'Netflix Landing',
    status: 'Complete',
    problem: 'Design precision training — can you recreate pixel-perfect what you see?',
    impact: [
      'Pixel-perfect Netflix UI in pure CSS — no frameworks',
      'CSS Grid + Flexbox mastery under constraint',
      'SheCodes Plus certified',
    ],
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    liveUrl: null,
    githubUrl: null,
    bg: '#1A0000',
    accent: '#EF4444',
    shecodes: true,
    category: 'origin',
  },

  // ── Client Work ──────────────────────────────────────────────────────────────

  {
    slug: 'true-access-app',
    name: 'True Access',
    status: 'Live',
    problem: '4.2M South Africans with disabilities have no verified, real-world accessibility database for public spaces.',
    impact: [
      "SA's first disability accessibility mapping platform — Expo iOS + Android + Web from one codebase",
      'SANS 10400-S compliance scoring + B2B flywheel: audit → gap analysis → sell compliance products → featured listing',
      '7 full phases in 2 days: maps, audits, profiles, business portal, shop, Paystack, offline mode + GeoJSON data export API',
    ],
    hardThing: 'SANS 10400-S audit checklists that feed a B2B revenue flywheel — the audit doesn\'t just score compliance, it sells the fix.',
    stack: ['Expo SDK 52', 'TypeScript', 'Mapbox', 'Supabase', 'NativeWind', 'Paystack', 'TanStack Query v5'],
    liveUrl: 'https://true-access-app.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/TrueAccApp',
    bg: '#001812',
    accent: '#10B981',
    featured: true,
    rate: 'Co-Founded',
    category: 'client',
  },
  {
    slug: 'womens-retreat',
    name: "Women's Retreat — Yellowwood Forest",
    status: 'Live',
    problem: 'Wellness retreats need digital presence that does emotional work, not just lists prices.',
    impact: [
      'Forest-first design: atmosphere before CTA',
      'First lesson: design is an argument about the relationship between brand and visitor',
    ],
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    liveUrl: 'https://women-retreat-yellowwood-forest.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/women-retreat-yellowwood-forest',
    bg: '#061A0F',
    accent: '#6EE7B7',
    category: 'client',
  },
  {
    slug: 'carpentry-business',
    name: 'Carpentry Business — Client',
    status: 'Live',
    problem: 'SA trade businesses are exceptional at their craft and invisible online.',
    impact: [
      'Portfolio-forward: the work goes above the fold',
      'WhatsApp deep link CTA — the SA UX conversion pattern',
      'Zero dependencies — static site that works for 5 years without maintenance',
    ],
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    liveUrl: 'https://carpentary-os-demo.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/carpentart-os-demo',
    bg: '#1A0D00',
    accent: '#D97706',
    category: 'client',
  },
  {
    slug: 'chanty-shuttle',
    name: 'Shuttle Service — Client',
    status: 'Live',
    problem: 'Transport operators compete on price because they can\'t compete on digital perception.',
    impact: [
      'R34,000 Growth Package delivered',
      'Tiered service model: Growth Package → Vision Package',
      'Affiliate marketing architecture: the seed of AdminOS\'s referral system',
    ],
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    liveUrl: 'https://transport-shuttle-os.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/Transport-shuttle-os',
    bg: '#0A0E1A',
    accent: '#60A5FA',
    category: 'client',
  },
];

// ── Filter config ─────────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'saas', label: 'AI SaaS' },
  { key: 'origin', label: 'Where It Started' },
  { key: 'client', label: 'Client Work' },
];

const SECTION_LABELS: Record<FilterKey, string> = {
  saas: 'Mirembe Muse (Pty) Ltd',
  origin: 'Foundation Projects · The Education',
  client: 'Client Work',
};

// ── Tech Evolution ────────────────────────────────────────────────────────────

const TECH_EVOLUTION = [
  { date: 'Jul 2025', tech: 'HTML · CSS · JS', milestone: 'First line of code', projects: 'YouTube Clone, MoodCast' },
  { date: 'Sep 2025', tech: 'Next.js · TypeScript · Supabase · PayFast', milestone: 'First production app', projects: 'Cortex Hub, GreenVault' },
  { date: 'Oct 2025', tech: 'Mapbox · PostGIS · Complex architecture', milestone: 'Geospatial + real users', projects: 'True Access v1, PoetryTube' },
  { date: 'Jan 2026', tech: 'Claude API · Multi-agent · Prompt caching', milestone: 'AI engineering begins', projects: 'VarsityOS, StokvelOS' },
  { date: 'Mar 2026', tech: 'Inngest · Redis · WhatsApp API · RLS at scale', milestone: 'Enterprise architecture', projects: 'AdminOS, K53, WatchSankofa' },
  { date: 'Jun 2026', tech: 'Expo SDK 52 · RAG · Redis signal protocol · iOS/Android', milestone: '15-wing OS + mobile co-founder', projects: 'JarvisOS, Sanyu, True Access v2' },
];

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProjectCard['status'] }) {
  const map = {
    Live: { bg: 'rgba(82,196,26,0.12)', color: '#52C41A', border: 'rgba(82,196,26,0.3)' },
    Beta: { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: 'rgba(201,168,76,0.3)' },
    Complete: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: 'rgba(255,255,255,0.12)' },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em',
      padding: '3px 9px', borderRadius: '3px', textTransform: 'uppercase' as const, flexShrink: 0,
    }}>
      {status}
    </span>
  );
}

// ── Featured Project Card ─────────────────────────────────────────────────────

function FeaturedProjectCard({ p, index }: { p: ProjectCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      style={{
        background: p.bg,
        borderRadius: '4px',
        overflow: 'hidden',
        border: `1px solid ${p.accent}25`,
        borderTop: `3px solid ${p.accent}`,
        position: 'relative',
        marginBottom: '16px',
      }}
    >
      {/* Subtle accent glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '300px', height: '300px',
        background: `radial-gradient(circle at top right, ${p.accent}18 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '32px 28px 28px', position: 'relative', zIndex: 1 }}>

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
          <StatusBadge status={p.status} />
          <span style={{
            background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}40`,
            fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.25em',
            padding: '3px 10px', borderRadius: '3px', textTransform: 'uppercase' as const,
          }}>
            Featured Build
          </span>
          {p.rate && (
            <span style={{ color: p.accent, fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', opacity: 0.8 }}>
              {p.rate}
            </span>
          )}
        </div>

        {/* Two-column layout on wider screens — name/copy left, metrics right */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">

          {/* Left: copy */}
          <div className="flex-1 min-w-0">
            <h3 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px', lineHeight: 1.05,
            }}>
              {p.name}
            </h3>
            {p.tagline && (
              <p style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '13px', fontStyle: 'italic', color: p.accent, margin: '0 0 16px', lineHeight: 1.5,
              }}>
                {p.tagline}
              </p>
            )}
            <p style={{
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', margin: '0 0 18px', lineHeight: 1.7,
            }}>
              {p.problem}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {p.impact.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: p.accent, flexShrink: 0, fontSize: '12px', marginTop: '1px', lineHeight: 1.6 }}>→</span>
                  <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Hard thing block */}
            {p.hardThing && (
              <div style={{
                borderLeft: `3px solid ${p.accent}`, paddingLeft: '14px', marginBottom: '20px',
                background: `${p.accent}08`, padding: '10px 14px', borderRadius: '0 4px 4px 0',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: p.accent,
                  letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 4px',
                }}>
                  The hard thing
                </p>
                <p style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6,
                }}>
                  {p.hardThing}
                </p>
              </div>
            )}

            {/* Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '5px', marginBottom: '22px' }}>
              {p.stack.map((tech) => (
                <span key={tech} style={{
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)',
                  fontSize: '9px', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '3px',
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
              {p.liveUrl && (
                p.liveInternal ? (
                  <Link href={p.liveUrl} style={{
                    display: 'inline-block', background: p.accent, color: '#0A0A0A',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                    fontWeight: 600, padding: '9px 18px', borderRadius: '3px', textDecoration: 'none',
                  }}>
                    {p.liveLabel ?? 'Live App ↗'}
                  </Link>
                ) : (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: p.accent, color: '#0A0A0A',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                    fontWeight: 600, padding: '9px 18px', borderRadius: '3px', textDecoration: 'none',
                  }}>
                    {p.liveLabel ?? 'Live App ↗'}
                  </a>
                )
              )}
              <Link href={`/projects/${p.slug}`} style={{
                display: 'inline-block', border: `1px solid ${p.accent}50`, color: p.accent,
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                padding: '8px 16px', borderRadius: '3px', textDecoration: 'none',
              }}>
                Case Study →
              </Link>
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                }}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {/* Right: metrics grid — 4-across on mobile, 2×2 on xl */}
          {p.metrics && (
            <div className="grid grid-cols-4 xl:grid-cols-2 gap-px w-full xl:w-auto xl:min-w-[200px] flex-shrink-0">
              {p.metrics.map((m) => (
                <div key={m.label} style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.accent}20`,
                  padding: '10px 12px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-bebas, Georgia, serif)', fontSize: '26px',
                    color: p.accent, lineHeight: 1, letterSpacing: '0.02em',
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '8px',
                    color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const, marginTop: '4px',
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Standard Project Card ─────────────────────────────────────────────────────

function StandardProjectCard({ p, index }: { p: ProjectCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      style={{
        background: p.bg, borderRadius: '4px', overflow: 'hidden',
        border: `1px solid ${p.accent}18`, borderLeft: `4px solid ${p.accent}`,
        position: 'relative',
      }}
    >
      {p.featured && (
        <div style={{
          position: 'absolute', top: 0, right: 0, background: p.accent, color: '#0A0A0A',
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.2em',
          padding: '4px 12px', textTransform: 'uppercase' as const,
        }}>
          FEATURED
        </div>
      )}
      <div style={{ padding: '24px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' as const }}>
          <StatusBadge status={p.status} />
          {p.shecodes && (
            <span style={{
              background: 'rgba(251,191,36,0.12)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)',
              fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.15em',
              padding: '3px 8px', borderRadius: '3px',
            }}>
              SheCodes Plus ✓
            </span>
          )}
          {p.rate && (
            <span style={{ color: p.accent, fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', opacity: 0.8 }}>
              {p.rate}
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(20px, 2.5vw, 26px)',
          fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', lineHeight: 1.1,
        }}>
          {p.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)',
          margin: '0 0 14px', lineHeight: 1.6,
        }}>
          {p.problem}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
          {p.impact.map((item) => (
            <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: p.accent, flexShrink: 0, fontSize: '12px', marginTop: '1px', lineHeight: 1.5 }}>→</span>
              <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Hard thing */}
        {p.hardThing && (
          <div style={{
            borderLeft: `2px solid ${p.accent}60`, paddingLeft: '10px', marginBottom: '14px',
          }}>
            <p style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: '12px', fontStyle: 'italic', color: `${p.accent}CC`, margin: 0, lineHeight: 1.55,
            }}>
              → The hard thing: {p.hardThing}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '5px', marginBottom: '18px' }}>
          {p.stack.map((tech) => (
            <span key={tech} style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)',
              fontSize: '9px', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '3px',
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
          {p.liveUrl && (
            p.liveInternal ? (
              <Link href={p.liveUrl} style={{
                display: 'inline-block', background: p.accent, color: '#0A0A0A',
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                fontWeight: 600, padding: '8px 16px', borderRadius: '3px', textDecoration: 'none',
              }}>
                {p.liveLabel ?? 'Live App ↗'}
              </Link>
            ) : (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', background: p.accent, color: '#0A0A0A',
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                fontWeight: 600, padding: '8px 16px', borderRadius: '3px', textDecoration: 'none',
              }}>
                {p.liveLabel ?? 'Live Demo ↗'}
              </a>
            )
          )}
          <Link href={`/projects/${p.slug}`} style={{
            display: 'inline-block', border: `1px solid ${p.accent}50`, color: p.accent,
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
            padding: '7px 15px', borderRadius: '3px', textDecoration: 'none',
          }}>
            Case Study →
          </Link>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
            }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Origin Timeline Card ──────────────────────────────────────────────────────

function OriginCard({ p, index }: { p: ProjectCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      style={{
        background: p.bg, borderRadius: '4px', overflow: 'hidden',
        border: `1px solid ${p.accent}20`, borderTop: `3px solid ${p.accent}`,
        minWidth: '260px', maxWidth: '280px', flexShrink: 0,
      }}
    >
      <div style={{ padding: '18px 18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' as const }}>
          <StatusBadge status={p.status} />
          {p.shecodes && (
            <span style={{
              background: 'rgba(251,191,36,0.12)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)',
              fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.15em',
              padding: '2px 7px', borderRadius: '3px',
            }}>
              SheCodes ✓
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px', lineHeight: 1.15,
        }}>
          {p.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px', lineHeight: 1.55,
        }}>
          {p.impact[0]}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginBottom: '14px' }}>
          {p.stack.slice(0, 4).map((tech) => (
            <span key={tech} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)',
              fontSize: '8px', padding: '2px 6px', borderRadius: '3px',
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {p.liveUrl && !p.liveInternal && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
              background: p.accent, color: '#0A0A0A', fontFamily: 'var(--font-mono)',
              fontSize: '9px', letterSpacing: '0.12em', fontWeight: 600,
              padding: '6px 12px', borderRadius: '3px', textDecoration: 'none',
            }}>
              View ↗
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
            }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section Group ─────────────────────────────────────────────────────────────

function SectionGroup({ category, projects }: { category: FilterKey; projects: ProjectCard[] }) {
  if (projects.length === 0) return null;

  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <div style={{ marginBottom: '56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em',
          color: '#C9943A', textTransform: 'uppercase' as const,
        }}>
          {SECTION_LABELS[category]}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(201,148,58,0.15)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.2em',
          color: 'rgba(201,148,58,0.4)', textTransform: 'uppercase' as const,
        }}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      {/* Featured cards — full width */}
      {featured.length > 0 && (
        <div style={{ marginBottom: regular.length > 0 ? '20px' : 0 }}>
          {featured.map((p, i) => (
            <FeaturedProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      )}

      {/* Regular grid — 2 columns */}
      {regular.length > 0 && (
        category === 'origin' ? (
          // Horizontal scroll timeline for origin
          <div style={{
            display: 'flex', gap: '12px',
            overflowX: 'auto', paddingBottom: '12px',
            scrollbarWidth: 'thin' as const,
          }}>
            {regular.map((p, i) => (
              <OriginCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regular.map((p, i) => (
              <StandardProjectCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

// ── Tech Evolution Bar ────────────────────────────────────────────────────────

function TechEvolutionBar() {
  return (
    <section style={{
      background: '#0A1128', padding: '48px 24px 52px',
      borderTop: '1px solid rgba(201,148,58,0.15)',
    }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em',
            color: '#C9943A', textTransform: 'uppercase' as const,
          }}>
            The Technology Arc
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,148,58,0.15)' }} />
          <span style={{
            fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '12px',
            fontStyle: 'italic', color: 'rgba(245,241,232,0.35)',
          }}>
            One year. Zero to 15-wing AI OS.
          </span>
        </div>

        <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: '8px' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: '18px', left: '18px', right: '18px', height: '1px',
            background: 'linear-gradient(to right, rgba(201,148,58,0.6), rgba(123,47,190,0.6))',
            zIndex: 0,
          }} />

          <div style={{ display: 'flex', gap: '0', minWidth: 'max-content', position: 'relative', zIndex: 1 }}>
            {TECH_EVOLUTION.map((step, i) => (
              <div key={i} style={{ flex: 1, minWidth: '160px', paddingRight: '12px' }}>
                {/* Node */}
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: i === TECH_EVOLUTION.length - 1 ? '#7B2FBE' : '#C9943A',
                  border: '2px solid #0A1128',
                  marginBottom: '14px',
                  boxShadow: i === TECH_EVOLUTION.length - 1 ? '0 0 8px #7B2FBE' : '0 0 6px #C9943A',
                }} />
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A',
                  letterSpacing: '0.15em', margin: '0 0 6px', textTransform: 'uppercase' as const,
                }}>
                  {step.date}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '11px',
                  color: 'rgba(245,241,232,0.75)', margin: '0 0 4px', lineHeight: 1.4,
                }}>
                  {step.tech}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '8px',
                  color: 'rgba(245,241,232,0.3)', margin: '0 0 4px', letterSpacing: '0.05em',
                }}>
                  {step.milestone}
                </p>
                <p style={{
                  fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '10px',
                  fontStyle: 'italic', color: 'rgba(201,148,58,0.5)', margin: 0,
                }}>
                  {step.projects}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey | 'all'>('all');

  const saasProjects = PROJECTS.filter((p) => p.category === 'saas');
  const originProjects = PROJECTS.filter((p) => p.category === 'origin');
  const clientProjects = PROJECTS.filter((p) => p.category === 'client');

  const filteredSaas = activeFilter === 'all' || activeFilter === 'saas' ? saasProjects : [];
  const filteredOrigin = activeFilter === 'all' || activeFilter === 'origin' ? originProjects : [];
  const filteredClient = activeFilter === 'all' || activeFilter === 'client' ? clientProjects : [];

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8' }}>

      {/* ── EDITORIAL HEADER ── */}
      <section style={{
        background: '#1a1a2e', padding: '80px 24px 52px',
        borderBottom: '1px solid rgba(201,148,58,0.2)',
      }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A',
              letterSpacing: '0.35em', textTransform: 'uppercase' as const, margin: '0 0 18px',
            }}>
              Mirembe Muse (Pty) Ltd · Project Portfolio
            </p>

            <h1 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(52px, 9vw, 96px)',
              fontWeight: 700, color: '#F5F1E8', lineHeight: 0.95,
              letterSpacing: '-0.01em', margin: '0 0 20px',
            }}>
              Projects
            </h1>

            <p style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(16px, 1.8vw, 20px)', fontStyle: 'italic',
              color: 'rgba(245,241,232,0.65)', margin: '0 0 36px',
              maxWidth: '640px', lineHeight: 1.55,
            }}>
              Eight applications. One woman. One year. Africa&apos;s tech infrastructure, built from KuGompo City.
            </p>

            {/* Stats bar */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' as const }}>
              {[
                { v: '18+', l: 'Portfolio Projects' },
                { v: '8+', l: 'Live Apps' },
                { v: '3,000+', l: 'GitHub Commits' },
                { v: '1 Year', l: 'Zero → Production' },
              ].map(({ v, l }, i) => (
                <div key={l} style={{
                  padding: 'clamp(10px, 2vw, 16px) clamp(12px, 3vw, 28px)',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-bebas, Georgia, serif)', fontSize: '28px',
                    color: '#C9943A', lineHeight: 1, letterSpacing: '0.03em',
                  }}>{v}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '8px',
                    color: 'rgba(245,241,232,0.4)', letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const, marginTop: '4px',
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid rgba(26,26,46,0.08)',
        padding: '0 24px', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' as const }}>
          {FILTERS.map(({ key, label }) => {
            const active = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const, padding: '16px 20px',
                  cursor: 'pointer', border: 'none',
                  borderBottom: active ? '2px solid #1a1a2e' : '2px solid transparent',
                  background: 'none', color: active ? '#1a1a2e' : 'rgba(26,26,46,0.45)',
                  fontWeight: active ? 600 : 400, transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PROJECT SECTIONS ── */}
      <section style={{ padding: '48px 24px 32px', maxWidth: '1160px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SectionGroup category="saas" projects={filteredSaas} />
            <SectionGroup category="origin" projects={filteredOrigin} />
            <SectionGroup category="client" projects={filteredClient} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── TECH EVOLUTION BAR ── */}
      {(activeFilter === 'all' || activeFilter === 'origin') && <TechEvolutionBar />}

      {/* ── POPIA BADGE ── */}
      <section style={{ padding: '24px 24px 60px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{
          padding: '16px 20px', border: '1px solid rgba(201,148,58,0.25)',
          background: 'rgba(201,148,58,0.03)', borderRadius: '3px',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A',
            letterSpacing: '0.3em', margin: '0 0 4px',
          }}>
            COMPLIANCE NOTICE
          </p>
          <p style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '12px',
            color: 'rgba(26,26,46,0.7)', margin: '0 0 3px',
          }}>
            <strong>POPIA Compliant</strong> · Registration No: 2026-005658 · Date: 2026-04-03
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', margin: 0,
          }}>
            Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed: 2025-08-28
          </p>
        </div>
      </section>

    </main>
  );
}
