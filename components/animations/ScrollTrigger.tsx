'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants, useReducedMotion } from 'framer-motion';

type Controls = ReturnType<typeof useAnimation>;

interface ScrollTriggerProps {
  children: ReactNode | ((controls: Controls, inView: boolean, progress: number) => ReactNode);
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
  customVariants?: Variants;
  duration?: number;
  delay?: number;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  triggerOnce?: boolean;
  trackProgress?: boolean;
  // Mobile/PWA options
  respectReducedMotion?: boolean;
  mobileAnimation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  mobileDuration?: number;
}

const defaultVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

// Reduced motion variants (instant, no movement)
const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function ScrollTrigger({
  children,
  threshold = 0.1,
  rootMargin = '-50px',
  once = true,
  animation = 'slideUp',
  customVariants,
  duration = 0.6,
  delay = 0,
  className = '',
  onEnter,
  onLeave,
  triggerOnce = true,
  trackProgress = false,
  respectReducedMotion = true,
  mobileAnimation,
  mobileDuration,
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check for mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const isInView = useInView(ref, {
    once: triggerOnce,
    margin: rootMargin as `${number}px` | `${number}%` | `${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`,
    amount: threshold,
  });

  // Determine effective animation based on device/preferences
  const shouldUseReducedMotion = respectReducedMotion && prefersReducedMotion;
  const effectiveAnimation = shouldUseReducedMotion
    ? 'fade'
    : isMobile && mobileAnimation
    ? mobileAnimation
    : animation;
  const effectiveDuration = shouldUseReducedMotion
    ? 0.2
    : isMobile && mobileDuration !== undefined
    ? mobileDuration
    : duration;

  // Handle scroll progress tracking
  useEffect(() => {
    if (!trackProgress || !ref.current) return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters bottom, 1 when it exits top
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Progress calculation
      const startPoint = windowHeight;
      const endPoint = -elementHeight;
      const currentProgress = 1 - (elementTop - endPoint) / (startPoint - endPoint);

      setProgress(Math.max(0, Math.min(1, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackProgress]);

  // Trigger animations based on view state
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      onEnter?.();
    } else if (!once) {
      controls.start('hidden');
      onLeave?.();
    }
  }, [isInView, controls, once, onEnter, onLeave]);

  // Select variants based on conditions
  const variants = shouldUseReducedMotion
    ? reducedMotionVariants
    : effectiveAnimation === 'custom'
    ? customVariants
    : effectiveAnimation === 'none'
    ? { hidden: {}, visible: {} }
    : defaultVariants[effectiveAnimation];

  // Handle render prop pattern for advanced usage
  if (typeof children === 'function') {
    return (
      <div ref={ref} className={className}>
        {children(controls, isInView, progress)}
      </div>
    );
  }

  // If animation is 'none', render without motion wrapper
  if (effectiveAnimation === 'none') {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration: effectiveDuration,
        delay: shouldUseReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hook for manual scroll trigger control
export function useScrollTrigger(options: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const { threshold = 0.1, rootMargin = '-50px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsTriggered(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const startPoint = windowHeight;
      const endPoint = -elementHeight;
      const currentProgress = 1 - (elementTop - endPoint) / (startPoint - endPoint);

      setProgress(Math.max(0, Math.min(1, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isTriggered, progress };
}

export default ScrollTrigger;
