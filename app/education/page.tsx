'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  { n: '15', label: 'Distinctions at NMU' },
  { n: '12', label: 'Months to build 7 AI SaaS apps' },
  { n: '7', label: 'Technical certifications' },
  { n: 'Self-taught', label: 'No CS degree' },
];

const NMU_QUALS = [
  {
    degree: 'Higher Certificate in Business Management',
    nqf: 'NQF Level 5',
    dists: '5 Distinctions',
    year: '2022',
    modules: ['Small Business Management', 'Financial Literacy', 'Business Communication', 'Entrepreneurship Fundamentals'],
    connection: 'The entrepreneurship modules became the pricing philosophy. The financial literacy became the AdminOS budget architecture.',
  },
  {
    degree: 'Diploma in Management',
    nqf: 'NQF Level 6',
    dists: '5 Distinctions',
    year: '2023',
    modules: ['Human Resources Management', 'Project Management', 'Operations Management', 'Organisational Behaviour'],
    connection: 'Operations management thinking is why every Mirembe Muse app has audit logging, rate limiting, and documented handoff protocols.',
  },
  {
    degree: 'Advanced Diploma in Business Management Practice',
    nqf: 'NQF Level 7',
    dists: '5 Distinctions',
    year: '2024',
    modules: ['Strategic Management', 'Business Research', 'Advanced Financial Management', 'Leadership'],
    connection: 'Strategic management frameworks are directly embedded in how Mirembe Muse is structured — seven apps, one infrastructure, horizontal productisation.',
  },
];

const CERTS = [
  {
    name: 'SheCodes Plus',
    institution: 'SheCodes',
    period: 'June 2025 – December 2025',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
    unlocked: 'The full front-end stack. First deployed apps. First paying users.',
    proof: { label: 'Weather App ↗', url: 'https://myweatherapp.vercel.app' },
  },
  {
    name: 'Master Generative AI Professional',
    institution: 'Great Learning',
    period: 'August 2025',
    skills: ['Prompt Engineering', 'AI Agents', 'LLM Integration', 'Automation Architecture'],
    unlocked: 'The Claude API integrations that power VarsityOS, StokvelOS, AdminOS, and the Nanda AI Assistant.',
    proof: null,
  },
  {
    name: 'Google Digital Marketing & E-commerce',
    institution: 'Google / Coursera',
    period: 'June 2025 – November 2025',
    skills: ['SEO', 'SEM', 'Social Media', 'E-commerce', 'Analytics'],
    unlocked: 'The SEO built into every Mirembe Muse app — generating organic traffic from USA and SA before any paid promotion.',
    proof: null,
  },
  {
    name: 'ChatGPT for Business Communication',
    institution: 'Great Learning',
    period: 'August 2025',
    skills: ['Business Writing', 'AI Assistants', 'Productivity', 'Communication Strategy'],
    unlocked: 'The Nanda AI Assistant voice and constraint architecture.',
    proof: null,
  },
  {
    name: 'Human-Centered Design',
    institution: 'IDEO',
    period: '2024',
    skills: ['Design Thinking', 'User Research', 'Prototyping', 'Empathy Mapping'],
    unlocked: 'The reason every Mirembe Muse app is designed for its actual users — stokvel admins, first-gen students, township entrepreneurs — not abstract personas.',
    proof: null,
  },
  {
    name: 'Graphic Design Essentials',
    institution: 'Online Academy',
    period: '2024',
    skills: ['Typography', 'Colour Theory', 'Layout', 'Branding'],
    unlocked: 'The Mirembe Muse design system: Cormorant Garamond + DM Sans + gold/terracotta/ivory.',
    proof: null,
  },
];

