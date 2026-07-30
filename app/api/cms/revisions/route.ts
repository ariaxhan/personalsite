import { authorizeCms, cmsErrorResponse, requireJsonRequest } from "@/app/content/auth";
import {
  createRevision,
  PublicationConflictError,
} from "@/app/content/publication";
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
      idempotencyKey?: string;
    };
    if (!body.idempotencyKey) {
      return Response.json(
        { error: "idempotencyKey is required" },
        { status: 400 },
      );
    }
    const revision = await createRevision({
      content: body.content,
      authorId: identity.email,
      basePublishedRevisionId: body.basePublishedRevisionId ?? null,
      parentRevisionId: body.parentRevisionId ?? null,
      idempotencyKey: body.idempotencyKey,
    });
    return Response.json({ revision }, { status: 201 });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return Response.json({ error: error.message }, { status: 422 });
    }
    if (error instanceof PublicationConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    return cmsErrorResponse(error);
  }
}
