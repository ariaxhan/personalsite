// Language-neutral facts: links, names, dates, tech. Copy lives in en.ts and ko.ts.
import motion from '../../../app/utils/motionData.json';

export const SITE = 'https://ariaxhan.com';
export const EMAIL = 'ariaxhan@gmail.com';
export const BOOKING = 'https://cal.com/aria-han/15min';
export const MEDIUM = 'https://medium.com/@ariaxhan';
export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ariahan/' },
  { label: 'GitHub', href: 'https://github.com/ariaxhan' },
  { label: 'Medium', href: MEDIUM },
];

/** The eight case studies, in reading order. Each one's "next" is the following entry. */
export const caseSlugs = [
  'heycontext',
  'kernel',
  'modelmind',
  'thinking-brain-school',
  'teaching-mcp-server',
  'llm-bench',
  'model-familiarity-engine',
  'brink-mind',
] as const;
export type CaseSlug = (typeof caseSlugs)[number];

export const caseLinks: Record<CaseSlug, { label: string; href: string } | null> = {
  heycontext: null,
  kernel: { label: 'GitHub', href: 'https://github.com/ariaxhan/kernel-claude' },
  modelmind: { label: 'model-mind.org', href: 'https://model-mind.org' },
  'thinking-brain-school': null,
  'teaching-mcp-server': null,
  'llm-bench': { label: 'GitHub', href: 'https://github.com/ariaxhan/llm-bench' },
  'model-familiarity-engine': { label: 'GitHub', href: 'https://github.com/ariaxhan/model-familiarity-engine' },
  'brink-mind': null,
};

export type ProjectGroup = 'systems' | 'products' | 'companies';
export interface Project {
  name: string;
  group: ProjectGroup;
  live?: boolean;
  caseSlug?: CaseSlug;
  links: { label: string; href: string }[];
}

