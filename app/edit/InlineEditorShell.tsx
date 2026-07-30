"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SiteContent } from "../content/defaultContent";
import { flattenEditableContent, replaceContentAtPath } from "./inlineContent";
import styles from "./InlineEditorShell.module.css";

type RevisionSummary = {
  id: string;
  base_published_revision_id: string | null;
  created_at: string;
  author_id: string;
};

type EditorState = {
  effectiveContent: SiteContent;
  publishedRevisionId: string | null;
  publishedOperationId: string | null;
  revisions: RevisionSummary[];
  operations: Array<{ id: string; target_revision_id: string; state: string }>;
};

type PendingOperation = { id: string; targetRevisionId: string };
type EditableTextNode = ChildNode & CharacterData;

const BLOCKED = new Set([
  "IMG", "INPUT", "VIDEO", "IFRAME", "CANVAS", "SELECT", "TEXTAREA",
  "HR", "BR", "EMBED", "OBJECT", "PROGRESS", "SCRIPT", "STYLE",
]);

const normalize = (value: string) => value.replace(/\u00a0/g, " ").trim();

async function jsonRequest(path: string, body: unknown) {
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) throw new Error(String(result.error ?? `request failed (${response.status})`));
  return result;
}

function directEditableTextNodes(root: Element, values: Set<string>): EditableTextNode[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const matches: EditableTextNode[] = [];
  let node = walker.nextNode();
  while (node) {
    const text = node as EditableTextNode;
    if (values.has(normalize(text.data))) matches.push(text);
    node = walker.nextNode();
  }
  return matches;
}

