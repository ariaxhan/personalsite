import { siteIndexJson } from "@/app/utils/agentText";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(siteIndexJson(), null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
