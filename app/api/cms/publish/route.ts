import { authorizeCms, cmsErrorResponse } from "@/app/content/auth";
import { PublicationConflictError, publishRevision } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const identity = await authorizeCms(request);
    if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
      return Response.json({ error: "application/json required" }, { status: 415 });
    }
    const body = (await request.json()) as {
      targetRevisionId?: string;
      expectedRevisionId?: string | null;
      idempotencyKey?: string;
    };
    if (!body.targetRevisionId || !body.idempotencyKey) {
      return Response.json(
        { error: "targetRevisionId and idempotencyKey are required" },
        { status: 400 },
      );
    }
    const operation = await publishRevision({
      targetRevisionId: body.targetRevisionId,
      expectedRevisionId: body.expectedRevisionId ?? null,
      idempotencyKey: body.idempotencyKey,
      forceInvalidationFailure:
        identity.subject === "local-development" &&
        request.headers.get("x-cms-force-invalidation-failure") === "true",
    });
    return Response.json({ operation });
  } catch (error) {
    if (error instanceof PublicationConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    return cmsErrorResponse(error);
  }
}
