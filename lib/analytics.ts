/**
 * GA4 + GTM event helper.
 *
 * The site already loads both Google Tag Manager (`GTM-5ZMQ7H4M`) and gtag.js
 * for GA4 (`G-D6T4LD5XDE`) in `app/layout.js`, and Search Console is verified
 * via the `verification.google` meta tag. What was missing is the layer above:
 * page views were being collected and nothing else, so every question that
 * starts "did anyone actually…" had no answer.
 *
 * ── WHY A HELPER AND NOT `gtag()` AT THE CALL SITE ────────────────────────────
 *
 * 1. **`gtag` does not exist during SSR**, and it does not exist before the
 *    afterInteractive script has loaded. A bare call at a call site is a crash
 *    waiting for a slow connection. Everything here is guarded.
 * 2. **Event names must be stable** or the reports fragment. A union type means
 *    a typo is a build error rather than a second, nearly-identical event that
 *    quietly splits a funnel in half.
 * 3. **Both tags get the event.** `dataLayer.push` reaches GTM, `gtag` reaches
 *    GA4 directly. Sending to one and assuming the other is where analytics
 *    debugging goes to die.
 *
 * ── WHAT IS DELIBERATELY NOT TRACKED ──────────────────────────────────────────
 * No identifiers, no free text a visitor typed, nothing that could identify a
 * reader. Every payload below is a room name, a build slug, or a count — facts
 * about the page, not about the person. That is a POPIA position as much as a
 * taste one, and it costs nothing analytically: knowing that the Scar Room is
 * read to the end is the useful fact; knowing who read it is not.
 */

/** The complete set of custom events. Adding one means adding it here first. */
export type ForgeEvent =
  // ── The Forge wing ──
  | 'forge_room_enter'      // a room in the wing was opened
  | 'forge_build_open'      // a dossier was opened from the floor
  | 'forge_scar_read'       // a scar was scrolled to
  | 'forge_filter'          // a build filter was used on nights / commits
  | 'forge_live_app_click'  // someone left for one of the live products
  | 'forge_repo_click'      // someone went to a repository
  // ── Cross-site ──
  | 'mirembe_handoff'       // the business hand-off to mirembemuse was taken
  | 'outbound_click';

type Params = Record<string, string | number | boolean | undefined>;

// `window.gtag` and `window.dataLayer` are declared once, in `types/gtag.d.ts`,
// both optional because both are loaded `afterInteractive` and either can be
// removed by a content blocker. Re-declaring them here would be TS2687.

/**
 * Send an event to GA4 and GTM.
 *
 * Safe to call anywhere, including during a render that also runs on the
 * server: it returns immediately when `window` is undefined.
 */
export function track(event: ForgeEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;

  // Strip undefined so GA4 does not record an empty-string dimension, which
  // shows up in reports as a real value and is not one.
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') clean[k] = v;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...clean });
    window.gtag?.('event', event, clean);
  } catch {
    // Analytics must never break a page. An ad blocker removing gtag is the
    // normal case, not an error worth surfacing to a reader.
  }
}

/**
 * An outbound link handler. Attach to anything leaving the site so that the
 * click is recorded before the navigation, which `dataLayer.push` alone does
 * not guarantee on a same-tab navigation.
 */
export function trackOutbound(url: string, event: ForgeEvent = 'outbound_click', params: Params = {}) {
  return () => track(event, { ...params, destination: hostOf(url), url });
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
