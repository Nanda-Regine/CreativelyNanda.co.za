'use client';
import Link from 'next/link';
import Image from 'next/image';
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

// ── Data ──────────────────────────────────────────────────────────────────────

const NMU_QUALS = [
  {
    degree: 'Higher Certificate in Business Management',
    institution: 'Nelson Mandela University',
    year: '2020',
    nqf: 'NQF Level 5',
    significance: 'This is where systems thinking was born.',
    subjects: 'Operations Management · Financial Literacy · Marketing Fundamentals · Business Communication · Entrepreneurship Basics',
    connection: 'The entrepreneurship modules became the pricing philosophy. The financial literacy became the AdminOS ZAR token budget architecture. Every line of code has this degree in its DNA.',
    highlight: null,
    codeConnection: 'Entrepreneurship module → Mirembe Muse (Pty) Ltd incorporated.',
  },
  {
    degree: 'Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2021–2023',
    nqf: 'NQF Level 6',
    significance: 'Three years of strategic operations — the layer below the code.',
    subjects: 'Strategy · Operations Management · Financial Management · Human Resource Management · Marketing Research · Business Ethics',
    connection: 'Operations management thinking is why every Mirembe Muse app has audit logging, rate limiting, and documented handoff protocols. This degree is the architecture under the architecture.',
    highlight: null,
    codeConnection: 'Operations Management → AdminOS immutable audit log. Business Ethics → POPIA compliance day one.',
  },
  {
    degree: 'Advanced Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2024',
    nqf: 'NQF Level 7',
    significance: 'The final academic layer — 15 distinctions across all three qualifications combined.',
    subjects: 'Advanced Strategy · Research Methods · Entrepreneurship Development · Corporate Governance · International Business',
    connection: 'Strategic management frameworks are directly embedded in how Mirembe Muse is structured — eight apps, three mobile apps, one infrastructure, horizontal productisation. This is the business brain behind the code.',
    highlight: '15 DISTINCTIONS',
    codeConnection: 'Advanced Strategy → 8-product horizontal architecture. Corporate Governance → per-tenant data isolation, RLS at privilege level.',
  },
];

const TECH_ARC = [
  {
    date: 'Jul 2025',
    milestone: 'First line of code',
    tech: 'HTML · CSS · JavaScript',
    what: 'YouTube Clone, MoodCast Weather App',
    cert: 'SheCodes Plus',
    accent: '#FBBF24',
  },
  {
    date: 'Sep 2025',
    milestone: 'First production app shipped',
    tech: 'Next.js · TypeScript · Supabase · PayFast',
    what: 'Cortex Hub, GreenVault eCommerce',
    cert: null,
    accent: '#4A90D9',
  },
  {
    date: 'Oct 2025',
    milestone: 'Geospatial + real users',
    tech: 'Mapbox · PostGIS · Expo (web) · Complex data models',
    what: 'True Access v1, PoetryTube',
    cert: null,
    accent: '#10B981',
  },
  {
    date: 'Jan 2026',
    milestone: 'AI engineering begins',
    tech: 'Claude Sonnet + Haiku · Prompt caching · Multi-agent',
    what: 'VarsityOS (Nova AI) · StokvelOS',
    cert: 'Master Generative AI Professional',
    accent: '#C9943A',
  },
  {
    date: 'Mar 2026',
    milestone: 'Enterprise-grade architecture',
    tech: 'Inngest · Upstash Redis · WhatsApp API · RLS at scale',
    what: 'AdminOS · K53 Drill Master · WatchSankofa',
    cert: null,
    accent: '#C1292E',
  },
  {
    date: 'Jun 2026',
    milestone: '15-wing AI OS + mobile co-founder',
    tech: 'Expo SDK 52 · RAG · Redis inter-wing signals · iOS/Android',
    what: 'JarvisOS · Sanyu Botanicals · True Access v2',
    cert: null,
    accent: '#7B2FBE',
  },
];

