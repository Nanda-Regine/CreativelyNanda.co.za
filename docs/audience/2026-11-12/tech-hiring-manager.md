# Daniel (tech hiring manager): "She is clearly real once I find the Forge. The homepage hides her best evidence behind the poetry and takes too long to load."

Entry: `/` · Device: MacBook 1440×900, fast line · Goal: is she real in 90 s, then contact · Outcome: ACHIEVED WITH FRICTION

Screenshots: `.audience-shots/2026-11-12/tech-hiring-manager/` (01–09)

## The walk
1. Home: 15 s to DOM-ready; reload timed out at 45 s; first screenshot timed out at 30 s.
2. First viewport: huge "CREATIVELY NANDA" masthead; centre empty gradient (no portrait yet at about 3 s); coverlines "Inside Her Roses", "Spoken Word", "Nine Generations". Only engineering signal: "She also builds, Mirembe Muse, AI engineer, by day", small, far right. Read: poet.
3. Clicked "The Forge" in nav. "The garden is where she writes. This is where she builds." Relief.
4. Forge numbers: 3,098 commits, twelve repos, 11 builds, 12 live, TypeScript 88.1%, explained as read from GitHub API.
5. Workshop Floor: 11 dossiers with commits, dates, "Private repository", live domain.
6. AdminOS case file: problem statement + 4 reasoned decisions (RLS tenant isolation, per-step timeouts in a nine-step WhatsApp workflow, Redis cache before model, prompt caching costed as a feature). Reads senior. Would book the interview on this alone.
7. Verify: live link to adminos.co.za, GitHub in footer, but repos private.
8. Contact: LinkedIn, GitHub, form, hello@. Framed as poetry/collab/press; software work deflected to Mirembe Muse. No CV anywhere.

## Numbers
Seconds to "who is this?": about 15 s load, then no "engineer" answer until the Forge about 40 s later · taps to case file: 4, +1 to contact · MB: not measured · dead ends: 1

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| F1 | Blocker | Home load (15 s; 48 s timeout on reload) | 01 | Would have closed the tab | Slow portfolio undercuts a performance-claiming engineer | Light first paint; lazy-load video/ambient media; check hero isn't blocking on Cloudinary |
| F2 | Major | Home first viewport | 01 | Poet first; "AI engineer, by day" tiny | Can't tell she's an engineer in 10 s | Strap under the name, e.g. "Poet. AI engineer. 3,000+ commits, 12 live products" → Forge; make Forge a primary tile |
| F3 | Major | Floor "READ 2026-08-11" | 05 | Numbers three months old | Undercuts "measured, not stated" | Scheduled rebuild of data, or "as of Aug 2026" |
| F4 | Major | Contact / Hire | 09 | Contact framed as poetry; no CV; no hire line in Forge | Need one-step job contact | "Hiring? Email, CV, LinkedIn" block on Forge + dossiers; CV PDF; hiring option in form |
| F5 | Minor | "Private repository" | 07 | Can't verify code | Unverifiable claims | One public repo or code excerpt; live apps prominent |
| F6 | Delight | Forge hero, Floor, AdminOS dossier | 03, 07 | Best part of the site: reasoned decisions, honest measurement | Proof of how she thinks | Keep; surface earlier |
| F7 | Minor | Poet + engineer | 01, 03 | One person inside the Forge; two competing brands on home | Only if he finds the Forge | See F2 |

## The one change that matters most for me
Engineer in the first viewport (strap line + Forge button + Hire/CV button), and a homepage that loads in under 3 s.
