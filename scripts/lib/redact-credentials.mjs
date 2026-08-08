/**
 * Credential scrubbing for the Forge corpus.
 *
 * WHY THIS EXISTS — the incident, 2026-08-08:
 * GitHub push protection rejected the first Forge commit. `forge-corpus.json`
 * carried a live **Supabase Personal Access Token**, ingested verbatim out of
 * BB MotherShip's build journal — and the ingest's sensitivity probe had scored
 * that section `sensitive: false`.
 *
 * Two independent failures, both worth keeping in mind:
 *
 * 1. The probe matched VOCABULARY ("api_key", "secret", "token"), never the
 *    SHAPE of a credential. A journal that pastes a token without narrating it
 *    reads as clean prose.
 * 2. `\btoken\b` does not match `ACCESS_TOKEN`. Underscore is a word character,
 *    so there is no word boundary between `_` and `T` — and `NAME_TOKEN=value`
 *    is precisely the form a build journal records credentials in. The same hole
 *    existed for `\bsecret\b`, `\bpassword\b` and `\bpassphrase\b`.
 *
 * The lesson generalises past this script: a probe that looks for the WORDS
 * people use around secrets will always lose to a paste. Match the artefact.
 *
 * This module is deliberately shared by forge-ingest (scrub at write time) and
 * forge-curate (scrub an already-written corpus), so the two can never drift.
 */

/**
 * Credential shapes. Ordered most-specific first — `OpenAI key` would otherwise
 * swallow the Stripe and Anthropic prefixes.
 *
 * Everything here is redacted unconditionally and forces `sensitive: true`.
 * There is no review path for a raw credential: a human approving one by hand
 * is a mistake, not a decision, so the gate does not offer the option.
 */
export const CREDENTIAL_PATTERNS = [
  ['Supabase PAT', /sbp_[a-f0-9]{40}/g],
  ['Supabase publishable key', /sb_(publishable|secret)_[A-Za-z0-9_-]{20,}/g],
  ['JWT', /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g],
  ['Anthropic key', /sk-ant-[A-Za-z0-9_-]{20,}/g],
  ['Stripe key', /[rs]k_(live|test)_[A-Za-z0-9]{20,}/g],
  ['OpenAI key', /\bsk-[A-Za-z0-9]{32,}/g],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{30,}/g],
  ['Google API key', /\bAIza[A-Za-z0-9_-]{30,}/g],
  ['Slack token', /\bxox[abprs]-[A-Za-z0-9-]{10,}/g],
  ['AWS access key', /\bAKIA[A-Z0-9]{16}\b/g],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  // Assignment of a long opaque value to a credential-shaped name. Catches the
  // `SERVICE_ROLE_KEY=<40 chars>` form that carries no recognisable prefix.
  [
    'Assigned credential',
    /((?:api[_-]?key|secret|token|password|passphrase|service[_-]?role[_-]?key|access[_-]?key)\s*[:=]\s*)["']?[A-Za-z0-9_\-.]{24,}["']?/gi,
  ],
];

/**
 * Vocabulary probe — the softer signal that routes a section to human review
 * rather than redacting it. Underscore-safe: `[\w]*token[\w]*` style boundaries
 * instead of `\b`, so `ACCESS_TOKEN` and `DB_PASSWORD` are caught.
 */
export const SENSITIVE_VOCAB =
  /(api[_ -]?key|secret|token|passphrase|credential|service[_ -]?role|\.env|password|exposure|impersonat|invoice|salary|R\d{2,3},\d{3})/i;

/**
 * Replace every credential-shaped string with a labelled placeholder.
 * The placeholder is deliberately readable — a reader of the Scar Room should
 * see that a key was here and was removed, which is more honest than a body
 * that silently skips a line.
 *
 * @returns {{ text: string, found: string[] }} found = credential type names
 */
export function scrubCredentials(text) {
  if (!text) return { text, found: [] };
  let out = text;
  const found = [];
  for (const [name, re] of CREDENTIAL_PATTERNS) {
    // Fresh lastIndex per call — these are module-level /g regexes.
    re.lastIndex = 0;
    if (!re.test(out)) continue;
    re.lastIndex = 0;
    found.push(name);
    out = out.replace(re, (match, ...groups) =>
      // The assigned-credential pattern keeps its `NAME=` prefix so the sentence
      // still parses; every other pattern is replaced whole.
      typeof groups[0] === 'string' && match.startsWith(groups[0])
        ? `${groups[0]}[REDACTED — ${name}]`
        : `[REDACTED — ${name}]`
    );
  }
  return { text: out, found };
}

/** True if the section should go to a human rather than straight to a room. */
export const isSensitive = (...parts) => parts.some((p) => p && SENSITIVE_VOCAB.test(p));
