import { writingJson } from "@/app/utils/agentText";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(writingJson(), null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
