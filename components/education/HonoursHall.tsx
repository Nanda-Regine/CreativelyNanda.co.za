'use client';

/**
 * The Honours Hall — tiers II and III of the Education page.
 *
 * Tier I (the three NQF qualifications) stays in the page as the gold-leaf
 * section above this one. This component hangs everything else, by weight:
 *
 *   II  · The Path     — the SheCodes certificates as three rising steps
 *   III · The Cabinet  — short courses, one shelf per issuer
 *
 * Every frame is the real document (`lib/data/credentials.ts`), and clicking one
 * lifts it onto the Lectern: full size, the facts as printed, and a live
 * "Verify" seal wherever the issuer offers one. The point of the room is that a
 * visitor never has to take a credential on trust.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CABINET,
  CREDENTIALS_BY_DATE,
  PROGRAMME_PATH,
  formatCredentialDate,
  type Credential,
} from '@/lib/data/credentials';

const GOLD = '#C9943A';
const CREAM = '#F5EFD6';
const NAVY = '#0A0F2C';
const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── The document itself, with screenshot chrome cropped away ───────────────────

function CertificateImage({ c, sizes, priority = false }: { c: Credential; sizes: string; priority?: boolean }) {
  const { t = 0, r = 0, b = 0, l = 0 } = c.crop ?? {};
  const fx = 1 - (l + r) / 100;
  const fy = 1 - (t + b) / 100;
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${c.image.width * fx} / ${c.image.height * fy}` }}
    >
      <div
        className="absolute"
        style={{
          width: `${100 / fx}%`,
          height: `${100 / fy}%`,
          left: `${-l / fx}%`,
          top: `${-t / fy}%`,
        }}
      >
        <Image
          src={c.image.src}
          alt={`${c.title}, certificate issued by ${c.issuer} to Nandawula Kabali-Kagwa, ${formatCredentialDate(c.date)}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

/** A frame on the wall: gold hairline, cream mat, the document. */
function Frame({ c, onOpen, sizes }: { c: Credential; onOpen: (c: Credential, el: HTMLElement) => void; sizes: string }) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(c, e.currentTarget)}
      className="group block w-full text-left focus-visible:outline-none"
      aria-label={`Open the ${c.title} certificate from ${c.issuer}`}
    >
      <div
        className="relative p-[3px] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, ${GOLD}, #8A6424 45%, #E2B96A 70%, ${GOLD})`,
          boxShadow: '0 18px 40px -18px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,0.35)',
        }}
      >
        <div className="p-2 sm:p-3" style={{ background: CREAM }}>
          <CertificateImage c={c} sizes={sizes} />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ boxShadow: `0 0 0 2px ${GOLD}, 0 0 36px -4px ${GOLD}` }}
        />
      </div>
    </button>
  );
}

// ── The Lectern ──────────────────────────────────────────────────────────────────

