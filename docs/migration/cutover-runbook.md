# creativelynanda.co.za: Vercel to Cloudflare Workers

Status: **LIVE ON WORKERS since 2026-10-23 ~02:05 SAST** (owner: "do creativelynanda.co.za cutover and full migration").
- Production Worker `creativelynanda`: 52 secrets from Vercel prod, R2 `creativelynanda-inc-cache`.
- Routes: `creativelynanda.co.za/*` (id d427845e) and `www.creativelynanda.co.za/*` (id c792ae3d).
- `main` deploys production. `feat/cloudflare-workers` deploys staging (`creativelynanda-staging`).
- Vercel stays live until ~2026-11-06, then the owner removes it.

The sections below are the original plan, kept for reference.

## What changed
- Next 14 to 16 (webpack build, next-pwa), React 19, OpenNext for Cloudflare, `wrangler.jsonc`, `open-next.config.ts`, `.github/workflows/cf-build.yml` (build in GitHub only, 9 MiB gzip gate).
- `params` / `searchParams` are Promises (43 handlers codemodded); 3 client pages wrapped in Suspense for `useSearchParams`; `runtime='edge'` removed from `app/opengraph-image.tsx`.
- `postbuild: next-sitemap` removed: it wrote static `public/sitemap.xml` + `robots.txt` that would shadow `app/sitemap.ts` / `app/robots.ts` (what Vercel serves today).
- CI deletes `*.mp4` and `public/assets/poem-instagram` (mirrors `.vercelignore`).
- ISR/data cache in R2 (`creativelynanda-inc-cache-staging`), Durable Object queue + sharded tag cache, Smart Placement, Images binding.

## Before cutover (owner)
1. `JARVIS_WEBHOOK_SECRET` (Vercel "sensitive", unreadable): paste with `wrangler secret put JARVIS_WEBHOOK_SECRET --name creativelynanda-staging` (only needed once `feat/optin-magnet` merges).
2. Decide the Worker name for production (rename `creativelynanda-staging` to `creativelynanda`, new R2 bucket, update `WORKER_SELF_REFERENCE`) or keep staging name and add routes to it.
3. Web Analytics: `@vercel/analytics` is still in the layout (harmless 404 on Workers). Replace with Cloudflare Web Analytics at cutover (needs the beacon token).
4. Merge `feat/cloudflare-workers` into `main` only at cutover (it triggers a Vercel prod build; fine, Next 16 builds there too).

## Cutover steps (Cloudflare zone creativelynanda.co.za, already proxied)
1. Add Worker routes `creativelynanda.co.za/*` and `www.creativelynanda.co.za/*` to the Worker. DNS records stay (proxied).
2. `curl -I` home, `/sitemap.xml`, `/robots.txt`, one `/api/*`; check no `x-vercel-*` headers.
3. Send a PayFast sandbox ITN to `/api/payfast/universal-notify` (this URL is the shared notify URL for VarsityOS / AdminOS / K53 / StokvelOS): must return 200 and update the ledger. Check Security Events for blocks.
4. Submit contact + subscribe forms once (real emails go out).
5. Watch Workers Logs 30 minutes.

## Rollback
Delete the two Worker routes. Traffic returns to Vercel instantly (still live, untouched). Keep Vercel 14 days after cutover, then owner removes it.

## Known differences
- OG image uses a different default font on Workers (same layout).
- `/api/chat` returns 500 on BOTH Vercel and staging for an empty body (pre-existing, not a regression).
- Cloudinary SDK is not imported anywhere; admin uploads were not exercised (needs login).
