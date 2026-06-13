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

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const NMU_QUALS = [
  {
    degree: 'Higher Certificate in Business Management',
    institution: 'Nelson Mandela University',
    year: '2020',
    nqf: 'NQF Level 5',
    significance: 'This is where systems thinking was born.',
    subjects: 'Operations Management, Financial Literacy, Marketing Fundamentals, Business Communication, Entrepreneurship Basics',
    connection: 'The entrepreneurship modules became the pricing philosophy. The financial literacy became the AdminOS budget architecture. Every line of code has this degree in its DNA.',
    highlight: null,
  },
  {
    degree: 'Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2021–2023',
    nqf: 'NQF Level 6',
    significance: 'Three years of strategic operations — the layer below the code.',
    subjects: 'Strategy, Operations Management, Financial Management, Human Resource Management, Marketing Research, Business Ethics',
    connection: 'Operations management thinking is why every Mirembe Muse app has audit logging, rate limiting, and documented handoff protocols. This degree is the architecture under the architecture.',
    highlight: null,
  },
  {
    degree: 'Advanced Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2024',
    nqf: 'NQF Level 7',
    significance: 'The final academic layer — 15 distinctions across all three qualifications combined.',
    subjects: 'Advanced Strategy, Research Methods, Entrepreneurship Development, Corporate Governance, International Business',
    connection: 'Strategic management frameworks are directly embedded in how Mirembe Muse is structured — eight apps, three mobile apps, one infrastructure, horizontal productisation. This is the business brain behind the code.',
    highlight: '15 DISTINCTIONS',
  },
];

const CERTS = [
  {
    name: 'SheCodes Plus',
    issuer: 'SheCodes',
    year: '2025',
    context: 'The foundation. HTML, CSS, and React in six months — while building the K53 app simultaneously.',
  },
  {
    name: 'Google Digital Marketing & E-commerce',
    issuer: 'Google / Coursera',
    year: '2025',
    context: 'How she understands her users before writing a single line of code.',
  },
  {
    name: 'Master Generative AI Professional',
    issuer: 'Great Learning',
    year: '2025',
    context: 'Prompt engineering theory that now runs seven AI agents across five apps.',
  },
  {
    name: 'ChatGPT for Business Communication',
    issuer: 'Great Learning',
    year: '2025',
    context: 'How she builds AI assistants that sound human — not robotic.',
  },
  {
    name: 'Human-Centered Design',
    issuer: 'IDEO',
    year: '2024',
    context: 'Nova on VarsityOS. The UX of StokvelOS. The onboarding of AdminOS. All start here.',
  },
  {
    name: 'Graphic Design Essentials',
    issuer: 'Online Academy',
    year: '2024',
    context: 'The editorial design eye behind every case study, every brand, every cover.',
  },
];

