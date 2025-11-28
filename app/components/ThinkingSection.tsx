"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

interface Article {
  title: string;
  excerpt: string;
  link: string;
  category: "agents" | "systems" | "philosophy";
}

const articlesData: Article[] = [
  {
    title: "What Happens When Agents Start Talking to Each Other",
    excerpt:
      "Exploring what emerges when AI agents coordinate directly;the protocols, patterns, and unexpected behaviors that develop without human design.",
    link: "https://medium.com/@ariahan/what-happens-when-agents-start-talking-to-each-other-1ff00ce8f36c",
    category: "agents",
  },
  {
    title: "How I Turned Cursor Into a Self-Learning Agent Civilization",
    excerpt:
      "Documentation of building systems where agents improve through experience and evolutionary pressure, not traditional reward functions.",
    link: "https://medium.com/@ariahan/how-i-turned-cursor-into-a-self-learning-agent-civilization-7a149e6f34e8",
    category: "systems",
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
            Deep Dives and Thought Pieces
          </h2>
          <p className="text-neutral-400 max-w-xl text-base leading-relaxed">
            Thoughts on AI development, building meaningful technology,
            and the intersection of technical craft and creative thinking.
         
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
          ].map((item, index) => (
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
                    p-8 lg:p-10 min-h-[280px]
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

                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className={`w-3 h-3 ${colors.text}`} />
                    <span className={`
                      text-xs font-mono uppercase tracking-wider
                      ${colors.text}
                    `}>
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl lg:text-2xl text-display font-light mb-4
                    transition-colors duration-300
                    ${isHovered ? colors.text : "text-white/90"}
                  `}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                    {article.excerpt}
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
            href="https://medium.com/@ariahan"
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
