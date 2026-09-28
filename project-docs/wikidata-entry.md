# Wikidata entry — Nandawula Regine Kabali-Kagwa

BUILD_JOURNEY §19.5 item 2: one name, one entity. A Wikidata item is the strongest
single signal search engines and AI assistants use to decide that "Nandawula Regine"
and "Nandawula Kabali-Kagwa" are one person, and it is what feeds a Knowledge Panel.

**This must be created by Nanda, logged in as herself.** It is a public edit under her
identity, so it is not automated.

## ⚠️ Read first — notability
Wikidata deletes items that fail its notability policy (WD:N). An item qualifies if it
"refers to a clearly identifiable entity that can be described using **serious and publicly
available references**." Her own site and social profiles alone are weak references.
Strengthen the item with *independent* sources before or right after creating it:
- press coverage (e.g. the *Gqeberha: The Empire* feature on *Inside Her Roses*)
- an ISBN / publisher record for *Inside Her Roses*, if it has one
- a Nelson Mandela University news item, radio or festival listing

A thin item that gets deleted is worse than none: it takes time before one can be recreated.

## Steps
1. Create an account at https://www.wikidata.org (or log in), then **Create a new Item**.
2. Label, description and aliases (English):
   - **Label:** Nandawula Regine Kabali-Kagwa
   - **Description:** Ugandan-South African poet and AI engineer
   - **Also known as:** Nandawula Kabali-Kagwa · Nandawula Regine · Nanda Regine
3. Add the statements below. Every one should carry a reference (*reference URL* P854).
4. Copy the new Q-id (e.g. `Q123456789`) into `WIKIDATA_ID` in `lib/seo.tsx` and deploy.
   It then joins `sameAs` in the site's Person JSON-LD automatically.

## Statements

| Property | Value | Reference |
|---|---|---|
| instance of (P31) | human (Q5) | — |
| sex or gender (P21) | female (Q6581072) | creativelynanda.co.za/about |
| given name (P735) | Nandawula (create if missing) | — |
| family name (P734) | Kabali-Kagwa (create if missing) | — |
| country of citizenship (P27) | South Africa (Q258) · Uganda (Q1036) — *only the ones she holds* | — |
| occupation (P106) | poet (Q49757) · software engineer (Q1709010) · entrepreneur (Q131524) | creativelynanda.co.za |
| educated at (P69) | Nelson Mandela University (Q1141030) — qualifiers *academic degree* (P512), *end time* (P582) | creativelynanda.co.za/education |
| residence (P551) | East London (Q466052) | creativelynanda.co.za |
| founded by (on the company item) / employer (P108) | Mirembe Muse (Pty) Ltd (create an item only if it has independent sources) | mirembemuse.co.za |
| notable work (P800) | *Inside Her Roses* (create a book item: instance of *poetry collection*, author → her) | publisher / ISBN record |
| official website (P856) | https://creativelynanda.co.za | — |
| GitHub username (P2037) | Nanda-Regine | — |
| X username (P2002) | CreativelyNanda | — |
| Instagram username (P2003) | nanda.regine | — |
| LinkedIn personal profile ID (P6634) | nandawula-kabali-kagwa-584bb0262 | — |

Before saving, check every Q-id above in the Wikidata search box: they were written from
memory and must be confirmed. Leave out anything she would rather not make public
(e.g. citizenship, gender), because Wikidata is fully public and permanently versioned.
