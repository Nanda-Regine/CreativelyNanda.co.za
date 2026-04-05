'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ServiceItem = {
  name: string;
  zar: string;
  usd: string;
  timeline?: string;
  timelineNote?: string;
  signature: boolean;
  proven: string | null;
};

type PricingCategory = {
  id: string;
  label: string;
  accent: string;
  services: ServiceItem[];
};

const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'web-dev',
    label: 'WEB DEVELOPMENT',
    accent: '#C1292E',
    services: [
      { name: '1-Page Site', zar: 'R5,000–R10,000', usd: '$270–$540', timeline: '5–7 days', signature: false, proven: null },
      { name: '5-Page Site', zar: 'R8,000–R15,000', usd: '$430–$810', timeline: '2–3 weeks', signature: false, proven: null },
      { name: '5+ Page Site', zar: 'R30,000–R60,000', usd: '$1,620–$3,240', timeline: '3–5 weeks', signature: false, proven: 'CreativelyNanda' },
      { name: 'E-Commerce', zar: 'R35,000–R65,000', usd: '$1,892–$3,514', timeline: '4–6 weeks', signature: true, proven: 'Mirembe Muse marketplace' },
      { name: 'Booking System', zar: 'R30,000–R60,000', usd: '$1,622–$3,243', timeline: '4–7 weeks', signature: false, proven: 'Cortex Hub' },
      { name: 'Location Platform', zar: 'R30,000–R60,000', usd: '$1,622–$3,243', timeline: '4–7 weeks', signature: false, proven: 'True Access' },
    ],
  },
  {
    id: 'ai-apps',
    label: 'AI-POWERED WEBSITES & APPS',
    accent: '#C9943A',
    services: [
      { name: 'AI Chatbot Site', zar: 'R30,000–R60,000', usd: '$1,622–$3,243', timeline: '2–4 weeks', signature: true, proven: 'Nanda AI (+15% conversions)' },
      { name: 'MCP-Embedded Site', zar: 'R60,000–R120,000', usd: '$3,243–$6,486', timeline: '4–6 weeks', signature: true, proven: 'Architecture proven in 7 live apps' },
      { name: 'Full-Stack SaaS', zar: 'R40,000–R100,000', usd: '$2,162–$5,405', timeline: '5–10 weeks', signature: true, proven: '6 live SaaS products' },
      { name: 'Streaming Platform', zar: 'R45,000–R90,000', usd: '$2,432–$4,865', timeline: '6–10 weeks', signature: false, proven: 'WatchSankofa' },
      { name: 'RAG / Knowledge Base', zar: 'R35,000–R70,000', usd: '$1,892–$3,784', timeline: '2–3 weeks', signature: false, proven: 'Nanda AI chatbot' },
    ],
  },
  {
    id: 'retainers',
    label: 'AI ENGINEERING RETAINERS',
    accent: '#8A9E7A',
    services: [
      { name: 'AI Agent Development', zar: 'R25,000–R55,000', usd: '$1,351–$2,973', timelineNote: 'per month · highest margin', signature: true, proven: 'AdminOS + VarsityOS' },
      { name: 'WhatsApp AI Automation', zar: 'R10,000–R25,000', usd: '$541–$1,351', timelineNote: 'per month · Meta WhatsApp Cloud API', signature: false, proven: null },
      { name: 'Business Automation', zar: 'R8,000–R20,000', usd: '$432–$1,081', timelineNote: 'per month', signature: false, proven: 'AdminOS-proven' },
      { name: 'AI Health Reports', zar: 'R5,000–R15,000', usd: '$270–$811', timelineNote: 'per month', signature: false, proven: 'StokvelOS + AdminOS' },
    ],
  },
  {
    id: 'notion',
    label: 'NOTION & OPERATIONS',
    accent: '#C1292E',
    services: [
      { name: 'Notion OS — Solo', zar: 'R5,000–R10,000', usd: '$270–$540', timeline: '3–5 days', signature: false, proven: null },
      { name: 'Notion OS — Business', zar: 'R8,000–R18,000', usd: '$432–$973', timeline: '1–2 weeks', signature: false, proven: null },
      { name: 'Website + Notion Bundle', zar: 'R20,000–R40,000', usd: '$1,081–$2,162', timeline: '3–4 weeks', signature: true, proven: 'Mirembe Muse templates' },
      { name: 'Notion Template (Digital)', zar: 'R299–R1,499', usd: '$16–$81', timelineNote: 'once-off · instant delivery', signature: false, proven: null },
    ],
  },
];