function Lectern({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const c = CREDENTIALS_BY_DATE[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const facts: [string, string][] = [
    ['Issued by', c.issuer],
    ...(c.issuerDetail ? ([['', c.issuerDetail]] as [string, string][]) : []),
    ['Completed', formatCredentialDate(c.date)],
    ...(c.credentialId ? ([['Credential ID', c.credentialId]] as [string, string][]) : []),
    ...(c.duration ? ([['Duration', c.duration]] as [string, string][]) : []),
    ['Awarded to', 'Nandawula Kabali-Kagwa'],
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lectern-title"
      className="fixed inset-0 z-[80] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.3 }}
    >
      <div
        className="fixed inset-0"
        style={{ background: 'rgba(6,9,26,0.94)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 opacity-20" style={{ backgroundImage: GRAIN }} aria-hidden />

      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-4 py-16 sm:px-6 lg:py-20">
        {/* top bar */}
        <div className="relative mb-6 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            The Lectern · {index + 1} / {CREDENTIALS_BY_DATE.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            style={{ color: CREAM, outlineColor: GOLD }}
          >
            Close ✕
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={c.slug}
            className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
          >
            {/* the document, on its mat, under a lamp */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-16 -z-0 opacity-60"
                style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(201,148,58,0.22), transparent 65%)` }}
              />
              <div
                className="relative p-3 sm:p-5"
                style={{ background: CREAM, boxShadow: '0 40px 80px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(201,148,58,0.5)' }}
              >
                <CertificateImage c={c} sizes="(max-width: 1024px) 100vw, 800px" priority />
              </div>
            </div>

            {/* the facts, as printed */}
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                {c.tier === 'programme' ? `II · The Path · ${c.step}` : 'III · The Cabinet'}
              </p>
              <h3 id="lectern-title" className="mt-3 font-display text-3xl font-semibold italic leading-[1.1] sm:text-4xl" style={{ color: CREAM }}>
                {c.title}
              </h3>
              <p className="mt-4 font-display text-[17px] italic leading-relaxed" style={{ color: 'rgba(245,239,214,0.72)' }}>
                {c.context}
              </p>

              <dl className="mt-7 border-t pt-5" style={{ borderColor: 'rgba(201,148,58,0.25)' }}>
                {facts.map(([k, v]) => (
                  <div key={`${k}${v}`} className={k ? 'mt-3 first:mt-0' : 'mt-0.5'}>
                    {k && (
                      <dt className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgba(201,148,58,0.75)' }}>
                        {k}
                      </dt>
                    )}
                    <dd className={k ? 'mt-1 text-[14px]' : 'text-[12.5px] italic'} style={{ color: k ? CREAM : 'rgba(245,239,214,0.6)' }}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              {c.verifyUrl ? (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
                  style={{ background: GOLD, color: NAVY }}
                >
                  <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full border" style={{ borderColor: NAVY }}>✓</span>
                  Verify with {c.issuer}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-8 max-w-[18rem] text-[12.5px] leading-relaxed" style={{ color: 'rgba(245,239,214,0.5)' }}>
                  {c.issuer} does not publish a public verification page
                  {c.credentialId ? '; the credential ID above is as printed.' : '. The document is shown here in full.'}
                </p>
              )}

              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  className="rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-white/5"
                  style={{ borderColor: 'rgba(201,148,58,0.4)', color: CREAM }}
                >
                  ← Earlier
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  className="rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-white/5"
                  style={{ borderColor: 'rgba(201,148,58,0.4)', color: CREAM }}
                >
                  Later →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── The room ─────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HonoursHall() {
  const [open, setOpen] = useState<number | null>(null);
  // the portal target only exists after mount — rendering it on the hydration
  // pass would differ from the server HTML (memory: hydration-patterns)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const trigger = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((c: Credential, el: HTMLElement) => {
    trigger.current = el;
    setOpen(CREDENTIALS_BY_DATE.findIndex((x) => x.slug === c.slug));
  }, []);
  const onClose = useCallback(() => {
    setOpen(null);
    // hand focus back to the frame that opened the lectern
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);
  const onStep = useCallback((delta: number) => {
    setOpen((i) => (i === null ? i : (i + delta + CREDENTIALS_BY_DATE.length) % CREDENTIALS_BY_DATE.length));
  }, []);

  return (
    <section id="honours-hall" className="relative z-10 overflow-hidden px-6 py-24" style={{ background: NAVY }}>
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: GRAIN }} aria-hidden />
      {/* museum lighting: one warm spotlight from above, not a flat band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem]"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(201,148,58,0.16), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            The Honours Hall
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold italic leading-[1.05] md:text-6xl" style={{ color: CREAM }}>
            Every certificate, hung where you can read it.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.85]" style={{ color: 'rgba(245,239,214,0.62)' }}>
            Hung by weight, not by count: the three university qualifications above, then the path that
            taught her to code, then the cabinet of short courses. Lift any document off the wall to read
            it in full, where the issuer offers verification, the seal links straight to it.
          </p>
        </Reveal>

        {/* ── II · The Path ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl font-bold italic" style={{ color: GOLD }}>II</span>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: CREAM }}>The Path</h3>
              <p className="mt-1 font-display text-[15px] italic" style={{ color: 'rgba(245,239,214,0.55)' }}>
                SheCodes · July 2025 to February 2026, three steps
              </p>
            </div>
          </div>
        </Reveal>

        {/* three rising steps: the first sits lowest */}
        <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {PROGRAMME_PATH.map((c, i) => (
            <li key={c.slug} className={i === 0 ? 'md:pt-24' : i === 1 ? 'md:pt-12' : ''}>
              <Reveal delay={i * 0.12}>
                <Frame c={c} onOpen={onOpen} sizes="(max-width: 768px) 100vw, 320px" />
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                  Step {i + 1} · {c.step} · {formatCredentialDate(c.date, 'short')}
                </p>
                <p className="mt-2 font-display text-xl font-semibold italic leading-snug" style={{ color: CREAM }}>
                  {c.title}
                </p>
                <p className="mt-2 border-l pl-3 text-[13.5px] font-light leading-[1.75]" style={{ borderColor: 'rgba(201,148,58,0.4)', color: 'rgba(245,239,214,0.62)' }}>
                  {c.context}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12">
          <a
            href="#fnb-app-academy"
            className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t pt-5 text-[13.5px]"
            style={{ borderColor: 'rgba(201,148,58,0.25)', color: 'rgba(245,239,214,0.62)' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: '#5FD3E4' }}>In progress</span>
            <span>FNB App Academy · University of Johannesburg Business School, hangs here when it is awarded.</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1" style={{ color: GOLD }}>↑</span>
          </a>
        </Reveal>

        {/* ── III · The Cabinet ─────────────────────────────────────── */}
        <Reveal className="mt-24">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl font-bold italic" style={{ color: GOLD }}>III</span>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: CREAM }}>The Cabinet</h3>
              <p className="mt-1 font-display text-[15px] italic" style={{ color: 'rgba(245,239,214,0.55)' }}>
                Short courses · one shelf per issuer
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 space-y-16">
          {CABINET.map((shelf) => (
            <Reveal key={shelf.issuer}>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: 'rgba(245,239,214,0.5)' }}>
                {shelf.issuer} · {shelf.items.length}
              </p>
              <div className="relative">
                <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 md:grid-cols-4">
                  {shelf.items.map((c) => (
                    <li key={c.slug}>
                      <Frame c={c} onOpen={onOpen} sizes="(max-width: 768px) 50vw, 240px" />
                      <p className="mt-4 font-display text-[15px] font-semibold italic leading-snug" style={{ color: CREAM }}>
                        {c.title}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(201,148,58,0.75)' }}>
                        {formatCredentialDate(c.date, 'short')}
                        {c.verifyUrl ? ' · verifiable' : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {/* the shelf itself */}
              <div
                aria-hidden
                className="mt-6 h-[3px]"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD} 12%, ${GOLD} 88%, transparent)`,
                  boxShadow: '0 10px 18px -6px rgba(0,0,0,0.7)',
                  opacity: 0.55,
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* portalled to <body>: this section is its own stacking context (z-10),
          which would otherwise trap the lectern beneath the fixed navigation */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && <Lectern key="lectern" index={open} onClose={onClose} onStep={onStep} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
