import { authorizeCms, cmsErrorResponse, requireJsonRequest } from "@/app/content/auth";
import { PublicationConflictError, retryInvalidation } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireJsonRequest(request);
    await authorizeCms(request);
    const body = (await request.json()) as { operationId?: string };
    if (!body.operationId) {
      return Response.json({ error: "operationId is required" }, { status: 400 });
    }
    return Response.json({ operation: await retryInvalidation(body.operationId) });
  } catch (error) {
    if (error instanceof PublicationConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    return cmsErrorResponse(error);
  }
}
