import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import {
  CmsAuthError,
  cmsErrorResponse,
  isCmsEditorEnabled,
  requireSameOrigin,
} from "@/app/content/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const contentType = request.headers.get("content-type")?.split(";")[0].trim();
    if (
      contentType !== "application/x-www-form-urlencoded" &&
      contentType !== "multipart/form-data"
    ) {
      throw new CmsAuthError("form content type required", 415);
    }
    const url = new URL(request.url);
    const { env: cloudflareEnv } = await getCloudflareContext({ async: true });
    const env = cloudflareEnv as CloudflareEnv & {
      CMS_DEV_TOKEN?: string;
      CMS_EDITOR_ENABLED?: string;
      CMS_LOCAL_DEV_AUTH?: string;
      CMS_PREVIEW_DEV_AUTH?: string;
    };
    const isExplicitLocalRuntime =
      env.CMS_LOCAL_DEV_AUTH === "enabled" &&
      url.protocol === "http:" &&
      !request.headers.has("cf-ray");
    if (
      (
        url.hostname !== "personalsite-cms-preview.ariaxhan.workers.dev" &&
        !isExplicitLocalRuntime
      ) ||
      !isCmsEditorEnabled(env.CMS_EDITOR_ENABLED) ||
      env.CMS_PREVIEW_DEV_AUTH !== "enabled" ||
      !env.CMS_DEV_TOKEN
    ) {
      return new Response("Not found", { status: 404 });
    }

    const form = await request.formData();
    const token = form.get("token");
    if (typeof token !== "string" || token !== env.CMS_DEV_TOKEN) {
      return NextResponse.redirect(new URL("/edit/login/?error=1", request.url), 303);
    }

    const response = NextResponse.redirect(new URL("/?edit=true", request.url), 303);
    response.cookies.set("cms-preview-session", token, {
      httpOnly: true,
      secure: !isExplicitLocalRuntime,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });
    return response;
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
