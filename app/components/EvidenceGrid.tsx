"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface EvidenceCell {
  date: string;
  title: string;
  desc: string;
  metric: string;
  link?: string;
}

const evidenceData: EvidenceCell[] = [
  {
    date: "2025",
    title: "AWS AI Agents Hackathon",
    desc: "Best Use of Semgrep. Darwin: AI models competing to generate better tools through automated quality metrics.",
    metric: "Winner",
    link: "https://devpost.com/software/darwin-cmfysv",
  },
  {
    date: "2025",
    title: "Weavehacks-2 - Self Improving Agents w/ Google Cloud",
    desc: "RL Track Winner. The Convergence: Self-improving agents through reinforcement learning. Published to PyPI.",
    metric: "Winner · Open Source",
    link: "https://devpost.com/software/the-convergence",
  },
  {
    date: "2025",
    title: "Multimodal AI Agents",
    desc: "Best Use of Agno. Content Creator Connector: Brand-creator matching through multi-modal analysis.",
    metric: "Winner",
    link: "https://devpost.com/software/content-creator-connector",
  },
  {
    date: "2024",
    title: "Vertical Specific AI Agents Hackathon",
    desc: "Best AI/ML API. TheraVoice: AI therapy agent that processes user input using advanced AI and NLP, delivering vocalized responses through TTS.",
    metric: "Winner",
    link: "https://devpost.com/software/draft_name",
  },
  {
    date: "2024",
    title: "GPT-4o vs. Gemini 1.5 Hackathon",
    desc: "Best Use of Wordware. HotAgents: Hotkey-triggered agent workflows for high-impact LLM operations.",
    metric: "Winner",
    link: "https://github.com/ariaxhan/hotagents",
  },
  {
    date: "2024",
    title: "AI Agents 2.0 Hackathon",
    desc: "Freetime: AI-driven social coordination. Multi-agent system for gathering planning based on shared interests.",
    metric: "Finalist",
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
            Six hackathon wins in 2024-2025. Each project built in 24-48 hours, 
            validated by judges, and often continued into production.
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
                    {cell.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {cell.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800/50">
                  <p className="text-xs font-mono text-violet-400/80">
                    {cell.metric}
                  </p>
                  {cell.link && (
                    <ExternalLink className="w-4 h-4 text-neutral-700 group-hover:text-violet-400 transition-colors" />
                  )}
                </div>
              </>
            );

            return cell.link ? (
              <motion.a
                key={index}
                href={cell.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={cellVariants}
                className="bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 p-6 lg:p-8 flex flex-col justify-between rounded-sm soft-glow-hover group cursor-pointer min-h-[220px]"
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={index}
                variants={cellVariants}
                className="bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 p-6 lg:p-8 flex flex-col justify-between rounded-sm group min-h-[220px]"
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
