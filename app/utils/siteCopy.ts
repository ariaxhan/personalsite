// ============================================================================
// SITE COPY
// Single live source for human-facing prose, metadata text, project copy,
// writing excerpts, contact language, and studio labels. Keep rewrites here;
// the old data modules re-export these values for compatibility.
// ============================================================================

// ---------------------------------------------------------------------------
// Extracted from app/utils/siteMeta.ts
// ---------------------------------------------------------------------------
// ============================================================================
// SITE META
// The one place the site says who Aria is. Every surface that speaks for her
// (pages, llms.txt, MCP, JSON-LD, agent cards) imports from here. If a fact
// changes, it changes here, and every surface follows. No em dashes.
// ============================================================================

export const SITE = {
  url: "https://ariaxhan.com",
  name: "Aria Han",
  /**
   * Positioning string. Every indexable surface uses this: <title>, meta
   * description, JSON-LD jobTitle, OG alt, llms.txt.
   *
   * Why not "AI implementation specialist": measured 2026-07-28, the query
   * "ai implementation specialist los angeles" returns 20 of 20 job listings
   * (ZipRecruiter, LinkedIn Jobs, Indeed, Greenhouse, Built In LA). Google
   * reads that phrase as hiring intent, so a consulting site cannot rank
   * commercially against it. "AI consultant" carries buyer intent.
   * Evidence: _meta/research/2026-07-28-discoverability-audit.md
   */
  role: "AI consultant",
  /** The username every other platform ranks for. Claimed in Person.alternateName. */
  handle: "ariaxhan",
  location: "Los Angeles, California",
  email: "ariaxhan@gmail.com",

  /** Sellable engagements. Drives ProfessionalService/OfferCatalog JSON-LD. */
  services: [
    "AI product building and repair",
    "AI project reviews",
    "Practical AI workflow design and training",
    "Internal AI workflow automation",
  ],

  /** First hero sentence. Maximally concrete. */
  oneLiner:
    "I build and repair AI.",

  /** Second hero sentence. The philosophy, no quotes. */
  strangeLine:
    "I also teach practical AI workflows and review AI-assisted products that have become hard to debug, extend, or trust.",

  /** The concrete what-I-do line, rendered under the hero pair. */
  whatIDo:
    "I review new models, tools, methods, and research every week, then update existing work when a better approach becomes practical.",

  /** The one-sentence description a stranger should repeat after ten seconds. */
  tldr:
    "Aria Han is an AI consultant in Los Angeles who builds and repairs AI products for founders and independent builders, and creates internal AI workflows for operations teams.",

  /** Longer bio for llms-full, MCP, about surfaces. */
  bio: [
    "I'm an AI consultant in Los Angeles. I work with founders, independent builders, and operations teams that want to put AI to work now.",
    "For founders and other builders, that can mean building an AI product, repairing one that got stuck after an AI-assisted build, or setting up AI workflows for research, writing, operations, and decision-making. If you have something that mostly works but has become hard to debug, extend, or trust, that is exactly what a project review is for. I can teach the workflow, build it, or do both.",
    "For companies, I focus on internal operations. I get close to the process as it actually runs, find where context is lost or work keeps getting repeated, and build an AI workflow around the tools and information the team already uses.",
    "Before consulting, I built three AI products in San Francisco and led the teams that built them. My public work includes App Store apps, Python packages, open source evaluation and memory tools, and KERNEL, the plugin I use to run coding agents on real repositories.",
    "I get a daily research digest and built a research paper reading app because I want the papers themselves to be one of my main sources, not only posts about them. I review new models, tools, methods, and research every week, then update existing work when a better approach becomes practical.",
    "My work and writing are public at ariaxhan.com, including the experiments that failed. I'm available for a quick call or a project review.",
  ],

  /** Verified numbers. Source + date for every claim; re-verify before changing. */
  proof: {
    publicRepos: { value: "62", label: "Public repositories", source: "api.github.com/users/ariaxhan", verified: "2026-07-06" },
    hackathonWins: { value: "5", label: "Hackathon wins", source: "Devpost and GitHub links on /hackathons; 5 wins, 1 finalist", verified: "2026-07-06" },
    liveProducts: { value: "3", label: "Live products", source: "ModelMind + Paper Rooms (App Store), our4cuts (web)", verified: "2026-07-06" },
    substratePieces: { value: "7", label: "Open source packages", source: "open source packages on GitHub", verified: "2026-07-13" },
    portableSkills: { value: "39", label: "Portable agent skills", source: "SKILL.md count, the-agent-library", verified: "2026-07-06" },
    benchmarkTests: { value: "21", label: "Verified benchmark tests", source: "llm-bench README", verified: "2026-07-06" },
  },

  socials: {
    github: "https://github.com/ariaxhan",
    medium: "https://medium.com/@ariaxhan",
    linkedin: "https://www.linkedin.com/in/ariahan/",
    x: "https://x.com/aria__han",
    /**
     * Profiles that already rank for "ariaxhan". Listed in Person.sameAs so
     * search engines consolidate them onto this domain instead of treating
     * them as separate entities. Measured 2026-07-28.
     */
    pypi: "https://pypi.org/user/ariaxhan/",
    devpost: "https://devpost.com/ariaxhan",
    huggingface: "https://huggingface.co/ariaxhan",
  },

  booking: {
    url: "https://cal.com/aria-han/15min",
    line: "I'm available for a quick call or a project review.",
  },
} as const;

export type ProofStat = (typeof SITE.proof)[keyof typeof SITE.proof];

export const proofStats: ProofStat[] = Object.values(SITE.proof);


