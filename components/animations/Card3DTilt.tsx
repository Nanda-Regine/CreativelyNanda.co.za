'use client';

import { useRef, useState, ReactNode, CSSProperties, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  maxTiltX?: number;
  maxTiltY?: number;
  scale?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  glare?: boolean;
  glareOpacity?: number;
  shadow?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  // Mobile/PWA options
  disableOnMobile?: boolean;
  useGyroscope?: boolean; // Enable gyroscope on mobile
  gyroscopeSensitivity?: number;
  respectReducedMotion?: boolean;
}

export function Card3DTilt({
  children,
  className = '',
  perspective = 1000,
  maxTiltX = 10,
  maxTiltY = 10,
  scale = 1.02,
  springConfig = { stiffness: 300, damping: 30, mass: 0.5 },
  glare = true,
  glareOpacity = 0.2,
  shadow = true,
  style,
  onClick,
  disabled = false,
  disableOnMobile = false,
  useGyroscope = true,
  gyroscopeSensitivity = 0.5,
  respectReducedMotion = true,
}: Card3DTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Device state
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [gyroscopeAvailable, setGyroscopeAvailable] = useState(false);
  const [gyroscopePermission, setGyroscopePermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // Motion values for rotation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleValue = useMotionValue(1);

  // Glare position
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Apply spring physics
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scaleValue, springConfig);
  const springGlareX = useSpring(glareX, springConfig);
  const springGlareY = useSpring(glareY, springConfig);

  // Shadow transform based on tilt
  const shadowX = useTransform(springRotateY, [-maxTiltY, maxTiltY], [15, -15]);
  const shadowY = useTransform(springRotateX, [-maxTiltX, maxTiltX], [-15, 15]);
  const shadowBlur = useTransform(springScale, [1, scale], [10, 25]);

  // Device detection
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);

    // Check gyroscope availability
    setGyroscopeAvailable('DeviceOrientationEvent' in window);

    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Determine if effect should be disabled
  const shouldDisableEffect =
    disabled ||
    (respectReducedMotion && prefersReducedMotion) ||
    (disableOnMobile && isTouchDevice && !useGyroscope);

  // Request gyroscope permission (iOS 13+)
  const requestGyroscopePermission = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        setGyroscopePermission(permission);
        return permission === 'granted';
      } catch {
        setGyroscopePermission('denied');
        return false;
      }
    }
    // Non-iOS devices don't need permission
    setGyroscopePermission('granted');
    return true;
  }, []);

  // Gyroscope handler for mobile
  useEffect(() => {
    if (!useGyroscope || !isTouchDevice || !gyroscopeAvailable || shouldDisableEffect) return;
    if (gyroscopePermission !== 'granted') return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!ref.current) return;

      const { beta, gamma } = event;
      if (beta === null || gamma === null) return;

      // beta: front-back tilt (-180 to 180)
      // gamma: left-right tilt (-90 to 90)

      // Normalize and apply sensitivity
      const tiltX = Math.max(-maxTiltX, Math.min(maxTiltX, (beta - 45) * gyroscopeSensitivity));
      const tiltY = Math.max(-maxTiltY, Math.min(maxTiltY, gamma * gyroscopeSensitivity));

      rotateX.set(-tiltX);
      rotateY.set(tiltY);

      // Update glare based on tilt
      const normalizedX = (tiltY + maxTiltY) / (maxTiltY * 2) * 100;
      const normalizedY = (tiltX + maxTiltX) / (maxTiltX * 2) * 100;
      glareX.set(normalizedX);
      glareY.set(normalizedY);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [useGyroscope, isTouchDevice, gyroscopeAvailable, gyroscopePermission, shouldDisableEffect, maxTiltX, maxTiltY, gyroscopeSensitivity, rotateX, rotateY, glareX, glareY]);

  // Mouse handlers for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldDisableEffect || isTouchDevice) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPos = (e.clientX - rect.left) / width;
    const yPos = (e.clientY - rect.top) / height;

    const tiltX = (0.5 - yPos) * maxTiltX * 2;
    const tiltY = (xPos - 0.5) * maxTiltY * 2;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    glareX.set(xPos * 100);
    glareY.set(yPos * 100);
  };

  const handleMouseEnter = () => {
    if (!shouldDisableEffect && !isTouchDevice) {
      setIsHovered(true);
      scaleValue.set(scale);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isTouchDevice) {
      rotateX.set(0);
      rotateY.set(0);
      scaleValue.set(1);
      glareX.set(50);
      glareY.set(50);
    }
  };

  // Touch handler to request gyroscope permission
  const handleTouchStart = async () => {
    if (useGyroscope && gyroscopePermission === 'prompt') {
      await requestGyroscopePermission();
    }
    setIsHovered(true);
    scaleValue.set(scale);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!useGyroscope) {
      rotateX.set(0);
      rotateY.set(0);
      scaleValue.set(1);
    }
  };

  // Render simple version if disabled
  if (shouldDisableEffect && !(useGyroscope && isTouchDevice)) {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${disabled ? 'cursor-default' : 'cursor-pointer'} ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative ${disabled ? 'cursor-default' : 'cursor-pointer'} ${className}`}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glare && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(
                circle at ${springGlareX.get()}% ${springGlareY.get()}%,
                rgba(255, 255, 255, ${glareOpacity}),
                transparent 50%
              )`,
              borderRadius: 'inherit',
            }}
          />
        )}

        {/* Dynamic shadow */}
        {shadow && (
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              x: shadowX,
              y: shadowY,
              filter: `blur(${shadowBlur}px)`,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              borderRadius: 'inherit',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Preset for product cards - mobile optimized
export function ProductCard3D({
  children,
  className = '',
  onClick,
  disableOnMobile = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disableOnMobile?: boolean;
}) {
  return (
    <Card3DTilt
      maxTiltX={8}
      maxTiltY={8}
      scale={1.03}
      glare
      glareOpacity={0.15}
      shadow
      onClick={onClick}
      className={`rounded-xl ${className}`}
      disableOnMobile={disableOnMobile}
      useGyroscope={!disableOnMobile}
      gyroscopeSensitivity={0.3}
    >
      {children}
    </Card3DTilt>
  );
}

// Preset for image cards with stronger effect
export function ImageCard3D({
  src,
  alt,
  className = '',
  onClick,
  disableOnMobile = false,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  disableOnMobile?: boolean;
}) {
  return (
    <Card3DTilt
      maxTiltX={15}
      maxTiltY={15}
      scale={1.05}
      glare
      glareOpacity={0.25}
      shadow
      onClick={onClick}
      className={`rounded-lg overflow-hidden ${className}`}
      disableOnMobile={disableOnMobile}
      useGyroscope={!disableOnMobile}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </Card3DTilt>
  );
}

// Subtle preset for text cards - always mobile friendly
export function TextCard3D({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card3DTilt
      maxTiltX={5}
      maxTiltY={5}
      scale={1.01}
      glare={false}
      shadow
      className={`rounded-lg ${className}`}
      disableOnMobile={true}
      useGyroscope={false}
    >
      {children}
    </Card3DTilt>
  );
}

// Interactive button with 3D effect
export function Button3D({
  children,
  className = '',
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Card3DTilt
      maxTiltX={12}
      maxTiltY={12}
      scale={1.05}
      glare
      glareOpacity={0.3}
      shadow
      onClick={onClick}
      disabled={disabled}
      springConfig={{ stiffness: 400, damping: 25, mass: 0.3 }}
      className={`inline-block ${className}`}
      disableOnMobile={true}
    >
      {children}
    </Card3DTilt>
  );
}

export default Card3DTilt;
