# Sipho (aspiring poet): "She spoke to me at the open mic, but the site spoke to the book first. I found the games and the Circle, but only because I went looking."

Entry: `/` · Device: 360×800 Android emulation, 3G · Goal: how she started, something to write with tonight, a way to share · Outcome: ACHIEVED WITH FRICTION

Screenshots: `.audience-shots/2026-11-12/aspiring-poet/`. Not tested: actual gameplay, and whether "Share your poem" needs sign-in.

## The walk
1. Home: 30 s on 3G, 740 KB. Magazine cover, portrait, coverlines "THE POET: Inside Her Roses", "ON STAGE: Spoken Word", "THE LINE: Nine Generations". Knew it was her instantly. A magazine to look at, not to write in.
2. "Poet · Performer · Founder" under the portrait. Engineering is one link and doesn't crowd the poetry.
3. Menu: Poetry → "Enter the World": The Garden, The Wall, The Stage, The Lineage Room, Poetry Games, The Circle, My Garden. Lovely names, but I couldn't tell which would help me write.
4. /poetry: about 127 s, 1.3 MB. "Inside Her Roses… 62 poems…". Buttons: "Enter the Garden", "Get the book". Read me / buy me; nothing asks me to write.
5. Poetry Games: 23 s, 88 KB. "No score to chase, just the pleasure of the language." Word Search, Magnetic Poetry, Finish the Line. Here I felt welcome.
6. My Garden: 941 KB. "Nothing to sign up for". Read 0 of 82 / Kept 0 / Written 0. Fun, peer-like, but built around reading hers.
7. The Circle: "Poetry is a conversation. Bring your voice." + "Share your poem". Closest thing to an invitation. Heading low-contrast over bright marble.
8. The Stage: her nights, not how I could perform. Didn't find "how she started" in 12 steps.

## Numbers
Seconds to "who is this?": about 1 after a 30 s paint · taps to goal: 4 (knowing the menu), about 6 via /poetry · data about 5 MB (home 0.74, /poetry 1.3, Wall 1.3, My Garden 0.94, Stage 0.5, Games 0.09) ≈ a fifth of a R29 bundle · dead ends: 1 (guessed short URLs 404, 404 page has no way back to the poetry house)

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| P1 | Major | /poetry load on 3G | 03-poetry | About 2 min, 1.3 MB | Blank screen on the page that matters most | Lighter hero, defer below-fold media, text first |
| P2 | Major | /poetry hero | 03-poetry | Only Garden / Book | The front door never says "write tonight" | Third CTA "Write something now → Finish the Line / Circle"; Games up front |
| P3 | Major | Menu labels | 01-home-first | Room names mean nothing yet | Reads as museum | One-line subtitle per room ("Games: play with words", "The Circle: share yours") |
| P4 | Minor | /poetry/community hero | 11-circle | Heading low-contrast over marble | The one invitation is hard to read in sunlight | Stronger scrim |
| P5 | Minor | `/stage`, `/my-garden` 404 | none | Dead end | Short URLs get shared after open mics | Redirect to `/poetry/stage`, `/poetry/my-garden`; 404 links back to poetry |
| P6 | Minor | Home | 01-home-first | No "how I started" | My first goal | Coverline "How I started writing" → story |
| P7 | Delight | Games, 88 KB | 07-games | Welcome, fast, no gatekeeping | Peer tone | Keep; make reachable |
| P8 | Delight | My Garden | 10-mygarden | No sign-up wall | Exactly right | Keep |

## What would make me come back
A prompt of the day; her poetry drafts and scars (the Forge has them for engineering). Friends would hear about the games.

## The one change that matters most for me
A "Write something now" invitation in the /poetry hero and home coverlines, pointing at Finish the Line or the Circle.
