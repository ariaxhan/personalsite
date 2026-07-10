# Commission: Proof Engine, ariaxhan.com

> Turn the site from "beautiful portfolio" into a proof engine for Aria Han,
> AI systems architect / implementation specialist. A stranger must understand
> who/what/why-different/what-next within 10 seconds, and every claim must be
> verifiable. Keep the room; add the machinery.

## Telos of this commission
The site is the front door for consulting and collaboration. Today it is
atmospheric but vague, and its machine-readable surface actively lies (stale
persona, phantom endpoints). This commission makes the human surface legible
and the agent surface truthful, so both kinds of visitors can accurately
describe and hire Aria.

## Authority granted
- Full edit authority in this repo on branch `feat/proof-engine`. No merges to main.
- Delete dead/duplicated code (Pages Function duplicate of the deployed worker,
  phantom OAuth well-knowns, fake contrib preview) once evidence is recorded.
- Spawn subagents for mechanical implementation; main agent reviews and commits (I0.6).
- Read git history of sibling CodingVault repos to build proof-of-motion data.
- Commit and push the branch freely; open a PR at the end.

## Boundaries
- **HARD: no merge into main until Aria approves.**
- No invented facts. Every number on the site must trace to a verified source
  (recorded below). No exaggerated claims, no startup buzzword soup.
- Voice: intimate, literary, systems-minded. Editorial rules in
  `content/editorial-brief.md` stay in force (banned ungrounded abstractions,
  one closing line per project, compression pass, no em dashes).
- Do not expose private client data, secrets, or scratch commit messages in the
  proof-of-motion feature. Private repos appear as themes/counts only, never names
  Aria hasn't already published.
- Do not advertise any endpoint that does not exist after this work.
- Design system stays: warm paper, Newsreader/Hanken/Space Mono, terracotta accent,
  Fig. labels, kickers. No Inter, no emoji, no generic AI aesthetic (I0.7).
- The deployed project-review Worker and its D1 database are production; do not
  break the intake flow.

## Context (locked findings from recon, 2026-07-06)
- Stack: Next.js 15 static export (`output:'export'`, `trailingSlash:true`) on
  Cloudflare Pages; Pages Functions for `/mcp` + markdown content negotiation;
  a separate deployed Worker `personalsite-project-review` owns
  `ariaxhan.com/api/project-review*` (deployments 2026-07-01/02, verified via
  wrangler). `functions/api/project-review.ts` is a byte-identical duplicate → delete.
- Uncommitted prior-session work already moved Hero toward proof stats and added
  a fake-data `GitHubContribPreview`. Build on it; replace fake data with real.
- Agent-surface defects (full list in session recon):
  1. `functions/mcp.ts` serves a stale persona ("San Francisco", AgentDB/vector-native)
     contradicting the whole site.
  2. Markdown negotiation only works for `/`; SKILL.md files and the layout agent
     directive point at `/about`, `/open-source/index.md`, `/writing/index.md`
     markdown variants that do not exist.
  3. Three OAuth well-knowns advertise `/_auth/*` endpoints that 404; MCP auth is
     `required:false`, so the whole OAuth surface is dead weight → delete.
  4. Three different bios/project lists across `mcp.ts`, `layout.tsx` WebMCP inline
     script, and `llms-full.txt`. One source of truth required.
  5. No canonical URLs, no metadataBase, no OG image, h1 missing on 7 of 9 pages.
  6. `agent-skills/index.json` carries sha256 hashes nothing regenerates → drop or automate.
  7. `llms-full.txt` says Substrate "70+" (actual 425) and "47 repos" (actual 62).
- `CalEmbed.tsx` exists (plain lazy iframe, cal.com/aria-han/15min) but is rendered
  nowhere. CSP already allows cal.com. Link verified live (HTTP 200).
