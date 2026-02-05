'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

const speedDurations = {
  slow: { min: 15, max: 25 },
  medium: { min: 10, max: 18 },
  fast: { min: 5, max: 12 },
};

export function FloatingParticles({
  count = 15,
  color = 'bg-gold/20',
  speed = 'medium',
  className = ''
}: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * (speedDurations[speed].max - speedDurations[speed].min) + speedDurations[speed].min,
      delay: Math.random() * 5,
    }));
  }, [count, speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${color}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingParticles;
