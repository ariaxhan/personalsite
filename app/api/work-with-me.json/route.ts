import { workWithMeJson, jsonResponse } from "@/app/content/machine";
import { getSiteContent } from "@/app/content/repository";

export const dynamic = "force-static";

export async function GET() {
  const resolved = await getSiteContent();
  return jsonResponse(workWithMeJson(resolved.content), resolved);
}
