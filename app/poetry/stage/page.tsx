'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, X, ArrowLeft } from 'lucide-react';
import { PERFORMANCES, PERFORMANCE_STILLS, type Performance } from '@/lib/data/performances';

export default function SpokenWordStage() {
  const [active, setActive] = useState<Performance | null>(null);

  return (
    <div className="min-h-screen bg-navy text-beige">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cherry/15 blur-3xl" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/poetry" className="inline-flex items-center gap-2 text-beige/60 hover:text-cherry text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Poetry
          </Link>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-px bg-cherry" />
            <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">The Stage</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            The voice behind <span className="text-cherry">the verse</span>
          </h1>
          <p className="text-lg text-beige/70 max-w-2xl">
            A poem on the page is a whisper. On the stage, it breathes. Here are the nights the
            words left the book and found the room.
          </p>
        </div>
      </section>

      {/* Performance videos */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
          {PERFORMANCES.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(p)}
              className="group relative overflow-hidden rounded-2xl aspect-video text-left"
            >
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-cherry/90 group-hover:bg-cherry group-hover:scale-110 transition-all shadow-xl">
                  <Play className="w-7 h-7 text-white translate-x-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                {p.note && <p className="text-beige/60 text-sm">{p.note}</p>}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Stills */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">In beadwork & light</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {PERFORMANCE_STILLS.map((still, i) => (
              <motion.div
                key={still.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <Image src={still.src} alt={still.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 text-beige/80 hover:text-white flex items-center gap-2 text-sm"
              >
                Close <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={active.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={active.title}
                />
              </div>
              <p className="text-center mt-4 font-display text-xl">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
