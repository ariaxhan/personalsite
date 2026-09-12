import { SITE } from "../utils/siteCopy";

export const CONTENT_RECOVERY_MARKER = 'data-content-recovery="true"';

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function recoveryHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${escapeHtml(SITE.name)} | temporarily unavailable</title>
  <style>
    :root { color-scheme: light; background: #f3ede0; color: #263746; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; }
    main { min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
    section { width: min(42rem, 100%); }
    .label { margin: 0 0 1rem; font: .75rem ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 0 0 1rem; font: 400 clamp(2.5rem, 8vw, 5rem)/.98 Georgia, serif; }
    .note { margin: 0; max-width: 34rem; font-size: 1rem; line-height: 1.6; }
  </style>
</head>
<body>
  <main ${CONTENT_RECOVERY_MARKER}>
    <section>
      <p class="label">${escapeHtml(SITE.name)}</p>
      <h1>${escapeHtml(SITE.oneLiner)}</h1>
      <p class="note">The site is temporarily unavailable. Please try again in a minute.</p>
    </section>
  </main>
</body>
</html>`;
}

export async function normalizeRecoveryResponse(response: Response): Promise<Response> {
  if (response.status !== 500) return response;
  if (!response.headers.get("content-type")?.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Retry-After", "60");
  headers.set("X-Content-Source", "git-recovery");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.delete("Content-Length");
  headers.delete("ETag");

  return new Response(recoveryHtml(), {
    status: 503,
    statusText: "Service Unavailable",
    headers,
  });
}
