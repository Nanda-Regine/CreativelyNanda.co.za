---
slug: what-nova-costs-pricing-an-ai-companion-for-students
title: What Nova Costs
category: dev
excerpt: VarsityOS gave South African students an AI companion for R49 a month, unlimited. Then I did the arithmetic on a single message. A field note on pricing AI in rands, and on the conversations that should never touch a paid model at all.
tags: VarsityOS, Campus Compass, Claude API, prompt caching, pricing, NSFAS
---

Every message a student sends to Nova costs me money. That sentence took me longer to take seriously than it should have.

Nova is the AI companion inside VarsityOS, the student app that began life as Campus Compass. She is not a general chatbot. She was built for one person: a first-generation South African university student, often funded by NSFAS, often working part-time, often studying through load shedding, sometimes in crisis. Nova knows how NSFAS allowances and appeals work, what the counselling options are, how spaced repetition works, and what the student in front of her has actually got going on this week, because the app passes in their real budget, tasks, exams and mood with every call.

That last part is what makes her useful. It is also what makes every message expensive.

:::chapter
I | The price of one sentence
:::

When I launched the premium tier, it was R49 a month, unlimited. It felt generous and simple, and simple pricing converts. Then I priced a single message.

:::receipt One message to Nova
The student's question | a few tokens
Their budget, tasks, exams and mood | the context
The knowledge base, from cache | a fraction of full price
Nova's reply | the output
= Roughly | R0.17
:::

Seventeen cents does not sound like much until you divide it into forty-nine rand. At that rate, R49 pays for about 288 messages of model cost alone, before a payment fee or a server bill is counted. My own working estimate put the true break-even closer to 240. A student who talked to Nova eight or nine times a day was, quite literally, being paid by me to use the app.

And the students who talk to Nova most are not the ones gaming a plan. They are the ones who need her most. An unlimited plan puts the product's worst economics exactly where its most important users are.

:::chapter
II | The cache that made it possible at all
:::

Nova's knowledge base is about five thousand lines long. It covers more than twenty-five South African universities, NSFAS rules, study science, student finance, and the country's mental health resources. Sending all of it with every message would have made the product impossible to price.

Prompt caching is what makes it viable. The knowledge base is marked as a cached prefix, so after the first call the model reads it at a fraction of the normal input price, and only the student's own context and question are paid for in full. The saving on that part of the bill is around ninety percent. It is the single most important line in the architecture, and it is invisible to every student who uses the app.

The second lever was not using the big model when it was not needed. Nova's conversations run on Claude Sonnet, because a student in distress deserves the best reasoning available. But the structured routes around her, the ones that return fields rather than conversation, moved to Claude Haiku. A form that returns fields does not need the model that writes the essay.

:::chapter
III | The new price list
:::

Even with caching, unlimited was the wrong promise. So the tiers were rebuilt around a number I could stand behind: a message count, enforced on the server.

:::receipt VarsityOS, per month
Free | 10 messages, R0
Scholar | 75 messages, R39
Premium | 200 messages, R79
= Model cost at the Scholar cap | about R12.75
:::

The Scholar tier keeps more than sixty percent after the model is paid, and it is cheaper than the old unlimited plan. The Premium cap of two hundred is generous for how students actually study, and it has a ceiling. The cap is enforced on the server, per tier, so the number on the pricing page and the number in the database cannot disagree. Payment moved to proper recurring PayFast subscriptions at the same time, so a plan renews without a student having to remember to pay.

:::aside On pricing in rands
Every figure here is in rands because the students pay in rands. A price set in dollars and converted drifts every time the exchange rate moves. The student's budget does not.
:::

:::chapter
IV | The messages that must not cost anything
:::

This is the part of the architecture I am proudest of, and it is the part that saves no money worth mentioning.

Some messages should never reach a paid model at all. If a student writes something that suggests they are in danger, the response cannot depend on an API being up, a rate limit not being hit, or a monthly message allowance not being used up. So crisis detection in Nova runs entirely inside the app. No network call. No model. It recognises the signal locally and immediately shows emergency resources, including SADAG and university counselling services.

The same thinking produced a small library of responses that are written once and served for free: a breathing exercise, a Pomodoro session, advice on sleep before an exam. These are the things a stressed student asks for most, and they are better written carefully by a person than generated slightly differently every time.

:::statement
A message cap is a business decision. A crisis response is not, so it has no cap.
:::

When I first drew the tiers, I worried the free plan's ten messages a month was too stingy. Then I realised the free plan was never really ten messages. It is ten conversations with Nova, plus every crisis response, every breathing exercise and every study timer, none of which ever touch the model. The paid tiers buy more of Nova's time. They do not buy safety, because safety was never for sale.

:::chapter
V | Two small bugs, for the record
:::

Pricing work sends you through the whole codebase, and it turned up two bugs worth writing down because they are easy to make.

The first production deploy failed because a page had been marked with `'use server'` at the top. That directive belongs only to files of server actions. A server component needs no directive at all; it is the default.

The second was in push notifications. The code was passing the Firebase sender ID where the VAPID public key belonged. Both are long strings from the same console, and both sit in the same list of environment variables. With the wrong key, notifications could not have worked on any device, and nothing about the variable names would have warned you.

:::figures
~R0.17 | model cost per message
~90% | saved by caching the knowledge base
0 | API calls in a crisis response
3 | tiers, each capped on the server
:::

Pricing an AI product honestly means knowing the cost of one sentence and designing the rest of the app around it. Knowing which sentences should never have a price at all matters just as much.
