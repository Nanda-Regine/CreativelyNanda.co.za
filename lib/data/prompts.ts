// ─────────────────────────────────────────────────────────────────────────────
// Writing prompts for The Circle — the thing that kills the blank page.
//   kind: 'seed'  → a first line to finish (we can pre-fill the composer with it)
//   kind: 'spark' → a playful constraint / instruction to write from
// Add freely; the Spin the Prompt widget draws at random.
// ─────────────────────────────────────────────────────────────────────────────
export interface WritingPrompt {
  id: string;
  kind: 'seed' | 'spark';
  text: string;
}

export const PROMPTS: WritingPrompt[] = [
  { id: 'seed-tongues', kind: 'seed', text: 'She learned to speak in two tongues —' },
  { id: 'seed-late', kind: 'seed', text: 'It is late, and my heart is still awake because…' },
  { id: 'seed-home', kind: 'seed', text: 'Home is a word my mouth remembers before my feet do —' },
  { id: 'seed-mirror', kind: 'seed', text: 'In the mirror this morning I finally saw…' },
  { id: 'seed-rose', kind: 'seed', text: 'There is a rose inside me that only opens when…' },
  { id: 'seed-name', kind: 'seed', text: 'They named me for a woman I never met, and still…' },
  { id: 'seed-leaving', kind: 'seed', text: 'The day I stopped waiting for permission,' },

  { id: 'spark-three', kind: 'spark', text: 'Write a whole poem in exactly three lines.' },
  { id: 'spark-ubuntu', kind: 'spark', text: 'Write a poem that uses the word “ubuntu” — without explaining it.' },
  { id: 'spark-mothertongue', kind: 'spark', text: 'Write it in your mother tongue. Any language your heart keeps.' },
  { id: 'spark-nopunct', kind: 'spark', text: 'Write a poem with no punctuation — let the breath do the work.' },
  { id: 'spark-colour', kind: 'spark', text: 'Pick one colour and let it carry the whole poem.' },
  { id: 'spark-kitchen', kind: 'spark', text: 'Set your poem in a kitchen. Make the ordinary holy.' },
  { id: 'spark-goodbye', kind: 'spark', text: 'Write a goodbye you never got to say.' },
  { id: 'spark-body', kind: 'spark', text: 'Name one part of your body and tell its story.' },
  { id: 'spark-small', kind: 'spark', text: 'Write about the smallest thing you love. Only that.' },
  { id: 'spark-praise', kind: 'spark', text: 'Write a praise poem for someone who raised you.' },
];

// Deterministic-free pick, safe on the client.
export function randomPrompt(excludeId?: string): WritingPrompt {
  const pool = excludeId ? PROMPTS.filter((p) => p.id !== excludeId) : PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
