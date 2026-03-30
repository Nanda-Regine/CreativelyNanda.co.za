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

const OFFERS = [
  {
    number: '01',
    name: 'AI Integration',
    position: 'You have a product. I wire the intelligence into it.',
    includes: [
      'Architecture scoping and technical discovery call',
      'Claude, GPT-4o, or open-source model selection',
      'Multi-agent system design and build',
      'Prompt caching, rate limiting, and cost optimisation',
      'Handoff with full documentation',
    ],
    rate: 'From R45,000 / project',
    rateNote: '~USD 2,500',
    cta: 'Scope a Project',
    href: '/contact',
  },
  {
    number: '02',
    name: 'Fractional AI Officer',
    position: 'Your AI strategy, without the full-time hire.',
    includes: [
      'Monthly AI strategy and architecture advisory',
      'Weekly async technical review (Loom or Notion)',
      'One 60-min live session per month',
      'Unlimited async questions via voice note or text',
      'Access to my full stack templates and system designs',
    ],
    rate: 'R18,000 / month',
    rateNote: '~USD 1,000/mo',
    cta: 'Start a Retainer',
    href: '/contact',
  },
  {
    number: '03',
    name: 'Advisory Session',
    position: 'One focused hour. Leave with a roadmap.',
    includes: [
      '60-minute video call (Zoom or Google Meet)',
      'Recorded and sent to you afterwards',
      'Custom technical recommendations for your product',
      'Written summary with prioritised action steps',
      'No retainer required — one-off engagement',
    ],
    rate: 'R3,500 / session',
    rateNote: '~USD 195',
    cta: 'Book a Session',
    href: '/contact',
  },
];

const CREDENTIALS = [
  {
    heading: '7 production AI apps',
    proof:
      'Built solo in 12 months — VarsityOS, K53 Drill Master, StokvelOS, AdminOS, WatchSankofa, SankofaSessions, CreativelyNanda.',
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
              the founder who built seven Africa-first AI products in twelve
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
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ background: 'linear-gradient(135deg, #0A1128 49%, #E8DCC4 50%)' }} />
      </section>

      {/* ── OFFER CARDS ──────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-24 pt-4" style={{ backgroundColor: '#E8DCC4' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* Cherry asymmetric blob */}
        <div className="absolute top-8 right-8 w-28 h-28 pointer-events-none" style={{ backgroundColor: '#C1292E10', borderRadius: '50% 0 50% 50%', transform: 'rotate(20deg)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <FadeUp>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-3 text-[#0A1128]"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            What I Do
          </h2>
          <p className="mb-12 text-base text-[#6B6B6B]" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
            Three ways to engage, from a single session to ongoing partnership.
          </p>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {OFFERS.map((offer) => (
            <motion.div
              key={offer.number}
              variants={fadeUp}
              className="group flex flex-col p-7 transition-all duration-300"
              style={{
                border: '1px solid #C1292E20',
                backgroundColor: '#0A1128',
                borderRadius: '32px 8px 32px 8px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C1292E80';
                (e.currentTarget as HTMLElement).style.backgroundColor = '#1a2744';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C1292E20';
                (e.currentTarget as HTMLElement).style.backgroundColor = '#0A1128';
              }}
            >
              {/* Number */}
              <span
                className="text-sm font-semibold mb-4 block"
                style={{
                  color: '#C1292E',
                  fontFamily: 'var(--font-body, sans-serif)',
                  letterSpacing: '0.1em',
                }}
              >
                {offer.number}
              </span>

              {/* Name */}
              <h3
                className="font-display text-2xl font-bold mb-2 text-white"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                {offer.name}
              </h3>

              {/* Position */}
              <p className="text-sm mb-5 text-white/50">
                {offer.position}
              </p>

              {/* Includes */}
              <ul className="flex-1 space-y-2 mb-7">
                {offer.includes.map((item) => (
                  <li
                    key={item}
                    className="text-sm flex items-start gap-2 text-white/70"
                  >
                    <span style={{ color: '#C1292E', marginTop: 2, flexShrink: 0 }}>
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Rate */}
              <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <p
                  className="font-semibold text-base text-white"
                  style={{ fontFamily: 'var(--font-body, sans-serif)' }}
                >
                  {offer.rate}
                </p>
                <p className="text-xs mt-0.5 text-white/40" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
                  {offer.rateNote}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={offer.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded text-[#C1292E]"
                style={{ fontFamily: 'var(--font-body, sans-serif)' }}
              >
                {offer.cta}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </section>

      {/* ── WHY ME ───────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6"
        style={{ backgroundColor: '#0A1128' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-35" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Pull quote */}
          <FadeUp>
            <blockquote
              className="font-display text-2xl md:text-3xl italic leading-relaxed mb-16 max-w-3xl text-white"
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                borderLeft: '3px solid #C1292E',
                paddingLeft: '1.5rem',
              }}
            >
              "I don't just know how to build with AI — I've built seven
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
                      backgroundColor: '#1a2744',
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
                            className="text-xs px-3 py-1.5 rounded-full text-white/70"
                            style={{
                              backgroundColor: '#FFFFFF10',
                              border: '1px solid #FFFFFF20',
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
      <section className="relative px-6 py-24" style={{ backgroundColor: '#E8DCC4' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <FadeUp>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-14 text-[#0A1128]"
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
                    backgroundColor: '#FAFAF8',
                    border: '1px solid #C1292E',
                    color: '#C1292E',
                    fontFamily: 'var(--font-body, sans-serif)',
                  }}
                >
                  {step.n}
                </div>
                <p
                  className="text-sm leading-snug"
                  style={{ color: '#4A4A4A', fontFamily: 'var(--font-body, sans-serif)' }}
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
        style={{ backgroundColor: '#0A1128', borderTop: '1px solid #C1292E20' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
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
