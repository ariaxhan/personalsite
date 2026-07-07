import { agentSkillMarkdown, markdownResponse } from "../../../../utils/wellKnown";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(agentSkillMarkdown("bio"));
}
