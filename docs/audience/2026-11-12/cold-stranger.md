# Cold stranger (Alex, London): "Gorgeous cover, I got it in 3 seconds. Then it took 13 seconds to load and I'm not sure why I'd stay."
Entry: https://creativelynanda.co.za/ · Device: iPhone 390x844 (Chromium emulation, no throttle; desktop run not done) · Goal: none, decide in 10s · Outcome: ACHIEVED WITH FRICTION (hooked by the cover, 6 of 12 steps used)

## The walk (in character, first person, short)
1. Land. Dark navy, a gold spine, "CREATIVELY NANDA" in big condensed caps, a woman with an afro looking straight at me. Feels like a magazine cover, not a portfolio. Good (01-home-1500ms.png). Nothing changed between 1.5s and 5s (02), so the first paint is the whole intro.
2. One-sentence answer: "A South African poet-performer, with a heritage story (nine generations, Amahlubi and Buganda) and a book called Inside Her Roses, who also builds tech." Probably what Nanda wants. But "Poet - Performer - Founder" at the foot is small and the coverlines are cryptic. "Nine generations" of what? I'm curious, which is the point.
3. Scroll. "She learned to speak in two tongues: the language of systems, and the language of longing." That is the line that made me stay (04). Strong point of view.
4. Book cover, then the "Read the poetry / See her world" buttons and a spoken-word photo (05). Craft is real: textured papers, gold, serif. I'd screenshot this.
5. /poetry: full-bleed bougainvillea photo, "Inside Her Roses", "83 poems, a published book, a stage and a radio voice". Clear CTA "Enter the Garden". But the headline and tagline sit over busy flowers and are hard to read (07).
6. /forge: "The garden is where she writes. This is where she builds." That's the best sentence on the site. I'd tap on. Stopped here; /roots screenshot didn't capture a usable frame.

## Numbers
Seconds to "who is this?": ~3 (once painted) · Taps to going deeper: 1 · MB transferred on homepage: ~7 MB by content-length (undercounts streamed video/chunked) · DOMContentLoaded 13.4s on homepage, 17s /poetry, 13s /forge, 9s /roots, on an unthrottled connection from my test machine (may include cold-start; re-measure) · Dead ends: 0

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| F1 | Major | Homepage load | 01, 02 | Page took ~13s to DOMContentLoaded and ~7 MB. I'd have bounced if I hadn't been told to look. | A shared link gets one shot; design-literate visitors on mobile data leave a slow beautiful page. | Check TTFB/cold start (Cloudflare move may help); defer ambient video and below-fold images; budget homepage to under 2 MB. |
| F2 | Major | Hero, first viewport | 01 | I know the name and it looks stunning, but nothing says what she does in plain words except tiny italic "Poet - Performer - Founder" at the very bottom. | The 10-second answer rests on cryptic coverlines ("The line: nine generations"). | Lift the descriptor to just under the masthead, larger; keep the coverlines as flavour. |
| F3 | Delight | Homepage scroll 1 | 04 | "Two tongues: the language of systems, and the language of longing." Hooked. | This is the share line. | Keep it; consider surfacing it higher. |
| F4 | Delight | Hero | 01 | Magazine-cover framing, gold spine, vertical "The Soul Issue 2026". Not every-portfolio-looks-like-this. | Differentiation is the thing I'm hunting for. | Keep. |
| F5 | Minor | Hero | 01 | Floating gold circle bottom-right and round avatar bottom-left sit on the portrait and I don't know what they are. | Unlabelled mystery widgets look like clutter or a chat bubble. | Label them or hide until after first scroll. |
| F6 | Minor | /poetry hero | 07 | Italic tagline over bright pink flowers is hard to read. | The page's promise is the first thing I can't read. | Stronger veil behind text. |
| F7 | Minor | Menu | nav text dump | Menu is huge: ~30 links (Garden, Wall, Stage, Scar Room, Dojo...). Room names are evocative but I can't tell what a Scar Room is. | Too many doors for a stranger; but curiosity may reward it. | Add one-line descriptors under room names. |
| F8 | Minor | Nav and footer | links list | "Mirembe Muse" appears 4+ times (nav, cover, strip, footer). | Clear route to business, but repetitive. Fine for positioning. | None required. |

## What would make me come back / tell someone
I'd send it with: "A poet's website built like a Vogue issue, and she's also an engineer, look at the cover." The Forge line "the garden is where she writes, this is where she builds" is what I'd quote. I'd come back to read the poems and see what the nine generations are.

## The one change that matters most for me
Make the first load fast (13s on a clean connection is the thing most likely to lose a stranger before the cover ever lands), then put one plain sentence about who she is above the fold.
