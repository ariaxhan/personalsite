"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

const stats: Stat[] = [
  { value: "3x", label: "Companies", sublabel: "founded" },
  { value: "6", label: "Hackathons", sublabel: "won" },
  { value: "34", label: "Skills", sublabel: "packaged" },
];

const tools = [
	"Claude Code",
  "Self-improving Systems",
	"Multi-agent Orchestration",
	"Coordination Protocols",
	"AgentDB",
  "Model Familiarity",
  "Portable Skills",
	"Reinforcement Learning",
	"Memory Systems",
	"Prompt Architecture",
  "Evals/benchmarks"
];

/**
 * About: The comprehensive introduction
 * 
 * Not a resume. Not a pitch. Just who I am and what I've done.
 */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <p className="text-data tracking-[0.2em] mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="text-cognition/60">○</span> ABOUT
          </p>
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white/90 mb-6 sm:mb-8 leading-[0.95]">
            Background
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-400 leading-relaxed max-w-3xl">
            i&apos;ve always been interested in one thing: how language shapes thought.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-panel p-5 sm:p-6 lg:p-8 text-center"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white/90 mb-1 sm:mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-mono">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="text-[0.625rem] sm:text-xs text-neutral-600 font-mono">
                  {stat.sublabel}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
          {/* Left column - narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 sm:space-y-10"
          >
            <div>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  i started with journalism, essays, stories, and research. then i discovered computer science and realized it wasn&apos;t all that different. code was just another language. another way to describe complex systems with precision.
                </p>
                <p>
                  when large language models arrived, those worlds merged.
                </p>
                <p>
                  for the past two years i&apos;ve been building and shipping ai systems across evaluation, agent infrastructure, memory, research tools, mobile apps, and production workflows. but the more i build, the less interested i become in ai that&apos;s constantly asking for attention.
                </p>
                <p>
                  i don&apos;t think the future is another chatbot.
                </p>
                <p>
                  i think the best ai is ambient.
                </p>
                <p>
                  it quietly organizes information, preserves context, coordinates work, and surfaces the right knowledge at the right moment. it doesn&apos;t interrupt your thinking. it protects it.
                </p>
                <p>
                  that&apos;s what i want to build.
                </p>
                <p>
                  not software that replaces human intelligence, but infrastructure that expands it. tools that disappear into the background so people can spend less time managing information and more time discovering, creating, and solving meaningful problems.
                </p>
                <p>
                  the best technology isn&apos;t the part you notice.
                </p>
                <p>
                  it&apos;s everything you no longer have to think about.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column - tools & links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Tools */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4 sm:mb-6">
                What I Work With
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[0.625rem] sm:text-xs font-mono
                             bg-substrate-deep border border-glass-border rounded
                             text-neutral-400 hover:text-cognition hover:border-cognition/30
                             transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Current focus */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
                Current Focus
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                <b>KERNEL</b>: my Claude Code plugin for persistent agent memory, multi-agent orchestration, and an experiment engine that proves which workflows actually hold up. Active, open source, and installable.
              </p>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                <b>llm-bench</b>: practical workflow benchmarks for local and API-hosted language models, with programmatic verifiers and provider adapters.
              </p>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                <b>model-familiarity-engine</b>: evidence-backed model cards from replayed known-outcome tasks and observed model behavior.
              </p>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                <b>the-agent-library</b>: a curated library of 34 portable skills for verification, planning, research, writing, work management, and code engineering.
              </p>
            </div>

            {/* Location */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
                Location
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base">
                Los Angeles, CA
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
