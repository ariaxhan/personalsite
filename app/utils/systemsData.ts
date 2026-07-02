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
  website?: string;
}

export const systemsData: SystemData[] = [
  {
    name: "ModelMind",
    status: "LIVE",
    description: [
      "ModelMind teaches what a model is actually doing when it answers, and how to reason through a failure instead of memorizing magic words. The goal is not to give you a lesson on transformers, but to explain the philosophy behind it all.",
      "Tools change every day. The principles behind them compound for a lifetime.",
      "Live on the App Store for iPhone, iPad, and Mac, with Android in testing. Completely free, no ads.",
    ],
    evidence: "Understand how AI actually works.",
    meta: {
      role: "Solo Developer · Designer · Engineer",
      status: "Live on the App Store · Free",
      platform: "iPhone · iPad · Mac · Android",
      stack: "React Native · TypeScript · MMKV",
    },
    appStore: "https://apps.apple.com/us/app/modelmind/id6761348536",
  },
  {
    name: "Paper Rooms",
    status: "LIVE",
    description: [
      "Research papers don't belong in lists. Paper Rooms gives every paper an address: paste a link from arXiv, a DOI, or PubMed, and it lands in a subject-based room next to related work instead of disappearing into a reading list or browser tab.",
      "A typography-focused reader with real equations, highlights, and notes. Everything stays on-device: no accounts, no tracking, no ads. Permanently free.",
    ],
    evidence: "Every paper deserves an address.",
    meta: {
      role: "Solo Developer · Designer · Engineer",
      status: "Live on the App Store · Free",
      platform: "iPhone · iPad · Mac",
      stack: "Capacitor · Local storage",
    },
    appStore: "https://apps.apple.com/us/app/paper-rooms/id6780741814",
  },
  {
    name: "our4cuts",
    status: "LIVE",
    description: [
      "A photo booth doesn't need to be a machine in the corner. Our4cuts runs from a link: scan a QR code, guests shoot four frames in the browser, every strip lands in a live gallery. Weddings, pop-ups, restaurant photo zones.",
    ],
    evidence: "One QR code turns every phone in the room into the booth.",
    meta: {
      role: "Product · Web System",
      status: "Live",
      platform: "Browser · QR · Event workflow",
      stack: "Astro · Cloudflare",
    },
    website: "https://our4cuts.com",
  },
  {
    name: "HeyContext",
    status: "SHIPPED",
    description: [
      "AI agents are surprisingly good at individual work. They're surprisingly bad at teamwork.",
      "HeyContext was a multi-agent workspace built around that gap, back before subagents became a buzzword. Specialized agents shared context, wrote A2A notes, routed to appropriate models across OpenAI, Claude, Gemini, and Llama, and edited shared artifacts. Redis-backed background pipelines surfaced insights before being prompted.",
    ],
    evidence: "The bottleneck isn't intelligence. It's coordination.",
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
      "What if your Instagram, YouTube, Gmail, and notes could be queried as one story instead of four silos? HeyContent connected them with semantic links and embeddings so an agent could actually search across all of it. A conversational onboarding built a visible, compounding persona that captured each creator's unique brand. Core technology integrated into HeyContext.",
    ],
    evidence: "Memory isn't a feature you bolt on later. It's what long-running work runs on.",
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
      "Brink Mind put conversation, journaling, heart rate, and HRV in the same room: a voice AI mental health app with Apple Watch integration, built in Swift, Python, and Core ML with post-quantum encryption.",
    ],
    evidence: "Your body remembers what your journal forgets.",
    meta: {
      role: "CEO · Lead Architect · SwiftUI Developer",
      timeline: "Nov 2024 - Mar 2025",
      platform: "iOS · watchOS · HealthKit",
    },
  },
];
