'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const SERVICES = [
  {
    icon: '⬡',
    title: 'Full-Stack Development',
    body: 'End-to-end web and mobile applications — from architecture to deployment. React, Next.js, TypeScript, Supabase, Claude API. Seven production apps shipped solo.',
    accent: '#C1292E',
    shape: '48px 12px 48px 12px',
  },
  {
    icon: '◈',
    title: 'Digital Marketing & Growth',
    body: 'SEO-first content strategy, social media systems, email automation, and brand positioning for African businesses ready to scale online.',
    accent: '#B8860B',
    shape: '12px 48px 12px 48px',
  },
  {
    icon: '◆',
    title: 'Systems Architecture',
    body: 'Business operating systems built in Notion and code. Six templates live across four platforms. Custom automation pipelines, WhatsApp-native workflows, AI agent orchestration.',
    accent: '#C1292E',
    shape: '48px 12px 48px 12px',
  },
  {
    icon: '◇',
    title: 'Media & Publishing',
    body: 'From poetry collections to Substack newsletters. Brand voice, editorial identity, content production — the infrastructure behind a message that lands.',
    accent: '#B8860B',
    shape: '12px 48px 12px 48px',
  },
];

const PROOF = [
  { label: '7', sub: 'Production SaaS apps' },
  { label: '550+', sub: 'GitHub commits' },
  { label: '6', sub: 'Notion templates live' },
  { label: '3', sub: 'Consecutive qualifications' },
];

const APPS = [
  { name: 'VarsityOS', tag: 'EdTech · AI', href: 'https://campus-compass-phi.vercel.app', upgrading: false },
  { name: 'K53 Drill Master', tag: 'GovTech · SaaS', href: 'https://nanda-k53-drill-master.vercel.app', upgrading: false },
  { name: 'StokvelOS', tag: 'FinTech · AI', href: 'https://stokvelos.co.za', upgrading: true },
  { name: 'AdminOS', tag: 'BizTech · AI Agents', href: 'https://adminos.co.za', upgrading: true },
  { name: 'WatchSankofa', tag: 'Media · Streaming', href: 'https://watchsankofa.co.za', upgrading: true },
  { name: 'SankofaSessions', tag: 'Publication', href: 'https://sankofasessions.co.za', upgrading: true },
  { name: 'CreativelyNanda.co.za', tag: 'Portfolio · Product', href: 'https://creativelynanda.co.za', upgrading: false },
];

