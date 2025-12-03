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
    name: "Vector Native",
    description: [
      "A2A communication protocol with 3x semantic density. Natural language is inefficient for agent coordination—ambiguity, wasted tokens, latency.",
    ],
    url: "https://github.com/persist-os/vector-native",
    evidence:
      "Symbols trigger pre-trained statistical patterns from math, programming, and config files.",
    meta: {
      status: "Active Development",
      language: "Python",
      license: "MIT",
    },
  },
  {
    name: "The Convergence",
    description: [
      "Self-improving agent framework with evolutionary pressure. Weak behaviors die, strong behaviors survive. Published to PyPI, integrated into HeyContext.",
    ],
    url: "https://github.com/persist-os/the-convergence",
    evidence:
      "Hackathon winner (Weavehacks RL Track). Production deployed.",
    meta: {
      method: "Evolutionary selection",
      validation: "Hackathon winner · Production deployed",
      distribution: "PyPI · GitHub",
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
            Building blocks for multi-agent systems.
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
