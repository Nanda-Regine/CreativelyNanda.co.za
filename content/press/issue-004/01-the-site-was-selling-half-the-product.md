---
slug: the-site-was-selling-half-the-product
title: The Site Was Selling Half the Product
category: dev
excerpt: An audit traced every number my brands publish back to the code it describes. Two were invented. Most of the rest were too small. What I learned from the week my marketing had to prove itself.
tags: claim integrity, K53 Drill Master, JarvisOS, marketing engineering, structured data
---

Every number on a product page is a promise with a source. For most of this year I did not know where half of mine came from.

It surfaced on 8 August, in a document called `PRODUCT_TRUTH_2026.md`. I had set a repository-mining agent loose across my own GitHub with one instruction: read the code, not the README, and report what each product actually does. The document it came back with was polite and devastating. My marketing corpus, the library that feeds every card, caption and carousel my brands publish, was quoting figures that no code anywhere supported.

I build with an AI engineering agent inside JarvisOS, my personal operating system. It writes a journal entry before it starts any job, which is a habit I asked for and now depend on. The entry for that morning opens with a sentence I have thought about since: *every published claim traced to code, or deleted.*

:::chapter
I | Two inventions
:::

There were two claims with no source at all. Not a weak source. None.

The first was a statistic about the K53 learner's licence: that more than sixty percent of people fail it, and that more than a million sit it every year. It is the kind of number that feels true because it gets repeated, and I had repeated it. When the agent searched every repository for where it came from, it found only other places that repeated it.

The second was quieter and, as an engineer, more embarrassing. The copy said K53 Drill Master runs an accuracy gate on every commit. The validator is real. I wrote it. But the only workflow in that repository builds the Android app, and it has no test step. The gate existed. It just never ran on its own. Someone had to type `npm test`, and the someone was me, on the nights I remembered.

:::aside Why structured data is the worst place to be wrong
A sentence on a landing page is read by the person who scrolls past it. A sentence in JSON-LD is read by a search engine, which may lift it into a rich result and present it as the answer. The page stops being the only place the claim lives.
:::

:::chapter
II | The numbers that were too small
:::

Here is the part I did not expect. Most of what was wrong was not exaggeration. It was the opposite.

:::ledger What the pages said, against what the code says
What we published | Where the truth lives | Verdict
600+ questions in K53 | 1,147 written questions plus 946 generated from the sign manifest | understated, ~2,100
11 or 25+ game modes | `GAMES_BASE` holds 28, two deliberately hidden | understated, 26
1,000+ commits on CreativelyNanda | the GitHub API, counted | understated, 3,060
15 demos on Mirembe Muse | the demos route, counted | wrong, 14
344 road signs (one repo) | `public/signs`: 347 JPEGs and 15 PNGs | wrong, 362
395 road signs (the other repo) | the same folder | wrong, 362
All 11 official languages, VarsityOS | 11 locale files of navigation strings in a 72-page app | cut, 11-language interface
CI accuracy gate on every commit | one workflow, no test step | cut
More than six in ten fail the test | no source in any repository | cut
:::

The road signs are my favourite line on that ledger, because two of my own systems disagreed and both were wrong. My portfolio site said 344. The JarvisOS marketing engine said 395. The agent refused to pick one. It opened the K53 repository and counted the folder: 362. And 395 was not invented either. It is how many images came out of the national learner driver manual when I extracted them in March. Somewhere between extraction and shipping, the number changed, and the marketing kept the old one.

There is a finer point hidden in that folder. Of the 362 signs the app ships, only 183 are used to generate new questions, because a script admits a sign into the question generator only if its image is at least 250 pixels wide. Anything smaller would be blurry on a phone. That rule is written in the manifest's header. It is the kind of care that makes the product good, and it appeared nowhere in how the product was described.

:::statement
My site was advertising half of what I had built, and the half it left out was the part the product does best.
:::

That changes what this audit was about. I went in expecting to find where I had overclaimed. The real finding was that I had been describing my work from memory, and memory rounds down. You remember the number from the week you last counted. The code keeps growing after you stop looking.