const TIMELINE = [
  { year: '2022', event: 'NMU Higher Certificate · 5 Distinctions' },
  { year: '2023', event: 'NMU Diploma · 5 Distinctions' },
  { year: '2024', event: 'NMU Advanced Diploma · 5 Distinctions · Leadership Programme' },
  { year: 'Jun 2025', event: 'First line of code (SheCodes)' },
  { year: 'Aug 2025', event: 'First AI certification (Great Learning)' },
  { year: 'Sep 2025', event: 'First deployed app (Weather App)' },
  { year: 'Nov 2025', event: 'Mirembe Muse (Pty) Ltd registered' },
  { year: 'Dec 2025', event: 'First paying users (K53 Drill Master)' },
  { year: 'Mar 2026', event: '7 live SaaS apps · 250+ users · Launch day' },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', color: '#1A1A1A' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
             style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
            Academic &amp; Technical Formation
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Business degree.{' '}
            <span style={{ color: TERRA }}>Self-taught engineer.</span>
            <br className="hidden md:block" />
            Seven production apps.
            <br className="hidden md:block" />
            In under two years.
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
            A formal education in management systems. An informal education in building them.
            The combination is the thing.
          </p>
        </FadeUp>

        {/* Stats bar */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 py-8"
               style={{ borderTop: '1px solid #E5E2DA', borderBottom: '1px solid #E5E2DA' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)', color: TERRA }}
                >
                  {s.n}
                </p>
                <p className="text-xs mt-1 uppercase tracking-[0.1em]"
                   style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── FORMAL FOUNDATION ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
             style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
            Nelson Mandela University
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Where systems thinking was built.
          </h2>
          <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: '#6B6B6B' }}>
            Three consecutive qualifications at Nelson Mandela University — not because a degree was required,
            but because understanding how businesses actually work makes better software. Every product reflects
            that: AdminOS mirrors real SME workflow logic; StokvelOS reflects deep understanding of informal
            financial systems; VarsityOS was designed by someone who knows what NSFAS actually does to students.
          </p>
        </FadeUp>

        {/* NMU Cards */}
        <div className="relative">
          {/* Vertical connector (desktop) */}
          <div
            className="hidden md:block absolute left-7 top-8 bottom-8 w-px"
            style={{ backgroundColor: `${GOLD}40` }}
          />

          <div className="space-y-6">
            {NMU_QUALS.map((q, i) => (
              <FadeUp key={q.degree} delay={i * 0.1}>
                <div
                  className="md:ml-16 p-7 rounded-lg"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E2DA' }}
                >
                  {/* Dot (desktop) */}
                  <div
                    className="hidden md:block absolute -left-0 mt-1 w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: GOLD, marginLeft: '1.5rem', marginTop: '1.75rem' }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <h3
                      className="font-display text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                    >
                      {q.degree}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs shrink-0">
                      <span className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: '#F2F0EB', border: '1px solid #E5E2DA', color: '#6B6B6B', fontFamily: 'var(--font-body, sans-serif)' }}>
                        {q.nqf}
                      </span>
                      <span className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
                        {q.dists}
                      </span>
                      <span className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: '#F2F0EB', border: '1px solid #E5E2DA', color: '#6B6B6B', fontFamily: 'var(--font-body, sans-serif)' }}>
                        {q.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {q.modules.map((m) => (
                      <span key={m} className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: '#F2F0EB', color: '#4A4A4A', fontFamily: 'var(--font-body, sans-serif)' }}>
                        {m}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-sm italic leading-relaxed"
                    style={{
                      borderLeft: `2px solid ${GOLD}`,
                      paddingLeft: '0.875rem',
                      color: '#6B6B6B',
                      fontFamily: 'var(--font-body, sans-serif)',
                    }}
                  >
                    {q.connection}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* NMU Feature callout */}
        <FadeUp delay={0.15}>
          <div
            className="mt-8 p-6 rounded-lg"
            style={{ borderLeft: `3px solid ${GOLD}`, backgroundColor: '#F2F0EB' }}
          >
            <p className="font-semibold mb-1" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
              "Management graduand finds calling in writing"
            </p>
            <p className="text-sm mb-3 leading-relaxed" style={{ color: '#6B6B6B' }}>
              Recognised by Nelson Mandela University (135,000+ followers) for balancing academic
              excellence with creative pursuits.
            </p>
            <a
              href="https://www.linkedin.com/school/nelson-mandela-university/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
              style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
            >
              Read the feature →
            </a>
          </div>
        </FadeUp>

        {/* Leadership Programme */}
        <FadeUp delay={0.1}>
          <div
            className="mt-6 p-6 rounded-lg"
            style={{ backgroundColor: '#F2F0EB', border: '1px solid #E5E2DA' }}
          >
            <p className="font-semibold mb-2" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
              NMU Leadership Development Programme
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
              Selected to cultivate the next generation of change-makers.
              Community engagement. Industry networking. Innovation and entrepreneurship workshops.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── TECHNICAL REVOLUTION ─────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F2F0EB' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
               style={{ color: TERRA, fontFamily: 'var(--font-body, sans-serif)' }}>
              Self-Taught Engineering
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              No computer science degree.
              <br />
              Just production code and live users.
            </h2>
            <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: '#6B6B6B' }}>
              In June 2025, Nanda opened her first code editor. By March 2026, seven AI-powered SaaS
              applications were live in production, serving users across South Africa. This section is
              not a list of certificates. It is evidence of what deliberate, fast learning looks like
              when someone who already understands systems starts building them.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {CERTS.map((cert, i) => (
              <FadeUp key={cert.name} delay={i * 0.07}>
                <div
                  className="p-7 rounded-lg h-full flex flex-col"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E2DA' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3
                      className="font-display text-xl font-bold"
                      style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                    >
                      {cert.name}
                    </h3>
                    {cert.proof && (
                      <a
                        href={cert.proof.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] shrink-0 hover:opacity-70 transition-opacity"
                        style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}
                      >
                        {cert.proof.label}
                      </a>
                    )}
                  </div>
                  <p className="text-xs mb-1" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                    {cert.institution}
                  </p>
                  <p className="text-xs mb-4" style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}>
                    {cert.period}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#F2F0EB', border: '1px solid #E5E2DA', color: '#4A4A4A', fontFamily: 'var(--font-body, sans-serif)' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-sm italic leading-relaxed mt-auto"
                    style={{
                      borderLeft: `2px solid ${GOLD}`,
                      paddingLeft: '0.75rem',
                      color: '#6B6B6B',
                      fontFamily: 'var(--font-body, sans-serif)',
                    }}
                  >
                    {cert.unlocked}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
             style={{ color: GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
            The Proof
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            What the learning produced.
          </h2>
        </FadeUp>

        {/* Vertical timeline (mobile + desktop) */}
        <div className="relative">
          <div
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{ backgroundColor: `${GOLD}40` }}
          />
          <div className="space-y-6 pl-10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="absolute -left-7 top-1 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: i >= 4 ? TERRA : GOLD }}
                />
                <p className="text-xs font-semibold mb-0.5" style={{ color: i >= 4 ? TERRA : GOLD, fontFamily: 'var(--font-body, sans-serif)' }}>
                  {item.year}
                </p>
                <p className="text-sm leading-snug" style={{ color: '#4A4A4A', fontFamily: 'var(--font-body, sans-serif)' }}>
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <FadeUp delay={0.1}>
          <p
            className="mt-12 text-sm italic text-center max-w-2xl mx-auto"
            style={{ color: '#9B9588', fontFamily: 'var(--font-body, sans-serif)' }}
          >
            Fifteen distinctions across three formal qualifications.
            Seven production applications built after the last exam.
            The education never stopped — it just changed classrooms.
          </p>
        </FadeUp>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        className="max-w-5xl mx-auto px-6 py-16 text-center"
        style={{ borderTop: '1px solid #E5E2DA' }}
      >
        <FadeUp>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Curious what this background builds?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/projects"
              className="px-7 py-3.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4613A]"
              style={{ backgroundColor: TERRA, color: '#FAFAF8', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              See the Products →
            </Link>
            <Link
              href="/consulting"
              className="px-7 py-3.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
              style={{ border: '1px solid #D4D0C8', color: '#1A1A1A', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              Work With Me →
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