- Reference site darinbuilds.com: direct hero ("who + what + why different" in two
  sentences), numbers as proof, ecosystem interconnection map, conversational fit
  filter, soft booking CTA. Borrow the directness, not the words.

## Known facts (verified this session; trust, do not re-derive)
- GitHub public repos: **62** (api.github.com/users/ariaxhan, 2026-07-06).
- the-agent-library portable skills: **39** (SKILL.md count, local repo).
- llm-bench: **21 tests**, programmatic verifiers (README).
- Substrate: **425** HTML pieces (GitHub tree, 2026-07-06).
- Hackathon wins: 6 (site data, per Devpost links).
- Live products: ModelMind (App Store), Paper Rooms (App Store), our4cuts (web).
- Local git history available: 36 repos, ~3,900 commits, spanning 2025-01 → 2026-07.
  Largest arcs: modelmind 495, our4cuts 435, kernel-claude 360, lhcr 184,
  urban-atlas 172, paper-rooms 169, heycontent-web 165, llm-bench 148,
  latent-diagnostics 108, neural-polygraph 106.
- Positioning (from Aria, verbatim intent): AI systems architect / implementation
  specialist, Los Angeles. Builds the substrate around AI systems: workflows,
  observability, memory, evals, handoff protocols, internal tools, proof loops.
  Previous AI startup founder in SF; now independent in LA; current work includes
  Dify / automation / internal AI workflow implementation through Blink Build
  Studios. Local-first, private, durable tools.
- Engagement types (Aria's list): AI workflow implementation · internal AI tools
  and automation · agentic system architecture · evals, monitoring, quality layers ·
  Claude Code / AI coding workflow hardening · memory, context, knowledge systems ·
  Dify / low-code AI app implementation.
- Good fit / not fit copy direction supplied by Aria (real workflow vs AI hype, etc.).

## Desired outcomes

### O1, Truthful agent surface
OUTCOME: every advertised machine endpoint exists, parses, and tells the same story,
generated from one data layer. `/llms.txt` concise; `/llms-full.txt` complete markdown
mirror of the site; agent-card, server-card, api-catalog, agent-skills all consistent;
markdown variants exist for every content page; correct content-types; OAuth phantoms gone;
`/api/{site-index,projects,writing,work-with-me}.json` live as static route handlers.
LOOK AT: `app/utils/*Data.ts` (new unified data layer), Next route handlers
(`force-static`), `functions/mcp.ts` importing shared data, `public/_headers`.
VERIFY: build `out/`, serve locally, curl every endpoint + content-type assertions.

### O2, 10-second homepage
OUTCOME: first screen answers who (Aria Han, AI systems architect & implementation
specialist, LA) / what (turns messy workflows into reliable AI systems: memory, context,
evals, agents) / why different (builds the infrastructure around AI, not demos; everything
verifiable) / what next (systems, writing, book a call). Below the fold: system diagram
(messy workflow → memory/context/evals/agents → working implementation), what-I-build
cards with tiny diagrams, project constellation (projects connected by themes), proof-of-
motion strip (real data), now/current-focus, writing highlights, work-with-me door, full
link map in footer. Motion clarifies, never decorates.
VERIFY: rendered at 375/768/1440, zero console errors, the one-sentence test.

### O3, Projects as evidence
OUTCOME: all 13 named projects (modelmind, paper rooms, our4cuts, heycontext, heycontent,
brink mind, kernel, llm-bench, the-agent-library, model-familiarity-engine, metabrain,
substrate, latent-diagnostics) in one structured file with: thesis, status, problem,
what I built, stack, links, proof, learned, what-it-proves, themes, connections.
Systems + Open Source pages render from it; connections visible.
VERIFY: pages render every project; JSON endpoint mirrors it; no dead links.

### O4, Proof of Motion (chosen name; route `/proof/`)
OUTCOME: an archaeological build-record page: eras/constellations of work, commit bursts,
project continuity, recurring themes; mini version on the homepage replacing the fake
contrib graph. Data generated deterministically by a committed script reading local git
logs, output committed as JSON. Public repos link to GitHub; private arcs summarized
without names unless already public.
VERIFY: script runs clean, JSON committed, page renders from it, spot-check dates.

### O5, Work-with-me conversion
OUTCOME: contact page states the seven engagement types concretely, good-fit/not-fit
filter in Aria's voice, cal.com embed restored (CalEmbed → contact page + visible door on
homepage), project-review intake kept, copy synced. Async-first, intimate, not salesy.
VERIFY: cal iframe loads locally; all links live; form flow unchanged (worker untouched).

