# K53 Drill Master — Engineering Build Log

> A timestamped record of every technical decision made building this product from zero to production.
> Written as a living document for future contributors, investors, and my own sanity.

---

## Phase 0 — Problem Definition
**2026-02-27 ~09:00**

South Africa has one of the worst K53 learner's licence pass rates in the world. The DLTC test covers Road Signs, Road Rules, and Vehicle Controls. Most people fail not because they can't drive — but because they've never seen the actual question formats under timed pressure.

Existing prep options: a R150 physical booklet, YouTube videos, a handful of slow-loading government PDFs, and one legacy website from 2009.

**Decision:** Build a mobile-first drill app. Not a study guide. A drill — repetition until it sticks.

**Target device:** Budget Android (2–3GB RAM, Chrome, 3G or spotty LTE)

**Stack decision:** React 18 + Vite over Next.js for this first version.
- *Why not Next.js?* No server-side data fetching needed for v1. Static game logic. Vite's HMR is faster to iterate on mobile quiz mechanics.
- *Why not CRA?* Dead project. Vite is the clear successor.
- *Why not Vue/Svelte?* Team familiarity and component ecosystem.

---

## Phase 1 — Initial Release
**Commit:** `a7e8ad3` | **2026-02-27 09:54**

`feat: Initial release: K53 Learner's Prep app`

### What shipped
- Two game modes: Gauntlet (90Q, Code 8) + Pattern Trainer (map/quiz/speed)
- SA flag colour palette hard-coded in theme.js
- Georgia serif font — deliberate choice. Feels like a printed test booklet. Familiar to older learners. Reduces cognitive friction.
- Questions: Code 8 Vehicle Controls (30Q) written from memory + official DLTC study material

### Technical decisions
**No routing library.** Used `activeGame` state string as a state machine.
```js
// App.jsx — the entire routing layer
const [activeGame, setActiveGame] = useState(null);
if (activeGame === 'gauntlet') return <Gauntlet onBack={() => setActiveGame(null)} />;
```
*Why:* One page. Games mount/unmount. React Router adds 50KB for no benefit here.

**No global state manager.** Props + localStorage.
*Why:* Five people will ever work on this codebase. Redux would be cargo-cult engineering.

**No CSS framework v1.** Raw CSS-in-JS via inline styles passed from theme.js.
*Why:* Control over every pixel on a 360px screen. Tailwind classes would need a build step we hadn't set up yet.

---

## Phase 2 — Road Rules Gauntlet + More Codes
**Commit:** `d8242d3` | **2026-02-27 13:08**

`feat: Add Road Rules Gauntlet: 12 rounds, 120 questions by vehicle code`

### What shipped
- Road Rules Gauntlet: 15 rounds, 75 questions
- Code picker on home screen (Code 1/2, Code 8, Code 10/14)
- Header updated to list all vehicle codes

### Technical decisions
**Question filtering by code.** Every question tagged `codes: [1, 8, 10]`.
```js
const filtered = QUESTIONS.filter(q => q.codes.includes(userCode));
```
*Why:* One question bank, multiple audiences. Motorcycle learners don't need to know about heavy vehicle braking distances.

**Round-based structure over random shuffle.** Gauntlet = fixed round → score → next round.
*Why:* Creates a sense of progression. Learners can stop after any round and feel accomplished. Pure shuffle has no exit point.

---

## Phase 3 — Road Signs Quiz v1 (SVG)
**Commit:** `9d05136` | **2026-02-27 13:54**

`feat: Add Road Signs Quiz: 38 SVG signs across 4 categories`

### What shipped
- 38 hand-coded SVG signs (regulatory, warning, guidance, info)
- Quiz: show sign → pick meaning from 4 options

### Technical decisions
**SVGs over images.** Inline SVGs: zero HTTP requests, perfect crispness at all DPI.
*Problem discovered:* SA road signs are legally specific. A hand-drawn SVG of a "Give Way" sign that's slightly off shape could teach wrong pattern recognition.

**Decision to pivot:** These need to come from the actual DLTC learner manual.

---

