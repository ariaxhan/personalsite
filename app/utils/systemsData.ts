export interface SystemMeta {
  [key: string]: string;
}

export interface SystemData {
  name: string;
  status: string;
  description: string[];
  evidence: string;
  meta: SystemMeta;
  appStore?: string;
}

export const systemsData: SystemData[] = [
  {
    name: "ModelMind",
    status: "SHIPPED",
    description: [
      "A Duolingo-style app that teaches how AI actually works—not how to prompt it, but how it thinks, why it fails, and how to reason with it. Live on the App Store (iPhone, iPad, Mac, and Vision Pro), with an Android build on the Google Play internal track. React Native + Expo, TypeScript strict mode.",
      "21 courses across Foundations, Building, Thinking, and Creating. Seven offline-gradeable exercise types—multiple choice, sort, sequence, match, triage, comparison, decision tree—graded by pure local functions with content authored as JSON. Domain logic carries 100% test coverage; a backend handles auth, sync, and social.",
    ],
    evidence:
      "Everyone teaches prompt tricks; almost no one teaches the mental model underneath—what a model is actually doing when it answers, and where that breaks. Understanding beats memorized prompts.",
    meta: {
      role: "Founder · Lead Architect · Mobile Engineer",
      status: "Live on the App Store · Free + Premium",
      platform: "iPhone · iPad · Mac · Vision Pro · Android",
      stack: "React Native · TypeScript · MMKV",
    },
    appStore: "https://apps.apple.com/us/app/modelmind/id6761348536",
  },
  {
    name: "Paper Rooms",
    status: "SHIPPED",
    description: [
      "A local-first library app for organizing and reading research papers—“every paper has an address.” Paste a link from arXiv, a DOI, PubMed, bioRxiv, or Google Scholar and the app gives each paper a virtual address by subject, then arranges your library like shelves so related work sits nearby instead of buried in a list.",
      "A typography-focused reader with clean margins and rendered equations, plus highlights, notes, and collections. Everything stays on-device—no accounts, no cloud sync, no tracking or analytics. Permanently free, no ads, no subscriptions.",
    ],
    evidence:
      "A love letter to libraries, built for anyone who likes reading something slowly and all the way through. Discovery should feel like browsing shelves, not scrolling a feed.",
    meta: {
      role: "Founder · Designer · Engineer",
      status: "Live on the App Store · Free",
      platform: "iPhone · iPad · Mac · Apple Vision",
      approach: "Local-first · no accounts · no tracking",
    },
    appStore: "https://apps.apple.com/us/app/paper-rooms/id6780741814",
  },
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

