// ─────────────────────────────────────────────────────────────────────────────
// Feelings — the Salon's answer to star ratings.
// When a poem leaves you, you don't score it: you name how it left you. Each
// feeling carries a colour drawn from the mood-atmosphere palette, so a poem's
// accumulated feelings become its visible "aura". Curated + small on purpose —
// six doors of feeling, no paradox of choice.
// ─────────────────────────────────────────────────────────────────────────────

export interface Feeling {
  key: string;      // stored in poem_petals.feeling
  label: string;    // the button
  caption: string;  // the gentle sub-line under the label
  emoji: string;
  color: string;    // aura colour (hex) — mirrors moods-atmosphere washes
}

export const FEELINGS: Feeling[] = [
  { key: 'longing',    label: 'Longing',     caption: 'it left me reaching',       emoji: '🌙', color: '#5c1f38' },
  { key: 'tender',     label: 'Tender',      caption: 'it softened something',     emoji: '🌸', color: '#C4566A' },
  { key: 'seen',       label: 'Seen',        caption: 'it knew me',                emoji: '✨', color: '#C9A84C' },
  { key: 'undone',     label: 'Undone',      caption: 'it broke me open',          emoji: '🌧️', color: '#332f52' },
  { key: 'emboldened', label: 'Emboldened',  caption: 'it lit my fire',            emoji: '🔥', color: '#6e5216' },
  { key: 'at-peace',   label: 'At peace',    caption: 'it laid me down gently',    emoji: '🕊️', color: '#16304f' },
];

const FEELING_BY_KEY: Record<string, Feeling> = Object.fromEntries(
  FEELINGS.map((f) => [f.key, f])
);

export function getFeeling(key: string | null | undefined): Feeling | null {
  return key ? FEELING_BY_KEY[key] ?? null : null;
}

export function isValidFeeling(key: unknown): key is string {
  return typeof key === 'string' && key in FEELING_BY_KEY;
}

// Given a tally of feelings, return the dominant one (the poem's aura).
export function dominantFeeling(
  counts: { feeling: string; count: number }[]
): Feeling | null {
  const top = counts
    .filter((c) => c.feeling && isValidFeeling(c.feeling))
    .sort((a, b) => b.count - a.count)[0];
  return top ? getFeeling(top.feeling) : null;
}
