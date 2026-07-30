import { authorizeCms, cmsErrorResponse } from "@/app/content/auth";
import { DEFAULT_SITE_CONTENT } from "@/app/content/defaultContent";
import { cmsState } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await authorizeCms(request);
    const state = await cmsState();
    return Response.json({
      ...state,
      effectiveContent: state.publishedContent ?? DEFAULT_SITE_CONTENT,
    });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