const DEGREE_IN_CODE = [
  {
    subject: 'Operations Management',
    degree: 'Diploma',
    code: 'AdminOS immutable audit log — UPDATE and DELETE revoked at database privilege level, not application layer.',
  },
  {
    subject: 'Financial Literacy',
    degree: 'Hons. Cert.',
    code: 'Per-tenant ZAR token budgets with 50% hourly spike detection. AI cost controls built into the data model.',
  },
  {
    subject: 'Advanced Strategy',
    degree: 'Adv. Diploma',
    code: 'Eight-product horizontal architecture — one payment hub, one ITN webhook, six apps downstream.',
  },
  {
    subject: 'Human Resource Management',
    degree: 'Diploma',
    code: 'AI agent delegation patterns — Alex owns inbox, Chase owns debt recovery, Care owns wellness. Clear mandates, zero overlap.',
  },
  {
    subject: 'Business Ethics',
    degree: 'Diploma',
    code: 'POPIA compliance from day one. Soft delete only. Timestamps always UTC. No hard deletes, ever.',
  },
  {
    subject: 'Entrepreneurship Development',
    degree: 'Adv. Diploma',
    code: 'Mirembe Muse (Pty) Ltd — registered, POPIA-compliant, 8+ live products, 3+ paying clients, ZAR-native pricing.',
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
    context: 'Prompt engineering theory that now runs AI agents across eight production apps.',
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A0F2C] pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden pr-8">
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20vw', color: 'rgba(201,148,58,0.04)', lineHeight: 1, userSelect: 'none' }}>
            NMU
          </span>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              Nelson Mandela University · 2020–2024
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 112px)', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 4px 0' }}>
              THE EDUCATION
            </h1>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(52px, 10vw, 112px)', color: '#C9943A', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 20px 0' }}>
              THAT BUILT THE ENGINEER
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(16px, 2vw, 20px)', fontStyle: 'italic', color: 'rgba(245,240,232,0.7)', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 36px 0' }}>
              &ldquo;Three degrees. Six certifications. One year of code.
              And an ancestral knowing that none of this was coincidence.&rdquo;
            </p>
          </FadeUp>

          {/* Stats strip */}
          <FadeUp delay={0.3}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', borderTop: '1px solid rgba(201,148,58,0.2)' }}>
              {[
                { v: '15', l: 'Distinctions' },
                { v: '3', l: 'NMU Degrees' },
                { v: '6', l: 'Certifications' },
                { v: '8+', l: 'Live Apps Built' },
              ].map(({ v, l }, i) => (
                <div key={l} style={{
                  padding: '16px 28px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '30px', color: '#C9943A', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(245,241,232,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── GRADUATION GALLERY ────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0D1020] py-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />

        {/* Label */}
        <div className="relative z-10 px-6 pt-12 pb-6 max-w-5xl mx-auto">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
              The Moment
            </p>
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontStyle: 'italic', color: 'rgba(245,240,232,0.85)', margin: 0 }}>
              This is what 15 distinctions looks like.
            </p>
          </FadeUp>
        </div>

        {/* Photo grid */}
        <div className="relative z-10 px-6 pb-12 max-w-5xl mx-auto">
          <FadeUp delay={0.1}>
            {/* Main row: large feature + two stacked */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '6px', marginBottom: '6px' }}>

              {/* Feature photo — spans 2 rows */}
              <div style={{ gridRow: '1 / 3', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <Image
                  src="/assets/graduation/adv-dip-grad.jpg"
                  alt="Nanda at Advanced Diploma graduation — Nelson Mandela University 2024"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(10,15,44,0.9) 0%, transparent 60%)',
                  padding: '16px 14px',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.2em', margin: '0 0 3px 0' }}>
                    NQF LEVEL 7 · 2024
                  </p>
                  <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '13px', color: '#FFFFFF', margin: 0, fontStyle: 'italic' }}>
                    Advanced Diploma · Business Management
                  </p>
                </div>
              </div>

              {/* Top right */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image
                  src="/assets/graduation/diploma-grad.jpg"
                  alt="Nanda at Diploma graduation — Nelson Mandela University 2023"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(10,15,44,0.85) 0%, transparent 60%)',
                  padding: '10px 12px',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.15em', margin: 0 }}>
                    NQF LEVEL 6 · 2023
                  </p>
                </div>
              </div>

              {/* Middle right */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image
                  src="/assets/graduation/family-pic-diploma-grad.jpg"
                  alt="Nanda with family at Diploma graduation"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(10,15,44,0.85) 0%, transparent 60%)',
                  padding: '10px 12px',
                }}>
                  <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '11px', fontStyle: 'italic', color: 'rgba(245,240,232,0.7)', margin: 0 }}>
                    The family who made it possible.
                  </p>
                </div>
              </div>

            </div>

            {/* Second row: 3 equal photos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { src: '/assets/graduation/diploma-grad-2.jpg', label: 'Diploma · 2023', alt: 'Diploma graduation second photo' },
                { src: '/assets/graduation/mom-me-grad.jpg', label: 'With Mama.', alt: 'Nanda and mom at graduation', italic: true },
                { src: '/assets/graduation/adv-dip-grad-2.jpg', label: 'Adv. Diploma · 2024', alt: 'Advanced diploma graduation second photo' },
              ].map(({ src, label, alt, italic }) => (
                <div key={src} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(10,15,44,0.85) 0%, transparent 60%)',
                    padding: '8px 10px',
                  }}>
                    <p style={{
                      fontFamily: italic ? 'var(--font-display, Georgia, serif)' : 'var(--font-mono)',
                      fontSize: '9px', color: italic ? 'rgba(245,240,232,0.75)' : '#C9943A',
                      letterSpacing: italic ? 'normal' : '0.15em', fontStyle: italic ? 'italic' : 'normal', margin: 0,
                    }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Graduation video strip */}
        <FadeUp delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', maxWidth: '1160px', margin: '0 auto 0', padding: '0 24px 48px' }}>
            {[
              { src: '/assets/graduation/diploma-graduation.mp4', label: 'Diploma Graduation · NQF Level 6 · 2023' },
              { src: '/assets/graduation/adv-diploma-graduation.mp4', label: 'Advanced Diploma Graduation · NQF Level 7 · 2024' },
            ].map(({ src, label }) => (
              <div key={src} style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', background: '#050810' }}>
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', display: 'block', maxHeight: '260px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(10,15,44,0.92) 0%, transparent 70%)',
                  padding: '16px 16px',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.2em', margin: 0, textTransform: 'uppercase' as const }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── NMU ACADEMIC TIMELINE ─────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
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
              <div
                className="bg-white/60 backdrop-blur-sm border-l-4 border-[#C1292E] px-8 py-7 relative overflow-hidden"
                style={{ borderRadius: '40px 8px 40px 8px' }}
              >
                {q.highlight && (
                  <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    background: '#C1292E', color: '#FFFFFF',
                    fontFamily: 'var(--font-bebas)', fontSize: '13px',
                    letterSpacing: '0.12em', padding: '4px 12px', borderRadius: '2px',
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
                    <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '14px', fontStyle: 'italic', color: '#C1292E', margin: '0 0 8px 0' }}>
                      {q.significance}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#6B6B6B', letterSpacing: '0.05em', margin: '0 0 10px 0', lineHeight: 1.7 }}>
                      {q.subjects}
                    </p>
                    <p className="text-[#4A3728] text-sm leading-relaxed mb-4">{q.connection}</p>

                    {/* Code connection callout */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(10,15,44,0.06)', border: '1px solid rgba(10,15,44,0.1)',
                      padding: '6px 12px', borderRadius: '3px',
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C1292E', letterSpacing: '0.1em' }}>→ IN THE CODE:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4A3728', letterSpacing: '0.05em' }}>{q.codeConnection}</span>
                    </div>
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

      {/* ── NMU FEATURED ARTICLE ─────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-6 bg-[#0A0F2C]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              Featured Article
            </p>
            <div style={{ borderLeft: '3px solid #C9943A', paddingLeft: '24px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.4, margin: '0 0 10px 0' }}>
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

      {/* ── LEADERSHIP PROGRAMME ─────────────────────────────────────── */}
      <section className="relative z-10 py-14 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                  Leadership
                </p>
                <h2 className="font-display text-3xl font-bold text-[#0A1128] mb-4">
                  NMU Student Leadership Programme
                </h2>
                <p className="text-[#4A3728] text-base leading-relaxed">
                  Selected from hundreds of students across Nelson Mandela University,
                  Nanda&apos;s leadership cohort was built around one conviction: that the
                  next generation of African leaders would need both vision and
                  the infrastructure to execute it. She brought both.
                </p>
              </div>
              <div style={{
                background: 'rgba(10,15,44,0.06)', border: '1px solid rgba(10,15,44,0.12)',
                padding: '20px 24px', borderLeft: '4px solid #C1292E',
                minWidth: '220px', alignSelf: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#B8860B', letterSpacing: '0.2em', margin: '0 0 8px 0' }}>
                  WHAT IT BUILT
                </p>
                <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '14px', fontStyle: 'italic', color: '#0A1128', margin: 0, lineHeight: 1.6 }}>
                  The ability to hold the full picture: team, system, community, and consequence — simultaneously.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TECH EVOLUTION ARC ───────────────────────────────────────── */}
      <section className="relative z-10 bg-[#050810] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '16vw', color: 'rgba(123,47,190,0.04)', lineHeight: 1, userSelect: 'none', position: 'absolute', right: '-2vw', top: '50%', transform: 'translateY(-50%)' }}>
            CODE
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#7B2FBE', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              The Code Arc · Jul 2025 → Jun 2026
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '0.02em', margin: '0 0 8px 0' }}>
              ONE YEAR.
            </h2>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', color: '#7B2FBE', lineHeight: 0.95, letterSpacing: '0.02em', margin: '0 0 24px 0' }}>
              SIX TECHNOLOGY JUMPS.
            </h2>
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '16px', fontStyle: 'italic', color: 'rgba(245,240,232,0.55)', margin: '0 0 40px 0', maxWidth: '560px', lineHeight: 1.6 }}>
              The degree built the discipline. The code proved it. Here&apos;s what twelve months of learning in public actually looks like.
            </p>
          </FadeUp>

          {/* Timeline */}
          <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: '12px' }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: '12px', left: '12px', right: '12px', height: '1px',
              background: 'linear-gradient(to right, #FBBF24, #4A90D9, #10B981, #C9943A, #C1292E, #7B2FBE)',
              zIndex: 0, minWidth: 'calc(100% - 24px)',
            }} />

            <div style={{ display: 'flex', gap: '0', minWidth: 'max-content', position: 'relative', zIndex: 1 }}>
              {TECH_ARC.map((step, i) => (
                <motion.div
                  key={step.date}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ flex: 1, minWidth: '170px', paddingRight: '16px' }}
                >
                  {/* Node */}
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: step.accent, border: '2px solid #050810',
                    marginBottom: '16px',
                    boxShadow: `0 0 10px ${step.accent}80`,
                  }} />

                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: step.accent, letterSpacing: '0.15em', margin: '0 0 4px 0', textTransform: 'uppercase' as const }}>
                    {step.date}
                  </p>
                  <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '14px', color: 'rgba(245,240,232,0.9)', margin: '0 0 6px 0', letterSpacing: '0.05em' }}>
                    {step.milestone}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(245,240,232,0.5)', margin: '0 0 6px 0', lineHeight: 1.5, letterSpacing: '0.03em' }}>
                    {step.tech}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '11px', fontStyle: 'italic', color: `${step.accent}90`, margin: '0 0 4px 0' }}>
                    {step.what}
                  </p>
                  {step.cert && (
                    <span style={{
                      background: `${step.accent}15`, color: step.accent, border: `1px solid ${step.accent}35`,
                      fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.1em',
                      padding: '2px 8px', borderRadius: '2px', display: 'inline-block',
                    }}>
                      {step.cert} ✓
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary line */}
          <FadeUp delay={0.3}>
            <div style={{
              marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' as const,
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', margin: 0 }}>
                RESULT:
              </p>
              {['8+ live apps', '1,000+ commits', '15 AI wings (JarvisOS)', '3+ paying clients', 'Mirembe Muse (Pty) Ltd'].map((tag) => (
                <span key={tag} style={{
                  background: 'rgba(123,47,190,0.1)', border: '1px solid rgba(123,47,190,0.25)',
                  color: '#7B2FBE', fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '2px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SELF-TAUGHT CERTIFICATIONS ────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#1A1A1A]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="mb-10">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Technical Training
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '0.02em' }}>
              THE SELF-TAUGHT LAYER.
            </h2>
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '14px', fontStyle: 'italic', color: 'rgba(245,240,232,0.45)', margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
              Everything the university didn&apos;t teach, she taught herself. In parallel. While shipping.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((c, i) => (
              <FadeUp key={c.name} delay={i * 0.07}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: '3px solid #C9943A', padding: '20px',
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
                  <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '13px', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', margin: 0, lineHeight: 1.5, paddingLeft: '22px' }}>
                    {c.context}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE DEGREE IN THE CODE ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="mb-10">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Where the Degree Became Code
            </p>
            <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-3">
              Business school &mdash; architecture decisions.
            </h2>
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '15px', fontStyle: 'italic', color: '#4A3728', maxWidth: '560px', lineHeight: 1.6, margin: 0 }}>
              Every subject that seemed abstract became a concrete decision in production code.
            </p>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {DEGREE_IN_CODE.map((item, i) => (
              <FadeUp key={item.subject} delay={i * 0.06}>
                <div style={{
                  background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(26,26,46,0.1)', borderTop: '3px solid #C1292E',
                  padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#B8860B', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 3px 0' }}>
                        {item.degree}
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', fontWeight: 700, color: '#0A1128', margin: 0 }}>
                        {item.subject}
                      </h3>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#C1292E' }}>→</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '13px', fontStyle: 'italic', color: '#4A3728', margin: 0, lineHeight: 1.55 }}>
                    {item.code}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Bridge to work page */}
          <FadeUp delay={0.2}>
            <div style={{
              marginTop: '32px', padding: '20px 24px',
              background: 'rgba(10,15,44,0.06)', border: '1px solid rgba(10,15,44,0.12)',
              borderLeft: '4px solid #0A0F2C', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const,
            }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#B8860B', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                  From Campus to Codebase
                </p>
                <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '14px', fontStyle: 'italic', color: '#0A1128', margin: 0 }}>
                  See how the academic foundation translated into real work experience.
                </p>
              </div>
              <Link href="/work" style={{
                display: 'inline-block', background: '#0A0F2C', color: '#F5F1E8',
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em',
                padding: '10px 20px', textDecoration: 'none', whiteSpace: 'nowrap' as const,
              }}>
                View Work Experience →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] border-t border-[rgba(26,26,46,0.08)]">
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

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A0F2C] text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
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
            <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Business Management taught her how organisations work.<br />
              Code taught her how to rebuild them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-[#2D4A22] text-white font-semibold hover:bg-[#2D4A22]/90 transition-all hover:scale-105"
                style={{ borderRadius: '9999px' }}
              >
                See My Work →
              </Link>
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105"
                style={{ borderRadius: '9999px' }}
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
