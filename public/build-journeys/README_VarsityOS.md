# VarsityOS — Campus Compass · Technical README

> South Africa's first AI student companion · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Production-green)](https://varsityos.co.za)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014%20PWA-black)]()
[![AI](https://img.shields.io/badge/AI-Claude%20claude--sonnet--4--6-orange)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview

VarsityOS (Campus Compass) is a Progressive Web App built for South Africa's 11 million university and TVET students. At its core is Nova — an AI companion trained on SA-specific student stressors: NSFAS delays, load shedding, imposter syndrome, campus food insecurity, and exam pressure. Six independent AI agents share one Supabase database. The app is installable, offline-capable, and designed to work on budget Android devices at 3G speeds.

## Architecture

```
┌──────────────────────────────────��──────────────────────────┐
│                    VARSITYOS / CAMPUS COMPASS               │
└─────────────────────────────────────────────────────────────┘

User (PWA, installed) ──► Next.js App Router
                                │
          ┌─────────────────────┼──────────────────────┐
          ▼                     ▼                      ▼
   Nova AI Chat          Study Engine           Budget + Meals
   /api/nova             /api/study-plan        /api/meals
       │                      │                      │
       ▼                      ▼                      ▼
   Claude API           Supabase DB             Claude API
   (context: SA         (timetable,             (R50 recipe
    student data)        modules, exams)         generator)

          ┌─────────────────────┼──────────────────────┐
          ▼                     ▼                      ▼
   Crisis Detection       Daily Wellness          Push Alerts
   /api/crisis            /api/wellness           Firebase VAPID
       │                      │
       ▼                      ▼
  SADAG / Lifeline       Supabase check-in
  SA auto-surface        history + scoring
```

### 6 AI Agents

| Agent | Trigger | Purpose |
|-------|---------|---------|
| Nova (Companion) | Every chat message | SA-contextual AI support, mental health awareness |
| StudyPlanAgent | On-demand / weekly | Generate personalised study plan from modules + exams |
| RecipeAgent | Budget input | Generate R50 meals from available ingredients |
| CrisisDetectionAgent | Every Nova message | Detect mental health crisis language, surface SADAG/Lifeline |
| WellnessCheckAgent | Daily cron | Check-in prompt, wellness score tracking |
| NSFASBudgetAgent | Budget changes | NSFAS allowance breakdown, spending alerts |

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js App Router | 14 | Server components, streaming, offline support |
| PWA | next-pwa + Web Manifest | — | Installable, offline-first, service worker |
| Language | TypeScript | 5.x | Strict typing across all 6 agents |
| Styling | Tailwind CSS | 3.x | Mobile-first, responsive, 360px support |
| State | Zustand | 5.x | Lightweight, persists to localStorage offline |
| Forms | React Hook Form + Zod | — | Validated input, safe API calls |
| AI | Claude claude-sonnet-4-6 | Latest | SA-context understanding, crisis detection accuracy |
| Database | Supabase PostgreSQL + RLS | — | 15 tables, auto-triggers, summary views |
| Auth | Supabase Auth | — | Email/password, session persistence |
| Payments | PayFast | — | ZAR tiers: Free / R39 Scholar / R79 Premium |
| Email | Resend | — | Welcome flows, payment confirmation |
| Push | Firebase (VAPID) | — | Wellness check-in notifications |
| Monitoring | Sentry + PostHog | — | Error tracking + product analytics |
| Hosting | Vercel | — | Edge + CDN |

## Database Schema

```sql
profiles              (id, student_id, university, year, nsfas_amount)
modules               (id, user_id, name, code, colour, credits)
tasks                 (id, user_id, module_id, title, due_date, priority, done_at)
timetable_slots       (id, user_id, module_id, day, start_time, end_time, venue)
exams                 (id, user_id, module_id, date, venue, notes)
budget_periods        (id, user_id, period, nsfas_total, spent, category_breakdown jsonb)
expenses              (id, user_id, period_id, amount, category, note)
meals                 (id, user_id, week_date, day, meal_type, recipe jsonb)
nova_messages         (id, user_id, role, content, crisis_flag, created_at)
wellness_checks       (id, user_id, score, mood, flags jsonb, created_at)
crisis_events         (id, user_id, trigger_message, resources_shown, created_at)
subscriptions         (id, user_id, tier, payfast_token, status, expires_at)
```

### RLS: Every table filtered by `auth.uid()` — no cross-student data access.

## AI Architecture — Crisis Detection

The most important technical decision: crisis detection runs on **every Nova message**, before the main response is generated.

```typescript
// Simplified crisis detection flow
const crisisSignals = detectCrisisLanguage(userMessage)
if (crisisSignals.severity >= THRESHOLD) {
  await logCrisisEvent(userId, userMessage)
  return generateCrisisResponse({
    resources: ['SADAG: 0800 456 789', 'Lifeline SA: 0861 322 322'],
    tone: 'warm, immediate, non-clinical',
    avoidance: ['minimising language', 'advice-giving', 'solutions']
  })
}
// Normal Nova response if no crisis detected
```

SA-specific crisis vocabulary trained into the system prompt. Tested against actual SA student crisis language patterns.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_VAPID_KEY=
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

## Local Development

```bash
git clone https://github.com/Nanda-Regine/campus-compass
cd campus-compass
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Key Technical Decisions

1. **PWA over native app** — SA students on budget Android can't always install from Play Store (storage, data, device restrictions). PWA installs from browser, works offline, sends push notifications, uses 80% less data than a comparable native app.

2. **Offline-first Zustand store** — Critical student data (timetable, exam dates, tasks) persists to localStorage. The app is useful even with zero connectivity — crucial during load shedding exams.

3. **Crisis detection before response generation** — Never let a distressed student wait for a normal response when they need a crisis resource. Detection adds ~100ms latency. Worth every millisecond.

4. **SA-specific system prompt** — Nova's context includes: NSFAS allowance structure, SA university academic calendar patterns, common township food prices, SA mental health resources, and load shedding scheduling patterns. Generic ChatGPT cannot do this.

5. **R50 meal generator with real prices** — The recipe agent is given a budget (often R50) and a list of ingredients the student has. It generates meals using actual SA grocery prices (Pick n Pay, Shoprite range). Not American recipes with unaffordable ingredients.

6. **Three-tier PayFast pricing** — Free tier has full access with usage caps (10 Nova messages/day, 1 study plan/week). Scholar (R39) removes caps. Premium (R79) adds AI tutoring and priority support. SA students cannot afford international SaaS pricing.

7. **15-table schema with triggers** — `done_at` auto-sets on task completion. `updated_at` auto-updates everywhere. Dashboard summary view pre-aggregates stats for fast load times on 3G.

## Deployment

- **Platform:** Vercel (Production)
- **Service Worker:** `/sw.js` (next-pwa generated)
- **Cron Jobs:**
  - `WellnessCheckAgent` — daily at 18:00 SAST
  - `NSFASBudgetReset` — 1st of each month
- **Push Notifications:** Firebase Cloud Messaging (VAPID key)
- **PWA Install:** Available on Chrome Android + iOS Safari (Add to Home Screen)

## Known Issues & Roadmap

- [ ] Offline AI responses (cached common Nova responses for no-connectivity)
- [ ] isiZulu / isiXhosa language support for Nova
- [ ] NSFAS payment date calendar integration
- [ ] Peer study group matching (community layer)
- [ ] CV builder with AI assistance

## License

Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*
