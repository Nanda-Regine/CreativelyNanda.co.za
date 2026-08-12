'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import { FEATURED, RECOMMENDATIONS, READER_REPLIES, READER_SHOTS } from '@/lib/data/testimonials';
import { hrefFor, EXTERNAL_LINK_PROPS } from '@/lib/external-routes';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;


function RecCard({ rec, index }: { rec: typeof RECOMMENDATIONS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const preview = rec.text.slice(0, 220) + '…';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
    >
      <div
        className="relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-[28px] cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#C1292E] via-[#B8860B] to-[#C1292E]" />
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C1292E] to-[#B8860B] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {rec.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-bold text-[#0A1128] truncate">{rec.name}</h3>
              <p className="text-[#0A1128]/55 text-xs line-clamp-2 mt-0.5">{rec.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#C1292E] text-xs">{rec.date}</span>
                <span className="text-[#0A1128]/20">·</span>
                <span className="text-[#B8860B] text-xs">{rec.context}</span>
              </div>
            </div>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#C1292E] text-lg shrink-0"
            >
              ↓
            </motion.span>
          </div>

          <div className="text-[#B8860B]/25 text-5xl font-serif leading-none mb-2">&ldquo;</div>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[#0A1128]/75 text-sm leading-relaxed space-y-3"
              >
                {rec.text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </motion.div>
            ) : (
              <motion.p key="preview" className="text-[#0A1128]/75 text-sm leading-relaxed">
                {preview}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-4 text-[#C1292E] text-xs font-medium">
            {expanded ? 'Show less' : 'Read full recommendation'} →
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── HERO (textured depth) ─────────────────────────────────────────── */}
      <TexturedSection texture={TEXTURES.marble} tone="wine" className="relative z-10 pt-32 pb-20 px-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1292E]/15 pointer-events-none" style={{ borderRadius: '0 0 0 100%' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs tracking-[0.35em] uppercase text-[#B8860B] mb-5"
          >
            LinkedIn Recommendations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.92] mb-6"
          >
            What people<br />
            <span className="text-[#C1292E]">say about Nanda.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl leading-relaxed"
          >
            Six LinkedIn recommendations from managers, peers, and direct reports — spanning
            hospitality, retail, and creative consulting.
          </motion.p>
        </div>
      </TexturedSection>

      {/* ── FEATURED QUOTE — Bojan ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-[#0A1128] p-8 md:p-14 overflow-hidden"
            style={{ borderRadius: '60px 20px 60px 20px' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#C1292E]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#B8860B]/20 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-5">Featured Recommendation</p>
              <div className="text-[#B8860B]/40 text-7xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="font-display text-xl md:text-2xl text-[#E8DCC4] leading-relaxed mb-8">
                {FEATURED.text}
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-[#E8DCC4]/15">
                <div>
                  <p className="font-display text-xl font-bold text-[#C1292E]">{FEATURED.author}</p>
                  <p className="text-[#E8DCC4]/60 text-sm">{FEATURED.title}</p>
                </div>
                <span className="text-[#B8860B] text-sm font-mono">{FEATURED.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RECOMMENDATIONS GRID ─────────────────────────────────────────── */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-12 h-px bg-[#C1292E]" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A1128]">
              All <span className="text-[#C1292E]">Recommendations</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {RECOMMENDATIONS.map((rec, i) => (
              <RecCard key={rec.name} rec={rec} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/*
       * ── THE READER'S REPLY ──────────────────────────────────────────────
       *
       * Everything above this line is a colleague or a manager saying she is
       * good to work with. This section is a stranger saying the writing landed
       * — a different and much harder claim to be able to make about yourself,
       * and it was sitting unused in `public/assets/reviews/` the whole time.
       *
       * Set on parchment on purpose: the page has been red and navy to here,
       * and the shift in paper is what tells the eye a different KIND of
       * evidence has started.
       */}
      <section className="relative z-10 overflow-hidden px-6 py-24" style={{ background: '#F5F0E8', color: '#1A1A2E' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]" style={{ backgroundImage: GRAIN }} />

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.32em]" style={{ color: '#C1292E' }}>
              The reader&apos;s reply
            </p>
            <h2 className="mt-4 max-w-3xl font-display font-bold italic leading-[1.04]" style={{ fontSize: 'clamp(2rem, 5.5vw, 3.6rem)' }}>
              And then there are the people who never met her.
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] font-light leading-[1.85]" style={{ color: 'rgba(26,26,46,0.72)' }}>
              Everything above is a colleague. Below are strangers on a poetry platform, replying to individual
              poems — transcribed from the screenshots, which are underneath. One of them is a criticism, and it
              stays: a page where everyone agrees is a page that has been curated.
            </p>
          </motion.div>

          {/* the quotes, staggered so the column breaks */}
          <div className="mt-16 space-y-12">
            {READER_REPLIES.map((r, i) => (
              <motion.figure
                key={`${r.reader}-${r.poem}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
                className={i % 2 === 1 ? 'md:ml-auto md:max-w-2xl md:text-right' : 'md:max-w-2xl'}
              >
                <blockquote
                  className={`border-l-2 pl-6 ${i % 2 === 1 ? 'md:border-l-0 md:border-r-2 md:pl-0 md:pr-6' : ''}`}
                  style={{ borderColor: r.dissent ? 'rgba(26,26,46,0.35)' : '#C1292E' }}
                >
                  <p className="font-display italic leading-[1.4]" style={{ fontSize: 'clamp(1.15rem, 2.6vw, 1.7rem)' }}>
                    {r.text}
                  </p>
                  <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: 'rgba(26,26,46,0.55)' }}>
                    <span style={{ color: '#C1292E' }}>{r.reader}</span>
                    <span>on “{r.poem}”</span>
                    {r.dissent ? (
                      <span className="rounded-full px-2 py-0.5" style={{ background: 'rgba(26,26,46,0.08)' }}>
                        a note, not a compliment
                      </span>
                    ) : null}
                  </figcaption>
                </blockquote>
              </motion.figure>
            ))}
          </div>

          {/* the evidence itself, as a pinned wall */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgba(26,26,46,0.45)' }}>
              Fourteen of them, unedited
            </p>
            {/*
             * Three columns, not four, and no rotation on the column child.
             * CSS columns balance by content height, and these screenshots run
             * from square to very tall — at four columns the balancer left a
             * blank half-column, and a `transform` on a `break-inside-avoid`
             * child enlarges its bounding box, which made the gap worse. The
             * tilt now lives on an inner element where it costs nothing.
             */}
            <div className="mt-6 columns-2 gap-3 md:columns-3 md:gap-4">
              {READER_SHOTS.map((id, i) => (
                <div
                  key={id}
                  className="mb-3 break-inside-avoid overflow-hidden rounded-sm md:mb-4"
                  style={{ boxShadow: '0 8px 24px rgba(26,26,46,0.12)' }}
                >
                  <CldImage
                    src={`creativelynanda/${id}`}
                    alt={`A reader's response to one of the poems (${i + 1} of ${READER_SHOTS.length})`}
                    width={520}
                    height={520}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#C1292E]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold italic text-white mb-6">
            Ready to add your name to this list?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* /consulting and /work are 308s to mirembemuse (next.config.js).
                As internal Links, Next prefetched an RSC payload for a
                cross-origin redirect and the browser blocked it — which is what
                filled this page's console with ERR_FAILED. See
                `lib/external-routes.ts`. */}
            <a
              href={hrefFor('/consulting').href}
              {...EXTERNAL_LINK_PROPS}
              className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
            >
              Work with Nanda →
            </a>
            <a
              href={hrefFor('/work').href}
              {...EXTERNAL_LINK_PROPS}
              className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all"
            >
              View full work history
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
