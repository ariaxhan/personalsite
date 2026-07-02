# Chronicle — Mobile-first redesign hardening

**Commission:** `_meta/commissions/active/2026-06-30-mobile-first-redesign-hardening.md`  
**Runner:** Codex GPT-5  
**Date:** 2026-06-30

## What was attempted
Harden the just-redesigned personal site so it works as a mobile-first studio, not a desktop page squeezed onto a phone. The priorities were first-load reliability, mobile object-room visibility, workshop screenshot inspection, vertical screenshot containment, accessibility, and product-copy truth for ModelMind and Paper Rooms.

## What changed
- `app/components/studio/Reveal.tsx` and `app/globals.css`: reveal animation now fails open. Content is visible by default, enhancement only hides after the client is ready, and a fallback timer prevents stuck invisible sections.
- `app/components/LivingDesk.tsx`: the mobile desk is now a compact object room with the same CSS-drawn objects, seven labeled links, and no text-only replacement.
- `app/components/WorkshopWall.tsx`: project modals now include selectable screenshot galleries, full-size screenshot links, contained main images, accessible thumbnail buttons, and wider modal sizing.
- `app/components/studio/Modal.tsx`, `app/components/studio/SectionHeader.tsx`, `app/components/Hero.tsx`, and `app/components/Manifesto.tsx`: mobile spacing, readable header notes, modal padding, touch target sizing, and the home overflow bug were fixed.
- `app/utils/systemsData.ts`: ModelMind and Paper Rooms now read as free solo dev projects. Vision Pro, Apple Vision, and premium language were removed.
- `app/layout.tsx`: the inline agent helper script no longer emits invalid literal newlines in browser JavaScript.
- `app/components/CalEmbed.tsx`, `package.json`, and `package-lock.json`: replaced the Cal.com React embed wrapper with a plain lazy iframe and removed `@calcom/embed-react`.
- `_meta/research/mobile-first-redesign-failure-map.md`: recorded the local failure-mode map for this pass.

## What was verified
- `npm run build` passed after the final changes. Static export generated all 12 routes.
- `rg -n "Vision Pro|Apple Vision|Vision|Free \+ Premium|Premium|premium|embed\.js" app public package.json package-lock.json -g '!*.jpg' -g '!*.png' -g '!*.mp4'` returned no matches.
- Exported site served from `out/` at `http://127.0.0.1:3001/` via `python3 -m http.server`.
- Mobile exported route audit at 375x812 checked `/`, `/about.html`, `/evidence.html`, `/systems.html`, `/open-source.html`, `/writing.html`, `/timeline.html`, and `/contact.html`: every page had correct title, non-empty text, zero horizontal overflow, and zero visible reveal sections stuck hidden after the fallback window.
- Tablet 768x1024 and desktop 1440x1000 exported audits checked the same routes. All had zero horizontal overflow. The writing page had one staggered reveal mid-animation at 800ms, then zero hidden visible reveals after the 1.5s fallback check.
- Mobile desk screenshot: seven object links present, no horizontal overflow, object drawings visible.
- Workshop gallery interaction: opened ModelMind, confirmed dialog visible, screenshot thumbnails present, first main image uses `object-fit: contain`, screenshot 2 button changed the main image to `/studio/modelmind-3.jpg`, and full-size screenshot links are available.

## What failed
- The first browser audit found real issues: mobile home overflow from a Manifesto auto-fit grid, an invalid inline script caused by literal newline characters, and noisy Cal.com embed script errors.
- Running `next build` while the dev server was still active corrupted the dev server's `.next` state and produced false `Cannot find module './124.js'` / devtools manifest errors. Clearing `.next`, restarting dev, and then using a production static export separated real app behavior from dev-server churn.
- `next start` cannot serve this repo because `next.config.ts` uses static export output. The correct local production check is serving `out/`.

## What was deferred
- `npm audit --audit-level=moderate` still reports Next's bundled `postcss <8.5.10` advisory. `npm audit fix --force` proposes a breaking downgrade to `next@9.3.3`, so it was not applied. `npm audit --audit-level=high` passes after the safe audit fix.
- The commission remains in `commissions/active/` because this repo had a large pre-existing dirty redesign worktree; moving `_meta` files without a clean commit would blur authorship.

## Disagreements
The mobile desk should not collapse into a plain index. The chosen fix keeps the same physical-object concept but orders it into a tappable mobile grid. That preserves the redesign's thesis while making the page usable.

The Cal.com React wrapper was removed even though it was more configurable. The plain iframe is less magical and more reliable on first load, which mattered more for this pass.

## Reality hooks
- At 375px width, `document.documentElement.scrollWidth > window.innerWidth + 1` should be false on every exported route.
- On `/`, `document.querySelectorAll('section a[aria-label^="Open "]').length` should be `7`.
- In the ModelMind modal, clicking `Show ModelMind screenshot 2` should set the main screenshot `src` to `/studio/modelmind-3.jpg`.
- `rg` should find no Vision Pro, Apple Vision, premium, or `@calcom/embed-react` references in app/public/package files.
- `npm run build` should pass.

