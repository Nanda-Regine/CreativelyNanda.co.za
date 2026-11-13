# Lerato (poetry reader): "I got my poem and the share card is lovely, but I stared at a dark screen for about 10 seconds first."

Entry: `/poetry` (link in bio) → `/poetry/collection` → `/poetry/collection/you` · Device: Samsung A-series 360×800, dark mode, 3G (400 kbps, 400 ms) · Goal: read the poem, share a line, find more, find the book · Outcome: ACHIEVED WITH FRICTION

Screenshots: `.audience-shots/2026-11-12/poetry-reader/`

## The walk
1. /poetry: 2 s "Nanda / LOADING" splash; 5 s and 8 s blank dark with header only; about 15 s hero appears ("Inside Her Roses", bougainvillea, "Enter the Garden", "Get the book"). I'd be back on Instagram.
2. Hero feels like her: warm photo, italic serif, book one tap away and not pushy.
3. /poetry/collection: blank about 11 s, then "How does your heart arrive today?" with mood cards (Longing 27, Desire 9, Wonder 7…). Lovely, but no search for the poem I came for. Tapped Longing: garden washed in colour, "Today's Bloom" appeared.
4. "YOU": clean serif on a dark panel, right line breaks, good size. Sticky bar (heart, save, share, quote, Listen). Poem starts below the fold behind an "Enter the Reading Room" pill.
5. Share: "Link copied!" works. Quote → "Share a line": navy square card with the line, "Nanda Regine", the URL; pick any line, Share or Save. Would post to my story immediately.
6. "Get the Book" at the bottom; "Find your store" → books2read (200 OK, eight stores). "More that meet you here". Never sold to before reading.

## Numbers
Seconds to "who is this?": 13–15 (/poetry), 10–11 (collection) · taps to goal: 4–5 · MB: about 2.0 for /poetry, about 2.2 after the first poem · dead ends: 0 · no horizontal scroll at 360

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| F1 | Blocker | /poetry first load, 3G | 01-poetry-2s/5s/8s/15s | Splash then about 10 s blank | Patience is 5 s | Hero text paints without waiting for image/animation; cheap poster; a line of her words in the splash |
| F2 | Major | /poetry/collection load | 03-collection | Blank about 11 s | The page I'd be sent to | Server-render headline + mood cards; defer background art |
| F3 | Major | Finding a specific poem | 03-collection, 11-mood-list | No title/line search or A–Z in first screens | I came for one line I saw | "Find a poem by title or line" box at top of the garden |
| F4 | Minor | Poem page "YOU" | 05-poem-12s | about 480px of header/pill/toolbar before line one | Words first | Pull first stanza above the fold; shrink the pill |
| F5 | Minor | Poem toolbar | 06-poem-reading | Icons have no labels or accessible names | Guesswork; screen readers get nothing | aria-labels + visible captions |
| F6 | Minor | Poem page bottom-left | 06-poem-reading | Portrait bubble covers poem text | Covers words | Hide floating bubbles on poem pages |
| F7 | Minor | Poem stats | 05-poem-12s | "0 hearts, 0 roses", "No roses yet." | Empty room doesn't invite | Hide counts at zero |
| F8 | Delight | "Share a line" card | 08-quote | Beautiful branded square, Share/Save | Why I'd use the site | Keep; maybe surface first |
| F9 | Delight | Mood garden, poem typography | 11-mood-list, 06-poem-reading | Feels like her voice | Matches why I follow her | Keep |
| F10 | Delight | Book CTA | 01-poetry-15s | Offered softly, twice; store link works | Not sold to | Keep |

## What would make me come back
The share card; a "poem of the day" ritual (Today's Bloom is the start of one).

## The one change that matters most for me
Words on screen in under 3 seconds on a bad connection.
