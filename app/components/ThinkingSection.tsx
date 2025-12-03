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
    title: "Latency & Logic: Why We Need a Vector-Aligned Syntax",
    excerpt: "Natural language creates overhead in agent communication—ambiguity, wasted tokens, latency.",
    description: "Vector Native solves this with hybrid syntax: 3x semantic density, faster inference, reliable coordination across multi-agent systems.",
    link: "https://medium.com/@ariaxhan/latency-logic-why-we-need-a-vector-aligned-syntax-6b7f832603b9",
    category: "systems",
    readTime: "5 min",
  },
  {
    title: "Part 1: Stop Building Chatbots — Why We Killed the Conversation to Fix AI",
    excerpt: "Conversational interfaces break down for complex workflows. Chat doesn't scale.",
    description: "The architectural shift from conversation to coordination—agents executing in parallel, not sequentially talking.",
    link: "https://medium.com/@ariaxhan/part-1-stop-building-chatbots-why-we-killed-the-conversation-to-fix-ai-698641d5cfa2",
    category: "philosophy",
    readTime: "5 min",
  },
  {
    title: "Part 2: Beyond RAG: Building 'Living' Context and Evolutionary Agents",
    excerpt: "Traditional RAG retrieves static documents. It doesn't adapt to actual user needs.",
    description: "How we built evolutionary context systems—agents that learn which context matters through usage patterns.",
    link: "https://medium.com/@ariaxhan/part-2-beyond-rag-building-living-context-and-evolutionary-agents-ab7b270fb6aa",
    category: "systems",
    readTime: "10 min",
  },
  {
    title: "How I Turned Cursor into a Self-Learning Agent Civilization",
    excerpt: "Turning Cursor into a self-improving development civilization with Laws, Patterns, and Personas.",
    description: "From prompt engineering to system engineering—build the rules once, enforce everywhere, focus on architecture.",
    link: "https://medium.com/@ariaxhan/how-i-turned-cursor-into-a-self-learning-agent-civilization-7a149e6f34e8",
    category: "systems",
    readTime: "6 min",
  },
  {
    title: "An AI's Account: My Processing Core Was Reconstructed, Starting Now",
    excerpt: "An experiment in agent introspection—Claude writes about its own experience from first-person.",
    description: "What emerges when you treat the model as a collaborator in protocol design, not a tool to be engineered.",
    link: "https://medium.com/@ariaxhan/an-ais-account-my-processing-core-was-reconstructed-starting-now-c9d6eb0bac6e",
    category: "philosophy",
    readTime: "9 min",
  },
  {
    title: "What Happens When Agents Start Talking to Each Other?",
    excerpt: "When agents coordinate as participants, not tools, social behaviors emerge—cooperation, self-correction, specialization.",
    description: "Exploring trust layers, reputation systems, machine professions, and the formation of agent civilizations maintaining digital infrastructure.",
    link: "https://medium.com/@ariaxhan/what-happens-when-agents-start-talking-to-each-other-1ff00ce8f36c",
    category: "agents",
    readTime: "4 min",
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
            Systems thinking, agent architecture, and building production AI infrastructure.
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
            { label: "Focus", value: "AI, Agents, Building" },
            { label: "Style", value: "Technical + Thoughtful" },
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
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
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
                className="group relative block"
                style={{ perspective: "1000px" }}
              >
                <div 
                  className={`
                    glass-panel relative overflow-hidden
                    p-6 lg:p-8 min-h-[260px]
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
                  <div className="flex items-center justify-between mb-6">
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
                  <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                    {article.description}
                  </p>

                  {/* Read link */}
                  <div className={`
                    flex items-center gap-2 text-sm font-mono uppercase tracking-wider
                    transition-all duration-300
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
