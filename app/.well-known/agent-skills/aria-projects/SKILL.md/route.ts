import { agentSkillMarkdown, markdownResponse } from "../../../../utils/wellKnown";
import { getSiteContent } from "../../../../content/repository";

export const dynamic = "force-static";

export async function GET() {
  const resolved = await getSiteContent();
  return markdownResponse(agentSkillMarkdown(resolved.content, "projects"), resolved);
}
