'use client';

import { motion } from 'framer-motion';

// Student pattern - books, graduation caps, stars
export function StudentPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="student-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* Book */}
          <path
            d="M10 35 L10 15 L25 15 L25 35 Z M10 25 L25 25"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          {/* Star */}
          <path
            d="M40 10 L41.5 15 L46.5 15 L42.5 18 L44 23 L40 20 L36 23 L37.5 18 L33.5 15 L38.5 15 Z"
            fill="currentColor"
            opacity="0.2"
          />
          {/* Graduation cap */}
          <path
            d="M35 40 L45 35 L35 30 L25 35 Z M35 35 L35 42"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#student-pattern)" />
    </svg>
  );
}

// Business pattern - charts, arrows, diamonds
export function BusinessPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="business-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Chart bars */}
          <rect x="10" y="35" width="8" height="15" fill="currentColor" opacity="0.2" rx="2" />
          <rect x="22" y="25" width="8" height="25" fill="currentColor" opacity="0.25" rx="2" />
          <rect x="34" y="15" width="8" height="35" fill="currentColor" opacity="0.2" rx="2" />
          {/* Arrow up */}
          <path
            d="M52 45 L52 20 M45 27 L52 20 L59 27"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
            strokeLinecap="round"
          />
          {/* Diamond */}
          <path
            d="M30 5 L35 10 L30 15 L25 10 Z"
            fill="currentColor"
            opacity="0.15"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#business-pattern)" />
    </svg>
  );
}

// Creative pattern - brush strokes, flowers, spirals
export function CreativePattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="creative-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* Flower petals */}
          <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.3" />
          <ellipse cx="25" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.2" />
          <ellipse cx="32" cy="25" rx="5" ry="3" fill="currentColor" opacity="0.2" />
          <ellipse cx="25" cy="32" rx="3" ry="5" fill="currentColor" opacity="0.2" />
          <ellipse cx="18" cy="25" rx="5" ry="3" fill="currentColor" opacity="0.2" />
          {/* Brush stroke */}
          <path
            d="M5 45 Q15 35 10 40 Q20 30 15 35 Q25 25 20 30"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.25"
            fill="none"
            strokeLinecap="round"
          />
          {/* Sparkle */}
          <path
            d="M42 8 L44 12 L48 10 L44 12 L46 16 L44 12 L40 14 L44 12 Z"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#creative-pattern)" />
    </svg>
  );
}

// Wellness pattern - hearts, waves, lotus
export function WellnessPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="wellness-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* Heart */}
          <path
            d="M25 35 C15 25 15 15 25 20 C35 15 35 25 25 35"
            fill="currentColor"
            opacity="0.2"
          />
          {/* Wave */}
          <path
            d="M5 45 Q12 40 20 45 Q28 50 35 45 Q42 40 50 45"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.25"
            fill="none"
          />
          {/* Lotus petal */}
          <path
            d="M40 15 Q45 10 50 15 Q45 20 40 15"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M35 20 Q40 15 45 20 Q40 25 35 20"
            fill="currentColor"
            opacity="0.15"
          />
          {/* Dot */}
          <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wellness-pattern)" />
    </svg>
  );
}

// Get pattern component by category
export function getShopPattern(category: string) {
  const patterns: Record<string, React.ComponentType<{ className?: string }>> = {
    student: StudentPattern,
    business: BusinessPattern,
    creative: CreativePattern,
    wellness: WellnessPattern,
  };
  return patterns[category.toLowerCase()] || BusinessPattern;
}

// Animated floating shapes for hero sections
export function FloatingShapes({ theme }: { theme: string }) {
  const colors: Record<string, string[]> = {
    student: ['bg-amber-400', 'bg-orange-400', 'bg-red-400'],
    business: ['bg-emerald-400', 'bg-teal-400', 'bg-cyan-400'],
    creative: ['bg-pink-400', 'bg-rose-400', 'bg-purple-400'],
    wellness: ['bg-violet-400', 'bg-indigo-400', 'bg-blue-400'],
  };

  const shapeColors = colors[theme.toLowerCase()] || colors.business;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Shape 1 */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-32 h-32 ${shapeColors[0]} rounded-full opacity-20 blur-2xl`}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Shape 2 */}
      <motion.div
        className={`absolute top-1/2 right-1/4 w-48 h-48 ${shapeColors[1]} rounded-full opacity-15 blur-3xl`}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Shape 3 */}
      <motion.div
        className={`absolute bottom-1/4 left-1/3 w-40 h-40 ${shapeColors[2]} rounded-full opacity-20 blur-2xl`}
        animate={{
          x: [0, 20, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
