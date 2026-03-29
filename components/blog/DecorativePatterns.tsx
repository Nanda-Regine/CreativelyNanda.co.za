'use client';

import { motion } from 'framer-motion';

interface PatternProps {
  className?: string;
  variant?: number;
}

// Circuit pattern for Dev category - tech nodes and connections
export function CircuitPattern({ className = '' }: PatternProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3" />
          <path
            d="M0 20h16M24 20h16M20 0v16M20 24v16"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#circuit-grid)" />
      {/* Accent nodes */}
      <motion.circle
        cx="40"
        cy="60"
        r="6"
        fill="currentColor"
        opacity="0.4"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.circle
        cx="160"
        cy="140"
        r="8"
        fill="currentColor"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.circle
        cx="120"
        cy="40"
        r="5"
        fill="currentColor"
        opacity="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      {/* Connection lines */}
      <motion.path
        d="M40 60 L80 60 L80 100 L120 100"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d="M120 40 L120 80 L160 80 L160 140"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </svg>
  );
}

// Quill pattern for Writing category - feather and ink flourishes
export function QuillPattern({ className = '' }: PatternProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Decorative flourishes */}
      <motion.path
        d="M20 180 Q60 140 100 160 T180 120"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.path
        d="M10 100 Q50 80 90 100 T170 60"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      {/* Feather quill */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <path
          d="M150 30 Q160 50 155 80 L145 75 Q150 50 150 30"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M155 80 L145 75 L140 120"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        {/* Feather barbs */}
        <path
          d="M150 40 Q170 45 165 55 M150 50 Q175 55 168 68 M150 60 Q172 68 165 82"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
      </motion.g>
      {/* Ink drops */}
      <motion.circle
        cx="145"
        cy="130"
        r="4"
        fill="currentColor"
        opacity="0.4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      />
      <motion.circle
        cx="155"
        cy="145"
        r="2.5"
        fill="currentColor"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
      />
    </svg>
  );
}

// Growth pattern for Business category - upward charts and arrows
export function GrowthPattern({ className = '' }: PatternProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid lines */}
      <defs>
        <pattern id="growth-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path
            d="M0 25h25M25 0v25"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.15"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#growth-grid)" />

      {/* Growth chart bars */}
      <motion.rect
        x="30"
        y="140"
        width="20"
        height="40"
        fill="currentColor"
        opacity="0.2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.rect
        x="60"
        y="120"
        width="20"
        height="60"
        fill="currentColor"
        opacity="0.25"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.rect
        x="90"
        y="90"
        width="20"
        height="90"
        fill="currentColor"
        opacity="0.3"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.rect
        x="120"
        y="60"
        width="20"
        height="120"
        fill="currentColor"
        opacity="0.35"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Growth trend line */}
      <motion.path
        d="M40 140 L70 120 L100 90 L130 60"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Upward arrow */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <path
          d="M160 40 L160 100 M160 40 L150 55 M160 40 L170 55"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </motion.g>
    </svg>
  );
}

// Generic decorative blob
export function DecorativeBlob({ className = '' }: PatternProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          d="M100 20 C140 20 180 50 180 100 C180 150 140 180 100 180 C60 180 20 150 20 100 C20 50 60 20 100 20"
          fill="currentColor"
          opacity="0.1"
        />
      </svg>
    </motion.div>
  );
}

// Get pattern component by category
export function getCategoryPattern(category: string) {
  switch (category) {
    case 'dev':
      return CircuitPattern;
    case 'writing':
      return QuillPattern;
    case 'business':
      return GrowthPattern;
    case 'notion':
      return GrowthPattern;
    default:
      return CircuitPattern;
  }
}