const CREDENTIALS = [
  {
    heading: '7 production AI apps',
    proof:
      'Built solo in 9 months — VarsityOS, K53 Drill Master, StokvelOS, AdminOS, WatchSankofa, SankofaSessions, CreativelyNanda.',
  },
  {
    heading: 'Africa-first engineering',
    proof:
      'WhatsApp-native, PayFast-integrated, RLS-secured, load-shedding-aware. Built from inside the context — not adapted from elsewhere.',
  },
  {
    heading: 'The poet who codes',
    proof:
      'Published author of Inside Her Roses. The only AI engineer on the continent writing system architecture and sonnets in the same week.',
  },
];

const STACK_GROUPS = [
  {
    label: 'AI',
    items: [
      'Anthropic Claude',
      'OpenAI',
      'Prompt Caching',
      'Multi-Agent Systems',
      'RAG + Embeddings',
    ],
  },
  {
    label: 'Stack',
    items: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'],
  },
  {
    label: 'Infra',
    items: ['Upstash Redis', 'Sentry', 'PostHog', 'Resend', 'PayFast'],
  },
];

const STEPS = [
  { n: '01', label: 'Book a session or send an email' },
  { n: '02', label: 'We scope the project or retainer together' },
  { n: '03', label: 'I build, you review, we iterate' },
  { n: '04', label: 'You receive documented, production-ready work' },
];