### O6, Writing as a map
OUTCOME: writing page grouped by theme (agents / memory-context / evals-verification /
ai coding workflows / philosophy-language), medium links kept, structured writingData
with themes feeding page + JSON + llms-full.
VERIFY: every article appears exactly once, links resolve.

### O7, SEO/a11y floor
OUTCOME: metadataBase + canonical on every page, OG/twitter images (static template),
JSON-LD (Person, WebSite, projects, articles), exactly one h1 per page, heading order
sane, alt text present, sitemap includes /proof/, robots unchanged in policy.
VERIFY: grep rendered HTML in out/ for canonical/h1/JSON-LD on every page.

## Execution shape (lanes; decompose by verification boundary)
- Lane 0 (main agent, taste): unified data layer + all positioning copy.
- Lane 1: proof-of-motion script + data + page + home strip.
- Lane 2: agent surface (route handlers, md variants, mcp.ts rewrite, well-known cleanup).
- Lane 3: homepage components.
- Lane 4: contact/work-with-me + cal embed.
- Lane 5: systems/open-source/writing pages from data layer.
- Lane 6: SEO/metadata sweep (runs after 3-5 to avoid file contention).
- Lane 7: verify (build, lint, serve, crawl, report). Order: 0 → {1,2} ∥ → {3,4,5} → 6 → 7.
Subagents implement; main agent reviews diffs, commits, pushes (I0.6, I0.8).

## Questions to challenge
- Is any stat one refactor away from going stale? Prefer generated numbers over typed ones.
- Does any homepage element delay comprehension without adding depth? Cut it.
- Would a stranger misread any claim as bigger than it is? Shrink it.
- Is the literary voice carrying information or hiding it? Rewrite until both.

## Verification standard
Done = `next build` clean, lint clean, every route curled from a local serve of `out/`
with correct status + content-type, every JSON endpoint parsed, every external link
status-checked, pages rendered at 3 widths with zero console errors, PR opened.
Live-deploy verification is deferred to Aria's merge (DEFERRED: production deploy check).

**Acceptance gate (Aria, 2026-07-06): the 10-second visitor transcript.** Before the
final PR, simulate four visitors against the actual finished pages (fresh-context
agents reading rendered output, not the builder's intentions):
1. founder with a messy AI workflow
2. engineering lead evaluating technical credibility
3. AI agent scraping the site
4. curious reader / collaborator
For each, write what they should understand at 10 seconds, 60 seconds, 5 minutes,
then compare against what the finished site actually communicates. If any visitor
cannot explain who Aria is, what she builds, why the work is credible, and where to
go next, revise the relevant page and re-run. This is an acceptance test, not a
vibes exercise. The commission is not complete until all four pass.
Additional test at 60 seconds: the visitor understands how the projects connect,
what they would hire Aria for, and that she ships real systems.

## Expected chronicle
`_meta/chronicles/2026/2026-07-06-proof-engine.md`, record: what the recon found broken,
the one-source-of-truth data layer decision, how proof-of-motion data is generated, and
the verified-numbers table for future reality audits.

## Canon / phronesis extraction rule
If the "advertised but not implemented" class of defect (phantom OAuth, markdown promises,
stale MCP persona) recurs in other projects, promote to phronesis: "an agent-readable
surface drifts unless generated from the same source the humans read."
