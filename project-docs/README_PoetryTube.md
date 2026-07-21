# 🎤 PoetryTube — The Video Platform Built for Poets
### Where Spoken Word Finds Its Stage | Community Video Platform for Performance Poetry

**Built by:** Nandawula Regine Kabali-Kagwa | [Mirembe Muse (Pty) Ltd](https://mirembemuse.co.za)  
**GitHub:** [github.com/Nanda-Regine/PoetryTube](https://github.com/Nanda-Regine/PoetryTube)  
**Live Demo:** *(Add Vercel URL)*  
**Category:** Creative Technology / Community Platform / Video  
**Stack:** Next.js · TypeScript · Supabase · Tailwind CSS · Vercel

---

## 🎯 The Problem

YouTube has billions of videos. Finding a specific spoken word poet — especially one performing in isiZulu, Sesotho, or Luganda — is an exercise in irrelevance. The platform's recommendation algorithm has no concept of "African performance poetry," no understanding of what makes a great slam set, and no incentive to surface voices that don't already have massive subscriber counts.

Poets who perform deserve more than a YouTube channel where their work competes with gaming livestreams and cooking tutorials for algorithmic attention. They deserve a home.

---

## 💡 The Solution

PoetryTube is a video platform designed from the ground up for the spoken word community. It is not a general video platform with a poetry category — it is a poetry-native platform where every design decision, content architecture, and community feature exists in service of the poet and the poem.

Built by a published poet who codes. Every feature is personal.

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + Storage + Realtime) |
| Auth | Supabase Auth — email, magic link, Google OAuth |
| Video | Mux (video hosting, playback, analytics) or Supabase Storage |
| Styling | Tailwind CSS — dark, editorial, stage-like aesthetic |
| Real-time | Supabase Realtime — live applause, comments |
| Hosting | Vercel |

---

## ✨ Key Features

**For Audiences:**
- Video discovery by language, style, theme, country, and emotion
- Live applause reaction — tap to send applause during a performance (Supabase Realtime)
- Poem annotations — timestamp-linked notes on specific lines
- Creator follows + personalised feed
- Collections — curate themed playlists of performances
- Audio-first mode — listen without video for commuting

**For Poets / Creators:**
- Creator profile — bio, performance history, upcoming shows
- Video upload with rich metadata: language, style, occasion, themes, transcript
- Performance analytics — view counts, applause counts, where viewers drop off
- Collaboration requests — connect with other poets for features and collabs
- AI poem idea generator — input a theme, emotion, or constraint → Claude suggests opening lines

**Community Features:**
- Open Mic calendar — upcoming virtual and physical events
- Weekly writing challenge — prompt-driven community participation
- Critique Circle — opt-in peer feedback channel (earned access)
- Creator directory — searchable by language, style, location

---

## 📐 Design Philosophy

**Stage design as UI metaphor.** Every design decision references the experience of watching live spoken word: low light, focused attention, the performer as the singular focal point. Dark backgrounds, warm amber spotlights on featured content, generous white space between performances. The UI should feel like a well-curated open mic, not a content feed.

**Language is a first-class citizen.** Every video requires a primary language tag. The discovery algorithm weights language matching for personalised recommendations. A Sesotho speaker should not have to search for Sesotho poetry — the platform should know.

**Applause, not likes.** The "like" button is abstract. Applause is embodied — it means something different. The live applause feature replicates the most visceral part of the live performance experience. When you tap applause during a performance, the poet's counter moves in real time. That connection matters.

---

## 🗃️ Data Model

```sql
creators (id, user_id, display_name, bio, language_primary, country, verified)
performances (id, creator_id, title, video_url, duration, language, style, 
              themes[], transcript, published_at)
applause (id, performance_id, user_id, count, created_at)
annotations (id, performance_id, user_id, timestamp_ms, content, created_at)
collections (id, user_id, name, performance_ids[], public)
follows (id, follower_id, creator_id, created_at)
challenges (id, title, prompt, start_date, end_date, submissions[])
```

---

## 🔄 Key User Flows

**Discovery Flow:**
1. Land on homepage → featured performance autoplay (muted)
2. Browse by emotion/theme/language → curated grid
3. Watch full performance → applause in real-time
4. Follow creator → personalised feed updates
5. Annotate a line → share annotation with community

**Creator Upload Flow:**
1. Upload video file → Mux processes for playback optimisation
2. Add metadata → title, language, style, themes, transcript
3. Generate AI poem idea (optional) → Claude suggests V2 concepts
4. Publish → appears in discovery feeds based on tags
5. View analytics → applause curve, drop-off points, followers gained

---

## 📊 Case Study

**Project type:** Community video platform for the spoken word creative economy  
**Target users:** Poets, slam artists, storytellers, performance artists — globally, Africa-first  
**Differentiation:** Poetry-native design, language-first discovery, live applause, poet-authored platform  
**Tech challenge:** Real-time applause counter, video storage and playback at scale, language-based recommendation  

**What this demonstrates:**
- Real-time features with Supabase Realtime subscriptions
- Video platform architecture — upload, processing, playback, analytics
- Community platform design — follows, collections, challenges, critique circles
- Language-aware content architecture for multilingual African contexts
- Platform built by a creator for creators — product empathy as a technical advantage

---

## 🌱 Build Journey

PoetryTube is the most personal project in the portfolio. *Inside Her Roses* — Nanda's published poetry collection — exists. The performances from Open Mic nights in East London exist. The frustration of watching extraordinary African poets perform to tiny audiences because YouTube's algorithm doesn't care about them — that exists too.

PoetryTube is the technical answer to a creative injustice.

The live applause feature was the hardest and most important thing to build. Supabase Realtime's presence and broadcast channels enable it — when a viewer taps applause, a broadcast is sent; all connected viewers on that performance see the counter increment. It creates a shared experience in what is otherwise an asynchronous medium. That shared experience is what distinguishes watching a performance from watching a video.

The AI poem idea generator (V2) will be built with the Claude API — giving creators a creative collaborator in the platform itself. The prompt engineering for this is already in progress: constrained generation that suggests opening lines, structural experiments, and thematic pivots without overwriting the poet's voice.

**The deeper truth:** every technical decision in PoetryTube was made by asking "what does this feel like for the poet?" That question — designer empathy as a primary engineering constraint — is the Poet Who Codes philosophy made executable.

---

## 🔗 Related Projects

- [WatchSankofa](https://watchsankofa.co.za) — African creative streaming platform — the broader cultural home
- [CreativelyNanda.co.za](https://creativelynanda.co.za) — Portfolio + Inside Her Roses poetry collection
- [MoodCast / Weather App](#) — Weather meets poetry — the micro-version of this creative fusion

---

*Built with intention. Rooted in Ubuntu.*  
*Nandawula Regine Kabali-Kagwa — The Poet Who Codes*
