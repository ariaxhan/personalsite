import Reveal from "./studio/Reveal";

const stats = [
  { value: "3x", label: "Companies", sub: "Founded" },
  { value: "6", label: "Hackathons", sub: "Won" },
  { value: "34", label: "Skills", sub: "Packaged" },
];

const narrative = [
  "I started as a language person. Journalism, essays, stories, poems, research rabbit holes, and constant reading.",
  "Computer science did not feel like leaving that behind. It felt like picking up one more language. Variables, files, interfaces, loops: all of it was another way to arrange meaning so it could turn meaning into something real.",
  "Then language models arrived, and it all came full circle.",
];

const pulls = [
  "Language was never decoration.",
  "It was the first machine I learned to build with.",
];

const narrative2 = [
  "Since then: companies founded, hackathons won, apps shipped, research tools built, obsessive writing about where current systems fail. My philosophy: follow the weird question until it becomes something real: a repo, an essay, an app.",
];

const worksWith = [
  "Claude Code, Codex, etc.",
  "Self-improving Systems",
  "Multi-agent Orchestration",
  "Coordination Protocols",
  "Skills, Hooks, Plugins",
  "Reinforcement Learning",
  "Context & Memory Systems",
  "Prompt Engineering & Architecture",
  "Evals & Benchmarks",
];

const focus = [
  { name: "KERNEL", text: "My Claude Code plugin. Persistent memory, agents that split the work instead of stepping on each other, an experiment engine that proves which workflows hold up. Active, open source, installable." },
  { name: "llm-bench", text: "Practical workflow benchmarks for local and API-hosted language models, graded by programmatic verifiers." },
  { name: "model-familiarity-engine", text: "Evidence-backed model cards from replayed known-outcome tasks and observed model behavior." },
  { name: "the-agent-library", text: "A curated library of portable skills for checking your own work, planning, generating novel ideas, research, writing, work management, and code engineering." },
];

/**
 * About: Background. The first-person account, set as editorial body text in a
 * comfortable reading column, with a marginal sidebar of materials and current
 * focus. The two short lines about language are pulled out large,
 * the way a magazine lifts a sentence off the page.
 */
export default function About() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
      {/* Intro */}
      <Reveal className="border-b border-[rgba(44,40,35,0.18)] pb-12">
        <div className="kicker mb-4">About</div>
        <h1
          className="m-0 font-serif font-light text-ink"
          style={{ fontSize: "clamp(40px, 7vw, 84px)", lineHeight: 0.98 }}
        >
          Background
        </h1>
        <p
          className="m-0 mt-6 max-w-[760px] font-serif font-light italic text-ink-soft"
          style={{ fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1.3 }}
        >
          I&apos;ve always been interested in one thing: how language shapes
          thought.
        </p>
      </Reveal>

      {/* Stats */}
      <Reveal className="grid grid-cols-3 gap-6 border-b border-[rgba(44,40,35,0.12)] py-10">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-serif font-light leading-none text-terracotta" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>
              {s.value}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
              {s.label}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {s.sub}
            </div>
          </div>
        ))}
      </Reveal>

      {/* Narrative + sidebar */}
      <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Reveal className="max-w-prose">
          {narrative.map((p) => (
            <p key={p} className="m-0 mb-7 text-[17px] leading-[1.8] text-ink-muted">
              {p}
            </p>
          ))}
          <div className="my-10">
            {pulls.map((p) => (
              <p
                key={p}
                className="m-0 mb-3 font-serif font-light italic text-ink"
                style={{ fontSize: "clamp(26px, 3.6vw, 40px)", lineHeight: 1.18 }}
              >
                {p}
              </p>
            ))}
          </div>
          {narrative2.map((p) => (
            <p key={p} className="m-0 mb-7 text-[17px] leading-[1.8] text-ink-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal as="aside" delay={120} className="flex flex-col gap-10">
          <div>
            <div className="kicker mb-4">What I work with</div>
            <ul className="flex flex-col gap-2">
              {worksWith.map((w) => (
                <li key={w} className="text-[15px] text-ink-faint">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="kicker mb-4">Current focus</div>
            <div className="flex flex-col gap-5">
              {focus.map((f) => (
                <p key={f.name} className="m-0 text-[14.5px] leading-relaxed text-ink-faint">
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink">
                    {f.name}
                  </span>
                  <span className="text-ink-ghost">: {f.text}</span>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="kicker mb-2">Location</div>
            <p className="m-0 font-serif text-[20px] text-ink">Los Angeles, CA</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
