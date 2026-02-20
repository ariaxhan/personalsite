"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

interface Article {
  title: string;
  excerpt: string;
  description: string;
  link: string;
  category: "agents" | "systems" | "philosophy";
  readTime: string;
}
const articlesData: Article[] = [
  {
    title: "Stop Writing Markdown. Start Writing Memory.",
    excerpt: "Markdown is optimized for human eyes. Terrible for knowledge agents need to query.",
    description: "Rebuilt my agent workflow around SQLite. Three tables: context, learnings, errors. No markdown generation unless a human needs to read something.",
    link: "https://medium.com/@ariaxhan/stop-writing-markdown-start-writing-memory-e4a69c57caa9",
    category: "systems",
    readTime: "6 min",
  },
  {
    title: "I Put ChatGPT in Charge of Claude Code",
    excerpt: "What happens when you use one model to orchestrate another?",
    description: "Multi-model orchestration experiment. ChatGPT as strategic observer, Claude as executor. The results were unexpected.",
    link: "https://medium.com/@ariaxhan/i-put-chatgpt-in-charge-of-claude-code-7b9bf5bb8ea9",
    category: "agents",
    readTime: "5 min",
  },
  {
    title: "I Tested OpenAI's New Codex Desktop App",
    excerpt: "OpenAI shipped a genuinely novel interface. Then the model opened its mouth.",
    description: "The UI is the real product. A review of the Codex desktop app and what it reveals about the future of AI coding tools.",
    link: "https://medium.com/@ariaxhan/i-tested-openais-new-codex-desktop-app-the-ui-is-the-real-product-c2c59bdcb5f6",
    category: "philosophy",
    readTime: "5 min",
  },
  {
    title: "Automations with Claude Code",
    excerpt: "A pattern for proactive AI on your own machine.",
    description: "Personalized proactive emails and code-poetry from local context. How I set up automations that run without my intervention.",
    link: "https://medium.com/@ariaxhan/automations-with-claude-code-personalized-proactive-emails-and-code-poetry-from-local-context-3a7e93bf5a3d",
    category: "systems",
    readTime: "4 min",
  },
  {
    title: "KERNEL: Self-Evolving Claude Code Configuration",
    excerpt: "How I stopped fighting my config and let it learn instead.",
    description: "A Claude Code plugin that makes your setup evolve automatically based on how you actually work. AgentDB, orchestration, contracts.",
    link: "https://medium.com/@ariaxhan/kernel-the-ultimate-self-evolving-claude-code-and-cursor-configuration-system-a3ddeb7f4d32",
    category: "systems",
    readTime: "6 min",
  },
  {
    title: "From Friction to Flow: Building a Command Library",
    excerpt: "Commands as cognitive offloading. Stop remembering, start invoking.",
    description: "How building a command vocabulary for Claude Code changed my workflow from fighting the tool to flowing with it.",
    link: "https://medium.com/@ariaxhan/from-friction-to-flow-building-a-command-library-for-claude-code-a9eb19f7dce2",
    category: "systems",
    readTime: "5 min",
  },
  {
    title: "10 Things I Wish I Knew About AI Coding",
    excerpt: "Hard-won lessons from thousands of hours with AI coding tools.",
    description: "Practical wisdom from production use. What actually matters when you code with AI every day.",
    link: "https://medium.com/@ariaxhan/10-things-i-wish-i-knew-when-i-started-using-ai-for-coding-887c26a6c1d1",
    category: "philosophy",
    readTime: "5 min",
  },
  {
    title: "This AI Analyzes My Entire Life",
    excerpt: "The Synthesis Pool: a personal AI that costs $0/month to run.",
    description: "Built a system that connects all my data sources and synthesizes insights. Privacy-first, local-first, zero cloud cost.",
    link: "https://medium.com/@ariaxhan/the-synthesis-pool-0ce814fdfa5f",
    category: "agents",
    readTime: "6 min",
  },
];

