/**
 * The Scar Room.
 *
 * `docs/THE_FORGE.md` §5.5 — the highest-trust room on the site, and the only
 * one Mirembe Muse could never host, because a services site cannot admit
 * failure. It is also the room the spec is most emphatic cannot be generated:
 *
 *   > This room cannot be auto-populated. `class === 'scar'` has 30 entries and
 *   > spot-checking shows real contamination … Hand-pick roughly 20. The
 *   > classifier's job here is to produce a candidate list, not the room.
 *
 * The classifier produced twelve candidates. Six of them are here, rewritten;
 * six were left out, including one — a long "fixed with evidence" section — that
 * turned out to contain a real person's name in the middle of a database bug.
 * That section scored well on every automated signal available. It is the reason
 * the gate is written default-deny and the reason nothing on this page came
 * through a filter alone.
 *
 * §6 of the open questions is also settled here: **the room does not pad to
 * twenty.** Nine entries that each explain a cause beat twenty that mostly
 * describe an inconvenience.
 *
 * ── SHAPE ─────────────────────────────────────────────────────────────────────
 * Each entry answers five questions in the same order, because that order is
 * what makes a postmortem readable: what broke · how it was found · the actual
 * cause · the fix · what it cost.
 *
 * There is no `lesson` field, deliberately. Some of these generalise and say so
 * inside `cause`; some are just an expensive night. A moral bolted onto the end
 * of every one of them would make the honest ones sound like the marketing.
 */

export interface Scar {
  slug: string;
  /** The headline. Should read like a sentence, not a ticket title. */
  title: string;
  /** Which build. `null` for the ones that happened to the tooling itself. */
  build: string;
  /** Links to /forge/floor/[slug] when the build has a dossier. */
  buildSlug?: string;
  /** Roughly when. Omitted where the journal does not date it. */
  when?: string;
  /** One line, for the index. */
  summary: string;
  broke: string;
  found: string;
  cause: string;
  fix: string;
  cost: string;
  /** The artefact, where seeing it is faster than reading about it. */
  code?: string;
  /**
   * True where the entry exists in no build journal and was written for this
   * room. The three the spec names are the best three precisely because nobody
   * had had to explain them to anyone yet.
   */
  written?: boolean;
}

