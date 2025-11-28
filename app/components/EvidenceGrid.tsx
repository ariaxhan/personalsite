"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef, useState } from "react";

interface EvidenceCell {
  date: string;
  title: string;
  name: string;
  desc: string;
  award: string;
  metric: string;
  technologies: string[];
  link?: string;
}

const evidenceData: EvidenceCell[] = [
  {
    date: "2025",
    title: "AWS AI Agents Hackathon",
    name: "Darwin",
    desc: "Darwin evolves better tool-writing AI. Models compete to generate tools. Semgrep scans. Weak code dies. Strong code survives.",
    award: "Best Use of Semgrep",
    metric: "Winner",
    technologies: ["AWS Bedrock", "Semgrep", "AI Evolution", "Security"],
    link: "https://devpost.com/software/darwin-cmfysv",
  },
  {
    date: "2025",
    title: "Weavehacks-2 - Self Improving Agents w/ Google Cloud",
    name: "The Convergence",
    desc: "Where cutting-edge AI infrastructure meets autonomous learning - agents that improve through experience, collaboration, and evolution. Converted into an open-source package and integrated into HeyContext.",
    award: "Reinforcement Learning Track",
    metric: "Winner",
    technologies: [
      "BrowserBase + Stagehand",
      "Google ADK",
      "Tavily",
      "AG-UI",
      "Daytona",
      "Weights & Biases Weave",
      "Coreweave Reinforcement Learning",
    ],
    link: "https://devpost.com/software/the-convergence",
  },
  {
    date: "2025",
    title: "Multimodal AI Agents",
    name: "Content Creator Connector",
    desc: "Enter your company name, and our platform finds the best mid-size content creators, researches your brand, and sends personalized collaboration emails.",
    award: "Best Use of Agno",
    metric: "Winner",
    technologies: ["Gemini", "Agno", "Weave", "Wordware"],
    link: "https://devpost.com/software/content-creator-connector",
  },
  {
    date: "2024",
    title: "Vertical Specific AI Agents Hackathon",
    name: "TheraVoice",
    desc: "TheraVoice, our AI therapy agent built with aiXplain, takes in user input, processes it using advanced AI and NLP, and delivers a vocalized response through text-to-speech (TTS) technology.",
    award: "Best Use of AI/ML API",
    metric: "Winner",
    technologies: ["aiXplain", "AI/ML"],
    link: "https://devpost.com/software/draft_name",
  },
  {
    date: "2024",
    title: "GPT-4o vs. Gemini 1.5 Hackathon",
    name: "HotAgents",
    desc: "Effortlessly trigger agents using hotkeys and simplify your workflow by condensing high-impact LLM use cases into easily repeatable actions.",
    award: "Best Use of Wordware",
    metric: "Winner",
    technologies: ["Wordware", "AgentOps", "Electron"],
    link: "https://github.com/ariaxhan/hotagents",
  },
  {
    date: "2024",
    title: "AI Agents 2.0 Hackathon",
    name: "Freetime - AI Social Planner",
    desc: "AI-driven social planning tool that coordinates gatherings based on shared interests.",
    award: "",
    metric: "Finalist",
    technologies: ["Groq", "Supabase", "CrewAI", "JigsawStack"],
    link: "https://github.com/ariaxhan/freetime",
  },
];

/**
 * EvidenceConstellation: Achievements as stars in cognitive space
 * 
 * Concept: Each achievement is a node in a constellation of capability.
 * Hovering illuminates connections - showing how skills and wins relate.
 * The visual suggests emergence: individual achievements that together
 * reveal a larger pattern of capability.
 */
export default function EvidenceGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Section background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(0, 217, 255, 0.05) 0%, transparent 50%)
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
            <span className="text-emergence/60">◇</span> 01_COMPETITION_WINS
          </p>
          <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
            Built Under Pressure
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
            Six hackathon wins in the past two years. Each project built in 24-48 hours,
            validated by judges, and often continued into production.{" "}
            <span className="text-emergence/80">Rapid iteration under pressure.</span>
          </p>
        </motion.div>

        {/* Constellation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidenceData.map((cell, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            const content = (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { 
                  opacity: isOtherHovered ? 0.5 : 1, 
                  y: 0, 
                  scale: 1 
                } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  glass-panel group relative overflow-hidden
                  p-6 lg:p-8 min-h-[320px] flex flex-col
                  transition-all duration-500 ease-out
                  ${isHovered ? "scale-[1.02] z-10" : "scale-100"}
                `}
                style={{
                  boxShadow: isHovered 
                    ? "0 0 40px rgba(139, 92, 246, 0.2), 0 20px 40px rgba(0, 0, 0, 0.3)"
                    : undefined,
                }}
              >
                {/* Node indicator - constellation star */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span 
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${isHovered 
                        ? "bg-cognition shadow-[0_0_10px_#00d9ff]" 
                        : "bg-emergence/50"
                      }
                    `}
                  />
                </div>

                {/* Hover glow effect */}
                <div 
                  className={`
                    absolute inset-0 transition-opacity duration-500
                    bg-gradient-to-br from-cognition/5 via-transparent to-emergence/5
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* Content */}
                <div className="relative flex-1 flex flex-col">
                  {/* Date */}
                  <p className="text-meta mb-4">{cell.date}</p>

                  {/* Project name */}
                  <h3 className={`
                    text-xl lg:text-2xl font-light mb-3 transition-colors duration-300
                    ${isHovered ? "text-cognition" : "text-white/90"}
                  `}>
                    {cell.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
                    {cell.desc}
                  </p>

                  {/* Hackathon title */}
                  <p className="text-xs text-neutral-500 mb-4">{cell.title}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cell.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`
                          text-xs font-mono px-2 py-1 rounded
                          border transition-all duration-300
                          ${isHovered
                            ? "bg-cognition/10 border-cognition/30 text-cognition/80"
                            : "bg-substrate-deep/50 border-glass-border text-neutral-500"
                          }
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                    {cell.technologies.length > 4 && (
                      <span className="text-xs text-neutral-600">
                        +{cell.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Bottom: Award + Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                    <div>
                      <p className={`
                        text-xs font-mono uppercase tracking-wider transition-colors duration-300
                        ${cell.metric === "Winner" ? "text-emergence" : "text-data/70"}
                      `}>
                        {cell.metric}
                      </p>
                      {cell.award && (
                        <p className="text-xs text-neutral-500 mt-1">{cell.award}</p>
                      )}
                    </div>
                    {cell.link && (
                      <ExternalLink 
                        className={`
                          w-4 h-4 transition-all duration-300
                          ${isHovered 
                            ? "text-cognition translate-x-0.5 -translate-y-0.5" 
                            : "text-neutral-600"
                          }
                        `}
                      />
                    )}
                  </div>
                </div>

                {/* Connection lines to adjacent cards (decorative) */}
                {isHovered && (
                  <>
                    <div className="absolute -right-3 top-1/2 w-3 h-px bg-gradient-to-r from-cognition/50 to-transparent hidden lg:block" />
                    <div className="absolute -left-3 top-1/2 w-3 h-px bg-gradient-to-l from-cognition/50 to-transparent hidden lg:block" />
                  </>
                )}
              </motion.div>
            );

            return cell.link ? (
              <a
                key={index}
                href={cell.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cognition focus-visible:ring-offset-4 focus-visible:ring-offset-substrate-void rounded-lg"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
