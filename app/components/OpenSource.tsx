"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
      "A symbolic communication protocol that turns natural language into queryable, reusable knowledge. Structured symbols eliminate ambiguity—precision is the goal, token savings are the side effect.",
      "LLMs speak their native language: vector operations, not English. Designed for agent-to-agent communication, system instructions, and knowledge management where precision and reusability matter.",
    ],
    url: "https://github.com/persist-os/vector-native",
    evidence:
      "Structured symbols leverage pre-trained associations from training data. Not just abbreviations—symbols trigger statistical patterns from math, programming, and config files.",
    meta: {
      status: "Active Development",
      language: "Python",
      license: "MIT",
    },
  },
  {
    name: "The Convergence",
    description: [
      "RL framework where agents improve through experience and evolutionary pressure. Multi-armed bandit for adaptive selection. Weak behaviors die, strong behaviors survive and propagate.",
      "Published to PyPI. Integrated into HeyContext production. Won Reinforcement Learning Track at Weavehacks-2. Community contributions active.",
    ],
    url: "https://github.com/persist-os/the-convergence",
    evidence:
      "Agents don't need explicit reward functions—they need environments rich enough to generate natural selection pressure. Quality emerges from competition.",
    meta: {
      method: "Evolutionary selection + continuous learning",
      validation: "Hackathon winner · Production deployed",
      distribution: "PyPI package · GitHub",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const entryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function OpenSource() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-gray-500 mb-4">03_OPEN_SOURCE</p>
          <h2 className="text-4xl lg:text-6xl font-light">Open Source</h2>
        </motion.div>

        {/* Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {openSourceProjects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={entryVariants}
              className="bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 border-l-2 border-l-violet-500/60 p-8 lg:p-12 mb-12 rounded-sm soft-glow-hover"
            >
              <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12">
                {/* Main Content */}
                <div>
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 pb-4 border-b border-neutral-800/50">
                    <div className="flex items-center gap-3 mb-3 lg:mb-0">
                      <h3 className="text-2xl lg:text-3xl font-light text-neutral-100">
                        {project.name}
                      </h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400/80 hover:text-violet-300 transition-colors"
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3 mb-6">
                    {project.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-base text-neutral-400 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Evidence Quote */}
                  <blockquote className="text-sm text-violet-300/70 italic pl-4 border-l border-violet-500/30 my-4">
                    {project.evidence}
                  </blockquote>
                </div>

                {/* Meta Sidebar */}
                <div className="bg-neutral-900/50 border border-neutral-800/30 p-5 rounded-sm">
                  {Object.entries(project.meta).map(([key, value]) => (
                    <div key={key} className="mb-4 last:mb-0">
                      <p className="text-xs uppercase text-neutral-600 mb-1 tracking-wider">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-neutral-300">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

