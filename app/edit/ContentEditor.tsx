"use client";

import { useEffect, useMemo, useState } from "react";
import type { SiteContent } from "../content/defaultContent";
import { isEditableContentPath } from "../content/editablePaths";

type RevisionSummary = {
  id: string;
  base_published_revision_id: string | null;
  created_at: string;
  author_id: string;
};

type PendingOperation = {
  id: string;
  targetRevisionId: string;
};

type Field = {
  path: string;
  value: string;
};

function flatten(value: unknown, path = ""): Field[] {
  if (typeof value === "string") {
    return path && isEditableContentPath(path) ? [{ path, value }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((child, index) => flatten(child, path ? `${path}.${index}` : `${index}`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      flatten(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

function replaceAtPath(content: SiteContent, path: string, value: string): SiteContent {
  const clone = structuredClone(content) as unknown as Record<string, unknown>;
  const parts = path.split(".");
  let cursor: Record<string, unknown> | unknown[] = clone;
  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = (cursor as Record<string, unknown>)[parts[index]] as
      | Record<string, unknown>
      | unknown[];
  }
  (cursor as Record<string, unknown>)[parts.at(-1)!] = value;
  return clone as unknown as SiteContent;
}

async function jsonRequest(path: string, body: unknown) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) throw new Error(String(result.error ?? `request failed (${response.status})`));
  return result;
}

export default function ContentEditor({
  initialContent,
  publishedRevisionId,
  revisions,
  initialPendingOperation,
}: {
  initialContent: SiteContent;
  publishedRevisionId: string | null;
  revisions: RevisionSummary[];
  initialPendingOperation: PendingOperation | null;
}) {
  const [content, setContent] = useState(initialContent);
  const [revisionList, setRevisionList] = useState(revisions);
  const [savedRevisionId, setSavedRevisionId] = useState<string | null>(null);
  const [parentRevisionId, setParentRevisionId] = useState<string | null>(null);
  const [pendingOperation, setPendingOperation] =
    useState<PendingOperation | null>(initialPendingOperation);
  const [publishRequest, setPublishRequest] = useState<{
    targetRevisionId: string;
    expectedRevisionId: string | null;
    idempotencyKey: string;
  } | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("No unsaved changes.");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const fields = useMemo(() => flatten(content), [content]);
  const visibleFields = fields.filter((field) =>
    `${field.path} ${field.value}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [dirty]);

  async function saveDraft() {
    setBusy(true);
    setStatus("Saving draft...");
    try {
      const result = await jsonRequest("/api/cms/revisions", {
        content,
        basePublishedRevisionId: publishedRevisionId,
        parentRevisionId,
      });
      const revision = result.revision as { id: string };
      setSavedRevisionId(revision.id);
      setParentRevisionId(revision.id);
      setRevisionList((current) => [
        {
          id: revision.id,
          base_published_revision_id: publishedRevisionId,
          created_at: new Date().toISOString(),
          author_id: "current editor",
        },
        ...current.filter((item) => item.id !== revision.id),
      ]);
      setDirty(false);
      setStatus(`Draft saved as ${revision.id}. Public content did not change.`);
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
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          operationId: operation.id,
          observedRevisionId: operation.targetRevisionId,
        }),
      });
      if (response.ok) {
        return true;
      }
      if (response.status !== 409) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error ?? `convergence check failed (${response.status})`);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return false;
  }

  async function publish(targetRevisionId = savedRevisionId) {
    if (!targetRevisionId) {
      setStatus("Save a draft before publishing.");
      return;
    }
    setBusy(true);
    setStatus("Publishing and refreshing public pages...");
    try {
      const request =
        publishRequest?.targetRevisionId === targetRevisionId &&
        publishRequest.expectedRevisionId === publishedRevisionId
          ? publishRequest
          : {
              targetRevisionId,
              expectedRevisionId: publishedRevisionId,
              idempotencyKey: crypto.randomUUID(),
            };
      setPublishRequest(request);
      const result = await jsonRequest("/api/cms/publish", {
        ...request,
      });
      const rawOperation = result.operation as { id: string; target_revision_id: string };
      const operation = {
        id: rawOperation.id,
        targetRevisionId: rawOperation.target_revision_id,
      };
      setPendingOperation(operation);
      const observed = await observeAndConverge(operation);
      if (observed) {
        setStatus("Published and observed in public HTML. Reloading...");
        window.location.reload();
      } else {
        setStatus("Published in D1, but cached HTML has not converged yet. Retry invalidation.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publish failed.");
    } finally {
      setBusy(false);
    }
  }

  async function retryInvalidation() {
    if (!pendingOperation) return;
    setBusy(true);
    setStatus("Retrying the original invalidation...");
    try {
      await jsonRequest("/api/cms/retry", { operationId: pendingOperation.id });
      if (await observeAndConverge(pendingOperation)) {
        setStatus("Retry converged across representative public output. Reloading...");
        window.location.reload();
      } else {
        setStatus("Retry dispatched, but public output is still stale.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Invalidation retry failed.");
    } finally {
      setBusy(false);
    }
  }

  async function loadRevision(revisionId: string) {
    setBusy(true);
    setStatus(`Loading ${revisionId}...`);
    try {
      const response = await fetch(`/api/cms/revisions/${encodeURIComponent(revisionId)}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as {
        error?: string;
        content?: SiteContent;
      };
      if (!response.ok || !result.content) {
        throw new Error(result.error ?? "Revision load failed.");
      }
      setContent(result.content);
      setSavedRevisionId(revisionId);
      setParentRevisionId(revisionId);
      setPublishRequest(null);
      setDirty(false);
      setStatus(`Loaded ${revisionId}. You can edit it or publish it as a restore.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Revision load failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 lg:px-14">
      <header className="border-b border-[rgba(44,40,35,0.18)] pb-8">
        <div className="kicker mb-3">Private editor</div>
        <h1 className="font-serif text-4xl">Edit the portfolio copy</h1>
        <p className="mt-4 max-w-prose text-ink-muted">
          Type here, save an immutable draft, then publish. URLs, slugs, media, metrics, and
          layout stay fixed in code.
        </p>
      </header>

      <div className="sticky top-16 z-50 my-6 grid gap-3 border-y border-[rgba(44,40,35,0.18)] bg-studio-paper/95 py-4 backdrop-blur sm:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search text or field path"
          className="field-input"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={saveDraft} className="field-button">
            Save draft
          </button>
          <button type="button" disabled={busy || !savedRevisionId} onClick={() => publish()} className="field-button">
            Publish draft
          </button>
          <button
            type="button"
            disabled={busy || !pendingOperation}
            onClick={retryInvalidation}
            className="field-button"
          >
            Retry publish
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setContent(initialContent);
              setSavedRevisionId(null);
              setParentRevisionId(null);
              setPublishRequest(null);
              setDirty(false);
              setStatus("Local changes discarded.");
            }}
            className="field-button"
          >
            Discard
          </button>
        </div>
        <p className="m-0 text-sm text-ink-muted sm:col-span-2" aria-live="polite">
          {status}
        </p>
      </div>

      <section className="grid gap-5">
        {visibleFields.map((field) => (
          <label key={field.path} className="grid gap-2 border-b border-[rgba(44,40,35,0.12)] pb-5">
            <span className="font-mono text-[10px] tracking-[0.08em] text-ink-mute">
              {field.path}
            </span>
            {field.value.length > 100 ? (
              <textarea
                value={field.value}
                rows={Math.min(10, Math.max(3, Math.ceil(field.value.length / 90)))}
                onChange={(event) => {
                  setContent((current) => replaceAtPath(current, field.path, event.target.value));
                  setSavedRevisionId(null);
                  setPublishRequest(null);
                  setDirty(true);
                  setStatus("Unsaved local changes.");
                }}
                className="field-input resize-y"
              />
            ) : (
              <input
                value={field.value}
                onChange={(event) => {
                  setContent((current) => replaceAtPath(current, field.path, event.target.value));
                  setSavedRevisionId(null);
                  setPublishRequest(null);
                  setDirty(true);
                  setStatus("Unsaved local changes.");
                }}
                className="field-input"
              />
            )}
          </label>
        ))}
      </section>

      <section className="mt-16 border-t border-[rgba(44,40,35,0.18)] pt-8">
        <h2 className="font-serif text-2xl">Revision history</h2>
        <ul className="mt-5 grid gap-3">
          {revisionList.map((revision) => (
            <li key={revision.id} className="flex flex-wrap items-center justify-between gap-3 border-b py-3">
              <span className="font-mono text-xs">
                {new Date(revision.created_at).toLocaleString()} · {revision.id}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => loadRevision(revision.id)}
                  className="field-button"
                >
                  Load
                </button>
                <button
                  type="button"
                  disabled={busy || revision.id === publishedRevisionId}
                  onClick={() => publish(revision.id)}
                  className="field-button"
                >
                  {revision.id === publishedRevisionId ? "Published" : "Restore"}
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
