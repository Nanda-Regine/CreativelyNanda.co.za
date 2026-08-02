'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import AmbientVideo from '@/components/media/AmbientVideo';
import CoverHero from '@/components/home/CoverHero';
import { cldVideo, cldVideoPoster } from '@/lib/cloudinary';

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1128]">

      {/* ═══ I. THE COVER — magazine masthead over the red-afro portrait ════════ */}
      <CoverHero />

      {/* ═══ II. THE POET — ambient video: hands opening the book ═══════════════ */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-[#0A1128]">
        <AmbientVideo
          src={cldVideo('book-launch/book-customer')}
          poster={cldVideoPoster('book-launch/book-customer', 3)}
          objectPosition="center"
          alt="A reader opening Inside Her Roses to a poem"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(10,17,40,0.9) 0%, rgba(10,17,40,0.6) 45%, rgba(10,17,40,0.25) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <FadeUp>
            <p className="text-[#C9943A] text-xs tracking-[0.3em] uppercase mb-6">The Poet</p>
            <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl italic text-white leading-[1.25] max-w-3xl">
              She learned to speak in two tongues —<br />
              the language of systems<br />
              and the language of longing.
            </blockquote>
            <div className="mt-8">
              <Link href="/poetry" className="inline-flex items-center gap-2 text-white font-medium border-b-2 border-[#E4572E] pb-1 hover:text-[#E4572E] transition-colors">
                Enter the collection →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ III. THE BOOK — altar on rose-lit navy ═════════════════════════════ */}
      <section className="relative py-28 px-6 overflow-hidden z-10" style={{ background: 'radial-gradient(120% 90% at 30% 20%, #241021 0%, #14102A 55%, #0A1128 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <FadeUp className="flex justify-center">
            <div className="relative w-[260px] md:w-[360px] aspect-square shadow-2xl rounded-sm overflow-hidden ring-1 ring-[#C9943A]/25">
              <CldImage
                src="creativelynanda/poetry-book/official-cover"
                alt="Inside Her Roses — A Poetry Collection by Nandawula Regine Kabali-Kagwa"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">The Collection</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic text-white leading-[0.95] mb-6">
              Inside<br />Her Roses.
            </h2>
            <p className="text-white/70 text-lg leading-[1.8] mb-6">
              A debut collection on womanhood, longing, healing and the quiet ferocity of
              becoming. Performed on stages and broadcast on radio across the Eastern Cape —
              from spoken-word nights to Tru FM and Madiba Radio.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/poetry" className="px-6 py-3 bg-[#E4572E] text-white rounded-full font-semibold text-sm hover:bg-[#c9451f] transition-all">
                Read the poetry →
              </Link>
              <Link href="/gallery" className="px-6 py-3 border border-white/25 text-white rounded-full font-semibold text-sm hover:border-[#C9943A] hover:text-[#C9943A] transition-all">
                See her world
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ IV. THE STAGE — cinematic band, one line of verse ══════════════════ */}
      <section className="relative h-[72vh] min-h-[460px] w-full overflow-hidden bg-black">
        <CldImage
          src="creativelynanda/performance/nmb-perform-1"
          alt="Nanda performing spoken word in Xhosa beadwork with a drummer and keyboardist"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.45) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <FadeUp>
            <p className="text-[#C9943A] text-xs tracking-[0.3em] uppercase mb-6">The Stage</p>
            <p className="font-display text-3xl md:text-5xl italic text-white leading-[1.3] max-w-3xl">
              The poem leaves the page,<br />puts on beadwork,<br />and finds a microphone.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ V. HERITAGE & LINEAGE — ambient video: brewing umqombothi ══════════ */}
      <section className="relative py-28 px-6 overflow-hidden bg-[#0A1128]">
        <AmbientVideo
          src={cldVideo('nanda-culture/nanda-making-african-beer')}
          poster={cldVideoPoster('nanda-culture/nanda-making-african-beer', 2)}
          objectPosition="center"
          alt="Nanda brewing traditional umqombothi in Xhosa beaded regalia"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(10,17,40,0.82) 0%, rgba(10,17,40,0.9) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#C9943A] mb-7">
              Nseenene · Tshawe · Hlubi · Msimanga · Thabizolo
            </p>
            <p className="font-display text-2xl md:text-[2.1rem] text-white leading-[1.35] mb-6">
              Nine generations documented.
              Three nations. One woman
              making her art in KuGompo City.
            </p>
            <p className="font-sans text-[13px] italic text-white/50 mb-9">
              Kabali-Kagwa · Kabombola · Kayenje–Butambala · Nsiisi–Busujju
            </p>
            <div className="w-full h-px bg-[#C9943A]/30 mb-9" />
            <p className="font-display text-base italic text-white/90 mb-1">
              Ggwe Mpagi, ggwe Luwaga; Nakimera muka Ssuuna.
            </p>
            <p className="font-sans text-[11px] text-white/45 mb-7">
              (Nseenene Clan Motto · Buganda Kingdom)
            </p>
            <p className="font-display text-base italic text-white/90 mb-1">
              Msimanga · Thabizolo · Nonkosi · Mlotshwa · Ngelengele
            </p>
            <p className="font-sans text-[11px] text-white/45 mb-9">
              (Msimanga Clan Praises · AmaHlubi)
            </p>
            <Link href="/about" className="text-[#E4572E] text-sm font-medium hover:underline">
              The full lineage →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══ VI. TENDER — a quiet human breath ══════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-[#0A1128]">
        <CldImage
          src="creativelynanda/nanda-portraits/nanda-green-1"
          alt="Nanda in a sunlit tropical palm garden, straw hat, golden hour"
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(10,17,40,0) 0%, rgba(10,17,40,0.15) 45%, rgba(10,17,40,0.88) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-end justify-center text-right">
          <FadeUp>
            <p className="text-[#C9943A] text-xs tracking-[0.3em] uppercase mb-5">Between the lines</p>
            <p className="font-display text-3xl md:text-5xl italic text-white leading-[1.25] max-w-xl">
              Beyond the stage and the syntax,<br />
              a woman who tends roses,<br />
              gardens, and the people she loves.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ VII. THE ENGINEER — teaser that opens the career feature ═══════════ */}
      <section className="relative py-28 px-6 overflow-hidden z-10" style={{ background: 'linear-gradient(135deg, #0A1128 0%, #1a2744 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <FadeUp className="order-2 md:order-1">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-5">
              The Other Half of the Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.05] mb-6">
              From zero to a<br />fifteen-wing AI OS.
            </h2>
            <p className="text-white/70 text-lg leading-[1.8] mb-8">
              She wrote her first line of code in July 2025. One year later: eight live AI
              products, a personal operating system with fifteen intelligence wings, and real
              paying clients. This is the engineer&apos;s issue.
            </p>

            {/* three coverline stats */}
            <div className="flex flex-wrap gap-x-9 gap-y-4 mb-9">
              {[
                ['8', 'Live apps'],
                ['1,000+', 'Commits'],
                ['15', 'Distinctions'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-bebas text-[#C9943A] leading-none" style={{ fontSize: '2.6rem' }}>{v}</p>
                  <p className="font-mono text-white/50 uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em' }}>{l}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/engineer"
                className="inline-flex items-center gap-2 px-9 py-4 bg-[#C9943A] text-[#0A1128] rounded-full font-bold hover:bg-[#d8a850] transition-all hover:scale-105"
              >
                Read the feature →
              </Link>
              <a
                href="https://mirembemuse.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-9 py-4 border border-white/25 text-white rounded-full font-semibold hover:border-[#C9943A] hover:text-[#C9943A] transition-all"
              >
                Visit Mirembe Muse ↗
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.15} className="order-1 md:order-2">
            <Link href="/engineer" className="group relative block aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <CldImage
                src="creativelynanda/professional/nanda-coding"
                alt="Nanda working as an AI engineer at her screen — read the career feature"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.8) 0%, transparent 55%)' }} />
              <div className="absolute left-5 bottom-5">
                <p className="font-mono text-[#C9943A] uppercase" style={{ fontSize: '10px', letterSpacing: '0.24em' }}>Issue 003</p>
                <p className="font-display italic text-white text-2xl leading-tight">The Making<br />of an Engineer</p>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CLOSE — the warm exhale ════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 z-10" style={{ background: 'linear-gradient(135deg, #6B0F20 0%, #C21E56 55%, #E4572E 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
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
              <Link href="/contact" className="px-8 py-4 bg-white text-[#C21E56] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105">
                Get in touch
              </Link>
              <Link href="/poetry" className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all">
                Read the poetry
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
