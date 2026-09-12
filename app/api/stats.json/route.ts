import motionData from "../../utils/motionData.json";
import { contentDiagnosticHeaders, getSiteContent } from "../../content/repository";

export const dynamic = "force-static";

// Structured stats for agents: every number carries its source and verify date,
// so machine summaries inherit the receipts, not just the claims.
export async function GET() {
  const resolved = await getSiteContent();
  const { SITE, proofStats, PAGE_COPY } = resolved.content;
  return Response.json(
    {
      identity: { name: SITE.name, role: SITE.role, location: SITE.location, url: SITE.url },
      stats: proofStats,
      motion: {
        totalCommits: motionData.grandTotal,
        repositories: motionData.repoCount,
        note: PAGE_COPY.statsApi.motionNote,
        generated: motionData.generated,
      },
      hackathons: { wins: 5, finals: 6, note: PAGE_COPY.statsApi.hackathonNote },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        ...contentDiagnosticHeaders(resolved),
      },
    },
  );
}
