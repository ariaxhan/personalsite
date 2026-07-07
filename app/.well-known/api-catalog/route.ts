import { apiCatalogJson, jsonResponse } from "../../utils/wellKnown";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(apiCatalogJson());
}
