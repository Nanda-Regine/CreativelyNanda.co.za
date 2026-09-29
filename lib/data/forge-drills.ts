/**
 * 🥋 The Dojo — drills.
 *
 * `docs/THE_FORGE.md` filed the Dojo as Phase B, blocked on 74 drills living in
 * JarvisOS's `engineering_dojo_drills` table behind a bridge that does not
 * exist. The Revolution Plan (BUILD_JOURNEY §19.2) found the way round it:
 *
 *   > No mocked source needed: the scars ARE the drills.
 *
 * Every drill here is one real entry from `forge-scars.ts`, turned round so the
 * reader meets it the way it was met — as a symptom, with no cause attached —
 * and has to commit to a diagnosis before being shown the real one.
 *
 * ── WRITING RULES ─────────────────────────────────────────────────────────────
 *
 * 1. **The symptom must not contain the answer.** It says what was seen, never
 *    why. If a reader could pick the right option by matching words from the
 *    symptom, the drill is a reading test, not a diagnosis.
 * 2. **Every wrong option is a hypothesis a competent engineer would actually
 *    have**, and its `why` says what evidence in the symptom rules it out. The
 *    wrong answers are where the teaching is — a drill whose distractors are
 *    silly teaches nothing about the three minutes before the right idea.
 * 3. **Nothing about her systems is invented.** The wrong options are ruled out
 *    by what the symptom says, not by new facts about the build. Where a claim
 *    about the real system is made, it is one the scar itself makes.
 * 4. **The right answer's position varies**, and is written, not shuffled —
 *    random order at render time is a hydration mismatch (see the scar on it).
 *
 * The essay entry (`security-posture`) is not drilled. It is not an incident.
 */

export interface DrillOption {
  text: string;
  correct?: boolean;
  /** Why this is, or is not, the cause — from the evidence in the symptom. */
  why: string;
}

export interface Drill {
  /** The scar this drill is. Links to /forge/scars#{scar}. */
  scar: string;
  /** Short, and only what was observed. */
  symptom: string;
  /** Held back until asked for. The first thing an experienced eye would check. */
  trace: string;
  options: DrillOption[];
}

