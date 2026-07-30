import { authorizeCms, cmsErrorResponse, requireJsonRequest } from "@/app/content/auth";
import { createRevision } from "@/app/content/publication";
import { ContentValidationError } from "@/app/content/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireJsonRequest(request);
    const identity = await authorizeCms(request);
    const body = (await request.json()) as {
      content?: unknown;
      basePublishedRevisionId?: string | null;
      parentRevisionId?: string | null;
    };
    const revision = await createRevision({
      content: body.content,
      authorId: identity.email,
      basePublishedRevisionId: body.basePublishedRevisionId ?? null,
      parentRevisionId: body.parentRevisionId ?? null,
    });
    return Response.json({ revision }, { status: 201 });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return Response.json({ error: error.message }, { status: 422 });
    }
    return cmsErrorResponse(error);
  }
}