The multilingual story had been told about the wrong app. VarsityOS was described as speaking all eleven official languages. It has eleven locale files of navigation and common strings sitting on top of a seventy-two page application. That is an interface, not a translation. The app that genuinely does the work is K53, with 191 translation keys at perfect parity across English, Afrikaans and isiXhosa, and a checker that fails when a key goes missing. I had been giving the credit to the product that deserved it less.

:::chapter
III | Fixing the source does not fix the database
:::

Correcting the numbers took three passes, and each one taught me something about where claims actually live.

The first pass fixed the catalogue, the file where each brand's facts are declared. The agent then searched before editing and found the surface was eight files, not one. Two were seed files that are fed into live generators as prompt input. A stale number in a seed file is not just stale. It is re-minted into fresh copy every time a generator runs. Fixing only the catalogue would have left the machines quietly reintroducing the old figures.

The second pass was the database. Copy that has already been generated and stored does not change when you fix the source it came from. A read-only audit script ran the same patterns across every stored asset and found nine hits in eight live assets. They were repaired with a plain substitution table rather than an AI rewrite, because the writing was fine. Only the figures were wrong.

The third pass was looking. Every automated check had gone green, so the agent rendered the corrected K53 cover and opened the image. Two problems were sitting on it that no check could have seen:

:::checklist What only looking caught
fail | The deck still read "25+ ways to practise". The pattern looked for the words "game modes", and this card used a different noun.
fail | Replacing the kicker had orphaned a pronoun. "Because they walked in underprepared" no longer had anyone for "they" to be.
pass | Both fixed, and the pattern widened so the first one cannot slip past again.
:::

The journal records this as the third time the same lesson paid out, and I have made it a rule for everything I publish: for design and for copy, looking at the output is the instrument. A test can tell you a string is absent. It cannot tell you a sentence has stopped making sense.

:::chapter
IV | Making it impossible to drift again
:::

A correction that depends on someone remembering is a correction with an expiry date. So the list of banned claims became a single file, `banned-claims.ts`, and that one file does two jobs. It is written into the system prompt of every generator, so the claims are never produced. And it is the list a test checks every stored asset against, so if one is produced anyway, the build fails.

```ts
// one list, two jobs
export const BANNED_CLAIMS = [/* the patterns */];
// 1. prevention: injected into every generator's system prompt
// 2. detection: claim-integrity.test.ts fails on any match
```

Before, the prohibition lived in a document the generators never read, and the test checked for things the generators were never told to avoid. Neither half could see the other. That gap is exactly where the drift had come from.

The new pattern for the wrong sign counts earned its place within the hour. It immediately caught a live asset still saying "395 sign images", one that nothing had flagged before.

:::figures
~2,100 | answerable questions, now stated
362 | road signs, counted in the folder
26 | drill modes, hidden ones excluded
0 | live assets flagged at close
:::

When the fix went out to mirembemuse.co.za, the agent did not trust the green build. It fetched the live page and checked it figure by figure, in all four languages the site serves, for the new numbers present and the old ones absent. The first polling loop reported "still old" after the page had already changed. The loop had printed its own stale line. It checked again properly rather than repeating what it had been told.

:::chapter
V | The one I still owe
:::

I would like to end this piece by telling you every claim is fixed. I cannot, and a piece about honesty is the wrong place to round down.

The unsourced fail-rate statistic still sits in one place: the frequently asked questions of the K53 Drill Master landing page, in the structured data a search engine reads. It lives in a different repository from the one this audit could touch, and it is mine to remove. When it goes, the screenshot of that page has to be retaken too, because three published cards embed it. A claim you delete from the code keeps travelling for as long as a picture of it does.

What this week changed for me is simpler than any of the tooling. I used to think marketing was the part of the work where you are allowed to round up. Now I think it is the part that should be held to the same standard as a migration. You would not ship a schema change without knowing which rows it touches. A number on a product page touches every person who reads it.
