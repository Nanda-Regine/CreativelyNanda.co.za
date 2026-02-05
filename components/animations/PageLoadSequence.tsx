'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface PageLoadSequenceContextType {
  isLoaded: boolean;
  registerStep: (element: string) => number;
  getDelay: (element: string) => number;
}

const PageLoadSequenceContext = createContext<PageLoadSequenceContextType>({
  isLoaded: false,
  registerStep: () => 0,
  getDelay: () => 0,
});

export const usePageLoadSequence = () => useContext(PageLoadSequenceContext);

interface PageLoadSequenceProviderProps {
  children: ReactNode;
  baseDelay?: number;
  staggerDelay?: number;
}

// Provider to coordinate page load animations
export function PageLoadSequenceProvider({
  children,
  baseDelay = 0,
  staggerDelay = 0.1,
}: PageLoadSequenceProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [steps] = useState<Map<string, number>>(new Map());
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const registerStep = (element: string): number => {
    if (!steps.has(element)) {
      steps.set(element, stepCount);
      setStepCount((prev) => prev + 1);
    }
    return steps.get(element) || 0;
  };

  const getDelay = (element: string): number => {
    const order = steps.get(element) || 0;
    return baseDelay + order * staggerDelay;
  };

  return (
    <PageLoadSequenceContext.Provider value={{ isLoaded, registerStep, getDelay }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </PageLoadSequenceContext.Provider>
  );
}

type AnimationType = 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'staggerUp';

interface PageLoadSequenceProps {
  children: ReactNode;
  step?: number;
  delay?: number;
  duration?: number;
  animation?: AnimationType;
  className?: string;
}

const animations: Record<AnimationType, { initial: { opacity: number; y?: number; x?: number; scale?: number }; animate: { opacity: number; y?: number; x?: number; scale?: number } }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  staggerUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
};

// Component to wrap elements in page load sequence
export function PageLoadSequence({
  children,
  step = 0,
  delay,
  duration = 0.5,
  animation = 'slideUp',
  className = '',
}: PageLoadSequenceProps) {
  const { isLoaded } = usePageLoadSequence();
  const calculatedDelay = delay ?? step * 0.1;

  const animConfig = animations[animation];

  return (
    <motion.div
      initial={animConfig.initial}
      animate={isLoaded ? animConfig.animate : animConfig.initial}
      transition={{
        duration,
        delay: calculatedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Predefined sequence items for common page elements
export function SequenceNavigation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <PageLoadSequence step={0} delay={0} animation="fade" duration={0.3} className={className}>
      {children}
    </PageLoadSequence>
  );
}

export function SequenceHero({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <PageLoadSequence step={1} delay={0.2} animation="staggerUp" duration={0.6} className={className}>
      {children}
    </PageLoadSequence>
  );
}

export function SequenceContent({ children, className = '', step = 2 }: { children: ReactNode; className?: string; step?: number }) {
  return (
    <PageLoadSequence step={step} delay={0.4 + (step - 2) * 0.1} animation="slideUp" duration={0.5} className={className}>
      {children}
    </PageLoadSequence>
  );
}

export default PageLoadSequence;
