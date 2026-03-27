'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata = undefined; // metadata lives in layout.tsx

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

const STATS = [
  { n: '7', label: 'Production AI Apps' },
  { n: '250+', label: 'Active Users' },
  { n: 'R50B+', label: 'Market Opportunity Addressed' },
  { n: '12', label: 'Months to Build All 7' },
];

const SERVICES = [
  {
    n: '01',
    name: 'AI Integration',
    position: 'You have a product. I wire the intelligence into it.',
    includes: [
      'Technical discovery and architecture scoping',
      'Claude, GPT-4o, or open-source model selection',
      'Multi-agent system design and build',
      'Prompt caching, rate limiting, cost optimisation',
      'Full documentation and handoff',
    ],
    rate: 'From R45,000',
    note: '(~USD 2,500) per project',
    timeline: '3–6 weeks',
  },
  {
    n: '02',
    name: 'AI Agent Development',
    position: 'Agents that work 24/7 while you focus on what matters.',
    includes: [
      'Customer service, sales qualification, or data agents',
      'WhatsApp, web, or email channel integration',
      'Multi-language support including isiXhosa and isiZulu',
      'Analytics dashboard and performance monitoring',
      '30-day post-launch support included',
    ],
    rate: 'R18,000–R45,000 / month',
    note: 'Retainer — ongoing agent management',
    timeline: null,
  },
  {
    n: '03',
    name: 'Business Automation',
    position: 'AI-powered workflows that eliminate repetitive work.',
    includes: [
      'Email automation and intelligent routing',
      'Document processing and data extraction',
      'Report generation and scheduling',
      'Integration with existing tools (Xero, WhatsApp, etc.)',
      'Workflow documentation for your team',
    ],
    rate: 'R8,000–R20,000 / month',
    note: 'Retainer — based on workflow complexity',
    timeline: null,
  },
  {
    n: '04',
    name: 'Custom AI System',
    position: 'A bespoke solution built from scratch for your specific problem.',
    includes: [
      'Full requirements analysis and technical scoping',
      'Architecture design and model selection',
      'Build, test, and production deployment',
      'Supabase + Next.js + Claude/OpenAI stack',
      '3-month post-launch support',
    ],
    rate: 'From R65,000',
    note: 'Quote-based — scoped to your requirements',
    timeline: null,
  },
];

const PROOF_LINES = [
  'StokvelOS: AI fraud detection protecting community savings in real time',
  'AdminOS: 5 AI agents replacing R11,200/month in SME subscriptions',
  'VarsityOS: Crisis detection routing distressed students to SADAG',
  'K53 Drill Master: 50+ paying users, 4.8/5 rating, live in production',
  'WatchSankofa: 85% creator revenue share — built for African storytellers',
  'Every system: RLS-secured, rate-limited, monitored, documented',
];