export const DRILLS: Drill[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'payfast-signature',
    symptom:
      'Every checkout fails signature verification at the payment gateway. The form submits, the field values are right, the passphrase is set and trimmed. The hash simply never matches, not once, for any order.',
    trace:
      'The signature is an MD5 of the fields joined as key=value&key=value. The code builds that string from the same object it builds the form from.',
    options: [
      {
        text: 'URL-encoding differs from the gateway’s, spaces as %20 where it expects +.',
        why: 'A real trap with this gateway, and worth checking. But an encoding mismatch only bites on values that contain a space or a special character. This failed on every order, including ones with nothing to encode.',
      },
      {
        text: 'The keys are sorted alphabetically before hashing. The gateway hashes them in the order the form posts them.',
        correct: true,
        why: 'A browser posts fields in the order the form is written. `.sort()` produced a perfectly valid hash of a string the gateway never built. Every signature was right about the wrong thing.',
      },
      {
        text: 'The hash is computed over the wrong character encoding.',
        why: 'That would only diverge on non-ASCII characters, and a non-ASCII dash in an item name did cause the same symptom on a later build. Here it failed on plain ASCII orders too, so encoding can’t be the whole story.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'four-dashboards',
    symptom:
      'Four monitoring dashboards go quiet on the same afternoon: the health matrix reads “unknown”, alerts stop, the summaries go dormant. There is no error anywhere. Every background job is still running on schedule and reporting success.',
    trace:
      'The health-check job had been writing about ninety-six rows a day. It dropped to zero in one minute, not a slope, a cliff. Earlier that same day, a second user account was created for a collaborator.',
    options: [
      {
        text: 'The job queue died and its failures were being swallowed.',
        why: 'A dead queue produces no runs at all. These jobs ran on time, every time, and returned success. The runs were fine. What they did was nothing.',
      },
      {
        text: 'Row-level security began rejecting the workers’ inserts.',
        why: 'The classic silent database failure, and a good first guess. But a rejected insert is an error on the insert, and there were no errors. These jobs never reached an insert. They found nothing to do and stopped.',
      },
      {
        text: 'The workers find “the owner” by asking for the first user, and that list comes back newest-first.',
        correct: true,
        why: 'Correct by accident for eight months, while there was only one user. From the minute the collaborator existed, six workers resolved the wrong tenant, found no apps to monitor, and faithfully did nothing. The cliff’s timestamp is the account’s creation time.',
      },
      {
        text: 'A deploy that afternoon changed the cron schedules.',
        why: 'A schedule change moves or removes runs. The runs didn’t move, and they still completed. The rows stopped because each run found nothing to write.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'hydration-class',
    symptom:
      'Minified React error 425, a hydration mismatch, in production. It gets fixed. Months later it is back on a different page. Fixed again. Then site-wide again.',
    trace:
      'The three fixes touched a footer, an inline style block, and a decorative component. They had no code in common.',
    options: [
      {
        text: 'A browser extension is rewriting the DOM before React hydrates.',
        why: 'The most common cause of 425 in the wild, and it produces exactly this error. But an extension is per-visitor. It doesn’t come back site-wide for everyone, and it doesn’t go away when you change your own code.',
      },
      {
        text: 'The server and client bundles are on different React versions.',
        why: 'That fails on every page, on every load, from the first deploy onward. It doesn’t come and go over months.',
      },
      {
        text: 'It was never one bug. Each time, something was evaluated during render that differs between server and browser: a date, a random value, an injected style.',
        correct: true,
        why: 'The footer called `new Date().getFullYear()` in render, and a page built before midnight but hydrated after it disagreed with itself. The three fixes were right. What was missing was the name of the class, and a bug fixed three times in three places is the signal that the class hasn’t been named yet.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'silent-corpus-loss',
    symptom:
      'The corpus that feeds this whole wing is smaller than it was last time. The ingest script exited 0, wrote a valid file, and printed a section count that looked plausible.',
    trace:
      'One source (fifty-one kilobytes, an entire app’s journal) is absent from the output. The log has a line about it, at a level nobody reads.',
    options: [
      {
        text: 'Cloud sync truncated the file mid-write.',
        why: 'A truncated JSON file is not valid JSON. This one parsed perfectly. It was a complete file of an incomplete read.',
      },
      {
        text: 'One fetch timed out. The error was caught and logged, the loop carried on, and the file was written from whatever had come back.',
        correct: true,
        why: 'A partial read and a full read produced the same kind of file, so nothing downstream had anything to notice with. The fix wasn’t the retry. It was refusing to write at all if any source failed. A smaller corpus is no longer a possible output.',
      },
      {
        text: 'A de-duplication step merged that journal into another one.',
        why: 'Then its sections would be in the output under another name. They weren’t there at all.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'the-filter-that-deleted-the-room',
    symptom:
      'A privacy filter over commit messages withholds 111 of 141 lines that passed every other check. Asked to print what it withheld, the first line it shows is `docs: journal + memory handoff for the alpha run`, filed under “names a person”.',
    trace:
      'The person-name rule is `for [A-Z][a-z]+ [A-Z][a-z]+`: “for Firstname Surname”. It is compiled into one regex together with a dozen other rules.',
    options: [
      {
        text: 'The filter is simply too strict. Loosen the thresholds.',
        why: 'This is the tempting answer, and the dangerous one. An over-blocking filter throws no error, so the pressure is to loosen all of it at once, and a filter that was too strict on Monday gets switched off on Tuesday. The rule wasn’t strict. It was wrong.',
      },
      {
        text: 'The combined regex has the case-insensitive flag, and under `i`, `[A-Z]` matches lowercase too.',
        correct: true,
        why: 'The rule was really “the word for, followed by any two words”, which describes most English sentences. Anything whose meaning depends on capital letters now gets its own case-sensitive regex and can’t be folded in with the rest.',
      },
      {
        text: 'A word on the blocked-names list is also a common English word.',
        why: 'A list match would flag the same word everywhere it appears. This line was flagged for its shape, “for” plus two words, and nothing in it is a name.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'inspector-was-lying',
    symptom:
      'An automated layout check flags thirteen generated decks, across seven unrelated brands, as having truncated text. Opened by eye, they look fine. One deck has two lines of text and measures as nearly five.',
    trace:
      'Every flagged deck sits in a tall panel. The element being measured is styled `flex: 1 1 auto`.',
    options: [
      {
        text: 'The web fonts hadn’t loaded, so the check measured with fallback metrics.',
        why: 'Fallback fonts shift line counts a little, and they would shift them on every asset. They don’t turn two lines into five, and they don’t pick out only the decks in tall panels.',
      },
      {
        text: 'The text really is clipped, and the renders are hiding it.',
        why: 'The right instinct, which is to trust the picture, points the other way here. The rendered images showed nothing clipped, and the one clamp that was seen clipping in a real render was kept.',
      },
      {
        text: 'The element grows to fill its panel, so `scrollHeight` measures the stretched box, not the text.',
        correct: true,
        why: 'The measurement was most wrong exactly where the layout had the most room. The inspector now releases the stretch, measures, and puts it back. Two layout changes had already been made on its evidence and were reverted.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'deterministic-recorder',
    symptom:
      'Every product walkthrough video stutters, and only where the spring animations play. The recorder reports a finished video with no dropped frames. The animations are smooth in the browser.',
    trace:
      'The same page, recorded twice, stutters in different places.',
    options: [
      {
        text: 'The spring configs are too stiff and need more damping.',
        why: 'Then they’d stutter in the browser too, and in the same place every time. They’re smooth live and stutter in different places per recording, so the fault is in the capture.',
      },
      {
        text: 'Real-time capture: when the machine is busy the compositor misses frames, and the recorder never knows they existed.',
        correct: true,
        why: 'A missed frame is simply gone, and a spring is exactly the motion where one shows. The fix was to stop recording and start rendering: a virtual clock, one screenshot per frame, assembled at a constant rate. It took seven sub-bugs to get there.',
      },
      {
        text: 'Record at a higher frame rate.',
        why: 'More frames per second from a capture that is already dropping frames just gives you more duplicates. It treats the symptom in the wrong direction.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    scar: 'capture-scars',
    symptom:
      'Mobile screenshots of K53 Drill Master come back clean, well composed, and missing the app’s bottom navigation bar. Desktop captures of the same app are complete.',
    trace:
      'Before each screenshot, a script removes floating corner elements like chat bubbles and cookie bars. It decides what counts as floating by size.',
    options: [
      {
        text: 'The nav renders after hydration, and the screenshot fires first.',
        why: 'A race is intermittent, and waiting longer fixes it. This failed on every mobile capture and never on desktop, so it’s about the viewport, not the timing.',
      },
      {
        text: 'Full-page screenshots drop fixed-position elements.',
        why: 'That would drop them at every viewport, desktop included. Only the 390-pixel captures lost anything.',
      },
      {
        text: 'The widget stripper’s size threshold is absolute. At 390 pixels wide, a navigation bar is under it.',
        correct: true,
        why: 'The heuristic was written on desktop, where the assumption holds, and mobile was never a separate code path, so nothing flagged the change of context. The threshold is now a fraction of the viewport width.',
      },
    ],
  },
];

export const DRILL_COUNT = DRILLS.length;
