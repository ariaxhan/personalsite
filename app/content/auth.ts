import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createRemoteJWKSet, jwtVerify } from "jose";

export type CmsIdentity = {
  email: string;
  subject: string;
};

export class CmsAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "CmsAuthError";
    this.status = status;
  }
}

export function requireSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  if (!origin || origin !== expected) {
    throw new CmsAuthError("same-origin request required", 403);
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    throw new CmsAuthError("cross-site request rejected", 403);
  }
}

export function requireJsonRequest(request: Request): void {
  requireSameOrigin(request);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new CmsAuthError("application/json required", 415);
  }
}

async function cmsEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env as CloudflareEnv & {
    CMS_ACCESS_TEAM?: string;
    CMS_ACCESS_AUD?: string;
    CMS_EDITOR_EMAIL?: string;
    CMS_EDITOR_ENABLED?: string;
    CMS_DEV_TOKEN?: string;
    CMS_LOCAL_DEV_AUTH?: string;
    CMS_PREVIEW_DEV_AUTH?: string;
  };
}

export function isCmsEditorEnabled(value: string | undefined): boolean {
  return value === "true";
}

function decodeCookieValue(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new CmsAuthError("malformed cookie", 401);
  }
}

export async function authorizeCms(request: Request): Promise<CmsIdentity> {
  const env = await cmsEnv();
  if (!isCmsEditorEnabled(env.CMS_EDITOR_ENABLED)) {
    throw new CmsAuthError("Not found", 404);
  }
  const url = new URL(request.url);
  const cookies = new Map(
    (request.headers.get("cookie") ?? "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        return separator < 0
          ? [part, ""]
          : [part.slice(0, separator), decodeCookieValue(part.slice(separator + 1))];
      }),
  );
  const cookieToken = cookies.get("cms-preview-session");
  const devToken = request.headers.get("x-cms-dev-token") ?? cookieToken;
  const isExplicitLocalRuntime =
    env.CMS_LOCAL_DEV_AUTH === "enabled" &&
    url.protocol === "http:" &&
    !request.headers.has("cf-ray");
  if (
    env.CMS_DEV_TOKEN &&
    devToken === env.CMS_DEV_TOKEN &&
    (
      isExplicitLocalRuntime ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      (
        env.CMS_PREVIEW_DEV_AUTH === "enabled" &&
        url.hostname === "personalsite-cms-preview.ariaxhan.workers.dev"
      )
    )
  ) {
    return { email: env.CMS_EDITOR_EMAIL ?? "local", subject: "local-development" };
  }

  const team = env.CMS_ACCESS_TEAM;
  const audience = env.CMS_ACCESS_AUD;
  const allowedEmail = env.CMS_EDITOR_EMAIL;
  if (!team || !audience || !allowedEmail) {
    throw new CmsAuthError("editor authentication is not configured", 503);
  }

  const assertion =
    request.headers.get("cf-access-jwt-assertion") ??
    cookies.get("cms-access-assertion");
  if (!assertion) throw new CmsAuthError("authentication required");

  const issuer = `https://${team}.cloudflareaccess.com`;
  const jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
  const { payload } = await jwtVerify(assertion, jwks, {
    issuer,
    audience,
    algorithms: ["RS256"],
  });
  if (typeof payload.exp !== "number") {
    throw new CmsAuthError("editor assertion has no expiry", 401);
  }

  const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
  if (email !== allowedEmail.toLowerCase()) {
    throw new CmsAuthError("editor identity is not allowed", 403);
  }

  return { email, subject: payload.sub ?? email };
}

export function cmsErrorResponse(error: unknown): Response {
  if (error instanceof CmsAuthError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  throw error;
}
