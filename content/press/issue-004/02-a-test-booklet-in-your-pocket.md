---
slug: a-test-booklet-in-your-pocket-k53-budget-android
title: A Test Booklet in Your Pocket
category: dev
excerpt: How K53 Drill Master was built for the phone people actually own. Every decision priced in kilobytes, one question asked of all of them, and why a quiz app ended up with a breathing exercise.
tags: K53 Drill Master, budget Android, performance budget, PWA, React, South Africa
---

There is a question at the top of the K53 Drill Master build log, and every decision underneath it is an answer to it: *what does this feel like on a Tecno Camon 20 on MTN 3G?*

Not an iPhone on office wifi. A phone with two or three gigabytes of memory, a browser that is also running WhatsApp, and a data bundle someone paid for with money they would rather have kept. That is the device most people preparing for their learner's licence in South Africa are holding. So that is the device the app was built for, from the first commit.

:::timeline The first day, 27 February 2026
09:00 | The problem is written down. The existing options are a printed booklet, some videos, a handful of slow government PDFs and one website from 2009. The decision: build a drill, not a study guide. Repetition until it sticks.
09:54 | First commit. Two game modes, the South African flag palette, and Georgia as the typeface.
13:08 | The Road Rules Gauntlet: fifteen rounds, one question bank filtered by vehicle code.
13:54 | Thirty-eight road signs, hand-drawn in SVG. By the end of the afternoon I knew they were wrong.
:::

:::chapter
I | A booklet, not an app
:::

The typeface came first, and it was not a technical decision. Georgia is a serif. It looks like print. People who learned for their licence from a paper booklet recognise it, and older learners in particular do not have to learn a new visual language before they can learn road rules. The build log calls it reducing cognitive friction. I think of it as meeting people in the room they already know.

The same instinct shaped the structure. Questions come in rounds, not an endless shuffle, because a round has an ending. You can stop after round three and feel you have done something. A pure shuffle has no exit, and on a phone you are studying in a taxi queue, the exit matters.

The mock exam has sixty-eight questions, not seventy. Most study sites say seventy. We checked against the 2024 examiner guidelines and the real Code 8 test is sixty-eight. It is a small number to be right about, and it is the one a nervous learner will count.

:::chapter
II | Every choice has a weight
:::

On a budget phone, every library is paid for twice: once in data to download it, and again in the seconds the processor spends parsing it before anything appears. So the build log reads like a shopping list where most items were put back on the shelf.

:::receipt What was left out, and what it saved
React Router | 50 KB
Smallest confetti library, gzipped | 12 KB
An i18n library | 40 KB
A global state manager | not needed
= First load today, gzipped | ~107 KB
:::

There is no router. The entire navigation layer is one piece of state that says which game is open. When a game is chosen, it mounts. When you leave, it unmounts. For a single-screen app, a routing library would have added weight and no benefit.

That decision had a cost, and it arrived on Android. Without a router there is no browser history, so the phone's back button did not return you to the home screen. It closed the app. The fix is four lines that push a quiet entry into history whenever a game opens, and listen for the back gesture to close the game instead of the app. It is the kind of bug you only meet when you decide not to use the standard tool, and it is worth meeting, because now I know exactly what the standard tool was doing for me.

The confetti that falls when you pass is eighty lines of canvas code I wrote instead of installing. The sounds are not files at all. They are synthesised in the browser with the Web Audio API, so they cost no download and work offline from the first visit.

:::aside The sound of being right
The "correct" tone rises from 660 to 880 hertz over 280 milliseconds. It took half an hour to tune, because it had to feel rewarding on the first play and not grate on the fiftieth.
:::

Code splitting finishes the job. The first paint loads only the shell. The core games load on your first tap. The heavy vehicle and motorcycle content, which most learners never open, loads only if you go looking for it.

:::chapter
III | The signs had to be real
:::

The hand-drawn signs from that first afternoon looked good and were a liability. South African road signs are legally specific. A "give way" sign that is almost the right shape can teach a learner to recognise the wrong shape. A drill that trains the eye must train it on the real thing.

So in March the signs came out of the official learner driver manual itself. The PDF was opened with pdfjs, and each page's drawing operations were counted to tell actual signs apart from decoration, since signs have a characteristic square or circular bounding box. Every image is a small JPEG, loaded only when its question appears and then cached by the service worker, so a sign you have seen once costs nothing the second time.

Some extracted images were corrupted. Rather than audit hundreds of files by hand, each image falls back to a drawn SVG if the browser fails to load it. The app notices the failure at runtime and quietly shows the fallback.

:::chapter
IV | The tab that isn't a game
:::

The most unusual thing in the app has no score.

Early users talked to me on WhatsApp, and one theme came back more than any question about road rules: fear. People who knew the material were failing because the room, the clock and the stakes took it away from them. So the Test Day Prep section has four tabs. One is the documents you need to bring. One is tips for the test itself. One is encouragement. And one is for your nerves, with a breathing exercise and a few sentences to reframe the morning.

:::pull The K53 build log
Unusual for a quiz app. Intentional.

:::

It lives in the components folder, not the games folder, because it keeps no score. That is a small architectural decision, and I like what it says: not everything that helps you pass is a test.

:::chapter
V | The language my province speaks
:::

K53 Drill Master speaks English, Afrikaans and isiXhosa. No translation library is involved, and that was a choice about meaning rather than size. In a driving test, "yield" is a legal instruction, not an everyday word, and a generic library would translate the everyday word. Every string was written by hand and reviewed by first-language speakers, and a checker flags any key that one language has and another does not.

isiXhosa came before isiZulu for a reason close to home. I build from KuGompo City, in the Eastern Cape, where isiXhosa is the language most learners grew up speaking and where I could find almost no K53 material written in it. The first learners I pictured were my neighbours.

:::figures
~2,100 | answerable questions
362 | real signs from the national manual
26 | drill modes
3 | languages at full parity
:::

The question at the top of the build log has outlived every feature under it. When I add something now, I still picture the same phone in the same queue, and I ask whether the thing I am adding is worth what it costs the person holding it.
