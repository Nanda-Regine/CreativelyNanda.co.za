# Heritage kin (Auntie Nakato): "The words are serious and I would read them to the elders, but the page took over a minute to open and the Ugandan side has no face."

Entry: `/roots` · Device: iPhone 390×844, larger text · Goal: accuracy, dignity, would I forward it to the elders · Outcome: ACHIEVED WITH FRICTION

Screenshots: `.audience-shots/2026-11-12/heritage-kin/` (01 and 04 reviewed. 02, 03, 05, 06 and 07 were captured but not reviewed, so claims about the middle and end of the page come from page text.)

## The walk
1. WhatsApp link → blank for a long time. DOMContentLoaded about 40 s first load, about 69 s on retry.
2. First screen: a woman in Xhosa dress on a mosaic, "Roots" in serif. The line "In Buganda you are never only yourself… name your father, his father, your clan, its totem" is exactly right. Respected.
3. House I, Nseenene. Strongest part: totem, motto, clan head, seats, migration story, Sir Apolo Kagwa. Written from inside the culture.
4. House II, AmaTshawe. Accurate in tone, but it's general royal-house history, not her family's line.
5. House III, Msimanga. Spelled correctly; Thabizolo praises left untranslated, which I appreciate.
6. About 3500px: a long empty magenta block (shot 04). Thought the page broke.
7. Closing sources note ("verified histories… the family's own line and names are held as family memory") is honest and builds trust.
8. Would forward, with a warning that it's slow and a few questions answered first.

## Numbers
Seconds to "who is this?": 40 to 70 (load) · taps to goal: 0 (one scroll) · MB: about 10.2 (undercounted) · dead ends: 0

## Findings
| ID | Severity | Page + moment | Screenshot | What I felt / did | Why it matters | Fix |
|---|---|---|---|---|---|---|
| H1 | Blocker | `/roots` landing | 01 | 40–70 s to open | Relatives on mobile data give up | Find what's blocking first paint (likely Cloudinary video/images); ship text first |
| H2 | Major | `/roots` about 3500px | 04 | Large empty magenta area under three photos | Looks broken; may be late scroll reveals | Render content without depending on scroll animation; fallback |
| H3 | Major | Whole page | 01, 04 | All people in Xhosa dress; no Ganda imagery (gomesi, busuuti, bark cloth) even though text opens with Buganda | Ugandan side visually thinner | Nanda to choose Ganda-side imagery or family photos |
| H4 | Major | "Nine generations documented" | none | No generations listed, only Kabombola, Segoma and clan founders | Promises a tree it doesn't show | Show a named lineage, or soften the claim (Nanda decides) |
| H5 | Minor | Body text over photos | 01 | Readable but busy; thin gold kicker | Tiring at larger text sizes | Stronger veil behind paragraphs |
| H6 | Minor | Name casing | none | "AmaTshawe/amaTshawe", "AmaHlubi/amaHlubi" both used | Reads as careless | Nanda to confirm preferred casing |
| H7 | Minor | Xhosa section | none | No izithakazelo for Tshawe, unlike Ganda and Hlubi sections | Xhosa side less personal | Nanda: is there a family-specific line? |
| H8 | Delight | Opening line, motto, untranslated praises, sources note | 01 | Culture not treated as decoration | Trust | Keep |

## For Nanda to confirm (flags only)
- "Ennyonyi ya Nseenene" (Luganda speaker to confirm the form)
- Motto "Ggwe mpagi, ggwe luwaga; Nakimera muka Ssuuna" and translation
- Kiroboozi → Buyonga, Kalibbala, Nnandawula; Wannyana as mother of Kabaka Kimera; "third king of Buganda"
- Clan head "Mugalula", seats "Kisozi · Lweza, Busujju"; family names Kabombola (Kyakasuku), Segoma (Kayenje)
- "Nnandawula… spelled the way I spell it" vs "Nandawula" elsewhere
- "Pembe kaLokothwayo" and Hlubi praise orthography; Hlubi "kings back to the 1300s" and 1818 date

## What would make me come back
Opening in under 5 s, a named family tree, Ganda-side imagery.

## The one change that matters most for me
Fix load time (H1). The writing earns trust; most of the family would never reach it.
