"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface Article {
  title: string;
  excerpt: string;
  link: string;
}

const articlesData: Article[] = [
  {
    title: "What Happens When Agents Start Talking to Each Other",
    excerpt:
      "Exploring what emerges when AI agents coordinate directly—the protocols, patterns, and unexpected behaviors that develop without human design.",
    link: "https://medium.com/@ariahan/what-happens-when-agents-start-talking-to-each-other-1ff00ce8f36c",
  },
  {
    title: "How I Turned Cursor Into a Self-Learning Agent Civilization",
    excerpt:
      "Documentation of building systems where agents improve through experience and evolutionary pressure, not traditional reward functions.",
    link: "https://medium.com/@ariahan/how-i-turned-cursor-into-a-self-learning-agent-civilization-7a149e6f34e8",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ThinkingSection() {
  return (
    <section className="py-20 lg:py-28 section-gradient relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-violet-400/60 mb-4 tracking-wider">
            TECHNICAL WRITING
          </p>
          <h2 className="text-3xl lg:text-5xl font-light text-neutral-100 mb-4">
            Writing
          </h2>
          <p className="text-neutral-500 max-w-xl text-base leading-relaxed">
            Thoughts on AI development, building meaningful technology, 
            and the intersection of technical craft and creative thinking.
          </p>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          className="flex flex-wrap gap-6 lg:gap-10 mb-10 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <span className="text-neutral-600 uppercase tracking-wider text-xs">
              Platform
            </span>
            <p className="text-neutral-300 mt-1">Medium</p>
          </div>
          <div>
            <span className="text-neutral-600 uppercase tracking-wider text-xs">
              Focus
            </span>
            <p className="text-neutral-300 mt-1">AI, Agents, Building</p>
          </div>
          <div>
            <span className="text-neutral-600 uppercase tracking-wider text-xs">
              Style
            </span>
            <p className="text-neutral-300 mt-1">Technical + Thoughtful</p>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {articlesData.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 p-8 lg:p-10 rounded-sm soft-glow-hover block"
            >
              {/* Hover accent line */}
              <div className="absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-violet-500 to-amber-500/50 transition-all duration-300 group-hover:h-full rounded-full" />

              <h3 className="text-lg lg:text-xl font-normal mb-4 text-neutral-200 group-hover:text-violet-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-violet-400/70 uppercase tracking-wider">
                <span>Read on Medium</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Read More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://medium.com/@ariahan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base text-neutral-400 hover:text-violet-300 transition-colors group"
          >
            <span>All articles on Medium</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
