'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Candid photo strip — no captions, just the images
const STRIP = [
  { src: '/assets/IMG-20260620-WA0016.jpg', alt: 'Nanda in a Sotho straw hat at a Drakensberg viewpoint' },
  { src: '/assets/IMG-20260620-WA0011.jpg', alt: 'Nanda at the piano in a music studio' },
  { src: '/assets/IMG-20260620-WA0057.jpg', alt: 'Nanda outdoors beneath a palm, afternoon light' },
  { src: '/assets/performance/nmb-perform-1.jpg', alt: 'Nanda performing spoken word in Xhosa beadwork' },
  { src: '/assets/IMG-20260620-WA0074.jpg', alt: 'Nanda in graduation gown among the trees' },
  { src: '/assets/IMG-20260620-WA0025.jpg', alt: 'Nanda in a traditional red dress at an outdoor event' },
  { src: '/assets/IMG-20260620-WA0014.jpg', alt: 'Nanda in Sotho attire preparing food with family' },
  { src: '/assets/IMG-20260620-WA0046.jpg', alt: 'Spiral staircase, architectural portrait' },
];

// Painterly art teaser
const ART = [
  { src: '/assets/art/water.jpg', alt: 'Abstract palette-knife painting in cobalt and warm colour' },
  { src: '/assets/art/dancer.jpg', alt: 'Painting of a dancer with wide arc arms and a ribbon halo' },
  { src: '/assets/art/navy-floral.jpg', alt: 'Deep navy florals with starlight' },
  { src: '/assets/art/bloom.jpg', alt: 'Warm palette-knife blooms in coral and teal' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1128]">

      {/* ── HERO — full-bleed editorial portrait ───────────────────────────────── */}
      <section className="relative -mt-20 h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#0A1128]">
        {/* Photo */}
        <Image
          src="/assets/IMG-20260620-WA0057.jpg"
          alt="Nandawula Regine Kabali-Kagwa beneath a palm, looking up in afternoon light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-[75%_center]"
        />
        {/* Navy gradient — readable text on the left */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(10,17,40,0.96) 0%, rgba(10,17,40,0.82) 32%, rgba(10,17,40,0.35) 60%, rgba(10,17,40,0.15) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <FadeUp>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9943A] mb-6">
              Nseenene · AmaTshawe · AmaHlubi · Msimango
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-white font-bold leading-[1.02] text-5xl md:text-7xl lg:text-[5.5rem] max-w-3xl">
              I write poems.<br />
              I come from <span className="text-[#C1292E]">nine generations.</span><br />
              I make things beautiful.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-sans text-white/60 text-sm md:text-base mt-7 tracking-wide">
              Nandawula Regine Kabali-Kagwa · Poet & Creative · East London, South Africa
            </p>
          </FadeUp>
          <FadeUp delay={0.28}>
            <div className="w-9 h-[2px] bg-[#C1292E] mt-6 mb-8" />
          </FadeUp>
          <FadeUp delay={0.36}>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Published Poet', sub: 'Inside Her Roses' },
                { label: '9 Generations', sub: 'Documented lineage' },
                { label: 'Spoken Word', sub: 'Stage & studio' },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-2.5"
                >
                  <span className="font-display font-bold text-white text-sm">{pill.label}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C9943A] block mt-0.5">{pill.sub}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 text-xs font-mono tracking-[0.3em] uppercase animate-pulse">
          scroll
        </div>
      </section>

      {/* ── POETRY INTERLUDE ───────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] py-24 px-6 z-10">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-[#C9943A] text-xs tracking-[0.3em] uppercase mb-8">
            Inside Her Roses · Published October 2021
          </p>
          <blockquote className="font-display text-3xl md:text-5xl italic text-white/90 leading-[1.3] mb-6">
            &ldquo;she learned to speak in two tongues —<br />
            the language of systems<br />
            and the language of longing.&rdquo;
          </blockquote>
          <p className="text-white/30 text-sm mb-8">— Nandawula Regine Kabali-Kagwa</p>
          <Link href="/poetry" className="text-[#C1292E] text-sm font-medium hover:underline">
            Enter the collection →
          </Link>
        </div>
      </section>

      {/* ── INSIDE HER ROSES — the book ────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <FadeUp className="flex justify-center">
            <div className="relative w-[260px] md:w-[340px] aspect-square shadow-2xl rounded-sm overflow-hidden ring-1 ring-[#0A1128]/10">
              <Image
                src="/assets/poetry-book/official-cover.jpg"
                alt="Inside Her Roses — A Poetry Collection by Nandawula Regine Kabali-Kagwa"
                fill
                className="object-cover"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">The Collection</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-[#0A1128] leading-[0.95] mb-6">
              Inside<br />Her Roses.
            </h2>
            <p className="text-[#4A3728] text-lg leading-[1.8] mb-6">
              A debut collection on womanhood, longing, healing and the quiet ferocity of
              becoming. Performed on stages and broadcast on radio across the Eastern Cape —
              from spoken-word nights to Tru FM and Madiba Radio.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/poetry" className="px-6 py-3 bg-[#0A1128] text-white rounded-full font-semibold text-sm hover:bg-[#C1292E] transition-all">
                Read the poetry →
              </Link>
              <Link href="/gallery" className="px-6 py-3 border border-[#0A1128]/20 text-[#0A1128] rounded-full font-semibold text-sm hover:border-[#C1292E] hover:text-[#C1292E] transition-all">
                See performances
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CANDID PHOTO STRIP ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] py-16 z-10">
        <div
          className="flex gap-4 overflow-x-auto px-6 pb-2"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {STRIP.map((p) => (
            <div
              key={p.src}
              className="relative shrink-0 w-[260px] h-[340px] rounded overflow-hidden"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="260px" />
            </div>
          ))}
        </div>
      </section>

      {/* ── LINEAGE ANCHOR ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#B8860B] mb-7">
              Nseenene · Tshawe · Hlubi · Msimango · Thabizolo
            </p>
            <p className="font-display text-2xl md:text-[2rem] text-[#0A1128] leading-[1.35] mb-6">
              Nine generations documented.
              Three nations. One woman
              making her art in East London.
            </p>
            <p className="font-sans text-[13px] italic text-[#6B6B6B] mb-9">
              Kabali-Kagwa · Kabombola · Kayenje–Butambala · Nsiisi–Busujju
            </p>
            <div className="w-full h-px bg-[#C1292E]/30 mb-9" />
            <p className="font-display text-base italic text-[#0A1128] mb-1">
              Ggwe Mpagi, ggwe Luwaga; Nakimera muka Ssuuna.
            </p>
            <p className="font-sans text-[11px] text-[#6B6B6B] mb-7">
              (Nseenene Clan Motto · Buganda Kingdom)
            </p>
            <p className="font-display text-base italic text-[#0A1128] mb-1">
              Msimango · Thabizolo · Nonkosi · Mlotshwa · Ngelengele
            </p>
            <p className="font-sans text-[11px] text-[#6B6B6B] mb-9">
              (Msimango Clan Praises · AmaHlubi)
            </p>
            <Link href="/about" className="text-[#C1292E] text-sm font-medium hover:underline">
              The full lineage →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── ART & CREATIVITY ───────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#0A1128] z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-35" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-3">Colour & Movement</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-white">
                The way I see the world.
              </h2>
            </div>
            <Link href="/gallery" className="text-sm text-[#C1292E] font-medium hover:underline">
              Enter the gallery →
            </Link>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ART.map((a, i) => (
              <FadeUp key={a.src} delay={i * 0.07}>
                <Link href="/gallery" className="group block relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src={a.src} alt={a.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-[#0A1128]/0 group-hover:bg-[#0A1128]/20 transition-colors" />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECOND POETRY INTERLUDE — Buganda introduction ─────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-display text-2xl md:text-[2.1rem] italic text-[#0A1128] leading-[1.45]">
              I come from the genealogical line<br />
              of Kabombola, who reigns from Kyakasuku.<br />
              I come from the lineage of Segoma in Kayenje.<br />
              My totem is the grasshopper.
            </p>
            <p className="font-sans text-[11px] text-[#6B6B6B] mt-7 tracking-wide">
              — adapted from the traditional Buganda introduction · Nandawula Regine Kabali-Kagwa
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── MIREMBE BRIDGE — the door to the work ──────────────────────────────── */}
      <section className="relative py-24 px-6 z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1128 0%, #1a2744 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-5">
              The Other Half of the Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              I also build.
            </h2>
            <p className="text-white/70 text-lg leading-[1.8] max-w-2xl mx-auto mb-4">
              By day I&apos;m an AI engineer and founder. The apps, the consulting, the
              technical work — eight production AI systems built in a year — live under my
              company, <span className="text-white font-semibold">Mirembe Muse</span>.
            </p>
            <p className="text-white/45 text-sm mb-10 max-w-xl mx-auto">
              If you&apos;re here for software, AI integration, or to work with me
              professionally, that&apos;s the door.
            </p>
            <a
              href="https://mirembemuse.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#C9943A] text-[#0A1128] rounded-full font-bold hover:bg-[#d8a850] transition-all hover:scale-105"
            >
              Visit Mirembe Muse — Business &amp; Tech ↗
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#C1292E] z-10">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-tight mb-6">
              Let&apos;s make something
              <br />worth remembering.
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Poetry. Performance. Collaboration. Conversation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105">
                Get in touch
              </Link>
              <Link href="/poetry" className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all">
                Read the poetry
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