export default function MirembePage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO — full-bleed dark ─────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] pt-32 pb-28 px-6 overflow-hidden">
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        {/* Cherry blob — top right */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C1292E]/15 pointer-events-none" style={{ borderRadius: '0 0 0 100%' }} />
        {/* Gold blob — bottom left */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B8860B]/10 pointer-events-none" style={{ borderRadius: '0 100% 0 0' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Logo with text fallback */}
          <div className="mb-10 h-32 flex items-center">
            <Image
              src="/assets/logos/mirembe-muse-logo.png"
              alt="Mirembe Muse"
              width={360}
              height={120}
              priority
              className="object-contain"
              style={{ mixBlendMode: 'screen', maxHeight: '120px', width: 'auto' }}
            />
          </div>

          <FadeUp>
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#C1292E] mb-5">
              Mirembe Muse (Pty) Ltd · East London, South Africa
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.92] mb-6">
              I build the tools<br />
              Africa hasn&apos;t had yet.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-display text-xl md:text-2xl italic text-[#B8860B] leading-relaxed max-w-2xl mb-10">
              Full-stack engineer · Digital strategist · Systems architect · Media publisher.
              One founder. Seven apps. Africa-first infrastructure.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Work with Nanda →
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-[#B8860B] hover:text-[#B8860B] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                See the work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROOF NUMBERS — cream strip ──────────────────────────────── */}
      <section className="relative py-12 px-6 bg-[#F5EFE6]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {PROOF.map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.07}>
              <div className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-[#C1292E] mb-1">{p.label}</div>
                <div className="text-xs text-[#6B6B6B] tracking-widest uppercase font-medium">{p.sub}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES — what I do ──────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="mb-14">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-3">What I build</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold italic text-[#0A1128] leading-tight">
              Not just a developer.<br />
              <span className="text-[#C1292E]">A complete digital partner.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <div
                  className="bg-[#0A1128] p-8 relative overflow-hidden group hover:bg-[#1a2744] transition-colors"
                  style={{ borderRadius: s.shape }}
                >
                  {/* Grain on cards */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ backgroundColor: s.accent, borderRadius: '0 12px 0 100%' }}
                  />
                  <div className="relative z-10">
                    <span className="text-3xl mb-4 block" style={{ color: s.accent }}>{s.icon}</span>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPS — proof of work ──────────────────────────────────────── */}
      <section className="relative py-20 px-6 bg-[#0A1128]">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        {/* Asymmetric cherry shape */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-[#C1292E]/10 pointer-events-none" style={{ borderRadius: '50% 0 50% 0' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="mb-10">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-3">The proof</p>
            <h2 className="font-display text-4xl font-bold text-white">
              Seven apps. One founder. Nine months.
            </h2>
            <p className="text-white/50 mt-3 max-w-xl text-sm leading-relaxed">
              Each app solves a real African problem. All built solo. All in production. None of them demos. Nine months from zero coding knowledge to seven live AI SaaS applications.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {APPS.map((app, i) => (
              <FadeUp key={app.name} delay={i * 0.06}>
                {app.upgrading ? (
                  <div className="flex items-center justify-between p-5 bg-white/3 border border-white/8 rounded-xl opacity-60 cursor-not-allowed select-none">
                    <div>
                      <h3 className="font-display font-bold text-white/50 text-base">{app.name}</h3>
                      <p className="text-white/30 text-xs mt-0.5">{app.tag}</p>
                      <p className="text-blue-300/70 text-xs mt-1 font-medium tracking-wide">⏸ Upgrading in progress</p>
                    </div>
                    <span className="text-white/15 text-sm ml-4 shrink-0">⏸</span>
                  </div>
                ) : (
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-xl hover:border-[#C1292E]/40 hover:bg-white/8 transition-all"
                  >
                    <div>
                      <h3 className="font-display font-bold text-white text-base group-hover:text-[#C1292E] transition-colors">{app.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{app.tag}</p>
                    </div>
                    <span className="text-white/20 group-hover:text-[#C1292E] transition-colors text-sm ml-4 shrink-0">↗</span>
                  </a>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── UBUNTU AS ARCHITECTURE ──────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#0A1128]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeUp>
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-4">Philosophy</p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 6vw, 64px)', color: '#FFFFFF', margin: '0 0 20px 0', letterSpacing: '0.02em', lineHeight: 1 }}>
              UBUNTU AS ARCHITECTURE.
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Ubuntu — &ldquo;I am because we are&rdquo; — is not philosophy at Mirembe Muse. It is embedded in
              the technical decisions. StokvelOS protects community savings because community built the wealth.
              AdminOS serves SMEs because an SME ecosystem sustains communities. VarsityOS supports students
              because their success strengthens the country. Every product in this portfolio is Ubuntu made digital.
            </p>
          </FadeUp>

          {/* Company facts block */}
          <FadeUp delay={0.2}>
            <div style={{ border: '1px solid rgba(201,148,58,0.3)', padding: '24px', background: 'rgba(201,148,58,0.03)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#C9943A', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 14px 0' }}>
                Company Facts
              </p>
              <div style={{ display: 'grid', gap: '8px' }}>
                {[
                  ['Company', 'Mirembe Muse (Pty) Ltd'],
                  ['Registered', 'South Africa (CIPC)'],
                  ['Location', 'East London, Eastern Cape'],
                  ['Founded', '2025'],
                  ['POPIA Registration', '2026-005658 · Registered 2026-04-03'],
                  ['Information Officer', 'Kabali-Kagwa, Nandawula · Appointed 2025-08-28'],
                  ['Products', '7 live SaaS applications'],
                  ['Build time', '9 months from zero coding knowledge'],
                  ['Tech', 'Next.js · TypeScript · Supabase · Claude API · PayFast · Vercel'],
                  ['Philosophy', 'Ubuntu — I am because we are'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(201,148,58,0.6)', letterSpacing: '0.15em', minWidth: '180px', paddingTop: '2px' }}>
                      {k}
                    </span>
                    <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: 'rgba(245,240,232,0.8)' }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE NAME ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        {/* Decorative oversized word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-display text-[20vw] font-bold text-[#0A1128]/5 select-none leading-none">
            MIREMBE
          </span>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeUp>
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-6">The name</p>
            <p className="font-display text-4xl md:text-5xl font-bold text-[#0A1128] leading-tight mb-6">
              Mirembe.
            </p>
            <p className="text-[#4A3728] text-lg leading-relaxed max-w-xl">
              In Luganda — the language of the Kabali-Kagwa clan — <strong>mirembe</strong> means peace.
              Not the absence of struggle. The presence of wholeness. Every product built under this name
              carries that mandate: technology that restores, not extracts.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── TAGLINE — cherry diagonal ─────────────────────────────────── */}
      <section
        className="bg-[#C1292E] pt-20 pb-16 px-6 relative"
        style={{ clipPath: 'polygon(0 10%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center pt-4">
          <p className="font-display text-4xl md:text-5xl italic text-white leading-snug mb-6">
            &ldquo;Where Transformation Has a Template.&rdquo;
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start a conversation →
          </Link>
        </div>
      </section>

      {/* ── FOOTER — dark navy ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0A1128] text-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-xl mx-auto relative z-10">
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/logos/mirembe-muse-logo.png"
              alt="Mirembe Muse"
              width={160}
              height={56}
              className="object-contain"
              style={{ mixBlendMode: 'screen', maxHeight: '56px', width: 'auto' }}
            />
          </div>
          <p className="text-white/50 text-sm mb-2">
            Mirembe Muse (Pty) Ltd · East London, Eastern Cape, South Africa
          </p>
          <a href="mailto:hello@mirembemuse.co.za" className="text-[#C1292E] hover:underline text-sm">
            hello@mirembemuse.co.za
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:border-[#C1292E] hover:text-[#C1292E] transition-all">
              Get in touch →
            </Link>
            <Link href="/products" className="inline-block px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:border-[#B8860B] hover:text-[#B8860B] transition-all">
              Shop templates →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