const NMU_ARTICLE_BULLETS = [
  'Featured in Nelson Mandela University communications — 135,000+ followers',
  'Recognised for academic excellence across three consecutive qualifications',
  'Named as a graduand who found her calling while studying Business Management',
  'Cited as an example of the intersection between academic rigour and creative expression',
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── HERO — editorial magazine heading ─────────────────────────── */}
      <section className="relative z-10 bg-[#0A0F2C] pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        {/* Large decorative background text */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden pr-8">
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20vw', color: 'rgba(201,148,58,0.04)', lineHeight: 1, userSelect: 'none' }}>
            NMU
          </span>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              Nelson Mandela University · 2020–2024
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 112px)', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 12px 0' }}>
              THE EDUCATION
            </h1>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 112px)', color: '#C9943A', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 20px 0' }}>
              THAT BUILT THE ENGINEER
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(16px, 2vw, 20px)', fontStyle: 'italic', color: 'rgba(245,240,232,0.7)', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
              &ldquo;Three degrees. Six certifications. One year of code.
              And an ancestral knowing that none of this was coincidence.&rdquo;
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── NMU ACADEMIC TIMELINE ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <FadeUp className="mb-10">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Formal Education
          </p>
          <h2 className="font-display text-4xl font-bold text-[#0A1128]">
            Where systems thinking was built.
          </h2>
        </FadeUp>

        <div className="space-y-6">
          {NMU_QUALS.map((q, i) => (
            <FadeUp key={q.degree} delay={i * 0.1}>
              <div className="bg-white/60 backdrop-blur-sm border-l-4 border-[#C1292E] px-8 py-7 relative overflow-hidden"
                style={{ borderRadius: '40px 8px 40px 8px' }}>
                {/* Significance stamp */}
                {q.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#C1292E',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '13px',
                    letterSpacing: '0.12em',
                    padding: '4px 12px',
                    borderRadius: '2px',
                  }}>
                    {q.highlight}
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#B8860B', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                      {q.nqf} · {q.institution}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-2">{q.degree}</h3>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '14px', fontStyle: 'italic', color: '#C1292E', margin: '0 0 8px 0' }}>
                      {q.significance}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#6B6B6B', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>
                      {q.subjects}
                    </p>
                    <p className="text-[#4A3728] text-sm leading-relaxed">{q.connection}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-3xl font-bold text-[#C1292E]">{q.year}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── NMU FEATURED ARTICLE — pull quote ───────────────────────── */}
      <section className="relative z-10 py-16 px-6 bg-[#0A0F2C]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              Featured Article
            </p>
            <div style={{ borderLeft: '3px solid #C9943A', paddingLeft: '24px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                &ldquo;Management graduand finds calling in writing&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.2em', margin: 0 }}>
                — Nelson Mandela University · 135,000+ followers
              </p>
            </div>
            <div className="space-y-3">
              {NMU_ARTICLE_BULLETS.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C9943A', fontFamily: 'var(--font-mono)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>—</span>
                  <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', color: 'rgba(245,240,232,0.7)', margin: 0, lineHeight: 1.6 }}>
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LEADERSHIP PROGRAM ───────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Leadership
            </p>
            <h2 className="font-display text-3xl font-bold text-[#0A1128] mb-6">
              NMU Student Leadership Programme
            </h2>
            <p className="text-[#4A3728] text-base leading-relaxed">
              Selected from hundreds of students across Nelson Mandela University,
              Nanda&apos;s leadership cohort was built around one conviction: that the
              next generation of African leaders would need both vision and
              the infrastructure to execute it. She brought both.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CERTIFICATIONS — with context ───────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#1A1A1A]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp className="mb-10">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Technical Training
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '0.02em' }}>
              THE SELF-TAUGHT LAYER.
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((c, i) => (
              <FadeUp key={c.name} delay={i * 0.07}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: '3px solid #C9943A',
                  padding: '20px',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#C1292E', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 2px 0' }}>
                        {c.name}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', letterSpacing: '0.15em', margin: 0 }}>
                        {c.issuer} · {c.year}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', margin: 0, lineHeight: 1.5, paddingLeft: '22px' }}>
                    {c.context}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-display text-3xl md:text-4xl italic text-[#0A1128] leading-relaxed">
              &ldquo;The degree taught me to think in systems. The code taught me to build them.
              The distinction between the two collapsed somewhere around my 200th commit.&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '24px' }}>
              — Nandawula Regine Kabali-Kagwa
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BOTTOM CTA — one year ────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A0F2C] text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18vw', color: 'rgba(201,148,58,0.04)', lineHeight: 1, userSelect: 'none', textAlign: 'center' }}>
            ONE<br />YEAR
          </span>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeUp>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 100px)', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 4px 0' }}>
              ONE YEAR.
            </h2>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 100px)', color: '#C9943A', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 4px 0' }}>
              EIGHT APPLICATIONS.
            </h2>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 100px)', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 28px 0' }}>
              ONE VISION.
            </h2>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Business Management taught her how organisations work.<br />
              Code taught her how to rebuild them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-[#2D4A22] text-white rounded-full font-semibold hover:bg-[#2D4A22]/90 transition-all hover:scale-105"
              >
                See My Work →
              </Link>
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105"
              >
                Work With Me →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
