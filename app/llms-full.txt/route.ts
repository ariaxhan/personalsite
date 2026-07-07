import { renderLlmsFullTxt } from "@/app/utils/agentText";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderLlmsFullTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
