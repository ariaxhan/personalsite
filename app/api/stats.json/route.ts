import { SITE, proofStats } from "../../utils/siteMeta";
import motionData from "../../utils/motionData.json";
import { PAGE_COPY } from "../../utils/siteCopy";

export const dynamic = "force-static";

// Structured stats for agents: every number carries its source and verify date,
// so machine summaries inherit the receipts, not just the claims.
export async function GET() {
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
    { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" } }
  );
}
