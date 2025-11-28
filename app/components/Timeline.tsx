"use client";

import { motion } from "framer-motion";

interface TimelineEntry {
  date: string;
  title: string;
  desc: string;
}

const timelineData: TimelineEntry[] = [
  {
    date: "SEPT_2025 - PRESENT",
    title: "PersistOS / HeyContext",
    desc: "Founded. Building HeyContext: multi-agent orchestration platform. 17+ agent types. Adaptive coordination. The Convergence framework integrated. Live in beta. <br/> Learned: coordination overhead dominates token costs, emergent agent behavior, long-horizon system design.",
  },
  {
    date: "MAR_2025 - SEPT_2025",
    title: "Divertissement / HeyContent",
    desc: "Founded. Built cross-platform memory system. Instagram, YouTube, Gmail, notes integration. <br/> Learned: semantic linking, real-time sync, context management across platforms. Technology integrated into next system.",
  },
  {
    date: "NOV_2024 - MAR_2025",
    title: "Brink Labs / Brink Mind",
    desc: "Founded. Built voice AI with biometric integration. iOS + watchOS. Won hackathon. <br/> Learned: multimodal signal fusion, real-time processing constraints, on-device vs cloud trade-offs.",
  },
  {
    date: "2024 - 2025",
    title: "Six Hackathon Wins",
    desc: "AWS AI Agents. Weavehacks-2 RL Track. Multimodal AI Agents. Vertical Specific AI. GPT-4o vs Gemini. AI Agents 2.0 Finalist. Each validates different aspect of approach. Rapid iteration under pressure. Public judgment. Validation that frameworks hold.",
  },
  {
    date: "2024",
    title: "Published Author",
    desc: "'Notes on Surviving Eternity' - poetry collection on Amazon. Exploring time, fate, free will. Same pattern recognition as technical work, different substrate. Understanding metaphor is understanding compression.",
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

export default function Timeline() {
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
          <p className="text-xs font-mono text-gray-500 mb-4">04_TRAJECTORY</p>
          <h2 className="text-4xl lg:text-6xl font-light">Year of Fire</h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative pl-12 lg:pl-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800" />

          {/* Timeline Entries */}
          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              variants={entryVariants}
              className={`relative mb-12 pb-12 ${
                index !== timelineData.length - 1
                  ? "border-b border-gray-800"
                  : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute -left-[52px] lg:-left-[68px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500" />

              <p className="text-xs font-mono text-gray-500 mb-3">
                {entry.date}
              </p>
              <h3 className="text-xl lg:text-2xl font-normal mb-3">
                {entry.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed max-w-3xl">
                {entry.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

