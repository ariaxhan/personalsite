import { authorizeCms, cmsErrorResponse, requireJsonRequest } from "@/app/content/auth";
import { getContentDb } from "@/app/content/repository";
import { markConverged } from "@/app/content/publication";
import { CONVERGENCE_PATHS } from "@/app/content/publicRoutes";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireJsonRequest(request);
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
         JOIN published_content p
           ON p.page_key = o.page_key
          AND p.publish_operation_id = o.id
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
    const operationId = body.operationId;
    const observedRevisionId = body.observedRevisionId;

    const observations = await Promise.all(
      CONVERGENCE_PATHS.map(async (path) => {
        const target = new URL(path, request.url);
        const response = await fetch(target);
        const publicBody = await response.text();
        return {
          path,
          ok: response.ok,
          revision:
            response.headers.get("x-content-revision") ??
            publicBody.match(
              /name="aria-content-revision" content="([^"]+)"/,
            )?.[1],
          publication:
            response.headers.get("x-content-publication") ??
            publicBody.match(
              /name="aria-content-revision"[^>]*data-publication="([^"]+)"/,
            )?.[1],
        };
      }),
    );
    for (const observation of observations) {
      if (
        !observation.ok ||
        observation.revision !== observedRevisionId ||
        observation.publication !== operationId
      ) {
        return Response.json(
          { error: `public output has not converged at ${observation.path}` },
          { status: 409 },
        );
      }
    }
    await markConverged(body.operationId);
    return Response.json({ ok: true });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
