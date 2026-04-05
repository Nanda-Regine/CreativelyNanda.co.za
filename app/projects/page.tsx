'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'saas' | 'origin' | 'client';

interface ProjectCard {
  slug: string;
  name: string;
  status: 'Live' | 'Beta' | 'Complete';
  problem: string;
  impact: string[];
  stack: string[];
  liveUrl: string | null;
  liveLabel?: string; // override button text
  liveInternal?: boolean; // true = use Link not <a>
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
  // ── AI SaaS ──────────────────────────────────────────────────────────────────
  {
    slug: 'campus-compass',
    name: 'VarsityOS',
    status: 'Beta',
    problem: '50%+ SA university dropout rate — and zero AI support for it.',
    impact: [
      '6 AI agents: study, budget, meals, wellness, registration, crisis',
      '6 AI agents covering study, budget, meals, wellness',
      'Crisis detection auto-surfaces SADAG + Lifeline SA helplines',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Claude API', 'PayFast', 'PWA'],
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
      '50+ paying subscribers at launch',
      '4.8/5 user rating',
      '600+ questions with SM-2 spaced repetition + isiXhosa support',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayFast'],
    liveUrl: 'https://nanda-k53-drill-master.vercel.app',
    bg: '#1A2E1A',
    accent: '#52C41A',
    category: 'saas',
  },
  {
    slug: 'stokvel-os',
    name: 'StokvelOS',
    status: 'Beta',
    problem: 'R50 billion moves through SA stokvels annually — 95% managed on paper.',
    impact: [
      'First AI-native stokvel platform in Africa',
      'AI fraud detection caught 2 discrepancies in beta',
      '100% contribution tracking accuracy vs manual records',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'PayFast'],
    liveUrl: '/upgrades?app=stokvelos',
    liveLabel: 'Upgrading →',
    liveInternal: true,
    bg: '#1A0A05',
    accent: '#C4613A',
    category: 'saas',
  },
  {
    slug: 'adminos',
    name: 'AdminOS',
    status: 'Beta',
    problem: 'SA SMEs pay R11,200/month across fragmented tools — most of which they barely use.',
    impact: [
      '5 specialist AI agents replace 6 separate subscriptions',
      'WhatsApp-native inbox — no app switching',
      'Xero-integrated, PayFast-enabled, load-shedding-aware',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Upstash Redis', 'Meta WhatsApp Cloud API'],
    liveUrl: '/upgrades?app=adminos',
    liveLabel: 'Upgrading →',
    liveInternal: true,
    bg: '#0A0A0A',
    accent: '#C9A84C',
    featured: true,
    rate: 'From R2,500/month',
    category: 'saas',
  },
  {
    slug: 'watchsankofa',
    name: 'WatchSankofa',
    status: 'Beta',
    problem: 'African creators have no streaming home built for them — only platforms built for Hollywood.',
    impact: [
      '85% revenue share for creators (Netflix pays ~7%)',
      'Flutterwave payouts — Africa-native monetisation',
      'Built on Sankofa principle: reclaiming what was lost',
    ],
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
      'Standalone media publication + WatchSankofa content pipeline',
      'Features African founders and creators',
      'Builds the media flywheel that feeds the streaming platform',
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
    problem: 'Most developer portfolios are templates. This one is a deployed product.',
    impact: [
      '72+ commits — most iterated repo',
      'Multilingual support, AI chatbot, Notion template sales',
      '15% increase in contact form submissions since AI chatbot launch',
    ],
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
    problem: "YouTube's algorithm has no concept of African spoken word poetry. Poets deserve a home.",
    impact: [
      'Language-first discovery — isiZulu, Sesotho, Luganda as search filters',
      'Live applause via Supabase Realtime — real-time collective experience',
      'Built by a published poet who has lived the exact problem',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Mux', 'Tailwind CSS'],
    liveUrl: 'https://poetry-tube.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/PoetryTube',
    bg: '#0D0A1A',
    accent: '#7C3AED',
    category: 'origin',
  },
  {
    slug: 'true-access-app',
    name: 'True Access',
    status: 'Live',
    problem: '4M South Africans with disabilities have no verified accessibility database for public spaces.',
    impact: [
      'Community-verified accessibility scores for SA locations',
      'WCAG-compliant by design — accessibility-first development',
      'Co-founded: first multi-stakeholder technical collaboration',
    ],
    stack: ['Next.js', 'TypeScript', 'Mapbox GL JS', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://true-access-app.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/TrueAccApp',
    bg: '#001812',
    accent: '#10B981',
    category: 'client',
  },
  {
    slug: 'cortex-hub',
    name: 'Cortex Hub Booking',
    status: 'Live',
    problem: 'SA creative hubs run on WhatsApp and paper booking registers — double bookings, lost revenue.',
    impact: [
      'PostgreSQL tsrange overlap logic — zero double-bookings',
      'First PayFast ITN webhook implementation in the portfolio',
      'Direct architectural ancestor of AdminOS booking system',
    ],
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
      'Full PayFast ITN + signed Supabase Storage download flow',
      'Earth-toned design system that became Mirembe Muse brand palette',
      'Complete eCommerce data model: cart → order → payment → fulfillment',
    ],
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
      'Full YouTube UI in raw HTML/CSS — no framework, no API',
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
      'SheCodes Plus certified — first live API integration',
    ],
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
      'Pixel-perfect Netflix UI in pure CSS',
      'CSS Grid + Flexbox mastery',
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
    slug: 'womens-retreat',
    name: "Women's Retreat — Yellowwood Forest",
    status: 'Live',
    problem: 'Wellness retreats targeting women need digital presence that does emotional work, not just list prices.',
    impact: [
      'Forest-first design: atmosphere before CTA',
      'Active retreat promotion website',
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
      'Zero dependencies — a static site that works for 5 years without maintenance',
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
      'Affiliate marketing architecture: seed of AdminOS referral system',
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

// ── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status, accent }: { status: ProjectCard['status']; accent: string }) {
  const map = {
    Live: { bg: 'rgba(82,196,26,0.12)', color: '#52C41A', border: 'rgba(82,196,26,0.3)' },
    Beta: { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: 'rgba(201,168,76,0.3)' },
    Complete: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: 'rgba(255,255,255,0.12)' },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      fontFamily: 'var(--font-mono)',
      fontSize: '9px',
      letterSpacing: '0.2em',
      padding: '3px 9px',
      borderRadius: '3px',
      textTransform: 'uppercase' as const,
      flexShrink: 0,
    }}>
      {status}
    </span>
  );
}

// ── Single Project Card ────────────────────────────────────────────────────────

function ProjectCard({ p, index }: { p: ProjectCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      style={{
        background: p.bg,
        borderRadius: '4px',
        overflow: 'hidden',
        border: `1px solid ${p.accent}18`,
        borderLeft: `4px solid ${p.accent}`,
        position: 'relative',
      }}
    >
      {/* Featured ribbon */}
      {p.featured && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: p.accent,
          color: '#0A0A0A',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.2em',
          padding: '4px 12px',
          textTransform: 'uppercase' as const,
        }}>
          FEATURED
        </div>
      )}

      <div style={{ padding: '24px 24px 20px' }}>
        {/* Top row: badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' as const }}>
          <StatusBadge status={p.status} accent={p.accent} />
          {p.shecodes && (
            <span style={{
              background: 'rgba(251,191,36,0.12)',
              color: '#FBBF24',
              border: '1px solid rgba(251,191,36,0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.15em',
              padding: '3px 8px',
              borderRadius: '3px',
            }}>
              SheCodes Plus ✓
            </span>
          )}
          {p.rate && (
            <span style={{
              color: p.accent,
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              opacity: 0.8,
            }}>
              {p.rate}
            </span>
          )}
        </div>

        {/* Project name */}
        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(20px, 2.5vw, 26px)',
          fontWeight: 700,
          color: '#FFFFFF',
          margin: '0 0 10px',
          lineHeight: 1.1,
        }}>
          {p.name}
        </h3>

        {/* Problem statement */}
        <p style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.55)',
          margin: '0 0 16px',
          lineHeight: 1.6,
        }}>
          {p.problem}
        </p>

        {/* Impact bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
          {p.impact.map((item) => (
            <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: p.accent, flexShrink: 0, fontSize: '12px', marginTop: '1px', lineHeight: 1.5 }}>→</span>
              <span style={{
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.5,
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '5px', marginBottom: '20px' }}>
          {p.stack.map((tech) => (
            <span key={tech} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.05em',
              padding: '3px 8px',
              borderRadius: '3px',
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
                display: 'inline-block',
                background: p.accent,
                color: '#0A0A0A',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '3px',
                textDecoration: 'none',
              }}>
                {p.liveLabel ?? 'Live App ↗'}
              </Link>
            ) : (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                background: p.accent,
                color: '#0A0A0A',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '3px',
                textDecoration: 'none',
              }}>
                {p.liveLabel ?? 'Live Demo ↗'}
              </a>
            )
          )}
          <Link href={`/projects/${p.slug}`} style={{
            display: 'inline-block',
            border: `1px solid ${p.accent}50`,
            color: p.accent,
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            padding: '7px 15px',
            borderRadius: '3px',
            textDecoration: 'none',
          }}>
            Case Study →
          </Link>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
            }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section Group ──────────────────────────────────────────────────────────────

function SectionGroup({ category, projects }: { category: FilterKey; projects: ProjectCard[] }) {
  if (projects.length === 0) return null;
  return (
    <div style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: '#C9943A',
          textTransform: 'uppercase' as const,
        }}>
          {SECTION_LABELS[category]}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(201,148,58,0.15)' }} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey | 'all'>('all');

  const saasProjects = PROJECTS.filter(p => p.category === 'saas');
  const originProjects = PROJECTS.filter(p => p.category === 'origin');
  const clientProjects = PROJECTS.filter(p => p.category === 'client');

  const filteredSaas = activeFilter === 'all' || activeFilter === 'saas' ? saasProjects : [];
  const filteredOrigin = activeFilter === 'all' || activeFilter === 'origin' ? originProjects : [];
  const filteredClient = activeFilter === 'all' || activeFilter === 'client' ? clientProjects : [];

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8' }}>

      {/* ── EDITORIAL HEADER ── */}
      <section style={{
        background: '#1a1a2e',
        padding: '80px 24px 52px',
        borderBottom: '1px solid rgba(201,148,58,0.2)',
      }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: '#C9943A',
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              margin: '0 0 18px',
            }}>
              Mirembe Muse (Pty) Ltd · Project Portfolio
            </p>

            <h1 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(52px, 9vw, 96px)',
              fontWeight: 700,
              color: '#F5F1E8',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              margin: '0 0 20px',
            }}>
              Projects
            </h1>

            <p style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontStyle: 'italic',
              color: 'rgba(245,241,232,0.65)',
              margin: '0 0 36px',
              maxWidth: '640px',
              lineHeight: 1.55,
            }}>
              Seven applications. One woman. Nine months. Africa&apos;s tech infrastructure, built from East London.
            </p>

            {/* Stats bar */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' as const }}>
              {[
                { v: '7', l: 'Live AI SaaS Products' },
                { v: '550+', l: 'GitHub Commits' },
                { v: '36+', l: 'Technologies' },
                { v: '9 Months', l: 'Zero → Production' },
              ].map(({ v, l }, i) => (
                <div key={l} style={{
                  padding: '16px 28px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-bebas, Georgia, serif)',
                    fontSize: '28px',
                    color: '#C9943A',
                    lineHeight: 1,
                    letterSpacing: '0.03em',
                  }}>{v}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    color: 'rgba(245,241,232,0.4)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    marginTop: '4px',
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(26,26,46,0.08)',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {FILTERS.map(({ key, label }) => {
            const active = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: active ? '2px solid #1a1a2e' : '2px solid transparent',
                  background: 'none',
                  color: active ? '#1a1a2e' : 'rgba(26,26,46,0.45)',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PROJECT SECTIONS ── */}
      <section style={{ padding: '48px 24px 80px', maxWidth: '1160px', margin: '0 auto' }}>
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

      {/* ── POPIA BADGE ── */}
      <section style={{ padding: '0 24px 60px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{
          padding: '16px 20px',
          border: '1px solid rgba(201,148,58,0.25)',
          background: 'rgba(201,148,58,0.03)',
          borderRadius: '3px',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: '#C9943A',
            letterSpacing: '0.3em',
            margin: '0 0 4px',
          }}>
            COMPLIANCE NOTICE
          </p>
          <p style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: '12px',
            color: 'rgba(26,26,46,0.7)',
            margin: '0 0 3px',
          }}>
            <strong>POPIA Compliant</strong> · Registration No: 2026-005658 · Date: 2026-04-03
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(201,148,58,0.6)',
            margin: 0,
          }}>
            Mirembe Muse (Pty) Ltd · Information Officer: Kabali-Kagwa, Nandawula · Appointed: 2025-08-28
          </p>
        </div>
      </section>
    </main>
  );
}
