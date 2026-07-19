'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Feather } from 'lucide-react';
import {
  getMoodKeyForPoem,
  getMood,
  type Poem,
  type PoemAnnotation,
} from '@/lib/poems-data';
import { getAtmosphere, GRAIN_SVG } from '@/lib/moods-atmosphere';
import {
  splitLines,
  deriveTempoMs,
  deriveAmbient,
  resolveDoorway,
} from '@/lib/reading-room';
import AmbientCanvas from './AmbientCanvas';
import LineReveal from './LineReveal';
import DepthToggle, { type Depth } from './DepthToggle';
import VoicePlayer from './VoicePlayer';
import PetalEnding from './PetalEnding';
import Marginalia, { type Whisper } from './Marginalia';

// ReadingRoom — the immersive experience layered over a poem. A full-screen
// overlay: the poem arrives in its own breath over a mood-wash, petals drifting,
// Nanda's voice on offer, lines you can tap to learn their story — closing on a
// petal and a doorway to the next room.

export default function ReadingRoom({ poem }: { poem: Poem }) {
  const [depth, setDepth] = useState<Depth>('room');
  const [reduced, setReduced] = useState(false);
  const [ended, setEnded] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [whispers, setWhispers] = useState<Whisper[]>([]);

  const moodKey = getMoodKeyForPoem(poem);
  const mood = getMood(moodKey);
  const atmosphere = getAtmosphere(moodKey);
  const accent = mood?.wash ?? '#C9A84C';

  const lines = useMemo(() => splitLines(poem.content), [poem.content]);
  const tempoMs = useMemo(() => deriveTempoMs(poem), [poem]);
  const ambient = useMemo(() => deriveAmbient(poem), [poem]);
  const doorway = useMemo(() => resolveDoorway(poem), [poem]);

  const annById = useMemo(() => {
    const m = new Map<number, PoemAnnotation>();
    poem.annotations?.forEach((a) => m.set(a.line, a));
    return m;
  }, [poem.annotations]);

  const whisperCountByLine = useMemo(() => {
    const m = new Map<number, number>();
    for (const w of whispers) m.set(w.line_index, (m.get(w.line_index) ?? 0) + 1);
    return m;
  }, [whispers]);

  // Respect the OS reduced-motion setting.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  // Load reader whispers once (used by the Annotated mode).
  useEffect(() => {
    fetch(`/api/poetry/poems/${poem.slug}/marginalia`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setWhispers(d))
      .catch(() => {});
  }, [poem.slug]);

  // Esc drops to the plain reading.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDepth('plain');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Reset the ending whenever the depth changes (each mode re-reveals).
  useEffect(() => setEnded(false), [depth]);

  const instant = depth !== 'room' || reduced;
  const annotated = depth === 'annotated';

  const openMarginalia = (i: number) => setActiveLine(i);
  const activeAnnotation = activeLine != null ? annById.get(activeLine) : undefined;

  return (
    <div className="fixed inset-0 z-[55] overflow-y-auto" style={{ background: atmosphere.wash }}>
      {/* ── Atmosphere: painting + colour-wash + grain + drifting life ── */}
      <div className="pointer-events-none fixed inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={atmosphere.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: atmosphere.imageOpacity }}
        />
        <div className="absolute inset-0" style={{ background: atmosphere.gradient }} />
        <div className="absolute inset-0 opacity-[0.14] mix-blend-soft-light" style={{ backgroundImage: GRAIN_SVG }} />
        <AmbientCanvas kind={ambient} color={accent} active={depth === 'room'} reducedMotion={reduced} />
      </div>

      {/* ── Control bar ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href={`/poetry/collection/${poem.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs text-cream/70 backdrop-blur transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" /> Leave the room
        </Link>
        <DepthToggle value={depth} onChange={setDepth} />
      </div>

      {/* ── The poem ── */}
      <div className="relative mx-auto max-w-2xl px-6 pb-24 pt-6">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-lg">{mood?.emoji}</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: '#C9A84C' }}>
              {mood?.label ?? poem.category}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl" style={{ color: '#F5EFD6' }}>
            {poem.title}
          </h1>
          <p className="mt-4 font-display text-base italic text-cream/60">Nanda Regine</p>
        </div>

        {/* Nanda's voice, when a recording exists */}
        {poem.audioUrl && (
          <div className="mb-10">
            <VoicePlayer src={poem.audioUrl} title={poem.title} />
          </div>
        )}

        {annotated && (
          <p className="mb-6 flex items-center justify-center gap-2 text-center text-xs text-cream/45">
            <Feather className="h-3.5 w-3.5" /> Tap any line to hear its story and leave a whisper.
          </p>
        )}

        <div className="font-serif text-xl leading-relaxed text-cream/90 md:text-2xl">
          <LineReveal
            key={depth /* re-reveal on mode change */}
            lines={lines}
            tempoMs={tempoMs}
            instant={instant}
            onComplete={() => setEnded(true)}
            renderLine={(line, i, revealed) => {
              if (line.trim().length === 0) return <span className="block h-6" />;

              const hasAnnotation = annById.has(i);
              const wc = whisperCountByLine.get(i) ?? 0;

              const inner = (
                <span className="relative">
                  {line}
                  {annotated && hasAnnotation && (
                    <span className="ml-1.5 align-super text-xs text-[#C9A84C]">✦</span>
                  )}
                  {annotated && wc > 0 && (
                    <span className="ml-1.5 align-super text-[0.6rem] text-cream/40">{wc}</span>
                  )}
                </span>
              );

              const style: React.CSSProperties = {
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(10px)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
              };

              if (annotated) {
                return (
                  <button
                    type="button"
                    onClick={() => openMarginalia(i)}
                    style={style}
                    className={`block w-full cursor-pointer rounded-md px-2 py-0.5 text-left transition-colors hover:bg-white/[0.06] ${
                      hasAnnotation ? 'text-cream' : ''
                    }`}
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <span className="block px-2 py-0.5" style={style}>
                  {inner}
                </span>
              );
            }}
          />
        </div>

        {/* Attribution */}
        <div className="mt-12 border-t border-white/10 pt-6 text-right">
          <p className="font-display text-xl italic" style={{ color: '#C9A84C' }}>— Nanda Regine</p>
          <p className="mt-1 text-sm text-cream/40">From &ldquo;Inside Her Roses&rdquo;</p>
        </div>

        {/* The ending — petal + doorway (appears once the poem has fully arrived) */}
        <AnimatePresence>
          {ended && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <PetalEnding slug={poem.slug} doorway={doorway} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Marginalia panel */}
      <AnimatePresence>
        {activeLine != null && (
          <Marginalia
            slug={poem.slug}
            lineIndex={activeLine}
            lineText={lines[activeLine] ?? ''}
            whispers={whispers}
            annotation={activeAnnotation?.story}
            onClose={() => setActiveLine(null)}
            onAdded={(w) => setWhispers((prev) => [...prev, w])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
