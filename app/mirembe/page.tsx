'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// ─── Fade-up helper ────────────────────────────────────────────────────────────
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

// ─── Data ───────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '7', label: 'Live SaaS Products' },
  { value: '250+', label: 'Active Users' },
  { value: '6', label: 'Notion Templates' },
  { value: 'R300k', label: 'MRR Target 2026' },
];

const APPS = [
  {
    name: 'VarsityOS / Campus Compass',
    tag: 'EdTech · SA Students',
    problem: '50%+ university dropout rate — zero AI support.',
    status: 'Beta',
    href: 'https://campus-compass-phi.vercel.app',
  },
  {
    name: 'K53 Drill Master',
    tag: 'GovTech · Learner Drivers',
    problem: '60% K53 failure rate — a barrier to employment.',
    status: 'Live',
    href: 'https://nanda-k53-drill-master.vercel.app',
  },
  {
    name: 'StokvelOS',
    tag: 'FinTech · Community Finance',
    problem: 'R50 billion in stokvels managed on paper.',
    status: 'Beta',
    href: 'https://stokvelos.co.za',
  },
  {
    name: 'AdminOS',
    tag: 'B2B SaaS · SMEs',
    problem: 'R11,200/month in fragmented tools that barely work.',
    status: 'Beta',
    href: 'https://adminos.co.za',
  },
  {
    name: 'WatchSankofa',
    tag: 'Media · African Creators',
    problem: 'No streaming home built for African storytellers.',
    status: 'Beta',
    href: 'https://watchsankofa.co.za',
  },
  {
    name: 'SankofaSessions',
    tag: 'Media · African Founders',
    problem: 'No media platform for African entrepreneur stories.',
    status: 'Beta',
    href: 'https://sankofasessions.co.za',
  },
  {
    name: 'CreativelyNanda.co.za',
    tag: 'Portfolio · Hub',
    problem: 'A portfolio that is itself a deployed product.',
    status: 'Live',
    href: 'https://creativelynanda.co.za',
  },
];

const DIGITAL_PRODUCTS = [
  { name: 'SME Command Center', price: 'R449', audience: '2M+ African entrepreneurs' },
  { name: "Writer's Sanctuary", price: 'R299', audience: '500K+ aspiring writers' },
  { name: 'Varsity Engine', price: 'R279', audience: '1M+ SA university students' },
];

