import { authorizeCms, cmsErrorResponse } from "@/app/content/auth";
import { getContentDb } from "@/app/content/repository";
import { markConverged } from "@/app/content/publication";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await authorizeCms(request);
    const body = (await request.json()) as {
      operationId?: string;
      observedRevisionId?: string;
    };
    if (!body.operationId || !body.observedRevisionId) {
      return Response.json(
        { error: "operationId and observedRevisionId are required" },
        { status: 400 },
      );
    }
    const db = await getContentDb();
    const row = await db
      .prepare(
        `SELECT o.target_revision_id, p.revision_id
         FROM publish_operations o
         JOIN published_content p ON p.page_key = o.page_key
         WHERE o.id = ?1`,
      )
      .bind(body.operationId)
      .first<{ target_revision_id: string; revision_id: string }>();
    if (
      !row ||
      row.target_revision_id !== body.observedRevisionId ||
      row.revision_id !== body.observedRevisionId
    ) {
      return Response.json({ error: "observed revision is not canonical" }, { status: 409 });
    }
    await markConverged(body.operationId);
    return Response.json({ ok: true });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
