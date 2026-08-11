/**
 * The Google tags, as they actually exist at runtime.
 *
 * Both are loaded by `app/layout.js` with `strategy="afterInteractive"`, which
 * means neither is defined during server rendering, nor in the window between
 * first paint and the script landing, nor at all when a content blocker removes
 * them. `gtag` was previously declared here as non-optional, which made the
 * compiler promise something the browser does not — every call site had to
 * remember to guard with `typeof window.gtag === 'function'` and TypeScript
 * would not have complained about the one that forgot.
 *
 * Declared optional, so the guard is enforced rather than remembered. Existing
 * `typeof` checks narrow correctly against this and needed no change.
 *
 * Single source of truth: do not re-declare either of these in a module.
 * A second `declare global` with different modifiers is a compile error
 * (TS2687), which is the compiler correctly refusing to hold two opinions.
 */
interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
