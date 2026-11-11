/**
 * A horizontal snap rail of screens. The rail scrolls inside its own box
 * (min-w-0, overflow-x-auto), so the page itself never scrolls sideways.
 * Each item's poster is a screen id; the alt text comes from screens.json.
 */

import DeskFrame from './DeskFrame';
import { ink } from '../ForgeChrome';

interface Item {
  poster: string;
  alt: string;
  caption: string;
}

export default function Reel({ items }: { items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <div className="w-full min-w-0 max-w-full">
      <div
        role="region"
        aria-label="Screen reel, scroll sideways to see more"
        tabIndex={0}
        className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-ink)] motion-safe:scroll-smooth"
      >
        {items.map((it) => (
          <div key={it.poster} className="m-0 w-[84%] shrink-0 snap-start sm:w-[26rem]">
            <DeskFrame screenId={it.poster} />
            <p className="m-0 mt-2 text-sm leading-snug" style={{ color: ink(0.82) }}>
              {it.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
