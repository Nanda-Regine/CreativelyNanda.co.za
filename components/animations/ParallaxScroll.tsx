'use client';

import { useRef, ReactNode, CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from 'framer-motion';

const MotionImage = motion(Image);

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: [string, string];
  className?: string;
  style?: CSSProperties;
  smoothing?: number;
  scale?: { start: number; end: number };
  opacity?: { start: number; end: number };
  rotation?: { start: number; end: number };
  // Mobile/PWA options
  disableOnMobile?: boolean;
  mobileSpeed?: number; // Reduced speed for mobile
  respectReducedMotion?: boolean;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  direction = 'up',
  offset = ['start end', 'end start'],
  className = '',
  style,
  smoothing = 0.1,
  scale,
  opacity,
  rotation,
  disableOnMobile = false,
  mobileSpeed,
  respectReducedMotion = true,
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Use Framer Motion's built-in reduced motion hook
  const prefersReducedMotion = useReducedMotion();

  // Device detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if parallax should be disabled
  const shouldDisable = (respectReducedMotion && prefersReducedMotion) || (disableOnMobile && isMobile);

  // Calculate effective speed
  const effectiveSpeed = shouldDisable ? 0 : (isMobile && mobileSpeed !== undefined ? mobileSpeed : speed);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Calculate movement based on speed and direction
  const baseOffset = 100 * effectiveSpeed;

  const yValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [baseOffset, -baseOffset] :
    direction === 'down' ? [-baseOffset, baseOffset] : [0, 0]
  );

  const xValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [baseOffset, -baseOffset] :
    direction === 'right' ? [-baseOffset, baseOffset] : [0, 0]
  );

  // Apply spring smoothing (lighter on mobile for performance)
  const springConfig = isMobile
    ? { stiffness: 200, damping: 40, mass: smoothing * 0.5 }
    : { stiffness: 100, damping: 30, mass: smoothing };

  const smoothY = useSpring(yValue, springConfig);
  const smoothX = useSpring(xValue, springConfig);

  // Optional scale transform
  const scaleValue = scale
    ? useTransform(scrollYProgress, [0, 1], [scale.start, scale.end])
    : undefined;
  const smoothScale = scaleValue ? useSpring(scaleValue, springConfig) : undefined;

  // Optional opacity transform
  const opacityValue = opacity
    ? useTransform(scrollYProgress, [0, 0.5, 1], [opacity.start, 1, opacity.end])
    : undefined;

  // Optional rotation transform
  const rotateValue = rotation
    ? useTransform(scrollYProgress, [0, 1], [rotation.start, rotation.end])
    : undefined;
  const smoothRotate = rotateValue ? useSpring(rotateValue, springConfig) : undefined;

  // Return static element if fully disabled
  if (shouldDisable && !scale && !opacity) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y: effectiveSpeed > 0 ? smoothY : 0,
        x: effectiveSpeed > 0 ? smoothX : 0,
        scale: smoothScale,
        opacity: opacityValue,
        rotate: smoothRotate,
        willChange: effectiveSpeed > 0 ? 'transform' : 'auto',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax layer for creating depth effects
interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
  disableOnMobile?: boolean;
}

export function ParallaxLayer({
  children,
  depth = 0,
  className = '',
  disableOnMobile = true,
}: ParallaxLayerProps) {
  const speed = 0.3 + depth * 0.3;

  return (
    <ParallaxScroll
      speed={speed}
      direction={depth > 0 ? 'down' : 'up'}
      className={className}
      disableOnMobile={disableOnMobile}
      mobileSpeed={speed * 0.3} // Reduce on mobile
    >
      {children}
    </ParallaxScroll>
  );
}

// Hero parallax with scale and fade - mobile optimized
export function ParallaxHero({
  children,
  className = '',
  disableOnMobile = false,
}: {
  children: ReactNode;
  className?: string;
  disableOnMobile?: boolean;
}) {
  return (
    <ParallaxScroll
      speed={0.3}
      direction="up"
      scale={{ start: 1, end: 1.1 }}
      opacity={{ start: 1, end: 0.3 }}
      className={className}
      disableOnMobile={disableOnMobile}
      mobileSpeed={0.15}
    >
      {children}
    </ParallaxScroll>
  );
}

// Image parallax with reveal effect
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  disableOnMobile?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
  disableOnMobile = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const shouldDisable = prefersReducedMotion || (disableOnMobile && isMobile);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 30}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  if (shouldDisable) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <MotionImage
        src={src}
        alt={alt}
        fill
        style={{ y, scale }}
        className="object-cover"
      />
    </div>
  );
}

export default ParallaxScroll;
