# AdminOS — Technical README

> AI-powered hybrid business operating system for South African SMEs, NGOs, schools, and government · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Production-green)](https://adminos.co.za)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014-black)]()
[![AI](https://img.shields.io/badge/AI-Claude%20claude--sonnet--4--6-orange)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview

AdminOS is South Africa's first AI-native business operating system. It handles the full admin layer of a business automatically — WhatsApp inbox management, debt recovery, staff wellness, document intelligence, and daily analytics — all via five specialist AI agents on a multi-tenant Supabase architecture. Built for the reality of South African business: load-shedding, 11 official languages, WhatsApp-first communication, and SMEs with no dedicated admin staff.

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │           ADMINOS PLATFORM          │
                    └─────────────────────────────────────┘

WhatsApp (Meta)──► /api/webhook/whatsapp
                              │
                              ▼
                    ┌─── WorkflowEngine ───┐
                    │  loadTenantContext   │
                    │  classifyIntent      │◄── Claude claude-sonnet-4-6
                    │  checkFAQCache       │◄── Upstash Redis
                    │  generateResponse    │◄── Claude (prompt cached)
                    │  sendWhatsApp        │──► Meta Cloud API
                    │  logToAudit          │──► Supabase (immutable)
                    │  updateDashboard     │──► Supabase Realtime
                    └──────────────────────┘

                    ┌─── 5 SPECIALIST AGENTS ──────────────┐
                    │  DebtRecoveryAgent   (cron: daily)   │
                    │  WellnessAgent       (cron: weekly)  │
                    │  DocumentAgent       (on upload)     │
                    │  DailyBriefAgent     (cron: 6am)     │
                    │  FAQCacheAgent       (on miss)       │
                    └──────────────────────────────────────┘

                    ┌─── MULTI-TENANT ISOLATION ───────────┐
                    │  Supabase RLS: tenant_id on every    │
                    │  table. JWT claims carry tenant_id.  │
                    │  No cross-tenant data leakage.       │
                    └──────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js App Router | 14 | Server components + Edge Functions for low latency |
| Language | TypeScript (strict) | 5.x | Type-safe across all 5 agents, zero runtime surprises |
| Styling | Tailwind CSS | 3.x | Rapid iteration, consistent design tokens |
| State | Zustand | 5.x | Lightweight, works across App Router boundaries |
| AI | Claude claude-sonnet-4-6 | Latest | Best reasoning for complex SA business context |
| AI Caching | Prompt caching (Anthropic) | — | 85% cost reduction on repeated FAQ patterns |
| Database | Supabase PostgreSQL | — | Native RLS for multi-tenancy without app-level filtering |
| Realtime | Supabase Realtime | — | Live dashboard updates without polling |
| Auth | Supabase Auth (JWT) | — | JWT claims carry tenant_id for RLS |
| Cache | Upstash Redis | — | Serverless Redis, deduplication, FAQ cache |
| Queue | Inngest | — | Async job processing with automatic retries |
| WhatsApp | Meta WhatsApp Cloud API | — | Official Meta integration, HMAC webhook auth |
| Email | Resend | — | Reliable transactional, great DX |
| Payments | PayFast | — | ZAR-native, standard in SA SaaS |
| Invoicing | Xero API | — | SME accounting standard in South Africa |
| Hosting | Vercel | — | Edge Functions, global CDN, native Next.js support |
| Monitoring | Sentry | — | Error tracking across all agent endpoints |
| Analytics | PostHog | — | Product analytics, funnel tracking |

## Database Schema

### Key Tables

```sql
-- Every table has tenant_id for RLS isolation
tenants           (id, name, whatsapp_number, plan, config jsonb)
profiles          (id, tenant_id, role, phone, name)
messages          (id, tenant_id, direction, content, ai_processed, created_at)
audit_logs        (id, tenant_id, action, actor, data jsonb, created_at) -- IMMUTABLE
invoices          (id, tenant_id, client_id, amount, status, xero_id)
wellness_checks   (id, tenant_id, employee_id, score, flags jsonb)
faq_cache         (id, tenant_id, question_hash, answer, hit_count, expires_at)
agent_runs        (id, tenant_id, agent_name, status, result jsonb, duration_ms)
```

### RLS Policies
Every table: `USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()))`
Audit logs: INSERT only — no UPDATE or DELETE permitted.

## AI Architecture

### 5 Specialist Agents

| Agent | Trigger | Model | Purpose |
|-------|---------|-------|---------|
| WorkflowEngine | Every WhatsApp message | claude-sonnet-4-6 + Redis cache | Intent classification, FAQ lookup, response generation |
| DebtRecoveryAgent | Cron: daily 8am | claude-sonnet-4-6 | Escalating recovery sequences, tone calibrated per debt age |
| WellnessAgent | Cron: weekly Monday | claude-sonnet-4-6 | Staff check-ins, burnout flag detection, HR escalation |
| DocumentAgent | File upload webhook | claude-sonnet-4-6 | PDF/Word parsing, classification, data extraction |
| DailyBriefAgent | Cron: 6am weekdays | claude-sonnet-4-6 | Dashboard narrative, overnight anomalies, day preview |

### Prompt Caching Strategy
- System prompts and FAQ data prefixed as cacheable blocks
- Cache hit rate: ~73% in production
- Cost reduction: 85% vs non-cached equivalent
- Cache TTL: 5 minutes (Anthropic's minimum cache window)

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
XERO_CLIENT_ID=
XERO_CLIENT_SECRET=
RESEND_API_KEY=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

## Local Development

```bash
git clone https://github.com/Nanda-Regine/AdminOS
cd AdminOS
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Key Technical Decisions

1. **Multi-tenancy via RLS (not app-level filtering)** — Supabase Row-Level Security enforced at the database layer. Even a compromised API route cannot leak cross-tenant data. This was the only acceptable architecture for a B2B platform handling sensitive business data.

2. **Claude prompt caching over fine-tuning** — Each tenant uploads their own FAQ document. Prefixing it as a cached block means the model "knows" their business without fine-tuning. 85% cost reduction. Swappable per tenant with no model redeployment.

3. **Redis deduplication before AI** — WhatsApp occasionally delivers duplicate webhooks. Redis stores message IDs with 5-minute TTL. Duplicate detection runs before any Claude call — preventing double-billing and double-responses.

4. **Inngest for async agent runs** — Agent jobs (debt recovery, wellness) are not synchronous HTTP responses. Inngest queues them with automatic retries, exponential backoff, and dead-letter queues. Load shedding cannot corrupt an in-flight job.

5. **Immutable audit logs** — No UPDATE or DELETE RLS policy on `audit_logs`. Required for POPIA compliance and financial auditing. Every agent action, every message, every invoice change is permanently recorded.

6. **Escalating debt recovery sequences** — DebtRecoveryAgent does not send the same message twice. It reads the debt age and previous contact history, then selects tone: friendly reminder (7 days) → formal notice (14 days) → final demand (30 days) → legal handoff (60 days).

7. **Load-shedding resilience** — Inngest retries failed jobs automatically. WhatsApp webhooks queue in Meta's infrastructure during outages. Redis deduplication prevents replay attacks on reconnect.

## Deployment

- **Platform:** Vercel (Production)
- **Cron Jobs (4 active):**
  - `DebtRecoveryAgent` — daily at 08:00 SAST
  - `WellnessAgent` — every Monday at 09:00 SAST
  - `DailyBriefAgent` — weekdays at 06:00 SAST
  - `FAQCacheRefresh` — every 6 hours
- **Webhook Endpoints:**
  - `/api/webhook/whatsapp` — Meta HMAC-verified
  - `/api/webhook/xero` — Xero signature-verified
  - `/api/webhook/payfast` — PayFast signature-verified
- **Build Command:** `npm run build`
- **Environment:** Node.js 18, Edge Functions for webhook routes

## Known Issues & Roadmap

- [ ] Xero real-time sync (currently polling every 6 hours)
- [ ] SMS fallback when WhatsApp is unavailable
- [ ] Mobile app (React Native) for dashboard on-the-go
- [ ] isiZulu and isiXhosa language fine-tuning for AI responses
- [ ] GPT-4o routing for cost optimisation on simple intents

## License

Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*
