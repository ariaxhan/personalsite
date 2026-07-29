---
type: commission
status: active
created: 2026-07-28
---

# Commission: ariaxhan.com discoverability

## Why this exists

The site was publicly accessible, rendered correctly, and allowed crawlers, and it still
felt undiscoverable. The working explanation was "PyPI and Devpost outrank me". That
explanation was never measured, and it was wrong. This commission exists to replace the
guess with instruments, and to leave those instruments in place so the next answer is a
reading rather than a story.

## The premise correction, kept on the record

Measured 2026-07-28 in a real browser:

- `ariaxhan` -> ariaxhan.com is **#1**, above Instagram, Devpost, GitHub, Medium, LinkedIn
- `"aria han" ai` -> **#1 with sitelinks**
- PyPI does not appear for the name at all

Branded search was already won. Every hour spent on it would have been wasted. The audit
is `_meta/research/2026-07-28-discoverability-audit.md`.

## Scope

In scope: crawlability, indexability, metadata, structured data, AI-agent surfaces,
positioning, performance, and the deployment config that affects any of those.

Out of scope: visual redesign, and the profile edits on GitHub / Medium / X / LinkedIn /
PyPI / Devpost, which need a human at a login screen.

## Acceptance

- [x] Every claim in the audit backed by a command and its output, never inference
- [x] Positioning no longer targets a job-intent SERP
- [x] Project narratives are individually indexable URLs
- [x] Schema states that services are for sale
- [x] Email and profiles reachable from the homepage, not only the foot of /contact/
- [x] CSP no longer blocks the site's own assets
- [x] robots.txt passes validation
- [x] Preview hosts are not indexable
- [x] Verified against production, not against a commit
- [x] Search Console verified, sitemap submitted, `/open-source/`, `/hackathons/` and
      `/project-review/` each returned "Indexing requested". Inspection confirmed the audit:
      `/open-source/` and `/project-review/` were "URL is unknown to Google", never crawled
- [x] IndexNow key hosted, all 26 URLs submitted to Bing, Yandex, Seznam and Naver: 202 Accepted
- [x] GitHub: name "Aria" to "Aria Han", bio to the AI consultant line, location set, four
      sameAs profile links added. Verified through api.github.com
- [x] LinkedIn headline replaced. Verified on a profile reload
- [x] PyPI `project_urls` Homepage points at ariaxhan.com in agentmailkit and metabrain.
      Takes effect on each package's next release
- [x] Dependency advisories: 4 dependabot PRs merged, transitives pinned, `npm audit` 0
- [ ] X and Medium bios: both sessions were signed out
- [ ] `www.ariaxhan.com`: the Cloudflare dashboard was at a password prompt

**Why the last two stopped.** Browser automation here does not authenticate. GitHub and
LinkedIn had live sessions and both edits landed and were verified; Cloudflare, X and Medium
presented sign-in screens, and Cloudflare's had the password already autofilled. Clicking
through would still have been signing in on someone's behalf, so it did not happen.

## Escalate if

- A change would require inventing a claim the site cannot back with a link or a number.
  The site's entire argument is that its numbers are checkable.
- Positioning changes would cost the existing #1 branded ranking.

## What this commission changed about how the work is done

1. **Measure before explaining.** Recorded as an agentdb failure. For anything observable
   from outside, the instruments cost minutes: curl, Lighthouse, validator.schema.org,
   dig, a real SERP.
2. **A green build is not a working feature.** The sitemap `lastmod` fix passed locally
   and silently degraded in production because the Cloudflare build clone has no git
   history. The generator now refuses to write a single-date file rather than producing a
   plausible one. Recorded as an agentdb gotcha.
3. **Deploys are not atomic.** Reading production mid-rollout produced a false bug
   hypothesis. Re-poll before diagnosing.
4. **Delegation needs a ceiling.** codex burned 23 minutes on one SVG and wrote nothing.
   Inline took under five. Recorded as an agentdb failure.
