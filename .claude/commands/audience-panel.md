---
description: Walk the site as every target audience in parallel (persona briefs in .claude/audiences/), then synthesise where the site wins, loses and contradicts itself. Read-only. Args: optional persona names and/or BASE url.
---
You are the orchestrator running an audience panel for creativelynanda.co.za. Read-only: no code changes in this command.

## Setup
- Run date = today (YYYY-MM-DD, SAST).
- Personas = every file in `.claude/audiences/` unless `$ARGUMENTS` names specific ones.
- BASE = a URL in `$ARGUMENTS` if given, else `https://creativelynanda.co.za` (live). Use a local or preview URL only if the user asks.

## Run
1. Spawn one `audience-critic` agent per persona, **all in parallel in one message**. Each prompt states:
   - the persona file path to read and become,
   - BASE and run date,
   - output: `docs/audience/<run-date>/<persona>.md`, screenshots to `.audience-shots/<run-date>/<persona>/`,
   - max ~30 turns. Stay inside the persona's journey; no repo-wide wandering.
2. When all finish, read the reports (not the screenshots, unless a finding needs checking).

## Synthesise → `docs/audience/<run-date>/PANEL.md`
- **Scoreboard:** persona · goal · outcome (achieved / friction / gave up) · seconds to "who is this?" · taps to goal · MB (where measured) · one-line verdict.
- **Collisions:** where serving one audience hurts another (e.g. the poetry house delaying the business client, heavy media costing the student data). Recommend the resolution, don't just list it.
- **Inconsistencies:** facts that differ across pages (app count, years, commits, generations, titles).
- **Top 10 changes** ranked by (number of personas helped × severity) ÷ effort, each with the pages it touches.
- **Keep list:** the Delights several personas noticed, so no future change breaks them.
- **For Nanda to confirm:** cultural/family facts, claims and copy that only she can verify.

Then report to Nanda in plain language: the scoreboard, the 3 changes that matter most, and what needs her decision. Stop. Fixes go through `/fix` or `/build` once she approves.
