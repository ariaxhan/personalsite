import { renderLlmsFullTxt } from "@/app/content/machine";
import { contentDiagnosticHeaders, getSiteContent } from "@/app/content/repository";

export const dynamic = "force-static";

export async function GET() {
  const resolved = await getSiteContent();
  return new Response(renderLlmsFullTxt(resolved.content), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}
