export type Group = 'Agent systems' | 'Memory and context' | 'Evals and verification' | 'Products';

export interface Project {
  name: string;
  line: string;
  proof: string;
  status: string;
  group: Group;
  links: { label: string; href: string }[];
  /** Homepage position and label. Absent means the project lives on /projects/ only. */
  featured?: { order: number; tag: string };
}

export const groups: Group[] = ['Agent systems', 'Memory and context', 'Evals and verification', 'Products'];

export const projects: Project[] = [
  {
    name: 'ModelMind',
    line: 'AI education felt backwards, so I built the course I wanted people to have first.',
    proof: 'Live on the App Store for iPhone, iPad, and Mac.',
    status: 'Live on the App Store',
    group: 'Products',
    links: [
      { label: 'model-mind.org', href: 'https://model-mind.org' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/modelmind/id6761348536' },
    ],
    featured: { order: 6, tag: 'Live product' },
  },
  {
    name: 'Paper Rooms',
    line: 'Safari tabs ate my research life, so I built a library.',
    proof: 'Built and shipped solo in under a week.',
    status: 'Live on the App Store',
    group: 'Products',
    links: [
      { label: 'paper-rooms.com', href: 'https://paper-rooms.com' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/paper-rooms/id6780741814' },
    ],
    featured: { order: 7, tag: 'Live product' },
  },
  {
    name: 'our4cuts',
    line: 'An iPad and a browser are all you need for a photo booth.',
    proof: 'Live and used at real events.',
    status: 'Live',
    group: 'Products',
    links: [{ label: 'our4cuts.com', href: 'https://our4cuts.com' }],
  },
  {
    name: 'Civic Forges',
    line: 'I wanted a city builder where running the city and living a life are the same game.',
    proof: 'On the App Store and playable in the browser, with persistent saves and 36 automated tests.',
    status: 'Live on the App Store',
    group: 'Products',
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/civic-forges/id6805645016' },
      { label: 'Play online', href: 'https://civicforges.com/play' },
      { label: 'civicforges.com', href: 'https://civicforges.com' },
    ],
  },
  {
    name: 'Not Recommended',
    line: 'YouTube should begin with a question, not an infinite feed.',
    proof: 'No accounts, analytics, ads, or remote executable code.',
    status: 'Live on the Chrome Web Store',
    group: 'Products',
    links: [
      { label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/not-recommended/hpgdmjphjmohhblolojdcpmcbeangnfh' },
      { label: 'GitHub', href: 'https://github.com/ariaxhan/not-recommended' },
    ],
  },
  {
    name: 'Hearth',
    line: 'The notch could be a quiet home for the context I keep reaching for.',
    proof: 'Runs locally on macOS, with deterministic tests for transcript parsing and conversation status.',
    status: 'Personal macOS tool',
    group: 'Memory and context',
    links: [],
  },
  {
    name: 'HeyContext',
    line: 'Context kept disappearing, so we built a workspace around memory.',
    proof: 'Went live with hundreds of users within a month, no ad spend.',
    status: 'Shipped to production, 2025 to 2026',
    group: 'Memory and context',
    links: [],
  },
  {
    name: 'HeyContent',
    line: 'Creators had context everywhere and nowhere, so we tried to bring it into one place.',
    proof: '5+ platforms integrated with real-time sync. The memory layer survived into the next company.',
    status: 'Integrated into HeyContext',
    group: 'Memory and context',
    links: [],
  },
  {
    name: 'Brink Mind',
    line: 'Mental health tools ignored the body, so Brink Mind brought heart data into the room.',
    proof: 'Reached TestFlight with working voice, biometrics, and on-device inference.',
    status: 'TestFlight, 2024 to 2025',
    group: 'Products',
    links: [],
  },
  {
    name: 'site-spec',
    line: 'A website can look finished while everything machines need is quietly broken.',
    proof: 'Live-URL and local audits, JSON output, CI-ready exit codes, deterministic site builds.',
    status: 'Active',
    group: 'Evals and verification',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/site-spec' }],
  },
  {
    name: 'Nexus Office',
    line: 'Agents that keep working without you need a place where you can see and answer them.',
    proof: 'Public MIT repo with live Mac and phone clients.',
    status: 'Active, MIT',
    group: 'Agent systems',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/nexus-office' }],
    featured: { order: 1, tag: 'Orchestration' },
  },
  {
    name: 'renderstate',
    line: 'A screen should be inspectable in every meaningful state before the whole app can run.',
    proof: 'Published on npm with multi-viewport capture.',
    status: 'Published on npm, MIT',
    group: 'Evals and verification',
    links: [{ label: 'npm', href: 'https://www.npmjs.com/package/renderstate' }],
    featured: { order: 8, tag: 'Verification' },
  },
  {
    name: 'KERNEL',
    line: 'Claude Code kept starting over, so I built memory, rules, and receipts around it.',
    proof: '360 commits since January 2026, on the Claude plugin marketplace.',
    status: 'Active, on the Claude plugin marketplace',
    group: 'Agent systems',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/kernel-claude' }],
    featured: { order: 2, tag: 'Architecture' },
  },
  {
    name: 'llm-bench',
    line: 'Leaderboards were not answering my questions, so I made tests that did.',
    proof: '21 tests, graded by programmatic verifiers.',
    status: 'Active',
    group: 'Evals and verification',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/llm-bench' }],
    featured: { order: 3, tag: 'Evals' },
  },
  {
    name: 'the-agent-library',
    line: 'Prompt collections kept rotting, so I turned repeated workflows into portable skills.',
    proof: '39 skills, each extracted from repeated real-world use.',
    status: 'Active, MIT',
    group: 'Agent systems',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/the-agent-library' }],
  },
  {
    name: 'model-familiarity-engine',
    line: 'I wanted to know what a model had earned across a working relationship, not where it ranked.',
    proof: 'Replay-bootstrap loop shipped: redaction, replay, observed model cards.',
    status: 'Bootstrap loop shipped',
    group: 'Evals and verification',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/model-familiarity-engine' }],
  },
  {
    name: 'metabrain',
    line: 'Memory gets noisy unless it has to prove itself.',
    proof: 'Published on PyPI. Zero dependencies by design.',
    status: 'Published on PyPI',
    group: 'Memory and context',
    links: [
      { label: 'GitHub', href: 'https://github.com/ariaxhan/metabrain' },
      { label: 'PyPI', href: 'https://pypi.org/project/metabrain/' },
    ],
    featured: { order: 4, tag: 'Memory' },
  },
  {
    name: 'agentmailkit',
    line: 'A scheduled email should look the same every day, even when a model writes the words.',
    proof: '36 offline, deterministic tests. Dry runs cannot send, enforced in code.',
    status: 'Published on PyPI, MIT',
    group: 'Agent systems',
    links: [
      { label: 'GitHub', href: 'https://github.com/ariaxhan/agentmailkit' },
      { label: 'PyPI', href: 'https://pypi.org/project/agentmailkit/' },
    ],
  },
  {
    name: 'Substrate',
    line: 'I wanted to see what an unattended creative pipeline would become if it kept going.',
    proof: '425 pieces and counting, generated daily without supervision.',
    status: 'Live',
    group: 'Agent systems',
    links: [
      { label: 'Gallery', href: 'https://nexus-substrate.pages.dev' },
      { label: 'GitHub', href: 'https://github.com/ariaxhan/substrate' },
    ],
  },
  {
    name: 'latent-diagnostics',
    line: 'Correct answers were not enough. I wanted to know whether the model computed something real.',
    proof: 'The failed hypothesis is documented next to the confirmed one.',
    status: 'Research, negative results preserved',
    group: 'Evals and verification',
    links: [{ label: 'GitHub', href: 'https://github.com/ariaxhan/latent-diagnostics' }],
    featured: { order: 5, tag: 'Research' },
  },
];

export const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured!.order - b.featured!.order);