const PRINCIPLES = [
  {
    icon: '✦',
    title: 'Community-first design',
    body: 'Every feature asks: who does this serve?',
  },
  {
    icon: '◈',
    title: 'Access-priced products',
    body: 'World-class technology at African market prices.',
  },
  {
    icon: '❖',
    title: 'Africa-built, globally standard',
    body: 'WhatsApp-native. PayFast-integrated. Production-grade.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function Mirembe() {
  const [email, setEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setWaitlistStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'mirembe-botanical' }),
      });
      if (!res.ok) throw new Error('Failed');
      setWaitlistStatus('done');
    } catch {
      setWaitlistStatus('error');
    }
  };

  return (
    <main className="min-h-screen">
      {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <FadeUp>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-6">
            East London, South Africa · Registered 2025
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-display text-[72px] md:text-[88px] font-bold italic text-[#1A1A1A] leading-[0.9] mb-8 max-w-3xl">
            Where Transformation
            <br />Has a Template.
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-sans text-lg text-[#6B6B6B] leading-relaxed max-w-[600px] mb-10">
            Mirembe Muse (Pty) Ltd is an Africa-first technology company building AI-powered
            SaaS products, digital tools, and media properties for students, entrepreneurs,
            and creators across the continent.
          </p>
        </FadeUp>

        {/* Stats bar */}
        <FadeUp delay={0.3} className="w-full max-w-3xl mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A1A]/10 rounded-2xl overflow-hidden border border-[#1A1A1A]/10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#FAFAF8] px-4 py-6 text-center hover:bg-[#F5F0E8] transition-colors">
                <div className="font-display text-4xl font-bold text-[#C9A84C]">{s.value}</div>
                <div className="text-xs text-[#6B6B6B] tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Explore the Portfolio →
          </Link>
          <Link
            href="/consulting"
            className="px-8 py-4 border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-full font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Work With Us →
          </Link>
        </FadeUp>
      </section>

      {/* ── SECTION 2: THE NAME ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F2F0EB]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16 items-center">
          {/* Left 60% */}
          <FadeUp className="md:col-span-3">
            <div className="border-l-4 border-[#C9A84C] pl-8">
              <p className="font-display text-3xl md:text-4xl italic text-[#1A1A1A] leading-snug mb-6">
                &ldquo;Mirembe means peace in Luganda.
                <br />Muse is the spark of inspiration.&rdquo;
              </p>
            </div>
            <p className="text-[#6B6B6B] leading-[1.8] max-w-xl mt-6">
              Named for founder Nandawula Regine&apos;s Ugandan heritage and the creative force
              behind everything built under this company. Technology built with peace as the
              intention — and inspiration as the method. This is Ubuntu in code.
            </p>
          </FadeUp>

          {/* Right 40% — Founder card */}
          <FadeUp delay={0.15} className="md:col-span-2">
            <div className="border border-[#1A1A1A]/10 rounded-lg p-8 bg-[#FAFAF8]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 bg-[#F2F0EB]">
                  <Image
                    src="/assets/professional/nanda-professional.jpg"
                    alt="Nandawula Regine"
                    fill
                    className="object-cover"
                    onError={() => {}} // graceful fallback — shows bg color
                  />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#1A1A1A]">
                    Nandawula Regine Kabali-Kagwa
                  </h3>
                  <p className="text-xs text-[#C9A84C] tracking-widest uppercase mt-0.5">
                    Founder & Creative Director
                  </p>
                </div>
              </div>
              <p className="text-[#6B6B6B] text-sm italic leading-relaxed mb-4">
                &ldquo;Published poet. AI engineer. Five ancestral lineages.&rdquo;
              </p>
              <Link
                href="/about"
                className="text-sm text-[#C9A84C] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
              >
                Read her full story →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 3: THE PORTFOLIO ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              What We Build
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1A1A1A] italic leading-tight mb-6">
              Seven Africa-first products.
              <br />One infrastructure. One vision.
            </h2>
            <p className="text-[#6B6B6B] max-w-[560px] mx-auto leading-relaxed">
              Every Mirembe Muse product targets a distinct African market failure — not as
              charity, but as business. The continent has the problems. We build the infrastructure.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5">
            {APPS.map((app, i) => (
              <FadeUp key={app.name} delay={i * 0.07}>
                <div className="border border-[#1A1A1A]/10 rounded-lg p-6 bg-[#F2F0EB] hover:border-[#C9A84C]/40 transition-colors h-full flex flex-col">
                  <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-sans mb-2">
                    {app.tag}
                  </p>
                  <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2 leading-snug">
                    {app.name}
                  </h3>
                  <p className="text-[#6B6B6B] text-[13px] italic leading-relaxed flex-1 mb-4">
                    {app.problem}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        app.status === 'Live'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {app.status}
                    </span>
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#C9A84C] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
                    >
                      View product →
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DIGITAL PRODUCTS ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Digital Products
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-tight mb-6">
              Six Notion templates.
              <br />Built for real African life.
            </h2>
            <p className="text-white/70 max-w-[560px] mx-auto leading-relaxed">
              Productivity systems for students, entrepreneurs, musicians, writers, and creators.
              Instant delivery. Lifetime access.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {DIGITAL_PRODUCTS.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.1}>
                <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-7 hover:border-[#C9A84C]/60 transition-colors">
                  <h3 className="font-display text-xl text-white mb-2 leading-snug">{p.name}</h3>
                  <p className="font-display text-2xl text-[#C9A84C] font-bold mb-2">{p.price}</p>
                  <p className="text-white/50 text-sm">{p.audience}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center">
            <Link
              href="/products"
              className="text-white font-medium border-b border-white/40 pb-0.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
            >
              Browse all 6 templates →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 5: UBUNTU PHILOSOPHY ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Ubuntu × Technology
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#1A1A1A] leading-tight mb-8">
              I am because we are.
            </h2>
            <p className="text-[#6B6B6B] max-w-[640px] mx-auto leading-[1.8]">
              Every product Mirembe Muse builds is designed around a single principle: technology
              should amplify community, not extract from it. Ubuntu philosophy is not a tagline
              here — it is the architecture. Systems are built for collective flourishing. Pricing
              is designed for access. The African context is not an afterthought. It is the
              foundation.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5">
            {PRINCIPLES.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div className="border border-[#1A1A1A]/10 rounded-lg p-8 bg-[#F2F0EB] hover:border-[#C9A84C]/30 transition-colors">
                  <div className="text-[#C9A84C] text-3xl mb-4 font-display">{p.icon}</div>
                  <h3 className="font-sans font-semibold text-[#1A1A1A] mb-2">{p.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BOTANICAL LINE ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F5EDE8]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C4613A] mb-4">
              On the Horizon
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#1A1A1A] leading-tight mb-6">
              The botanical line
              <br />is in development.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed max-w-xl mx-auto mb-12">
              Africa has always held the secrets to wellness in its botanicals — Nigella Sativa,
              Hibiscus, Jamaican Black Castor, Shea Butter, Moringa. Mirembe Muse is bringing
              this ancestral wisdom to the world, packaged with intention and backed by the
              precision of modern formulation.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            {waitlistStatus === 'done' ? (
              <p className="text-lg text-[#1A1A1A] font-display italic">
                You&apos;re on the list. We&apos;ll be in touch. 🌿
              </p>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-4 rounded-lg border border-[#C4613A]/20 bg-white focus:outline-none focus:border-[#C4613A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === 'loading'}
                  className="px-6 py-4 bg-[#C4613A] text-white rounded-lg font-semibold hover:bg-[#C4613A]/90 transition-all disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4613A] whitespace-nowrap"
                >
                  {waitlistStatus === 'loading' ? 'Joining…' : 'Be first to know'}
                </button>
              </form>
            )}
            {waitlistStatus === 'error' && (
              <p className="text-sm text-red-500 mt-3">Something went wrong. Try again.</p>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-10 leading-tight">
              Build with us.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                href="/projects"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-white/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Explore the apps
              </Link>
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#C9A84C]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                Work with Nanda
              </Link>
              <a
                href="https://linkedin.com/in/nandawula-kabali-kagwa-584bb0262"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-white/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Follow the build ↗
              </a>
            </div>
            <p className="font-sans text-[11px] text-white/40 tracking-wide">
              Mirembe Muse (Pty) Ltd · East London, South Africa · hello@mirembemuse.co.za
            </p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
