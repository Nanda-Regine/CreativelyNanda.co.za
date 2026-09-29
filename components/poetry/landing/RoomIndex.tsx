'use client';

/**
 * The contents page of the poetry wing.
 *
 * A numbered list, set like a magazine's contents, where hovering a room lifts
 * a photograph of it off the page and carries it with the pointer (desktop,
 * fine pointers only). On touch screens each row shows its photograph inline
 * instead, because there is no hover to reveal it.
 */

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type Room = { href: string; title: string; line: string; image: string; alt: string };

export default function RoomIndex({ rooms }: { rooms: Room[] }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <ol className="border-t" style={{ borderColor: 'var(--rule)' }}>
        {rooms.map((r, i) => (
          <li key={r.href} className="border-b" style={{ borderColor: 'var(--rule)' }}>
            <Link
              href={r.href}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-7"
            >
              {/* inline photograph for touch screens */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image.replace('w_900', 'w_160')} alt="" loading="lazy" className="h-16 w-12 rounded-sm object-cover md:hidden" />
              <span className="numeral-outline hidden font-display text-5xl font-bold italic leading-none md:block">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-2xl italic leading-tight t-head transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{r.title}</span>
              <span className="hidden text-[15px] font-light leading-relaxed t-soft md:block">{r.line}</span>
              <ArrowUpRight className="h-5 w-5 t-cherry transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ol>

      {/* the photograph that follows the pointer */}
      {!reduce ? (
        <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {hover !== null ? (
              <motion.div
                key={rooms[hover].href}
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="shape-arch-soft absolute -translate-x-1/2 -translate-y-[115%] overflow-hidden"
                style={{ width: 240, height: 300, boxShadow: '0 40px 70px -30px rgba(40,10,20,0.55)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rooms[hover].image} alt={rooms[hover].alt} className="h-full w-full object-cover" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
