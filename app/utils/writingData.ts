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
];

export const MEDIUM_PROFILE = "https://medium.com/@ariaxhan";

export function articlesByTheme(theme: WritingTheme): Article[] {
  return articles.filter((a) => a.theme === theme);
}
