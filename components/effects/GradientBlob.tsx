'use client';

import { motion } from 'framer-motion';

interface GradientBlobProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-32 h-32 md:w-48 md:h-48',
  md: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
  lg: 'w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]',
  xl: 'w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]',
};

const positionClasses = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export function GradientBlob({
  color = 'from-gold/20 via-gold/5 to-transparent',
  size = 'md',
  position = 'top-right',
  animate = true,
  className = ''
}: GradientBlobProps) {
  const baseClasses = `absolute rounded-full blur-3xl bg-gradient-to-br ${color} ${sizeClasses[size]} ${positionClasses[position]} ${className}`;

  if (!animate) {
    return <div className={baseClasses} />;
  }

  return (
    <motion.div
      className={baseClasses}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default GradientBlob;
