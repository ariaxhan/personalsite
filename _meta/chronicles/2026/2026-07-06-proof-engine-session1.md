# Chronicle: Proof Engine, session 1 (recon, commission, data layer, lane fan-out)

**Date:** 2026-07-06 · **Branch:** feat/proof-engine · **Agent:** Fable (wound down at usage cap, handed off to Opus)

## What happened
- Full recon of repo + live surfaces (one Explore agent + direct checks). Found the agent
  surface actively wrong: functions/mcp.ts served a stale San Francisco persona; three
  OAuth well-knowns advertised /_auth/* endpoints that do not exist; SKILL.md markdown
  instructions pointed at variants that 404; llms-full said "70+" Substrate pieces (actual
  425) and "47 repos" (actual 62). Three different bios across three machine surfaces.
- Verified every number that will appear on the site (sources + dates in app/utils/siteMeta.ts).
- Established the deployed Worker owns /api/project-review* (wrangler deployments), so the
  duplicate Pages Function is marked for deletion.
- Wrote the commission (_meta/commissions/active/2026-07-06-proof-engine.md) including
  Aria's added acceptance gate: four-visitor transcript at 10s/60s/5min blocks the PR.
- Authored the unified data layer: siteMeta, projectsData (13 projects with thesis/problem/
  built/proof/learned/proves/themes/connections), writingData (5 themes), workWithMeData
  (7 engagements + fit filter). Committed, pushed.
- Fanned out 4 implementation lanes to isolated worktrees (proof-of-motion, agent surface,
  contact + cal.com, writing/systems pages). Still running at handoff.

## Failures worth recording
1. Spawned the first 4 lanes without pinning a model; they inherited fable (expensive) and
   were killed + respawned on opus. Lesson: always set the model param on spawns.
2. The respawned worktrees were created from stale main, missing the data layer their briefs
   depended on. Caught by inspecting `git worktree list` (commits didn't match branch tip),
   fixed with `merge --ff-only` into each live worktree + a message to each agent. Lesson:
   after spawning a worktree agent, verify the worktree's HEAD matches the branch tip.

## Continuation
Everything the successor needs, including ready-to-spawn briefs for the homepage and SEO
lanes, merge procedure, taste ledger, and the acceptance-gate spec:
`Vaults/_meta/handoffs/proof-engine-personalsite-2026-07-06.md`

## Addendum: the session did not end at the handoff
Usage held long enough to finish. All six lanes merged (opus agents, worktree isolation),
build/lint/typecheck/crawl green, four-visitor acceptance gate PASSED 4/4, persona-flagged
truth defects fixed (5 wins not 6, 39 skills, concrete hero third line, stats.json endpoint,
repo-scope reconciliation). PR opened, not merged: https://github.com/ariaxhan/personalsite/pull/14
Extra failure for the record: a lane spawned while the shell cwd sat in Vaults/ got a
Vaults worktree (worktree isolation keys off cwd); and `git add -A` once staged live agent
worktrees as gitlinks (fixed, .claude/worktrees/ now gitignored).
