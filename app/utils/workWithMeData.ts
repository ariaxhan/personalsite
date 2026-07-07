// ============================================================================
// WORK WITH ME
// Engagement types, fit filter, booking. Contact page, homepage door, and the
// work-with-me JSON endpoint all generate from this file. Async-first,
// concrete, not salesy. No em dashes.
// ============================================================================

export interface Engagement {
  title: string;
  detail: string;
}

export const engagements: Engagement[] = [
  {
    title: "AI workflow implementation",
    detail:
      "You have a process that lives in someone's head or a pile of docs. I turn it into a working AI system with real inputs, outputs, and checkpoints.",
  },
  {
    title: "Internal AI tools and automation",
    detail:
      "Small tools your team actually opens: intake that triages itself, report generators, glue between the systems you already have.",
  },
  {
    title: "Agentic system architecture",
    detail:
      "Multi-agent pipelines, handoff protocols, and the unglamorous parts that keep agents from going rogue.",
  },
  {
    title: "Evals, monitoring, and quality layers",
    detail:
      "Programmatic checks that tell you whether the AI is right before your customers do. I wrote a 21-test benchmark for my own models; I'll write one for yours.",
  },
  {
    title: "Claude Code / AI coding workflow hardening",
    detail:
      "Your team codes with AI but the output is chaos. Structure, memory, review gates, and repo conventions that make it hold.",
  },
  {
    title: "Memory, context, and knowledge systems",
    detail:
      "Company knowledge that outlasts whoever happened to remember it, and retrieval that actually retrieves.",
  },
  {
    title: "Dify / low-code AI app implementation",
    detail:
      "When the right answer is a maintained low-code app rather than a custom stack. Current daily work through Blink Build Studios.",
  },
];

export const goodFit: string[] = [
  "You have a real workflow, not just an AI idea",
  "You need someone who can translate ambiguity into working systems",
  "You care about quality, traceability, and maintainability",
  "You want implementation, not a slide deck",
];

export const notAFit: string[] = [
  "Vague AI hype",
  "Growth hacks",
  "Pure marketing funnels",
  "Anything that requires pretending a prototype is production-ready",
];

export const workingStyle =
  "Async-first. Most work starts with a written diagnosis, not a discovery call marathon. When a call helps, it's short and scheduled below.";
