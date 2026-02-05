'use client';

import { useRef, useState, ReactNode, RefObject, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  scale?: number;
  as?: 'button' | 'a' | 'div';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
  // Mobile/PWA options
  disableOnMobile?: boolean;
  respectReducedMotion?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  springConfig = { stiffness: 150, damping: 15, mass: 0.1 },
  scale = 1.02,
  as = 'button',
  onClick,
  href,
  disabled = false,
  ariaLabel,
  disableOnMobile = true,
  respectReducedMotion = true,
}: MagneticButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Device detection state
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for touch device
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Determine if magnetic effect should be active
  const shouldDisableEffect =
    disabled ||
    (disableOnMobile && isTouchDevice) ||
    (respectReducedMotion && prefersReducedMotion);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Handle mouse movement with generic ref
  const handleMouseMove = (ref: RefObject<HTMLElement | null>) => (e: React.MouseEvent) => {
    if (!ref.current || shouldDisableEffect) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const magneticStrength = 1 - distance / radius;
      x.set(distanceX * strength * magneticStrength);
      y.set(distanceY * strength * magneticStrength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClassName = `${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  // Simplified props when effect is disabled
  const getMotionStyle = () => {
    if (shouldDisableEffect) return {};
    return { x: springX, y: springY };
  };

  const getHoverProps = () => {
    if (shouldDisableEffect || disabled) return {};
    return {
      whileHover: { scale },
      whileTap: { scale: 0.98 },
    };
  };

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        style={getMotionStyle()}
        onMouseMove={shouldDisableEffect ? undefined : handleMouseMove(anchorRef)}
        onMouseLeave={shouldDisableEffect ? undefined : handleMouseLeave}
        {...getHoverProps()}
        transition={{ type: 'spring' as const, ...springConfig }}
        className={baseClassName}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  if (as === 'div') {
    return (
      <motion.div
        ref={divRef}
        style={getMotionStyle()}
        onMouseMove={shouldDisableEffect ? undefined : handleMouseMove(divRef)}
        onMouseLeave={shouldDisableEffect ? undefined : handleMouseLeave}
        {...getHoverProps()}
        transition={{ type: 'spring' as const, ...springConfig }}
        className={baseClassName}
        aria-label={ariaLabel}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      style={getMotionStyle()}
      onMouseMove={shouldDisableEffect ? undefined : handleMouseMove(buttonRef)}
      onMouseLeave={shouldDisableEffect ? undefined : handleMouseLeave}
      {...getHoverProps()}
      transition={{ type: 'spring' as const, ...springConfig }}
      className={baseClassName}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </motion.button>
  );
}

// Magnetic icon variant for smaller interactive elements
interface MagneticIconProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disableOnMobile?: boolean;
}

export function MagneticIcon({
  children,
  className = '',
  strength = 0.5,
  onClick,
  disableOnMobile = true,
}: MagneticIconProps) {
  return (
    <MagneticButton
      strength={strength}
      radius={100}
      scale={1.1}
      as="div"
      onClick={onClick}
      className={`inline-flex items-center justify-center ${className}`}
      disableOnMobile={disableOnMobile}
    >
      {children}
    </MagneticButton>
  );
}

// Magnetic text for links
interface MagneticTextProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disableOnMobile?: boolean;
}

export function MagneticText({
  children,
  className = '',
  href,
  onClick,
  disableOnMobile = true,
}: MagneticTextProps) {
  return (
    <MagneticButton
      strength={0.2}
      radius={80}
      scale={1}
      as={href ? 'a' : 'div'}
      href={href}
      onClick={onClick}
      className={`inline-block ${className}`}
      springConfig={{ stiffness: 200, damping: 20, mass: 0.05 }}
      disableOnMobile={disableOnMobile}
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-current origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </MagneticButton>
  );
}

// Magnetic card for product cards and interactive panels
interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  disableOnMobile?: boolean;
}

export function MagneticCard({
  children,
  className = '',
  onClick,
  strength = 0.1,
  disableOnMobile = true,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [shouldDisable, setShouldDisable] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldDisable((disableOnMobile && isTouch) || reducedMotion);
  }, [disableOnMobile]);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldDisable) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={shouldDisable ? {} : { x: springX, y: springY }}
      onMouseMove={shouldDisable ? undefined : handleMouseMove}
      onMouseLeave={shouldDisable ? undefined : handleMouseLeave}
      onClick={onClick}
      whileHover={shouldDisable ? undefined : {
        y: -4,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
