'use client';

/**
 * THE MAKING OF AN ENGINEER — a Vogue-style career feature spread.
 *
 * A photo essay, not a résumé. Nanda's engineering evolution told in five
 * chapters, with the magazine furniture that made the original cover feel
 * editorial: masthead, coverlines, an "In This Issue" contents page,
 * pull-quotes over photography, a "The Numbers" panel and bylines.
 *
 * Imagery: existing Cloudinary assets only (professional/* + nanda-portraits/*).
 * Photo slots marked  ⟢ SWAP-READY  are the spots where new, candid engineering
 * photography would elevate the spread — drop a new Cloudinary id in and go.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { PROJECTS } from '@/lib/data/projects';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';

// ── Palette ─────────────────────────────────────────────────────────────────
const NAVY = '#0A1128';
const NAVY_DEEP = '#080D22';
const GOLD = '#C9943A';
const CREAM = '#F5F0E8';
const CHERRY = '#C1292E';
const EMBER = '#E4572E';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Motion helper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Content ─────────────────────────────────────────────────────────────────
const CONTENTS = [
  { num: 'I', title: 'Zero', line: 'July 2025. The first line of code.' },
  { num: 'II', title: 'The Sprint', line: 'Eight production apps in a single year.' },
  { num: 'III', title: 'The Craft', line: 'What she builds now — RAG, multi-agent, model routing.' },
  { num: 'IV', title: 'The Proof', line: 'Paying clients. Real production. Nothing staged.' },
  { num: 'V', title: 'The Foundation', line: 'Fifteen distinctions. The business brain under the code.' },
];

// The engineering arc — condensed from /education's TECH_ARC.
const ARC = [
  { date: 'Jul 2025', milestone: 'First line of code', tech: 'HTML · CSS · JavaScript', what: 'SheCodes Plus · first deployed builds', accent: '#FBBF24' },
  { date: 'Sep 2025', milestone: 'First production app shipped', tech: 'Next.js · TypeScript · Supabase · PayFast', what: 'Cortex Hub · GreenVault', accent: '#4A90D9' },
  { date: 'Oct 2025', milestone: 'Geospatial + real users', tech: 'Mapbox · PostGIS · Expo · complex data models', what: 'True Access v1 · PoetryTube', accent: '#10B981' },
  { date: 'Jan 2026', milestone: 'AI engineering begins', tech: 'Claude Sonnet + Haiku · prompt caching · multi-agent', what: 'VarsityOS (Nova AI) · StokvelOS', accent: GOLD },
  { date: 'Mar 2026', milestone: 'Enterprise-grade architecture', tech: 'Inngest · Upstash Redis · WhatsApp API · RLS at scale', what: 'AdminOS · K53 Drill Master · WatchSankofa', accent: CHERRY },
  { date: 'Jun 2026', milestone: '15-wing AI OS + mobile co-founder', tech: 'Expo SDK 52 · RAG · Redis inter-wing signals · iOS/Android', what: 'JarvisOS · Sanyu Botanicals · True Access v2', accent: '#7B2FBE' },
];

// The craft — what she builds now (from /ai-engineer CAPABILITIES, sharpened).
const CRAFT = [
  { title: 'Multi-Agent Systems', body: 'Specialist agents with clear mandates, an Inngest async spine, and a Redis signal protocol so fifteen wings talk without stepping on each other.' },
  { title: 'RAG + Vector Retrieval', body: 'Knowledge ingestion pipelines and document Q&A over Upstash Vector — 1,194 live chunks answering in production inside JarvisOS.' },
  { title: 'Model Routing + Caching', body: 'Sonnet for reasoning, Haiku for speed, prompt caching on every static block. An 85% cost reduction, engineered — not hoped for.' },
  { title: 'Multi-Tenant Architecture', body: 'Supabase Postgres with Row-Level Security, soft-delete and immutable audit trails. One deployment, unlimited tenants, isolated by privilege.' },
  { title: 'WhatsApp-Native AI', body: 'Meta WhatsApp Cloud API workflows — the channel Africa actually runs on — automating inbox, debt recovery and reporting inside AdminOS.' },
  { title: 'Production TypeScript', body: "Strict mode, Zod at the edges, tsc --noEmit exits zero across every repo. The discipline is the point." },
];

const NUMBERS = [
  { value: '8', label: 'Live production apps' },
  { value: '3,000+', label: 'GitHub commits' },
  { value: '1,194', label: 'RAG knowledge chunks' },
  { value: '15', label: 'JarvisOS intelligence wings' },
  { value: '15', label: 'Academic distinctions' },
  { value: '3+', label: 'Paying clients' },
];

// The Proof — hero projects pulled from the live portfolio data.
const PROOF_IDS = ['jarvisos', 'adminos', 'varsityos', 'true-access'];
const PROOF = PROOF_IDS
  .map((id) => PROJECTS.find((p) => p.id === id))
  .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

// The Foundation — degree → code (from /education DEGREE_IN_CODE).
const DEGREE_IN_CODE = [
  { subject: 'Advanced Strategy', code: 'Eight-product horizontal architecture — one payment hub, six apps downstream.' },
  { subject: 'Operations Management', code: 'AdminOS immutable audit log — UPDATE and DELETE revoked at the database privilege level.' },
  { subject: 'Business Ethics', code: 'POPIA compliance from day one. Soft delete only. Timestamps always UTC.' },
  { subject: 'Financial Literacy', code: 'Per-tenant ZAR token budgets with 50% hourly spike detection — AI cost control in the data model.' },
];

// ── Small building blocks ───────────────────────────────────────────────────
function Kicker({ children, color = GOLD }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="font-mono uppercase" style={{ color, fontSize: '11px', letterSpacing: '0.32em', margin: 0 }}>
      {children}
    </p>
  );
}

function Rule({ w = '100%', color = 'rgba(201,148,58,0.3)' }: { w?: string; color?: string }) {
  return <div style={{ width: w, height: '1px', background: color }} />;
}

// A chapter spread: full-width band, image on one side, prose on the other.
function Chapter({
  num, title, kicker, img, alt, flip = false, accent = GOLD, children, swapReady = false,
}: {
  num: string; title: string; kicker: string; img: string; alt: string;
  flip?: boolean; accent?: string; children: React.ReactNode; swapReady?: boolean;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <FadeUp>
          {/* ⟢ SWAP-READY photo slot */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.45)', border: `1px solid rgba(201,148,58,0.18)` }}>
            <CldImage src={img} alt={alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.5) 0%, transparent 45%)' }} />
            {/* Chapter numeral, dropped like a fashion-spread folio */}
            <span className="absolute left-4 bottom-3 font-display italic" style={{ color: CREAM, fontSize: '54px', lineHeight: 1, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>{num}.</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <div>
            <Kicker color={accent}>{kicker}</Kicker>
            <h2 className="font-display font-bold" style={{ color: CREAM, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', lineHeight: 1.02, margin: '16px 0 22px' }}>{title}</h2>
            <div className="space-y-5 font-light" style={{ color: 'rgba(245,240,232,0.78)', lineHeight: 1.9, fontSize: '1.08rem' }}>{children}</div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function EngineerFeature() {
  return (
    <main className="min-h-screen" style={{ background: NAVY, color: CREAM }}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.12]" style={{ backgroundImage: GRAIN }} />

      {/* ══ THE COVER — masthead over the builder-at-work portrait ══════════════ */}
      <section className="relative -mt-20 h-[100dvh] min-h-[640px] w-full overflow-hidden">
        {/* ⟢ SWAP-READY: replace with a candid engineering hero when shot */}
        <CldImage
          src="creativelynanda/professional/nanda-coding"
          alt="Nandawula Regine at her workstation, a monitor of colourful code beside her — AI engineer at work"
          fill priority sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(8,13,34,0.94) 0%, rgba(10,17,40,0.72) 42%, rgba(10,17,40,0.28) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />

        {/* gold spine */}
        <div className="absolute left-0 top-0 bottom-0 z-30 hidden md:flex items-center justify-center" style={{ width: '22px', background: GOLD }}>
          <span className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.2em', color: NAVY, writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap', fontWeight: 500 }}>
            CREATIVELY NANDA · THE ENGINEER&apos;S ISSUE · 2026
          </span>
        </div>

        <div className="relative z-20 flex h-full max-w-6xl mx-auto flex-col justify-end px-6 md:pl-16 pb-20">
          <FadeUp>
            <Kicker>Issue 003 · A Career Feature · Byline — Herself</Kicker>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-bold" style={{ fontSize: 'clamp(2.8rem, 8.5vw, 6.2rem)', lineHeight: 0.92, letterSpacing: '-0.01em', margin: '20px 0 0' }}>
              The Making<br />of an <span style={{ color: GOLD, fontStyle: 'italic' }}>Engineer</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-7 max-w-xl font-light" style={{ color: 'rgba(245,240,232,0.75)', fontSize: '1.15rem', lineHeight: 1.7 }}>
              From a single line of code to a fifteen-wing AI operating system — in one year.
              The other half of the poet who codes, told the way it deserves to be told.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contents" className="rounded-full px-7 py-3.5 font-semibold transition-all hover:scale-105" style={{ background: GOLD, color: NAVY }}>
                Turn the page →
              </a>
              <Link href="/ai-engineer" className="rounded-full px-7 py-3.5 font-semibold transition-all" style={{ border: '1px solid rgba(245,240,232,0.35)', color: CREAM }}>
                Work with me ↗
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* coverlines, right rail — desktop */}
        <div className="absolute right-6 top-0 bottom-0 z-20 hidden lg:flex flex-col justify-center gap-6 text-right" style={{ width: '150px' }}>
          {[
            ['One year', '8 LIVE APPS'],
            ['3,000+', 'COMMITS'],
            ['Fifteen', 'DISTINCTIONS'],
          ].map(([a, b]) => (
            <div key={b}>
              <p className="font-display italic" style={{ color: 'rgba(245,240,232,0.7)', fontSize: '13px', margin: 0 }}>{a}</p>
              <p className="font-bebas" style={{ color: CREAM, fontSize: '26px', lineHeight: 0.9, letterSpacing: '0.02em', margin: '2px 0 0' }}>{b}</p>
              <Rule w="60%" color="rgba(201,148,58,0.35)" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ IN THIS ISSUE — the contents page ══════════════════════════════════ */}
      <section id="contents" className="relative z-10 px-6 py-24 md:py-28" style={{ background: NAVY_DEEP }}>
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <Kicker>Contents</Kicker>
                <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)', lineHeight: 1, margin: '12px 0 0' }}>In This Issue</h2>
              </div>
              <p className="font-mono" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '11px', letterSpacing: '0.2em' }}>FIVE CHAPTERS · ONE RISE</p>
            </div>
          </FadeUp>
          <div>
            {CONTENTS.map((c, i) => (
              <FadeUp key={c.num} delay={i * 0.06}>
                <a href={`#chapter-${c.num}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-5 transition-colors" style={{ borderTop: '1px solid rgba(201,148,58,0.16)' }}>
                  <span className="font-display italic" style={{ color: GOLD, fontSize: '30px', width: '44px' }}>{c.num}</span>
                  <span>
                    <span className="font-display block transition-colors group-hover:text-[#C9943A]" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700 }}>{c.title}</span>
                    <span className="font-light" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.98rem' }}>{c.line}</span>
                  </span>
                  <span className="font-mono hidden sm:inline transition-transform group-hover:translate-x-1" style={{ color: 'rgba(245,240,232,0.35)', fontSize: '12px' }}>→</span>
                </a>
              </FadeUp>
            ))}
            <div style={{ borderTop: '1px solid rgba(201,148,58,0.16)' }} />
          </div>
        </div>
      </section>

      {/* ══ CHAPTER I — ZERO ═══════════════════════════════════════════════════ */}
      <div id="chapter-I" className="relative z-10" style={{ background: NAVY }}>
        <Chapter
          num="I" title="Zero." kicker="Chapter I · July 2025"
          img="creativelynanda/nanda-portraits/nanda-green-1"
          alt="Nanda in a sunlit garden — the woman before the engineer"
          accent="#FBBF24"
        >
          <p>There was a version of this story where it never started. No computer-science degree. No bootcamp cohort. No mentor down the hall. Just a business graduate in KuGompo City who opened an editor and typed the first line she&apos;d ever written.</p>
          <p style={{ color: CREAM }}>She didn&apos;t come to code from theory. She came to it from <em>need</em> — the products in her head had nowhere to live until she could build them herself.</p>
        </Chapter>
        {/* Pull quote */}
        <FadeUp>
          <blockquote className="mx-auto max-w-4xl px-6 pb-8 text-center">
            <p className="font-display italic" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.9rem)', lineHeight: 1.3, color: CREAM }}>
              &ldquo;I learned to speak in two tongues — the language of systems, and the language of longing.&rdquo;
            </p>
            <p className="font-mono mt-4" style={{ color: GOLD, fontSize: '12px', letterSpacing: '0.2em' }}>— N.R.K-K.</p>
          </blockquote>
        </FadeUp>
      </div>

      {/* ══ CHAPTER II — THE SPRINT (arc timeline) ═════════════════════════════ */}
      <section id="chapter-II" className="relative z-10 px-6 py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #0A1128 0%, #141d38 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <Kicker color={CHERRY}>Chapter II · The Sprint</Kicker>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1, margin: '14px 0 10px' }}>
              Eight apps.<br /><span style={{ color: GOLD }}>One year.</span>
            </h2>
            <p className="max-w-2xl font-light mb-14" style={{ color: 'rgba(245,240,232,0.72)', fontSize: '1.08rem', lineHeight: 1.8 }}>
              Not eight ideas. Eight <em>shipped</em>, production, paying-user applications — each a rung on a ladder that got steeper on purpose. Read it top to bottom: this is a year measured in deployments.
            </p>
          </FadeUp>

          {/* editorial timeline */}
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block" style={{ background: 'rgba(201,148,58,0.28)' }} />
            <div className="space-y-9">
              {ARC.map((a, i) => (
                <FadeUp key={a.date} delay={i * 0.05}>
                  <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-7 gap-y-2">
                    <div className="relative flex items-center gap-3">
                      <span className="hidden sm:block rounded-full" style={{ width: '15px', height: '15px', background: a.accent, boxShadow: `0 0 0 4px ${NAVY}, 0 0 16px ${a.accent}66`, zIndex: 1 }} />
                      <span className="font-mono uppercase" style={{ color: a.accent, fontSize: '12px', letterSpacing: '0.18em' }}>{a.date}</span>
                    </div>
                    <div className="sm:pt-0">
                      <h3 className="font-display font-bold" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: CREAM, marginBottom: '4px' }}>{a.milestone}</h3>
                      <p className="font-mono" style={{ color: 'rgba(245,240,232,0.55)', fontSize: '12.5px', letterSpacing: '0.04em', marginBottom: '4px' }}>{a.tech}</p>
                      <p className="font-light italic" style={{ color: GOLD, fontSize: '0.95rem' }}>{a.what}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CHAPTER III — THE CRAFT ════════════════════════════════════════════ */}
      <div id="chapter-III" className="relative z-10" style={{ background: NAVY }}>
        <Chapter
          num="III" title="The Craft." kicker="Chapter III · What she builds now" flip
          img="creativelynanda/professional/nanda-professional"
          alt="Nandawula Regine — studio portrait, the composed engineer"
          accent={GOLD}
          swapReady
        >
          <p>The distance between the first chapter and this one is the whole point. She no longer builds pages — she builds <em>systems that think</em>: agents that route work between themselves, retrieval layers that answer from thousands of chunks, cost architectures that make production AI actually affordable in rands.</p>
          <p style={{ color: CREAM }}>This is what &ldquo;I&apos;ve evolved&rdquo; looks like on paper.</p>
        </Chapter>
        <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CRAFT.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-xl p-7" style={{ background: 'linear-gradient(150deg, rgba(20,29,56,0.9) 0%, rgba(10,17,40,0.9) 100%)', border: '1px solid rgba(201,148,58,0.16)' }}>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '1.35rem', color: CREAM }}>{c.title}</h3>
                  <p className="font-light" style={{ color: 'rgba(245,240,232,0.68)', fontSize: '0.95rem', lineHeight: 1.7 }}>{c.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      </div>

      {/* ══ THE NUMBERS ════════════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.marble} tone="navy" className="relative z-10 px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-14">
              <Kicker>The Numbers</Kicker>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', margin: '12px 0 0' }}>Receipts, set in gold.</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6">
            {NUMBERS.map((n, i) => (
              <FadeUp key={n.label} delay={i * 0.05}>
                <div className="text-center">
                  <p className="font-bebas" style={{ color: GOLD, fontSize: 'clamp(3.4rem, 9vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '0.01em' }}>{n.value}</p>
                  <p className="font-mono uppercase mt-2" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '11px', letterSpacing: '0.18em' }}>{n.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </TexturedSection>

      {/* ══ CHAPTER IV — THE PROOF ═════════════════════════════════════════════ */}
      <section id="chapter-IV" className="relative z-10 px-6 py-20 md:py-28" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center mb-16">
              <div>
                <Kicker color={EMBER}>Chapter IV · The Proof</Kicker>
                <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1, margin: '14px 0 16px' }}>
                  Not a portfolio.<br /><span style={{ color: GOLD }}>A production record.</span>
                </h2>
                <p className="font-light" style={{ color: 'rgba(245,240,232,0.72)', fontSize: '1.08rem', lineHeight: 1.8 }}>
                  Every project below is live, self-funded, and carrying real users or real revenue. No demos. No mock data. The four here are the ones that best show the range — from a fifteen-wing personal OS to a universal mobile platform shipped in two days.
                </p>
              </div>
              {/* ⟢ SWAP-READY photo slot */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.45)', border: '1px solid rgba(201,148,58,0.18)' }}>
                <CldImage src="creativelynanda/professional/nanda-professional-2" alt="Nandawula Regine — evening executive portrait" fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" />
              </div>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2">
            {PROOF.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.06}>
                <Link href={`/projects/${p.id}`} className="group block h-full rounded-xl p-7 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(150deg, rgba(20,29,56,0.9) 0%, rgba(10,17,40,0.92) 100%)', border: '1px solid rgba(201,148,58,0.16)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono uppercase" style={{ color: p.accentColor, fontSize: '10px', letterSpacing: '0.2em' }}>{p.status}</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.accentColor, boxShadow: `0 0 12px ${p.accentColor}88` }} />
                  </div>
                  <h3 className="font-display font-bold mb-2 transition-colors group-hover:text-[#C9943A]" style={{ fontSize: '1.5rem', color: CREAM }}>{p.name}</h3>
                  <p className="font-light italic mb-5" style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.98rem' }}>{p.tagline}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {p.metrics.slice(0, 3).map((m) => (
                      <span key={m.label} className="inline-flex items-baseline gap-1.5">
                        <span className="font-bebas" style={{ color: GOLD, fontSize: '1.5rem', lineHeight: 1 }}>{m.value}</span>
                        <span className="font-mono" style={{ color: 'rgba(245,240,232,0.45)', fontSize: '9.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</span>
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div className="mt-10 text-center">
              <Link href="/projects" className="font-mono uppercase transition-colors hover:text-[#C9943A]" style={{ color: 'rgba(245,240,232,0.55)', fontSize: '12px', letterSpacing: '0.2em' }}>
                See all nine projects →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ CHAPTER V — THE FOUNDATION ═════════════════════════════════════════ */}
      <section id="chapter-V" className="relative z-10 px-6 py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #141d38 0%, #0A1128 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <Kicker>Chapter V · The Foundation</Kicker>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1, margin: '14px 0 14px' }}>
              The business brain<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>under the code.</span>
            </h2>
            <p className="max-w-2xl font-light mb-4" style={{ color: 'rgba(245,240,232,0.75)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Three qualifications from Nelson Mandela University. <span style={{ color: CREAM }}>Fifteen distinctions.</span> People assume the engineering came first. It didn&apos;t — the strategy did. Every architectural decision has a business module in its DNA.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {DEGREE_IN_CODE.map((d, i) => (
              <FadeUp key={d.subject} delay={i * 0.05}>
                <div className="h-full rounded-xl p-6" style={{ background: 'rgba(201,148,58,0.06)', border: '1px solid rgba(201,148,58,0.2)' }}>
                  <p className="font-mono uppercase mb-3" style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.18em' }}>{d.subject}</p>
                  <p className="font-light" style={{ color: 'rgba(245,240,232,0.82)', fontSize: '0.98rem', lineHeight: 1.7 }}>
                    <span className="font-mono" style={{ color: EMBER }}>→ </span>{d.code}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="mt-12">
              <Link href="/education" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-all hover:scale-105" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>
                The full academic record + graduation gallery →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ CLOSE — the back cover ═════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-28" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a2744 60%, ${GOLD} 220%)` }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeUp>
            <Kicker>The Back Cover</Kicker>
            <h2 className="font-display font-bold italic" style={{ fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', lineHeight: 1.05, margin: '16px 0 20px', color: CREAM }}>
              This is what I build<br />for clients.
            </h2>
            <p className="font-light mb-10" style={{ color: 'rgba(245,240,232,0.8)', fontSize: '1.15rem' }}>
              Custom Claude agents. WhatsApp-native workflows. Production TypeScript. Built for the continent, available to the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/ai-engineer" className="rounded-full px-9 py-4 font-semibold transition-all hover:scale-105" style={{ background: GOLD, color: NAVY }}>
                Hire me as an AI engineer →
              </Link>
              <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer" className="rounded-full px-9 py-4 font-semibold transition-all" style={{ border: '1px solid rgba(245,240,232,0.4)', color: CREAM }}>
                Visit Mirembe Muse ↗
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