function placeCaretAtEnd(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export default function InlineEditorShell({ state }: { state: EditorState }) {
  const [content, setContent] = useState(state.effectiveContent);
  const [savedRevisionId, setSavedRevisionId] = useState<string | null>(null);
  const [parentRevisionId, setParentRevisionId] = useState<string | null>(null);
  const [saveRequest, setSaveRequest] = useState<string | null>(null);
  const [publishRequest, setPublishRequest] = useState<{
    targetRevisionId: string;
    expectedRevisionId: string | null;
    expectedPublicationId: string | null;
    idempotencyKey: string;
  } | null>(null);
  const [pendingOperation, setPendingOperation] = useState<PendingOperation | null>(() => {
    const pending = state.operations.find(
      (operation) =>
        operation.id === state.publishedOperationId &&
        operation.state !== "invalidations_complete",
    );
    return pending
      ? { id: pending.id, targetRevisionId: pending.target_revision_id }
      : null;
  });
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Double-click any outlined text to edit it.");
  const contentRef = useRef(content);
  const dirtyRef = useRef(false);
  const savedRevisionRef = useRef<string | null>(null);
  const pendingOperationRef = useRef<PendingOperation | null>(pendingOperation);
  const activeCleanup = useRef<(() => void) | null>(null);
  const hovered = useRef<HTMLElement | null>(null);
  const pendingChoiceNode = useRef<EditableTextNode | null>(null);
  const [pathChoices, setPathChoices] = useState<string[]>([]);

  const fields = useMemo(() => flattenEditableContent(content), [content]);
  const pathsByValue = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const field of fields) {
      const key = normalize(field.value);
      if (!key) continue;
      map.set(key, [...(map.get(key) ?? []), field.path]);
    }
    return map;
  }, [fields]);

  const pathsForNode = useCallback((node: EditableTextNode) => {
    const key = normalize(node.data);
    return pathsByValue.get(key) ?? [];
  }, [pathsByValue]);

  const findCandidate = useCallback((target: EventTarget | null) => {
    const element = target instanceof Element ? target : null;
    if (!element || element.closest("[data-inline-editor-ui]") || BLOCKED.has(element.tagName)) {
      return null;
    }
    const values = new Set(pathsByValue.keys());
    const nodes = directEditableTextNodes(element, values);
    if (nodes.length === 1) return nodes[0];
    const direct = Array.from(element.childNodes).find(
      (node): node is EditableTextNode =>
        node.nodeType === Node.TEXT_NODE && values.has(normalize(node.textContent ?? "")),
    );
    return direct ?? null;
  }, [pathsByValue]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const startEditing = useCallback((node: EditableTextNode, path: string) => {
    if (!node.parentElement) return;
    activeCleanup.current?.();
    setPathChoices([]);
    pendingChoiceNode.current = null;

    const original = node.data;
    const wrapper = document.createElement("span");
    wrapper.dataset.inlineEditorField = path;
    wrapper.className = styles.editing;
    wrapper.contentEditable = "plaintext-only";
    wrapper.spellcheck = true;
    node.replaceWith(wrapper);
    wrapper.textContent = original;
    wrapper.focus();
    placeCaretAtEnd(wrapper);
    setStatus(`Editing ${path}`);

    let composing = false;
    let finished = false;
    const cleanup = (commit: boolean) => {
      if (finished) return;
      finished = true;
      wrapper.removeEventListener("blur", onBlur);
      wrapper.removeEventListener("keydown", onKeyDown);
      wrapper.removeEventListener("paste", onPaste);
      wrapper.removeEventListener("compositionstart", onCompositionStart);
      wrapper.removeEventListener("compositionend", onCompositionEnd);
      const nextValue = commit ? (wrapper.textContent ?? "") : original;
      wrapper.replaceWith(document.createTextNode(nextValue));
      activeCleanup.current = null;
      if (commit && nextValue !== original) {
        const nextContent = replaceContentAtPath(contentRef.current, path, nextValue);
        contentRef.current = nextContent;
        dirtyRef.current = true;
        savedRevisionRef.current = null;
        setContent(nextContent);
        setSavedRevisionId(null);
        setSaveRequest(null);
        setPublishRequest(null);
        setDirty(true);
        setStatus("Unsaved local change.");
      } else {
        setStatus(commit ? "No change." : "Edit cancelled.");
      }
    };
    const onBlur = () => cleanup(true);
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        keyboardEvent.preventDefault();
        cleanup(false);
      } else if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey && !composing) {
        keyboardEvent.preventDefault();
        cleanup(true);
      }
    };
    const onPaste = (pasteEvent: ClipboardEvent) => {
      pasteEvent.preventDefault();
      const text = pasteEvent.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", false, text);
    };
    const onCompositionStart = () => { composing = true; };
    const onCompositionEnd = () => { composing = false; };
    wrapper.addEventListener("blur", onBlur);
    wrapper.addEventListener("keydown", onKeyDown);
    wrapper.addEventListener("paste", onPaste);
    wrapper.addEventListener("compositionstart", onCompositionStart);
    wrapper.addEventListener("compositionend", onCompositionEnd);
    activeCleanup.current = () => cleanup(true);
  }, []);

  useEffect(() => {
    const onPointerOver = (event: PointerEvent) => {
      if (activeCleanup.current) return;
      hovered.current?.classList.remove(styles.editable);
      hovered.current = null;
      const node = findCandidate(event.target);
      const element = node?.parentElement;
      if (!node || !element || pathsForNode(node).length === 0) return;
      element.classList.add(styles.editable);
      hovered.current = element;
    };

    const onDoubleClick = (event: MouseEvent) => {
      const node = findCandidate(event.target);
      const paths = node ? pathsForNode(node) : [];
      if (!node || paths.length === 0 || !node.parentElement) {
        setStatus("That text is part of the layout, so it stays fixed in code.");
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (paths.length === 1) {
        startEditing(node, paths[0]);
        return;
      }
      pendingChoiceNode.current = node;
      setPathChoices(paths);
      setStatus("This phrase is reused. Choose which copy field you mean.");
    };

    const preventActions = (event: MouseEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.type === "click") return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("a, button, form") && !target.closest("[data-inline-editor-ui]")) {
        event.preventDefault();
      }
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("dblclick", onDoubleClick, true);
    document.addEventListener("click", preventActions, true);
    return () => {
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("dblclick", onDoubleClick, true);
      document.removeEventListener("click", preventActions, true);
      hovered.current?.classList.remove(styles.editable);
      activeCleanup.current?.();
    };
  }, [findCandidate, pathsForNode, startEditing]);

  async function saveDraft() {
    activeCleanup.current?.();
    setBusy(true);
    setStatus("Saving draft...");
    try {
      const idempotencyKey = saveRequest ?? crypto.randomUUID();
      setSaveRequest(idempotencyKey);
      const result = await jsonRequest("/api/cms/revisions", {
        content: contentRef.current,
        basePublishedRevisionId: state.publishedRevisionId,
        parentRevisionId,
        idempotencyKey,
      });
      const revision = result.revision as { id: string };
      savedRevisionRef.current = revision.id;
      dirtyRef.current = false;
      setSavedRevisionId(revision.id);
      setParentRevisionId(revision.id);
      setSaveRequest(null);
      setDirty(false);
      setStatus("Draft saved. Public site unchanged.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Draft save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function observeAndConverge(operation: PendingOperation) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const response = await fetch("/api/cms/converge", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          operationId: operation.id,
          observedRevisionId: operation.targetRevisionId,
        }),
      });
      if (response.ok) return true;
      if (response.status !== 409) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error ?? `convergence check failed (${response.status})`);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return false;
  }

  async function publish() {
    activeCleanup.current?.();
    const targetRevisionId = savedRevisionRef.current;
    if (!targetRevisionId) {
      setStatus("Save this change as a draft before publishing.");
      return;
    }
    setBusy(true);
    setStatus("Publishing...");
    try {
      const request =
        publishRequest?.targetRevisionId === targetRevisionId
          ? publishRequest
          : {
              targetRevisionId,
              expectedRevisionId: state.publishedRevisionId,
              expectedPublicationId: state.publishedOperationId,
              idempotencyKey: crypto.randomUUID(),
            };
      setPublishRequest(request);
      const result = await jsonRequest("/api/cms/publish", request);
      const raw = result.operation as { id: string; target_revision_id: string };
      const operation = { id: raw.id, targetRevisionId: raw.target_revision_id };
      pendingOperationRef.current = operation;
      setPendingOperation(operation);
      setPublishRequest(null);
      if (await observeAndConverge(operation)) {
        setStatus("Published. Reloading current page...");
        window.location.reload();
      } else {
        setStatus("Published, but the cached page is stale. Retry is safe.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publish failed.");
    } finally {
      setBusy(false);
    }
  }

  async function retry() {
    activeCleanup.current?.();
    const operation = pendingOperationRef.current;
    if (!operation || dirtyRef.current) {
      if (dirtyRef.current) setStatus("Save or discard the local change before retrying.");
      return;
    }
    setBusy(true);
    setStatus("Retrying page refresh...");
    try {
      await jsonRequest("/api/cms/retry", { operationId: operation.id });
      if (await observeAndConverge(operation)) window.location.reload();
      else setStatus("Still stale. The published revision is safe in D1.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Retry failed.");
    } finally {
      setBusy(false);
    }
  }

  function discard() {
    activeCleanup.current?.();
    if (dirtyRef.current && !window.confirm("Discard this unsaved local edit?")) return;
    window.location.reload();
  }

  function exit() {
    activeCleanup.current?.();
    if (dirtyRef.current && !window.confirm("Leave edit mode and discard the unsaved edit?")) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("edit");
    window.location.assign(`${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <aside className={styles.toolbar} data-inline-editor-ui aria-label="Portfolio edit controls">
      {pathChoices.length > 0 && (
        <div className={styles.choices} role="group" aria-label="Choose copy field">
          {pathChoices.map((path) => (
            <button
              className={styles.button}
              key={path}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                const node = pendingChoiceNode.current;
                if (node) startEditing(node, path);
              }}
            >
              {path}
            </button>
          ))}
        </div>
      )}
      <span className={styles.status} aria-live="polite">{status}</span>
      <button className={styles.button} type="button" disabled={busy || !dirty} onClick={saveDraft}>
        Save draft
      </button>
      <button className={styles.button} type="button" disabled={busy || !savedRevisionId} onClick={publish}>
        Publish
      </button>
      {pendingOperation && (
        <button className={styles.button} type="button" disabled={busy || dirty} onClick={retry}>
          Retry
        </button>
      )}
      <button className={styles.button} type="button" disabled={busy} onClick={discard}>
        Discard
      </button>
      <button className={styles.button} type="button" disabled={busy} onClick={exit}>
        Exit
      </button>
    </aside>
  );
}
