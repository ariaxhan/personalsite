// English case studies. ko-cases.ts mirrors this shape (typed as Cases).
import type { CaseSlug } from './data';

export interface CaseStudy {
  name: string;
  eyebrow: string;
  intro: string;
  details: { label: string; value: string }[];
  sections: { label: string; title: string; paragraphs: string[] }[];
  highlight: { title: string; body: string };
  flow: string[];
  note: string;
  videos?: { src: string; poster: string; label: string }[];
  gallery?: { src: string; alt: string }[];
}

export const enCases: Record<CaseSlug, CaseStudy> = {
  heycontext: {
    name: 'HeyContext',
    eyebrow: 'Product leadership / user research',
    intro: 'Owning product direction from user research to shipped AI tools.',
    details: [
      { label: 'Role', value: 'Founder & CEO' },
      { label: 'Team', value: 'UX research, design, engineering' },
      { label: 'Focus', value: 'Discovery, roadmap, delivery' },
      { label: 'Public outcome', value: 'Hundreds of early users' },
    ],
    sections: [
      { label: '01 / Problem', title: 'What we set out to solve', paragraphs: ['The products explored how people could work with AI using shared context, persistent memory, and collaborative interfaces rather than isolated chat sessions. As a founder, I was responsible for deciding which problems deserved product investment, not simply how to implement features.'] },
      { label: '02 / Discovery', title: 'Research shaped the product', paragraphs: ['I managed a team of UX researchers and interns who conducted the usability interviews and reported their findings to me. I then iterated on the designs with our design interns. Those findings informed product requirements and ongoing prioritization.', 'This was cross-functional product work: research, design, engineering, and the two cofounders needed a common view of what we were building and why.'] },
      { label: '03 / Leadership', title: 'From priorities to delivery', paragraphs: ['Across HeyContent and HeyContext, I managed teams of up to nine people. The work included regular one-on-ones, reviewing deliverables, coordinating researchers and engineers, and supporting five UX research interns as they moved into continuing roles.', 'I owned the product direction while staying close enough to implementation to understand technical tradeoffs and execution constraints.'] },
      { label: '04 / Outcome', title: 'What shipped and what I learned', paragraphs: ['HeyContext launched as a multi-agent workspace with shared context, cross-provider model routing, and collaborative artifacts. It reached hundreds of users in its first month without paid advertising.', 'The strongest lesson was operational: product direction is an ongoing series of decisions, not a strategy document written once and handed off.'] },
    ],
    highlight: { title: 'Hundreds of users in month one', body: 'HeyContext reached an early audience without paid advertising. This is adoption evidence, not a claim of retention or revenue.' },
    flow: ['Research', 'Prioritize', 'Design & build', 'Release', 'Learn'],
    note: 'This case study uses founder-reported experience and publicly described product scope. Detailed research findings and user-level data are intentionally omitted.',
    videos: [
      { src: '/studio/demo-heycontext.mp4', poster: '/studio/demo-heycontext-poster.jpg', label: 'HeyContext product demo' },
    ],
  },
  kernel: {
    name: 'KERNEL',
    eyebrow: 'Agent infrastructure / developer tools',
    intro: 'A developer-facing system for agent continuity, orchestration, and verification.',
    details: [
      { label: 'Role', value: 'Creator / maintainer' },
      { label: 'Audience', value: 'Agent-tooling developers' },
      { label: 'Focus', value: 'Memory, orchestration, evaluation' },
      { label: 'Evidence', value: 'Public GitHub repository' },
    ],
    sections: [
      { label: '01 / Problem', title: 'Agents lose the thread', paragraphs: ['An assistant can complete an individual step yet lose the intent, context, or verification state across a longer task. KERNEL emerged from that problem: the model alone is not the whole system.'] },
      { label: '02 / Product choice', title: 'Put continuity around the model', paragraphs: ['I built an orchestration layer around Claude Code, including persistent memory, agent coordination, rules and validation gates, and an experiment engine. The goal is to make long-running work more inspectable and less dependent on an individual conversation.'] },
      { label: '03 / Evaluation', title: 'Require evidence of improvement', paragraphs: ['An agent reporting success is not necessarily proof that the work succeeded. KERNEL records attempts and supports programmatic verification and experiment-driven evaluation of rules.', 'That makes it possible to investigate failures and distinguish changes to system behavior from merely more convincing text.'] },
      { label: '04 / Proof', title: 'Public, verified, and in daily use', paragraphs: ['15 GitHub stars and 86 releases. 27 skills. Listed on the HOL AI Plugin Registry with a Trust Score of 91, publisher and owner verified. KERNEL ships through its own GitHub-hosted marketplace, and my own agent fleet runs on it every day.', 'The public repository documents the design, source code, and development history. I would rather expose the system to scrutiny than claim universal agent reliability.'] },
    ],
    highlight: { title: 'A system, not a prompt', body: 'Memory, orchestration, evaluation, and verifiable outcomes are treated as product infrastructure rather than prompt-writing techniques.' },
    flow: ['Request', 'Context', 'Agents', 'Verify', 'Record'],
    note: 'Install from its own GitHub-hosted marketplace, ariaxhan/kernel-claude. This page does not imply validated task-success improvements beyond results published in the project itself.',
  },
  modelmind: {
    name: 'ModelMind',
    eyebrow: 'Consumer product / AI education',
    intro: 'Teaching how AI works, not just which prompts to use.',
    details: [
      { label: 'Role', value: 'Creator' },
      { label: 'Product', value: 'Published mobile learning app' },
      { label: 'Focus', value: 'Curriculum, interaction, accessibility' },
      { label: 'Experience', value: 'Offline-first lessons' },
    ],
    sections: [
      { label: '01 / Problem', title: 'Tools change. Mental models last.', paragraphs: ['A prompt tutorial can tell someone what to type today. It does not necessarily teach why a language model behaves as it does or what to do when it fails. I wanted to build a learning product around understanding rather than shortcuts.'] },
      { label: '02 / Product design', title: 'Make the learner reason', paragraphs: ['ModelMind organizes AI concepts into structured learning paths and bite-sized lessons. Interactive exercises ask learners to predict, compare, sort, sequence, and troubleshoot rather than only read explanations.', 'The curriculum connects foundational concepts with practical decisions about AI systems, including model limitations and failure modes.'] },
      { label: '03 / Implementation', title: 'Offline-first and approachable', paragraphs: ['The published app supports local practice and grading without requiring an AI-generated response for every exercise. That was a deliberate product approach: reproducible feedback and the ability to learn without an active connection.'] },
      { label: '04 / Outcome', title: 'A shipped learning product', paragraphs: ['ModelMind is live on the App Store for iPhone, iPad, and Mac and on Google Play for Android, and its curriculum can be inspected on the official website. It is evidence of bringing an idea through curriculum design, user experience, and product release, not a claim about learning outcomes that have not been measured.'] },
    ],
    highlight: { title: 'Live on the App Store and Google Play', body: 'Available for iPhone, iPad, Mac, and Android. Scope is documented on the public curriculum page, not proven educational impact.' },
    flow: ['Concept', 'Prediction', 'Exercise', 'Feedback', 'Review'],
    note: 'Feature descriptions follow the public ModelMind website; they may change as the product evolves.',
    gallery: [
      { src: '/studio/modelmind-1.jpg', alt: 'ModelMind app screen' },
      { src: '/studio/modelmind-3.jpg', alt: 'ModelMind app screen' },
      { src: '/studio/modelmind-2.jpg', alt: 'ModelMind app screen' },
      { src: '/studio/modelmind-4.jpg', alt: 'ModelMind app screen' },
    ],
  },
  'thinking-brain-school': {
    name: 'Thinking Brain School',
    eyebrow: 'CTO / public role overview',
    intro: 'Product direction and AI architecture for learning experiences.',
    details: [
      { label: 'Role', value: 'Chief Technology Officer' },
      { label: 'Focus', value: 'AI-assisted learning products' },
      { label: 'Responsibilities', value: 'Product / implementation / quality' },
      { label: 'Disclosure', value: 'Public overview only' },
    ],
    sections: [
      { label: '01 / Responsibility', title: 'Connect product needs to implementation', paragraphs: ['As CTO, my role spans AI product direction, system design, and coordinating implementation for educational experiences and internal operations. I work across the learner experience and the technical constraints behind it.'] },
      { label: '02 / Product judgment', title: 'Quality is part of the feature', paragraphs: ['Learning products need more than plausible generated material. I work with implementation priorities, quality evaluation, safety checks, and release-readiness controls as part of delivering a usable product.'] },
      { label: '03 / Platform experience', title: 'The Teaching MCP server', paragraphs: ['The work includes a conversational AI voice tutor and the Teaching MCP server, which gives AI assistants interactive lesson access through the Model Context Protocol.'] },
      { label: '04 / Disclosure boundary', title: 'What this page does not show', paragraphs: ['This is intentionally a high-level description of my responsibilities, not a case study of internal decisions, unpublished metrics, client content, or architecture.'] },
    ],
    highlight: { title: 'Product and platform responsibility', body: 'The focus is coordinating decisions across learning experience, AI system behavior, and operational quality.' },
    flow: ['Learner need', 'Product decision', 'Implementation', 'Review'],
    note: 'Client-owned product and implementation details are deliberately withheld.',
  },
  'teaching-mcp-server': {
    name: 'Teaching MCP server',
    eyebrow: 'AI interoperability / Thinking Brain School',
    intro: 'Interactive lesson access for AI assistants, verified live.',
    details: [
      { label: 'Role', value: 'CTO, architect' },
      { label: 'Protocol', value: 'Model Context Protocol' },
      { label: 'Focus', value: 'Lesson access, reliability' },
      { label: 'Status', value: 'Live in production' },
    ],
    sections: [
      { label: '01 / Problem', title: 'Assistants need a real door', paragraphs: ['Families and teachers already use AI assistants. Without a structured way in, an assistant can only guess at what a lesson contains. The Teaching MCP server gives assistants a defined, supported way to reach interactive lessons.'] },
      { label: '02 / Product choice', title: 'Use the open protocol', paragraphs: ['Building on the Model Context Protocol means the same server works with any assistant that speaks it, instead of a separate integration per vendor.'] },
      { label: '03 / Disclosure boundary', title: 'High level by design', paragraphs: ['Thinking Brain School owns the product. This page names the server and its public status, and nothing about internal content, users, or architecture.'] },
    ],
    highlight: { title: 'Live in production', body: 'Serving interactive lesson access to AI assistants.' },
    flow: ['Assistant', 'MCP', 'Lesson', 'Check'],
    note: 'Client-owned details are deliberately withheld.',
  },
  'llm-bench': {
    name: 'llm-bench',
    eyebrow: 'Evaluation / open source',
    intro: 'Will this model hold up on your actual work?',
    details: [
      { label: 'Role', value: 'Creator / maintainer' },
      { label: 'Tests', value: '42, programmatically verified' },
      { label: 'Runs on', value: 'Ollama, Bedrock, Claude CLI, OpenAI-compatible' },
      { label: 'Evidence', value: 'Public GitHub repository' },
    ],
    sections: [
      { label: '01 / Problem', title: 'Leaderboards answer the wrong question', paragraphs: ["A leaderboard tells you how a model ranks on someone else's tasks. It does not tell you whether it will hold up on yours."] },
      { label: '02 / Product choice', title: 'Real workflow tasks', paragraphs: ['42 tests that mirror real work: extracting structured data, finding planted bugs, writing emails, resisting prompt injection, and reasoning through dependency chains. Standard, hard, and full suites, plus a quick sanity check.'] },
      { label: '03 / Evaluation', title: 'No vibes, no LLM-as-judge', paragraphs: ['Every test has a programmatic verifier. A benchmark only matters if the measuring stick is explicit enough to argue with, and programmatic verifiers force an honesty that a model grading a model lets you skip.'] },
      { label: '04 / What is public', title: 'Run it yourself', paragraphs: ['The repository includes published model comparisons and is built to be collaborative: run it on your hardware and submit results.'] },
    ],
    highlight: { title: '42 tests, every one verified in code', body: 'Local models, Apple Intelligence, Claude tiers, Bedrock, or any OpenAI-compatible endpoint.' },
    flow: ['Task', 'Model', 'Verifier', 'Score', 'Compare'],
    note: 'Test counts follow the public repository README.',
  },
  'model-familiarity-engine': {
    name: 'model-familiarity-engine',
    eyebrow: 'Evaluation research / open source',
    intro: 'What a model has earned across a working relationship, not where it ranks.',
    details: [
      { label: 'Role', value: 'Creator' },
      { label: 'Method', value: 'Replay with redaction' },
      { label: 'Output', value: 'Observed model cards' },
      { label: 'Status', value: 'Bootstrap loop shipped' },
    ],
    sections: [
      { label: '01 / Problem', title: 'Single shots miss the relationship', paragraphs: ["Single-shot benchmarks don't capture how a model behaves across a real working relationship."] },
      { label: '02 / Product choice', title: 'Learn from real conversations', paragraphs: ['The engine onboards language models by simulating real user conversations, then builds evidence-backed model cards from observations instead of a ranking. Benchmarks are drawn from real conversation transcripts.'] },
      { label: '03 / Implementation', title: 'The bootstrap loop', paragraphs: ['The replay-bootstrap loop is shipped: known-outcome tasks, redaction, replay, and model cards built from what was actually observed. No synthetic tasks required.'] },
      { label: '04 / What is public', title: 'MIT licensed', paragraphs: ['The code and method are public on GitHub.'] },
    ],
    highlight: { title: "Not which model is best, but what this one has earned", body: 'Model cards come from observed behavior on replayed, known-outcome tasks.' },
    flow: ['Transcript', 'Redact', 'Replay', 'Observe', 'Model card'],
    note: 'This page describes the shipped loop, not a claim of benchmark coverage beyond the repository.',
  },
  'brink-mind': {
    name: 'Brink Mind',
    eyebrow: 'Native product / founder',
    intro: 'Mental health tools ignored the body, so Brink Mind brought heart data into the room.',
    details: [
      { label: 'Role', value: 'Founder & CEO, lead architect' },
      { label: 'Platform', value: 'iOS, watchOS, HealthKit' },
      { label: 'Stack', value: 'Swift, Python, Core ML' },
      { label: 'Dates', value: 'Nov 2024 to Mar 2025' },
    ],
    sections: [
      { label: '01 / Problem', title: 'The body carries signal', paragraphs: ['Mental health apps ignore the body. Heart rate and HRV carry signal a journal never captures.'] },
      { label: '02 / Product choice', title: 'Biometrics plus reflection', paragraphs: ['Brink Mind linked to the Apple Watch, using biometrics and journal entries to provide safer, more grounded support, with a voice-first interface.'] },
      { label: '03 / Implementation', title: 'Sensitive data stays on device', paragraphs: ['Built natively in SwiftUI with on-device inference, so the most sensitive data never had to leave the phone. It was the end of 2024, and I was teaching myself SwiftUI, product design, and how to be a CEO at the same time.'] },
      { label: '04 / Outcome', title: 'Reached TestFlight', paragraphs: ['Brink Mind reached TestFlight with working voice, biometrics, and on-device inference. It was my first real proof that I could learn the thing by building the thing, and the foundation for the agentic work that followed.'] },
    ],
    highlight: { title: 'Voice, biometrics, on-device inference', body: 'All three working together in a TestFlight build.' },
    flow: ['Watch', 'Signal', 'Reflect', 'Support'],
    note: 'Brink Mind did not launch publicly. This page describes the TestFlight build.',
    gallery: [
      { src: '/studio/brink-landing.jpg', alt: 'Brink Mind landing screen' },
      { src: '/studio/brink-app-1.jpg', alt: 'Brink Mind app screen' },
      { src: '/studio/brink-app-2.jpg', alt: 'Brink Mind app screen' },
    ],
  },
};

export type Cases = typeof enCases;
