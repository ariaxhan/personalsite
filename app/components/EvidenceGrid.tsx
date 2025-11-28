"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function EvidenceGrid() {
  return (
    <section className="py-24 lg:py-32 section-gradient relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-violet-400/60 mb-4 tracking-wider">
            COMPETITION WINS
          </p>
          <h2 className="text-3xl lg:text-5xl font-light text-neutral-100">
            Built Under Pressure
          </h2>
          <p className="text-neutral-500 mt-4 max-w-xl">
            Six hackathon wins in the past two years. Each project built in 24-48 hours, 
            validated by judges, and often continued into production. Rapid iteration under pressure.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {evidenceData.map((cell, index) => {
            const content = (
              <>
                <div>
                  <p className="text-xs font-mono text-neutral-600 mb-3">
                    {cell.date}
                  </p>
                  <h3 className="text-lg lg:text-xl font-medium mb-2 text-neutral-200 group-hover:text-violet-300 transition-colors">
                    {cell.name}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    {cell.desc}
                  </p>
                  <p className="text-xs text-neutral-400 mb-4">
                    {cell.title}
                  </p>
                  {cell.technologies && cell.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cell.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs font-mono px-2 py-1 bg-neutral-900/50 border border-neutral-800/40 rounded text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800/50">
                  <div>
                    <p className="text-xs font-mono text-violet-400/80">
                      {cell.metric}
                    </p>
                    {cell.award && (
                      <p className="text-xs text-neutral-500 mt-1">
                        {cell.award}
                      </p>
                    )}
                  </div>
                  {cell.link && (
                    <ExternalLink className="w-4 h-4 text-neutral-700 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                  )}
                </div>
              </>
            );

            const cellClassName =
              "bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 p-6 lg:p-8 flex flex-col rounded-sm group min-h-[280px]";

            return cell.link ? (
              <motion.a
                key={index}
                href={cell.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={cellVariants}
                className={`${cellClassName} soft-glow-hover cursor-pointer`}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={index}
                variants={cellVariants}
                className={cellClassName}
              >
                {content}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
