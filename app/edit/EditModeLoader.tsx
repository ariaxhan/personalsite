"use client";

import { useEffect, useState } from "react";

type EditorState = {
  effectiveContent: import("../content/defaultContent").SiteContent;
  publishedRevisionId: string | null;
  publishedOperationId: string | null;
  revisions: Array<{
    id: string;
    base_published_revision_id: string | null;
    created_at: string;
    author_id: string;
  }>;
  operations: Array<{
    id: string;
    target_revision_id: string;
    state: string;
  }>;
};

export default function EditModeLoader({ publicUrl }: { publicUrl?: string }) {
  const [state, setState] = useState<EditorState | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [Shell, setShell] = useState<React.ComponentType<{ state: EditorState }> | null>(null);

  useEffect(() => {
    if (publicUrl && window.location.pathname.startsWith("/edit-mode")) {
      window.history.replaceState(window.history.state, "", publicUrl);
    }
    const params = new URLSearchParams(
      publicUrl ? new URL(publicUrl, window.location.origin).search : window.location.search,
    );
    if (params.get("edit") !== "true") return;
    setEnabled(true);

    const load = async () => {
      const response = await fetch("/api/cms/state", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (response.status === 401 || response.status === 403 || response.status === 503) {
        const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.assign(`/edit/start/?return=${encodeURIComponent(returnTo)}`);
        return;
      }
      if (!response.ok) return;
      const [result, module] = await Promise.all([
        response.json() as Promise<EditorState>,
        import("./InlineEditorShell"),
      ]);
      setState(result);
      setShell(() => module.default);
    };
    void load();
  }, [publicUrl]);

  if (!enabled || !state || !Shell) return null;
  return <Shell state={state} />;
}
