import { authorizeCms, cmsErrorResponse } from "@/app/content/auth";
import { getRevision, PublicationConflictError } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ revisionId: string }> },
) {
  try {
    await authorizeCms(request);
    const { revisionId } = await params;
    return Response.json(await getRevision(revisionId), {
      headers: { "cache-control": "private, no-store" },
    });
  } catch (error) {
    if (error instanceof PublicationConflictError) {
      return Response.json({ error: error.message }, { status: 404 });
    }
    return cmsErrorResponse(error);
  }
}

