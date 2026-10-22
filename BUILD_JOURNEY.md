# CreativelyNanda.co.za — Build Journey

## B8 S1: Builder Notes newsletter opt-in (Oct 23 2026) — branch `feat/optin-magnet`

- **Plan:** server relay `/api/subscribe` to Jarvis `/api/magnet/subscribe` (header `x-jarvis-secret`, brand `creativelynanda`, no magnet, newsletter only), `/api/unsubscribe` relay (keeps the Jarvis domain hidden; Jarvis nurture emails link to `https://creativelynanda.co.za/api/unsubscribe?token=...`), OptInForm on homepage + footer with POPIA consent line.
- **State:** e9e18bc (written Oct 21 in the OneDrive clone, never pushed) audited Oct 23 against the Jarvis route and the spec: relay, unsubscribe relay, honeypot, 10s timeouts, safe errors, homepage + footer placement all correct. Gaps filled: consent line now links `/legal/privacy`; the press page form (PressClient) now sends `source: 'cn_press'`. Edited files syntax-checked with esbuild. No local build (low RAM).
- **Behaviour change to know:** the old `/api/subscribe` upserted into this app's own Supabase `subscribers` table and sent a Resend welcome. Both are gone: Jarvis now owns the list and the welcome/nurture. Existing rows in the old table are untouched (not migrated).
- **OWNER (Vercel project of this site, Preview first):** set `JARVIS_INTERNAL_URL` (Jarvis base URL, no trailing slash) and `JARVIS_WEBHOOK_SECRET` (same value as Jarvis `JARVIS_WEBHOOK_SECRET`). Without them signup returns 503 "Signups are not open yet". Production merge = owner OK.
- Working clone: `C:\dev\creativelynanda-git` (the OneDrive copy was not touched).

---

## Dev team kit + Cloudflare prep installed (Oct 16 2026)

- Installed the Mirembe dev team kit: 15 agents in `.claude/agents/` (Opus orchestrator + architect, Sonnet engineers/reviewers/verifier, Haiku scout/code-janitor/scribe) and `/build` `/fix` `/audit` `/migrate-cloudflare` commands.
- `CLAUDE.md`: kit rules on top, this app's existing notes kept under "## This app" (they win on conflict).
- `.claude/settings.json`: merged safety blocks (no .env/.dev.vars reads, no force-push, no prod db push / store submit / `vercel --prod`, no wrangler prod deploy or deletes; asks before push, npm install, any wrangler deploy or secret put). Existing settings kept.
- Cloudflare plan: this app moves Vercel → Cloudflare Workers in turn (**VarsityOS → AdminOS → True Access → K53 DrillMaster → CreativelyNanda → mirembemuse.co.za → StokvelOS → Sanyu → … → JarvisOS last** (headless Chrome, 776 routes). One app per session; Vercel stays live ≥14 days as rollback.). Nothing deployed or changed on Vercel/Supabase/DNS yet. Run `/migrate-cloudflare` when it's this app's turn.

---