## Lessons that may enter canon
Candidate: reveal animations must enhance visible content, never decide whether content exists. The safer pattern is fail-open content with progressive animation after client readiness.

## Candidate phronesis
For mobile-first editorial sites, preserve the visual metaphor but change the composition. A phone version can be orderly without becoming a boring fallback.

## Addendum — 2026-07-01 voice refinement

### Prompt
Refine the site phrasing by drawing from Aria's Medium articles in `CollabVault/content/medium`, with zero AI slop and only real opinions.

### Voice sources read
- `content/medium/INDEX.md`
- `content/medium/archive/published-index.md`
- `content/medium/RUNNING.md`
- `content/medium/reference/02-commands-outline.md`
- `content/medium/articles/drafts/contracts-before-code.md`
- `content/medium/articles/drafts/i-let-claude-spawn-its-own-agents.md`
- `content/medium/articles/published/2026-02-02-openai-codex-desktop-review.md`
- `content/medium/articles/published/2026-02-20-stop-writing-markdown-start-writing-memory.md`
- `content/medium/articles/published/2026-03-09-make-claude-code-actually-work.md`
- `content/medium/articles/published/2026-02-25-year-of-ai-freedom.md`

### Voice rules extracted
- First person and concrete evidence over abstract positioning.
- The chatbot is the wrong frame.
- Evidence beats assertions.
- Structure, memory, contracts, and verification matter more than better prompting.
- The useful work is reducing ambiguity and protecting attention.
- Avoid brochure language such as "measurable value", "AI-native", "production-ready", and "AI systems architect".

### What changed
- Rewrote homepage hero and manifesto copy around attention, verification, memory, and failure modes.
- Rewrote About narrative to connect journalism, code, language, structure, and agent failure modes.
- Tightened ModelMind and Paper Rooms copy around free solo dev truth, model familiarity, local-first reading, and the anti-prompt-trick thesis.
- Reworked HeyContext, HeyContent, and Brink Mind descriptions to be more concrete and less pitch-like.
- Cleaned timeline, writing, contact, systems, open-source, and metadata copy.
- Updated `public/index.md`, `public/llms.txt`, and `public/llms-full.txt` so agent-facing summaries match the human site.

### Verification
- `npm run build` passed.
- Rendered mobile export at 375x812 via local Chrome against `out/`: `/`, `/about.html`, `/systems.html`, `/open-source.html`, `/writing.html`, `/timeline.html`, and `/contact.html` had zero horizontal overflow, zero stuck visible reveal sections, and no text nodes wider than the viewport.
- Banned/corporate phrase search returned no matches for Vision Pro, Apple Vision, premium pricing, `AI systems architect`, `ambient AI`, `AI-native`, `production-ready`, `cutting-edge`, `measurable value`, `operational problems`, or `intelligent workflows` across `app`, `public`, and package files.

## Addendum — 2026-07-01 de-duplication pass

### Prompt
Reduce overlap between the Home page and About page. Keep their words and jobs distinct. Also remove HeyContext and HeyContent screenshots from the workshop modal, leaving only their demo videos.

### What changed
- `app/components/Hero.tsx`: homepage hero now frames the site as a studio for tools, essays, experiments, and proof.
- `app/components/Manifesto.tsx`: homepage manifesto now describes the room/site experience and the visible trail of work, rather than repeating the AI-methodology thesis.
- `app/components/About.tsx`: About now focuses on Aria's path from language, journalism, poems, research, and code into shipped artifacts.
- `app/systems/page.tsx`: removed HeyContext and HeyContent entries from `media`, so their modals have video demos only and no screenshot thumbnails.

### Verification
- `npm run build` passed.
- Search confirmed old overlapping phrases such as `chatbot`, `wrong frame`, `evidence beats`, `structure beats`, `protects the work`, and `babysitting` no longer appear across Home/About copy.
- Search confirmed `HeyContext: [` and `HeyContent: [` no longer appear in `app/systems/page.tsx`.

## Addendum — 2026-07-01 favicon refresh

### Prompt
Redo the favicon to fit the current website style.

### What changed
- Replaced the favicon set with a studio-style monogram: warm paper background, ink `A`, terracotta proof mark, and a subtle catalogue rule.
- Regenerated `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, and `public/apple-touch-icon.png`.
- Added `public/favicon-master.png` as the 1024x1024 source image for future regeneration.

### Verification
- Checked icon dimensions: 16x16, 32x32, 180x180, and 1024x1024 master.
- Previewed the icon at enlarged 16px, 32px, and 180px sizes to make sure the mark stays readable when tiny.
- `npm run build` passed.