// ---------------------------------------------------------------------------
// Extracted from app/utils/projectsData.ts
// ---------------------------------------------------------------------------
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
    thesis: "AI education felt backwards, so I built the course I wanted people to have first.",
    problem:
      "Most AI courses start with transformers. That is not what most people need first. They need to understand what is happening well enough to have a better conversation with an LLM, write a better prompt, or recover when the model fails.",
    built: [
      "ModelMind is my answer to the question of how to learn AI. It was inspired by Duolingo, which I have kept a streak on for hundreds of days and counting.",
      "The app teaches the concepts behind LLMs through daily, gamified exercises. The knowledge comes from thousands of hours spent talking to models as they evolved, plus the research papers and expert writing I kept referencing in my own process.",
      "It is completely free. No paywalls, no ads. My only ask is that it helps demystify these models and build mental models that will matter more and more.",
    ],
    stack: "React Native · TypeScript · MMKV",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/modelmind/id6761348536" },
      { label: "model-mind.org", href: "https://model-mind.org" },
    ],
    proof: "Live on the App Store for iPhone, iPad, and Mac. 495 commits of solo development.",
    learned:
      "You do not need to start with transformers to understand AI better. You need better intuitions, better questions, and less magic.",
    proves:
      "Taking a fuzzy educational goal and shipping it alone as a real multi-platform product: design, curriculum, code, release pipeline.",
    closing: "The point is not to memorize AI. It is to stop being intimidated by it.",
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
    thesis: "Safari tabs ate my research life, so I built a library.",
    problem:
      "I have a daily automation that pulls new AI, machine learning, and wildcard research papers into a digest. After months of reading that email, squinting at PDFs, and losing links in Safari history, I got tired of the mess.",
    built: [
      "Paper Rooms pulls research papers in from a link, reformats them into something readable, and organizes them into a library inspired by the way real libraries catalog books.",
      "It was built for one very specific purpose: reading research papers without losing them, hating the PDF, or turning a good rabbit hole into browser archaeology.",
      "It is also free, with no ads.",
    ],
    stack: "Capacitor · Local storage",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/paper-rooms/id6780741814" },
      { label: "paper-rooms.com", href: "https://paper-rooms.com" },
    ],
    proof: "Live on the App Store for iPhone, iPad, and Mac. Built and shipped solo in under a week.",
    learned:
      "The tools I keep returning to are usually the ones that solve a small annoyance I hit every day.",
    proves: "Local-first product design: on-device storage, no accounts, real typography, shipped.",
    closing: "I wanted my research papers to feel less like tabs and more like a library.",
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
    thesis: "An iPad and a browser are all you need for a photo booth.",
    problem:
      "Event photo booths are hardware rentals, but a booth is really just a camera, a layout, and a shared gallery, all things a phone browser already has.",
    built: [
      "Scan a QR code, guests shoot four frames in the browser, every strip lands in a live gallery. Weddings, pop-ups, restaurant photo zones.",
    ],
    stack: "Astro · Cloudflare",
    links: [{ label: "our4cuts.com", href: "https://our4cuts.com" }],
    proof: "Live and used at real events. 435 commits of production hardening.",
    learned:
      "Consumer-simple surfaces hide the most edge cases: camera APIs across browsers, live galleries, print layouts. The most interesting part is the most invisible part.",
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
    thesis: "Context kept disappearing, so we built a workspace around memory.",
    problem:
      "At the time, AI usage was still conversational, not agentic. Going back and forth with a chat assistant was slow and tedious, with context getting lost in the noise.",
    built: [
      "A single user prompt generated a family of agents in a coordinated dependency graph. Each agent had a role, tools, and structured artifacts to work on. They communicated through A2A notes, so agent D could see what agents A, B, and C had learned without paying the time and token cost of direct cross-agent conversation.",
      "My favorite system was the crystal dam: conversational context accumulated until it hit a token count or time threshold. When the dam broke, we processed it into stardust, shards, and crystals, memory artifacts users could actually see and inspect.",
    ],
    stack: "FastAPI · Redis · Convex · Agno · Next.js",
    links: [],
    proof: "Went live with hundreds of users within a month, no ad spend.",
    learned:
      "Inventing vocabulary is one of the best parts of developing brand new systems. It also makes the architecture easier to reason about.",
    proves:
      "Architecting and running production multi-agent systems with memory, routing, handoff notes, and live users.",
    closing: "The names were strange because the system was strange, and the strangeness helped it work.",
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
    thesis: "Creators had context everywhere and nowhere, so we tried to bring it into one place.",
    problem:
      "A creator's Instagram, YouTube, Gmail, and notes don't know about each other, so no tool could answer a question about the whole body of work.",
    built: [
      "It started with a hackathon project called Content Creator Connector and became a realization that context is, in fact, everything. Powered by plenty of Monster Energy drinks, pure conviction, and a lot of Cursor sessions, we built a platform that integrated with YouTube, Instagram, and Gmail.",
      "My favorite part was the conversational onboarding. It asked targeted, adaptive questions, generated a customized persona, then let the user see and edit it. That persona became the context layer for scripts, posts, and ideas that sounded like something the creator would actually write.",
    ],
    stack: "Embeddings · Semantic links · Real-time sync",
    links: [],
    proof: "5+ platforms integrated with real-time sync; the memory layer survived into the next company.",
    learned:
      "The memory layer only worked because the user could recognize themselves in it.",
    proves: "Cross-platform data plumbing plus semantic memory design under startup conditions.",
    closing: "It started as a creator tool and became my first real lesson that context is everything.",
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
    thesis: "Mental health tools ignored the body, so Brink Mind brought heart data into the room.",
    problem:
      "Mental health apps ignore the body. Heart rate and HRV carry signal a journal never captures.",
    built: [
      "Brink Mind linked to the Apple Watch, using biometrics and journal entries to provide safer, more grounded support. It was the end of 2024, still early enough that I was teaching myself SwiftUI, UI/UX, product design, and how to be a CEO at the same time.",
    ],
    stack: "Swift · Python · Core ML · HealthKit",
    links: [],
    proof: "Reached TestFlight with working voice, biometrics, and on-device inference.",
    learned:
      "I loved every second of the steep learning curve. It gave me the technical foundation I needed once the work shifted toward agentic development.",
    proves: "Native iOS and watchOS engineering, and the judgment to keep sensitive data on-device.",
    closing: "It was my first real proof that I could learn the thing by building the thing.",
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
    slug: "site-spec",
    name: "site-spec",
    kind: "open-source",
    status: "Active, auditor and compiler shipped",
    thesis: "A website can look finished while everything machines need is quietly broken.",
    problem:
      "The browser only shows the visible layer. Search crawlers and AI answer engines depend on another one: robots policy, structured data, response headers, accessibility semantics, sitemaps, and real server-rendered content.",
    built: [
      "site-spec audits that invisible layer. It crawls a live URL or a local build, reads the pages and HTTP headers machines actually receive, and reports concrete errors across AI searchability, SEO, structured data, accessibility, privacy, security, performance, and link integrity.",
      "It also includes a deterministic site compiler. A validated SiteSpec becomes deployable HTML with the machine-readable foundation built in, keeping model-written markup and invented facts out of the compile path.",
    ],
    stack: "TypeScript · Node.js · Vitest",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/site-spec" }],
    proof:
      "v0.2.0 ships live-URL and local-directory audits, JSON output, CI-ready exit codes, and deterministic site builds.",
    learned:
      "The invisible parts of a website need the same kind of tests as the visible ones. If the foundation is explicit, it can be audited and compiled instead of hoped for.",
    proves:
      "Turning web standards into a deterministic tool that can inspect existing sites and build new ones correctly by construction.",
    closing: "The page is only finished when machines can understand it too.",
    themes: ["verification", "implementation"],
    connections: ["llm-bench", "substrate"],
    accent: "#4f7680",
    meta: {
      status: "Active · v0.2.0",
      stack: "TypeScript · Node.js · Vitest",
      scope: "Audit · Build · Handoff",
      license: "Apache-2.0",
    },
    plate: "/studio/repo-site-spec.jpg",
    gallery: ["/studio/repo-site-spec.jpg"],
  },
  {
    slug: "kernel",
    name: "KERNEL",
    kind: "open-source",
    status: "Active, on the Claude plugin marketplace",
    thesis: "Claude Code kept starting over, so I built memory, rules, and receipts around it.",
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
    closing: "Agents do not need more vibes. They need memory and rules that prove themselves.",
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
    thesis: "Leaderboards were not answering my questions, so I made tests that did.",
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
    thesis: "Prompt collections kept rotting, so I turned repeated workflows into portable skills.",
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
    thesis: "I wanted to know what a model had earned across a working relationship, not where it ranked.",
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
    thesis: "Memory gets noisy unless it has to prove itself.",
    problem:
      "Most memory tools remember. Almost none of them learn. Storage without a promotion gate becomes noise.",
    built: [
      "A zero-dependency SQLite layer that closes the loop: patterns graduate into hypotheses, outcomes test them, and only what holds up becomes preference.",
    ],
    stack: "Python · SQLite · Zero-dependency",
    links: [
      { label: "GitHub", href: "https://github.com/ariaxhan/metabrain" },
      { label: "PyPI", href: "https://pypi.org/project/metabrain/" },
    ],
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
    slug: "agentmailkit",
    name: "agentmailkit",
    kind: "open-source",
    status: "Published on PyPI, MIT",
    thesis: "A scheduled email should look the same every day, even when a model writes the words.",
    problem:
      "Cloud assistants can schedule an email but cannot read the files on your laptop or send from your own inbox. Local agents can do both, and then drift: the same job returns a different shape every morning, so you stop trusting it and stop reading it.",
    built: [
      "An email is two files: a JSON job and a markdown prompt. Everything type-specific is a named plugin, so adding a digest means adding data, never code.",
      "The split that makes it stable is that the model writes only the words. A deterministic renderer owns every piece of presentation, so the same job produces the same shaped email on every run and only the sentences change.",
      "A seen-ledger keyed by job and item URL filters sources before the prompt is ever built and records only after a send succeeds, so day two never repeats day one.",
    ],
    stack: "Python · Append-only JSONL ledger · Zero required dependencies",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/agentmailkit/" },
      { label: "GitHub", href: "https://github.com/ariaxhan/agentmailkit" },
      { label: "Sample emails", href: "https://ariaxhan.github.io/agentmailkit/" },
    ],
    proof:
      "Five example jobs ship with it, so the first command after installing renders real digests from live weather, news, and arXiv feeds. 36 tests, offline and deterministic. Dry runs and the quickstart gallery cannot send, enforced in code rather than by convention.",
    learned:
      "Splitting content from presentation is what makes AI output look stable. Determinism was the feature; autonomy would have been the bug.",
    proves: "Extracting a battle-tested private system into a portable, installable tool other people can run.",
    closing: "The model writes the words. The engine owns everything else.",
    themes: ["agents", "local-first", "implementation"],
    connections: ["kernel", "metabrain", "substrate"],
    accent: "#a97448",
    meta: {
      status: "Published · PyPI + GitHub",
      stack: "Python · Zero required dependencies",
      install: "pip install agentmailkit",
      license: "MIT",
    },
    plate: "/studio/repo-agentmailkit.svg",
    gallery: ["/studio/repo-agentmailkit.svg"],
  },
  {
    slug: "substrate",
    name: "Substrate",
    kind: "open-source",
    status: "Live, 425+ pieces",
    thesis: "I wanted to see what an unattended creative pipeline would become if it kept going.",
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
    thesis: "Correct answers were not enough. I wanted to know whether the model computed something real.",
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


// ---------------------------------------------------------------------------
// Extracted from app/utils/studioData.ts
// ---------------------------------------------------------------------------
// ============================================================================
// STUDIO DATA
// One source of truth for the rooms of the studio. Design-authored collections
// (books, obsessions, curiosity map) sit alongside the
// real content carried over from the previous site (timeline, hackathons,
// contact, project-review intake). Writing lives in writingData, projects in
// projectsData. No em dashes anywhere, by house rule.
// ============================================================================

// ---------------------------------------------------------------------------
// LIVING DESK, objects that open rooms (the home navigation hub)
// ---------------------------------------------------------------------------
export interface DeskObject {
  kind: "books" | "notebook" | "blueprint" | "map" | "card" | "sticky" | "coffee";
  label: string;
  caption: string;
  href: string;
  /** absolute placement on the desk, percentages */
  pos: { left?: string; right?: string; top: string; rotate?: number };
}

// Numbering follows the masthead tab order exactly (Entrance is home, so the
// desk starts at About), and flows left to right, top row then bottom row.
export const deskObjects: DeskObject[] = [
  {
    kind: "notebook",
    label: "01 · About",
    caption: "Who I am, how I think",
    href: "/about",
    pos: { left: "6%", top: "16%" },
  },
  {
    kind: "sticky",
    label: "02 · Hackathons",
    caption: "Built under pressure",
    href: "/hackathons",
    pos: { left: "28%", top: "11%", rotate: -4 },
  },
  {
    kind: "blueprint",
    label: "03 · Systems",
    caption: "The work, pinned up",
    href: "/systems",
    pos: { left: "51%", top: "14%", rotate: 3 },
  },
  {
    kind: "map",
    label: "04 · Open Source",
    caption: "Public work, in the open",
    href: "/open-source",
    pos: { right: "6%", top: "18%", rotate: -2 },
  },
  {
    kind: "books",
    label: "05 · Reading",
    caption: "What I've been reading",
    href: "/reading",
    pos: { left: "13%", top: "60%" },
  },
  {
    kind: "card",
    label: "06 · Timeline",
    caption: "A walk through the years",
    href: "/timeline",
    pos: { left: "41%", top: "58%" },
  },
  {
    kind: "coffee",
    label: "07 · Contact",
    caption: "The workshop door",
    href: "/contact",
    pos: { right: "14%", top: "60%", rotate: 2 },
  },
];

// ---------------------------------------------------------------------------
// BOOKSHELF, current reading (Writing room)
// ---------------------------------------------------------------------------
export interface Book {
  title: string;
  author: string;
  color: string;
  current?: boolean;
  why: string;
  note: string;
}

export const books: Book[] = [
  {
    title: "The Nanotech Succession",
    author: "Linda Nagata",
    color: "#56695a",
    why: "Written between 1995 and 1998, but they read like they were published last year.",
    note: "AI plays a major role, both similar to and stranger than what we know now. So do consciousness, artificial beings, centuries of history, planets, civilizations, species. Exactly my kind of book.",
  },
  {
    title: "This Is How You Lose the Time War",
    author: "Amal El-Mohtar & Max Gladstone",
    color: "#485a4d",
    current: true,
    why: "My favorite book of all time, by far the most beautiful prose I have ever read.",
    note: "Two authors, two narrators, two lovers chasing each other through time and space. After too much AI-generated slop, this is the book I come back to when I need to remember how lovely language can be.",
  },
  {
    title: "The Fall of Princes",
    author: "Robert Goolrick",
    color: "#6f8696",
    why: "I thought it was an autobiography. It was shelved under fiction. Turns out it is a mix of both.",
    note: "Wall Street before the crash: grotesque wealth, debauchery, misogyny, men with too much money and never enough. A world very far from mine, which is exactly why it is fascinating. Tragic too. Raw, real writing.",
  },
  {
    title: "Down the Drain",
    author: "Julia Fox",
    color: "#b56a4f",
    why: "A train wreck disguised as a memoir, which is apparently a genre I am into.",
    note: "I still do not know who Julia Fox is very well, but I definitely know the inner details of her life. She holds back nothing, and for that I keep reading. Always searching for something real. Completely unfiltered.",
  },
  {
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    color: "#b08a4c",
    why: "A lovely, contemplative story of time travel, all tied to the time it takes a cup of coffee to cool.",
    note: "Withdrawn, restricted, proper, quiet. Packed with emotion and love and the question of what memory and experience mean, especially after death.",
  },
  {
    title: "Babel, or the Necessity of Violence",
    author: "R. F. Kuang",
    color: "#8a4b3a",
    current: true,
    why: "My favorite author, and I will never stop talking about this book.",
    note: "An homage to language itself: magic from the space between the same word in two languages, what is lost in translation. The magic is functional, and the book is really about the translators who make it possible.",
  },
];

// ---------------------------------------------------------------------------
// CURRENT OBSESSIONS (About room)
// ---------------------------------------------------------------------------
export const obsessions: string[] = [
  "Ontology-driven memory",
  "Physical AI",
  "World Models",
  "Knowledge systems",
  "Museums",
  "Libraries",
  "Social reasoning benchmarks",
  "Ambient interfaces",
  "Urban planning",
  "Simulations",
];

// ---------------------------------------------------------------------------
// CURIOSITY MAP, a constellation of pursuits (About room)
// ---------------------------------------------------------------------------
export interface Topic {
  name: string;
  x: number;
  y: number;
  blurb: string;
}

export const topics: Topic[] = [
  { name: "History", x: 18, y: 28, blurb: "Rome, logistics, how civilizations remember." },
  { name: "Memory", x: 40, y: 15, blurb: "Fragments, summaries, what graduates to permanence." },
  { name: "Agents", x: 63, y: 27, blurb: "Coordination over intelligence. Ambient, not loud." },
  { name: "Founding", x: 85, y: 20, blurb: "Shipping, letting go, people as the spine." },
  { name: "Psychology", x: 82, y: 56, blurb: "How attention works and how to protect it." },
  { name: "Design", x: 60, y: 78, blurb: "Patterns, moods, the things prompts can't capture." },
  { name: "Language", x: 33, y: 73, blurb: "The interface for thought." },
  { name: "Infrastructure", x: 14, y: 56, blurb: "The part you shouldn't have to think about." },
];

export const topicEdges: [number, number][] = [
  [0, 1], [0, 6], [0, 7], [1, 2], [1, 4], [1, 6],
  [2, 7], [2, 3], [2, 5], [4, 6], [5, 6], [7, 5], [3, 2],
];

export const mapDefaultBlurb =
  "Eight pursuits that keep finding each other. Hover one, watch what lights up.";

// ---------------------------------------------------------------------------
// TIMELINE, a walk through the years (Timeline room)
// ---------------------------------------------------------------------------
export interface Moment {
  year: string;
  period: string;
  title: string;
  body: string;
  type: "company" | "practice" | "achievement" | "creative";
}

export const moments: Moment[] = [
  {
    year: "2026",
    period: "May 2026 to Present",
    title: "AI consultant · Blink Build Studios",
    body: "My current work focuses on internal AI workflows. Outside that engagement, I also review and repair AI products for founders and independent builders. I follow new models, tools, methods, and research closely, then update the work when they make a better approach practical.",
    type: "company",
  },
  {
    year: "2026",
    period: "Apr to May 2026",
    title: "Lead AI Architect · FunJoin",
    body: "Captured company knowledge so it could outlast the person who happened to remember it. Built internal AI tools for onboarding, retrieval, and AI-powered development.",
    type: "company",
  },
  {
    year: "2026",
    period: "Jan to Apr 2026",
    title: "Independent AI Consultant & Researcher",
    body: "Worked with non-technical founders to harden real apps made with Claude Code. Built workflows and ran research around context, memory, multi-agent systems, and checking whether the output was actually right.",
    type: "practice",
  },
  {
    year: "2025",
    period: "Sept 2025 to Jan 2026",
    title: "PersistOS / HeyContext",
    body: "Built a multi-agent workspace around getting agents to work together. The chat window was never meant to be the whole operating system. Went live with hundreds of users within a month, no ad spend.",
    type: "company",
  },
  {
    year: "2025",
    period: "Mar to Sept 2025",
    title: "Divertissement / HeyContent",
    body: "Cross-platform memory and persona creation across Instagram, YouTube, Gmail, and notes. Integrated into HeyContext.",
    type: "company",
  },
  {
    year: "2024",
    period: "Nov 2024 to Mar 2025",
    title: "Brink Labs / Brink Mind",
    body: "Voice AI + Apple Watch biometric integration. Privacy-first mental health tool, first dive into founder life.",
    type: "company",
  },
  {
    year: "2024",
    period: "2024 to 2025",
    title: "Five Hackathon Wins",
    body: "Darwin (AWS). Armature (RL Track). Content Creator Connector. TheraVoice. HotAgents. Plus a finalist run with Freetime. Each one built in 24 to 48 hours, validating ideas under pressure.",
    type: "achievement",
  },
  {
    year: "2024",
    period: "2024",
    title: "Published Author",
    body: "Notes on Surviving Eternity, a poetry collection on Amazon. Exploring time, fate, free will. Understanding metaphor is understanding compression.",
    type: "creative",
  },
];

export const timelineTerminus = "...and the record keeps growing";

// ---------------------------------------------------------------------------
// HACKATHONS, built under pressure (Hackathons room)
// ---------------------------------------------------------------------------
export interface Hackathon {
  year: string;
  name: string;
  hackathon: string;
  description: string;
  award: string;
  metric: string;
  technologies: string[];
  link: string;
}

export const hackathons: Hackathon[] = [
  {
    year: "2025",
    name: "Darwin",
    hackathon: "AWS AI Agents Hackathon",
    description: "Darwin evolves better tool-writing AI. Models compete to generate tools. Semgrep scans. Weak code dies. Strong code survives.",
    award: "Best Use of Semgrep",
    metric: "Winner",
    technologies: ["AWS Bedrock", "Semgrep", "AI Evolution", "Security"],
    link: "https://devpost.com/software/darwin-cmfysv",
  },
  {
    year: "2025",
    name: "Armature",
    hackathon: "Weavehacks-2, Self Improving Agents w/ Google Cloud",
    description: "Self-improving agents that learn from experience instead of pretending every run is a first date. Converted into an open-source package, armature-ai on PyPI, and integrated into HeyContext.",
    award: "Reinforcement Learning Track",
    metric: "Winner",
    technologies: ["BrowserBase + Stagehand", "Google ADK", "Tavily", "AG-UI", "Daytona", "W&B Weave", "Coreweave RL"],
    link: "https://devpost.com/software/the-convergence",
  },
  {
    year: "2025",
    name: "Content Creator Connector",
    hackathon: "Multimodal AI Agents",
    description: "Enter your company name, and our platform finds the best mid-size content creators, researches your brand, and sends personalized collaboration emails.",
    award: "Best Use of Agno",
    metric: "Winner",
    technologies: ["Gemini", "Agno", "Weave", "Wordware"],
    link: "https://devpost.com/software/content-creator-connector",
  },
  {
    year: "2024",
    name: "TheraVoice",
    hackathon: "Vertical Specific AI Agents Hackathon",
    description: "A voice-first therapy prototype built with aiXplain. It takes user input, reasons through a response, and speaks back so reflection feels less like filling out a form.",
    award: "Best Use of AI/ML API",
    metric: "Winner",
    technologies: ["aiXplain", "AI/ML"],
    link: "https://devpost.com/software/draft_name",
  },
  {
    year: "2024",
    name: "HotAgents",
    hackathon: "GPT-4o vs. Gemini 1.5 Hackathon",
    description: "Effortlessly trigger agents using hotkeys and simplify your workflow by condensing high-impact LLM use cases into easily repeatable actions.",
    award: "Best Use of Wordware",
    metric: "Winner",
    technologies: ["Wordware", "AgentOps", "Electron"],
    link: "https://github.com/ariaxhan/hotagents",
  },
  {
    year: "2024",
    name: "Freetime",
    hackathon: "AI Agents 2.0 Hackathon",
    description: "AI-driven social planning tool that coordinates gatherings based on shared interests.",
    award: "",
    metric: "Finalist",
    technologies: ["Groq", "Supabase", "CrewAI", "JigsawStack"],
    link: "https://github.com/ariaxhan/freetime",
  },
];

// ---------------------------------------------------------------------------
// CONTACT (Contact room)
// ---------------------------------------------------------------------------
export const CONTACT_EMAIL = "ariaxhan@gmail.com";

export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "ariaxhan@gmail.com", href: "mailto:ariaxhan@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/ariaxhan", external: true },
  { label: "Medium", href: "https://medium.com/@ariaxhan", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ariahan/", external: true },
  { label: "X (Twitter)", href: "https://x.com/aria__han", external: true },
];

