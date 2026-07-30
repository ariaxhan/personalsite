import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { authorizeCms } from "../content/auth";
import { DEFAULT_SITE_CONTENT } from "../content/defaultContent";
import { cmsState } from "../content/publication";
import ContentEditor from "./ContentEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private portfolio editor",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EditorPage() {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost";
  const protocol = incoming.has("cf-ray")
    ? incoming.get("x-forwarded-proto") ?? "https"
    : "http";
  try {
    await authorizeCms(
      new Request(`${protocol}://${host}/edit/`, { headers: incoming }),
    );
  } catch {
    notFound();
  }

  const state = await cmsState();
  const pendingOperation = state.operations.find(
    (operation) =>
      operation.id === state.publishedOperationId &&
      operation.state !== "invalidations_complete",
  );
  return (
    <ContentEditor
      initialContent={state.publishedContent ?? DEFAULT_SITE_CONTENT}
      publishedRevisionId={state.publishedRevisionId}
      publishedOperationId={state.publishedOperationId}
      revisions={state.revisions}
      initialPendingOperation={
        pendingOperation
          ? { id: pendingOperation.id, targetRevisionId: pendingOperation.target_revision_id }
          : null
      }
    />
  );
}
