# 🏢 Cortex Hub — Smart Booking & Space Management System
### Workspace Booking Platform for the Modern African Creative Hub

**Built by:** Nandawula Regine Kabali-Kagwa | [Mirembe Muse (Pty) Ltd](https://mirembemuse.co.za)  
**GitHub:** [github.com/Nanda-Regine/Cortex-Hub-Booking](https://github.com/Nanda-Regine/Cortex-Hub-Booking)  
**Live Demo:** *(Add Vercel URL)*  
**Category:** SaaS Prototype / Startup Tool / Full-Stack Application  
**Stack:** Next.js · TypeScript · Supabase · Tailwind CSS · Vercel

---

## 🎯 The Problem

Shared workspaces, creative hubs, and co-working spaces in South Africa are growing — but most are still managed via WhatsApp groups, paper-based booking registers, and manual EFT payments. The result: double bookings, lost revenue from no-shows, zero visibility into space utilisation, and an experience that undermines the professional environments these spaces are trying to create.

---

## 💡 The Solution

Cortex Hub Booking is a full-stack space management and booking platform purpose-built for the African creative and professional hub ecosystem. It handles the complete booking lifecycle: space discovery, availability checking, reservation, payment, and automated confirmation — without a single WhatsApp message required.

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Auth | Supabase Auth — email, magic link, Google OAuth |
| Styling | Tailwind CSS |
| Payments | PayFast (ZAR) — SA-native payment gateway |
| Email | Resend — booking confirmations and reminders |
| Hosting | Vercel |

---

## ✨ Key Features

**For Guests / Members:**
- Space discovery with photos, capacity, amenities, and pricing
- Real-time availability calendar — no double bookings
- Instant booking with immediate confirmation email
- Booking history and upcoming reservations dashboard
- Cancellation and rescheduling with policy enforcement
- Mobile-first — book from anywhere

**For Hub Admins:**
- Space management — add, edit, deactivate spaces
- Booking oversight dashboard — all reservations at a glance
- Revenue reporting — daily, weekly, monthly breakdowns
- Block booking — hold spaces for events or maintenance
- Member management — approve, suspend, or flag members
- Automated reminder emails — reduce no-shows

---

## 📐 Architecture Decisions

**Why Supabase over Firebase?** The booking system requires complex relational queries — availability checks that span date ranges, spaces, and existing reservations simultaneously. PostgreSQL handles this elegantly with a single query. Firebase's document model would have required client-side joins and multiple reads per availability check.

**Why PayFast?** PayFast is the dominant SA payment gateway with native support for EFT, credit cards, and instant EFT — the payment methods SA co-working clients actually use. International gateways like Stripe charge currency conversion fees and have SA-specific limitations that would hurt conversion rates.

**Why server-side booking validation?** Availability checks cannot be trusted to the client. Between a user clicking "Book" and the server writing the reservation, another user could have taken the slot. The booking logic runs server-side with a database-level unique constraint on `(space_id, start_time, end_time)` overlaps to prevent race conditions.

---

## 🗃️ Data Model

```sql
spaces (id, name, description, capacity, hourly_rate, amenities[], images[], active)
bookings (id, space_id, user_id, start_time, end_time, status, payment_ref, created_at)
members (id, user_id, membership_type, credits_remaining, verified)
payments (id, booking_id, amount, gateway, status, gateway_ref, created_at)
availability_blocks (id, space_id, start_time, end_time, reason, created_by)

-- Availability check (no overlapping active bookings)
SELECT * FROM bookings 
WHERE space_id = $1 
AND status = 'confirmed'
AND tsrange(start_time, end_time) && tsrange($2, $3)
```

---

## 🔄 Key User Flows

**Booking Flow:**
1. Browse available spaces → filter by date, capacity, amenities
2. Select time slot → real-time availability check
3. Review booking summary → apply discount code if applicable
4. PayFast checkout → payment confirmation
5. Booking confirmed → email confirmation + calendar invite

**Admin Flow:**
1. Dashboard → today's bookings at a glance
2. Space utilisation report → peak hours, popular spaces
3. Revenue breakdown → by space, by member type, by period
4. Block management → upcoming maintenance, private events

---

## 📊 Case Study

**Project type:** SaaS prototype / startup tool  
**Market:** South African co-working, creative hubs, training venues, meeting rooms  
**Problem size:** Thousands of SA spaces still managed via WhatsApp and spreadsheets  
**Prototype outcome:** Full booking lifecycle from discovery to confirmation  

**What this demonstrates:**
- Complex scheduling logic with race condition prevention
- Full-stack Next.js application with real-time data requirements
- South African payment gateway integration (PayFast)
- Multi-role application architecture (member vs admin)
- Supabase RLS implementation for multi-tenant data isolation
- Business logic for the hospitality/space-rental domain

---

## 🌱 Build Journey

The Cortex Hub project started as a question: *why is booking a desk in a professional space in South Africa harder than booking a flight?* The answer — legacy processes, WhatsApp dependency, and the absence of affordable purpose-built tools — was also the brief.

Building the availability logic was the most technically demanding part. An availability check sounds simple: is this space free at this time? But in practice, it requires handling partial overlaps (a booking that starts before your requested time and ends during it), same-second concurrent bookings, and cancelled-then-rebooked slots. The PostgreSQL `tsrange` overlap operator solved this elegantly — a lesson in reaching for the right database primitive instead of solving it in application code.

The admin dashboard was the insight that led directly to AdminOS. After building Cortex Hub, the pattern became clear: South African SMEs and operators need not just booking tools but full operating system capability. Every manual WhatsApp message from a hub admin is a cost. Automation is the product.

**Planned V2:** AI-powered demand forecasting (which spaces should be promoted, when to offer discounts), member credits and loyalty system, QR code check-in for contactless access.

---

## 🔗 Related Projects

- [AdminOS](https://adminos.co.za) — SaaS: full AI business OS for SA SMEs — the scaled vision of this prototype
- [StokvelOS](https://stokvelos.co.za) — Community finance management with similar multi-role architecture
- [CreativelyNanda.co.za](https://creativelynanda.co.za) — Portfolio hub

---

*Built with intention. Rooted in Ubuntu.*  
*Nandawula Regine Kabali-Kagwa — The Poet Who Codes*
