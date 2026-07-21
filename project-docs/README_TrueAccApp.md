# 📍 TrueAccApp — Location-Based Accessibility Platform
### Co-Founder Project | Inclusive Navigation for South African Spaces

**Built by:** Nandawula Regine Kabali-Kagwa (Co-Founder) | [Mirembe Muse (Pty) Ltd](https://mirembemuse.co.za)  
**GitHub:** [github.com/Nanda-Regine/TrueAccApp](https://github.com/Nanda-Regine/TrueAccApp)  
**Category:** Innovation / Social Impact / Co-Founder Project  
**Stack:** Next.js · TypeScript · Mapbox GL JS · Supabase · Tailwind CSS

---

## 🎯 The Problem

South Africa has over 4 million people living with disabilities — yet the country's built environment remains largely undocumented from an accessibility standpoint. A wheelchair user trying to navigate a new shopping centre, a parent with a pram looking for step-free access, a person with low vision needing wayfinding support: all of them are flying blind when they arrive somewhere new. Google Maps tells you where a place is. It doesn't tell you whether you can actually get in.

---

## 💡 The Solution

TrueAccApp is a community-powered accessibility mapping platform. Users can discover, rate, and review the physical accessibility of locations across South Africa — and contribute their own assessments to build a living database that serves everyone who navigates the world differently. The platform combines Mapbox's powerful spatial tooling with Supabase's real-time database to create an experience that is as fast as it is inclusive.

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Maps | Mapbox GL JS — interactive, accessible map rendering |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Auth | Supabase Auth |
| Styling | Tailwind CSS |
| Hosting | Vercel |

---

## ✨ Key Features

- **Interactive accessibility map** — real-time location discovery with accessibility overlays
- **Location profiles** — step-free access, lift availability, accessible parking, bathroom accessibility, hearing loop presence
- **Community ratings** — crowdsourced accessibility scores per location
- **Review system** — qualitative reviews from users with lived accessibility experience
- **Contribution flow** — any user can add, update, or flag a location's accessibility details
- **Filter by access need** — wheelchair users, parents with prams, visual impairment, hearing impairment
- **SA-specific data** — scoped to South African locations and infrastructure context
- **Offline-capable** — progressive web app architecture for areas with intermittent connectivity

---

## 📐 Architecture Decisions

**Why Mapbox over Google Maps?** Mapbox offers significantly more control over map styling, layer management, and data overlays — critical for building an accessibility-specific visual language on top of the base map. The custom vector tiles also perform better on lower-end Android devices common in the SA market.

**Why community-sourced data?** No official accessibility database exists for South African public spaces. Official data from municipalities is sparse and outdated. Community-powered data is not a compromise — it's the only architecture that can scale to cover the country. The platform is designed to incentivise contribution and validate data quality through the review and flagging system.

**Why Supabase with RLS?** Location data contributed by users needs careful access control — public reads, authenticated writes, with admin override for data quality management. Supabase Row Level Security policies handle this cleanly at the database layer without application-level middleware.

---

## 🗃️ Data Model (Key Tables)

```sql
locations (id, name, address, lat, lng, category, verified, created_by)
accessibility_scores (id, location_id, dimension, score, updated_at)
reviews (id, location_id, user_id, content, access_need, created_at)
access_needs (id, name, description, icon)
contributions (id, location_id, user_id, change_type, data, status)
```

---

## 📊 Case Study

**Project type:** Co-founded social impact platform  
**Co-founder role:** Product design, full-stack development, data architecture  
**Impact sector:** Disability inclusion, urban accessibility, civic tech  
**Target users:** 4+ million South Africans with disabilities + parents, elderly users, visitors  

**What this demonstrates:**
- Co-founder-level product thinking and execution
- Complex mapping application development with Mapbox GL JS
- Social impact technology design with real community need at its core
- Data architecture for crowdsourced, community-validated information
- Inclusive design principles applied throughout the user experience

---

## 🌱 Build Journey

TrueAccApp emerged from a simple but powerful observation: the technology to solve the accessibility information gap already exists. Mapbox, Supabase, React — none of this is novel. What was needed was someone who cared enough to connect the dots and build the specific application of it for South African infrastructure.

The co-founder dynamic introduced a different kind of challenge: alignment on product vision, feature prioritisation, and the eternal question of what to build first. The discipline learned here — *start with the smallest useful thing and validate before expanding* — became a principle applied across every subsequent build.

The accessibility-first design constraint was also formative. Building a platform whose core user base includes people with visual impairments, motor limitations, or cognitive differences forces you to make better decisions for *all* users. WCAG compliance, keyboard navigation, screen reader compatibility, and readable contrast ratios are not add-ons — they are the baseline.

---

## 🌍 The Larger Vision

South Africa has 11 official languages, a fragmented urban/rural infrastructure divide, and a public space environment that is dramatically underserved by accessibility data. TrueAccApp is not a niche product — it is civic infrastructure. The long-term vision is an open accessibility data standard for South African municipalities, with TrueAccApp as the community-powered data collection layer.

---

## 🔗 Related Projects

- [VarsityOS](https://varsityos.co.za) — SaaS: AI companion for SA university students (accessibility-informed design)
- [StokvelOS](https://stokvelos.co.za) — SaaS: community finance platform
- [CreativelyNanda.co.za](https://creativelynanda.co.za) — Portfolio hub

---

*Built with intention. Rooted in Ubuntu.*  
*Nandawula Regine Kabali-Kagwa — The Poet Who Codes*
