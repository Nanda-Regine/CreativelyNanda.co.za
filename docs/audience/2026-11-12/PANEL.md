# Audience panel, 2026-11-12: creativelynanda.co.za (live)

Eight personas walked the live site in parallel (Playwright, emulated devices). Individual reports are in this folder; screenshots are in `.audience-shots/2026-11-12/` (gitignored).

**Method caveat:** all eight browsers ran at the same time on one laptop, several with CPU and 3G throttling. **Absolute load times are inflated and must be re-measured with one clean Lighthouse run before fixing.** The *pattern* is not in doubt (every persona hit it on every heavy page, and MB counts don't depend on contention). Coverage gaps: the cold stranger skipped the desktop run; the press curator did not open `/poetry/stage`; the aspiring poet did not test gameplay or whether "Share your poem" needs sign-in.

## Scoreboard
| Persona | Goal | Outcome | Seconds to "who is this?" | Taps to goal | MB | Verdict (their words) |
|---|---|---|---|---|---|---|
| Poetry reader | Read the poem from Instagram, share a line | Friction | 13–15 | 4–5 | about 2.2 | "I got my poem and the share card is lovely, but I stared at a dark screen first." |
| Aspiring poet | Something to write with tonight | Friction | about 1 after a 30 s paint | 4–6 | about 5 (walk) | "The site spoke to the book first. I found the games only because I went looking." |
| Heritage kin | Would I forward /roots to the elders? | Friction | 40–70 (load) | 0 | about 10 | "The words are serious, but it took over a minute and the Ugandan side has no face." |
| Tech hiring manager | Is she real, in 90 s | Friction | about 15 + 40 to find the Forge | 4 (+1 contact) | not measured | "Clearly real once I find the Forge. The homepage hides her best evidence." |
| SME owner | Reach the business side, price, contact | Friction | about 4 (poet, not builder) | 1–2 | not measured | "I found the business side only because I was looking hard." |
| Press curator | Bio, photos, clip, booking in 3 min | **Gave up** | about 5 (home) | never | about 33 (11 pages) | "'The Press' is a blog, and /press is a software company's kit." |
| Load-shedding student | Who built VarsityOS, without burning data | Friction | about 17 | 4 | home 2.3, article 0.24 | "The first screen cost me too much, and offline I couldn't come back." |
| Cold stranger | Worth staying for? | Friction (hooked) | about 3 once painted | 1 | about 7 (home, unthrottled) | "Gorgeous cover, got it in 3 seconds. Then it took 13 seconds to load." |

**The headline:** every persona who got past the first screen liked what they found. Seven of eight said the first screen is where they'd lose people, either because it's slow or because it doesn't say who she is in plain words.

## Collisions (and the resolution)
1. **Magazine cover vs the 10-second answer** (stranger, hiring, SME, student). Keep the cover. Add one plain line under the masthead ("Poet. AI engineer. From KuGompo City.") and three small doors: *Read the poems · See the Forge · Business? Mirembe Muse →*. The cover stays the art; the line does the explaining.
2. **Poetry house vs business client.** The positioning rule stays (poet leads; business lives on Mirembe Muse). The fix is one visible plain-words business button on the first screen and at the top of the menu, not a business section on this site.
3. **Rich media vs data-poor visitors** (student, heritage kin, poetry reader, aspiring poet). Text first, media after, ambient video only on good connections (`navigator.connection` / Save-Data). This is the same mechanism as the "candlelight mode" idea, so the fix for the panel's biggest problem is also the first step of that feature.
4. **/press redirect: business positioning vs poet's press.** Redirecting `/press` to Mirembe Muse served the business split but broke the poet's press kit. Split it: `/press` becomes the poet's press & booking page, with a clear link "Company press → Mirembe Muse".
5. **Forge proof vs privacy.** The hiring manager wants verifiable code; repos are private. Resolve with screen recordings and code excerpts (see media below), not by opening repos.

## Inconsistencies (one fact sheet needed, Nanda to choose the true value)
| Fact | Where it differs |
|---|---|
| Live products | "eight live AI products" (/, /about), "Eight apps. One year." (/engineer), "12 live in production" (/forge), "14 systems live" (mirembemuse /press), "Four AI products in market" (mirembemuse /) |
| Poem count | 62 (/poetry hero, one run), 82 (/poetry, My Garden), 83 (/poetry, another run). May be a live count, but the hero should not vary. |
| Time active | "EST. 2021" masthead and book 2021, vs "Founded 2025", first code July 2025, "6+ months active dev" vs "one year" on the same /engineer page |
| Company registration | "Reg. 2026-005658" (footers) vs "Reg. No. 2025/628184/07" (mirembemuse /press footer) |
| Location | "KuGompo City" vs "EST. 2025 · EAST LONDON" in the mirembemuse footer |
| Name spelling | "Nnandawula… spelled the way I spell it" (/roots) vs "Nandawula" elsewhere |
| Clan-name casing | "AmaTshawe/amaTshawe", "AmaHlubi/amaHlubi" |
| Forge stats date | "READ 2026-08-11" (three months stale) |

## Top 10 changes
Ranked by (personas helped × severity) ÷ effort.

| # | Change | Personas | Effort | Pages |
|---|---|---|---|---|
| 1 | **Text-first, lighter first paint**: hero text renders without waiting for image/animation/fade; lazy-load video and below-fold media; homepage under 2 MB; check TTFB/cold start. Re-measure clean first. | all 8 | M | `/`, `/poetry`, `/poetry/collection`, `/roots`, `/about`, `/education` |
| 2 | **One plain line + three doors** on the home first screen (poems · Forge · business) | stranger, hiring, SME, student, aspiring poet | S | `/` (MagazineCover) |
| 3 | **One fact sheet** (single source for counts, dates, reg no.) used across both sites | press, hiring, stranger | S (once Nanda decides) | `/`, `/about`, `/engineer`, `/forge`, footers, mirembemuse |
| 4 | **Poet press & booking page** at `/press`: 50- and 150-word bios with copy buttons, 3–5 credited hi-res photos, one performance clip, book details (ISBN, publisher, year), booking contact and lead time. Rename nav "The Press" → "Writing". | press, stranger | M | `/press`, nav, `/contact` |
| 5 | **Menu with one-line descriptors**, business link at the top | stranger, aspiring poet, SME | S | `components/layout/Navigation.tsx` |
| 6 | **"Write something now"** CTA in the /poetry hero and a home coverline → Finish the Line / Circle | aspiring poet, poetry reader | S | `/poetry`, `/` |
| 7 | **Hiring block on the Forge** (email, CV PDF, LinkedIn) + refresh or date-label the stats | hiring | S | `/forge`, dossiers, `/contact` form option |
| 8 | **Find a poem by title or line** at the top of the garden | poetry reader | S–M | `/poetry/collection` |
| 9 | **Offline reading**: service worker caching visited articles and poems, plus an offline page | student, heritage kin, poetry reader | M (note: next-pwa is broken locally) | site-wide |
| 10 | **Readability and polish sweep**: stronger veils (/poetry hero, /poetry/community, /roots text), /roots empty magenta gap, hide floating bubbles on poem pages, label the poem toolbar icons, hide zero counts, un-clip "KUGOMPO CI…" at 360px, redirect `/stage` and `/my-garden`, 404 links back to poetry | reader, poet, heritage, stranger, student | S each | various |

Also for Mirembe Muse (separate repo): the cookie panel covers "Build With Us" and the /press hero; lead with "WhatsApp and admin systems for small businesses" and a "from R…" price.

## Keep list (Delights, don't break these)
- The magazine cover itself (stranger, aspiring poet, press): "not every-portfolio-looks-like-this"
- "The language of systems, and the language of longing" (the stranger's share line)
- "The garden is where she writes. This is where she builds." (stranger, hiring)
- The AdminOS dossier's reasoned decisions ("would book the interview on this alone")
- The **Share a line** card (the poetry reader's main reason to use the site)
- The mood garden and poem typography
- Poetry Games (88 KB, "no score to chase") and My Garden ("nothing to sign up for")
- Blog articles: 0.24 MB for 1,300 words, readable offline once loaded
- /roots: written from inside the culture, praises left untranslated, honest sources note
- The soft, twice-offered book CTA with a working store link

## Media we're not using yet: `public/app-graphics/` (292 MB, gitignored, not live)
210 files: 204 screenshots, 5 screen recordings, 1 PDF.
- `adminos-screenshots/` (49 shots + screen recording): proof for the AdminOS dossier. This answers the hiring manager's "I can't verify private repos".
- `jarvis-*` (9 folders, about 110 shots across dashboard and eight wings): the Jarvis OS case file and wing map.
- `sanyu-screenshots/` (22 + recording): the Sanyu case file.
- `amanda-`, `ecdc-`, `green-diaspora-`, `isd-`, `theselvesofus-screenshots/` (3 with recordings): builds with no Forge dossier yet. Nanda to confirm what each is and whether it can be shown.
- `Mirembe-Muse-Johannesburg-Report-Back.pdf`: press and business proof, probably for Mirembe Muse.

Rules for using it: compress and serve from R2 or Cloudinary (the R2 upload script exists from commit 79b9aa3); videos are poster + tap-to-play, never autoplay, or they make change #1 worse. Screen every image for client and personal data before publishing (one App Studio screen was already excluded for privacy).

## For Nanda to confirm
- Every value in the Inconsistencies table
- Roots: "Ennyonyi ya Nseenene"; the motto and its translation; Kiroboozi → Buyonga, Kalibbala, Nnandawula; Wannyana as mother of Kabaka Kimera; "third king of Buganda"; clan head "Mugalula" and seats; Kabombola (Kyakasuku) and Segoma (Kayenje); "Pembe kaLokothwayo" and Hlubi praise orthography; Hlubi "kings back to the 1300s" and 1818
- Roots: "Nine generations documented", show a named lineage or soften the claim
- Roots: Ganda-side imagery (gomesi, busuuti, bark cloth or family photos); every photo there is currently Xhosa dress
- Roots: is there a family-specific Tshawe line or izithakazelo to add?
- Press: approved bios, photo credits and usage terms, which clip, booking terms
- Which `app-graphics` projects are client work that can be shown publicly