function ServiceCard({ service, accent }: { service: ServiceItem; accent: string }) {
  return (
    <div
      className="relative overflow-hidden flex flex-col p-5 transition-all duration-300 group"
      style={{
        backgroundColor: '#0A1128',
        borderLeft: `4px solid ${service.signature ? '#C9943A' : accent + '60'}`,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        borderRadius: service.signature ? '0 16px 0 16px' : '0 8px 0 8px',
      }}
    >
      {/* Signature gold ribbon */}
      {service.signature && (
        <div
          className="absolute top-0 right-0 overflow-hidden"
          style={{ width: 60, height: 60, pointerEvents: 'none' }}
        >
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: -18,
              backgroundColor: '#C9943A',
              color: '#0A0F2C',
              fontSize: '7px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.12em',
              fontWeight: 700,
              padding: '2px 20px',
              transform: 'rotate(45deg)',
              transformOrigin: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            ★ SIGNATURE
          </div>
        </div>
      )}

      {/* Service name */}
      <h4
        className="text-white font-semibold text-sm mb-3 pr-8"
        style={{ fontFamily: 'var(--font-dm-sans, var(--font-body, sans-serif))' }}
      >
        {service.name}
      </h4>

      {/* ZAR price */}
      <p
        className="mb-0.5 font-bold leading-tight"
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '1.35rem',
          color: '#C9943A',
          letterSpacing: '-0.02em',
        }}
      >
        {service.zar}
      </p>

      {/* USD equivalent */}
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.7rem',
          color: 'rgba(245,239,214,0.45)',
          letterSpacing: '0.04em',
          marginBottom: '0.75rem',
        }}
      >
        {service.usd} USD
      </p>

      {/* Timeline badge */}
      {(service.timeline || service.timelineNote) && (
        <span
          className="inline-block mb-3 px-2 py-0.5 rounded text-xs"
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: '10px',
            color: '#8A9E7A',
            backgroundColor: 'rgba(138,158,122,0.12)',
            border: '1px solid rgba(138,158,122,0.25)',
            alignSelf: 'flex-start',
          }}
        >
          {service.timeline || service.timelineNote}
        </span>
      )}

      {/* Proven by */}
      {service.proven && (
        <p
          className="mt-auto pt-2"
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display, Georgia), serif)',
            fontStyle: 'italic',
            fontSize: '0.78rem',
            color: 'rgba(201,164,76,0.7)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          Proven by {service.proven}
        </p>
      )}
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ color: '#1A1A1A', backgroundColor: '#0A1128' }}
    >
      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO — full navy ─────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-32 pb-28 overflow-hidden" style={{ backgroundColor: '#0A1128' }}>
        {/* Cherry blob */}
        <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ backgroundColor: '#C1292E15', borderRadius: '0 0 0 100%' }} />
        {/* Gold stripe */}
        <div className="absolute left-0 top-40 w-1 h-24 bg-[#B8860B]/60 pointer-events-none" style={{ borderRadius: '0 4px 4px 0' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C1292E] mb-5">
              AI Engineering · Systems Architecture · Africa-first
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1
              className="font-display text-5xl md:text-7xl font-bold leading-[1.0] mb-8 text-white"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              You don&apos;t need to hire a team.{' '}
              <br className="hidden md:block" />
              You need{' '}
              <span style={{ color: '#C1292E' }}>the right person.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10 text-white/60"
              style={{ fontFamily: 'var(--font-body, sans-serif)' }}
            >
              AI engineering, product strategy, and technical architecture — from
              the founder who built seven Africa-first AI products in nine
              months. Available for select engagements.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-medium text-white transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
                style={{ backgroundColor: '#C1292E', fontFamily: 'var(--font-body, sans-serif)' }}
              >
                Book a Consultation
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-medium transition-all hover:border-[#B8860B] hover:text-[#B8860B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] text-white"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-body, sans-serif)',
                }}
              >
                View Projects
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p
              className="text-xs tracking-[0.2em] uppercase text-white/40"
              style={{ fontFamily: 'var(--font-body, sans-serif)' }}
            >
              7 live products&nbsp;&nbsp;·&nbsp;&nbsp;Claude + Supabase +
              Next.js&nbsp;&nbsp;·&nbsp;&nbsp;Africa-first AI&nbsp;&nbsp;·&nbsp;&nbsp;Available
              globally
            </p>
          </FadeUp>
        </div>

        {/* Diagonal divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ background: 'linear-gradient(135deg, #0A1128 49%, #0A0F2C 50%)' }} />
      </section>

      {/* ── EDITORIAL PRICING ─────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-0 pt-4" style={{ backgroundColor: '#0A0F2C' }}>
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <div className="max-w-5xl mx-auto relative z-10 pt-16">
          <FadeUp>
            <p
              className="mb-2"
              style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase' }}
            >
              ENGAGEMENTS & PRICING
            </p>
            <h2
              className="mb-4 leading-none"
              style={{ fontFamily: 'var(--font-bebas, var(--font-display, Georgia), sans-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#FAF8F2', letterSpacing: '0.02em' }}
            >
              WHAT IT COSTS.
            </h2>
            <p
              className="mb-16 max-w-xl"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(250,248,242,0.55)', lineHeight: 1.6 }}
            >
              Transparent pricing. No hidden discovery costs. All rates in ZAR — USD equivalent at R18.50 per dollar.
            </p>
          </FadeUp>

          {PRICING_CATEGORIES.map((cat, catIdx) => (
            <div key={cat.id}>
              {/* Diagonal separator between categories */}
              {catIdx > 0 && (
                <div
                  className="relative h-8 my-0 pointer-events-none"
                  style={{
                    background: catIdx % 2 === 0
                      ? 'linear-gradient(170deg, #0A0F2C 49%, #0D1535 50%)'
                      : 'linear-gradient(170deg, #0D1535 49%, #0A0F2C 50%)',
                  }}
                />
              )}

              <div
                className="relative px-0 pt-10 pb-12"
                style={{
                  backgroundColor: catIdx % 2 === 0 ? '#0A0F2C' : '#0D1535',
                }}
              >
                <FadeUp>
                  {/* Category stamp */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      style={{
                        width: 28,
                        height: 3,
                        backgroundColor: cat.accent,
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.65rem',
                        color: cat.accent,
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cat.label}
                    </p>
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: cat.accent + '20',
                      }}
                    />
                  </div>
                </FadeUp>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={stagger}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {cat.services.map((service) => (
                    <motion.div key={service.name} variants={fadeUp}>
                      <ServiceCard service={service} accent={cat.accent} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          ))}

          {/* CTA after pricing */}
          <FadeUp>
            <div
              className="mt-12 mb-0 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{
                backgroundColor: '#C1292E10',
                border: '1px solid #C1292E30',
                borderRadius: '0 24px 0 24px',
              }}
            >
              <div>
                <p
                  style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: '1.6rem', color: '#FAF8F2', letterSpacing: '0.04em' }}
                >
                  NOT SURE WHICH TIER FITS?
                </p>
                <p
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontStyle: 'italic', color: 'rgba(250,248,242,0.5)', fontSize: '0.95rem', marginTop: 4 }}
                >
                  Send a brief and I&apos;ll scope it honestly.
                </p>
              </div>
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: '#C1292E', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.875rem' }}
              >
                Book a Call →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Diagonal divider to cream */}
      <div className="relative h-16 pointer-events-none" style={{ background: 'linear-gradient(170deg, #0A0F2C 49%, #E8DCC4 50%)' }} />

      {/* ── WHY ME ───────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6"
        style={{ backgroundColor: '#E8DCC4' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Pull quote */}
          <FadeUp>
            <blockquote
              className="font-display text-2xl md:text-3xl italic leading-relaxed mb-16 max-w-3xl"
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                borderLeft: '3px solid #C1292E',
                paddingLeft: '1.5rem',
                color: '#0A1128',
              }}
            >
              "I don&apos;t just know how to build with AI — I&apos;ve built seven
              products that are live, indexed, paying users, and running in
              production. The people I work with get that context applied to
              their problem."
            </blockquote>
          </FadeUp>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Credentials */}
            <div className="md:col-span-3 space-y-5">
              {CREDENTIALS.map((c, i) => (
                <FadeUp key={c.heading}>
                  <div
                    className="p-6 relative overflow-hidden"
                    style={{
                      backgroundColor: '#0A1128',
                      border: '1px solid #C1292E20',
                      borderRadius: i % 2 === 0 ? '24px 8px 24px 8px' : '8px 24px 8px 24px',
                    }}
                  >
                    <h4
                      className="font-semibold mb-2 text-white"
                      style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                    >
                      {c.heading}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/60">
                      {c.proof}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Stack badges */}
            <div className="md:col-span-2">
              <FadeUp>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-5 text-[#C1292E]"
                  style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  What I build with
                </p>
                <div className="space-y-5">
                  {STACK_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p
                        className="text-xs font-semibold mb-2 text-[#B8860B]"
                        style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                      >
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-3 py-1.5 rounded-full"
                            style={{
                              backgroundColor: '#0A1128',
                              border: '1px solid #C1292E20',
                              color: 'rgba(255,255,255,0.7)',
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
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24" style={{ backgroundColor: '#0A1128' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-14 text-white"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              From first message to shipped product
            </h2>
          </FadeUp>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="relative"
          >
            {/* Connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-7 left-8 right-8 h-px"
              style={{
                backgroundImage: `repeating-linear-gradient(to right, #C1292E 0, #C1292E 8px, transparent 8px, transparent 18px)`,
                zIndex: 0,
              }}
            />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {STEPS.map((step) => (
                <motion.div key={step.n} variants={fadeUp} className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-sm"
                    style={{
                      backgroundColor: '#0A0F2C',
                      border: '1px solid #C1292E',
                      color: '#C1292E',
                      fontFamily: 'var(--font-body, sans-serif)',
                    }}
                  >
                    {step.n}
                  </div>
                  <p
                    className="text-sm leading-snug text-white/60"
                    style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                  >
                    {step.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ──────────────────────────────────────────────── */}
      <section
        className="relative py-16 px-6"
        style={{ backgroundColor: '#0D1535', borderTop: '1px solid #C1292E20' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-8 text-[#C1292E]"
              style={{ fontFamily: 'var(--font-body, sans-serif)' }}
            >
              Payment
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeUp>
              <h4
                className="font-semibold mb-2 text-white"
                style={{ fontFamily: 'var(--font-body, sans-serif)' }}
              >
                South African clients
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                Invoiced in ZAR via PayFast. Bank transfer accepted for project
                engagements over R20,000.
              </p>
              <span
                className="inline-block mt-4 px-3 py-1.5 text-xs rounded-full"
                style={{
                  backgroundColor: '#FFFFFF10',
                  border: '1px solid #B8860B40',
                  color: '#B8860B',
                  fontFamily: 'var(--font-body, sans-serif)',
                }}
              >
                PayFast · ZAR
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h4
                className="font-semibold mb-2 text-white"
                style={{ fontFamily: 'var(--font-body, sans-serif)' }}
              >
                International clients
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                Invoiced in USD, EUR, GBP, or KES via Wise. No conversion fees.
                Same-day setup.
              </p>
              <span
                className="inline-block mt-4 px-3 py-1.5 text-xs rounded-full"
                style={{
                  backgroundColor: '#FFFFFF10',
                  border: '1px solid #FFFFFF20',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-body, sans-serif)',
                }}
              >
                Wise · USD · EUR · GBP · KES
              </span>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BOOK ─────────────────────────────────────────────────────────── */}
      <section
        id="book"
        className="relative px-6 py-28 overflow-hidden"
        style={{ backgroundColor: '#C1292E' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* Asymmetric navy blob */}
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none" style={{ backgroundColor: '#0A112830', borderRadius: '0 0 100% 0' }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ backgroundColor: '#0A112825', borderRadius: '100% 0 0 0' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-12 text-white"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              Start the conversation
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FadeUp>
              <div
                className="p-8 flex flex-col gap-3"
                style={{ backgroundColor: '#0A1128', borderRadius: '24px 8px 24px 8px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <p
                  className="text-xs uppercase tracking-[0.15em] font-semibold text-[#B8860B]"
                  style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  Email me directly
                </p>
                <a
                  href="mailto:hello@creativelynanda.co.za"
                  className="font-medium text-lg text-white hover:text-[#C1292E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded"
                  style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  hello@creativelynanda.co.za
                </a>
                <p className="text-sm text-white/50">
                  I respond within 24 hours.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Link
                href="/contact"
                className="flex flex-col justify-between p-8 transition-all group h-full hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ backgroundColor: '#0A1128', borderRadius: '8px 24px 8px 24px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.15em] font-semibold mb-3 text-[#B8860B]"
                    style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                  >
                    Use the contact form
                  </p>
                  <p className="text-sm text-white/60">
                    Preferred for project briefs — gives me the context I need to respond meaningfully.
                  </p>
                </div>
                <span
                  className="mt-6 inline-flex items-center gap-2 font-medium text-sm text-white group-hover:text-[#C1292E] transition-colors"
                  style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  Go to contact form <span aria-hidden>→</span>
                </span>
              </Link>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <p
              className="text-sm text-center text-white/60"
              style={{ fontFamily: 'var(--font-body, sans-serif)' }}
            >
              No discovery calls unless you want one. A clear brief is enough to
              get started.
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
