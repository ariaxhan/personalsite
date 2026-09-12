import { NextResponse } from "next/server";
import {
  authorizeCms,
  CMS_ACCESS_COOKIE_OPTIONS,
  cmsErrorResponse,
} from "@/app/content/auth";

export const dynamic = "force-dynamic";

function safeReturnPath(request: Request): string {
  const candidate = new URL(request.url).searchParams.get("return");
  if (!candidate?.startsWith("/") || candidate.startsWith("//")) return "/?edit=true";
  const url = new URL(candidate, request.url);
  if (url.origin !== new URL(request.url).origin) return "/?edit=true";
  url.searchParams.set("edit", "true");
  return `${url.pathname}${url.search}${url.hash}`;
}

export async function GET(request: Request) {
  try {
    await authorizeCms(request);
    const assertion = request.headers.get("cf-access-jwt-assertion");
    const response = NextResponse.redirect(new URL(safeReturnPath(request), request.url), 303);
    if (assertion) {
      response.cookies.set(
        "cms-access-assertion",
        assertion,
        CMS_ACCESS_COOKIE_OPTIONS,
      );
    }
    response.headers.set("cache-control", "private, no-store");
    response.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
    return response;
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
