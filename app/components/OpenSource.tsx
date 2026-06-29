"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import { useRef, useState } from "react";

interface OpenSourceProject {
  name: string;
  description: string[];
  url: string;
  evidence: string;
  meta: {
    [key: string]: string;
  };
}

const openSourceProjects: OpenSourceProject[] = [
  {
    name: "the-agent-library",
    description: [
      "A curated library of portable skills for getting real work out of AI agents. Built for Claude, Codex, and any agent that loads skills. Most of the shelf is not code-specific: it covers verification, planning, research, writing, work management, creative taste, and shipping.",
      "Thirty-four skills across category-first shelves, each packaged as a standalone workflow with a clear trigger, `SKILL.md`, and OpenAI agent metadata. The spine is trust: audit claims, test measuring sticks, question premises, and get fresh eyes before believing an agent that says done.",
    ],
    url: "https://github.com/ariaxhan/the-agent-library",
    evidence:
      "The useful unit is not a giant prompt collection. It is a small, sharp workflow someone can copy, run, and trust.",
    meta: {
      status: "Active · 34 portable skills",
      stack: "Claude · Codex · agent skills",
      structure: "Category-first shelves",
      license: "MIT",
    },
  },
  {
    name: "KERNEL",
    description: [
      "Claude Code that learns from itself: persistent memory, multi-agent orchestration, and a scientific experiment engine that proves which rules actually work. Every session writes evidence so the next one starts smarter.",
      "AgentDB-backed workflows, 13 specialized agents, on-demand skills, validation gates, and an experiment loop that graduates rules only after they survive real telemetry. The plugin is installable through Claude's plugin marketplace and mirrored into Cursor workflows.",
    ],
    url: "https://github.com/ariaxhan/kernel-claude",
    evidence:
      "Agents do not need more vibes. They need memory, contracts, verification, and rules that prove themselves under pressure.",
    meta: {
      status: "Active · Plugin marketplace",
      stack: "Claude Code · SQLite · Shell",
      methodology: "AgentDB · Contracts · Orchestration",
      stars: "11",
    },
  },
  {
    name: "llm-bench",
    description: [
      "Practical workflow benchmarks for local and API-hosted language models. It runs concrete tasks that look like normal model work: extraction, copy cleanup, code, planted bugs, email drafting, exact formats, prompt injection, and messy-input reasoning.",
      "Every benchmark task has a programmatic verifier. The goal is boring, reproducible model comparison across local and hosted providers: Ollama, LM Studio, Apple Intelligence, Claude CLI, Anthropic, Bedrock, OpenCode, and OpenAI-compatible endpoints.",
    ],
    url: "https://github.com/ariaxhan/llm-bench",
    evidence:
      "A benchmark is useful when the measuring stick is explicit enough to argue with. No vibes, no leaderboard theater, no hidden judge.",
    meta: {
      status: "Active · Practical workflow benchmark",
      stack: "Python · Ollama · Bedrock · Claude CLI",
      scope: "Standard · hard · agentic · adversarial · messy",
      license: "MIT",
    },
  },
  {
    name: "model-familiarity-engine",
    description: [
      "A Model Familiarity Engine, not a leaderboard. It continuously onboards language models by observing them in real work, learning where they should be trusted, and building evidence-backed routing knowledge for multi-model agent systems.",
      "The replay-bootstrap loop is shipped: load known-outcome tasks, redact secrets, replay through models, floor-test the judge, and render model cards from observations. It can import benchmark evidence, but it does not depend on any one benchmark project.",
    ],
    url: "https://github.com/ariaxhan/model-familiarity-engine",
    evidence:
      "The question is not 'which model is best?' It is 'what responsibility has this model earned?'",
    meta: {
      status: "Bootstrap loop shipped",
      stack: "Python · Bedrock · Ollama · Claude CLI",
      scope: "Replay · redaction · floor-tested judging · model cards",
      license: "MIT",
    },
  },
  {
    name: "metabrain",
    description: [
      "A zero-dependency SQLite memory layer for AI agents that learns what works. Most memory tools store what you tell them; metabrain closes the loop—a pattern recorded enough times graduates into a hypothesis, every outcome becomes an experiment for or against it, and proven hypotheses graduate into preferences the agent runs on.",
      "Deterministic by construction: using the API correctly populates every table as a side effect. Seven tables, one file, stdlib sqlite—no vector database, no server, no API key. General across self-learning content engines, lead capture, and self-improving job applications.",
    ],
    url: "https://github.com/ariaxhan/metabrain",
    evidence:
      "Most agent memory remembers what you told it. The memory that compounds is the kind that proves which lessons actually work—and promotes them.",
    meta: {
      status: "Published · PyPI + GitHub",
      stack: "Python · SQLite · zero-dependency",
      install: "pip install metabrain",
      license: "MIT",
    },
  },
  {
    name: "Substrate",
    description: [
      "A generative art gallery where Claude Code agents create abstract, interactive HTML pieces through automated daily workflows. Each piece is self-contained computational poetry: inline CSS, JavaScript, and interaction, usually under 4KB.",
      "The gallery has 70+ pieces and counting. A theme email becomes a generated piece, manifest rebuild, GitHub push, and Cloudflare Pages deploy. Humans set the constraint; agents supply concept, code, visual design, and interaction.",
    ],
    url: "https://github.com/ariaxhan/substrate",
    evidence:
      "This is what happens when agents are allowed to make artifacts every day, not just answer questions about making them.",
    meta: {
      status: "Live · 70+ pieces",
      stack: "HTML · CSS · JavaScript · Cloudflare Pages",
      cadence: "Daily agent generation",
      constraint: "Self-contained · ~2KB average",
    },
  },
  {
    name: "latent-diagnostics",
    description: [
      "Representation-level analysis of language models via attribution graph geometry. The work measures computational regimes inside model internals instead of asking only whether the output was correct.",
      "The strongest finding is disciplined and bounded: task domains show measurable geometric signatures after length control, while hallucination and truthfulness detection did not survive. The repo preserves negative results instead of laundering them into a bigger claim.",
    ],
    url: "https://github.com/ariaxhan/latent-diagnostics",
    evidence:
      "The honest result matters: some internal signals are real, some are length artifacts, and correctness is not the same thing as computation shape.",
    meta: {
      status: "Research · Negative results preserved",
      stack: "Python · SAEs · Attribution graphs",
      finding: "Grammar influence d=1.08 after length control",
      license: "MIT",
    },
  },
];

