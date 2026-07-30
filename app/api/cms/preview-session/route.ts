import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const { env: cloudflareEnv } = await getCloudflareContext({ async: true });
  const env = cloudflareEnv as CloudflareEnv & {
    CMS_DEV_TOKEN?: string;
    CMS_PREVIEW_DEV_AUTH?: string;
  };
  if (
    url.hostname !== "personalsite-cms-preview.ariaxhan.workers.dev" ||
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

  const response = NextResponse.redirect(new URL("/edit/", request.url), 303);
  response.cookies.set("cms-preview-session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
  return response;
}
