import { agentCardJson, jsonResponse } from "../../utils/wellKnown";
import { getSiteContent } from "../../content/repository";

export const dynamic = "force-static";

export async function GET() {
  const { content } = await getSiteContent();
  return jsonResponse(agentCardJson(content));
}