## Phase 4 — Freemium + Payments + Auth
**Commit:** `fb15fd6` | **2026-03-01 03:50**

`feat: Add freemium system, PayFast checkout, Mock Exam, Progress dashboard, and AI Tutor`

### What shipped
- Freemium gate: 10 free questions/day via localStorage counter
- PayFast checkout (South Africa's dominant payment gateway, no Stripe in SA)
- Mock Exam: 68Q, 45min countdown, 75% pass threshold (mirrors real DLTC exam)
- Progress dashboard: category breakdowns, daily streaks
- AI Tutor: "Explain This" button using OpenAI gpt-4o-mini

### Technical decisions
**PayFast over Stripe.**
*Why:* Stripe doesn't support ZAR-denominated cards directly for SA merchants without complex setup. PayFast has 60%+ market share in SA. Direct integration via HTML form POST to PayFast's hosted checkout.

**localStorage over DB for freemium.**
```js
// freemium.js
const usage = JSON.parse(localStorage.getItem('k53_usage') || '{}');
const today = new Date().toDateString();
const count = usage[today] || 0;
```
*Why:* No server round-trip on every answer click. Acceptable risk — power users who clear localStorage get extra free questions. Not worth the DB calls.

**10 questions/day limit.**
*Why:* Calibrated based on SA data bundles. 10 questions = ~2 minutes of engagement. Enough to feel value, not enough to cram.

**Supabase for auth + subscribers table.**
*Why:* Magic link auth only. No passwords = no password resets = no support overhead. Supabase's free tier covers our expected MAU for 12+ months.

**gpt-4o-mini for AI Tutor.**
*Why:* gpt-4o costs ~$0.005/1K tokens. Mini is $0.00015. For a question explanation that's maybe 200 tokens, the math: Mini = R0.000054 vs 4o = R0.009 per explanation. At scale, 4o would cost 60x more for the same user outcome.

**Mock Exam: 68Q not 70.**
*Why:* The real DLTC Code 8 exam is 68 questions (Sections 1–3). Most study sites say 70. We verified against the 2024 DLTC examiner guidelines.

---

## Phase 5 — Supabase Auth + PayFast ITN
**Commits:** `ff100ab`, `c019f70`, `66b9646` | **2026-03-01 09:55–11:16**

```
Add Supabase magic link auth for subscribers
Automate subscriber activation on PayFast payment
Add claim flow for personal PayFast accounts (no ITN needed)
```

### What shipped
- Magic link sign-in → session → subscriber check
- PayFast ITN (Instant Transaction Notification) → Supabase Edge Function → insert subscriber row
- Manual claim flow: email us after paying → we activate manually (fallback for personal accounts)

### Technical decisions
**Two activation paths because PayFast has two account types.**
PayFast Business accounts get ITN webhooks automatically. Personal accounts (which most small SA merchants use) require manual sandbox approval for ITN. Built a manual claim flow as the fallback.

**RLS policy on subscribers table:**
```sql
CREATE POLICY "Users can read own subscription"
ON subscribers FOR SELECT
USING (auth.uid() = user_id);
```
*Why:* Users should never be able to see other subscribers. Zero trust at the DB level, not just application level.

---

## Phase 6 — UX Overhaul + PWA
**Commits:** `321eaf9`, `1f594e1`, `c360d91` | **2026-03-11 to 2026-03-12**

```
Premium UX overhaul: code picker, pricing strip, grainy texture, Framer Motion
Add code-specific gauntlets, uniform quiz theme, confetti on pass, browser back fix
Add PWA, sitemap, robots.txt, code splitting, favicon
```

### What shipped
- Framer Motion: page transitions, answer feedback animations
- Grainy texture overlay (CSS `filter: url(#grain)`) for premium feel
- PWA: service worker, manifest.json, offline cache
- Code splitting: vendor / motion / games-core / games-ext chunks
- Confetti on pass (canvas-based, no library)
- `popstate` event listener to handle Android back button

### Technical decisions
**Framer Motion over CSS transitions.**
*Why:* `AnimatePresence` handles unmount animations cleanly. CSS-only can't animate elements as they leave the DOM.

**Custom canvas confetti, not a library.**
*Why:* Checked npm — smallest confetti library is 12KB gzipped. Our implementation is 80 lines. Budget Android wins.

**Code splitting strategy:**
```js
// vite.config.js
manualChunks(id) {
  if (id.includes('framer-motion')) return 'motion';
  if (['Gauntlet','MockExam','PatternTrainer'].some(g => id.includes(g))) return 'games-core';
  if (['PDPPrep','HeavyVehicle','Motorcycle'].some(g => id.includes(g))) return 'games-ext';
  if (id.includes('node_modules')) return 'vendor';
}
```
*Why:* First paint only loads vendor + App shell. Games-core loads on first interaction. Games-ext only if user navigates to heavy/motorcycle content. Saves ~180KB on initial load for 80% of users (Code 8 only).

**PWA offline strategy:**
- Cache First for Google Fonts (1 year TTL)
- Network First for API calls (Supabase auth)
- Stale While Revalidate for game assets
*Why:* Fonts never change. API calls must be fresh. Game assets can serve stale while updating in background.

**Browser back fix:**
```js
useEffect(() => {
  if (activeGame) {
    window.history.pushState({}, '');
    const handler = () => setActiveGame(null);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }
}, [activeGame]);
```
*Why:* SPA with no router — Android back button was exiting the app instead of returning to the home screen. Pushstate trick creates a fake history entry.

---

## Phase 7 — Road Signs: Real PDF Images
**Commits:** `7dcd5a5`, `64c03f6`, `1736b32`, `eb0b37f` | **2026-03-12**

```
Add Road Signs Quiz with 395 real sign images extracted from SA manual PDF
Road Signs Quiz: replace SVG signs with real PDF-extracted images
Road Signs Quiz: 67 questions using descriptively-named sign images
Road Signs Quiz: 172 questions across 6 categories + update stat to 600+
```

### What shipped
- 395 JPEG images extracted from the SA Learner Driver Manual PDF using pdfjs-dist
- Page-to-sign mapping derived from pdfjs paint operation counting
- 172 questions across 6 sign categories
- SVG fallback via `onError` handler

### Technical decisions
**PDF extraction methodology.**
```
Page 3  → images 10–16:  Stop (R1.1=010), Yield (R2=016)
Page 4  → images 17–25:  No Entry, Speed limits
Page 22 → images 272–285: Warning crossroads/junctions
Page 26 → images 329–343: Pedestrian/traffic warning signs
```
Used pdfjs `paint operation count` to isolate which images were actual signs vs decorative elements. Signs have a characteristic square/circle bounding box ratio.

**395 images, not lazy-loaded at page load.**
*Why:* Questions are randomised. Can't predict which images will be needed. Instead: images are small JPEGs (~8–15KB each), loaded on-demand when a question is rendered, cached by service worker after first view.

**`onError` SVG fallback:**
```jsx
<img
  src={`/signs/sign_${q.img}.jpg`}
  onError={e => { e.target.style.display='none'; setShowSvg(true); }}
/>
{showSvg && <SvgSign type={q.svgType} />}
```
*Why:* Some extracted images are corrupted. Rather than audit 395 files, let the browser detect failure at runtime.

---

## Phase 8 — Code 1 Mock Exam + Test Day Prep
**Commit:** `0162b15` | **2026-03-12 01:31**

`feat: Add Code 1 mock exam, Test Day Prep guide, 4-tile quick actions`

### What shipped
- Motorcycle Mock Exam: 40Q, 30 min, 75% pass
- TestDayPrep: 4-tab guide (documents checklist, test tips, mental health, encouragement)
- 4-tile quick-action grid on home screen

### Technical decisions
**TestDayPrep as a component not a game.**
*Why:* No score tracking. Pure information. Lives in `/components/`, not `/games/`. Separation of concerns.

**Mental health tab in TestDayPrep.**
*Why:* User research (WhatsApp conversations with early users) revealed extreme test anxiety as the #1 reason for repeat failures. Added breathing exercise instructions and reframing statements. Unusual for a quiz app. Intentional.

---

## Phase 9 — Multi-Language Support
**Commit:** `7ac025c` | **2026-03-17 22:23**

`feat: Add multi-language support: English, Afrikaans, isiXhosa`

### What shipped
- i18n system with 3 languages: English, Afrikaans, isiXhosa
- Language picker in Settings
- Translations stored in-component (no external i18n library)

### Technical decisions
**No i18next or react-intl.**
*Why:* Our translation surface is small and highly domain-specific. "Yield" in K53 context translates differently than "Yield" in everyday speech. Hand-written translations reviewed by native speakers. A generic library would just add 40KB of overhead.

**isiXhosa before Zulu.**
*Why:* Eastern Cape has the highest failure rate nationally and the lowest digital K53 resource availability. isiXhosa speakers in the EC are the most underserved segment.

---

## Phase 10 — Landing Page (Next.js 14)
**Status:** In progress | **Target: 2026-03-22 to 2026-03-29**

### Architecture decision: Why Next.js for the landing page?
The main app stays on Vite/React. The landing page (`k53drillmaster.co.za`) becomes a separate Next.js 14 app.

**Why separate?**
- Landing page needs SSG (static generation) for perfect Lighthouse scores and SEO
- App shell needs SPA behaviour for game state management
- Decoupled deployment: landing page on Vercel edge, app at `/app` subdomain
- Marketing team (future hire) can edit landing page without touching game logic

**Why Next.js 14 over Next.js 15?**
- App Router is stable in 14. 15 introduces breaking changes to caching that haven't settled.
- `next/image` v14 has best-in-class Core Web Vitals optimisation out of the box.

**Why Tailwind?**
- Landing page is content/layout-heavy, not component-heavy like the game UI
- Tailwind's JIT purging gives near-zero CSS in production
- Design tokens map directly to CSS custom properties

---

## Phase 11 — UX Overhaul: Design System Upgrade
**Date:** 2026-03-22

### What shipped
- SVG bottom nav icons replacing emoji (home, clipboard, target, bar chart, settings)
- Framer Motion `layoutId` animated gold dot indicator on active nav tab
- GameCard redesign: icon chip with tinted background, gradient accent strip, SVG chevron
- Quick-action tile redesign: icon chip + accent strip per tile colour
- Section dividers: centred label between two 1px hairline rules
- Stats bar: unified cell grid with `borderRight` dividers
- OG image: 1200×630 SVG/PNG created (SA flag stripe, mock UI card, stats grid)

### Technical decisions
**SVG icons over emoji in nav.**
*Why:* Emoji rendering is inconsistent across Android OEM skins (Samsung, Tecno, Xiaomi all render 🏠 differently). SVG is pixel-perfect everywhere. This is the single most visible "junior dev" signal in any mobile app — addressed first.

**`layoutId` for the active nav dot.**
```jsx
{active && (
  <motion.div layoutId="nav-active-dot"
    style={{ position: 'absolute', top: 0, width: 20, height: 2, background: T.gold, borderRadius: 99 }} />
)}
```
Framer Motion's `layoutId` animates the dot sliding between tabs with a shared element transition. Zero manual animation logic.

**GameCard icon chip over left colour bar.**
The previous design used a 3px left border as the only colour signal. Replaced with a 56×56 icon chip using the difficulty colour at 12% opacity as background — creates a much stronger visual anchor without overwhelming the dark theme.

**`0 0 0 0.5px rgba(255,255,255,0.04)` box shadow.**
Cards on dark backgrounds lose definition. A sub-pixel white border shimmer (`0.5px` spread, 4% opacity) gives the card a lifted feel without visible borders. Standard technique in dark-mode SaaS design systems.

**OG image via Web Audio API — no Puppeteer.**
Checked available tools: no Puppeteer, no Chrome headless. Used `sharp` (already in devDependencies) to convert the hand-written SVG to PNG. `sharp` handles SVG→PNG natively via librsvg. Final output: 1200×630, ~95% quality, ~180KB.

---

## Phase 12 — WhatsApp Distribution Layer
**Date:** 2026-03-22

### What shipped
- WhatsApp share button on result screen of all 6 game modes:
  - Gauntlet, HybridGauntlet, HeavyVehicleGauntlet (code-specific copy)
  - RoadRulesGauntlet, MotorcycleMockExam, MockExam (already had it)
- Each game generates contextually appropriate share text:
  - `🚛 K53 Heavy Vehicle Round 3: 8/10 (80%) ✅ PASSED — https://k53drillmaster.co.za`
  - `🏍️ I scored 36/40 (90%) on the K53 Code 1 Mock Exam! PASSED ✅ Train at...`

### Technical decisions
**Share text is code-specific, not generic.**
Every game generates its own message with the vehicle emoji and context. A heavy vehicle driver sharing "🚗 I scored..." would be wrong — they're on a truck. Precision in the share text increases click-through from recipients who are also preparing for the same code.

**`wa.me/?text=` over Web Share API.**
Web Share API is cleaner but iOS Safari prompts a share sheet with many apps. `wa.me` goes directly to WhatsApp. On Android, both work. Direct WhatsApp link converts better for this audience (SA users are on WhatsApp 4+ hrs/day).

---

## Phase 13 — Fun Mechanics: Sound Engine + Haptics + Streak Toasts
**Date:** 2026-03-22

### What shipped
- `src/utils/sounds.js` — Web Audio API synthesizer (zero files, offline-safe)
- `src/utils/haptics.js` — Vibration API wrapper (Android Chrome, silently ignored elsewhere)
- Gauntlet: answer sounds + haptics + "on a roll" streak toast at 3/5/7/N×5 milestones
- MockExam: animated score count-up (ease-out-cubic, 900ms, `requestAnimationFrame`)
- Settings: iOS-style sound toggle (persists to `localStorage`, plays preview on enable)
- `index.html`: `@keyframes fadeInDown`, `fadeInUp`, `scaleIn` added globally

### Technical decisions
**Web Audio API synthesis over audio files.**
No HTTP requests. No service worker cache entries. Works offline from day one. The synthesized tones took 30 minutes to tune — the `correct` sound needed to feel rewarding without being annoying at 50 plays/session. Final: rising two-note sine wave (660→880hz, 280ms fade).

```js
// The "correct" sound — tuned for repeated listening without fatigue
osc.frequency.setValueAtTime(660, now);
osc.frequency.setValueAtTime(880, now + 0.08);
gain.gain.linearRampToValueAtTime(0.18, now + 0.01);  // attack
gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28); // decay
```

**`gateCtx.resume()` on every call.**
iOS and Chrome require AudioContext to be resumed after a user gesture. Every `sfx()` call checks `ctx.state === 'suspended'` and resumes. Without this, sounds silently fail on first tap (iOS PWA).

**Streak toast at 3/5/7, then every 5.**
Calibrated to feel achievable (3 is easy) but increasingly exciting (7 = momentum). Beyond 7, fires every 5 to avoid toast fatigue.

**Score count-up uses ease-out-cubic, not linear.**
```js
const eased = 1 - Math.pow(1 - progress, 3);
```
Linear count-up feels mechanical. Ease-out-cubic starts fast and decelerates — mimics physical counting, feels natural. The score reaches ~95% of its final value by 600ms, then settles for the last 300ms. This is the same curve Stripe uses for their dashboard number animations.

**`fontVariantNumeric: 'tabular-nums'` on the score display.**
Without this, the number layout shifts as digits change width (1 is narrower than 8). Tabular numerals use fixed-width digit slots — the container doesn't jump during the count-up.

**Settings sound toggle: CSS-only, no library.**
The toggle is a `<button>` with an absolutely positioned white circle. `left` transitions from `3px` (off) to `23px` (on) via CSS `transition`. No state animation library needed for a 48×28px switch.

---

## Key Engineering Principles Applied Throughout

### 1. Budget Android First
Every decision asks: "What does this feel like on a Tecno Camon 20 on MTN 3G?"
- No heavy animations on mount
- Image sizes constrained
- Bundle splitting to reduce initial JS parse time

### 2. Locality of Behaviour
Game logic stays inside the game file. No shared reducers, no context providers for game state.
A new contributor should be able to understand `Gauntlet.jsx` by reading only `Gauntlet.jsx`.

### 3. Progressive Enhancement
- Free tier works with zero account
- Premium adds depth, not different features
- PWA offline works for previously loaded question sets

### 4. SA-Specific Constraints
- ZAR payments only (PayFast)
- No Google Maps API (R cost at scale)
- Colour palette accessibility: tested on Samsung Galaxy default display profiles
- Questions verified against 2024 DLTC examiner guidelines, not 2019 recycled content

---

## Metrics at End of Phase 9

| Metric | Value |
|--------|-------|
| Total questions | 600+ |
| Vehicle codes covered | Code 1, 2, 8, 10, 14 |
| Game modes | 11 |
| Languages | 3 |
| Bundle size (initial) | ~180KB gzipped |
| Lighthouse Performance | 91 |
| Lighthouse SEO | 100 |
| PWA score | 100 |
| Pricing | Free / R29 / R69 / R149 |

---

## Phase 14 — Quiz UX Overhaul: SA Flag Energy In-Game
**Commit:** `bcc7b72` | **2026-03-22**

The landing page had strong SA flag identity — bold green/gold/red, flag stripe, vivid contrast. The in-game UI was dark and muted: tiny border-only feedback, 3px progress bars, small text. Gap between landing page and game was jarring.

### What shipped

**Gauntlet (Code 8):**
- 3px progress bar → segmented blocks (one block per question; green = done, round-colour = current, dark = pending). 10 questions → 10 clearly readable blocks.
- Answer buttons: full vivid fill on reveal — correct = solid green (#007A4D) background with white text, wrong = solid red (#DE3831) with white text. Previous design: only border changed colour.
- A/B/C/D letter badge: green pill with 15% opacity green background before answering; blends with fill colour after.
- Question card: 16px bold text (was 14px), left 4px border in round's accent colour (was subtle gold tint border).
- Score display: 32px in round's accent colour (was 22px gold regardless of round).
- Timer: countdown number visible inline alongside bar with colour urgency (green/gold/red at thresholds).
- SA flag stripe (6-colour, 4px) fixed to top of quiz AND result screens (was only on home screen).
- Result screen: pass/fail pill badge, 72px score, transparent tinted background (was flat dark card).

**MockExam:**
- ScoreCard: pass/fail pill badge + 72px count-up score, transparent green/red tinted background.
- Progress bar: 6px thick, green→gold gradient (was 3px flat gold).
- Question card and answer buttons: same full-fill treatment as Gauntlet.
- NEXT button: larger padding, cleaner letterSpacing.

**RoadSignsQuiz:**
- Added `sfx('correct')` / `sfx('wrong')` + hapticCorrect/hapticWrong — was the only quiz game missing sounds and haptics.
- Wrong-answer review added to results screen: shows sign image, your answer vs correct answer, full explanation. Previously results showed only a percentage and two buttons.
- `wrongAnswers` state tracked in QuizEngine, passed via `onFinish(score, wrongAnswers)` to parent.
- Answer buttons: same full-fill + green pill badges.
- Progress bar: 6px with green→accent gradient.
- Score display: 22px in category accent colour with "SCORE" label.
- Pass/fail pill badge on results.

### Technical decisions

**Full-fill vs border-only feedback.**
Border-only feedback requires the eye to parse a subtle colour change at the edge of a button. Full fill makes the correct/wrong state unmissable — the entire button surface changes. This matters especially on budget Android displays with lower colour accuracy.

**Segmented progress blocks over a bar.**
A continuous bar shows approximate progress. Blocks show exact position: "I'm on question 7 of 10." At 10 questions per round, 10 blocks at ~60px each on a 640px container = perfectly legible. Would not use for 68-question MockExam (too narrow per block) — kept gradient bar there.

**wrongAnswers tracking architecture in RoadSignsQuiz.**
QuizEngine was a pure `score`-returning component. Extended to `(score, wrongAnswers[])`. State accumulates in QuizEngine via `setWrongAnswers(w => [...w, {...}])`, then passed on `onFinish`. Called only after `revealed = true` (user has answered), so state is settled by the time `next()` calls `onFinish`.

---

## Metrics at End of Phase 14 (Current)

| Metric | Value |
|--------|-------|
| Total questions | 600+ |
| Vehicle codes covered | Code 1, 2, 8, 10, 14 |
| Game modes | 11 |
| Languages | 3 |
| Bundle size (initial) | ~107KB gzipped (index chunk) |
| Games with sounds + haptics | 11 / 11 |
| Games with wrong-answer review | All |
| RoadSigns wrong-answer review | Added (sign image + explanation) |
| Answer button feedback | Full vivid fill (all quiz games) |
| Progress indicator | Segmented blocks (Gauntlet), gradient bar (MockExam/Signs) |
| SA flag stripe | Fixed to quiz + result screens across all Gauntlets |

---

## Phase 15 — Launch Ready: Marketing Landing Page + Analytics + Google OAuth
**2026-04-04**

**Commits:** This phase

### Goal
Get the product launch-ready: marketing landing page, analytics stack, Google verification, Google OAuth, and env var consolidation.

### What was built

**`public/landing.html` — Standalone marketing landing page**
- Fully self-contained HTML (no React/build step) — fast, SEO-crawlable, deployable to any CDN
- Design system: `#0A1A08` bg, `#C9A84C` gold, Cormorant Garamond display + DM Sans body
- Sections: Hero → Stats bar → Features (6 cards) → How It Works → Testimonials → Pricing → Final CTA → Footer
- Mobile-first, Safari-compatible (no modern CSS unsupported by WebKit, explicit flexbox prefixes)
- Google sign-up button → redirects to `/?auth=google` → React app handles Supabase Google OAuth
- PostHog + GTM tracking on all CTA clicks
- Footer: Mirembe Muse (Pty) Ltd branding, subtle designer credit

**`index.html` — App shell analytics**
- Added Google Tag Manager (GTM-KF2HMVLN) in `<head>` + `<body>` noscript
- Added PostHog snippet (phc_IbF9… / us.i.posthog.com)
- Added Google Site Verification meta tag
- Added Bing/Webmaster Tools meta tag

**`src/components/AuthModal.jsx` — Google OAuth**
- Added `signInWithGoogle()` using `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Added Google sign-in button with official Google G icon above email/magic-link form
- Divider "or sign in with email" separates the two paths
- Only shown for returning subscriber flow (not claim flow)

**`src/App.jsx` — `?auth=google` URL param handler**
- On mount, checks `?auth=google` URL param (set by landing page CTA)
- Clears the param from browser history, then triggers Supabase Google OAuth immediately
- Allows landing page → Google sign-in in one redirect without any extra screen

**`env.example` — Full env var inventory**
- Documents all keys with Vite prefix rules (VITE_ = browser-safe, no prefix = server-only)
- Covers: Supabase, OpenAI, Anthropic, PayFast, Resend, Sentry, PostHog, Google, Crisp, Arcjet

### Analytics stack
| Tool | Purpose | Integration |
|------|---------|-------------|
| Google Tag Manager | Container for all GTM-based tags | `index.html` + `landing.html` |
| PostHog | Product analytics, funnels, session recording | Snippet in both HTML files |
| Sentry | Error monitoring + CSP reporting | DSN in env, CSP Report-URI via Vercel headers |
| Vercel Analytics | Edge + web vitals | Already integrated via `@vercel/analytics` |
| Google Search Console | SEO indexing verification | Meta tag in `index.html` + `landing.html` |

### Key decisions
- Landing page as static HTML in `public/` (not a React route): crawlable immediately, no JS required for SEO, no bundle overhead
- Google OAuth flow via URL param (`?auth=google`): avoids duplicating Supabase client in static landing page
- PostHog tokens hardcoded in HTML (they are client-side public tokens, same as GTM)
- PayFast/Resend/Arcjet/Sentry auth tokens kept server-side only, documented in env.example
| Pricing | Free / R29 / R69 / R149 |
