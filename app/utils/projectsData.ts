// ============================================================================
// PROJECTS
// One structured record per project, human pages and machine endpoints both
// generate from this file. Every claim here must trace to a repo, a store
// listing, or a live URL. Voice rules from content/editorial-brief.md apply:
// concrete over abstract, one closing line per project, no em dashes.
// ============================================================================

export type Theme =
  | "memory"
  | "context"
  | "evals"
  | "agents"
  | "coordination"
  | "verification"
  | "local-first"
  | "implementation"
  | "tiny-apps";

export const THEME_LABELS: Record<Theme, string> = {
  memory: "Memory",
  context: "Context",
  evals: "Evals",
  agents: "Agents",
  coordination: "Coordination",
  verification: "Verification",
  "local-first": "Local-first",
  implementation: "Implementation",
  "tiny-apps": "Tiny apps",
};

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  kind: "product" | "open-source" | "research" | "company";
  status: string;
  /** One-line thesis. */
  thesis: string;
  /** The problem it exists to solve. */
  problem: string;
  /** What I built. Narrative paragraphs, reused as card body copy. */
  built: string[];
  stack: string;
  links: ProjectLink[];
  /** Outcome, demo, numbers. Checkable. */
  proof: string;
  /** What I learned. */
  learned: string;
  /** What kind of work this proves I can do. */
  proves: string;
  /** The standalone closing line. Brand asset, no label, no quotes. */
  closing: string;
  themes: Theme[];
  /** Slugs of connected projects. */
  connections: string[];
  accent: string;
  meta: Record<string, string>;
  /** Card plate image (square mark preferred). */
  plate?: string;
  plateFit?: "cover" | "contain";
  /** Screenshot gallery for the story modal. */
  gallery?: string[];
  logo?: string;
  video?: string;
  poster?: string;
}