const categoryColors = {
  agents: { 
    text: "text-cognition", 
    bg: "bg-cognition/10", 
    border: "border-cognition/30",
    glow: "rgba(0, 217, 255, 0.15)",
  },
  systems: { 
    text: "text-emergence", 
    bg: "bg-emergence/10", 
    border: "border-emergence/30",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  philosophy: { 
    text: "text-memory", 
    bg: "bg-memory/10", 
    border: "border-memory/30",
    glow: "rgba(251, 191, 36, 0.15)",
  },
};

/**
 * ThinkingStream: Medium articles as flowing thoughts
 * 
 * Concept: Written work represents externalized cognition - thoughts
 * that have been captured and crystallized. Cards float in cognitive
 * space, connected to each other, showing the continuous stream of
 * thinking and exploration.
 */
export default function ThinkingSection() {
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
            radial-gradient(ellipse 50% 50% at 20% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 50%, rgba(0, 217, 255, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-data tracking-[0.2em] mb-6">
            <span className="text-data/60">⬡</span> TECHNICAL_WRITING
          </p>
          <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
            Technical Writing
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
            Deep dives into agent coordination, memory systems, and AI architecture.
          </p>
        </motion.div>

        {/* Meta Info - cognitive metadata */}
        <motion.div
          className="flex flex-wrap gap-8 lg:gap-16 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: "Platform", value: "Medium" },
            { label: "Focus", value: "Systems Architecture" },
            { label: "Style", value: "Direct & Technical" },
          ].map((item) => (
            <div key={item.label} className="group">
              <p className="text-meta mb-2">{item.label}</p>
              <p className="text-neutral-300 text-sm group-hover:text-cognition/80 transition-colors">
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Articles as floating thought cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 items-stretch">
          {articlesData.map((article, index) => {
            const colors = categoryColors[article.category];
            const isHovered = hoveredIndex === index;

            return (
              <motion.a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, rotateX: 5 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative block h-full"
                style={{ perspective: "1000px" }}
              >
                <div 
                  className={`
                    glass-panel relative overflow-hidden
                    p-6 lg:p-8 h-full
                    flex flex-col
                    transition-all duration-500 ease-out
                    ${isHovered ? "scale-[1.02]" : "scale-100"}
                  `}
                  style={{
                    boxShadow: isHovered 
                      ? `0 0 60px ${colors.glow}, 0 25px 50px rgba(0, 0, 0, 0.4)`
                      : undefined,
                    transform: isHovered 
                      ? "translateY(-4px) rotateX(2deg)" 
                      : undefined,
                  }}
                >
                  {/* Animated accent line */}
                  <div 
                    className={`
                      absolute left-0 top-0 bottom-0 w-1
                      bg-gradient-to-b ${colors.border.replace('border-', 'from-')} to-transparent
                      transition-all duration-500
                      ${isHovered ? "w-1.5 opacity-100" : "opacity-60"}
                    `}
                  />

                  {/* Category tag and read time */}
                  <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-3 h-3 ${colors.text}`} />
                      <span className={`
                        text-xs font-mono uppercase tracking-wider
                        ${colors.text}
                      `}>
                        {article.category}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Content wrapper - grows to fill space */}
                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className={`
                      text-xl lg:text-2xl text-display font-light mb-3
                      transition-colors duration-300
                      ${isHovered ? colors.text : "text-white/90"}
                    `}>
                      {article.title}
                    </h3>

                    {/* Excerpt - brief hook */}
                    <p className="text-white/70 text-sm leading-relaxed mb-2">
                      {article.excerpt}
                    </p>

                    {/* Description - more detail */}
                    <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
                      {article.description}
                    </p>
                  </div>

                  {/* Read link - stays at bottom */}
                  <div className={`
                    flex items-center gap-2 text-sm font-mono uppercase tracking-wider
                    transition-all duration-300 flex-shrink-0
                    ${isHovered ? colors.text : "text-neutral-500"}
                  `}>
                    <span>Read on Medium</span>
                    <ExternalLink className={`
                      w-3.5 h-3.5 transition-transform duration-300
                      ${isHovered ? "translate-x-0.5 -translate-y-0.5" : ""}
                    `} />
                  </div>

                  {/* Connection dot - suggests network */}
                  <div className="absolute top-6 right-6">
                    <div 
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${isHovered 
                          ? `${colors.bg.replace('/10', '')} shadow-[0_0_10px_currentColor] ${colors.text}` 
                          : "bg-neutral-700"
                        }
                      `}
                    />
                  </div>

                  {/* Hover background gradient */}
                  <div 
                    className={`
                      absolute inset-0 transition-opacity duration-500 pointer-events-none
                      bg-gradient-to-br from-transparent via-transparent to-${colors.bg.replace('bg-', '')}
                      ${isHovered ? "opacity-50" : "opacity-0"}
                    `}
                  />
                </div>

                {/* Connection line between cards (decorative) */}
                {index === 0 && (
                  <div className="absolute -right-4 top-1/2 w-8 h-px bg-gradient-to-r from-emergence/30 to-transparent hidden lg:block" />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* More articles link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="https://medium.com/@ariaxhan"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-4 glass-panel hover:border-cognition/30"
          >
            <span className="text-neutral-400 group-hover:text-cognition transition-colors">
              All articles on Medium
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-cognition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
