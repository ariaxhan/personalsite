import type { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isCmsEditorEnabled } from "../../content/auth";

export const dynamic = "force-dynamic";
const TOKEN_PREVIEW_HOST =
  "personalsite-cms-preview.ariaxhan.workers.dev";

export const metadata: Metadata = {
  title: "Private portfolio editor login",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EditorLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { env } = await getCloudflareContext({ async: true });
  if (!isCmsEditorEnabled(env.CMS_EDITOR_ENABLED)) {
    notFound();
  }
  const incoming = await headers();
  const hostname = (incoming.get("host") ?? "").split(":")[0];
  const tokenLoginAvailable =
    hostname === TOKEN_PREVIEW_HOST ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    !incoming.has("cf-ray");
  const { error } = await searchParams;
  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 pb-24 pt-32 sm:px-8">
      <div className="kicker mb-3">Preview only</div>
      <h1 className="font-serif text-4xl">Open the portfolio editor</h1>
      {tokenLoginAvailable ? (
        <>
          <p className="mt-4 text-ink-muted">
            Cloudflare Access replaces this temporary preview login before the
            live route moves.
          </p>
          <form
            method="post"
            action="/api/cms/preview-session"
            className="mt-10 grid gap-4 border-t border-[rgba(44,40,35,0.18)] pt-8"
          >
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-mute">
                Preview token
              </span>
              <input
                type="password"
                name="token"
                autoComplete="off"
                required
                className="field-input"
              />
            </label>
            {error ? (
              <p role="alert" className="m-0 text-sm text-terracotta">
                That token did not match.
              </p>
            ) : null}
            <button type="submit" className="field-button justify-self-start">
              Open editor
            </button>
          </form>
        </>
      ) : (
        <div className="mt-10 border-t border-[rgba(44,40,35,0.18)] pt-8">
          <p className="m-0 text-ink-muted">
            This hostname uses Cloudflare Access. Temporary token login is
            available only on the isolated Workers preview.
          </p>
          <a
            className="field-button mt-5 inline-flex"
            href={`https://${TOKEN_PREVIEW_HOST}/edit/login/`}
          >
            Open isolated preview login
          </a>
        </div>
      )}
    </main>
  );
}
