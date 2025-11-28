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
    status: "LIVE_PRODUCTION",
    description: [
      "Multi-agent orchestration platform where families of specialized agents coordinate autonomously. Adaptive model + config selection across OpenAI, Claude, Gemini, Llama, and more.",
      "Agents write A2A notes. Agents generate prompts on-demand and iterate every time. Redis-backed async processing. Background intelligence pipelines.",
    ],
    evidence:
      "The bottleneck isn't individual agent capability;it's coordination overhead. Built architecture where agents share context and learn collaboration patterns.",
    meta: {
      role: "CEO · Lead Architect · Lead Engineer",
      timeline: "Sept 2024 - Present",
      stack: "FastAPI · Redis · Convex · Agno · Next.js",
      status: "Serving users in production",
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
      "Real-time voice processing has hard latency constraints. Built architecture balancing on-device processing with cloud capabilities for natural conversation.",
    meta: {
      role: "CEO · Lead Architect · SwiftUI Developer",
      timeline: "Nov 2024 - Mar 2025",
      platform: "iOS · watchOS · HealthKit",
    },
  },
];

