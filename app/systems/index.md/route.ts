import { renderSystemsMd } from "@/app/utils/agentText";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderSystemsMd(), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
