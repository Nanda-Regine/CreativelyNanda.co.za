'use client';

/**
 * The masthead fan: a mixed pile of real screens (desk and phone, from
 * different products). It spreads and leans toward a mouse pointer; touch and
 * reduced motion get the still arrangement. Each piece opens its product's floor.
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import StudioPhone from '@/components/forge/StudioPhone';
import DeskView from '@/components/forge/evidence/DeskView';
import type { MixItem } from '@/lib/data/studio-floor';

// x offset (%), y offset (px), rotation, scale, z for five pieces; centre first in z.
const TIGHT = [
  { x: -46, y: 70, r: -7, s: 0.9, z: 1 },
  { x: -24, y: -50, r: -3, s: 0.95, z: 2 },
  { x: 0, y: 10, r: 0, s: 1.04, z: 4 },
  { x: 24, y: -40, r: 4, s: 0.95, z: 3 },
  { x: 46, y: 80, r: 8, s: 0.9, z: 1 },
];
const SPREAD = [
  { x: -62, y: 80, r: -10, s: 0.92, z: 1 },
  { x: -34, y: -70, r: -5, s: 0.97, z: 2 },
  { x: 0, y: 10, r: 0, s: 1.05, z: 4 },
  { x: 34, y: -60, r: 6, s: 0.97, z: 3 },
  { x: 62, y: 90, r: 11, s: 0.92, z: 1 },
];

export default function MixFan({ items }: { items: MixItem[] }) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const slots = spread ? SPREAD : TIGHT;

  return (
    <div
      className="relative mx-auto flex h-[400px] w-full max-w-[600px] items-center justify-center md:h-[540px]"
      style={{ perspective: 1400 }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSpread(true)}
      onPointerLeave={() => {
        setSpread(false);
        mx.set(0);
        my.set(0);
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div className="relative flex h-full w-full items-center justify-center" style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d' }}>
        {items.map((it, i) => {
          const pos = slots[Math.min(i, slots.length - 1)];
          const outer = i === 0 || i === items.length - 1;
          return (
            <motion.div
              key={it.key}
              className={`absolute ${outer && items.length > 3 ? 'hidden md:block' : ''}`}
              animate={{ x: `${pos.x}%`, y: pos.y, rotate: pos.r, scale: pos.s }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
              style={{ zIndex: pos.z }}
            >
              <Link href={`/forge/studio/${it.key}`} prefetch={false} aria-label={`${it.name}: open its floor`} className="group block rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#C9943A]">
                {it.shot.kind === 'phone' ? (
                  <StudioPhone screen={it.shot} width={170} accent={it.accent} eager={i === 2} className="w-[130px] transition-transform duration-500 group-hover:-translate-y-2 md:w-[170px]" style={{ width: undefined }} />
                ) : (
                  <div className="w-[190px] transition-transform duration-500 group-hover:-translate-y-2 md:w-[290px]">
                    <DeskView id={it.shot.id} entry={it.shot} alt="" caption={it.shot.caption} path={it.name} priority={i === 2} sizes="290px" />
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
