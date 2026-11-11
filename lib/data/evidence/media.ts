/**
 * Where Evidence Wing media is served from.
 *
 * Dev default: /evidence-dev (git-ignored copy made by scripts/evidence/build-derivatives.mjs).
 * Production: https://media.creativelynanda.co.za (R2, a later step that needs approval first).
 * Anything else is rejected, so a bad env value can never point the page at a foreign host or a script URL.
 */
const ALLOWED_ORIGIN = 'https://media.creativelynanda.co.za';
const DEV_DEFAULT = '/evidence-dev';

export function resolveMediaBase(raw: string | undefined, isProd: boolean): string {
  const value = (raw ?? '').trim();
  if (!value) return DEV_DEFAULT;
  const ok = (value.startsWith('/') && !value.startsWith('//')) || value === ALLOWED_ORIGIN;
  if (ok) return value.replace(/\/+$/, '');
  if (isProd) throw new Error('NEXT_PUBLIC_EVIDENCE_MEDIA_BASE must be a site-relative path or ' + ALLOWED_ORIGIN);
  console.warn('[evidence] ignoring invalid NEXT_PUBLIC_EVIDENCE_MEDIA_BASE, using ' + DEV_DEFAULT);
  return DEV_DEFAULT;
}

export function mediaBase(): string {
  return resolveMediaBase(process.env.NEXT_PUBLIC_EVIDENCE_MEDIA_BASE, process.env.NODE_ENV === 'production');
}

/** screen id 'adminos-142417', width 960, format 'webp' -> '<base>/adminos/adminos-142417-960.webp' */
export function screenUrl(id: string, width: number, format: 'webp' | 'avif' = 'webp'): string {
  const app = id.split('-')[0];
  return `${mediaBase()}/${app}/${id}-${width}.${format}`;
}
