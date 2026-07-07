import { SITE, proofStats } from "../../utils/siteMeta";
import motionData from "../../utils/motionData.json";

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
        note: "Counted by scripts/proof-of-motion.mjs from local git history; see /proof/",
        generated: motionData.generated,
      },
      hackathons: { wins: 5, finals: 6, note: "5 wins plus 1 finalist; evidence on /hackathons/" },
    },
    { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" } }
  );
}
