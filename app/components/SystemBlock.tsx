"use client";

import { motion } from "framer-motion";
import type { SystemData } from "../utils/systemsData";

interface SystemBlockProps {
  system: SystemData;
  index: number;
}

export default function SystemBlock({ system, index }: SystemBlockProps) {
  return (
    <motion.div
      className="bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/40 border-l-2 border-l-violet-500/60 p-8 lg:p-12 mb-12 rounded-sm soft-glow-hover"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12">
        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 pb-4 border-b border-neutral-800/50">
            <h3 className="text-2xl lg:text-3xl font-light text-neutral-100 mb-3 lg:mb-0">
              {system.name}
            </h3>
            <span className="text-xs font-mono text-violet-400/80 border border-violet-500/30 bg-violet-500/5 px-3 py-1.5 rounded-sm w-fit">
              {system.status.replace(/_/g, " ")}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-6">
            {system.description.map((paragraph, idx) => (
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
            {system.evidence}
          </blockquote>
        </div>

        {/* Meta Sidebar */}
        <div className="bg-neutral-900/50 border border-neutral-800/30 p-5 rounded-sm">
          {Object.entries(system.meta).map(([key, value]) => (
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
  );
}
