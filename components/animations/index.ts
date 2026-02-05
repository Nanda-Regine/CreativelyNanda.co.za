// Basic animations
export { FadeIn } from './FadeIn';
export { SlideUp } from './SlideUp';
export { ScaleIn } from './ScaleIn';
export { TextReveal } from './TextReveal';
export { Counter } from './Counter';
export { Parallax } from './Parallax';
export { PageTransition } from './PageTransition';
export { ScrollReveal } from './ScrollReveal';
export { StaggerContainer } from './StaggerContainer';
export { StaggerItem } from './StaggerItem';

// Core animation wrappers
export {
  PageLoadSequence,
  PageLoadSequenceProvider,
  usePageLoadSequence,
  SequenceNavigation,
  SequenceHero,
  SequenceContent
} from './PageLoadSequence';

export {
  ScrollTrigger,
  useScrollTrigger
} from './ScrollTrigger';

export {
  ParallaxScroll,
  ParallaxLayer,
  ParallaxHero,
  ParallaxImage
} from './ParallaxScroll';

export {
  StaggerChildren,
  StaggerGrid,
  StaggerList,
  AnimatedList
} from './StaggerChildren';

export {
  MagneticButton,
  MagneticIcon,
  MagneticText,
  MagneticCard
} from './MagneticButton';

export {
  Card3DTilt,
  ProductCard3D,
  ImageCard3D,
  TextCard3D,
  Button3D
} from './Card3DTilt';

// Device detection hooks for PWA/mobile optimization
export {
  useDeviceDetect,
  usePrefersReducedMotion,
  useIsTouchDevice,
  useIsPWA
} from './hooks/useDeviceDetect';
