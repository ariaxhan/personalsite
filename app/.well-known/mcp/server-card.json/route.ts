import { jsonResponse, mcpServerCardJson } from "../../../utils/wellKnown";
import { getSiteContent } from "../../../content/repository";

export const dynamic = "force-static";

export async function GET() {
  const resolved = await getSiteContent();
  return jsonResponse(mcpServerCardJson(resolved.content), resolved);
}
