"use client";

import { motion } from "framer-motion";

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { label: "Companies Founded", value: "03" },
  { label: "Competitions Won", value: "06" },
  { label: "Hours Building", value: "3K+" },
  { label: "Systems Live", value: "03" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center py-24 lg:py-32 hero-gradient particle-overlay relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side - Name and Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p 
              className="text-sm font-mono text-violet-400/80 mb-4 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              AI EXPERT · FOUNDER · BUILDER
            </motion.p>
            <h1 className="text-5xl lg:text-8xl font-extralight tracking-tight leading-none mb-8">
              <span className="text-gradient">Aria</span>
              <br />
              <span className="text-white/90">Han</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
              Building AI systems that understand how intelligence actually works. 
              Three companies, six competition wins, and thousands of hours spent 
              exploring what&apos;s possible when you work <em className="text-violet-300/80 not-italic">with</em> AI&apos;s nature.
            </p>
            
            {/* Subtle decorative element */}
            <motion.div 
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
              <span className="text-xs text-neutral-500 font-mono">San Francisco</span>
            </motion.div>
          </motion.div>

          {/* Right Side - Stats Panel */}
          <motion.div
            className="relative bg-neutral-950/80 backdrop-blur-sm border border-neutral-800/50 p-8 lg:p-12 rounded-sm warm-glow"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Timestamp */}
            <span className="absolute top-4 right-4 text-xs font-mono text-neutral-600">
              2024.11
            </span>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className={`py-5 ${
                    index !== stats.length - 1
                      ? "border-b border-neutral-800/50"
                      : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-4xl lg:text-5xl font-extralight text-gradient">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
