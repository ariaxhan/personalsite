---
type: research
status: active
created: 2026-07-30
query: inline editing existing React site open source contenteditable failure modes
observed_at: 2026-07-30
ttl_days: 90
---

# Inline editing fit

## Selected pattern

Adapt the interaction used by MIT-licensed `react-rewrite`: enter editing from a
document-level double click, edit the existing text node in place, commit on
blur, cancel with Escape, and keep the action bar separate from the content.
Replace its source-file rewriting with the portfolio's existing D1 revision API.

This also matches WordPress content-only editing: the page remains the primary
interface, layout is locked, and publishing controls are secondary.

## Rejected packages

- Puck supports inline fields, but adopting it would remodel the portfolio into
  a page-builder component schema and ship a much larger editing system.
- TinaCMS replaces the existing D1 publication backend with Git and GraphQL.
- `use-editable` is a good controlled-React primitive, but the portfolio contains
  server components whose existing DOM must be edited without rebuilding them.

## Failure modes carried into implementation

- React rerenders replacing an actively edited node.
- rich HTML pasted into a plain-text field.
- duplicate visible strings mapping to the wrong content path.
- links or buttons activating while the user is trying to edit.
- IME composition being committed by Enter.
- dirty edits lost on navigation.
- an unauthenticated `?edit=true` leaking data or loading the editor bundle.
- draft save response loss producing duplicate revisions.
- publication succeeding while cache invalidation remains stale.

## Sources

- https://github.com/donghaxkim/react-rewrite
- https://developer.wordpress.org/block-editor/contributors/design/the-block/
- https://developer.wordpress.org/news/2024/11/how-to-add-content-only-editing-support-to-a-block/
- https://github.com/puckeditor/puck
- https://github.com/tinacms/tinacms
- https://github.com/FormidableLabs/use-editable
