# Media catalog pass: brief for tagging agents

Goal: tag every media item once, so the site, Mirembe Muse and Jarvis Marketing can all reuse it. Plan: BUILD_JOURNEY.md, entry "Thinking-cap session" (Nov 12 2026), section 6.

## Hard rules
- **Read-only on the media.** Never move, rename, edit, upload or `git add` any media file.
- Working files (contact sheets, keyframes) go ONLY in `C:\Users\nanda\evidence-work\catalog\<your-part>\`. Write nothing in the repo except your part file.
- **The repo is public.** Never write a person's name (except Nanda herself), an email, a phone number, a password, a client's or customer's name, or anything health, finance or therapy related read off a screen. Describe, don't transcribe: "a member list" not the names on it.
- Never open `.env*` files.
- If you can't tell something, say `null` or `"unknown"`. Don't guess dates, places or events. Mark how you know (`date_source`).

## How to look (keep it cheap)
- Images: build numbered contact sheets with ffmpeg (e.g. 3×3 or 4×3 tiles, scaled about 480px wide per tile, with a list file mapping tile order → filename), then view the sheets. Open a single image full-size only when a sheet is unclear or a sensitivity call depends on detail.
- Video: `ffprobe` for duration, resolution and rotation; then a keyframe sheet (6–9 evenly spaced frames tiled into one image). You can't hear audio: if speech is the point (interview, pitch), say `"audio-led: needs transcript"`.
- PDFs: read page by page with the Read tool (`pages` param).
- ffmpeg is on PATH (Git Bash). Use quoted Windows paths; some filenames have spaces.
- For screenshots, view the **cropped** copies at `C:\Users\nanda\evidence-work\shots\<same folder>\` (browser chrome removed). The raw path stays the item's `path`.
- Existing reviewed captions for some screens live in `lib/data/evidence/{adminos,jarvis,sanyu}/screens.json` (ids like `jarvis-154221` = the time part of the filename). Reuse them for `description` where they match; don't redo that work.

## Owner decisions already made (Nov 11 2026)
AdminOS screens are all demo data. Jarvis screens show nothing sensitive. People in the photos have consented, and school children's faces do not show. So `consent` defaults to `"covered-nov11"`. Still set `sensitivity: "review"` for anything that *looks* like a real person's private data, credentials, a readable phone/email, or a child's identifiable face. The AdminOS pitch PDF's last slide holds a demo login: that PDF is `"hold"` (never publish). The Johannesburg Report-Back names Founding Circle people: the PDF is `"hold"`, but its content is fine to retell.

## Output
Write a JSON array to `docs/media/catalog/parts/<part>.json`, one object per file (every file in your scope, no skipping; duplicates get their own entry with `"duplicate_of"`):

```json
{
  "id": "kebab-case-unique, prefix with your part e.g. app-adminos-151203",
  "path": "public/… raw path relative to repo root",
  "kind": "screenshot | recording | video | photo | document | logo | graphic",
  "product": "adminos | jarvis | sanyu | green-diaspora | selves-of-us | amanda | isd | ecdc | varsityos | mirembe | null",
  "jarvis_wing": "dashboard | ceo | finance | cycle | body | marketing | engineering | sanctuary | scholar | null",
  "event": "connected-africa-summit | ecdc-export-symposium | dibetsa-uj | green-diaspora-belize | other:<short> | null",
  "place": "string or null",
  "date": "YYYY-MM-DD or YYYY-MM or null",
  "date_source": "filename | exif | metadata | content | null",
  "orientation": "landscape | portrait | square",
  "resolution": "WxH",
  "duration_s": null,
  "size_mb": 0.0,
  "description": "one factual sentence, no names",
  "patterns": ["for screens only: landing, dashboard, onboarding, form, list, detail, empty-state, ai-chat, money, report, settings, calendar, map, mobile, admin, content-editor"],
  "people": { "present": false, "count": "0 | 1 | 2-5 | 6+", "nanda": "yes | no | unknown", "children": false, "faces_identifiable": false },
  "consent": "covered-nov11 | needs-check | n/a",
  "sensitivity": "clear | review | hold",
  "sensitivity_reason": "short, no private detail, or null",
  "quality": 1,
  "story": "one line: what story this piece can tell",
  "rooms": ["press-room | the-road | screen-library | watch-it-run | speaking | workshop-at-night | case-file | the-study | newsletter | social | issue-004 | origin-story | mirembe"],
  "notes": "optional: trim points, best frame timestamp, pairs-with ids, hero candidate"
}
```
`quality`: 1 = unusable, 3 = solid supporting, 5 = hero/cover-worthy.

Then write a short summary at the end of your reply (not in the repo): counts by kind, top 10 hero candidates by id, everything you marked `review`/`hold` and why, and anything you couldn't identify.