const STACK_GROUPS = [
  { label: 'AI & Models', items: ['Anthropic Claude', 'OpenAI GPT-4o', 'Prompt Caching', 'Multi-Agent Systems', 'RAG + Embeddings'] },
  { label: 'Stack', items: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'] },
  { label: 'Infra', items: ['Upstash Redis', 'Sentry', 'PostHog', 'Resend', 'Firebase'] },
  { label: 'Payments', items: ['PayFast (ZAR)', 'Flutterwave (Pan-African)', 'Wise (International)'] },
  { label: 'Comms', items: ['360dialog WhatsApp', 'Resend Email'] },
];

const PROOF_TILES = [
  { heading: 'WhatsApp-native', body: 'African businesses run on WhatsApp. I build AI systems that live where your customers already are.' },
  { heading: 'Context-aware', body: 'Not adapted from a US template. Built understanding NSFAS, stokvels, PayFast, load shedding, and isiXhosa.' },
  { heading: 'Production-grade', body: 'Every system I build has RLS security, rate limiting, error monitoring, and real users. Not demos.' },
];

export default function AIEngineerPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', color: '#1A1A1A' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <FadeUp>
          <span
            className="inline-flex items-center text-[11px] px-3 py-1.5 rounded-full mb-8"
            style={{
              backgroundColor: '#F2F0EB',
              border: `1px solid ${GOLD}50`,
              color: GOLD,
              fontFamily: 'var(--font-body, sans-serif)',
              letterSpacing: '0.08em',
            }}
          >
            Master Gen AI Professional · 5th Industrial Revolution
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Africa&apos;s AI engineer.
            <br />
            <span style={{ color: TERRA }}>Available for select engagements.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-lg max-w-xl leading-relaxed mb-10" style={{ color: '#6B6B6B' }}>
            Production AI systems — agents, integrations, automations — for businesses
            that cannot afford to wait for the rest of the continent to catch up.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-7 py-4 rounded-lg font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              See Engagements &amp; Pricing
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-7 py-4 rounded-lg font-medium transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ border: '1px solid #D4D0C8', color: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              View 7 Live Products →
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
            Claude API · Next.js 14 · Supabase · Multi-agent systems · WhatsApp-native · Production-deployed
          </p>
        </FadeUp>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <FadeUp>
        <section
          className="max-w-5xl mx-auto px-6 py-8 mb-16"
          style={{ borderTop: '1px solid #E5E2DA', borderBottom: '1px solid #E5E2DA' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
        </section>
      </FadeUp>

      {/* ── THE PROBLEM I SOLVE ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <FadeUp>
          <blockquote
            className="font-display text-2xl md:text-3xl italic leading-relaxed mb-12 max-w-3xl"
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              borderLeft: `3px solid ${GOLD}`,
              paddingLeft: '1.5rem',
            }}
          >
            "Most businesses know they need AI. Almost none have someone who can actually build
            it for their context — their language, their payment system, their infrastructure
            constraints."
          </blockquote>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-4">
          {PROOF_TILES.map((tile, i) => (
            <FadeUp key={tile.heading} delay={i * 0.08}>
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#F2F0EB', border: '1px solid #E5E2DA' }}
              >
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
                  {tile.heading}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                  {tile.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="max-w-5xl mx-auto px-6 pb-20">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
             style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
            Engagements
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Three ways to work together
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.n} delay={i * 0.07}>
              <div
                className="flex flex-col h-full rounded-lg p-7 transition-all duration-300"
                style={{ border: '1px solid #E5E2DA', backgroundColor: '#FFFFFF' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E2DA'; }}
              >
                <span className="text-sm font-semibold mb-3 block" style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)', letterSpacing: '0.1em' }}>
                  {svc.n}
                </span>
                <h3 className="font-display text-2xl font-bold mb-1.5" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
                  {svc.name}
                </h3>
                <p className="text-sm mb-5" style={{ color: '#6B6B6B' }}>
                  {svc.position}
                </p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {svc.includes.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: '#4A4A4A' }}>
                      <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-5 mb-5" style={{ borderTop: '1px solid #F0EDE8' }}>
                  <p className="font-semibold text-base" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
                    {svc.rate}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9B9588' }}>
                    {svc.note}
                  </p>
                  {svc.timeline && (
                    <p className="text-xs mt-0.5" style={{ color: '#9B9588' }}>
                      Timeline: {svc.timeline}
                    </p>
                  )}
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
                  style={{ color: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  Get in touch →
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F2F0EB' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-8"
               style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
              What you&apos;re actually getting
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <FadeUp>
              <p
                className="font-display text-2xl md:text-3xl italic leading-relaxed"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                "You are not hiring a freelancer. You are engaging the founder who built seven
                production AI systems in twelve months."
              </p>
            </FadeUp>
            <div className="space-y-3">
              {PROOF_LINES.map((line, i) => (
                <FadeUp key={line} delay={i * 0.06}>
                  <p
                    className="text-sm py-3 leading-relaxed"
                    style={{
                      borderLeft: `2px solid ${GOLD}`,
                      paddingLeft: '1rem',
                      color: '#4A4A4A',
                      fontFamily: 'var(--font-body, sans-serif)',
                    }}
                  >
                    {line}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-8"
             style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
            What I build with
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {STACK_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold mb-2.5" style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: '#F2F0EB',
                        border: '1px solid #D4D0C8',
                        color: '#4A4A4A',
                        fontFamily: 'var(--font-body, sans-serif)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #E5E2DA' }}>
        <FadeUp>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
            Ready to build?
          </h2>
          <p className="text-base max-w-md mb-10 leading-relaxed" style={{ color: '#6B6B6B' }}>
            I take a small number of external engagements alongside building Mirembe Muse.
            Send a brief — I&apos;ll tell you within 48 hours if it&apos;s a fit.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6 max-w-xl">
          <FadeUp>
            <div className="p-6 rounded-lg" style={{ border: '1px solid #E5E2DA', backgroundColor: '#FFFFFF' }}>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-2"
                 style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                Email directly
              </p>
              <a
                href="mailto:hello@mirembemuse.co.za"
                className="font-medium hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded block"
                style={{ color: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
              >
                hello@mirembemuse.co.za
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <Link
              href="/contact"
              className="flex items-center justify-between p-6 rounded-lg transition-all hover:border-[#C9A84C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] h-full"
              style={{ border: '1px solid #E5E2DA', backgroundColor: '#FFFFFF' }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-1"
                   style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                  Send a brief
                </p>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>Contact form →</p>
              </div>
            </Link>
          </FadeUp>
        </div>
        <FadeUp delay={0.1}>
          <p className="mt-8 text-xs" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
            ZAR invoicing via PayFast · International via Wise
          </p>
        </FadeUp>
      </section>
    </div>
  );
}
