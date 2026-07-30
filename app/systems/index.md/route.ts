import { renderSystemsMd, markdownResponse } from "@/app/content/machine";
import { getSiteContent } from "@/app/content/repository";

export const dynamic = "force-static";

export async function GET() {
  const { content } = await getSiteContent();
  return markdownResponse(renderSystemsMd(content));
}
