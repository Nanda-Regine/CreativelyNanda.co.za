/**
 * Three to five screens. Under md they are a plain vertical stack; from md up
 * they fan out like papers on a desk and the one under the pointer or focus
 * comes to the front and lies flat. The fan is pure CSS behind motion-safe, so
 * reduced motion gets the still arrangement with no transition.
 */

import DeskFrame from './DeskFrame';

export default function DeskStack({ screenIds }: { screenIds: string[] }) {
  const ids = screenIds.slice(0, 5);
  const n = ids.length;
  if (n === 0) return null;
  const span = n > 1 ? n - 1 : 1;

  return (
    <div className="flex flex-col gap-6 md:relative md:block md:aspect-[16/11] md:gap-0">
      {ids.map((id, i) => {
        const vars = {
          ['--l' as string]: `${(i * 30) / span}%`,
          ['--t' as string]: `${(i * 22) / span}%`,
          ['--r' as string]: `${(i - (n - 1) / 2) * 2.4}deg`,
          zIndex: i + 1,
        } as React.CSSProperties;
        return (
          <div
            key={id}
            style={vars}
            className="md:absolute md:left-[var(--l)] md:top-[var(--t)] md:w-[70%] md:[transform:rotate(var(--r))] motion-safe:md:transition-transform motion-safe:md:duration-500 md:hover:!z-30 md:hover:[transform:rotate(0deg)] md:focus-within:!z-30 md:focus-within:[transform:rotate(0deg)]"
          >
            <DeskFrame screenId={id} priority={i === 0} />
          </div>
        );
      })}
    </div>
  );
}
