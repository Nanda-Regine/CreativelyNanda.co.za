'use client';

/**
 * The home page: the Soul Issue.
 *
 * The cover is navy and stays exactly as it is (the crown jewel; composition
 * is review-first). After it the issue turns to paper. The rhythm is the house
 * stock (app/stock.css): parchment spreads, one bone spread, photographs at
 * full strength between them, one navy feature (the engineer), and the cherry
 * block to close. Every spread is asymmetric: the image and the words never
 * sit in two equal halves.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import AmbientVideo from '@/components/media/AmbientVideo';
import CoverHero from '@/components/home/CoverHero';
import Stock from '@/components/ui/Stock';
import { cldVideo, cldVideoPoster } from '@/lib/cloudinary';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const GOLD = '#C9943A';

/** A photograph at full strength, with a neutral pocket only where the words sit. */
function Plate({
  src,
  alt,
  focus = 'center',
  pocket,
  className = '',
  children,
}: {
  src: string;
  alt: string;
  focus?: string;
  pocket: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`relative w-full overflow-hidden bg-black ${className}`}>
      <CldImage src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: focus }} />
      <div aria-hidden className="absolute inset-0" style={{ background: pocket }} />
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="stock-parchment min-h-screen">
      {/* ═══ I. THE COVER ═════════════════════════════════════════════════════ */}
      <CoverHero />

      {/* ═══ II. THE POET: a parchment spread, the video in an arch ═══════════ */}
      <Stock paper="parchment" className="px-6 py-24 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-6 md:col-start-7 md:row-start-1">
            <div className="shape-arch sd-unveil relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
              <AmbientVideo
                src={cldVideo('book-launch/book-customer')}
                poster={cldVideoPoster('book-launch/book-customer', 3)}
                objectPosition="center"
                alt="A reader opening Inside Her Roses to a poem"
              />
            </div>
            {/* the issue stamp, breaking the arch's edge */}
            <div
              aria-hidden
              className="absolute -left-2 bottom-10 flex h-28 w-28 rotate-[-12deg] flex-col items-center justify-center rounded-full text-center md:-left-10 md:h-32 md:w-32"
              style={{ background: '#0A1128', color: GOLD, boxShadow: '0 0 0 6px var(--stock), 0 18px 40px -18px rgba(10,17,40,0.6)' }}
            >
              <span className="kicker" style={{ fontSize: 8.5 }}>
                The Soul
              </span>
              <span className="font-display text-3xl font-bold italic leading-none text-[#F5F0E8]">Issue</span>
              <span className="kicker mt-1" style={{ fontSize: 8.5 }}>
                2026
              </span>
            </div>
          </div>

          <FadeUp className="md:col-span-6 md:col-start-1 md:row-start-1 md:pr-6">
            <p className="kicker t-cherry">I · The poet</p>
            <blockquote className="display-l mt-7 font-display italic t-head">
              She learned to speak in two tongues:
              <span className="mt-3 block t-gold">the language of systems,</span>
              <span className="block">and the language of longing.</span>
            </blockquote>
            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-14" style={{ background: GOLD }} />
              <Link href="/poetry" className="font-display text-xl italic t-head underline decoration-[#C21E56] decoration-2 underline-offset-[6px] transition-colors hover:text-[#C21E56]">
                Enter the collection
              </Link>
            </div>
          </FadeUp>
        </div>
      </Stock>

      {/* ═══ III. THE BOOK: bone, the cover tilted over a cherry leaf ═════════ */}
      <Stock paper="cherry" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-12">
          <FadeUp className="relative flex justify-center md:col-span-5">
            <div aria-hidden className="shape-leaf absolute inset-x-6 inset-y-[-8%] md:inset-x-0" style={{ background: '#7A1236' }} />
            <div aria-hidden className="shape-leaf absolute inset-x-10 inset-y-[-3%] rotate-6 border md:inset-x-4" style={{ borderColor: `${GOLD}99` }} />
            <Link
              href="/poetry"
              className="group relative block aspect-square w-[250px] rotate-[-4deg] overflow-hidden rounded-sm transition-transform duration-700 hover:rotate-0 md:w-[340px]"
              style={{ boxShadow: '0 40px 70px -30px rgba(40,5,15,0.65)' }}
            >
              <CldImage
                src="creativelynanda/poetry-book/official-cover"
                alt="Inside Her Roses, a poetry collection by Nandawula Regine Kabali-Kagwa"
                fill
                className="object-cover"
                sizes="340px"
              />
            </Link>
          </FadeUp>
          <FadeUp delay={0.12} className="md:col-span-6 md:col-start-7">
            <p className="kicker t-cherry">II · The collection</p>
            <h2 className="display-xl mt-5 font-display font-bold italic t-head">
              Inside
              <br />
              <span className="pl-[0.8em]">Her Roses.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg font-light leading-[1.85] t-ink">
              A debut collection on womanhood, longing, healing and the quiet ferocity of becoming. Performed on stages and broadcast on radio across the Eastern
              Cape, from spoken-word nights to TRU FM and Madibaz Radio.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/poetry" className="rounded-full bg-[#C21E56] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Read the poetry
              </Link>
              <Link href="/gallery" className="rounded-full border px-7 py-3.5 text-sm font-semibold t-head transition-colors hover:border-[#C21E56] hover:text-[#C21E56]" style={{ borderColor: 'var(--rule)' }}>
                See her world
              </Link>
            </div>
          </FadeUp>
        </div>
      </Stock>

      {/* ═══ IV. THE STAGE: the photograph at full strength ═══════════════════ */}
      <Plate
        src="creativelynanda/performance/nmb-perform-1"
        alt="Nanda performing spoken word in Xhosa beadwork with a drummer and keyboardist"
        pocket="linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0) 62%)"
        className="h-[82vh] min-h-[520px]"
      >
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-16 md:pb-20">
          <FadeUp className="max-w-2xl">
            <p className="kicker" style={{ color: GOLD }}>
              III · The stage
            </p>
            <p className="mt-5 font-display text-4xl italic leading-[1.2] text-white md:text-6xl">
              The poem leaves the page, puts on beadwork, and finds a microphone.
            </p>
          </FadeUp>
        </div>
      </Plate>

      {/* ═══ V. HERITAGE: the brewing video as an offset figure ═══════════════ */}
      <Stock paper="parchment" edge="slant" className="px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-12">
          <FadeUp className="relative md:col-span-5">
            <div aria-hidden className="absolute -right-4 -top-4 bottom-4 left-4 border md:-right-5 md:-top-5" style={{ borderColor: GOLD }} />
            <div className="relative aspect-[3/4] overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
              <AmbientVideo
                src={cldVideo('nanda-culture/nanda-making-african-beer')}
                poster={cldVideoPoster('nanda-culture/nanda-making-african-beer', 2)}
                objectPosition="center"
                alt="Nanda brewing traditional umqombothi in Xhosa beaded regalia"
              />
            </div>
            <p className="kicker mt-5 t-soft">Brewing umqombothi · KuGompo City</p>
          </FadeUp>

          <FadeUp delay={0.12} className="md:col-span-6 md:col-start-7">
            <p className="kicker t-cherry">IV · The line</p>
            <p className="kicker mt-6 t-gold">Nseenene · Tshawe · Hlubi · Msimanga · Thabizolo</p>
            <h2 className="display-l mt-5 font-display italic t-head">Nine generations documented. Three nations. One woman making her art in KuGompo City.</h2>
            <p className="mt-6 text-[14px] italic t-soft">Kabali-Kagwa · Kabombola · Kayenje–Butambala · Nsiisi–Busujju</p>

            <dl className="mt-10 border-t" style={{ borderColor: 'var(--rule)' }}>
              {[
                ['Ggwe Mpagi, ggwe Luwaga; Nakimera muka Ssuuna.', 'Nseenene clan motto · Buganda Kingdom'],
                ['Msimanga · Thabizolo · Nonkosi · Mlotshwa · Ngelengele', 'Msimanga clan praises · AmaHlubi'],
              ].map(([line, source]) => (
                <div key={source} className="border-b py-5" style={{ borderColor: 'var(--rule)' }}>
                  <dt className="font-display text-xl italic t-head">{line}</dt>
                  <dd className="kicker mt-2 t-soft">{source}</dd>
                </div>
              ))}
            </dl>
            <Link href="/roots" className="mt-8 inline-block font-display text-lg italic t-cherry underline underline-offset-[6px]">
              The full lineage
            </Link>
          </FadeUp>
        </div>
      </Stock>

      {/* ═══ VI. TENDER: a quiet human breath ═════════════════════════════════ */}
      <Plate
        src="creativelynanda/nanda-portraits/nanda-green-1"
        alt="Nanda in a sunlit tropical palm garden, straw hat, golden hour"
        focus="center 30%"
        pocket="linear-gradient(270deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 36%, rgba(0,0,0,0) 60%)"
        className="h-[80vh] min-h-[520px]"
      >
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-end px-6 text-right">
          <FadeUp className="max-w-lg">
            <p className="kicker" style={{ color: GOLD }}>
              V · Between the lines
            </p>
            <p className="mt-5 font-display text-3xl italic leading-[1.25] text-white md:text-5xl">
              Beyond the stage and the syntax, a woman who tends roses, gardens, and the people she loves.
            </p>
          </FadeUp>
        </div>
      </Plate>

      {/* ═══ VII. THE ENGINEER: the one navy feature ══════════════════════════ */}
      <Stock paper="navy" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-12">
          <FadeUp delay={0.1} className="relative md:col-span-5 md:col-start-8 md:row-start-1">
            <Link href="/engineer" className="group relative block aspect-[4/5] overflow-hidden rounded-t-[999px]" style={{ boxShadow: 'var(--shadow)' }}>
              <CldImage
                src="creativelynanda/nanda-portraits/nanda-coding/IMG_20250607_100134"
                alt="Nanda at her desk at night, laptop open beside the printer: read the career feature"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
              <div className="absolute bottom-6 left-6">
                <p className="kicker" style={{ color: GOLD }}>
                  Issue 003
                </p>
                <p className="mt-1 font-display text-2xl italic leading-tight text-white">
                  The Making
                  <br />
                  of an Engineer
                </p>
              </div>
            </Link>
          </FadeUp>

          <FadeUp className="md:col-span-6 md:col-start-1 md:row-start-1">
            <p className="kicker t-gold">VI · The other half of the story</p>
            <h2 className="display-xl mt-5 font-display font-bold italic t-head">
              From zero to a fifteen-wing AI OS.
            </h2>
            <p className="mt-7 max-w-lg text-lg font-light leading-[1.8] t-ink">
              She wrote her first line of code in July 2025. One year later: eight live AI products, a personal operating system with fifteen intelligence wings,
              and real paying clients. This is the engineer&apos;s issue.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t pt-7" style={{ borderColor: 'var(--rule)' }}>
              {[
                ['8', 'Live apps'],
                ['3,000+', 'Commits'],
                ['15', 'Distinctions'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-5xl font-bold italic leading-none t-gold">{v}</p>
                  <p className="kicker mt-2 t-soft">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/engineer" className="rounded-full px-8 py-3.5 font-semibold text-[#0A1128] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
                Read the feature
              </Link>
              <Link href="/forge" className="rounded-full border px-8 py-3.5 font-semibold t-head transition-colors hover:border-[#C9943A]" style={{ borderColor: 'var(--rule)' }}>
                Enter the Forge
              </Link>
              <a
                href="https://mirembemuse.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="self-center font-mono text-[11px] uppercase tracking-[0.2em] t-soft underline decoration-dotted underline-offset-4 hover:opacity-80"
              >
                Hire: Mirembe Muse ↗
              </a>
            </div>
          </FadeUp>
        </div>
      </Stock>

      {/* ═══ VIII. CLOSE: the cherry block ═════════════════════════════════════ */}
      <Stock paper="cherry" edge="slant-r" className="px-6 pb-24 pt-24 md:pb-28 md:pt-32">
        <div className="mx-auto grid max-w-6xl items-end gap-12 md:grid-cols-12">
          <FadeUp className="md:col-span-8">
            <p className="kicker t-gold">The last page</p>
            <h2 className="display-xl mt-5 font-display font-bold italic t-head">
              Let&apos;s make something
              <br />
              <span className="pl-[1em]">worth remembering.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="md:col-span-4">
            <p className="font-display text-xl italic t-ink">Poetry. Performance. Collaboration. Conversation.</p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className="rounded-full bg-[#FBF8F2] px-8 py-4 text-center font-semibold text-[#7A1236] transition-transform hover:-translate-y-0.5">
                Get in touch
              </Link>
              <Link href="/poetry" className="rounded-full border px-8 py-4 text-center font-semibold t-head transition-colors hover:bg-white/10" style={{ borderColor: 'var(--rule)' }}>
                Read the poetry
              </Link>
            </div>
          </FadeUp>
        </div>
      </Stock>
    </main>
  );
}