export const projects: Project[] = [
  // --------------------------------------------------------------- products
  {
    slug: "modelmind",
    name: "ModelMind",
    kind: "product",
    status: "Live on the App Store, free",
    thesis: "Learn what a model is actually doing when it answers.",
    problem:
      "Most AI education teaches magic words. When the trick stops working, people have no mental model of the model, so they cannot reason through a failure.",
    built: [
      "ModelMind teaches what a model is actually doing when it answers, and how to reason through a failure instead of memorizing magic words. Not a lesson on transformers, the philosophy behind it all.",
      "Tools change every day. The principles behind them compound for a lifetime.",
      "Live on the App Store for iPhone, iPad, and Mac, with Android in testing. Completely free, no ads.",
    ],
    stack: "React Native · TypeScript · MMKV",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/modelmind/id6761348536" },
      { label: "model-mind.org", href: "https://model-mind.org" },
    ],
    proof: "Live on the App Store for iPhone, iPad, and Mac. 495 commits of solo development.",
    learned:
      "Teaching the philosophy behind a system beats teaching its buttons. And most of shipping a native app solo is release engineering, not code.",
    proves:
      "Taking a fuzzy educational goal and shipping it alone as a real multi-platform product: design, curriculum, code, release pipeline.",
    closing: "Understand how AI actually works.",
    themes: ["implementation", "local-first", "tiny-apps"],
    connections: ["llm-bench", "model-familiarity-engine", "paper-rooms"],
    accent: "#b56a4f",
    meta: {
      role: "Solo Developer · Designer · Engineer",
      status: "Live on the App Store · Free",
      platform: "iPhone · iPad · Mac · Android",
      stack: "React Native · TypeScript · MMKV",
    },
    plate: "/studio/modelmind-icon.jpg",
    logo: "/studio/modelmind-icon.jpg",
    gallery: [
      "/studio/modelmind-1.jpg",
      "/studio/modelmind-3.jpg",
      "/studio/modelmind-2.jpg",
      "/studio/modelmind-4.jpg",
    ],
  },
  {
    slug: "paper-rooms",
    name: "Paper Rooms",
    kind: "product",
    status: "Live on the App Store, free",
    thesis: "A local-first library that gives every paper an address instead of a list position.",
    problem:
      "Reading lists are where papers go to die. Links pile up in tabs and notes apps with no spatial structure, so nothing gets re-found next to related work.",
    built: [
      "Paste a link from arXiv, a DOI, or PubMed, and the paper lands in a subject-based room next to related work instead of disappearing into a reading list.",
      "A typography-focused reader with real equations, highlights, and notes. Everything stays on-device: no accounts, no tracking, no ads. Permanently free.",
    ],
    stack: "Capacitor · Local storage",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/paper-rooms/id6780741814" },
      { label: "paper-rooms.com", href: "https://paper-rooms.com" },
    ],
    proof: "Live on the App Store for iPhone, iPad, and Mac. Built and shipped solo in under a month.",
    learned:
      "Spatial organization is a memory technique, not a UI gimmick. The loci method works on software.",
    proves: "Local-first product design: on-device storage, no accounts, real typography, shipped.",
    closing: "Every paper deserves an address.",
    themes: ["local-first", "memory", "tiny-apps"],
    connections: ["metabrain", "modelmind"],
    accent: "#56695a",
    meta: {
      role: "Solo Developer · Designer · Engineer",
      status: "Live on the App Store · Free",
      platform: "iPhone · iPad · Mac",
      stack: "Capacitor · Local storage",
    },
    plate: "/studio/paperrooms-icon.jpg",
    logo: "/studio/paperrooms-icon.jpg",
    gallery: [
      "/studio/paperrooms-reader.jpg",
      "/studio/paperrooms-desk.jpg",
      "/studio/paperrooms-study.jpg",
      "/studio/paperrooms-search.jpg",
    ],
  },
  {
    slug: "our4cuts",
    name: "our4cuts",
    kind: "product",
    status: "Live",
    thesis: "A photo booth that runs from a QR code.",
    problem:
      "Event photo booths are hardware rentals, but a booth is really just a camera, a layout, and a shared gallery, all things a phone browser already has.",
    built: [
      "Scan a QR code, guests shoot four frames in the browser, every strip lands in a live gallery. Weddings, pop-ups, restaurant photo zones.",
    ],
    stack: "Astro · Cloudflare",
    links: [{ label: "our4cuts.com", href: "https://our4cuts.com" }],
    proof: "Live and used at real events. 435 commits of production hardening.",
    learned:
      "Consumer-simple surfaces hide the most edge cases: camera APIs across browsers, live galleries, print layouts. Simple is expensive and worth it.",
    proves: "Shipping and operating a real consumer web product end to end on Cloudflare.",
    closing: "One QR code turns every phone in the room into the booth.",
    themes: ["tiny-apps", "implementation"],
    connections: ["substrate", "paper-rooms"],
    accent: "#b08a4c",
    meta: {
      role: "Product · Web System",
      status: "Live",
      platform: "Browser · QR · Event workflow",
      stack: "Astro · Cloudflare",
    },
    plate: "/studio/logo-our4cuts.svg",
    plateFit: "contain",
    logo: "/studio/logo-our4cuts.svg",
    gallery: ["/studio/our4cuts-home.png"],
  },

  // -------------------------------------------------------------- companies
  {
    slug: "heycontext",
    name: "HeyContext",
    kind: "company",
    status: "Shipped to production, 2025 to 2026",
    thesis: "A multi-agent workspace built before subagents were a buzzword.",
    problem:
      "AI agents are surprisingly good at individual work and surprisingly bad at teamwork. Nothing routed context between specialized agents working the same project.",
    built: [
      "Specialized agents shared context, wrote A2A notes, routed to appropriate models across OpenAI, Claude, Gemini, and Llama, and edited shared artifacts. Redis-backed background pipelines surfaced insights before being prompted.",
    ],
    stack: "FastAPI · Redis · Convex · Agno · Next.js",
    links: [],
    proof: "Went live with hundreds of users within a month, no ad spend.",
    learned:
      "Coordination fails on context handoff, not model quality. That finding drives everything since: memory layers, handoff protocols, verification gates.",
    proves:
      "Architecting and running production multi-agent systems: model routing across four providers, background pipelines, live users.",
    closing: "The bottleneck isn't intelligence. It's coordination.",
    themes: ["agents", "coordination", "context", "memory"],
    connections: ["heycontent", "kernel", "the-agent-library"],
    accent: "#6f8696",
    meta: {
      role: "CEO · Lead Architect · Lead Engineer",
      timeline: "Sept 2025 - Jan 2026",
      stack: "FastAPI · Redis · Convex · Agno · Next.js",
      status: "Shipped to production",
    },
    plate: "/studio/logo-heycontext.svg",
    logo: "/studio/logo-heycontext.svg",
    video: "/studio/demo-heycontext.mp4",
    poster: "/studio/demo-heycontext-poster.jpg",
  },
  {
    slug: "heycontent",
    name: "HeyContent",
    kind: "company",
    status: "Integrated into HeyContext",
    thesis: "Four content silos, queried as one story.",
    problem:
      "A creator's Instagram, YouTube, Gmail, and notes don't know about each other, so no tool could answer a question about the whole body of work.",
    built: [
      "Connected the platforms with semantic links and embeddings so an agent could search across all of it. A conversational onboarding built a visible, compounding persona that captured each creator's brand. Core technology integrated into HeyContext.",
    ],
    stack: "Embeddings · Semantic links · Real-time sync",
    links: [],
    proof: "5+ platforms integrated with real-time sync; the memory layer survived into the next company.",
    learned:
      "Embeddings without an ontology decay into soup. The persona layer is what made retrieval usable.",
    proves: "Cross-platform data plumbing plus semantic memory design under startup conditions.",
    closing: "Memory isn't a feature you bolt on later. It's what long-running work runs on.",
    themes: ["memory", "context", "implementation"],
    connections: ["heycontext", "metabrain"],
    accent: "#8a4b3a",
    meta: {
      role: "CEO · Lead Developer",
      timeline: "Mar 2025 - Sept 2025",
      integration: "5+ platforms · Real-time sync",
    },
    plate: "/studio/logo-heycontent.png",
    logo: "/studio/logo-heycontent.png",
    video: "/studio/demo-heycontent.mp4",
    poster: "/studio/demo-heycontent-poster.jpg",
  },
  {
    slug: "brink-mind",
    name: "Brink Mind",
    kind: "company",
    status: "TestFlight, 2024 to 2025",
    thesis: "Conversation, journaling, and heart data in the same room.",
    problem:
      "Mental health apps ignore the body. Heart rate and HRV carry signal a journal never captures.",
    built: [
      "A voice AI mental health app with Apple Watch integration, built in Swift, Python, and Core ML with post-quantum encryption. First dive into founder life.",
    ],
    stack: "Swift · Python · Core ML · HealthKit",
    links: [],
    proof: "Reached TestFlight with working voice, biometrics, and on-device inference.",
    learned:
      "Privacy constraints are a design material, not a tax. On-device ML shaped every product decision, and the product was better for it.",
    proves: "Native iOS and watchOS engineering, and the judgment to keep sensitive data on-device.",
    closing: "Your body remembers what your journal forgets.",
    themes: ["local-first", "implementation"],
    connections: ["paper-rooms", "modelmind"],
    accent: "#485a4d",
    meta: {
      role: "CEO · Lead Architect · SwiftUI Developer",
      timeline: "Nov 2024 - Mar 2025",
      platform: "iOS · watchOS · HealthKit",
    },
    plate: "/studio/logo-brinkmind.png",
    plateFit: "contain",
    logo: "/studio/logo-brinkmind.png",
    gallery: ["/studio/brink-landing.jpg", "/studio/brink-app-1.jpg", "/studio/brink-app-2.jpg"],
  },

  // ------------------------------------------------------------ open source
  {
    slug: "kernel",
    name: "KERNEL",
    kind: "open-source",
    status: "Active, on the Claude plugin marketplace",
    thesis: "Memory, rules, and receipts for Claude Code.",
    problem:
      "Every session starts from zero and every best practice is folklore. Agents need persistent memory and rules that prove themselves.",
    built: [
      "KERNEL gives Claude memory, deterministic hooks, skills, and a way to prove which workflows actually work. Specialized agents, SQLite-backed workflows, validation gates. Installs through Claude's plugin marketplace, mirrors into Cursor and Codex.",
    ],
    stack: "Claude Code · SQLite · Shell",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/kernel-claude" }],
    proof: "360 commits since January 2026. Distributed through the plugin marketplace, used daily in my own consulting work.",
    learned:
      "Config is a hypothesis. The experiment engine that tests its own rules changed how I build everything: nothing graduates without evidence.",
    proves:
      "Deep agent-harness engineering: hooks, SQLite-backed memory, multi-agent orchestration, real distribution.",
    closing: "Agents don't need more vibes. They need memory and rules that prove themselves.",
    themes: ["memory", "agents", "verification", "coordination"],
    connections: ["metabrain", "the-agent-library", "llm-bench", "heycontext"],
    accent: "#b56a4f",
    meta: {
      status: "Active · Plugin marketplace",
      stack: "Claude Code · SQLite · Shell",
      methodology: "AgentDB · Contracts · Orchestration",
    },
    plate: "/studio/repo-kernel.jpg",
    gallery: ["/studio/repo-kernel.jpg"],
  },
  {
    slug: "llm-bench",
    name: "llm-bench",
    kind: "open-source",
    status: "Active",
    thesis: "21 real-work tests, each graded by a program instead of vibes.",
    problem:
      "Leaderboards don't answer the only question that matters: will this model hold up on your actual work?",
    built: [
      "Real workflow tasks: extraction, code, planted bugs, email drafting, prompt injection, each graded by a programmatic verifier. Works with Ollama, Apple Intelligence, Claude CLI, Bedrock, any OpenAI-compatible endpoint.",
    ],
    stack: "Python · Ollama · Bedrock · Claude CLI",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/llm-bench" }],
    proof:
      "21 tests, programmatic verifiers, published model comparisons including Opus 4.8 vs 4.7 vs Sonnet vs Haiku. 148 commits.",
    learned:
      "A benchmark only matters if the measuring stick is explicit enough to argue with. Programmatic verifiers force an honesty that LLM-as-judge lets you skip.",
    proves: "Designing evaluation systems, the exact skill client evals and monitoring work needs.",
    closing: "A benchmark only matters if the measuring stick is explicit enough to argue with.",
    themes: ["evals", "verification"],
    connections: ["model-familiarity-engine", "latent-diagnostics", "kernel"],
    accent: "#6f8696",
    meta: {
      status: "Active · Practical workflow benchmark",
      stack: "Python · Ollama · Bedrock · Claude CLI",
      scope: "Standard · Hard · Agentic · Adversarial · Messy",
      license: "MIT",
    },
    plate: "/studio/repo-llm-bench.jpg",
    gallery: ["/studio/repo-llm-bench.jpg"],
  },
  {
    slug: "the-agent-library",
    name: "the-agent-library",
    kind: "open-source",
    status: "Active",
    thesis: "39 portable agent skills that survived real use.",
    problem:
      "Prompt collections rot. The useful unit is a workflow with a trigger, steps, and a definition of done that any agent can load.",
    built: [
      "A curated set of portable skills for getting real work out of AI agents, built for Claude, Codex, and any agent that can load a skill file. Most of it isn't code-specific: checking your own work, planning, brainstorming, research, writing, shipping.",
      "Each skill is a standalone workflow with a clear trigger and a SKILL.md. Real patterns that survived months of usage, constantly updated.",
    ],
    stack: "Claude · Codex · Agent Skills",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/the-agent-library" }],
    proof: "39 skills, each extracted from repeated real-world use, MIT licensed.",
    learned:
      "Residue becomes framework. Every skill started as a pattern repeating in my own work before it earned a file.",
    proves:
      "Turning messy practice into reusable, documented process, which is most of what AI enablement actually is.",
    closing: "The useful unit was never a prompt collection. It's a workflow you can copy, run, and trust.",
    themes: ["agents", "implementation", "coordination"],
    connections: ["kernel", "heycontext"],
    accent: "#56695a",
    meta: {
      status: "Active · 39 portable skills",
      stack: "Claude · Codex · Agent Skills",
      structure: "Category-first shelves",
      license: "MIT",
    },
    plate: "/studio/repo-agent-library.jpg",
    gallery: ["/studio/repo-agent-library.jpg"],
  },
  {
    slug: "model-familiarity-engine",
    name: "model-familiarity-engine",
    kind: "open-source",
    status: "Bootstrap loop shipped",
    thesis: "Model cards built from observed behavior, not rankings.",
    problem:
      "Single-shot benchmarks don't capture how a model behaves across a real working relationship.",
    built: [
      "Onboards language models by simulating real user conversations, then builds evidence-backed model cards from observations instead of a ranking. All benchmarks are drawn from real conversation transcripts.",
      "The replay-bootstrap loop is shipped: known-outcome tasks, redaction, replay, model cards built from what was actually observed.",
    ],
    stack: "Python · Bedrock · Ollama · Claude CLI",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/model-familiarity-engine" }],
    proof: "Replay-bootstrap loop shipped: redaction, replay, observed model cards. MIT licensed.",
    learned:
      "Replay with redaction lets you bootstrap evaluation from your own transcripts. No synthetic tasks required.",
    proves: "Designing a novel eval methodology and shipping the loop, not just the idea.",
    closing: "The question was never which model is best. It's what this one has earned.",
    themes: ["evals", "memory", "verification"],
    connections: ["llm-bench", "kernel"],
    accent: "#b08a4c",
    meta: {
      status: "Bootstrap Loop Shipped",
      stack: "Python · Bedrock · Ollama · Claude CLI",
      scope: "Replay · Redaction · Model Cards",
      license: "MIT",
    },
    plate: "/studio/repo-model-familiarity.jpg",
    gallery: ["/studio/repo-model-familiarity.jpg"],
  },
  {
    slug: "metabrain",
    name: "metabrain",
    kind: "open-source",
    status: "Published on PyPI",
    thesis: "Memory that must prove itself before it gets promoted.",
    problem:
      "Most memory tools remember. Almost none of them learn. Storage without a promotion gate becomes noise.",
    built: [
      "A zero-dependency SQLite layer that closes the loop: patterns graduate into hypotheses, outcomes test them, and only what holds up becomes preference.",
    ],
    stack: "Python · SQLite · Zero-dependency",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/metabrain" }],
    proof: "Published: pip install metabrain. Zero dependencies by design.",
    learned:
      "The graduation loop (pattern, then hypothesis, then tested preference) is the same shape as good consulting: observe, propose, verify.",
    proves: "Designing knowledge systems with quality gates and shipping them as installable packages.",
    closing: "Memory should prove itself before it gets promoted.",
    themes: ["memory", "verification", "local-first"],
    connections: ["kernel", "paper-rooms", "heycontent"],
    accent: "#8a4b3a",
    meta: {
      status: "Published · PyPI + GitHub",
      stack: "Python · SQLite · Zero-dependency",
      install: "pip install metabrain",
      license: "MIT",
    },
    plate: "/studio/repo-metabrain.jpg",
    gallery: ["/studio/repo-metabrain.jpg"],
  },
  {
    slug: "substrate",
    name: "Substrate",
    kind: "open-source",
    status: "Live, 425+ pieces",
    thesis: "425 artworks made by agents, one per day, no hands.",
    problem:
      "What does an autonomous creative pipeline actually produce over a year? Almost nobody runs the experiment long enough to find out.",
    built: [
      "A generative gallery where Claude Code agents create abstract, interactive computational art through a fully automated daily workflow. Each piece is a single HTML file, roughly 2KB.",
    ],
    stack: "HTML · CSS · JavaScript · Cloudflare Pages",
    links: [
      { label: "GitHub", href: "https://github.com/ariaxhan/substrate" },
      { label: "Gallery", href: "https://nexus-substrate.pages.dev" },
    ],
    proof: "425 pieces and counting, generated daily without supervision, all public.",
    learned:
      "Constraints keep an unattended pipeline healthy. A single self-contained file per piece is why it has never needed rescuing.",
    proves: "Building fully automated agent pipelines that run daily without supervision, in public.",
    closing: "This is what happens when agents get to make something, not just talk about it.",
    themes: ["agents", "tiny-apps", "implementation"],
    connections: ["kernel", "our4cuts"],
    accent: "#5d7a86",
    meta: {
      status: "Live · 425+ pieces",
      stack: "HTML · CSS · JavaScript · Cloudflare Pages",
      cadence: "Daily Agent Generation",
      constraint: "Self-contained · ~2KB average",
    },
    plate: "/studio/repo-substrate.jpg",
    gallery: ["/studio/repo-substrate.jpg"],
  },
  {
    slug: "latent-diagnostics",
    name: "latent-diagnostics",
    kind: "research",
    status: "Research, negative results preserved",
    thesis: "Measuring the shape of a thought inside a model.",
    problem:
      "Grading answers tells you whether a model was right, not whether it computed something real.",
    built: [
      "Measures attribution graph geometry instead of only grading answers. Task domains show real signatures after controlling for length. Hallucination detection did not survive the same test. The repo keeps the negative results in.",
    ],
    stack: "Python · SAEs · Attribution graphs",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/latent-diagnostics" }],
    proof:
      "Grammar influence d=1.08 after length control. 108 commits. The failed hypothesis is documented next to the confirmed one.",
    learned:
      "Negative results are worth publishing. Hallucination detection did not survive length control, and the repo says so.",
    proves: "Research rigor: statistics, controls, and the honesty to keep failures in.",
    closing: "Being right and computing something real aren't the same shape.",
    themes: ["evals", "verification"],
    connections: ["llm-bench", "model-familiarity-engine"],
    accent: "#6a6470",
    meta: {
      status: "Research · Negative Results Preserved",
      stack: "Python · SAEs · Attribution graphs",
      finding: "Grammar influence d=1.08 after length control",
      license: "MIT",
    },
    plate: "/studio/repo-latent-diagnostics.jpg",
    gallery: ["/studio/repo-latent-diagnostics.jpg"],
  },
];

export const productProjects = projects.filter((p) => p.kind === "product" || p.kind === "company");
export const openSourceProjects = projects.filter(
  (p) => p.kind === "open-source" || p.kind === "research"
);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
