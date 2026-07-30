import { renderLlmsTxt } from "@/app/content/machine";
import { getSiteContent } from "@/app/content/repository";

export const dynamic = "force-static";

export async function GET() {
  const { content } = await getSiteContent();
  return new Response(renderLlmsTxt(content), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
