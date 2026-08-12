/**
 * Routes that look internal and are not.
 *
 * ── THE PROBLEM ───────────────────────────────────────────────────────────────
 *
 * `next.config.js` permanently redirects the business routes to
 * mirembemuse.co.za — `/consulting`, `/work`, `/projects`, `/ai-engineer`,
 * `/press`, `/mirembe`. The page files still sit under `app/`, so they look
 * live to anyone reading the codebase, and a dozen `<Link href="/consulting">`
 * calls accumulated across pages that ARE live.
 *
 * Three things go wrong with each of those:
 *
 * 1. **Next prefetches the href.** It requests an RSC payload for a route that
 *    308s cross-origin, the browser blocks it on CORS, and the console fills
 *    with `Failed to fetch RSC payload` and `net::ERR_FAILED`. Those were the
 *    errors showing up on /testimonials and /engineer.
 * 2. **The visitor pays a round trip** — a click, a 308, then the real request.
 * 3. **A crawler reads an internal link to a redirect**, which is a weaker
 *    signal than a plain outbound link to the destination.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────────
 *
 * One map, and `hrefFor()` at the call sites. When a route stops being
 * redirected, delete its line here and every link goes back to being internal.
 *
 *   const { href, external } = hrefFor('/consulting');
 *
 * ⚠️ Keep this in sync with the `redirects()` block in `next.config.js`. There
 * is no way to import that config into the client bundle, so the duplication is
 * deliberate — but it is duplication, and it is the thing to check first when a
 * link starts behaving oddly.
 */

export const MIREMBE = 'https://mirembemuse.co.za';

/** Internal path → where it actually ends up. */
export const REDIRECTED: Record<string, string> = {
  '/ai-engineer': `${MIREMBE}/services/ai-engineering`,
  '/consulting': `${MIREMBE}/services`,
  '/work': `${MIREMBE}/case-studies`,
  '/projects': `${MIREMBE}/case-studies`,
  '/press': `${MIREMBE}/press`,
  '/mirembe': MIREMBE,
};

export interface ResolvedHref {
  href: string;
  /** True when the destination is off-site and needs target/rel + a plain <a>. */
  external: boolean;
}

/**
 * Resolve a path to where it will actually land.
 *
 * Sub-paths resolve to their parent's destination, because that is what the
 * config does: `/work/:path*` and `/projects/:slug` both land on the
 * case-studies index rather than on a matching page.
 */
export function hrefFor(path: string): ResolvedHref {
  if (REDIRECTED[path]) return { href: REDIRECTED[path], external: true };

  const parent = Object.keys(REDIRECTED).find((p) => path.startsWith(`${p}/`));
  if (parent) return { href: REDIRECTED[parent], external: true };

  return { href: path, external: false };
}

/** Props to spread on an anchor so an off-site link opens safely. */
export const EXTERNAL_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const;
