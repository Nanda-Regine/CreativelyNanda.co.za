'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MagazineCover from '@/components/MagazineCover';

// ─── Fade-up helper ─────────────────────────────────────────────────────────────
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
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    slug: 'sme-command-center',
    cover: '/assets/products/sme/cover.png',
    name: 'SME Command Center',
    price: 'R449',
    category: 'Business',
    badge: 'POPULAR',
  },
  {
    slug: 'writers-sanctuary',
    cover: '/assets/products/writers-sanctuary/cover.png',
    name: "Writer's Sanctuary",
    price: 'R299',
    category: 'Creative',
    badge: 'BESTSELLER',
  },
  {
    slug: 'varsity-academic-excellence',
    cover: '/assets/products/varsity/cover.png',
    name: 'Varsity Engine',
    price: 'R279',
    category: 'Student',
    badge: null,
  },
  {
    slug: 'creators-studio',
    cover: '/assets/products/creators-studio/cover.png',
    name: "Creator's Studio",
    price: 'R399',
    category: 'Creative',
    badge: 'NEW',
  },
  {
    slug: 'music-artist-career-command-center',
    cover: '/assets/products/music-artist/cover.png',
    name: 'Music Artist CC',
    price: 'R389',
    category: 'Creative',
    badge: null,
  },
  {
    slug: 'high-school-academic-excellence',
    cover: '/assets/products/high-school/cover.png',
    name: 'High School Engine',
    price: 'R249',
    category: 'Student',
    badge: null,
  },
];

const SERVICES = [
  {
    title: 'AI Integration',
    body: 'Custom Claude/OpenAI agents embedded in your product or business workflow.',
    price: 'From R45,000',
    href: '/consulting',
  },
  {
    title: 'Fractional AI Officer',
    body: 'Monthly AI strategy, prototyping, and advisory. Embedded in your team.',
    price: 'From R18,000/mo',
    href: '/consulting',
  },
  {
    title: 'Business Automation',
    body: 'WhatsApp-native workflows, automated reporting, debt recovery pipelines.',
    price: 'From R8,000/mo',
    href: '/consulting',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────────
export default function Home() {

  return (
    <main className="min-h-screen">

      {/* ── MAGAZINE COVER (100dvh) — negative margin to escape layout pt-20 ── */}
      <div className="-mt-20">
        <MagazineCover />
      </div>

      {/* ── POETRY INTERLUDE ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] py-20 px-6 z-10">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-8">
            Inside Her Roses · Published October 2021
          </p>
          <blockquote className="font-display text-3xl md:text-4xl italic text-white/90 leading-relaxed mb-6">
            &ldquo;she learned to speak in two tongues —<br />
            the language of systems<br />
            and the language of longing.&rdquo;
          </blockquote>
          <p className="text-white/30 text-sm mb-8">— Nandawula Regine Kabali-Kagwa</p>
          <a href="/poetry" className="text-[#C1292E] text-sm font-medium hover:underline">
            Read the collection →
          </a>
        </div>
      </section>

      {/* ── EDITORIAL INTRO ────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              The Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#0A1128] leading-[0.95] mb-6">
              Business degree.
              <br />Self-taught engineer.
              <br />Seven apps.
              <br /><span className="text-[#C1292E]">Nine months.</span>
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-[1.8] mb-8">
              After my degree, I taught myself to code. Then I started shipping. In nine months from zero coding knowledge,
              I built seven AI-powered tools for African entrepreneurs, students, and creators —
              backed by five ancestral lineages and a Ugandan word that means peace.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#0A1128] text-white rounded-full font-semibold text-sm hover:bg-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1128]"
              >
                Read the full story →
              </Link>
              <Link
                href="/consulting"
                className="px-6 py-3 border border-[#0A1128]/20 text-[#0A1128] rounded-full font-semibold text-sm hover:border-[#C1292E] hover:text-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Hire me
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '7', label: 'Production Apps', color: 'text-[#C1292E]' },
                { value: '550+', label: 'GitHub Commits', color: 'text-[#C1292E]' },
                { value: '9 months', label: 'Self-Taught', color: 'text-[#C1292E]' },
                { value: 'Africa', label: 'First. Always.', color: 'text-[#C1292E]' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/60 backdrop-blur-sm rounded-[24px] p-6 text-center border border-[#0A1128]/5"
                >
                  <div className={`font-display text-4xl font-bold ${s.color} mb-1`}>
                    {s.value}
                  </div>
                  <div className="text-xs text-[#6B6B6B] tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCTS GRID ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-white z-10">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-3">
                Digital Products
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-[#0A1128]">
                Six systems for African life.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#C1292E] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E] rounded"
            >
              View all 6 + bundles →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group block bg-white/60 backdrop-blur-sm border border-[#0A1128]/10 rounded-[24px] overflow-hidden hover:border-[#C1292E]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-[#E8DCC4] to-[#F5EFE6]">
                    <Image
                      src={p.cover}
                      alt={p.name}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                    {p.badge && (
                      <span className="absolute top-2 right-2 bg-[#C1292E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-[#B8860B] mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display font-bold text-[#0A1128] text-base leading-snug mb-1 group-hover:text-[#C1292E] transition-colors">
                      {p.name}
                    </h3>
                    <p className="font-display text-lg font-bold text-[#C1292E]">{p.price}</p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — dark section ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#0A1128] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-35" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              AI Consulting
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-[0.95]">
              Africa&apos;s AI engineer.
              <br />
              <span className="text-[#C9A84C]">Available for select engagements.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <div className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] border border-white/10 rounded-xl p-7 hover:border-[#C1292E]/30 transition-colors h-full flex flex-col" style={{ borderRadius: '32px 12px 32px 12px' }}>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">{s.body}</p>
                  <p className="text-[#C9A84C] font-medium text-sm">{s.price}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center">
            <Link
              href="/consulting"
              className="inline-block px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
            >
              View all consulting offers →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE ───────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-5xl md:text-6xl italic text-[#0A1128] leading-[1.1] mb-8">
              &ldquo;Technology should amplify humanity,
              not replace it. Every line of code —
              in service of connection.&rdquo;
            </p>
            <p className="text-[#B8860B] font-sans text-sm tracking-widest uppercase font-medium">
              — Nanda · AI Engineer & Creative Technologist
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BOTTOM CTA — cherry ───────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#C1292E] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-tight mb-6">
              Let&apos;s build something
              <br />worth remembering.
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Consulting engagements. AI integrations. Speaking. Templates. Poetry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Work with Nanda
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Browse Templates
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
