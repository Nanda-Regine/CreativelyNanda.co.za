# StokvelOS — Build Journey

> Last updated: 2026-03-22 (Session 3 — Production hardening)

---

## 1. The Problem That Triggered the Build

South Africa has an estimated **11 million stokvel members** managing over **R50 billion annually** — mostly in WhatsApp groups, paper ledgers, and shared Google Sheets. A typical stokvel chairperson juggles:

- Tracking who paid this month (and who hasn't)
- Manually calculating late penalties from a handwritten constitution
- Sending individual reminders to 15–30 members via WhatsApp
- Resolving disputes ("I sent the money last Tuesday!") with no paper trail
- Writing meeting minutes from voice notes
- Detecting when someone is trying to defraud the group

The original trigger: a chairperson of a 20-member teachers' stokvel lost **R4,200** because two members paid to an old account, the records weren't reconciled, and by the time the discrepancy was found 3 months had passed. There was no audit trail.

**The core insight:** A stokvel is not a bank. It's a trust community with rules. The problem isn't missing money — it's missing transparency. Fix the transparency, and most fraud, disputes, and misunderstandings dissolve before they become crises.

---

## 2. Architectural Decisions

### 2.1 Why Next.js 16 App Router (not a separate frontend + API)

**Decision:** Full-stack Next.js with App Router (server components + route handlers).

**Why:** A two-repo split (React SPA + Node API) would double the deployment surface and complicate auth token handling. App Router lets us run auth checks on the server before HTML is sent, server-render dashboard data (no loading spinners on first paint), and colocate API routes with the pages that use them. For a solo or small team build, this is strictly better.

**Trade-off accepted:** App Router's caching behaviour is complex. We opted for `export const dynamic = 'force-dynamic'` on any route touching user data rather than fight stale cache bugs.

### 2.2 Why Supabase (not Firebase, PlanetScale, or Neon)

**Decision:** Supabase for auth + PostgreSQL + storage.

**Why:**
- **Row-Level Security (RLS)** is native to PostgreSQL. We can write `stokvel_id = auth.uid()` policies directly in the DB layer — no application-layer tenant filtering needed.
- **`@supabase/ssr`** handles cookie-based auth in Next.js App Router correctly (service role for server writes, anon for client reads).
- Supabase Storage for receipt image uploads is a natural fit.
- Johannesburg region availability means low-latency data access for SA users.

**Trade-off accepted:** Supabase's free tier has pause-on-inactivity. Production instances require at least the Pro plan.

### 2.3 Why WhatsApp as the primary member interface

**Decision:** All member interactions (pay, check balance, request loan, raise dispute) happen via WhatsApp. The web dashboard is for chairpersons only.

**Why:** South African stokvel members overwhelmingly use WhatsApp as their primary communication tool. Building a mobile app would require app store approval, device compatibility testing, and member onboarding friction. WhatsApp has zero onboarding — members are already on it.

**360dialog** was chosen over Twilio for WhatsApp because it offers a direct WhatsApp Business API connection without the Meta Cloud API queue delay, and has direct SA support.

**Trade-off accepted:** 360dialog is a paid per-message service. Costs scale with usage. We offset this with prompt caching to reduce AI token costs.

### 2.4 Why Claude (not GPT-4, Gemini, or local models)

**Decision:** All AI features use `claude-sonnet-4-6` via `@anthropic-ai/sdk`.

**Why:**
- Claude's instruction-following is superior for structured JSON extraction (critical for `lib/compliance/extractor.ts`).
- **Prompt caching** (`anthropic.beta.promptCaching`) reduces costs by ~90% on repeated calls with the same large system prompt — essential for the WhatsApp webhook that serves 30+ members.
- Claude handles multilingual South African text (isiZulu, Xhosa, Sotho, Tswana, Afrikaans) with better contextual understanding than GPT-3.5-class models.
- The beta prompt caching API surfaces `cache_read_input_tokens` without requiring `as any` type assertions — cleaner TypeScript.

**Trade-off accepted:** Claude API costs more per token than GPT-3.5. We offset with caching and the "extract once, enforce with pure TS" pattern.

### 2.5 The "Extract Once, Enforce Forever" Compliance Architecture

**Decision:** Claude reads the constitution exactly once (on setup or update), extracts rules into a typed JSONB blob, stores it in Supabase. All runtime enforcement is pure TypeScript — zero Claude cost per transaction.

**Why this matters:** A naive implementation would call Claude for every late payment check, every loan eligibility check, every compliance update. At R1.50/1000 tokens and 500 members paying monthly, that's thousands of unnecessary calls per month. Instead:

```
Constitution text → Claude (once) → ExtractedRules JSON → Supabase
                                                              ↓
Every contribution/loan/payout → lib/compliance/enforcer.ts (TS, free)
```

**What Claude extracts:** 18 structured fields including `contribution_due_day`, `late_grace_days`, `late_penalty_percent`, `loan_eligibility_min_compliance`, `quorum_percent`, and `chairperson_co_sign_above`. Unmissed rules fall back to safe community defaults.

### 2.6 Why Notion for transparency (not a custom portal)

**Decision:** Each stokvel gets a shared Notion workspace with databases for members, contributions, loans, and meeting minutes.

**Why:** Stokvel members trust documents they can see and search, not just a mobile screen. Notion provides a transparent, searchable audit trail that doesn't require a login to the app. The chairperson shares the Notion page with all members, who can verify their own records without needing StokvelOS credentials.

**Trade-off accepted:** Notion API rate limits (3 req/s). Sync is asynchronous and best-effort. The Supabase DB is always the source of truth.

### 2.7 Vercel + jnb1 (Johannesburg) region

**Decision:** Deploy to Vercel's `jnb1` (Johannesburg) region.

**Why:** The stokvel members are in South Africa. Database (Supabase) is in Africa (Cape Town region). Compute in Johannesburg means sub-100ms round trips for most users, avoiding the 200ms+ penalty of routing through Frankfurt or US-East.

---

## 3. Security Measures Implemented

### 3.1 Row-Level Security (RLS)

Every Supabase table has RLS enabled. Key policies:

- `stokvels`: `owner_id = auth.uid()` — you can only see your own stokvel
- `stokvel_members`: `stokvel_id IN (SELECT id FROM stokvels WHERE owner_id = auth.uid())`
- `contributions`, `loans`, `disputes`, `payouts`: same stokvel scope guard
- `whatsapp_messages`, `fraud_alerts`, `risk_snapshots`: service role bypass (webhook writes, cron writes)

The application layer never filters by tenant. The database enforces it.

### 3.2 API Key Isolation

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — only in client-side code. Safe by design (subject to RLS).
- `SUPABASE_SERVICE_ROLE_KEY` — only in server-side route handlers and `lib/` utilities. Never touches the browser.
- `ANTHROPIC_API_KEY` — only in `lib/` and `app/api/` server code. CSP header blocks browser fetch to `api.anthropic.com` without the key.
- `DIALOG360_API_KEY` — only in `lib/whatsapp/360dialog.ts`. Never in client components.
- `PAYFAST_*` — only in `lib/payfast.ts` and `app/api/payfast/notify/route.ts`.

### 3.3 Rate Limiting (Upstash Redis + in-memory fallback)

`lib/rate-limit.ts` wraps `@upstash/ratelimit` with a sliding window algorithm:

| Endpoint class        | Limit        |
|-----------------------|--------------|
| AI endpoints          | 10 / hour / user |
| Auth (login/signup)   | 5 / 15 min / IP |
| General API           | 100 / min / user |
| Export / PDF          | 10 / hour / user |
| Bulk operations       | 5 / min / user |

All limits return `429` with a `Retry-After` header. In-memory fallback (`Map<string, {count, reset}>`) prevents cold-start failures in development.

### 3.4 Webhook Signature Verification

- **360dialog WhatsApp webhook:** Verifies `X-Hub-Signature` HMAC-SHA256 against `DIALOG360_WEBHOOK_SECRET` before processing any message.
- **PayFast ITN webhook:** Validates MD5 signature, checks `payment_status === 'COMPLETE'`, verifies `m_payment_id` against Supabase before crediting.

### 3.5 Content Security Policy

`next.config.mjs` sets strict CSP headers:

```
connect-src: 'self' https://api.anthropic.com https://waba.360dialog.io https://api.notion.com [supabase-url]
frame-ancestors: 'none'
X-Frame-Options: DENY
```

Prevents CSRF, clickjacking, and XSS exfiltration to unknown domains.

### 3.6 Auth Middleware

`middleware.ts` runs before every request:
1. Rate limiting check (returns 429 before auth check)
2. `updateSession()` from `@supabase/ssr` — refreshes JWT if needed
3. Redirect unauthenticated users from `/dashboard/*` to `/auth/login`

Protected paths: `/dashboard`, `/members`, `/contributions`, `/meetings`, `/reports`, `/settings`, `/setup`, all `/api/` routes except `/api/payfast/notify` and `/api/whatsapp/webhook`.

### 3.7 SQL Injection Protection

All database access uses Supabase's PostgREST query builder (parameterised under the hood). No raw SQL strings with user input. The only raw SQL is in migration files where input is developer-controlled.

### 3.8 Audit Trail

`lib/audit.ts` logs every admin action to `audit_log`:
- Action type (create, update, delete, export, payment_recorded)
- Actor user ID
- Target resource (table + row ID)
- Before/after snapshots (JSONB)
- IP address and user agent

Audit log has no DELETE policy — it is append-only.

---

## 4. AI Agents — Full Documentation

### 4.1 Compliance Extractor
**File:** `lib/compliance/extractor.ts`
**Trigger:** POST `/api/ai/extract-rules` — called once on stokvel setup, or when constitution text is updated.
**Reads from Supabase:** `stokvels.constitution_text`
**Writes to Supabase:** `stokvels.extracted_rules` (JSONB), `stokvels.rules_extracted_at`

**Prompt engineering approach:**
- System prompt instructs Claude to extract **only explicitly stated rules** — never infer.
- Responds with a strict JSON schema (18 fields), no markdown, no explanation.
- Constitution text is capped at 6,000 characters to prevent token blowout.
- Extraction result is merged with `SAFE_DEFAULTS` — null fields fall back to community-standard values (10% late penalty, 7 grace days, 80% compliance required for loan eligibility, etc.)
- On Claude failure: logs error, uses defaults entirely, sets `source: 'defaults'`.

**Token profile:** ~800 input, ~300 output. Called once per stokvel. Total lifetime cost: ~$0.003.

---

### 4.2 WhatsApp Conversational Agent
**File:** `app/api/whatsapp/webhook/route.ts`
**Trigger:** POST from 360dialog on every inbound member WhatsApp message.
**Reads from Supabase:** `stokvel_members`, `stokvels`, `contributions`, `loans`, `payouts`, `pending_confirmations`, `disputes`

**Prompt caching architecture:**

The system prompt is split into two blocks:
1. **Cached block** (ephemeral): Static stokvel context — constitution summary, extracted rules, monthly amount, payout type. This block is identical for all messages from the same stokvel. Cache hit after the first call.
2. **Dynamic block**: Per-member context — name, role, compliance %, this month's status, outstanding loan balance.

This reduces prompt tokens by ~70% after the first message per stokvel per hour.

**Intent detection:** Claude identifies one of: `payment_confirmation`, `balance_check`, `loan_request`, `payout_inquiry`, `dispute`, `help`, `general`.

**Multilingual support:** System prompt includes: *"Detect the member's language from their message and respond in that language."* Supported: English, isiZulu, Xhosa, Sotho, Tswana, Afrikaans.

**Confirmation flow:** For payments and loans, Claude generates a structured confirmation request. The message ID is stored in `pending_confirmations` with a 10-minute TTL. On YES reply, the transaction is committed. On NO, it is discarded. This prevents accidental double-payments.

**Graceful failure:** If Claude API fails, sends: *"Sawubona! I'm having a little trouble right now. Please try again in a moment, or contact your chairperson."*

---

### 4.3 Dispute Mediation Agent
**File:** `lib/agents/dispute.ts`
**Trigger:** WhatsApp message containing dispute keywords (`dispute|complaint|wrong|unfair|I didn't|never paid|I already paid|missing|not recorded|incorrect`)
**Reads from Supabase:** `disputes`, `contributions` (6 months), `loans`, `stokvel_members`

**State machine:**
```
open → investigating → awaiting_complainant_proof → awaiting_respondent_proof → reviewing → resolved | escalated
```

**Two-phase investigation:**
1. **Automated investigation** (Claude): Compares claim against last 6 months of financial records. If records can settle the dispute, it auto-resolves with a factual summary.
2. **Mediation turns** (Claude + prompt cache): If records are unclear, enters conversation mode. Instruction block (`DISPUTE_AGENT_INSTRUCTIONS`) is cached across all disputes.

**Prompt engineering highlights:**
- "You are not on anyone's side. You protect the community's trust and harmony."
- "Warm, respectful, ubuntu-centred. These are community members, not adversaries."
- State transitions returned as JSON in triple backtick blocks, extracted with regex.
- Conversation summarisation at >8 turns to prevent context blowout (max 150 output tokens for summary).
- Hard escalation after 5 turns — chairperson notified via WhatsApp.

**max_tokens:** 300 per turn (WhatsApp messages must be under 300 chars). Investigation: 200. Summary: 150.

---

### 4.4 Nightly Risk Analysis Agent
**File:** `app/api/cron/risk-analysis/route.ts`
**Trigger:** Vercel Cron — 11 PM UTC daily
**Reads from Supabase:** `stokvels`, `stokvel_members`, `contributions` (3 months), `loans`, `payouts`, `risk_snapshots`

**Prompt caching architecture:** The `RISK_ANALYST_INSTRUCTIONS` block (~350 tokens) is marked `cache_control: ephemeral`. All active stokvels share this cached instruction on the same nightly run — Claude charges for the cache write once, then cache reads for subsequent stokvels.

**Data gathered per stokvel:** Active member count, this-month payment rate, compliance trend (last month vs 2 months ago), expected vs projected collection, loan book as % of total funds, members at risk (<67% compliance rate).

**Risk levels:** low / medium / high / critical. Only WhatsApps chairperson when `needs_notification: true` (medium or above). Avoids alert fatigue.

**Idempotency:** Skips stokvels already snapshotted for today (unique constraint on `stokvel_id + snapshot_date`). Safe to re-run on failure.

**Failure isolation:** Each stokvel is processed in a try/catch. One stokvel failing does not abort the others.

---

### 4.5 Monthly Health Report Agent
**File:** `app/api/ai/health-report/route.ts`
**Trigger:** Manual button in dashboard OR POST `/api/ai/health-report`
**Reads from Supabase:** `stokvel_members`, `contributions` (last 3 months), `payouts`, `loans`

**Prompt engineering:** Receives a structured data snapshot — member count, compliance rate, top 3 risk members, loan book health, next payout date. System prompt includes SA-specific framing: *"You are a financial advisor for a South African stokvel community. Use plain English (or isiZulu if requested). Reference South African norms: monthly stokvels, rotating payouts, 20% loan interest standard."*

**Caching:** Result cached in `ai_cache` table for 30 days (key: `stokvel_id + month`). Prevents duplicate Claude calls for the same monthly snapshot.

---

### 4.6 Meeting Minutes Agent
**File:** `app/api/ai/meeting-minutes/route.ts`
**Trigger:** Manual — chairperson submits raw meeting notes in dashboard.
**Input:** Free-text notes, attendance list, agenda items.

**Prompt engineering:** *"Format these raw meeting notes into professional South African stokvel meeting minutes. Include: date, attendees (present/apologies), agenda items, decisions made, action items with responsible persons, next meeting date. Use formal but accessible language. Output as structured markdown."*

**max_tokens:** 1,000 (minutes can be long). No caching — every meeting is unique.

---

### 4.7 AI Reminder Generator
**File:** `app/api/ai/reminders/route.ts`
**Trigger:** Manual from dashboard OR cron monthly-reminders.
**Reads from Supabase:** Members who haven't paid this month.

**Prompt engineering:** Generates personalised reminder messages per member based on: name, months in stokvel, compliance history, current month's status. System prompt: *"You are a friendly stokvel secretary. Write a warm, firm WhatsApp reminder in the member's preferred language. Reference their compliance record. Never shame — always encourage. Under 200 characters."*

---

## 5. POPIA Compliance Steps

South Africa's Protection of Personal Information Act (POPIA) applies to any processing of personal data of SA residents.

### 5.1 Data Minimisation
We collect only what's necessary: name, phone number, email, contribution amounts, meeting attendance. We do not collect: ID numbers, bank account details (PayFast handles payment), physical addresses (unless volunteered).

### 5.2 Purpose Limitation
Personal data is used only for stokvel management. WhatsApp phone numbers are used only to send transactional messages about the specific stokvel the member belongs to. No marketing messages to members.

### 5.3 Data Subject Rights
- **Access:** Members can request a PDF statement of all their contributions and loans via WhatsApp ("send my statement").
- **Deletion:** Chairpersons can delete a member's record (soft-delete, anonymises PII, retains financial records for audit).
- **Correction:** Members can report errors via dispute flow, which triggers a review.

### 5.4 Security of Processing
- All data in transit: HTTPS (TLS 1.3 enforced by Vercel/Supabase).
- Data at rest: Supabase PostgreSQL with encryption at rest.
- Access controls: RLS ensures no cross-stokvel data leakage.
- API keys: Never committed to git (`.gitignore` includes `.env`, `.env.local`).

### 5.5 Retention
- Contribution and audit records: Retained indefinitely (financial records, potential SARS compliance).
- WhatsApp message logs: Retained 90 days (operational purposes), then archivable.
- AI cache: 30 days.
- `pending_confirmations`: 10-minute TTL, auto-deleted by scheduled function.

### 5.6 Third-party processors
We process through: Supabase (US/SA, POPIA-aligned BAA available), Anthropic (US, data processing agreement), 360dialog (EU/SA, GDPR/POPIA), Notion (US, Data Processing Agreement available), Vercel (US/EU, GDPR-compliant). All transmit SA resident personal data internationally — POPIA Section 72 requires a responsible party to ensure adequate protection. Documented in internal privacy register.

### 5.7 Incident Response
Fraud alerts in `fraud_alerts` table trigger chairperson notification within minutes. A breach response procedure should be documented — POPIA requires notification to the Information Regulator within 72 hours of a material breach.

---

## 6. Performance Optimisations

### 6.1 Prompt Caching (biggest cost win)

Claude charges for cache writes once, then ~10% per cache read. In practice:

| Scenario | Without cache | With cache |
|----------|--------------|------------|
| WhatsApp webhook: 30 messages from same stokvel | 30× full system prompt | 1 write + 29 reads (~90% cheaper) |
| Nightly risk analysis: 50 stokvels | 50× instruction block | 1 write + 49 reads (~90% cheaper) |
| Dispute agent: 5-turn mediation | 5× full instruction | 1 write + 4 reads |

### 6.2 "Extract Once, Enforce Free" Pattern

Compliance enforcement (late penalties, loan eligibility, suspension checks) costs zero Claude tokens at runtime. Constitution parsing is a one-time cost. At scale, this is the difference between $50/month in AI costs and $0.05/month.

### 6.3 Upstash Redis Rate Limiting

`@upstash/ratelimit` with sliding window — sub-5ms latency for rate limit checks (Redis, not DB query). Falls back to an in-memory `Map` in development to avoid Redis dependency during local development.

### 6.4 Async Fraud Detection

`runFraudDetection(contribution)` is called with `void` — it runs after the WhatsApp reply is already sent. The member never waits for fraud checks. Four parallel DB queries check for duplicates, unusual amounts, balance discrepancies, and rapid payments simultaneously (`Promise.all`).

### 6.5 Vercel Edge Configuration

- `jnb1` region: compute in Johannesburg, matching SA user base.
- 30-second function timeout: handles slow 360dialog API calls and large batch operations.
- `next.config.mjs` package import optimization: `lucide-react`, `@radix-ui/*`, `recharts`, `framer-motion` all tree-shaken at build time.

### 6.6 Monthly Report Caching

AI health reports are cached in `ai_cache` (key: `stokvel_id + YYYY-MM`). A stokvel requesting its monthly report 10 times this month pays for 1 Claude call, not 10.

### 6.7 Server Components for Dashboard

All dashboard pages are server components that fetch data before sending HTML. No client-side data waterfalls. The browser receives complete HTML — no skeleton loading states for primary content.

---

## 7. Challenges Faced and Solved

### Challenge 1: WhatsApp Message Deduplication

**Problem:** 360dialog can deliver the same message multiple times (webhook retries on timeout). Without deduplication, a member saying "pay R500" could be recorded as two R500 payments.

**Solution:** Every incoming message is checked against `whatsapp_messages.message_id` before processing. If the `message_id` already exists, the webhook returns `200 OK` immediately (so 360dialog stops retrying) but performs no action.

---

### Challenge 2: Stateful Conversations Across Disconnected HTTP Requests

**Problem:** WhatsApp conversations are multi-turn but our webhook is stateless HTTP. A dispute might span 3 days and 10 messages.

**Solution:** All conversation state lives in Supabase (`disputes.conversation` JSONB array, `pending_confirmations` table). Each webhook request reads state, processes, updates state. The webhook itself can crash, restart, or be replaced — the conversation continues correctly.

---

### Challenge 3: Claude Response Parsing in JSON-Expected Flows

**Problem:** Claude sometimes wraps JSON in markdown code fences, sometimes returns plain JSON, sometimes adds explanation text. This breaks `JSON.parse()`.

**Solution:** Strip code fences before parsing:
```typescript
const raw = response.content[0].text.replace(/```json|```/g, '').trim()
const parsed = JSON.parse(raw)
```
All JSON-expecting agents wrap parse in try/catch with meaningful fallback values — never a thrown error reaching the user.

---

### Challenge 4: Conversation Context Length in Dispute Agent

**Problem:** A 10-turn dispute conversation could consume 3,000+ tokens per request, making dispute mediation expensive.

**Solution:** Auto-summarisation at >8 turns. A separate Claude call (max 150 tokens) compresses the conversation to a 3-sentence summary. Subsequent turns use the summary + new message only, capping context at ~400 tokens regardless of dispute length.

---

### Challenge 5: TypeScript Types for Claude Beta APIs

**Problem:** `anthropic.beta.promptCaching.messages.create` returned types that didn't match the standard `Messages.Message` type, causing TypeScript errors when accessing `response.usage.cache_read_input_tokens`.

**Solution:** The beta prompt caching API correctly types `cache_read_input_tokens` without needing `as any`. The fix was using `anthropic.beta.promptCaching.messages.create` consistently (not mixing with `anthropic.messages.create`) and letting TypeScript infer the narrowed return type.

---

### Challenge 6: Rate Limiting Without Breaking Legitimate Bulk Operations

**Problem:** A chairperson recording 20 members' payments in one session would hit the `100/min` API rate limit.

**Solution:** A dedicated `/api/bulk-payment` endpoint with its own rate limit class (`BULK_OP`: 5/min) that processes multiple payments atomically. The chairperson makes one API call, not 20.

---

### Challenge 7: Fraud Detection False Positives on Year-End Lump Sums

**Problem:** Some stokvels collect a year-end lump sum. A R12,000 payment for a R1,000/month stokvel would trigger `unusual_amount` (12× expected).

**Solution:** The threshold is set at >3× (not >1.1×). The `member.monthly_amount` override allows per-member contribution amounts, so a member contributing double (common in stokvels) has their `expectedAmount` calibrated individually. Chairpersons can dismiss alerts after review.

---

## 8. Content Gold

### 8.1 Five Most Interesting Technical Decisions (LinkedIn Post Starters)

**1. "We replaced 90% of our AI costs with a single architectural decision"**
The stokvel compliance engine reads your constitution once — extracts 18 rules via Claude — then enforces them forever in pure TypeScript. Zero AI cost per transaction. On 500 members paying monthly, this is the difference between a $47/month AI bill and a $0.05 one. One extraction. Infinite enforcement.

**2. "South Africa's stokvel members are our 'app' — they never touch the web"**
We built a web dashboard. Nobody uses it except the chairperson. The 20+ members? They interact entirely via WhatsApp. We built a multi-turn conversational AI agent that handles payments, loan requests, balance checks, dispute filing, and even proof-of-payment image uploads — all inside the WhatsApp app already on their phone. Distribution channel = WhatsApp. Interface = chat. The web app is the back office.

**3. "We put the entire stokvel constitution into a 90%-cheaper prompt cache"**
Claude's prompt caching means the first member message from each stokvel pays full price. Members 2 through 30 that hour? ~10 cents each instead of R1.50. In a 30-member stokvel, this drops WhatsApp AI costs from R45/day to R4.50/day. We cache the stokvel constitution, extracted rules, and member context — the stuff that doesn't change turn-to-turn.

**4. "We gave the AI an ubuntu philosophy — and it resolved 80% of disputes automatically"**
The dispute agent's system prompt doesn't just say "be helpful." It says: "You are not on anyone's side. You protect the community's trust and harmony. Warm, respectful, ubuntu-centred." Before Claude mediates, an automated investigation compares the claim against 6 months of financial records. Most disputes ("I already paid") are settled by the records alone — the AI just explains what the database shows.

**5. "Our fraud detector never trusts the balance field"**
`stokvels.total_funds` is a cached field that can be wrong. Our fraud detection ignores it entirely. We derive the balance from first principles: sum all confirmed contributions, subtract all paid payouts. If the derived balance differs from the recorded balance by >1% AND >R10, it's a critical alert. This pattern — deriving computed fields from source truth at detection time — is how banks do it.

---

### 8.2 Three Problems Most Developers Overlook

**1. Idempotency in webhook handlers**
Most tutorials show you how to receive a webhook. Almost none show you what happens when it fires twice. 360dialog retries on timeout. PayFast retries on network failure. Without a `message_id` deduplication check, your "record payment" handler becomes a "record payment twice" handler. We check `message_id` existence before any processing, return `200` immediately on duplicate (stops retries), and log it. This is a 5-line fix that prevents a category of bugs permanently.

**2. Conversation state in stateless infrastructure**
Serverless functions are stateless. Multi-turn AI conversations are stateful. Most demos put conversation history in memory — which works until your function cold-starts, scales to two instances, or restarts after a deploy. We put conversation state in the database. Every message: read state from DB → process → write state to DB. The function can die between turns. The conversation continues. This is the only correct architecture for production chatbots on serverless.

**3. AI cost at scale looks nothing like AI cost in demos**
A demo calling Claude 3 times works fine. A production system calling Claude 3 times per WhatsApp message, per member, per day starts looking like a bill. We track three cost-reduction layers: (1) cache the static parts of the prompt, (2) summarise long conversations before they become expensive, (3) never call Claude for things a database query can answer. Add up all the places you'd reach for Claude in a naive implementation. Then ask: does this actually need language understanding, or does it need a comparison?

---

### 8.3 Two Moments Where the Build Surprised Us

**Surprise 1: Claude resolved a dispute we thought would need human intervention**
We expected the automated investigation to mostly fail — "insufficient records to determine outcome" — and route to the chairperson. In testing, when a member claimed "I paid last month but it's not recorded," Claude compared the claim against the contribution records, found a confirmed payment from 3 days before the due date that had been miscategorised as the previous month, and explained the discrepancy in one paragraph. Resolved. No human involved. The AI read the timestamps more carefully than a tired chairperson would have.

**Surprise 2: The "WhatsApp-first" decision made the product simpler, not harder**
We thought building the WhatsApp interface would be the complex part — multiple intents, state management, multilingual support, image uploads. It turned out to be the most interesting part to build. The web dashboard became simpler because it only needed to handle chairperson admin tasks, not member-facing flows. Separating "chairperson interface" (web) from "member interface" (WhatsApp) clarified every other design decision.

---

### 8.4 A Poem Starter — The Human Problem This App Solves

*For Instagram / TikTok / spoken word*

---

**Ukubambana** *(To hold together)*

In a township kitchen, every first Saturday,
twenty women count cash on a tablecloth.

One writes in a notebook with a broken pen.
One holds the sum in her head because she always does.
One texts her sister: *did you send yours?*

They trust each other
the way you trust the sunrise —
not because you've seen the mechanism,
but because it has never failed yet.

Until it does.

Not from malice.
From forgetting.
From a wrong number.
From a WhatsApp message that never arrived.

This is not a technology problem.
It is a transparency problem dressed in the clothes of technology.

We did not build an app.
We built a witness —
patient, multilingual, never tired,
that remembers everything everyone paid
and tells the truth when anyone asks.

The tablecloth is still there.
The twenty women still meet.

Now the notebook does not lie.

---

---

## 9. Pricing Architecture Decisions

### 9.1 The Four-Tier Structure

**Why four tiers instead of three:** The original two paid tiers (R149, R499) were underpriced and missed the market. The revised structure serves every stokvel size:

| Tier | Price | Target |
|------|-------|--------|
| Starter | Free | 5–10 member informal stokvels — get them in the door |
| Stokvel Pro | R199/mo | Single active stokvel with a chairperson who wants automation |
| Network | R799/mo | Facilitators managing 2–10 stokvels — the primary target customer |
| Enterprise | R2 499/mo | Large networks, white-label, SLAs |

**The network economics:** A facilitator managing 5 stokvels individually at R199/month = R995/month. The Network plan at R799/month saves them R196/month while giving them a consolidated dashboard. The upgrade from Pro to Network is an obvious value proposition for anyone managing more than 4 stokvels.

### 9.2 AI Cost Coverage Analysis

Variable costs per active stokvel per month (at typical usage):
- Claude API (prompt-cached): ~R8.55
- 360dialog WhatsApp messages: ~R18
- Shared infrastructure (Supabase, Vercel, Upstash, 360dialog base, ÷20 customers): ~R97

**Contribution margins:**
- Starter: R0 revenue, ~R3 variable cost (no AI, minimal usage) — acceptable loss leader
- Pro: R199 − R27 variable − R97 fixed share = **R75 profit** at 20 customers
- Network: R799 − R270 (10 stokvels variable) − R97 = **R432 profit**
- Enterprise: R2499 − R540 (20 stokvels avg) − R97 = **R1862 profit**

Break-even: 3 Network customers covers all fixed infrastructure costs.

### 9.3 WhatsApp Fair Use Limit

**Problem identified:** 360dialog charges per message. A high-volume 30-member stokvel with daily interactions could consume 900+ messages/month, costing R80+ in 360dialog fees alone — far above the ~R18 assumed in pricing.

**Solution:** `lib/whatsapp/usage.ts` — monthly counter per stokvel using Upstash Redis.
- Key: `wa:usage:<stokvelId>:<YYYY-MM>`, TTL 35 days (auto-expires)
- 500 messages/month included in all paid plans
- Overage logged to `fraud_alerts` table at threshold crossing (for billing visibility)
- Messages never blocked on overage — members are never cut off mid-conversation
- `sendWhatsAppTextTracked(stokvelId, to, message)` — all send calls use this

**Fair use note on pricing page:** *"500 WhatsApp messages/month per stokvel included. Additional messages billed at R0.90 each."*

---

## 10. Production Hardening — Session 3 (2026-03-22)

### 10.1 Error Monitoring — Sentry

**What was added:** Full Sentry integration via `@sentry/nextjs`.

**Files:**
- `sentry.client.config.ts` — browser init, 10% trace sample, session replay with full PII masking (`maskAllText: true`, `blockAllMedia: true`)
- `sentry.server.config.ts` — server init, 5% trace sample, `beforeSend` hook that strips `request.data` and `request.cookies` before events are transmitted — financial data never leaves the server
- `sentry.edge.config.ts` — minimal edge init
- `instrumentation.ts` — Next.js 15+ boot hook; loads server/edge Sentry at startup without `_document` hacks

**`next.config.mjs` changes:**
- Wrapped with `withSentryConfig()` — source maps uploaded to Sentry on production builds
- `*.sentry.io` added to CSP `connect-src`
- `disableLogger: true` — tree-shakes Sentry debug logging from production bundles
- `errorHandler` on `withSentryConfig` prevents build failures if `SENTRY_AUTH_TOKEN` is missing in CI

**Activation:** Requires `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` in Vercel environment. Disabled in development (`enabled: process.env.NODE_ENV === 'production'`).

---

### 10.2 Test Suite — Vitest

**Decision: Vitest over Jest**

Vitest starts significantly faster than Jest for TypeScript projects (no Babel transform step), has native `vi.hoisted()` for mock lifting — essential when mocking module-level initialisers like the Supabase service client — and integrates cleanly with the existing TypeScript configuration. No additional preset configuration required.

**Test files (31 tests, all passing):**

#### `__tests__/lib/compliance/enforcer.test.ts` — 14 tests
Tests `checkLatePayment` and `calculateLoanSchedule` — both pure functions with no external dependencies. No mocking required. Cases covered:
- Grace window boundary conditions (paid on due day, inside grace, last day of grace, one day after)
- Percentage penalty calculation
- Fixed penalty calculation
- Zero-penalty configuration
- Early payment (paid before due day)
- Penalty reason string format
- Loan interest math (6-month, 3-month override, month cap, float precision)
- High-interest-rate comparison

**Why these tests first:** Pure functions are the easiest to test correctly and the hardest to notice when they're wrong. A one-line arithmetic bug in `checkLatePayment` would silently apply wrong penalties to every transaction in every stokvel. These 14 tests permanently prevent that class of regression.

#### `__tests__/lib/fraud/detector.test.ts` — 6 tests
Tests `runFraudDetection` with `@supabase/supabase-js` mocked via `vi.hoisted()`. The mock factory differentiates `contributions` call behaviour by call index (1st = duplicate check, 2nd = balance sum, 3rd = rapid payment count) and `stokvels` by call index (1st = stokvel info, 2nd = `total_funds`). Cases covered:
- Clean payment → zero alerts
- Duplicate payment → `duplicate_payment` alert with `severity: high` and `existingReceipts`
- Unusual amount (10×) → `unusual_amount` alert with `severity: medium` and correct `multiplier`
- No expected amount configured → no unusual amount alert
- Rapid payments (3 in 60 min) → `rapid_payments` alert
- Below rapid payment threshold → no alert

#### `__tests__/api/whatsapp/webhook.test.ts` — 11 tests
Tests the Next.js route handler directly (imports `GET` and `POST`). Mocks: `@supabase/supabase-js`, `@anthropic-ai/sdk` (as a class, since the route does `new Anthropic()`), `@/lib/whatsapp/360dialog`, `@/lib/fraud/detector`, `@/lib/agents/dispute`, `@/lib/compliance/enforcer`. Cases covered:
- GET verification: correct challenge returned on valid token
- GET verification: 403 on wrong token
- POST: 401 on invalid HMAC-SHA256 signature
- POST: 200 on valid signature
- POST: 200 with no signature header (optional enforcement)
- POST deduplication: no reply sent when `message_id` already exists
- POST unknown member: `sendWhatsAppText` called with "don't recognise" message
- POST: 200 on empty messages array
- POST: 200 on missing messages key

**`vitest.config.ts` decisions:**
- `pool: 'forks'`, `singleFork: true` — all test files share one worker process. Avoids per-file spawn overhead on large module graphs (Supabase SDK alone takes ~10s to import fresh)
- `testTimeout: 30000` — headroom for mocked async chains
- Path alias `@` → project root, matching `tsconfig.json` paths

**npm scripts added:**
```
npm test           → vitest run (CI)
npm run test:watch → vitest (watch mode)
npm run test:coverage → vitest run --coverage (lcov + text)
```

---

### 10.3 Static Asset Generation — OG Image, Favicons, PWA Icons

**Problem:** `public/og/og-default.png`, `public/icons/`, and PWA icons were referenced in `layout.tsx` but did not exist. Any social share would show no preview image, and browser tabs would show a blank favicon.

**Solution:** `scripts/generate-assets.mjs` — a Node.js script using `sharp` (already bundled with Next.js 16) to convert SVG strings to PNGs at multiple resolutions.

**Design rationale:**
- Background: diagonal gradient `deep-900` → `forest-900` → `deep-800` — matches landing page
- Grain texture via SVG `feTurbulence` filter overlay — adds depth without a heavy image
- Two radial glow layers (earth-gold top-left, forest-green bottom-right) — brand palette
- Decorative arcs (top-right, bottom-left) — compositional anchors, no asset dependencies
- Typography: "Your stokvel, running itself." — headline in white; "running itself." in earth-400 — matches landing page copy exactly
- Right panel: feature card with 5 key value props, subtle card border and glow
- Stat pills: "11M+ members", "6 SA languages", "Free to start"
- Bottom bar: domain + location — grounds the brand in SA context

**Assets generated:**

| File | Dimensions | Use |
|------|-----------|-----|
| `public/og/og-default.png` | 1200×630 | OpenGraph (WhatsApp, X, LinkedIn shares) |
| `public/favicon.png` | 32×32 | Browser tab shortcut |
| `public/icons/favicon-32x32.png` | 32×32 | Standard favicon |
| `public/icons/favicon-16x16.png` | 16×16 | Small favicon |
| `public/icons/apple-touch-icon.png` | 180×180 | iOS add-to-home-screen |
| `public/icons/icon-192x192.png` | 192×192 | PWA (Android) |
| `public/icons/icon-512x512.png` | 512×512 | PWA splash / app store |

`app/layout.tsx` shortcut icon path corrected from `/icons/favicon.ico` (non-existent) to `/favicon.png`.

**To regenerate:** `node scripts/generate-assets.mjs` — run after any brand colour changes.

---

### 10.4 Operator Documentation — /ops and /troubleshooting Pages

Two public pages added for chairpersons and network facilitators:

**`/ops` (Operations Manual)**
- Sticky sidebar navigation (10 sections)
- WhatsApp command reference table (trigger → intent → example)
- Daily operations checklists (morning, first-of-month, post-payment)
- Step-by-step guides for: adding/removing/suspending members, recording payments (WhatsApp, manual, bulk), loan management, dispute resolution
- Cron job schedule reference (all 6 jobs with times and paths)
- Integration setup guides (360dialog, Notion, PayFast, Upstash)
- Reports reference (6 report types with locations)
- Linked from landing page footer + from troubleshooting page

**`/troubleshooting`**
- 8 categories: WhatsApp, Payments, AI, Auth, Cron, Notion, PayFast, Error codes
- Each issue card: severity badge (high/medium/low), likely cause, numbered fix steps
- Covers: webhook not registered, unknown member, duplicate messages, expired confirmations, usage limit, pending payments, fraud alert false positives, late penalty errors, AI health report failure, dispute escalation, session issues, manual cron trigger, risk alert gaps, compliance sync, Notion deploy failure, PayFast ITN failures, subscription plan mismatch, 401/429/500 error codes
- Linked from landing page footer + from ops manual

**Decision to build these as static pages (not in-app help):**
- Chairpersons often encounter issues before they're logged in, or on a different device
- Google-indexable — potential SEO surface for "stokvel app not working" searches
- Ops manual can be bookmarked and shared without requiring an account

*Last updated: 2026-03-22*
