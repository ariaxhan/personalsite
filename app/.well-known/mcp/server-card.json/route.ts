import { jsonResponse, mcpServerCardJson } from "../../../utils/wellKnown";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(mcpServerCardJson());
}
