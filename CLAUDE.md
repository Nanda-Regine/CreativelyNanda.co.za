# CLAUDE.md - Project Learnings & Context

## Animation System

### Core Animation Wrappers (components/animations/)
The animation system uses Framer Motion throughout. All components are PWA-friendly with mobile fallbacks.

### Mobile/PWA Optimizations
All animation components include:
- `disableOnMobile` prop - Disable heavy effects on touch devices
- `respectReducedMotion` prop - Honor OS accessibility setting
- `mobileSpeed` / `mobileDuration` - Reduced animation intensity on mobile
- Gyroscope fallback for Card3DTilt on mobile devices
- Passive scroll listeners for better performance
- `willChange: 'auto'` when animations disabled to free GPU memory

### Device Detection Hooks (components/animations/hooks/)
```typescript
import {
  useDeviceDetect,      // Full device info object
  usePrefersReducedMotion, // Boolean for reduced motion
  useIsTouchDevice,     // Boolean for touch capability
  useIsPWA              // Boolean for standalone PWA mode
} from '@/components/animations';
```

### Component Quick Reference

| Component | Mobile Behavior | PWA Safe |
|-----------|----------------|----------|
| **PageLoadSequence** | Works, respects reduced motion | Yes |
| **ScrollTrigger** | Simpler animation on mobile | Yes |
| **ParallaxScroll** | Reduced speed or disabled | Yes |
| **StaggerChildren** | Works normally | Yes |
| **MagneticButton** | Disabled on touch (graceful) | Yes |
| **Card3DTilt** | Gyroscope fallback or disabled | Yes |

### Key Props for Mobile Control

```typescript
// MagneticButton
<MagneticButton
  disableOnMobile={true}        // Default: true
  respectReducedMotion={true}   // Default: true
/>

// Card3DTilt
<Card3DTilt
  disableOnMobile={false}       // Default: false
  useGyroscope={true}           // Default: true - uses device orientation
  gyroscopeSensitivity={0.5}    // Default: 0.5
  respectReducedMotion={true}   // Default: true
/>

// ParallaxScroll
<ParallaxScroll
  disableOnMobile={false}       // Default: false
  mobileSpeed={0.15}            // Optional: slower on mobile
  respectReducedMotion={true}   // Default: true
/>

// ScrollTrigger
<ScrollTrigger
  mobileAnimation="fade"        // Simpler animation on mobile
  mobileDuration={0.3}          // Faster on mobile
  respectReducedMotion={true}   // Default: true
/>
```

### Performance Considerations
- All animation components respect `prefers-reduced-motion`
- Use `once={true}` for scroll animations to prevent re-triggering
- Spring configs are tuned for smoothness without excessive CPU usage
- Parallax effects use passive scroll listeners
- Heavy effects (magnetic, 3D tilt) auto-disable on touch devices
- PWA standalone mode detected for potential optimizations

### Animation Timing Defaults
- Page load stagger: 0.1s between elements
- Scroll reveal duration: 0.6-0.8s (0.2-0.3s with reduced motion)
- Hover transitions: 0.2s
- Spring damping: 15-30 (lower = more bounce)
- Easing curve: [0.22, 1, 0.36, 1] (custom ease-out)

## Potential Issues

### What Could Break
1. **iOS 13+ gyroscope** - Requires user gesture to request permission
2. **Safari scroll** - May need `-webkit-overflow-scrolling: touch`
3. **PWA offline** - Animations work, but ensure assets are cached
4. **Low-end Android** - Consider `disableOnMobile={true}` for heavy effects

## Project Structure
- `/components/animations/` - All animation wrappers
- `/components/animations/hooks/` - Device detection hooks
- `/components/ui/` - Base UI components
- `/components/effects/` - Visual effects (grain, particles)

## Build Document Reference
Master specifications in: CLAUDERC_MASTER_BUILD_DOCUMENT.md
- Section 7: Animation System
- Section 8: Component Library
- Section 19: PWA Configuration
