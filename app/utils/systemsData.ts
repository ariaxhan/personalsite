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
    status: "LIVE_BETA",
    description: [
      "Multi-agent orchestration platform where 17+ specialized agents coordinate autonomously. Real-time database sync. Adaptive model selection across OpenAI, Claude, Gemini, Azure, Bedrock.",
      "Agents develop handoff protocols. System learns which agents work best together and optimizes routing dynamically. Redis-backed async processing. Background intelligence pipelines.",
    ],
    evidence:
      "The bottleneck isn't individual agent capability—it's coordination overhead. Built architecture where agents share context and learn collaboration patterns.",
    meta: {
      role: "CEO · Lead Architect",
      timeline: "Sept 2024 - Present",
      stack: "FastAPI · Redis · Convex · Multi-LLM · Google Cloud Run",
      status: "Serving users in beta",
    },
  },
  {
    name: "HeyContent",
    status: "INTEGRATED",
    description: [
      "Cross-platform memory architecture connecting Instagram, YouTube, Gmail, notes. Built unified context layer through semantic linking and vector embeddings.",
      "Core technology now integrated into HeyContext. Enables agents to maintain coherent understanding across platforms and sessions.",
    ],
    evidence:
      "Long-horizon work requires persistent memory. Agents need to build and maintain world models that span multiple interaction surfaces.",
    meta: {
      role: "CEO · Lead Developer",
      timeline: "Mar 2024 - Sept 2024",
      integration: "5+ platforms · Real-time sync",
    },
  },
  {
    name: "Brink",
    status: "HACKATHON_WINNER",
    description: [
      "Voice AI mental health app with Apple Watch biometric integration. Combines real-time conversational AI with heart rate and HRV analysis. Swift + Python + Core ML.",
      "Won AI/ML API Prize at Vertical Specific AI Agents Hackathon. Demonstrates multimodal signal fusion—linguistic + physiological analysis reveals patterns neither shows alone.",
    ],
    evidence:
      "Real-time voice processing has hard latency constraints. Built architecture balancing on-device processing with cloud capabilities for natural conversation.",
    meta: {
      role: "CEO · System Architect",
      timeline: "Nov 2023 - Mar 2024",
      platform: "iOS · watchOS · HealthKit",
      recognition: "Competition winner",
    },
  },
];

