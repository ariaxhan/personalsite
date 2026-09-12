import { authorizeCms, cmsErrorResponse, requireJsonRequest } from "@/app/content/auth";
import { PublicationConflictError, publishRevision } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireJsonRequest(request);
    const identity = await authorizeCms(request);
    const body = (await request.json()) as {
      targetRevisionId?: string;
      expectedRevisionId?: string | null;
      expectedPublicationId?: string | null;
      idempotencyKey?: string;
    };
    if (
      !body.targetRevisionId ||
      !body.idempotencyKey ||
      !Object.hasOwn(body, "expectedPublicationId")
    ) {
      return Response.json(
        {
          error:
            "targetRevisionId, expectedPublicationId, and idempotencyKey are required",
        },
        { status: 400 },
      );
    }
    const operation = await publishRevision({
      targetRevisionId: body.targetRevisionId,
      expectedRevisionId: body.expectedRevisionId ?? null,
      expectedPublicationId: body.expectedPublicationId ?? null,
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