/** Every project, one index. Copy for each is keyed by name in the locale file. */
export const projects: Project[] = [
  { name: 'Teaching MCP server', group: 'systems', caseSlug: 'teaching-mcp-server', links: [] },
  { name: 'KERNEL', group: 'systems', caseSlug: 'kernel', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/kernel-claude' }, { label: 'HOL Registry', href: 'https://hol.org/registry/plugins/aria-han/kernel' }] },
  { name: 'llm-bench', group: 'systems', caseSlug: 'llm-bench', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/llm-bench' }] },
  { name: 'model-familiarity-engine', group: 'systems', caseSlug: 'model-familiarity-engine', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/model-familiarity-engine' }] },
  { name: 'Nexus Office', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/nexus-office' }] },
  { name: 'the-agent-library', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/the-agent-library' }] },
  { name: 'metabrain', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/metabrain' }, { label: 'PyPI', href: 'https://pypi.org/project/metabrain/' }] },
  { name: 'agentmailkit', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/agentmailkit' }, { label: 'PyPI', href: 'https://pypi.org/project/agentmailkit/' }] },
  { name: 'latent-diagnostics', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/latent-diagnostics' }] },
  { name: 'site-spec', group: 'systems', links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/site-spec' }] },
  { name: 'renderstate', group: 'systems', links: [{ label: 'npm', href: 'https://www.npmjs.com/package/renderstate' }] },
  { name: 'Substrate', group: 'systems', live: true, links: [{ label: 'Gallery', href: 'https://nexus-substrate.pages.dev' }, { label: 'GitHub', href: 'https://github.com/ariaxhan/substrate' }] },
  { name: 'ModelMind', group: 'products', live: true, caseSlug: 'modelmind', links: [{ label: 'model-mind.org', href: 'https://model-mind.org' }, { label: 'App Store', href: 'https://apps.apple.com/us/app/modelmind/id6761348536' }] },
  { name: 'Paper Rooms', group: 'products', live: true, links: [{ label: 'paper-rooms.com', href: 'https://paper-rooms.com' }, { label: 'App Store', href: 'https://apps.apple.com/us/app/paper-rooms/id6780741814' }] },
  { name: 'Civic Forges', group: 'products', live: true, links: [{ label: 'App Store', href: 'https://apps.apple.com/us/app/civic-forges/id6805645016' }, { label: 'Play online', href: 'https://civicforges.com/play' }] },
  { name: 'our4cuts', group: 'products', live: true, links: [{ label: 'our4cuts.com', href: 'https://our4cuts.com' }] },
  { name: 'Not Recommended', group: 'products', live: true, links: [{ label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/not-recommended/hpgdmjphjmohhblolojdcpmcbeangnfh' }, { label: 'GitHub', href: 'https://github.com/ariaxhan/not-recommended' }] },
  { name: 'Hearth', group: 'products', links: [] },
  { name: 'HeyContext', group: 'companies', caseSlug: 'heycontext', links: [] },
  { name: 'HeyContent', group: 'companies', links: [] },
  { name: 'Brink Mind', group: 'companies', caseSlug: 'brink-mind', links: [] },
];

export const hackathons = [
  { name: 'Darwin', year: '2025', win: true, tech: ['AWS Bedrock', 'Semgrep', 'AI Evolution', 'Security'], link: { label: 'DevPost', href: 'https://devpost.com/software/darwin-cmfysv' } },
  { name: 'Armature', year: '2025', win: true, tech: ['BrowserBase + Stagehand', 'Google ADK', 'Tavily', 'AG-UI', 'Daytona', 'W&B Weave', 'Coreweave RL'], link: { label: 'DevPost', href: 'https://devpost.com/software/the-convergence' } },
  { name: 'Content Creator Connector', year: '2025', win: true, tech: ['Gemini', 'Agno', 'Weave', 'Wordware'], link: { label: 'DevPost', href: 'https://devpost.com/software/content-creator-connector' } },
  { name: 'TheraVoice', year: '2024', win: true, tech: ['aiXplain', 'AI/ML API'], link: { label: 'DevPost', href: 'https://devpost.com/software/draft_name' } },
  { name: 'HotAgents', year: '2024', win: true, tech: ['Wordware', 'AgentOps', 'Electron'], link: { label: 'GitHub', href: 'https://github.com/ariaxhan/hotagents' } },
  { name: 'Freetime', year: '2024', win: false, tech: ['Groq', 'Supabase', 'CrewAI', 'JigsawStack'], link: { label: 'GitHub', href: 'https://github.com/ariaxhan/freetime' } },
];

export const writing = [
  { href: 'https://medium.com/@ariaxhan/stop-writing-markdown-start-writing-memory-e4a69c57caa9', title: 'Stop Writing Markdown. Start Writing Memory.' },
  { href: 'https://medium.com/@ariaxhan/claude-vs-gpt-vs-gemini-youre-benchmarking-the-wrong-thing-762c7e9cca5d', title: "Claude vs. GPT vs. Gemini: You're Benchmarking the Wrong Thing" },
  { href: 'https://medium.com/@ariaxhan/how-i-stopped-debugging-ai-generated-code-1be33241b3c8', title: "I Stopped Debugging Claude's Code and Started Debugging My Prompts Instead" },
  { href: 'https://medium.com/@ariaxhan/grok-bot-cursors-bet-on-multi-agent-ai-77d69ba8b290', title: "Grok Bot: Cursor's Bet on Multi-Agent AI" },
];
export const books = [
  { title: 'The Nanotech Succession', author: 'Linda Nagata' },
  { title: 'This Is How You Lose the Time War', author: 'Amal El-Mohtar & Max Gladstone' },
  { title: 'The Fall of Princes', author: 'Robert Goolrick' },
  { title: 'Down the Drain', author: 'Julia Fox' },
  { title: 'Before the Coffee Gets Cold', author: 'Toshikazu Kawaguchi' },
  { title: 'Babel, or the Necessity of Violence', author: 'R. F. Kuang' },
];
export const NOVEL = { title: 'The Correction', href: 'https://www.amazon.com/dp/B0HKVKNBL9' };

export const motionStats = {
  commits: motion.grandTotal,
  repos: motion.repoCount,
  generated: motion.generated,
};
export const liveCount = projects.filter((p) => p.live).length;
