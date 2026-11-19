# Press system: plan of record (20 Nov 2026)

Goal: a proper press system on both sites, so a journalist, festival curator or event organiser can find who she is, copy a correct bio, get assets with rights, and book her, in under two minutes. Two audiences, two kits, one set of facts.

## Shape
| | CreativelyNanda (this repo) | Mirembe Muse (`MirembeApp`, default branch `master`) |
|---|---|---|
| Kit for | Nandawula the poet and performer | Mirembe Muse the company and its platforms |
| URL | `/poetry/press` (new). `/press` keeps redirecting to the company kit. | `/press` (exists: page plus a generated PDF kit) |
| Booking | readings, performances, speaking | partnership, speaking on AI, commissions |
| Inbox | hello@creativelynanda.co.za | hello@mirembemuse.co.za |

Each page links to the other ("Press enquiry about the company? Company kit"), so nobody lands in the wrong one.

## One set of facts
Every page and PDF reads its facts from one file per repo (`lib/data/press-kit.ts` here). Rules: no number without a source, no date we do not have, no fee we have not set, no family names (clan level only), no em dashes. Spelling: Nandawula, KuGompo City, amaHlubi, amaTshawe, Msimanga.

## Parts of a kit
1. Bios in three lengths with a copy button each.
2. Fast facts, each with its source.
3. Book details (title, year, retailers).
4. As seen on (outlet, type, link when we have one).
5. What she can be booked for.
6. Assets with credit and rights status (photos, logo, book cover). Only files with a confirmed credit are offered.
7. Booking route: email with the subject written, fees and availability on request.
8. Corrections: one line saying how to report an error.

## Build order
1. This repo: `/poetry/press` from facts already on record. Sitemap entry, JSON-LD, cross-link to the company kit. (Done in this change.)
2. Mirembe: bring the ecosystem page (`/architecture`, data in `lib/data/ecosystem.ts`) up to the real roster: StokvelOS is live (data says "coming"), add the client platforms and the partner network from `lib/data/partners.ts` here, and the 17-live count. Work in a git worktree off `master`; the current branch holds uncommitted work from another session.
3. Mirembe: refresh the press page and the generated PDF kit to the same facts, add the cross-link and booking route.
4. Both: assets page with credited photos once Nanda confirms credits and rights.
5. Later: a small checker that compares the shared facts in both repos so they cannot drift.

## Needs Nanda
- Booking terms: what she offers (readings, keynotes, panels), lead time, and whether fees are published or on request.
- Photos: which are cleared for press, who to credit, which are hers to license.
- One clip (reading or interview) she is happy to have embedded.
- Whether "Inside Her Roses" has a retailer link she wants as the main one.
- Go-ahead to work in Mirembe through a worktree off `master`.
