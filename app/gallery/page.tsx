'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Category = 'Portraits' | 'Culture' | 'Performance' | 'The Book';
type Item = { src: string; alt: string; cat: Category };

// Nanda's own photographs — a wall of the life behind the work. No stock,
// no abstract fillers. Every frame is her.
const ITEMS: Item[] = [
  // Portraits
  { src: '/assets/IMG-20260620-WA0048.jpg', alt: 'Black & gold, on the staircase', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0057.jpg', alt: 'Beneath a palm', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0068.jpg', alt: 'Natural crown', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0055.jpg', alt: 'A quiet portrait', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0049.jpg', alt: 'Held light', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0045.jpg', alt: 'In colour', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0046.jpg', alt: 'Spiral staircase', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0042.jpg', alt: 'Outdoors, at ease', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0073.jpg', alt: 'A candid moment', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0076.jpg', alt: 'Golden hour', cat: 'Portraits' },
  // Culture
  { src: '/assets/IMG-20260620-WA0032.jpg', alt: 'Graduation, with my mother', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0001.jpg', alt: 'The indigenous forest', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0016.jpg', alt: 'Sotho straw hat, Drakensberg', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0017.jpg', alt: 'Elevated viewpoint', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0019.jpg', alt: 'Mountains & tradition', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0014.jpg', alt: 'Cooking with family', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0025.jpg', alt: 'Red dress, an occasion', cat: 'Culture' },
  // Performance & music
  { src: '/assets/performance/nmb-perform-1.jpg', alt: 'Spoken word, in beadwork', cat: 'Performance' },
  { src: '/assets/performance/nmb-perform-2.jpg', alt: 'Mid-performance', cat: 'Performance' },
  { src: '/assets/IMG-20260620-WA0013.jpg', alt: 'At the drums', cat: 'Performance' },
  { src: '/assets/IMG-20260620-WA0011.jpg', alt: 'At the piano', cat: 'Performance' },
  { src: '/assets/radio/madiba-radio-1.jpg', alt: 'On Madiba Radio', cat: 'Performance' },
  { src: '/assets/radio/madiba-radio-2.jpg', alt: 'On air', cat: 'Performance' },
  // The Book
  { src: '/assets/poetry-book/official-cover.jpg', alt: 'Inside Her Roses — the cover', cat: 'The Book' },
  { src: '/assets/poetry-book/book-shoot-1.jpg', alt: 'The book, on bark', cat: 'The Book' },
  { src: '/assets/poetry-book/book-shoot-2.jpg', alt: 'The book, styled', cat: 'The Book' },
  { src: '/assets/poetry-book/books-bulk.jpg', alt: 'Copies, fresh from print', cat: 'The Book' },
  { src: '/assets/poetry-book/book-launch-poster.jpg', alt: 'Launch poster', cat: 'The Book' },
];

const TABS: ('All' | Category)[] = ['All', 'Portraits', 'Culture', 'Performance', 'The Book'];

export default function Gallery() {
  const [tab, setTab] = useState<'All' | Category>('All');
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const items = tab === 'All' ? ITEMS : ITEMS.filter((i) => i.cat === tab);

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: GRAIN }} />
      {/* warm studio glow */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#C9943A]/10 blur-3xl" />

      {/* Header */}
      <section className="relative z-10 pt-32 pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-[#C9943A] mb-4">The life behind the work</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5">The Studio</h1>
          <p className="mx-auto text-white/60 text-lg max-w-2xl leading-relaxed">
            Not stock, not abstractions — me. Portraits, the culture that raised me, the stage,
            and the book. Every frame a real day.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="rounded-full border px-5 py-2 text-sm font-medium transition-all"
                style={{
                  background: tab === t ? '#C1292E' : 'transparent',
                  borderColor: tab === t ? '#C1292E' : 'rgba(245,240,232,0.2)',
                  color: tab === t ? '#fff' : 'rgba(245,240,232,0.7)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Circular studio wall */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-square w-full overflow-hidden rounded-full shadow-xl ring-2 ring-[#C9943A]/30 transition-all duration-500 hover:-translate-y-1.5 hover:ring-4 hover:ring-[#C9943A]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9943A]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </button>
                <span className="mt-3 max-w-[14rem] text-center font-display text-sm italic text-white/70">
                  {item.alt}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 font-display text-3xl italic leading-snug text-white/90 md:text-4xl">
            Words, colour, rhythm and culture — all of it from the same hand.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/poetry/collection" className="rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-[#C1292E]/90">
              Read the poetry
            </Link>
            <Link href="/about" className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
              The lineage
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: '80vh' }}>
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" sizes="100vw" />
              </div>
              <p className="mt-3 text-center font-display text-base italic text-white/80">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-2 right-0 text-2xl text-white/70 hover:text-white md:-top-8 md:-right-8"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