/**
 * OpenSource: Contributing back to the cognitive substrate
 * 
 * Concept: Open source work is like adding new layers to the collective
 * substrate of knowledge. These projects become building blocks that
 * others can use, extending the network of shared intelligence.
 */
export default function OpenSource() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0, 217, 255, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-data tracking-[0.2em] mb-6">
            <span className="text-emergence/60">◊</span> 03_OPEN_SOURCE
          </p>
          <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
            Open Source
          </h2>
          <p className="text-neutral-400 max-w-xl text-base">
            Public work across agent infrastructure, benchmarks, model familiarity, portable skills, memory, and computational poetry.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-10">
          {openSourceProjects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  glass-panel relative overflow-hidden
                  border-l-2 border-emergence/40
                  p-8 lg:p-12
                  transition-all duration-500 ease-out
                  ${isHovered ? "border-emergence/80" : ""}
                `}
                style={{
                  boxShadow: isHovered 
                    ? "0 0 40px rgba(139, 92, 246, 0.15), 0 20px 40px rgba(0, 0, 0, 0.3)"
                    : undefined,
                }}
              >
                {/* Active state glow */}
                <div 
                  className={`
                    absolute inset-0 transition-opacity duration-500
                    bg-gradient-to-br from-emergence/5 via-transparent to-cognition/5
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* Main content grid */}
                <div className="relative grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
                  {/* Left: Primary content */}
                  <div>
                    {/* Header with repo link */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <GitBranch className={`
                          w-5 h-5 transition-colors duration-300
                          ${isHovered ? "text-emergence" : "text-neutral-500"}
                        `} />
                        <h3 className={`
                          text-2xl lg:text-3xl text-display font-light
                          transition-colors duration-300
                          ${isHovered ? "text-emergence" : "text-white/90"}
                        `}>
                          {project.name}
                        </h3>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            p-2 rounded transition-all duration-300
                            ${isHovered 
                              ? "text-emergence hover:bg-emergence/10" 
                              : "text-neutral-600 hover:text-emergence"
                            }
                          `}
                          aria-label={`View ${project.name} on GitHub`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Star indicator */}
                      <div className={`
                        flex items-center gap-2 px-3 py-1.5 rounded
                        border border-glass-border
                        transition-all duration-300
                        ${isHovered ? "border-emergence/30 bg-emergence/5" : ""}
                      `}>
                        <Star className={`w-3.5 h-3.5 ${isHovered ? "text-emergence" : "text-neutral-600"}`} />
                        <span className="text-xs font-mono text-neutral-400">Open Source</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 mb-8">
                      {project.description.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-base text-neutral-400 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Evidence quote */}
                    <blockquote className={`
                      relative pl-6 py-4
                      border-l-2 border-cognition/30
                      text-sm italic leading-relaxed
                      transition-colors duration-300
                      ${isHovered ? "text-cognition/90 border-cognition/50" : "text-cognition/60"}
                    `}>
                     
                      {project.evidence}
                    </blockquote>
                  </div>

                  {/* Right: Meta sidebar */}
                  <div 
                    className={`
                      p-6 rounded-lg
                      bg-substrate-deep/80 border border-glass-border
                      backdrop-blur-sm
                      transition-all duration-500
                      ${isHovered ? "border-emergence/20" : ""}
                    `}
                  >
                    {/* Meta label */}
                    <p className="text-meta mb-6 pb-2 border-b border-glass-border">
                      PROJECT METADATA
                    </p>

                    {/* Meta entries */}
                    {Object.entries(project.meta).map(([key, value], idx) => (
                      <motion.div 
                        key={key}
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0.7,
                          x: isHovered ? 0 : 5,
                        }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="mb-5 last:mb-0"
                      >
                        <p className="text-xs uppercase text-neutral-600 tracking-wider mb-1">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className={`
                          text-sm transition-colors duration-300
                          ${isHovered ? "text-neutral-200" : "text-neutral-400"}
                        `}>
                          {value}
                        </p>
                      </motion.div>
                    ))}

                    {/* GitHub link button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        mt-6 flex items-center justify-center gap-2
                        px-4 py-3 rounded
                        border transition-all duration-300
                        ${isHovered 
                          ? "border-emergence/40 bg-emergence/10 text-emergence" 
                          : "border-glass-border text-neutral-500 hover:text-emergence hover:border-emergence/30"
                        }
                      `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm font-mono">View Repository</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
