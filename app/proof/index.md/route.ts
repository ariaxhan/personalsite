import { renderProofMd } from "@/app/utils/agentText";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderProofMd(), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
