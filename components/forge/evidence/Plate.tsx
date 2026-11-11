/**
 * A photographic plate with a caption. If people are recognisable and there is
 * no consent on file, the photo is not rendered at all, only a labelled card.
 */

import { GOLD_INK, ink } from '../ForgeChrome';

interface Props {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  consent: 'given' | 'none';
  facesVisible?: boolean;
}

export default function Plate({ src, alt, caption, credit, consent, facesVisible = false }: Props) {
  const withheld = consent === 'none' && facesVisible;

  return (
    <figure className="m-0 w-full">
      {withheld ? (
        <div
          role="img"
          aria-label="Photo withheld pending consent"
          className="flex min-h-[12rem] items-center justify-center p-6 text-center"
          style={{ border: `1px dashed ${ink(0.35)}`, background: ink(0.05) }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: ink(0.78) }}>
            Photo withheld pending consent
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
          style={{ border: `1px solid ${ink(0.14)}` }}
        />
      )}
      <figcaption className="mt-2 text-sm leading-snug" style={{ color: ink(0.82) }}>
        {caption}
        {credit ? (
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: GOLD_INK }}>
            {credit}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
