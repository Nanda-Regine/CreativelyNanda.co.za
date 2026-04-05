# StokvelOS — Technical README

> South Africa's first AI-powered stokvel management platform · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Beta-yellow)](https://stokvelos.co.za)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014-black)]()
[![AI](https://img.shields.io/badge/AI-Claude%20claude--sonnet--4--6-orange)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview

StokvelOS is the first purpose-built digital infrastructure for South Africa's R50B+ stokvel economy. Over 11 million South Africans participate in stokvels — community savings groups — but most operate on WhatsApp threads and paper ledgers. StokvelOS brings formal digital governance to this informal economy: contribution tracking, AI-generated governance reports, automated meeting minutes, WhatsApp-native reminders, and fraud pattern detection. Built with deep respect for stokvel culture and the communities that sustain it.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        STOKVELOS                            │
│              R50B Community Savings Infrastructure          │
└─────────────────────────────────────────────────────────────┘

Member (WhatsApp) ──► Meta Cloud API ──► /api/webhook/whatsapp
                                               │
                                               ▼
                                      Contribution Logger
                                               │
                                    ┌──────────┴──────────┐
                                    ▼                     ▼
                             Supabase DB          WhatsApp Reminder
                          (multi-stokvel RLS)      (personalised)

Admin Dashboard ──► Next.js ──► Supabase
                                    │
          ┌─────────────────────────┼─────────────────────┐
          ▼                         ▼                     ▼
   AI Health Report          Meeting Minutes         Fraud Detection
   (monthly cron)            (on-demand)             (contribution scan)
       │                          │                       │
       ▼                          ▼                       ▼
   Claude API               Claude API               Claude API
   (compliance              (rough notes             (pattern analysis
    narrative)               → formal minutes)        → anomaly flags)
```

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js App Router | 14 | Server components, file-based routing |
| Language | TypeScript | 5.x | Type safety for financial data |
| Styling | Tailwind CSS | 3.x | Consistent design system |
| AI | Claude claude-sonnet-4-6 | Latest | Nuanced SA financial/community context |
| Database | Supabase PostgreSQL + RLS | — | Multi-stokvel isolation at DB level |
| WhatsApp | Meta WhatsApp Cloud API | — | 1,000 free conversations/month tier |
| Email | Resend | — | Contribution receipts, reports |
| Analytics | PostHog + GA4 + GTM | — | Product + marketing analytics |
| Monitoring | Vercel Analytics + Speed Insights | — | Core Web Vitals, edge performance |
| Hosting | Vercel | — | Production deployment |

## Database Schema

```sql
stokvels           (id, name, type, constitution jsonb, founded_at, admin_id)
members            (id, stokvel_id, name, phone, join_date, status, bank_details_encrypted)
contributions      (id, stokvel_id, member_id, amount, period, payment_method, confirmed_at)
meetings           (id, stokvel_id, date, agenda, rough_notes, ai_minutes, approved_at)
governance_reports (id, stokvel_id, period, health_score, findings jsonb, created_at)
fraud_alerts       (id, stokvel_id, alert_type, member_id, evidence jsonb, status)
reminders          (id, stokvel_id, member_id, type, scheduled_at, sent_at, message)
```

### RLS
Every table: `stokvel_id` filtered by user's stokvel membership. Admins see all members. Members see only their own contribution records.

## AI Architecture

### Monthly Governance Health Report
```
Input: last 30 days of contributions, meeting attendance, outstanding amounts
Process: Claude analyses patterns, identifies risks, scores health (0-100)
Output: Plain-language narrative + structured findings + recommended actions
Format: PDF-ready markdown, WhatsApp summary, dashboard card
```

### Meeting Minutes Generator
```
Input: admin's rough notes (voice-to-text or typed)
Process: Claude structures into formal stokvel meeting minutes format
Output: Numbered resolution items, attendance, decisions, action items
Context: SA stokvel constitution format, cultural meeting norms
```

### Fraud Pattern Detection
```
Signals monitored:
- Contribution amounts inconsistent with historical pattern
- Multiple contributions from same phone in short window
- Admin-only transactions without member confirmation
- Sudden large withdrawals without meeting resolution

If flagged → alert stored → admin notified via WhatsApp
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
```

## Local Development

```bash
git clone https://github.com/Nanda-Regine/StokvelOS
cd StokvelOS
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Key Technical Decisions

1. **Multi-stokvel RLS architecture** — One deployment serves unlimited stokvels. Each stokvel's data is isolated at the database row level. A compromised session cannot read another stokvel's finances. Critical for community trust.

2. **WhatsApp-first reminders** — Members already live on WhatsApp. Email reminders get ignored. WhatsApp personalised messages ("Hi Thandi, your R500 contribution for December is due on Friday") achieve significantly higher response rates.

3. **AI minutes from rough notes, not voice transcription** — Most stokvel chairpersons take quick notes during meetings. The AI takes those rough notes and outputs formal, numbered, constitution-compliant minutes. Removes the biggest admin burden in running a stokvel.

4. **Fraud detection as governance, not policing** — The fraud detection language is framed as "governance health" rather than accusations. The AI flags patterns, not people. Admins review flagged items. This respects stokvel community dynamics where trust is the foundation.

5. **Health score as single metric** — Complex financial data reduced to a 0-100 health score with colour coding (green/amber/red). Admin sees immediately if their stokvel needs attention. The AI narrative explains what drove the score.

6. **Free WhatsApp tier strategy** — Meta's WhatsApp Cloud API provides 1,000 free conversation sessions per month. Most small stokvels (10-30 members) stay within free tier for reminders. StokvelOS uses this to keep costs extremely low at launch.

## Deployment

- **Platform:** Vercel (Beta)
- **Cron Jobs:**
  - `GovernanceReportAgent` — 1st of each month, 07:00 SAST
  - `ContributionReminderAgent` — 3 days before each stokvel's contribution date
- **Webhook:** `/api/webhook/whatsapp` (Meta HMAC-verified)

## Known Issues & Roadmap

- [ ] Mobile money integration (SnapScan, Ozow, EFT confirmation)
- [ ] Constitution builder (AI-assisted stokvel constitution creation)
- [ ] Multi-language support (isiZulu, isiXhosa, Sesotho)
- [ ] Annual report PDF generation
- [ ] Stokvel type templates (burial society, investment club, grocery stokvel)

## License

Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*
