// Cloudinary delivery helpers for CreativelyNanda.
// Images use next-cloudinary's <CldImage>; videos use these raw delivery URLs
// (so we can keep muted/looping <video> backgrounds via <AmbientVideo>).
//
// Public IDs mirror /public/assets, prefixed with the base folder, e.g.
//   assets/nanda-culture/nanda-making-african-beer.mp4
//     →  creativelynanda/nanda-culture/nanda-making-african-beer

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const BASE = 'creativelynanda';

/** Full public_id under the base folder. Accepts an id with or without the base prefix. */
export function cldId(id: string): string {
  const clean = id.replace(/^\/+/, '').replace(/\.[^.]+$/, '');
  return clean.startsWith(`${BASE}/`) ? clean : `${BASE}/${clean}`;
}

/** Optimized video delivery URL (auto format + quality). */
export function cldVideo(id: string): string {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto/${cldId(id)}.mp4`;
}

/** A still poster generated from the video itself at `frame` seconds. */
export function cldVideoPoster(id: string, frame = 2, width = 1280): string {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_${frame},f_auto,q_auto,w_${width},c_fill/${cldId(id)}.jpg`;
}
