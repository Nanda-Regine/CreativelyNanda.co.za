/**
 * <Stock>: print a section on one of the four house papers.
 *
 *   <Stock paper="parchment">…</Stock>              textured beige, the page
 *   <Stock paper="navy" edge="slant">…</Stock>       a navy band sliding under
 *   <Stock paper="cherry" as="aside">…</Stock>       the cherry band
 *
 * THE BALANCE RULE (Nanda, 2026-09-29): navy, beige and cherry in EQUAL
 * measure on every page, none more than the others. Long runs of sections or
 * list items rotate with rhythm(i); measure with C:/pw/balance.mjs.
 *
 * Everything inside reads its colours from the paper (see app/stock.css), so
 * `t-head`, `t-ink`, `t-gold` and the Forge's `ink()` are correct on any stock.
 * Server-safe: no hooks, so server pages can use it directly.
 */

import { cldImg } from '@/lib/cloudinary';

export type Paper = 'parchment' | 'bone' | 'navy' | 'cherry';

/** The house rhythm: beige, navy, cherry, in turn. */
export const RHYTHM: readonly Paper[] = ['parchment', 'navy', 'cherry'];

/** The paper for the i-th band in a run. `start` shifts where the run begins. */
export const rhythm = (i: number, start = 0): Paper => RHYTHM[(i + start) % RHYTHM.length];

/** The Press marble. Under the cream veil it reads as laid paper, not stone. */
export const PAPER_TEXTURE = 'creativelynanda/backgrounds/download-29';
/** The navy and gold botanical, for navy bands that should feel woven, not flat. */
export const NAVY_TEXTURE = 'creativelynanda/backgrounds/download-41';
/** Crimson and gold petals, for the cherry block. */
export const CHERRY_TEXTURE = 'creativelynanda/backgrounds/petal';

const DEFAULT_TEXTURE: Record<Paper, string | null> = {
  parchment: PAPER_TEXTURE,
  bone: null,
  navy: NAVY_TEXTURE,
  cherry: CHERRY_TEXTURE,
};

export default function Stock({
  paper,
  texture,
  edge = 'none',
  as: Tag = 'section',
  className = '',
  style,
  id,
  children,
}: {
  paper: Paper;
  /** A Cloudinary id, `false` for plain paper, or omit for the house default. */
  texture?: string | false;
  /** Cut the top edge so this paper slides under the one above it. */
  edge?: 'none' | 'slant' | 'slant-r';
  as?: 'section' | 'div' | 'aside' | 'header' | 'footer' | 'main';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
}) {
  const tex = texture === false ? null : texture ?? DEFAULT_TEXTURE[paper];
  const edgeClass = edge === 'slant' ? 'edge-slant' : edge === 'slant-r' ? 'edge-slant-r' : '';
  return (
    <Tag id={id} className={`stock-${paper} relative isolate overflow-clip ${edgeClass} ${className}`} style={style}>
      {tex ? <div aria-hidden className="stock-texture" style={{ backgroundImage: `url('${cldImg(tex, 1600)}')` }} /> : null}
      {tex ? <div aria-hidden className="stock-veil" /> : null}
      <div aria-hidden className="stock-grain" />
      {children}
    </Tag>
  );
}
