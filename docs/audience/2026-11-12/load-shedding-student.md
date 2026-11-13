# Ayanda (load-shedding student): "The words were fine. The first screen cost me too much, and when the network dropped I could keep reading but not come back."

Entry: `/` · Device: low-end Android 360×740, slow 3G (about 400 kbps, 400 ms), 4× CPU · Goal: who built VarsityOS, does her story help me, without burning data · Outcome: ACHIEVED WITH FRICTION

Screenshots: `.audience-shots/2026-11-12/load-shedding-student/`. Timings approximate (CDP throttling); MB counts reliable.

## The walk
1. Home: 17 s to readable text, 2.3 MB gone. Cover says poet and founder; doesn't say she built VarsityOS. "KUGOMPO CI…" coverline clipped at 360px.
2. Scroll home: +0.3 MB (2.57 total), 8,500px long, no jank.
3. /education: text after 2.4 s, 0.72 MB, but first screenshot was a dark graduation photo with no words; text faded in later. 15,000px long.
4. /about: 8 s to text, 1.24 MB.
5. /blog: 3 s, 0.51 MB. Article "A Test Booklet in Your Pocket": 4.5 s, 0.24 MB for 1,300 words, 18px body. This is what I wanted.
6. Offline mid-read: article stayed readable. Reload of article and /education both failed with browser "no internet". No service worker registered.

## Numbers
| Page | MB | Requests |
|---|---|---|
| Home | 2.29 (2.57 scrolled) | 75 |
| /education | 0.72 | 69 |
| /about | 1.24 | 48 |
| /blog | 0.51 | 51 |
| Article | 0.24 | not recorded |

Seconds to "who is this?": about 17 (home) · taps to goal: 4 · dead ends: 1 (offline reload) · 0 autoplaying video · no horizontal overflow at 360px

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| F1 | Major | Home first load | 01-home-first.png | 17 s and 2.3 MB for a cover that doesn't answer my question | Big share of R12; I'd close the tab | First load toward 500 KB: lazy-load the two videos and below-fold images; text visible in a few seconds |
| F2 | Major | Home first screen | 01-home-first.png | Doesn't say she built VarsityOS | Why I came is missing | One plain line "Built VarsityOS, K53 Drill Master and more" + link |
| F3 | Major | /education first paint | 02-education-first.png | Dark photo, no words | Blank = leave | Heading and intro render immediately, no fade gate |
| F4 | Major | Offline reload | 07-offline-reload.png | "No internet" | Load-shedding: come back later without data | Service worker caching visited articles + offline page |
| F5 | Minor | Home top-right | 01-home-first.png | "KUGOMPO CI… / SOUTH AFRI…" clipped | Looks broken at 360 | Wrap or shrink |
| F6 | Minor | /about 8 s, 1.24 MB | 03-about-first.png | Heavier than needed | The page I most want | Lazy media, text first |
| F7 | Delight | Article page | 05-article-first.png | Fast, light, readable, survived the drop | Affordable | Keep articles this lean |

## The one change that matters most for me
Cache pages as I read them, then trim the homepage so words come before the heavy first screen.