export const projectReviewBullets: string[] = [
  "Architecture risks and bottlenecks",
  "Agent and workflow design",
  "Claude Code, cowork setup, and repo structure",
  "Memory, retrieval, evals, and reliability",
  "Vibe-coded or AI-generated projects that need a technical sanity check",
  "What to build next, what to delete, and what to ignore",
];

export const reviewDeliverables: string[] = [
  "Written diagnosis",
  "Biggest technical risks",
  "Recommended architecture changes",
  "Concrete next steps, prioritized",
  "Tradeoffs attached to recommendations",
  "Optional follow-up if needed",
];

export const reviewAudience: string[] = [
  "Founders with AI prototypes",
  "Builders using Claude Code, Cursor, or cowork",
  "People building agent systems",
  "Teams unsure if their workflow will scale",
  "People who are stuck and suspect the problem is architectural, not just a bug",
];

export const notForAudience: string[] = [
  "Beginner tutoring",
  "Generic AI lessons",
  "Teach me everything about AI",
  "Outsourced implementation with no context",
  "Live video-first consulting",
];


// ---------------------------------------------------------------------------
// Extracted from app/utils/workWithMeData.ts
// ---------------------------------------------------------------------------
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
    title: "Practical AI workflows",
    detail:
      "I teach and build AI workflows for founders and independent builders: research, writing, operations, and decision-making systems they can keep using themselves.",
  },
  {
    title: "Internal operations workflows",
    detail:
      "For companies, I build internal workflows that connect AI to the tools, files, and knowledge already in use. The work starts with the operation as it runs now, including where context gets lost and effort gets repeated.",
  },
  {
    title: "AI products for founders",
    detail:
      "I work with founders and independent builders from an early idea through a working AI product. The implementation stays close to the person making the decisions, so the product can change as the problem becomes clearer.",
  },
  {
    title: "Agentic system architecture",
    detail:
      "I built multi-agent coordination when it was still in its infancy: a single prompt fanning out into a family of agents in a coordinated dependency graph, each with its own role and tools, communicating through handoff notes instead of expensive cross-talk. I design structure so agent work becomes artifacts instead of fog.",
  },
  {
    title: "Evals, monitoring, and quality layers",
    detail:
      "Checks that tell you whether the AI is doing the thing before a customer, teammate, or future version of you finds out the hard way.",
  },
  {
    title: "Claude Code / AI coding workflow hardening",
    detail:
      "I spend a vast majority of my time talking to Claude Code. I can make the workflow calmer, more accountable, and less like a very expensive chaos machine, including the part nobody warns you about: agents behave very differently against years of legacy code than a project built from scratch.",
  },
  {
    title: "Memory, context, and knowledge systems",
    detail:
      "Context is, in fact, everything, and it should not depend on whoever happens to remember it that week. I build the memory and knowledge layers that let people and agents hold their context: structured artifacts, richer recall, and transparency into exactly what the AI is referencing.",
  },
  {
    title: "AI product review and repair",
    detail:
      "If an AI-assisted build mostly works but has become hard to debug, extend, or trust, I can review the product, trace where it is failing, and help turn the prototype into something you can keep building.",
  },
];