export const SCARS: Scar[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'four-dashboards',
    title: 'The one bug that killed four dashboards',
    build: 'JarvisOS',
    buildSlug: 'jarvisos',
    when: 'Found 29 July 2026 · started 29 June, 14:45 UTC',
    summary:
      'A pagination default returned the newest user instead of the owner, and six background workers spent a month succeeding at nothing.',
    broke:
      'The app health matrix went to "unknown". The system summary went dormant, performance intelligence went inactive, engineering alerts stopped, and most of the evolution view emptied out. Four dashboards, all wrong, all at once — and none of them reporting an error.',
    found:
      'By looking at a write rate rather than at a dashboard. The health-check cron had been writing about ninety-six rows a day and was writing zero. The drop was not a slope, it was a cliff — one minute of one day — and a cliff has a cause you can go and find.',
    cause:
      'The workers resolved "the owner" by asking the auth admin API for the first user. That call returns users newest-first. For eight months there was only one user, so the query was correct by accident. The moment the first collaborator account was created, six workers began resolving the collaborator as the tenant — an account that owns no monitored apps — and each one did exactly what it was told: found nothing to do, and stopped. Every run returned success.',
    fix:
      'One shared owner constant, imported by all six workers — health-check, security-scan, SLA report, digest, client-onboard and the competitor snapshot — so that the identity of the owner is stated once and cannot be re-derived differently in six places. And a subscriber to the queue\'s own failure event, plus a freshness sweep over the heartbeat tables, so that "this worker has produced nothing for six hours" is itself an alert.',
    cost:
      'A month of blind monitoring, and the discovery that the entire observability layer had been reporting the absence of data as the absence of problems.',
    code: `// the whole bug
supabase.auth.admin.listUsers({ perPage: 1 })
// → returns users NEWEST-first.
// Correct for eight months. Wrong from 29 June, 14:45 UTC.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'inspector-was-lying',
    title: 'My own inspector was lying, and I fixed the code it was lying about',
    build: 'JarvisOS',
    buildSlug: 'jarvisos',
    when: '27 July 2026',
    summary:
      'An automated layout check reported thirteen truncated decks. The measurement was wrong, and two real clamps were widened on its evidence before anyone checked it.',
    broke:
      'Thirteen generated assets across seven brands were flagged as having truncated text. They looked fine.',
    found:
      'By the shape of the failures rather than by any one of them. Thirteen flags, all the same kind, across brands with nothing else in common — that is a pattern in the instrument, not in the subject. The confirmation was a two-line deck measuring as nearly five lines.',
    cause:
      'The element being measured is a grown flex item — `flex: 1 1 auto` — so inside a tall panel it stretches to fill the space. Its `scrollHeight` therefore reports the stretched box, not the text inside it. Every sixteen-by-nine module with a tall panel was a guaranteed false positive, and the measurement was most wrong exactly where the layout had the most room.',
    fix:
      'The inspector now releases the stretch before it measures — sets the item to `flex: 0 0 auto; height: auto`, takes the reading, puts it back. And the deck clamp that had been widened on the bad evidence was reverted. The headline clamp stayed where it was, because that one had been seen clipping in an actual rendered image first.',
    cost:
      'Two changes to production layout made on a false reading. After the fix six flags survived and were real, and they pointed at a genuine content law — past about a hundred and fifteen characters, a deck overflows the panel. That got fixed by trimming the copy rather than widening the clamp, because the format is the constraint.',
    code: `// before: measuring a stretched box
const lines = el.scrollHeight / lineHeight;   // 4.87 for a two-line deck

// after: release the stretch, then measure
el.style.flex = '0 0 auto';
el.style.height = 'auto';`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'payfast-signature',
    title: 'Sorting the keys broke every payment',
    build: 'CreativelyNanda',
    buildSlug: 'creativelynanda',
    when: 'Fixed 9 March 2026',
    summary:
      'Signature generation sorted its fields alphabetically. The gateway verifies in the order the form was posted.',
    broke:
      'Checkout. Every attempt failed signature verification at the gateway, which is the failure mode that looks least like a code bug — the site is fine, the form submits, the money does not move.',
    found:
      'By reading the gateway\'s verification order rather than its field list. The documentation says which fields go into the signature; the behaviour depends on what order they arrive in, and those are different questions.',
    cause:
      'The signature is an MD5 of the concatenated form fields. The implementation called `.sort()` before building that string, on the reasonable assumption that a canonical order should be canonical. But the gateway signs what the browser posts, and a browser posts in the order the form is written — which is object insertion order, not alphabetical. Every signature was a valid hash of the wrong string.',
    fix:
      'Delete the `.sort()`. The builder already constructs the payload in the gateway\'s documented field order — merchant details, then URLs, then buyer, then transaction — so preserving insertion order is both correct and the thing that makes the order readable in the source.',
    cost:
      'The single most critical bug in the project, and a reminder that a hash mismatch tells you nothing about which side is wrong. Same class of bug reappeared twice more across the other builds in different clothing: an untrimmed passphrase, and a non-ASCII dash in an item name.',
    code: `// BROKEN — canonical, and wrong
const params = Object.keys(data)
  .sort()
  .filter(k => k !== 'signature' && data[k] !== '')
  .map(k => \`\${k}=\${phpUrlencode(data[k])}\`)
  .join('&');`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'silent-corpus-loss',
    title: 'The tool that built this room lost a journal and said nothing',
    build: 'The Forge itself',
    when: '7 August 2026',
    written: true,
    summary:
      'One TLS timeout dropped a 51 KB build journal. The ingest wrote a smaller corpus, reported success, and was believed.',
    broke:
      'The corpus that feeds this entire wing. One of the source journals — fifty-one kilobytes, an app\'s whole history — simply was not in it.',
    found:
      'By a number being smaller than the last time it was looked at. Nothing else surfaced it: the script exited zero, wrote a valid file, and printed a section count that was plausible because nobody had memorised the previous one.',
    cause:
      'A single fetch to one source failed with a TLS timeout. It was caught, logged at a level nobody was reading, and the loop continued. The output was then written from whatever had been collected — which is the bug. A partial read and a complete read produced the same kind of file, so there was nothing downstream to notice with.',
    fix:
      'Retries with backoff on every fetch, and — the part that actually matters — the script now refuses to write at all if any source failed or if fewer sources came back than were asked for. A smaller corpus is no longer a possible output. The same rule is built into the repository ingest that came after it: if any repository errors, nothing is written.',
    cost:
      'A rebuild, and the sharper realisation that this was the second time the same shape of bug had appeared in a month — a job that no-ops successfully. The dashboards one and this one are the same bug in different systems. Whatever a pipeline does when it is starved, it must not be "finish quietly".',
    code: `// the rule that came out of it
if (errors.length || builds.length < BUILDS.length) {
  console.error('refusing to write a partial corpus');
  process.exit(1);
}`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'the-filter-that-deleted-the-room',
    title: 'The privacy filter that looked strict and was deleting the room',
    build: 'The Forge itself',
    when: '12 August 2026',
    written: true,
    summary:
      'A case-insensitive regex threw away four out of five publishable commit messages, including the good ones, while appearing to do careful work.',
    broke:
      'The Commit Wall, before it had ever been seen. Of a hundred and forty-one lines that cleared every other check, a hundred and eleven were being withheld as "private matter" — and the room was quietly not worth building.',
    found:
      'By adding a flag to the ingest that prints what it withheld and under which rule. The first line in the output was `docs: journal + memory handoff for the alpha run`, filed under "names a person". That is not a person.',
    cause:
      'Two separate mistakes, and the second one hid the first. The rule meant to catch a named individual was `for [A-Z][a-z]+ [A-Z][a-z]+` — "for Firstname Surname" — and it was compiled into a regex built with the case-insensitive flag, alongside a dozen rules that genuinely needed it. Under `i`, `[A-Z]` matches lowercase. The rule was really "the word for, followed by any two words", which is most English sentences. Separately, a second filter was matching the topic of security rather than the disclosure of it, and was throwing away road-sign codes (`R111`, `R118`) as if they were salary figures.',
    fix:
      'Split the expression. Anything whose meaning depends on capitalisation gets its own case-sensitive regex and cannot be folded in with the rest. The security rule was narrowed from nouns to disclosure — an exposure, a leak, a key that needs rotating — so that "trim the passphrase before verifying the signature" survives and "four live exposures closed" does not.',
    cost:
      'Nothing shipped wrong, because the flag was added before the room was. The interesting part is the failure mode: an over-blocking filter produces no error, no warning and no visible symptom. It looks like caution. The pressure it creates is to loosen the whole thing at once, which is how a filter that was too strict on Monday is switched off on Tuesday.',
    code: `// the bug, in one line
new RegExp('for [A-Z][a-z]+ [A-Z][a-z]+', 'i')
// under /i, [A-Z] matches lowercase.
// matches "for Firstname Surname" — and "for the alpha run".`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'hydration-class',
    title: 'React 425 was never one bug',
    build: 'CreativelyNanda',
    buildSlug: 'creativelynanda',
    written: true,
    summary:
      'The same hydration error kept returning with a different face, and got fixed three times before it was recognised as a class.',
    broke:
      'Minified React errors 425 and 422 in production — a hydration mismatch — appearing site-wide, then on one page, then site-wide again over a period of months.',
    found:
      'Only properly on the third occurrence, by noticing that the three "different" bugs had the same sentence at the centre of them: something was evaluated during render whose value differs between the server and the browser.',
    cause:
      'Three surfaces, one rule broken. The footer called `new Date().getFullYear()` in render, so a page built before midnight and hydrated after it disagreed with itself. An inline style block was emitted in a way that differed between passes. A component reached for a random value at render time. Each was individually reasonable and each was the same mistake.',
    fix:
      'The fix per site is small — move it to an effect with a stable fallback, or make the value deterministic. The fix that mattered was writing the rule down where the next person would hit it: nothing that can differ between server and client may be evaluated during render, and the three usual suspects are dates, randomness and injected style.',
    cost:
      'Three separate investigations for one rule, and an unknown number of visitors served a page that flickered back to a server-rendered state. The generalisable part is not about React: a bug fixed three times in three places was never three bugs, and the third fix is the signal that the class has not been named yet.',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'deterministic-recorder',
    title: 'You cannot record a smooth animation in real time',
    build: 'JarvisOS',
    buildSlug: 'jarvisos',
    when: '3 August 2026',
    summary:
      'Screen recording dropped compositor frames, so every spring animation rendered as a glitch. The fix was to stop recording and start rendering.',
    broke:
      'Every product walkthrough video. Framer springs — the thing the animations exist for — came out as stutter, on a laptop that could not be upgraded mid-build.',
    found:
      'By watching the output rather than trusting the tool. A realtime recorder that drops frames does not report dropped frames; it reports a finished video.',
    cause:
      'Realtime capture is at the mercy of whatever else the machine is doing. If the compositor misses a frame it is gone, and a spring is exactly the kind of motion where a missing frame is visible.',
    fix:
      'Stop capturing in real time. A virtual clock owns the page\'s animation frames and its performance timer, scroll position is computed per frame outside the browser, one screenshot is taken per frame through the debug protocol, and the frames are assembled at a constant rate. The video is rendered, not recorded, so there is no such thing as a dropped frame.',
    cost:
      'Seven distinct sub-bugs, each of which had to be found and encoded into the script, and which together are a fair picture of what "just automate the screenshots" actually contains.',
    code: `// the seven, as they are written in the file
1. the virtual clock must micro-advance unbounded per read —
   a busy-wait spins forever on a frozen clock, and a crawl cap
   just moves the hang to any wait longer than the cap
2. screenshots return CSS pixels unless clip.scale is set, and
   clip coords are PAGE-absolute — y must track scrollY, or black frames
3. optimizeForSpeed wedges the capture pipeline a few frames in
4. a 1px damage dot alternating #000/#010101 every tick guarantees
   the compositor always has a frame to hand over
5. timers over ~5s are swallowed once recording starts — 20s of
   virtual time stretches over minutes of real time, long enough
   for a timed redirect to destroy the page mid-capture
6. frame temp dirs must live outside the repo — OneDrive sync
   EPERMs the cleanup
7. a stalled capture duplicates the previous frame (invisible at
   30fps); 60 consecutive duplicates aborts the page`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'capture-scars',
    title: 'My screenshot tool ate an app\'s navigation',
    build: 'JarvisOS',
    buildSlug: 'jarvisos',
    when: '2–3 August 2026',
    summary:
      'A heuristic that removes floating widgets before a screenshot removed a mobile app\'s entire bottom navigation, because at 390 pixels a navigation bar looks like a widget.',
    broke:
      'Every mobile capture of K53 Drill Master, silently — the screenshots were clean, well-composed and missing the product\'s main navigation.',
    found:
      'By looking at the pictures. There is no automated check for "this screenshot is missing something that should be in it", which is the whole difficulty with generated visual assets.',
    cause:
      'The widget stripper identifies floating corner elements by size — anything under a threshold is chat bubbles, cookie bars, feedback tabs. On a 390-pixel viewport a bottom navigation bar is under that threshold. The heuristic was written on desktop, where the assumption holds, and mobile was never a different code path so nothing flagged the change of context.',
    fix:
      'The size threshold became relative — capped at a fraction of the viewport width rather than an absolute pixel count — so it scales with the device instead of assuming one.',
    cost:
      'A batch of unusable assets, and four more findings from the same session that are worth as much as the fix: screenshots hang forever on infinite CSS animations unless animations are disabled; heavy pages exhaust a shared renderer on this machine, so each capture needs its own browser context; live schema drift means the seeded data a capture depends on can be silently wrong; and two routes that were being captured as product pages were actually auth-gated, so every "public" capture of them was a photograph of the login screen.',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'security-posture',
    title: 'On the ones that are not written up here',
    build: 'Across the builds',
    written: true,
    summary:
      'Why this room contains no live security write-ups, and what can honestly be said instead.',
    broke:
      'Nothing, in the sense this room usually means. This entry exists because the build journals contain sixty-five sections about security work — audits, exposures found and closed, hardening passes — and none of them is on this page.',
    found:
      'In curation, deciding what a room called The Scar Room owes its reader.',
    cause:
      'Two reasons, and only the first is about risk. These applications are still running, and a detailed account of a hole that was closed is a detailed account of where to look at the version that has not been updated. The second reason is about register: an engineer publishing a list of the vulnerabilities she found in her own systems is not being candid, she is being congratulated. The failures worth reading about are the ones that cost something, and finding your own bug before anyone else does costs an afternoon.',
    fix:
      'What can be said without either problem is the shape of the mistakes, which is the useful part anyway. All of them were the same kind: a boundary that existed in the application and not in the database. A tenant filter in a query rather than a row-level policy. A check in the interface rather than in the endpoint. A limit enforced where a user could see it rather than where a user could not reach. Every one of those is safe until exactly one handler forgets, and the fix in each case was to move the rule down a layer, to somewhere that a forgotten `where` clause returns nothing instead of everything.',
    cost:
      'One real incident, and it is worth naming because it was a tooling failure rather than an application one: an early version of the corpus ingest carried a live credential out of a source journal and into a file that was about to be committed. The platform\'s push protection caught it. A follow-up sweep found a second credential that push protection had not caught. The probe at fault had been looking for the words people write around secrets — `api_key`, `token` — rather than for the shape of a secret, and it had a subtler hole underneath that: `\\btoken\\b` does not match `ACCESS_TOKEN`, because an underscore is a word character and there is no boundary before it. That is precisely the form every environment file uses. Both credentials were rotated at the provider — redacting the derivative does nothing about the original.',
  },
];

export const SCAR_BY_SLUG = Object.fromEntries(SCARS.map((s) => [s.slug, s])) as Record<string, Scar>;
