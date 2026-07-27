# 🌦️ MoodCast — Weather × Poetry × Self-Care
### A Micro-Wellness App That Reads the Sky and Speaks to Your Soul

**Built by:** Nandawula Regine Kabali-Kagwa | [Mirembe Muse (Pty) Ltd](https://mirembemuse.co.za)  
**GitHub:** [github.com/Nanda-Regine/my-weather-app](https://github.com/Nanda-Regine/my-weather-app)  
**Live Demo:** *(Add Vercel URL)*  
**Category:** Creative Technology / Micro-App / Personal Project  

---

## 🎯 The Problem

Weather apps give you data. They tell you it will rain at 3pm. They don't tell you what to do with that information, how to feel about it, or how to turn a grey afternoon into something meaningful. For someone who believes the environment speaks — that rain means rest, that wind means change, that a clear morning is an invitation — a standard weather API response is a missed opportunity.

---

## 💡 The Solution

MoodCast is what happens when a published poet builds a weather app. It pairs real-time weather data with original poetry, self-care rituals, and mood-aware suggestions. Sunny → a Nanda original on presence and light. Rainy → a ritual for slow afternoons. Cloudy → an invitation to create. The weather becomes a conversation, not a forecast.

This project is also the proof-of-concept for a larger principle at the heart of the Mirembe Muse ecosystem: **technology should not just inform — it should transform.**

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | HTML5 / CSS3 / Vanilla JavaScript |
| Weather Data | OpenWeatherMap API / Open-Meteo (free tier) |
| Location | Browser Geolocation API |
| Storage | LocalStorage (saved rituals and preferences) |
| Styling | Custom CSS — weather-responsive colour palette |
| Hosting | Vercel static deploy |

---

## ✨ Key Features

- **Real-time weather fetch** — geolocation-based, no manual input required
- **Mood card generation** — weather condition → curated poem + ritual + affirmation
- **Original poetry** — verses written by Nanda, condition-matched (rain, sun, wind, clouds, storms)
- **Self-care ritual library** — condition-specific: stretch, tea, breathwork, journaling prompts
- **Save & share** — save today's mood card or share it to Instagram Stories
- **Weather-responsive UI** — background gradients and animations mirror actual conditions
- **Daily ritual reminder** — optional browser notification to check in with the sky
- **SA weather context** — load shedding mood card included (because South Africa)

---

## 📐 Design Decisions

**Why vanilla JS over a framework?** This was a deliberate constraint — an exercise in doing more with less. The discipline of solving problems without reaching for a library builds a deeper understanding of how the web actually works. Every interaction in MoodCast is authored from first principles.

**Why include original poetry?** Because this is The Poet Who Codes, and every product should carry that fingerprint. The poetry also serves a differentiation function: no other weather app in the world has this. It is, technically, a moat.

**Why the SA load shedding card?** Because authenticity matters. A product built for South African users that pretends Eskom doesn't exist has already failed its user. The load shedding card — with candle rituals, battery-saving affirmations, and a poem about sitting in the dark — is the most-shared card in user testing.

---

## 🗃️ Data Model

```javascript
// Condition-to-content mapping
const moodLibrary = {
  clear: { poem: String, ritual: String, affirmation: String, palette: String },
  rain: { poem: String, ritual: String, affirmation: String, palette: String },
  clouds: { poem: String, ritual: String, affirmation: String, palette: String },
  storm: { poem: String, ritual: String, affirmation: String, palette: String },
  wind: { poem: String, ritual: String, affirmation: String, palette: String },
  loadshedding: { poem: String, ritual: String, affirmation: String, palette: String }
}

// User saves (LocalStorage)
{
  saved_cards: [{ condition, date, poem, ritual }],
  preferences: { location, reminder_time, share_format }
}
```

---

## 📊 Case Study

**Project type:** Creative personal project / API integration exercise  
**Core skill demonstrated:** API consumption, condition-based logic, UI/UX design  
**Creative angle:** Poetry + self-care integration — the "Poet Who Codes" signature  
**What makes it unforgettable:** The load shedding card. No brief required.

**What this demonstrates:**
- RESTful API integration with error handling and fallbacks
- Geolocation API usage and permission management
- Condition-based dynamic UI (colour, content, animation)
- Original creative content integration into technical products
- The ability to take a standard tutorial project and make it genuinely yours

---

## 🌱 Build Journey

Every developer who has learned JavaScript has built a weather app. The question MoodCast asks is: *what if you built it like a poet?*

The technical implementation came quickly — API key, fetch, parse, render. The real work was the content library: writing original poems for each weather condition, developing the ritual system, making the self-care suggestions feel specific rather than generic. That work took longer than the code. And it's the part that no tutorial can teach.

This project was the first time the two identities — poet and developer — were explicitly merged in a single product. It felt like the unlock for everything that came after. The insight: technical capability is table stakes. Creative vision is the differentiator. Every SaaS product built since carries this lesson: *the feature is not the product — the feeling is the product.*

**V2 planned:** Claude AI integration to generate personalised poems based on the user's name, location, and current mood input. The weather becomes the context; the AI becomes the poet.

---

## 🔗 Related Projects

- [PoetryTube](#) — Video platform for spoken word and poetry performance
- [VarsityOS](https://varsityos.co.za) — Nova AI with emotional intelligence for SA students
- [CreativelyNanda.co.za](https://creativelynanda.co.za) — Portfolio + poetry collection

---

*Built with intention. Rooted in Ubuntu.*  
*Nandawula Regine Kabali-Kagwa — The Poet Who Codes*