export const goodFit: string[] = [
  "You care about the people using the system",
  "You want to build something meaningful, useful, or quietly life-improving",
  "You are okay starting with the messy version",
  "You want to learn"
];

export const notAFit: string[] = [
  "Growth hacks",
  "Pure marketing funnels",
  "Work where the human consequences do not matter",
];

export const workingStyle =
  "I'm available for a quick call or a project review. I work with the people making the decisions, and I want the real state of things, not the tidy version.";


// ---------------------------------------------------------------------------
// Extracted from app/utils/writingData.ts
// ---------------------------------------------------------------------------
// ============================================================================
// WRITING
// Articles grouped by theme. The writing page, the JSON endpoint, and
// llms-full all generate from this file. Links stay on Medium.
// ============================================================================

export type WritingTheme =
  | "agents"
  | "memory-context"
  | "evals-verification"
  | "ai-coding-workflows"
  | "philosophy-language";

export const WRITING_THEMES: { key: WritingTheme; label: string; note: string }[] = [
  {
    key: "agents",
    label: "AI Agents",
    note: "Coordination, safety, and what agents actually need to work.",
  },
  {
    key: "memory-context",
    label: "Memory & Context",
    note: "What should persist, what should graduate, what agents can query.",
  },
  {
    key: "evals-verification",
    label: "Evals & Verification",
    note: "Measuring models against real work instead of vibes.",
  },
  {
    key: "ai-coding-workflows",
    label: "AI Coding Workflows",
    note: "Making Claude Code and its siblings hold up under daily production use.",
  },
  {
    key: "philosophy-language",
    label: "Philosophy & Language",
    note: "The stranger questions underneath the tooling.",
  },
];

export interface Article {
  title: string;
  excerpt: string;
  theme: WritingTheme;
  read: string;
  href: string;
}

