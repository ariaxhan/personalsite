"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { SystemData } from "../utils/systemsData";

interface SystemBlockProps {
  system: SystemData;
  index: number;
}

const statusColors: Record<string, { border: string; text: string; glow: string; bg: string }> = {
  SHIPPED: {
    border: "border-emergence/50",
    text: "text-emergence",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    bg: "bg-emergence/10",
  },
  LIVE_BETA: {
    border: "border-cognition/50",
    text: "text-cognition",
    glow: "shadow-[0_0_15px_rgba(0,217,255,0.3)]",
    bg: "bg-cognition/10",
  },
  INTEGRATED: {
    border: "border-emergence/50",
    text: "text-emergence",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    bg: "bg-emergence/10",
  },
  HACKATHON_WINNER: {
    border: "border-memory/50",
    text: "text-memory",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)]",
    bg: "bg-memory/10",
  },
};

/**
 * SystemBlock: Projects as layers in the cognitive substrate
 * 
 * Concept: Each project is a glass plane floating in cognitive space.
 * The visual suggests archaeology - digging through layers of work,
 * each built on the previous. Expanding reveals the depth beneath.
 */
export default function SystemBlock({ system, index }: SystemBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusStyle = statusColors[system.status] || statusColors.INTEGRATED;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="mb-10"
    >
      <div
        className={`
          glass-panel relative overflow-hidden
          border-l-2 ${statusStyle.border}
          p-8 lg:p-12
          transition-all duration-500 ease-out
          cursor-pointer group
          ${isExpanded ? statusStyle.glow : ""}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded ? "true" : "false"}
      >
        {/* Active state indicator - cognitive processing */}
        {system.status === "LIVE_BETA" && (
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cognition/50 to-transparent animate-pulse" />
          </div>
        )}

        {/* Hover/expanded background effect */}
        <div 
          className={`
            absolute inset-0 transition-opacity duration-500
            bg-gradient-to-br from-glass-white via-transparent to-transparent
            ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
          `}
        />

        {/* Main content grid */}
        <div className="relative grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
          {/* Left: Primary content */}
          <div>
            {/* Header with status */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
              <div>
                <motion.h3 
                  className={`
                    text-2xl lg:text-3xl text-display font-light
                    transition-colors duration-300
                    ${isExpanded ? statusStyle.text : "text-white/90"}
                  `}
                >
                  {system.name}
                </motion.h3>
                
                {/* Expand indicator */}
                <p className="text-meta mt-2 opacity-60">
                  {isExpanded ? "↑ COLLAPSE" : "↓ EXPAND LAYER"}
                </p>
              </div>

              {/* Status badge */}
              <span 
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded
                  text-xs font-mono uppercase tracking-wider
                  border ${statusStyle.border} ${statusStyle.bg}
                  ${statusStyle.text}
                `}
              >
                <span 
                  className={`w-1.5 h-1.5 rounded-full bg-current ${
                    system.status === "LIVE_BETA" ? "animate-pulse" : ""
                  }`}
                />
                {system.status.replace(/_/g, " ")}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-8">
              {system.description.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base text-neutral-400 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Evidence quote - insight from the work */}
            <motion.blockquote 
              initial={false}
              animate={{ 
                opacity: isExpanded ? 1 : 0.7,
                x: isExpanded ? 0 : -10,
              }}
              transition={{ duration: 0.4 }}
              className={`
                relative pl-6 py-4
                border-l-2 border-emergence/30
                text-sm italic leading-relaxed
                ${isExpanded ? "text-emergence/90" : "text-emergence/60"}
              `}
            >
              {system.evidence}
            </motion.blockquote>
          </div>

          {/* Right: Meta sidebar */}
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0.8,
              scale: isExpanded ? 1 : 0.98,
            }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div 
              className={`
                p-6 rounded-lg
                bg-substrate-deep/80 border border-glass-border
                backdrop-blur-sm
                transition-all duration-500
                ${isExpanded ? "border-cognition/20" : ""}
              `}
            >
              {/* Meta label */}
              <p className="text-meta mb-6 pb-2 border-b border-glass-border">
                SYSTEM METADATA
              </p>

              {/* Meta entries */}
              {Object.entries(system.meta).map(([key, value], idx) => (
                <motion.div 
                  key={key}
                  initial={false}
                  animate={{
                    opacity: isExpanded ? 1 : 0.7,
                    x: isExpanded ? 0 : 5,
                  }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="mb-5 last:mb-0"
                >
                  <p className="text-xs uppercase text-neutral-600 tracking-wider mb-1">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${isExpanded ? "text-neutral-200" : "text-neutral-400"}
                  `}>
                    {value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Layer depth indicator */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-glass-border to-transparent" />
              <span className="text-xs text-neutral-600 font-mono">
                LAYER_{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Expanded state: Network connection visualization */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-cognition/40"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
