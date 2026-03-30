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

const APPS = [
  {
    name: 'VarsityOS',
    mission: 'AI-powered student wellness and academic support — tackling South Africa\'s 50% dropout rate.',
    status: 'Beta',
    href: 'https://campus-compass-phi.vercel.app',
  },
  {
    name: 'K53 Drill Master',
    mission: 'Spaced-repetition learner\'s licence prep with isiXhosa support — removing a barrier to employment.',
    status: 'Live',
    href: 'https://nanda-k53-drill-master.vercel.app',
  },
  {
    name: 'StokvelOS',
    mission: 'Africa\'s first AI-native stokvel management platform — digitising R50 billion in community finance.',
    status: 'Beta',
    href: 'https://stokvelos.co.za',
  },
  {
    name: 'AdminOS',
    mission: 'Five specialist AI agents replacing six separate subscriptions for South African SMEs.',
    status: 'Beta',
    href: 'https://adminos.co.za',
  },
  {
    name: 'WatchSankofa',
    mission: 'Streaming built for African creators — 85% revenue share vs Netflix\'s 7%.',
    status: 'Beta',
    href: 'https://watchsankofa.co.za',
  },
  {
    name: 'SankofaSessions',
    mission: 'A media publication for African founders and creators.',
    status: 'Beta',
    href: 'https://sankofasessions.co.za',
  },
  {
    name: 'CreativelyNanda.co.za',
    mission: 'Not a resume — a deployed, revenue-generating product.',
    status: 'Live',
    href: 'https://creativelynanda.co.za',
  },
];

export default function MirembePage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO — full-bleed dark + grain ─────────────────────────────── */}
      <section className="relative bg-[#0A1128] pt-32 pb-24 px-6 overflow-hidden">
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Asymmetric decorative shape */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 bg-[#C1292E]/20 pointer-events-none"
          style={{ borderRadius: '100% 0 0 0' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Logo */}
          <div className="mb-10">
            <Image
              src="/assets/logos/mirembe-muse-logo.png"
              alt="Mirembe Muse"
              width={160}
              height={56}
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <FadeUp>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[0.9] mb-6">
              Where Transformation<br />Has a Template.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-display text-xl italic text-[#B8860B] leading-relaxed max-w-xl">
              Africa-first AI infrastructure. Built from East London.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── WHAT MIREMBE MEANS — cream ──────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="max-w-3xl mx-auto">
          {/* Grain */}
          <div
            className="fixed inset-0 pointer-events-none opacity-30 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <FadeUp className="relative z-10">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-6">The name</p>
            <p className="font-display text-7xl md:text-9xl font-bold text-[#0A1128] leading-none mb-8 opacity-10 select-none">
              Mirembe.
            </p>
            <p className="font-display text-4xl md:text-5xl font-bold text-[#0A1128] leading-tight mb-6 -mt-16 relative z-10">
              Mirembe.
            </p>
            <p className="text-[#4A3728] text-lg leading-relaxed max-w-xl">
              In Luganda — the language of the Kabali-Kagwa clan — <strong>mirembe</strong> means peace.
              Not the absence of struggle. The presence of wholeness.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 7 APPS GRID — cream → dark alternating ──────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-3">The portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1128]">
              Seven apps. One vision. Africa-first.
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {APPS.map((app, i) => (
              <FadeUp key={app.name} delay={i * 0.07}>
                <div
                  className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] rounded-xl p-7 flex flex-col group relative overflow-hidden"
                  style={{ borderRadius: '32px 12px 32px 12px' }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/10 group-hover:bg-[#C1292E]/15 transition-colors" style={{ borderRadius: '0 12px 0 100%' }} />
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-2xl font-bold text-white">{app.name}</h3>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full ml-2 shrink-0"
                      style={{
                        backgroundColor: app.status === 'Live' ? '#C1292E20' : '#FFFFFF15',
                        color: app.status === 'Live' ? '#C1292E' : '#FFFFFF80',
                        border: `1px solid ${app.status === 'Live' ? '#C1292E50' : '#FFFFFF25'}`,
                      }}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-1 mb-5">{app.mission}</p>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C1292E] text-xs font-semibold hover:underline"
                  >
                    Visit app ↗
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAGLINE — cherry clip-path ──────────────────────────────────── */}
      <section
        className="bg-[#C1292E] pt-24 pb-20 px-6"
        style={{ clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <p className="font-display text-5xl italic text-white text-center max-w-2xl mx-auto">
          &ldquo;Where Transformation Has a Template.&rdquo;
        </p>
      </section>

      {/* ── CONTACT — dark navy ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A1128] text-center">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <Image
              src="/assets/logos/mirembe-muse-logo.png"
              alt="Mirembe Muse"
              width={120}
              height={42}
              className="object-contain mx-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p className="text-white/70 text-sm mb-2">
            Mirembe Muse (Pty) Ltd · East London, Eastern Cape, South Africa
          </p>
          <a
            href="mailto:hello@mirembemuse.co.za"
            className="text-[#C1292E] hover:underline text-sm"
          >
            hello@mirembemuse.co.za
          </a>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:border-[#C1292E] hover:text-[#C1292E] transition-all"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