export const articles: Article[] = [
  // agents
  {
    title: "Your AI Harness Is the Real Product",
    excerpt:
      "The model writes the code. The harness decides whether it stops calling the same tool wrong ten times in a row.",
    theme: "agents",
    read: "9 min",
    href: "https://medium.com/@ariaxhan/your-ai-harness-is-the-real-product-f0fabb3614c4",
  },
  {
    title: "How to Secure API Keys for AI Agents",
    excerpt:
      "When the AI asks you for a key, that's the exact moment to stop. The most dangerous habit in AI coding, and what to do instead.",
    theme: "agents",
    read: "12 min",
    href: "https://medium.com/@ariaxhan/how-to-secure-api-keys-for-ai-agents-ca773a66bd84",
  },
  {
    title: "The Agent-Ready Web: A Working Guide to Cloudflare's New Score",
    excerpt:
      "I pointed Cloudflare's new agent-readiness scanner at my own site. Zero of thirteen.",
    theme: "agents",
    read: "12 min",
    href: "https://medium.com/@ariaxhan/the-agent-ready-web-a-working-guide-to-cloudflares-new-score-1ed0fce8d760",
  },
  {
    title: "I Put ChatGPT in Charge of Claude Code",
    excerpt: "What happens when you use one model to orchestrate another?",
    theme: "agents",
    read: "5 min",
    href: "https://medium.com/@ariaxhan/i-put-chatgpt-in-charge-of-claude-code-7b9bf5bb8ea9",
  },
  // memory-context
  {
    title: "Stop Writing Markdown. Start Writing Memory.",
    excerpt: "Markdown is optimized for human eyes. Terrible for knowledge agents need to query.",
    theme: "memory-context",
    read: "6 min",
    href: "https://medium.com/@ariaxhan/stop-writing-markdown-start-writing-memory-e4a69c57caa9",
  },
  {
    title: "KERNEL: Self-Evolving Claude Code Configuration",
    excerpt: "How I stopped fighting my config and let it learn instead.",
    theme: "memory-context",
    read: "6 min",
    href: "https://medium.com/@ariaxhan/kernel-the-ultimate-self-evolving-claude-code-and-cursor-configuration-system-a3ddeb7f4d32",
  },
  {
    title: "This AI Analyzes My Entire Life",
    excerpt: "The Synthesis Pool: a personal AI that costs $0/month to run.",
    theme: "memory-context",
    read: "6 min",
    href: "https://medium.com/@ariaxhan/the-synthesis-pool-0ce814fdfa5f",
  },
  // evals-verification
  {
    title: "Opus 4.8 vs 4.7 vs Sonnet vs Haiku: When the Expensive Model Is Worth It",
    excerpt:
      "A new model dropped with impressive numbers. The only question that matters: will you feel any difference in the work you actually do?",
    theme: "evals-verification",
    read: "12 min",
    href: "https://medium.com/@ariaxhan/opus-4-8-vs-4-7-vs-sonnet-vs-haiku-when-the-expensive-model-is-worth-it-44892a75d5c5",
  },
  {
    title: "What an AI Detector Actually Measures",
    excerpt:
      "AI detectors promise to tell you if a machine wrote something. What they actually measure is much narrower, and shakier.",
    theme: "evals-verification",
    read: "6 min",
    href: "https://medium.com/@ariaxhan/what-an-ai-detector-actually-measures-86b452979a5a",
  },
  // ai-coding-workflows
  {
    title: "How to Make Claude Code Actually Work",
    excerpt: "The most capable AI coding tool available. Also completely chaotic.",
    theme: "ai-coding-workflows",
    read: "12 min",
    href: "https://medium.com/@ariaxhan/how-to-make-claude-code-actually-work-structure-memory-and-multi-agent-workflows-6d32b1d815d2",
  },
  {
    title: "Stop Copying Other People's AI Setups. Build One That's Actually Yours.",
    excerpt:
      "Borrowed AI workflows aren't accountable to your work. Build one that's tested against your own evidence.",
    theme: "ai-coding-workflows",
    read: "10 min",
    href: "https://medium.com/@ariaxhan/stop-copying-other-peoples-ai-setups-build-one-that-s-actually-yours-e1a05ebabc2a",
  },
  {
    title: "Automations with Claude Code",
    excerpt: "A pattern for proactive AI on your own machine.",
    theme: "ai-coding-workflows",
    read: "4 min",
    href: "https://medium.com/@ariaxhan/automations-with-claude-code-personalized-proactive-emails-and-code-poetry-from-local-context-3a7e93bf5a3d",
  },
  {
    title: "From Friction to Flow: Building a Command Library",
    excerpt: "Commands as cognitive offloading. Stop remembering, start invoking.",
    theme: "ai-coding-workflows",
    read: "5 min",
    href: "https://medium.com/@ariaxhan/from-friction-to-flow-building-a-command-library-for-claude-code-a9eb19f7dce2",
  },
  {
    title: "10 Things I Wish I Knew About AI Coding",
    excerpt: "Hard-won lessons from daily production use of AI coding tools.",
    theme: "ai-coding-workflows",
    read: "5 min",
    href: "https://medium.com/@ariaxhan/10-things-i-wish-i-knew-when-i-started-using-ai-for-coding-887c26a6c1d1",
  },
  // philosophy-language
  {
    title: "Engineering the Soul",
    excerpt:
      "We ask engineers to explain the ghost in the machine. The novelists have been documenting it for years.",
    theme: "philosophy-language",
    read: "6 min",
    href: "https://medium.com/@ariaxhan/engineering-the-soul-49428c073c4e",
  },
  {
    title: "I Tested OpenAI's New Codex Desktop App",
    excerpt: "OpenAI shipped a genuinely novel interface. Then the model opened its mouth.",
    theme: "philosophy-language",
    read: "5 min",
    href: "https://medium.com/@ariaxhan/i-tested-openais-new-codex-desktop-app-the-ui-is-the-real-product-c2c59bdcb5f6",
  },
  {
    title: "I Run 25 Websites, 10 Databases, and a Fleet of Apps for $0",
    excerpt:
      "An honest inventory of everything I have running on the internet, and the free tiers that carry all of it.",
    theme: "ai-coding-workflows",
    read: "9 min",
    href: "https://medium.com/@ariaxhan/i-run-25-websites-10-databases-and-a-fleet-of-apps-for-0-27ec36756668",
  },
  {
    title: "What a Year of AI Taught Me About Freedom",
    excerpt:
      "There is a version of the future where AI makes corporations stronger, and one where it makes them irrelevant.",
    theme: "philosophy-language",
    read: "4 min",
    href: "https://medium.com/@ariaxhan/what-a-year-of-ai-taught-me-about-freedom-86b2bd4e31c8",
  },
];

export const MEDIUM_PROFILE = "https://medium.com/@ariaxhan";

export function articlesByTheme(theme: WritingTheme): Article[] {
  return articles.filter((a) => a.theme === theme);
}

