// ============================================================================
// STUDIO DATA
// One source of truth for the rooms of the studio. Design-authored collections
// (books, obsessions, curiosity map) sit alongside the
// real content carried over from the previous site (articles, timeline,
// hackathons, open-source repos, contact). No em dashes anywhere, by house rule.
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
    label: "05 · Writing",
    caption: "Essays and field notes",
    href: "/writing",
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
    title: "The Art of Memory",
    author: "Frances Yates",
    color: "#56695a",
    current: true,
    why: "Memory palaces are the original spatial computing. I keep returning to how the ancients turned rooms into databases.",
    note: "The loci method is just an addressing scheme. metabrain is a memory palace with SQL.",
  },
  {
    title: "The Glass Bead Game",
    author: "Hermann Hesse",
    color: "#485a4d",
    current: true,
    why: "A game that connects every discipline into a single notation. The fantasy that quietly started this whole studio.",
    note: "Reads like a premonition. I'm somewhere in the middle and slowing down on purpose.",
  },
  {
    title: "Seeing Like a State",
    author: "James C. Scott",
    color: "#6f8696",
    why: "How systems make the world legible, and what they flatten to do it.",
    note: "Every schema is a small act of violence against nuance. Design accordingly.",
  },
  {
    title: "The Timeless Way of Building",
    author: "Christopher Alexander",
    color: "#b56a4f",
    why: "Alexander believed buildings could be alive. I suspect software can be too.",
    note: "The quality without a name. Still chasing it.",
  },
  {
    title: "Metaphors We Live By",
    author: "Lakoff & Johnson",
    color: "#b08a4c",
    why: "Proof that language isn't decoration on thought, it's the structure of it.",
    note: "Argument is war. Time is money. What metaphors are hiding in my code?",
  },
  {
    title: "SPQR",
    author: "Mary Beard",
    color: "#8a4b3a",
    why: "Rome ran a continent on roads, records, and grain. Infrastructure as empire.",
    note: "The grain supply was the real emperor.",
  },
  {
    title: "Godel, Escher, Bach",
    author: "Douglas Hofstadter",
    color: "#3a3a40",
    why: "The book that made recursion feel like music.",
    note: "Strange loops everywhere. An agent that watches itself is one.",
  },
  {
    title: "The Information",
    author: "James Gleick",
    color: "#5d7a86",
    why: "From talking drums to bits, the long history of encoding meaning.",
    note: "The bit was always there. We just learned to name it.",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    color: "#9c7b46",
    why: "A vocabulary of small, reusable patterns. The original component library.",
    note: "Pattern 159: light on two sides of every room.",
  },
  {
    title: "Understanding Media",
    author: "Marshall McLuhan",
    color: "#6a6470",
    why: "The medium shapes us more than the message does.",
    note: "Ambient AI is a new medium. What will it make us into?",
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
// WRITING, articles on Medium (Writing room)
// ---------------------------------------------------------------------------
export interface Article {
  title: string;
  excerpt: string;
  category: string;
  read: string;
  href: string;
}

export const articles: Article[] = [
  { title: "How to Secure API Keys for AI Agents", excerpt: "When the AI asks you for a key, that's the exact moment to stop. The most dangerous habit in AI coding, and what to do instead.", category: "Agents", read: "12 min", href: "https://medium.com/@ariaxhan/how-to-secure-api-keys-for-ai-agents-ca773a66bd84" },
  { title: "Opus 4.8 vs 4.7 vs Sonnet vs Haiku: When the Expensive Model Is Worth It", excerpt: "A new model dropped with impressive numbers. The only question that matters: will you feel any difference in the work you actually do?", category: "Systems", read: "12 min", href: "https://medium.com/@ariaxhan/opus-4-8-vs-4-7-vs-sonnet-vs-haiku-when-the-expensive-model-is-worth-it-44892a75d5c5" },
  { title: "What an AI Detector Actually Measures", excerpt: "AI detectors promise to tell you if a machine wrote something. What they actually measure is much narrower, and shakier.", category: "Philosophy", read: "6 min", href: "https://medium.com/@ariaxhan/what-an-ai-detector-actually-measures-86b452979a5a" },
  { title: "Stop Copying Other People's AI Setups. Build One That's Actually Yours.", excerpt: "Borrowed AI workflows aren't accountable to your work. Build one that's tested against your own evidence.", category: "Systems", read: "10 min", href: "https://medium.com/@ariaxhan/stop-copying-other-peoples-ai-setups-build-one-that-s-actually-yours-e1a05ebabc2a" },
  { title: "How to Make Claude Code Actually Work", excerpt: "The most capable AI coding tool available. Also completely chaotic.", category: "Systems", read: "12 min", href: "https://medium.com/@ariaxhan/how-to-make-claude-code-actually-work-structure-memory-and-multi-agent-workflows-6d32b1d815d2" },
  { title: "Engineering the Soul", excerpt: "We ask engineers to explain the ghost in the machine. The novelists have been documenting it for years.", category: "Philosophy", read: "6 min", href: "https://medium.com/@ariaxhan/engineering-the-soul-49428c073c4e" },
  { title: "The Agent-Ready Web: A Working Guide to Cloudflare's New Score", excerpt: "I pointed Cloudflare's new agent-readiness scanner at my own site. Zero of thirteen.", category: "Systems", read: "12 min", href: "https://medium.com/@ariaxhan/the-agent-ready-web-a-working-guide-to-cloudflares-new-score-1ed0fce8d760" },
  { title: "Stop Writing Markdown. Start Writing Memory.", excerpt: "Markdown is optimized for human eyes. Terrible for knowledge agents need to query.", category: "Systems", read: "6 min", href: "https://medium.com/@ariaxhan/stop-writing-markdown-start-writing-memory-e4a69c57caa9" },
  { title: "I Put ChatGPT in Charge of Claude Code", excerpt: "What happens when you use one model to orchestrate another?", category: "Agents", read: "5 min", href: "https://medium.com/@ariaxhan/i-put-chatgpt-in-charge-of-claude-code-7b9bf5bb8ea9" },
  { title: "I Tested OpenAI's New Codex Desktop App", excerpt: "OpenAI shipped a genuinely novel interface. Then the model opened its mouth.", category: "Philosophy", read: "5 min", href: "https://medium.com/@ariaxhan/i-tested-openais-new-codex-desktop-app-the-ui-is-the-real-product-c2c59bdcb5f6" },
  { title: "Automations with Claude Code", excerpt: "A pattern for proactive AI on your own machine.", category: "Systems", read: "4 min", href: "https://medium.com/@ariaxhan/automations-with-claude-code-personalized-proactive-emails-and-code-poetry-from-local-context-3a7e93bf5a3d" },
  { title: "KERNEL: Self-Evolving Claude Code Configuration", excerpt: "How I stopped fighting my config and let it learn instead.", category: "Systems", read: "6 min", href: "https://medium.com/@ariaxhan/kernel-the-ultimate-self-evolving-claude-code-and-cursor-configuration-system-a3ddeb7f4d32" },
  { title: "From Friction to Flow: Building a Command Library", excerpt: "Commands as cognitive offloading. Stop remembering, start invoking.", category: "Systems", read: "5 min", href: "https://medium.com/@ariaxhan/from-friction-to-flow-building-a-command-library-for-claude-code-a9eb19f7dce2" },
  { title: "10 Things I Wish I Knew About AI Coding", excerpt: "Hard-won lessons from daily production use of AI coding tools.", category: "Philosophy", read: "5 min", href: "https://medium.com/@ariaxhan/10-things-i-wish-i-knew-when-i-started-using-ai-for-coding-887c26a6c1d1" },
  { title: "This AI Analyzes My Entire Life", excerpt: "The Synthesis Pool: a personal AI that costs $0/month to run.", category: "Agents", read: "6 min", href: "https://medium.com/@ariaxhan/the-synthesis-pool-0ce814fdfa5f" },
];

export const MEDIUM_PROFILE = "https://medium.com/@ariaxhan";

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
    title: "AI Implementation Specialist · Blink Build Studios",
    body: "Working with enterprises and founders to deploy, refine, and monitor agentic workflows and build distinctive AI products. The real question is what happens six months after you start putting AI to work in your company.",
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
    title: "Six Hackathon Wins",
    body: "Darwin (AWS). Armature (RL Track). Content Creator Connector. TheraVoice. HotAgents. Freetime. Each one built in 24 to 48 hours, validating ideas under pressure.",
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
// OPEN SOURCE, public work (Open Source room)
// ---------------------------------------------------------------------------
export interface Repo {
  name: string;
  url: string;
  description: string[];
  evidence: string;
  meta: Record<string, string>;
  accent: string;
}

export const repos: Repo[] = [
  {
    name: "the-agent-library",
    url: "https://github.com/ariaxhan/the-agent-library",
    description: [
      "The Agent Library is a curated set of portable skills for getting real work out of AI agents, built for Claude, Codex, and any agent that can load a skill file. Most of it isn't code-specific: checking your own work, planning, brainstorming, research, writing, shipping.",
      "Each skill is a standalone workflow with a clear trigger and a SKILL.md. Real, proven patterns that survived months of usage, constantly updated.",
    ],
    evidence: "The useful unit was never a prompt collection. It's a workflow you can copy, run, and trust.",
    meta: { status: "Active · 34 portable skills", stack: "Claude · Codex · Agent Skills", structure: "Category-first shelves", license: "MIT" },
    accent: "#56695a",
  },
  {
    name: "KERNEL",
    url: "https://github.com/ariaxhan/kernel-claude",
    description: [
      "KERNEL gives Claude memory, deterministic hooks, skills, and a way to prove which workflows actually work. Specialized agents, SQLite-DB-backed workflows, validation gates. Installs through Claude's plugin marketplace, mirrors into Cursor and Codex.",
    ],
    evidence: "Agents don't need more vibes. They need memory and rules that prove themselves.",
    meta: { status: "Active · Plugin marketplace", stack: "Claude Code · SQLite · Shell", methodology: "AgentDB · Contracts · Orchestration", stars: "11" },
    accent: "#b56a4f",
  },
  {
    name: "llm-bench",
    url: "https://github.com/ariaxhan/llm-bench",
    description: [
      "Vibes and leaderboard screenshots are not a benchmark.",
      "LLM-bench runs real workflow tasks: extraction, code, planted bugs, email drafting, prompt injection, each graded by a programmatic verifier. Works with ollama, Apple Intelligence, Claude CLI, Bedrock, any OpenAI-compatible endpoint.",
    ],
    evidence: "A benchmark only matters if the measuring stick is explicit enough to argue with.",
    meta: { status: "Active · Practical workflow benchmark", stack: "Python · Ollama · Bedrock · Claude CLI", scope: "Standard · Hard · Agentic · Adversarial · Messy", license: "MIT" },
    accent: "#6f8696",
  },
  {
    name: "model-familiarity-engine",
    url: "https://github.com/ariaxhan/model-familiarity-engine",
    description: [
      "Single shot benchmarks don't capture how LLMs are actually used. Onboards language models by simulating real user conversations, then builds evidence-backed model cards from observations instead of a ranking. All benchmarks are drawn from real conversation transcripts.",
      "The replay-bootstrap loop is shipped: known-outcome tasks, redaction, replay, model cards built from what was actually observed.",
    ],
    evidence: "The question was never which model is best. It's what this one has earned.",
    meta: { status: "Bootstrap Loop Shipped", stack: "Python · Bedrock · Ollama · Claude CLI", scope: "Replay · Redaction · Model Cards", license: "MIT" },
    accent: "#b08a4c",
  },
  {
    name: "metabrain",
    url: "https://github.com/ariaxhan/metabrain",
    description: [
      "Most memory tools remember. Almost none of them learn.",
      "Metabrain is a zero-dependency SQLite layer that closes the loop: patterns graduate into hypotheses, outcomes test them, and only what holds up becomes preference.",
    ],
    evidence: "Memory should prove itself before it gets promoted.",
    meta: { status: "Published · PyPI + GitHub", stack: "Python · SQLite · Zero-dependency", install: "pip install metabrain", license: "MIT" },
    accent: "#8a4b3a",
  },
  {
    name: "Substrate",
    url: "https://github.com/ariaxhan/substrate",
    description: [
      "What happens if you let an AI make art every day for a year?",
      "Substrate is a generative gallery where Claude Code agents create abstract, interactive computational art pieces through a fully automated daily workflow. 400+ pieces, each a single HTML file. No hands involved.",
    ],
    evidence: "This is what happens when agents get to make something, not just talk about it.",
    meta: { status: "Live · 400+ pieces", stack: "HTML · CSS · JavaScript · Cloudflare Pages", cadence: "Daily Agent Generation", constraint: "Self-contained · ~2KB average" },
    accent: "#5d7a86",
  },
  {
    name: "latent-diagnostics",
    url: "https://github.com/ariaxhan/latent-diagnostics",
    description: [
      "Can you see the shape of a thought inside a model?",
      "Latent-diagnostics measures attribution graph geometry instead of only grading answers. Task domains show real signatures after controlling for length. Hallucination detection did not survive the same test. The repo keeps the negative results in.",
    ],
    evidence: "Being right and computing something real aren't the same shape.",
    meta: { status: "Research · Negative Results Preserved", stack: "Python · SAEs · Attribution graphs", finding: "Grammar influence d=1.08 after length control", license: "MIT" },
    accent: "#6a6470",
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
