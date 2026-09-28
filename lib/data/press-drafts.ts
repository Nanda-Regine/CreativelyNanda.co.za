/**
 * ✍️ The drafts — an essay's revision history, for the Draft Diff.
 *
 * BUILD_JOURNEY §19.3: "Each essay's colophon + a slider that plays the
 * revision history as diffs. Version control for prose — only the poet who
 * codes can print that."
 *
 * ── THE RULE ──────────────────────────────────────────────────────────────────
 * Only real drafts go here. An essay with no entry shows no slider and claims
 * no draft count. A reconstructed "draft" would be exactly what the Honours
 * Hall and the Forge exist to refuse. The machinery shipped empty on purpose
 * (decided 2026-09-28) and fills as drafts are found.
 *
 * ── ADDING AN ESSAY'S DRAFTS ──────────────────────────────────────────────────
 * 1. Key by the post's slug (as in its URL).
 * 2. List the drafts oldest first. Don't add the published version: it is read
 *    from Supabase and is always the last step of the slider.
 * 3. `date` is when that draft was written (YYYY-MM-DD). `note` is optional, one
 *    line in her words about what changed or why ("cut the opening; it was
 *    throat-clearing").
 * 4. Paste the text as markdown in a template literal. Escape any backtick as \`.
 *
 * Kept as a bundled module rather than files read with `fs`, because a runtime
 * `fs` read inside an ISR route is not reliably traced into the Vercel build.
 */

export interface Draft {
  date: string;
  note?: string;
  content: string;
}

export const DRAFTS: Record<string, Draft[]> = {
  // 'poetry-algorithm-of-feeling': [
  //   { date: '2026-05-30', note: 'First pass, written on the train.', content: `...` },
  //   { date: '2026-06-04', note: 'Cut the opening — it was throat-clearing.', content: `...` },
  // ],
};
