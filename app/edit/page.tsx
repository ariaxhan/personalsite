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
  try {
    await authorizeCms(new Request(`https://${host}/edit/`, { headers: incoming }));
  } catch {
    notFound();
  }

  const state = await cmsState();
  return (
    <ContentEditor
      initialContent={state.publishedContent ?? DEFAULT_SITE_CONTENT}
      publishedRevisionId={state.publishedRevisionId}
      revisions={state.revisions}
    />
  );
}
