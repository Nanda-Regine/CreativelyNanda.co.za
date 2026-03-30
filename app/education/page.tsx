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

const NMU_QUALS = [
  {
    degree: 'Higher Certificate in Business Management',
    institution: 'Nelson Mandela University',
    year: '2020',
    dists: 'Distinctions earned',
    nqf: 'NQF Level 5',
    connection: 'The entrepreneurship modules became the pricing philosophy. The financial literacy became the AdminOS budget architecture.',
  },
  {
    degree: 'Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2021–2023',
    dists: 'Distinctions earned',
    nqf: 'NQF Level 6',
    connection: 'Operations management thinking is why every Mirembe Muse app has audit logging, rate limiting, and documented handoff protocols.',
  },
  {
    degree: 'Advanced Diploma in Business Management',
    institution: 'Nelson Mandela University',
    year: '2024',
    dists: '15 Distinctions total',
    nqf: 'NQF Level 7',
    connection: 'Strategic management frameworks are directly embedded in how Mirembe Muse is structured — seven apps, one infrastructure, horizontal productisation.',
  },
];

const CERTS = [
  { name: 'SheCodes Plus', issuer: 'SheCodes', year: '2025' },
  { name: 'Master Generative AI Professional', issuer: 'Great Learning', year: '2025' },
  { name: 'Google Digital Marketing & E-commerce', issuer: 'Google / Coursera', year: '2025' },
  { name: 'ChatGPT for Business Communication', issuer: 'Great Learning', year: '2025' },
  { name: 'Human-Centered Design', issuer: 'IDEO', year: '2024' },
  { name: 'Graphic Design Essentials', issuer: 'Online Academy', year: '2024' },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">

      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO — dark navy ─────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A1128] pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6">
              Three qualifications.<br />Fifteen distinctions.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#C1292E] font-display text-xl italic">
              Nelson Mandela University · 2020–2024
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── QUALIFICATIONS — cream ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <FadeUp className="mb-10">
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-2">Formal education</p>
          <h2 className="font-display text-4xl font-bold text-[#0A1128]">Where systems thinking was built.</h2>
        </FadeUp>

        <div className="space-y-6">
          {NMU_QUALS.map((q, i) => (
            <FadeUp key={q.degree} delay={i * 0.1}>
              <div
                className="bg-white/60 backdrop-blur-sm border-l-4 border-[#C1292E] px-8 py-7 flex flex-col md:flex-row md:items-center gap-6"
                style={{ borderRadius: '40px 8px 40px 8px' }}
              >
                <div className="flex-1">
                  <p className="text-[#B8860B] text-xs tracking-widest uppercase font-sans mb-1">{q.nqf} · {q.institution}</p>
                  <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-1">{q.degree}</h3>
                  <p className="text-[#4A3728] text-sm leading-relaxed">{q.connection}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-3xl font-bold text-[#C1292E]">{q.year}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">{q.dists}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS — dark ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="mb-10">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-2">Technical certifications</p>
            <h2 className="font-display text-4xl font-bold text-white">The self-taught layer.</h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map((c, i) => (
              <FadeUp key={c.name} delay={i * 0.07}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C1292E]/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-[#C1292E] text-lg mt-0.5 shrink-0">✓</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm leading-snug mb-1">{c.name}</h3>
                      <p className="text-white/50 text-xs">{c.issuer} · {c.year}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE — cream ────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-3xl md:text-4xl italic text-[#0A1128] leading-relaxed">
              &ldquo;The degree taught me to think in systems. The code taught me to build them.
              The distinction between the two collapsed somewhere around my 200th commit.&rdquo;
            </p>
            <p className="text-[#B8860B] font-sans text-sm tracking-widest uppercase mt-6">
              — Nandawula Regine Kabali-Kagwa
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-6 bg-[#0A1128] text-center">
        <FadeUp>
          <a
            href="/assets/work/Nanda-cv.pdf"
            download
            className="inline-block px-10 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105"
          >
            View full CV
          </a>
          <p className="text-white/40 text-sm mt-4">PDF opens in a new tab</p>
        </FadeUp>
      </section>
    </div>
  );
}
