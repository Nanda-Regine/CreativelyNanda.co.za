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

---

## PayFast Universal Hub

This site (`creativelynanda.co.za`) is the **single PayFast merchant hub** for all Mirembe Muse apps.

### Why
PayFast only allows one set of return/cancel/notify URLs per merchant account dashboard.
Six apps share one account: VarsityOS, AdminOS, Stokvelos, K53 Drill Master, WatchSankofa, Sankofa Sessions.

### URL Map
| URL | Purpose |
|-----|---------|
| `https://creativelynanda.co.za/api/payfast/universal-notify` | ITN webhook — set in PayFast dashboard |
| `https://creativelynanda.co.za/payfast/return` | Generic fallback return page (dashboard) |
| `https://creativelynanda.co.za/payfast/cancel` | Generic fallback cancel page (dashboard) |

### Per-Payment Override (how each app works)
Each app's `initiate` route passes its own `return_url`, `cancel_url`, and `notify_url` fields in the payment form. PayFast uses these **instead** of the dashboard defaults, so each app gets branded return/cancel pages:
```
return_url = https://creativelynanda.co.za/payfast/return?app=varsityos
cancel_url = https://creativelynanda.co.za/payfast/cancel?app=varsityos
notify_url = https://creativelynanda.co.za/api/payfast/universal-notify
```

### App Routing via m_payment_id
`m_payment_id` format: `{app}_{userId36}_{tier}_{timestamp}`
The `universal-notify` handler reads the prefix before the first `_` to identify the app, then routes to that app's Supabase.

### Env Vars (Vercel project: creativelynanda)
```
VARSITYOS_SUPABASE_URL / VARSITYOS_SUPABASE_SERVICE_ROLE_KEY / VARSITYOS_PAYFAST_PASSPHRASE
ADMINOS_SUPABASE_URL  / ADMINOS_SUPABASE_SERVICE_ROLE_KEY  / ADMINOS_PAYFAST_PASSPHRASE
STOKVELOS_SUPABASE_URL / STOKVELOS_SUPABASE_SERVICE_ROLE_KEY / STOKVELOS_PAYFAST_PASSPHRASE
K53_SUPABASE_URL / K53_SUPABASE_SERVICE_ROLE_KEY / K53_PAYFAST_PASSPHRASE
WATCHSANKOFA_SUPABASE_URL / WATCHSANKOFA_SUPABASE_SERVICE_ROLE_KEY / WATCHSANKOFA_PAYFAST_PASSPHRASE
SANKOFASESSIONS_SUPABASE_URL / SANKOFASESSIONS_SUPABASE_SERVICE_ROLE_KEY / SANKOFASESSIONS_PAYFAST_PASSPHRASE
PAYFAST_SANDBOX=true   # set to false in production
```

### Return/Cancel Page Modes
Both pages handle two modes automatically:
1. **`?app=varsityos`** — shows app branding + countdown redirect to that app's dashboard/upgrade URL
2. **No `?app=`** (PayFast dashboard fallback) — shows generic success/cancel + `window.history.back()` button

### Key Files
- `app/api/payfast/universal-notify/route.ts` — ITN router
- `app/payfast/return/page.tsx` — success page
- `app/payfast/cancel/page.tsx` — cancel page

### Adding a New App
1. Add a `case 'newapp':` block in `getAppConfig()` in `universal-notify/route.ts`
2. Add the app to `APP_CONFIGS` in both `return/page.tsx` and `cancel/page.tsx`
3. Add env vars to Vercel: `NEWAPP_SUPABASE_URL`, `NEWAPP_SUPABASE_SERVICE_ROLE_KEY`, `NEWAPP_PAYFAST_PASSPHRASE`
4. In the app's `initiate` route, set `m_payment_id = "newapp_{userId}_{plan}_{ts}"` and point URLs here
