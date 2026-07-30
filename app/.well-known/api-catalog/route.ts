import { apiCatalogJson, jsonResponse } from "../../utils/wellKnown";
import { getSiteContent } from "../../content/repository";

export const dynamic = "force-static";

export async function GET() {
  const resolved = await getSiteContent();
  const response = jsonResponse(apiCatalogJson(resolved.content), resolved);
  const headers = new Headers(response.headers);
  headers.set("content-type", "application/linkset+json; charset=utf-8");
  return new Response(response.body, { status: response.status, headers });
}
