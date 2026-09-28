---
slug: know-before-you-go-true-access
title: Know Before You Go
category: writing
excerpt: True Access maps where disabled South Africans can actually get in. Building it taught me that an accessible app has to be accessible when it fails, too, and that silence is the most inaccessible thing software does.
tags: True Access, accessibility, SANS 10400-S, disability, product design, South Africa
---

Before a wheelchair user goes somewhere new, there is a phone call. Is there a step at the entrance? How wide is the door? Is the accessible toilet a real one, or a storeroom with a sign on it? The call is made because the word "accessible" on a website has been wrong too many times. One step is enough to end the visit. One narrow door. One toilet that turns out to be upstairs.

Blind and low-vision people make a version of that call. So do D/deaf people, and people with chronic illness who need to know whether there is somewhere to sit. Millions of South Africans plan outings around a single unknown, and they have learned to resolve it themselves, one phone call at a time.

True Access exists to make that call unnecessary. Its promise fits in four words, and I have kept them as the tagline since the first screen: *know before you go.*

:::chapter
I | A score you can trust
:::

The difficulty with "accessible" is that it is an opinion. So True Access does not ask for opinions first. It asks trained auditors to walk a venue against **SANS 10400-S**, the South African national standard for accessibility in buildings, and to record what they find on a structured checklist.

The score is arithmetic, and it is shown, not hidden. Eleven required items are worth ten points each. Six optional items are worth five. That makes one hundred and forty, normalised to a score out of a hundred. A venue owner who reads their score can see exactly which items cost them points, and what fixing each would be worth.

:::figures
11 × 10 | required items
6 × 5 | optional items
140 | raw points, shown as 100
4 | roles: user, auditor, admin, business
:::

The pins on the map are coloured by that score. Reviews from disabled users sit beside the audit, because an auditor measures a door and a person tells you what it was like to come through it. Both are needed. Neither replaces the other. The build journal ends with the phrase the disability rights movement gave the world, and it is the reason the reviews exist at all: *nothing about us without us.*

:::chapter
II | The users are the reason for the rules
:::

Most projects have a style guide. This one has rules I will not bend, and every one of them comes from remembering who is holding the phone.

:::checklist The non-negotiables
pass | Every screen carries an accessibility label and role, and every piece of text meets a contrast ratio of at least 4.5 to 1. The users are disabled. This is the product, not a feature of it.
pass | Disability profile data is never written to a log, never placed in a URL, never repeated in an error message. It is some of the most sensitive information a person can hand over.
pass | Offline first. Load shedding is real, so the map and the places you have looked at are cached for when the power and the signal go.
pass | Data light. Images load lazily, lists are paginated, uploads are compressed. Mobile data in South Africa is expensive, and disability often already costs more.
pass | Nothing a user writes is ever hard-deleted. It is marked, and it can be recovered.
:::

For a while I believed those rules were enough. Then the app went through a production review, and I learned that rules about what a screen shows say nothing about what a screen does when something goes wrong.

:::chapter
III | The quiet failures
:::

The review found that the screens were well made. Real data, no mock-ups, strong accessibility work. And it found that in several places, when something broke, the app said nothing at all, or worse, said something reassuring.

:::checklist What the production review found
fail | The map, the headline feature, was dead on the web. A build setting that stopped the map library from crashing the bundler had also removed it from the web build entirely. The screen rendered. The map never did.
fail | A password reset link opened a screen that said "Verifying reset link" and stayed there forever. The token in the link was never read.
fail | The offline banner was fully built and used nowhere. The mandate said load shedding was real. The app never told anyone they were offline.
fail | Saving a profile could fail and report nothing. A user could believe their disability details had been saved when they had not.
fail | When a dashboard's data failed to load, it showed its empty state. "All clear" and "the backend is down" looked exactly the same.
:::

Read that list again with a particular person in mind. A blind user whose screen reader announces a page that never finishes loading. A wheelchair user who sets up their profile so the map will filter for step-free entrances, and is told nothing when the save fails, so the map quietly shows them places they cannot enter. An administrator who sees an empty queue and concludes that nobody needs anything.

None of these failures is dramatic. That is exactly what makes them dangerous. A crash tells you something is wrong. A silence lets you believe that nothing is.

:::statement
An accessible app has to be accessible when it fails, too.
:::

For most software, a quiet failure is an annoyance. For people who have spent their lives being told a place was accessible when it was not, it is the same injury in a new form. The app says yes. Reality says no. The phone call was supposed to be over.

:::chapter
IV | Fixing it out loud
:::

The fixes were ordinary, and I want to describe them plainly, because ordinary fixes are the ones people skip.

The web map now loads its engine at runtime from the provider's own servers, so the bundler never touches it, and the native and web maps share the same clustering and the same score-coloured pins. The reset screen reads the recovery token from the link in both formats it can arrive in, and when the link has expired, it says so. Later, when the live map went blank again, it turned out the map key itself had been revoked. The fix was a new key, and the lesson was a one-line check against the map provider's API that tells you in a second whether the key is alive, before you start suspecting the code.

The rest of the review became a written fix order, in priority sequence, with the file and line for each item. Saves that fail will say so. Dashboards will tell the difference between an empty queue and a broken one. The offline banner that was built will be switched on.

:::pull
Failing closed and failing loudly are the same promise made twice: tell the person the truth, even when the truth is that we do not know yet.
:::

I think about True Access differently now. I used to think the product was the map. It is not. The product is a guarantee: that when the app tells you something, it is true, and when it cannot tell you something, it says that too. A map with a silent failure in it is just a more convenient version of the website that said "accessible" and meant nothing by it.

Know before you go. It turns out the app has to know itself first.
