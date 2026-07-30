---
type: plan
status: active
created: 2026-07-30
---

# Inline site editor

Goal: Aria edits copy in the real portfolio layout, with the existing D1
revision and publication pipeline.

1. A tiny loader checks for `?edit=true`; only then does it request private CMS
   state and download the editor overlay.
2. Cloudflare Access protects `/edit/start/`. A validated Access assertion
   becomes a short-lived HttpOnly editor session used by CMS APIs.
3. Double-clicking a visible editable text node turns that node into a plain-text
   editor. Escape cancels; blur or Enter commits locally.
4. Typing and blur update browser memory only. There is no autosave, debounce,
   timer, or background draft write. The fixed action bar saves an immutable
   draft only when Aria clicks **Save draft**. **Publish** remains a separate
   explicit action.
5. Public rendering continues to resolve one published D1 revision on the
   server. No public content is applied after hydration.

Stop before production cutover. Do not apply migration 0004 remotely.

Proof required:

- public page does not request the editor overlay or private CMS state
- unauthenticated edit query exposes no controls or content
- authenticated desktop and mobile pages edit visible copy in place
- rich paste is reduced to text and Escape restores the original value
- after an edit and an idle wait, no write request exists and D1 is unchanged
- draft save leaves public HTML unchanged
- publish, failed invalidation retry, convergence, and restore are exact-once
- metadata, JSON-LD, sitemap, listings, and mobile HTML resolve the same revision
