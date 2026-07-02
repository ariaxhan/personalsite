# Commission — Mobile-first redesign hardening

## Telos of this commission
The redesigned personal site should feel intentional on a phone first, not like a desktop composition that survived being squeezed. Every public page must load cleanly on first open, stay readable, keep its visual identity, and make the studio objects and project evidence usable.

## Authority granted
The runner may edit the `personalsite` Next.js app, public studio assets wiring, project copy, and local `_meta` documentation needed to complete this pass. The runner may run local dev, build, lint, accessibility-oriented keyboard checks, and browser verification across desktop and mobile viewports.

## Boundaries
Do not replace the current redesign concept with a new visual direction. Do not remove the cute object room; adjust it so the same objects remain visible and usable on mobile. Do not hardcode secrets or machine-specific paths. Do not rewrite unrelated content or remove existing project history.

## Context
The current redesign is already in progress and the worktree is dirty. The critical defect is mobile quality: readability, spacing, navigation, object visibility, project screenshot viewing, and first-load reliability. The suspected first-load issue is likely tied to client-side reveal behavior in Next.js. ModelMind and Paper Rooms must no longer mention Vision Pro or premium pricing, and both must read as free solo dev projects.

## Desired outcomes
- Mobile-first site: every route renders cleanly at phone width with readable type, reachable controls, no clipped primary content, and no horizontal page overflow. LOOK AT `app/components/*` and all route pages. VERIFIED by live browser checks at mobile, tablet, and desktop widths.
- Living desk: the object room remains object-based on mobile, with all objects visible, labeled, and tappable. LOOK AT `app/components/LivingDesk.tsx`. VERIFIED by first-load mobile screenshot and link presence.
- First-load reliability: sections wrapped in reveal behavior are visible on first open without needing a refresh. LOOK AT `app/components/studio/Reveal.tsx` and `app/globals.css`. VERIFIED by cold page loads and DOM/screenshot checks.
- Workshop wall media: screenshots can be opened and inspected, with vertical screenshots contained rather than cropped. LOOK AT `app/components/WorkshopWall.tsx`. VERIFIED by clicking cards, opening gallery media, and testing vertical images.
- Product truth: ModelMind and Paper Rooms are described as free solo dev projects, with no Vision Pro or premium language. LOOK AT `app/utils/systemsData.ts`. VERIFIED by text search and rendered modal copy.

## Known facts
ModelMind is free. Paper Rooms is free. ModelMind and Paper Rooms are solo dev projects. Vision Pro / Apple Vision language should be removed from both.

## Questions to challenge
- Is a mobile simplification hiding the visual point of the redesign?
- Is any screenshot crop improving the card while making the modal useless?
- Is the first-load fix relying on animation timing instead of making content visible by default?
- Is any role copy overclaiming team scope instead of saying solo dev directly?

## Verification standard
Done means the site has been built and inspected live. Required checks: `npm run build`, rendered browser checks at 375, 768, and 1440 widths, no relevant console errors, first-load sections visible without refresh, object room visible on mobile, workshop screenshots clickable, and search confirming no Vision Pro or premium copy remains for ModelMind or Paper Rooms.

## Expected chronicle
Write `_meta/chronicles/2026/2026-06-30-mobile-first-redesign-hardening.md` with what changed, what was verified, failures, residue, and future audit hooks.

## Canon / phronesis extraction rule
If the reveal-first-load issue proves to be a general pattern, preserve the lesson: animation should enhance visible content, never gate content visibility after hydration.
