# Failure map — mobile-first redesign hardening

## Scope
Local failure-mode pass for the redesigned Next.js personal site.

## Failure modes

| Symptom | Likely cause | Fix direction | Verification |
|---|---|---|---|
| Section missing on first load until refresh | Reveal CSS hides content before client enhancement completes or observer misses the first intersection | Make reveal fail-open by default and only animate after an enhancement class is present | Cold-load pages, inspect screenshots before any refresh |
| Object room disappears on phone | Mobile branch replaced visual objects with a plain index | Render the same object drawings in a mobile grid with labels and real links | 375px screenshot shows all objects and labels |
| Workshop screenshots cannot be inspected | Modal media is static and thumbnails are not interactive | Add selectable media, keyboard-friendly buttons, and full-size image links | Click modal thumbnails and observe main media changes |
| Vertical screenshots cut off | Shared `object-cover` and fixed wide aspect ratio crop tall images | Detect/mark portrait images and use `object-contain` with taller bounded frames | Open ModelMind/Paper Rooms vertical screenshots |
| Mobile text feels like desktop squeezed down | Large fixed spacing, horizontal grids, tilted cards, and narrow nav sheet | Add mobile-specific spacing, type, grid, and rotation rules | Check 375, 768, 1440 widths for clipping/overflow |
| Product copy overclaims platforms/pricing/team | Stale data in `systemsData` | Replace Vision Pro/premium/founder-team language with free solo dev copy | `rg` for banned terms and inspect rendered modal |

## Rule of thumb for this pass
Content must exist before animation. Mobile can rearrange the room, but it cannot swap the room for a text-only sitemap.