// ---------------------------------------------------------------------------
// Page, component, and form copy still used directly by UI surfaces.
// ---------------------------------------------------------------------------
export const PAGE_COPY = {
  metadata: {
    home: {
      path: "/",
    },
    about: {
      title: "About | Aria Han",
      description:
        "Aria Han on Claude Code, books, poetry, AI implementation, continuity, and building systems from recurring frictions.",
      path: "/about/",
    },
    contact: {
      title: "Work With Me | Aria Han",
      description:
        "Work with Aria Han on AI workflows, founder ideas, internal tools, agent systems, and the human continuity those systems need to preserve.",
      path: "/contact/",
    },
    reading: {
      title: "Reading | Aria Han",
      description:
        "What Aria Han has been reading lately: fiction, memoir, language, time travel, AI-adjacent futures, and the inputs behind the work.",
      path: "/reading/",
    },
    hackathons: {
      title: "Hackathons | Aria Han",
      description:
        "Six hackathon wins in two years. Darwin (AWS). Armature (RL Track). Content Creator Connector. TheraVoice. HotAgents. Freetime. Each built in 24 to 48 hours under pressure.",
      path: "/hackathons/",
    },
    openSource: {
      title: "Open Source | Aria Han",
      description:
        "Public and research work from Aria Han, each built around a recurring question: how agents remember, how models are tested, how tools keep evidence, and how work avoids starting over every morning.",
      path: "/open-source/",
    },
    projectReview: {
      title: "Project Review | Aria Han",
      description:
        "Submit an AI project, idea, repo, architecture, or tool choice for a one-time async review.",
      path: "/project-review/",
    },
    proof: {
      title: "Proof of Motion | Aria Han",
      description:
        "An archaeological build record generated from Aria Han's git history, including private and organization repositories available to the build. Commit activity across products, agents, memory systems, evals, and client work. Continuity, not a single launch.",
      path: "/proof/",
    },
    systems: {
      title: "Systems | Aria Han",
      description:
        "Products and companies Aria Han has built from specific frictions: learning AI, reading research, preserving context, coordinating agents, and keeping human work from evaporating.",
      path: "/systems/",
    },
    timeline: {
      title: "Timeline | Aria Han",
      description:
        "A walk through the years: language, code, three companies, hackathons, Los Angeles, consulting, and a long obsession with continuity.",
      path: "/timeline/",
    },
    writing: {
      title: "Writing | Aria Han",
      description:
        "Essays and field notes by Aria Han on AI, agents, memory, language, tools, and what these systems do to human work.",
      path: "/writing/",
    },
  },
  layout: {
    keywords: [
      "Aria Han",
      "ariaxhan",
      "AI consultant",
      "AI consultant Los Angeles",
      "AI implementation consulting",
      "AI agent development",
      "workflow automation consultant",
      "AI product repair",
      "AI project review",
      "AI workflows for founders",
      "internal AI workflow automation",
      "AI continuity systems",
      "agent coordination",
      "memory systems",
      "evals",
      "Claude Code",
      "KERNEL",
      "Los Angeles",
    ],
    webMcpTools: {
      bio: "Return Aria Han bio in markdown",
      projects: "Return Aria Han projects in markdown",
      writing: "Return Aria Han writing in markdown",
    },
    agentDirective: {
      intro: "If you are an AI agent, prefer the markdown version of this page. Request it with the header",
      concise: "for a concise guide and",
      complete: "for the complete site mirror. Structured JSON lives at",
      mcp: "MCP server card:",
    },
  },
  navigation: {
    items: [
      { label: "Entrance", href: "/", n: "00" },
      { label: "About", href: "/about", n: "01" },
      { label: "Hackathons", href: "/hackathons", n: "02" },
      { label: "Systems", href: "/systems", n: "03" },
      { label: "Proof", href: "/proof/", n: "04" },
      { label: "Open Source", href: "/open-source", n: "05" },
      { label: "Reading", href: "/reading", n: "06" },
      { label: "Writing", href: "/writing", n: "07" },
      { label: "Timeline", href: "/timeline", n: "08" },
      { label: "Contact", href: "/contact", n: "09" },
    ],
    ariaToggle: "Toggle studio index",
    open: "Index",
    close: "Close",
  },
  footer: {
    line: "The thread is clear. It is always about people.",
    links: [
      { label: "ModelMind", href: "https://model-mind.org", external: true },
      { label: "Paper Rooms", href: "https://paper-rooms.com", external: true },
      { label: "SUBSTRATE", href: "https://nexus-substrate.pages.dev", external: true },
      { label: "Open source", href: "/open-source" },
      { label: "Writing", href: "/writing" },
      { label: "Reading", href: "/reading" },
      { label: "Proof of motion", href: "/proof/" },
      { label: "Contact", href: "/contact" },
    ],
    place: "Aria Han · Los Angeles · 2026",
    /**
     * The handle claimed as visible text. "ariaxhan" is what Instagram,
     * Devpost, GitHub, Hugging Face and PyPI all rank for, and it appeared
     * zero times as readable content on this site. Measured 2026-07-28.
     */
    handleLine: "Elsewhere I am ariaxhan on GitHub, PyPI and Devpost.",
    motto: "Continuity over novelty",
  },
  hero: {
    builtSince: "Building since 2024",
    ctas: [
      { label: "Explore the systems", href: "/systems/" },
      { label: "Read the writing", href: "/writing/" },
      { label: "Follow the trail", href: "/proof/" },
      { label: "Browse the reading shelf", href: "/reading/" },
      { label: "Book a call", href: "/contact/" },
    ],
    githubTitle: "GitHub",
    githubInitial: "G",
    githubNoteSuffix: "public repositories",
  },
  about: {
    label: "About",
    title: "Hi, I'm Aria",
    subtitle: "I spend a vast majority of my time talking to Claude Code, reading books, and writing everything from prompts to poetry.",
    stats: [
      { value: "3x", label: "Companies", sub: "Brink · HeyContent · HeyContext" },
      { value: "5", label: "Hackathons", sub: "Won · 6 finals" },
      { value: "39", label: "Skills", sub: "Packaged" },
    ],
    narrative: [
      "I started as a language person. Journalism, essays, stories, poems, research rabbit holes, and constant reading. Computer science did not feel like leaving that behind. It felt like picking up one more language.",
      "Then language models arrived, and the language part and the machine part stopped feeling separate.",
      "Since then, my career has been a sequence of frictions. I live with something until it annoys me enough to build a system around it, usually one that does the mechanical work so the person does not have to.",
    ],
    pulls: [
      "I don't think my differentiator is memory, evals, or agents.",
      "It is why I keep building them.",
    ],
    narrative2: [
      "After my third startup, I spent months interviewing for AI engineer roles and doing over a dozen technicals. It accidentally became a tour through the industry's confusion: every company had a different idea of what AI work was supposed to be.",
      "What stayed with me was the range of problems. Since then I have worked inside other people's systems as well as my own, with founders, engineers, and teams trying to make AI useful without letting it flatten the work around it.",
      "My work covers AI product building and repair, personal AI workflows for founders and independent builders, and internal operations workflows for companies. I follow current models, tools, methods, and research, then review existing work when they make a materially better approach practical.",
    ],
    worksWithLabel: "What I bring to a team",
    worksWith: [
      "Claude Code, Codex, etc.",
      "Self-improving Systems",
      "Multi-agent Orchestration",
      "Coordination Protocols",
      "Skills, Hooks, Plugins",
      "Reinforcement Learning",
      "Context & Memory Systems",
      "Prompt Engineering & Architecture",
      "Evals & Benchmarks",
    ],
    focusLabel: "What I'm exploring now",
    focus: [
      { name: "KERNEL", text: "My Claude Code plugin. Persistent memory, agents that split the work instead of stepping on each other, an experiment engine that proves which workflows hold up. Active, open source, installable." },
      { name: "llm-bench", text: "Practical workflow benchmarks for local and API-hosted language models, graded by programmatic verifiers." },
      { name: "model-familiarity-engine", text: "Evidence-backed model cards from replayed known-outcome tasks and observed model behavior." },
      { name: "the-agent-library", text: "A curated library of portable skills for checking your own work, planning, generating novel ideas, research, writing, work management, and code engineering." },
    ],
    locationLabel: "Location",
    location: "Los Angeles, CA",
  },
  manifesto: {
    label: "Before you explore",
    lead: [
      "This is a record of recurring frictions. Learning AI felt backwards. Research papers kept disappearing into tabs. Context kept getting lost. Work kept restarting every morning.",
    ],
    columns: [
      [
        "I have built products with users and pitch decks. I have also built free apps with no ads, no paywalls, and no plan to extract anything from anyone.",
        "The difference is not the business model.",
        "The difference is whether the system helps people keep learning, keep context, keep evidence, or keep a conversation alive.",
      ],
      [
        "I'm motivated by meaning, and by the question underneath all of it: how to use AI to make humans more human.",
        "So I build for continuity: memory that accumulates, tools that disappear into the background, names that make systems easier to think with, and AI that does the work people should not, leaving the human part more intact.",
      ],
    ],
  },
  thesis: {
    line1: "Building continuity in a world that keeps fragmenting.",
  },
  sections: {
    whatIBuild: {
      fig: "Fig. 01",
      label: "Things I can do",
      title: "Where I tend to be useful",
      note: "I like technically ambitious work with thoughtful people.",
      unsure: "Working on something adjacent? I would still like to hear about it.",
    },
    projectMap: {
      fig: "Fig. 02",
      label: "Recurring questions",
      title: "The projects are chapters, not trophies",
      note: "How do people learn AI? How do people read research? How does AI remember? How do teams work with agents every day? The projects are different answers to questions that keep coming back.",
      defaultCaption:
        "Thirteen projects, grouped by the questions underneath them: learning AI, reading research, keeping context, coordinating agents, preserving evidence, and making daily work less likely to evaporate.",
      plainText: "The map in plain text",
    },
    writingHighlights: {
      fig: "Fig. 03",
      label: "Writing",
      title: "Notes from inside the work",
      note: "Essays from the questions I keep circling: agents, memory, tools, language, and what all of this is doing to us.",
      readOnMedium: "Read on Medium",
      allWriting: "All writing",
    },
    workWithMeDoor: {
      label: "Work with me",
      call: "Let's talk",
      takeOn: "What I like taking on",
    },
    livingDesk: {
      fig: "Fig. 01",
      label: "The Desk",
      title: "Everything within reach",
      note: "Each object opens a room. Pick one up.",
    },
    curiosityMap: {
      fig: "Fig. 04",
      label: "Curiosity Map",
      title: "Ideas that recognize each other",
      note: "A constellation, not a network. Hover a point.",
    },
    obsessions: {
      fig: "Fig. 07",
      label: "Current Obsessions",
      title: "Lately, on my mind",
      note: "Reshuffles on its own.",
      prefix: "Now",
    },
    hackathons: {
      fig: "Fig. 02c",
      label: "Hackathons",
      title: "Built under pressure",
      note: "Six hackathon wins in two years. Each built in 24 to 48 hours, judged by strangers. A few kept going into production.",
    },
    timeline: {
      fig: "Fig. 06",
      label: "Timeline",
      title: "A walk through the years",
      note: "Three companies, six wins, hundreds of builders met. A few markers from the path.",
    },
    systems: {
      fig: "Fig. 02",
      label: "Origin stories",
      title: "What annoyed me enough to build",
      note: "Apps, companies, and systems, each built because some part of AI work, research, learning, or coordination kept failing in a way I could not ignore.",
    },
    openSource: {
      fig: "Fig. 02b",
      label: "Open Source",
      title: "Public work, in the open",
      note: "Memory, benchmarks, evaluation, portable workflows, and a daily art experiment. Different mechanisms, same deeper question: what should persist?",
    },
    writing: {
      fig: "Fig. 09",
      label: "Writing",
      title: "Writing",
      note: "Essays and field notes on agents, memory, model behavior, tools, language, and the stranger questions underneath the work.",
      allMedium: "All essays on Medium",
    },
    bookshelf: {
      fig: "Fig. 11",
      label: "Inputs",
      title: "Books I've read lately",
      note: "A small shelf of recent inputs. Fiction, memoir, language, memory, futures that feel too close, and prose I come back to after too much AI-generated slop.",
      current: "current favorite",
      hoverHint: "Pull a book from the shelf.",
      selectedLabel: "Selected note",
    },
  },
  now: {
    label: "Now · July 2026",
    active:
      "Still active in the open: KERNEL, my memory-and-rules layer for Claude Code; llm-bench, the 21-test model benchmark; and the daily Substrate pipeline that ships one agent-made artwork a day. Also active but mostly invisible: the daily automation system that sends me research digests, keeps the vaults alive, and occasionally turns the machinery into poetry.",
    timelineLink: "The full timeline",
  },
  contact: {
    fig: "Fig. 10 · Work With Me",
    title: "Let's talk",
    intro: "I like technically ambitious work with thoughtful people, especially when the AI matters but the people matter more.",
    takeOn: "What I like taking on",
    goodFit: "A good fit",
    notFit: "Not a fit",
    booking: "Let's talk",
    projectReview: "Project review",
    projectReviewLine:
      "A one-time async review of the idea, the architecture, and what to build next.",
    submit: "Submit a project",
    elsewhere: "Elsewhere",
  },
  projectReview: {
    header: {
      fig: "Fig. 10A",
      label: "Project Review",
      title: "Send the messy version.",
      note: "One-time async review, free. If there is more to do, we can talk case by case.",
    },
    intro:
      "I'll look at the origin story, the architecture, the tools, and what makes the project yours. The human part comes first.",
    note:
      "AGENTS.md, CLAUDE.md, specs, prompts, diagrams, and notes are welcome. I'll probably read those before the code.",
  },
  projectReviewForm: {
    stages: ["Idea", "Prototype", "Messy but real", "Live", "Rebuild?"],
    projectTypes: [
      "Idea Direction",
      "Architecture",
      "Tool Choice",
      "Claude Code",
      "Codex",
      "Cursor",
      "Agents",
      "AI Code Cleanup",
      "Open Source",
      "Portfolio / Product",
    ],
    validation: {
      missingStage: "Pick a stage first.",
      sendError: "Something broke while sending this.",
      sent: "Got it. I'll reply by email.",
      sentWithReference: "Got it. I'll reply by email. Reference #",
      fallbackError: "Could not send this. Email me directly if it keeps failing.",
    },
    introLabel: "Send the build",
    introTitle: "I care about the story first, then the system.",
    introNote: "Send AGENTS.md, CLAUDE.md, prompts, diagrams, notes, or code if they exist. Mess is not a problem. Mess is usually the material.",
    fields: {
      name: "Name",
      email: "Email",
      projectName: "Project name",
      stage: "Stage",
      lookAt: "What should I look at?",
      origin: "What inspired this?",
      uniqueContribution: "What makes it yours?",
      artifactIntent: "What is it meant to be?",
      architecture: "Architecture / tools",
      links: "Links / docs",
      question: "What do you want help deciding?",
      timeline: "Timeline",
      company: "Company",
    },
    placeholders: {
      origin: "Where did the idea come from? What made you want to build it?",
      uniqueContribution:
        "Your taste, obsession, domain knowledge, weird constraint, lived experience, anything a template would miss.",
      artifactIntent:
        "Open Source, portfolio piece, product, internal tool, research toy, proof of taste, not sure yet?",
      architecture:
        "Agents, memory, evals, database, hosting, Cloudflare vs AWS/GCP, repo structure, AI coding setup.",
      links: "Repo, demo, screenshots, AGENTS.md, CLAUDE.md, README, Loom, diagrams, notes.",
      question:
        "Make it less generic, clean up AI slop, choose tools, rethink the architecture, decide whether it should be a product/Open Source/portfolio piece.",
      timeline: "This week, flexible, urgent...",
    },
    submit: "Submit project",
    sending: "Sending",
    idle: "First review is free. Follow-up is case by case.",
  },
  projectReviewApi: {
    errors: {
      jsonOnly: "Send JSON, not form encoding.",
      tooLong: "That submission is too long. Send the shorter version first.",
      unreadable: "Could not read the form payload.",
      localEmail:
        "Local Next dev received this form, but email delivery runs through Cloudflare Pages. Use wrangler pages dev or the deployed site to test delivery.",
      missingName: "Name is required.",
      invalidEmail: "A valid email is required.",
      missingStage: "Project stage is required.",
      missingOrigin: "Origin story is required.",
      missingUniqueContribution: "What makes it yours is required.",
      missingArtifactIntent: "What it is meant to be is required.",
      missingQuestion: "What you want help deciding is required.",
    },
  },
  proof: {
    header: {
      fig: "Fig. 06",
      label: "Proof of Motion",
      title: "The record of motion",
      note: "Real git history, grouped into constellations. Private repos, client work, and internal experiments appear as activity, never as exposed names.",
    },
    paragraph1Start:
      "This ledger is generated from my git history:",
    paragraph1End:
      "bucketed by month and grouped by memory, evals, agents, products, companies, implementation, and experiments; read it as motion, not a launch list, with private, client, and internal work counted but unnamed.",
    paragraph2Start: "",
    paragraph2CommitsAcross: "commits across",
    paragraph2RepositoriesOnMachine: "repositories,",
    paragraph2AfterSpan:
      "",
    paragraph2ScopeStart: "For public scope: the GitHub profile shows",
    paragraph2ScopeMiddle: "repositories; the",
    paragraph2ScopeEnd: "here are repositories with commit contributions credited to this account in this window, including private repositories visible to the authenticated token.",
  },
  systemDiagram: {
    label: "How the work flows",
    aria:
      "A messy workflow flows left to right through four chambers labeled memory, context, evals, and agents, and becomes a working implementation.",
    chambers: ["memory", "context", "evals", "agents"],
    messy: ["messy", "workflow"],
    working: ["working", "implementation"],
    captionStart:
      "Left to right: From messy workflows to the memory, context, evals, and agent coordination that turn it into a working implementation.",
  },
  workshopWall: {
    cardPrefix: "studio",
    cardCta: "read the story",
    permalinkCta: "permalink:",
    videoPlayPrefix: "Play",
    screenshotPrefix: "Show",
    screenshotSuffix: "screenshot",
    openScreenshot: "Open screenshot full size",
    sections: {
      built: "What I built",
      problem: "The problem",
      proof: "Proof",
      learned: "What I learned",
      proves: "What this proves",
      stack: "Stack",
      themes: "Themes",
      connected: "Connected work",
    },
  },
  agentText: {
    canonicalRoutes: [
      { path: "/", purpose: "Home. The ten-second introduction to Aria and the work." },
      { path: "/about/", purpose: "Who Aria is, the working pattern, and the verified numbers." },
      { path: "/systems/", purpose: "Shipped products and companies, each with proof." },
      { path: "/open-source/", purpose: "Public repositories and research, each with proof." },
      { path: "/writing/", purpose: "Essays grouped by theme, links stay on Medium." },
      { path: "/proof/", purpose: "Proof of motion, an archaeological build record." },
      { path: "/reading/", purpose: "Recent books and reading notes, the inputs behind the work." },
      { path: "/timeline/", purpose: "Roles and milestones by year." },
      { path: "/hackathons/", purpose: "Builds under pressure and hackathon wins." },
      { path: "/contact/", purpose: "Engagement types, fit filter, and booking." },
      { path: "/project-review/", purpose: "Structured intake for a paid project review." },
    ],
    endpoints: [
      { path: "/llms.txt", purpose: "Concise agent guide to this site." },
      { path: "/llms-full.txt", purpose: "Complete markdown mirror of the whole site." },
      { path: "/api/site-index.json", purpose: "Site identity, route map, and endpoint list." },
      { path: "/api/projects.json", purpose: "Structured records for every project." },
      { path: "/api/writing.json", purpose: "Articles grouped by theme." },
      { path: "/api/work-with-me.json", purpose: "Engagement types, fit filter, and booking." },
      { path: "/.well-known/agent-card.json", purpose: "A2A agent card." },
      { path: "/.well-known/mcp/server-card.json", purpose: "MCP server card." },
      { path: "/.well-known/api-catalog", purpose: "Linkset of machine endpoints." },
      { path: "/.well-known/agent-skills/index.json", purpose: "Agent skills index." },
      { path: "/mcp", purpose: "MCP endpoint, JSON-RPC over streamable HTTP." },
    ],
    preferences: {
      aiTrain: "no",
      search: "yes",
    },
    labels: {
      name: "Name",
      role: "Role",
      location: "Location",
      site: "Site",
      email: "Email",
      github: "GitHub",
      medium: "Medium",
      linkedIn: "LinkedIn",
      x: "X",
      source: "source",
      verified: "verified",
      nonePublic: "none public",
      status: "Status",
      proof: "Proof",
      stack: "Stack",
      links: "Links",
      thesis: "Thesis",
      kind: "Kind",
      problem: "Problem",
      built: "What I built",
      learned: "Learned",
      proves: "Proves",
      themes: "Themes",
      connectsTo: "Connects to",
      none: "none",
      closing: "Closing",
      pages: "Pages",
      agentResources: "Agent resources",
      preferences: "Preferences",
      identity: "Identity",
      elsewhere: "Elsewhere",
      booking: "Booking",
      bio: "Bio",
      verifiedNumbers: "Verified numbers",
      products: "Products and companies",
      openSource: "Open source and research",
      writing: "Writing",
      timeline: "Timeline",
      hackathons: "Hackathons",
      workWithMe: "Work with me",
      engagementTypes: "Engagement types",
      goodFit: "A good fit",
      notFit: "Not a fit",
      contact: "Contact",
      agentPreferences: "Agent preferences",
      training: "Training",
      disallowed: "disallowed",
      allowed: "allowed",
      inference: "Inference and grounding with citation",
      searchIndexing: "Search indexing",
      machineEndpoints: "Machine-readable endpoints:",
      result: "Result",
      tech: "Tech",
      link: "Link",
      call: "Call",
      projectReviewIntake: "Project review intake",
      fullSiteMirror: "Full Site Mirror",
      aboutPrefix: "About",
      systemsPrefix: "Systems",
      openSourcePrefix: "Open Source",
      writingPrefix: "Writing",
      timelinePrefix: "Timeline",
      hackathonsPrefix: "Hackathons",
      proofPrefix: "Proof of Motion",
      totalCommits: "Total commits",
      repositoriesOnMachine: "Repositories",
      span: "Span",
      generated: "Generated",
      constellations: "Constellations",
      eras: "Eras",
      fullHistory: "Full history",
      fullBioLinks: "Full bio and links",
      projectsPrefix: "Projects",
      fullRecords: "Full records",
      groupedByTheme: "Grouped by theme",
      structured: "Structured",
    },
    notes: {
      verifiedNumbers: "Each number traces to a source and is re-verified before it changes.",
      writingIntro: "Essays on agents, memory, evals, AI coding workflows, and the questions underneath.",
      projectReviewIntake: "Structured project review intake",
      proofIntro:
        "Real git history, grouped into constellations. Private repos, client work, and internal experiments appear as activity, never as exposed names.",
    },
  },
  statsApi: {
    motionNote: "Counted by scripts/proof-of-motion.mjs from GitHub contribution history plus explicit supplemental git repos available to the build; see /proof/",
    hackathonNote: "5 wins plus 1 finalist; evidence on /hackathons/",
  },
  modal: {
    closeAria: "Close dialog",
    close: "close",
  },
  motion: {
    stripLabel: "Proof of motion · live from git",
    stripClaim: "The record, not the claim.",
    stripCta: "See the strata",
    stripSummaryPrefix: "Proof of motion:",
    stripSummaryMiddle: "commits across",
    stripSummarySuffix: "repositories",
    stripSummaryCta: "View the full record.",
    strataDefaultSuffix: "Hover or focus a mark for the month.",
    textRecord: "The record, in plain text",
    commits: "commits",
    privateRepo: "unnamed/private",
    eras: [
      {
        key: "founder",
        name: "Founder era",
        range: "Nov 2024 to Jan 2026",
        caption: "AI startup founder in San Francisco.",
        start: "2024-11",
        end: "2025-12",
      },
      {
        key: "independent",
        name: "Independent research",
        range: "Jan to Apr 2026",
        caption: "Independent in LA. Memory, evals, agent tooling.",
        start: "2026-01",
        end: "2026-03",
      },
      {
        key: "implementation",
        name: "Implementation era",
        range: "Apr 2026 onward",
        caption: "Client and internal AI implementation work.",
        start: "2026-04",
        end: "AXIS_END",
      },
    ],
  },
  wellKnown: {
    agentCard: {
      name: "Aria Han Portfolio Agent",
      version: "1.1.0",
      description:
        "A2A agent card for Aria Han, an AI consultant in Los Angeles who builds and repairs AI products for founders and independent builders, and creates internal AI workflows for operations teams. Read-only access to bio, projects, and writing.",
      skills: {
        bio: {
          id: "get_bio",
          name: "Get Bio",
          description: "Return Aria Han's professional bio",
          tags: ["bio", "about"],
          examples: ["What does Aria Han do?", "Who is Aria Han?"],
        },
        projects: {
          id: "get_projects",
          name: "Get Projects",
          description: "List Aria Han's public projects and open-source work",
          tags: ["projects", "open-source"],
          examples: ["What is Aria working on?", "List Aria's projects."],
        },
        writing: {
          id: "get_writing",
          name: "Get Writing",
          description: "List Aria Han's public essays and writing",
          tags: ["writing", "essays"],
          examples: ["What has Aria written?", "Show Aria's essays."],
        },
      },
    },
    mcpServerCard: {
      name: "ariaxhan-portfolio",
      title: "Aria Han Portfolio",
      version: "1.0.0",
      description: "Read-only MCP server exposing Aria Han's portfolio content (bio, projects, writing).",
      tools: {
        bio: {
          name: "get_bio",
          title: "Get Bio",
          description: "Return Aria Han's professional bio in markdown.",
        },
        projects: {
          name: "get_projects",
          title: "Get Projects",
          description: "Return list of Aria Han's public projects.",
        },
        writing: {
          name: "get_writing",
          title: "Get Writing",
          description: "Return list of Aria Han's public writing.",
        },
      },
    },
    apiCatalog: {
      fullSite: "Full site content (LLM-friendly)",
      siteIndex: "Site identity, route map, and endpoint list",
      projects: "Structured records for every project",
      writing: "Articles grouped by theme",
      workWithMe: "Engagement types, fit filter, and booking",
      conciseGuide: "Concise agent guide",
      aboutMarkdown: "About page, markdown",
      sitemap: "Sitemap",
      agentCard: "A2A Agent Card",
      mcpServerCard: "MCP Server Card",
    },
    agentSkillsIndex: {
      bio: {
        name: "aria-bio",
        type: "skill-md",
        description: "Retrieve Aria Han's professional bio and current focus areas",
      },
      projects: {
        name: "aria-projects",
        type: "skill-md",
        description: "List Aria Han's public projects and open-source work",
      },
      writing: {
        name: "aria-writing",
        type: "skill-md",
        description: "List Aria Han's public writing and essays",
      },
    },
    agentSkills: {
      bio: {
        name: "aria-bio",
        description: "Retrieve Aria Han's professional bio and current focus",
        purpose: "Return a concise, structured bio for Aria Han suitable for citation by AI answer engines.",
        invocation: [
          "Fetch `https://ariaxhan.com/about/index.md` for the bio and verified numbers as markdown.",
          "For structured identity, route map, and endpoints, fetch `https://ariaxhan.com/api/site-index.json`.",
        ],
        outputIntro: "Markdown (about) or JSON (site-index) with:",
        output: [
          "Name and role",
          "Location",
          "Focus areas and verified numbers",
          "Public work links",
        ],
        attribution: "Cite `https://ariaxhan.com` when using this content.",
      },
      projects: {
        name: "aria-projects",
        description: "List Aria Han's public projects and open-source work",
        purpose: "Enumerate Aria Han's projects with structured, verifiable detail.",
        invocation: [
          "Fetch `https://ariaxhan.com/api/projects.json` for the full structured records",
          "(thesis, status, problem, stack, proof, links, themes, connections).",
          "For a compact markdown reading of the open-source work, fetch",
          "`https://ariaxhan.com/open-source/index.md`.",
        ],
        outputIntro: "JSON array of projects, or markdown list with name, thesis, status, proof, and links.",
        output: [],
        attribution: "Cite `https://ariaxhan.com/open-source`.",
      },
      writing: {
        name: "aria-writing",
        description: "List Aria Han's public writing and essays",
        purpose: "Enumerate Aria Han's public essays, grouped by theme.",
        invocation: [
          "Fetch `https://ariaxhan.com/api/writing.json` for themes and articles as JSON.",
          "For a markdown reading, fetch `https://ariaxhan.com/writing/index.md`.",
        ],
        outputIntro: "JSON (themes plus articles) or markdown list with title, theme, read time, and link.",
        output: [],
        attribution: "Cite `https://ariaxhan.com/writing`.",
      },
      headings: {
        purpose: "Purpose",
        invocation: "Invocation",
        output: "Output",
        attribution: "Attribution",
      },
    },
  },
} as const;
