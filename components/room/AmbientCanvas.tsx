'use client';

import { useEffect, useRef } from 'react';
import type { AmbientKind } from '@/lib/reading-room';

// AmbientCanvas — the drifting life of the Reading Room, drawn on a single
// Canvas (no deps, offline-safe). Petals fall, ink rises, light floats. Capped
// at 26 particles, paused when the tab is hidden or motion is unwelcome.

interface Props {
  kind: AmbientKind;
  color?: string;       // tint drawn from the poem's mood wash
  active?: boolean;     // parent can pause (e.g. Plain depth mode)
  reducedMotion?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  spin: number;
  opacity: number;
}

const MAX_PARTICLES = 26;

export default function AmbientCanvas({
  kind,
  color = '#C9A84C',
  active = true,
  reducedMotion = false,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (kind === 'none' || reducedMotion || !active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: kind === 'light' ? 1.2 + Math.random() * 2.4 : 3 + Math.random() * 7,
      speed: (kind === 'ink' ? -1 : 1) * (0.15 + Math.random() * 0.5),
      drift: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      opacity: 0.15 + Math.random() * 0.5,
    });

    resize();
    particlesRef.current = Array.from({ length: MAX_PARTICLES }, seed);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.3;
        p.angle += p.spin;

        // wrap around the viewport edges
        if (kind === 'ink') {
          if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        } else if (p.y > height + 10) {
          p.y = -10; p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (kind === 'light') {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.5);
          g.addColorStop(0, color);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (kind === 'ink') {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // petal: a soft asymmetric ellipse
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [kind, color, active, reducedMotion]);

  if (kind === 'none' || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? 'pointer-events-none absolute inset-0 h-full w-full'}
    />
  );
}
