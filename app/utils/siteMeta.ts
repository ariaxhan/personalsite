// ============================================================================
// SITE META
// The one place the site says who Aria is. Every surface that speaks for her
// (pages, llms.txt, MCP, JSON-LD, agent cards) imports from here. If a fact
// changes, it changes here, and every surface follows. No em dashes.
// ============================================================================

export const SITE = {
  url: "https://ariaxhan.com",
  name: "Aria Han",
  role: "AI systems architect & implementation specialist",
  location: "Los Angeles, California",
  email: "ariaxhan@gmail.com",

  /** First hero sentence. Maximally concrete. */
  oneLiner:
    "Most AI problems aren’t model problems.",

  /** Second hero sentence. The philosophy, no quotes. */
  strangeLine: "They’re problems with the system around the model.",

  /** The one-sentence description a stranger should repeat after ten seconds. */
  tldr:
    "Aria Han is an AI systems architect in Los Angeles who builds reliable AI systems, with memory, context, evals, and agent coordination as the working parts.",

  /** Longer bio for llms-full, MCP, about surfaces. */
  bio: [
    "Aria Han is an AI systems architect and implementation specialist based in Los Angeles. Previously an AI startup founder in San Francisco (Brink Mind, HeyContent, HeyContext), now independent, doing AI systems consulting and implementation work, including Dify, automation, and internal AI workflow implementation through Blink Build Studios.",
    "The work clusters around memory, context, evals, agent coordination, local-first tools, and implementation infrastructure: the machinery around AI systems rather than the demo in front of them. Workflows, observability, memory layers, handoff protocols, internal tools, and proof loops.",
    "A recurring pattern: build a weird, useful system quickly, then turn the residue into a reusable framework. The Agent Library came out of daily practice. KERNEL came out of fighting the same configuration battles twice. llm-bench came out of refusing to trust leaderboard screenshots.",
  ],

  /** Verified numbers. Source + date for every claim; re-verify before changing. */
  proof: {
    publicRepos: { value: "62", label: "Public repositories", source: "api.github.com/users/ariaxhan", verified: "2026-07-06" },
    hackathonWins: { value: "6", label: "Hackathon wins", source: "Devpost links on /hackathons", verified: "2026-07-06" },
    liveProducts: { value: "3", label: "Live products", source: "ModelMind + Paper Rooms (App Store), our4cuts (web)", verified: "2026-07-06" },
    substratePieces: { value: "425", label: "Daily agent artworks", source: "github.com/ariaxhan/substrate tree", verified: "2026-07-06" },
    portableSkills: { value: "39", label: "Portable agent skills", source: "SKILL.md count, the-agent-library", verified: "2026-07-06" },
    benchmarkTests: { value: "21", label: "Verified benchmark tests", source: "llm-bench README", verified: "2026-07-06" },
  },

  socials: {
    github: "https://github.com/ariaxhan",
    medium: "https://medium.com/@ariaxhan",
    linkedin: "https://www.linkedin.com/in/ariahan/",
    x: "https://x.com/aria__han",
  },

  booking: {
    url: "https://cal.com/aria-han/15min",
    line: "For projects, collaborations, or implementation work, you can book a short call.",
  },
} as const;

export type ProofStat = (typeof SITE.proof)[keyof typeof SITE.proof];

export const proofStats: ProofStat[] = Object.values(SITE.proof);
