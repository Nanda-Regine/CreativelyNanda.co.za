'use client';

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
  { value: '7', label: 'Production Apps' },
  { value: '2', label: 'Years of Building' },
  { value: '15', label: 'Academic Distinctions' },
  { value: '6', label: 'Certifications' },
];

const ANCESTRAL_CLANS = [
  {
    clan: 'Kabali-Kagwa',
    origin: 'Ugandan',
    meaning: 'The healers and wealth-holders. Nandawula was a doctor of great means. I carry her name, her lineage, and her mandate to build.',
    symbol: '◈',
  },
  {
    clan: 'Tshawe · Hlubi · Msimango',
    origin: 'Xhosa, Eastern Cape',
    meaning: 'The earth-keepers. The clans who held this land, told its stories, and taught that a place becomes yours only when you pour yourself into it.',
    symbol: '◆',
  },
  {
    clan: 'Thabizolo',
    origin: 'Sotho',
    meaning: 'The peacekeepers. Those who build bridges between worlds — and between the person you were and the person you are becoming.',
    symbol: '◇',
  },
];

const BADGE_GROUPS = [
  {
    category: 'AI & Engineering',
    color: 'bg-[#C1292E]/10 text-[#C1292E] border border-[#C1292E]/20',
    badges: ['Claude API', 'OpenAI', 'LangChain', 'Next.js', 'TypeScript', 'Supabase', 'Python'],
  },
  {
    category: 'Design & Creative',
    color: 'bg-[#0A1128]/10 text-[#0A1128] border border-[#0A1128]/20',
    badges: ['Figma', 'Framer Motion', 'Tailwind CSS', 'Brand Identity', 'Editorial Design'],
  },
  {
    category: 'Business & Strategy',
    color: 'bg-[#B8860B]/10 text-[#6B5B10] border border-[#B8860B]/20',
    badges: ['Product Strategy', 'Go-to-Market', 'Pricing Models', 'Financial Analysis', 'SWOT / PESTLE'],
  },
  {
    category: 'Craft & Expression',
    color: 'bg-[#C1292E]/10 text-[#C1292E] border border-[#C1292E]/20',
    badges: ['Spoken Word Poetry', 'Luthier Arts', 'Public Speaking', 'Content Creation', 'Notion Systems'],
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'The working world begins',
    body: 'Sales Assistant at Sportsmans Warehouse, East London. First job at 17. Four years across the entire store — sales floor, cashier, receiving. Learning how real retail operations run from the inside.',
    dot: 'bg-[#B8860B]',
  },
  {
    year: '2020',
    title: 'The degree begins',
    body: 'Higher Certificate in Business Management at Nelson Mandela University. Studying and working simultaneously. Learning the language of commerce while living it.',
    dot: 'bg-[#B8860B]',
  },
  {
    year: 'October 2021',
    title: 'The book. The promotion.',
    body: 'Inside Her Roses published — a poetry collection. In the same year: promoted to Receiving Clerk at Sportsmans Warehouse. Building across every dimension at once.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: '2021–2023',
    title: 'The diploma years',
    body: 'Diploma in Business Management at NMU. Three years of systems thinking, strategy, and operational discipline — while still at Sportsmans Warehouse.',
    dot: 'bg-[#B8860B]',
  },
  {
    year: '2023',
    title: 'Into hospitality',
    body: 'Joined Balkan Burger, Port Elizabeth. Junior Waitress → Senior Waitress → Marketing Assistant → Team Leader → Event Coordinator. An entirely new world of operations, people, and pressure.',
    dot: 'bg-[#B8860B]',
  },
  {
    year: '2024',
    title: 'Advanced Diploma. Manager title.',
    body: 'Advanced Diploma in Business Management — 15 distinctions across three consecutive qualifications. Simultaneously: promoted to Manager at Balkan Burger. Running a restaurant. Training staff. Earning the kind of recommendations that speak for themselves.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'June 2025',
    title: 'The pivot begins',
    body: 'First line of code. SheCodes Plus. Python. JavaScript. The degree had been teaching systems thinking the whole time — the code was just a different syntax for the same logic.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'September 2025',
    title: 'First app. Company born.',
    body: 'Cortex Hub Booking System deployed — first production application. Same month: Mirembe Muse (Pty) Ltd incorporated in South Africa. The founder identity becomes legal.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'October–November 2025',
    title: 'The accessibility work',
    body: 'True Access App — full-stack location-based accessibility platform built with Supabase and Mapbox. First complex architecture. First real users.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'December 2025',
    title: 'Systems, productised',
    body: 'Six Notion templates built and listed across Payhip, Gumroad, Etsy, LemonSqueezy, Notion Marketplace, Creative Market. The consulting brain becomes digital product.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'January 2026',
    title: 'The portfolio as a product',
    body: 'CreativelyNanda.co.za — 72 commits. Multilingual. AI chatbot. Template sales. Poetry. Blog. This is not a resume. It is a deployed, revenue-generating application.',
    dot: 'bg-[#C1292E]',
  },
  {
    year: 'February–March 2026',
    title: 'Six apps in six weeks',
    body: 'Campus Compass · K53 Drill Master · StokvelOS · AdminOS · WatchSankofa · SankofaSessions — all shipped solo under Mirembe Muse (Pty) Ltd. Seven AI SaaS products. 300+ users. East London, South Africa.',
    dot: 'bg-[#C1292E]',
    current: true,
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] text-[#0A1128]">

      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A1128] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <FadeUp>
              <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C1292E] mb-6">
                Creative Technologist · AI Engineer · Poet
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-6">
                Retail floor to<br />
                restaurant manager<br />
                to published poet<br />
                to <span className="text-[#C1292E]">AI engineer.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="font-display text-xl italic text-[#C1292E] leading-relaxed max-w-xl">
                Six months of code. Seven production apps. The arc was never accidental.
              </p>
            </FadeUp>
          </div>

          {/* Professional photo */}
          <FadeUp delay={0.3} className="hidden md:flex justify-center">
            <div className="relative w-80 h-96">
              <Image
                src="/assets/professional/nanda-professional.jpg"
                alt="Nandawula Regine Kabali-Kagwa"
                fill
                className="object-cover ring-2 ring-[#C1292E]/20"
                style={{ borderRadius: '32px 8px 32px 8px' }}
                priority
              />
            </div>
          </FadeUp>
        </div>

        {/* Stats bar */}
        <FadeUp delay={0.4} className="max-w-5xl mx-auto mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#0A1128] px-6 py-6 text-center hover:bg-[#1a2744] transition-colors"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-[#C1292E]">
                  {s.value}
                </div>
                <div className="text-xs text-white/50 tracking-widest uppercase mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── ANCESTRAL OPERATING SYSTEM ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              Ancestral Operating System
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
              I didn&apos;t start from zero.<br />
              I started from lineage.
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-2xl mb-12">
              Before the code, before the certifications, before the apps — there were
              the clans. Each one an operating system I run in parallel. Understanding
              where you come from changes how you build.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ANCESTRAL_CLANS.map((clan, i) => (
              <FadeUp key={clan.clan} delay={i * 0.1}>
                <div className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] border border-[#B8860B]/30 rounded-2xl p-8 hover:border-[#C1292E]/50 transition-colors group relative overflow-hidden" style={{ borderRadius: '32px 12px 32px 12px' }}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/10 group-hover:bg-[#C1292E]/15 transition-colors" style={{ borderRadius: '0 12px 0 100%' }} />
                  <div className="text-4xl text-[#B8860B] mb-4 font-display">{clan.symbol}</div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-1">
                    {clan.clan}
                  </h3>
                  <p className="text-[#B8860B] text-xs tracking-widest uppercase mb-4">
                    {clan.origin}
                  </p>
                  <p className="text-[#F5F0E8]/70 leading-relaxed text-sm">{clan.meaning}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/poetry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Read the poetry this lineage produced →
              </Link>
              <Link
                href="/mirembe"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#B8860B]/40 text-[#B8860B] rounded-full font-semibold hover:border-[#B8860B] hover:bg-[#B8860B]/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                See Mirembe Muse
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BIO / STORY ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              The Story
            </p>
            <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-6">
              Business degree.<br />Self-taught engineer.<br />Seven apps. Two years.
            </h2>
            <div className="space-y-5 text-[#4A3728] leading-relaxed">
              <p>
                I started on the retail floor of Sportsmans Warehouse at 17, learning how
                real operations work — inventory, people, service, systems. I studied
                Business Management at Nelson Mandela University while working, graduating
                with 15 distinctions across three consecutive qualifications. I managed
                a restaurant. I published a book of poetry. Then in June 2025, I wrote
                my first line of code.
              </p>
              <p>
                Six months later: 7 production AI SaaS apps, a registered South African
                company, and 300+ real users. Not demos. Production with payments,
                infrastructure, and people&apos;s actual data depending on it working.
              </p>
              <p>
                The degree taught systems thinking. The hospitality work taught operations
                under pressure. The poetry taught how to speak to humans. The code was
                always going to be the third language.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              {/* Photo — coding */}
              <div className="relative w-full h-56 rounded-[24px] overflow-hidden mb-2">
                <Image
                  src="/assets/professional/nanda-coding.jpg"
                  alt="Nanda coding"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 bg-white/60 backdrop-blur-sm rounded-[24px] border border-[#0A1128]/10">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-3">
                  Currently
                </p>
                <ul className="space-y-3 text-[#0A1128]">
                  {[
                    'Running 7 live AI SaaS apps under Mirembe Muse (Pty) Ltd',
                    'Open for select AI consulting engagements',
                    'Publishing poetry. Building infrastructure. Doing both.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-0.5 shrink-0">◆</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-[#0A1128] text-white rounded-[24px]">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-3">
                  Contact
                </p>
                <a
                  href="mailto:hello@creativelynanda.co.za"
                  className="text-white hover:text-[#C1292E] transition-colors font-medium"
                >
                  hello@creativelynanda.co.za
                </a>
                <p className="text-white/50 text-xs mt-2">East London, Eastern Cape, South Africa</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SKILLS — BADGE CLUSTER ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              Skills & Tools
            </p>
            <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-12">
              What I bring to the table.
            </h2>
          </FadeUp>

          <div className="space-y-8">
            {BADGE_GROUPS.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.08}>
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3 font-medium">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${group.color}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE — "How It Unfolded" ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <FadeUp>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
            The Journey
          </p>
          <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-16">
            How It Unfolded.
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#0A1128]/10" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <FadeUp key={`${item.year}-${i}`} delay={i * 0.05}>
                <div className="flex gap-8">
                  {/* Dot */}
                  <div className="shrink-0 mt-1.5">
                    <div className={`w-6 h-6 rounded-full ${item.dot} ring-4 ring-[#F5EFE6] relative z-10`} />
                  </div>

                  <div className="pb-2 bg-white/60 backdrop-blur-sm rounded-[24px] p-6 flex-1 border border-[#0A1128]/5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-sm font-bold text-[#B8860B] tracking-widest uppercase">
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 bg-[#C1292E]/10 text-[#C1292E] text-xs rounded-full font-medium">
                          Now
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0A1128] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#4A3728] leading-relaxed text-sm max-w-xl">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">
              Work with Nanda
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let&apos;s build something<br />
              <span className="text-[#C1292E]">worth remembering.</span>
            </h2>
            <p className="text-[#F5F0E8]/60 text-lg mb-10 leading-relaxed">
              Whether you need AI engineering, strategic consulting, or a creative
              partner who understands African markets — the conversation starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                View Consulting Offers
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8] rounded-full font-semibold hover:border-[#C1292E] hover:text-[#C1292E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1292E]"
              >
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
