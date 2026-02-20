export interface SystemMeta {
  [key: string]: string;
}

export interface SystemData {
  name: string;
  status: string;
  description: string[];
  evidence: string;
  meta: SystemMeta;
}

export const systemsData: SystemData[] = [
  {
    name: "HeyContext",
    status: "SHIPPED",
    description: [
      "Multi-agent orchestration workspace where families of specialized agents coordinate autonomously. Adaptive model + config selection across OpenAI, Claude, Gemini, Llama, and more.",
      "Agents write A2A notes, generate prompts on-demand and iterate every time. Redis-backed async processing. Background intelligence pipelines. Advanced anti-summary context enrichment system.",
    ],
    evidence:
      "The bottleneck isn't individual agent capability; it's coordination overhead. Built architecture where agents share context and learn collaboration patterns.",
    meta: {
      role: "CEO · Lead Architect · Lead Engineer",
      timeline: "Sept 2025 - Jan 2026",
      stack: "FastAPI · Redis · Convex · Agno · Next.js",
      status: "Shipped to production",
    },
  },
  {
    name: "HeyContent",
    status: "INTEGRATED",
    description: [
      "Cross-platform memory architecture connecting Instagram, YouTube, Gmail, notes. Built unified context layer through semantic linking and vector embeddings. Synthesized multimodal data from diverse sources and offered cross-platform insights and recommendations.",
      "Core technology now integrated into HeyContext. Enables agents to maintain coherent understanding across platforms and sessions.",
    ],
    evidence:
      "Long-horizon work requires persistent memory. Agents need to build and maintain world models that span multiple interaction surfaces.",
    meta: {
      role: "CEO · Lead Developer",
      timeline: "Mar 2025 - Sept 2025",
      integration: "5+ platforms · Real-time sync",
    },
  },
  {
    name: "Brink Mind",
    status: "TESTFLIGHT PHASE",
    description: [
      "Voice AI mental health app with Apple Watch biometric integration. Combines real-time conversational AI and journaling with heart rate and HRV analysis. Swift + Python + Core ML.",
      "Science-backed patterns, post-quantum encryption, and reflections users can use. Demonstrated multimodal signal fusion: linguistic + physiological analysis reveals patterns neither shows alone.",
    ],
    evidence:
      "Users need a privacy-first, responsible mental health tool—not another AI companion or therapist.",
    meta: {
      role: "CEO · Lead Architect · SwiftUI Developer",
      timeline: "Nov 2024 - Mar 2025",
      platform: "iOS · watchOS · HealthKit",
    },
  },
];

