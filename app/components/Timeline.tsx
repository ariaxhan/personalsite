"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEntry {
  date: string;
  title: string;
  desc: string;
  type: "company" | "achievement" | "creative" | "practice";
}

const timelineData: TimelineEntry[] = [
  {
    date: "JAN_2026 - PRESENT",
    title: "AI Systems Architecture",
    desc: "Research through building. Developing coordination architectures, agent protocols, self-improving systems. Not just prompt engineering, but real infrastructure. Shipping production systems that prove the methodology.",
    type: "practice",
  },
  {
    date: "SEPT_2025 - JAN_2026",
    title: "PersistOS / HeyContext",
    desc: "Exploring frontier AI concepts and implementing them in production. Live with hundreds of users.",
    type: "company",
  },
  {
    date: "MAR_2025 - SEPT_2025",
    title: "Divertissement / HeyContent",
    desc: "Cross-platform memory architecture across Instagram, YouTube, Gmail. Understanding what breaks when you synthesize data from multiple sources. Integrated into HeyContext.",
    type: "company",
  },
  {
    date: "NOV_2024 - MAR_2025",
    title: "Brink Labs / Brink Mind",
    desc: "Voice AI + Apple Watch biometric integration. Privacy-first mental health tool. Learning what works in theory vs. what works with real humans.",
    type: "company",
  },
  {
    date: "2024 - 2025",
    title: "Six Hackathon Wins",
    desc: "Darwin (AWS). The Convergence (RL Track). Content Creator Connector. TheraVoice. HotAgents. Freetime. Each one built in 24-48 hours, validating ideas under pressure.",
    type: "achievement",
  },
  {
    date: "2024",
    title: "Published Author",
    desc: "'Notes on Surviving Eternity' - poetry collection on Amazon. Exploring time, fate, free will. Understanding metaphor is understanding compression.",
    type: "creative",
  },
];

const typeStyles = {
  practice: {
    color: "data",
    dotBg: "bg-data",
    dotGlow: "shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    lineBg: "from-data/60",
    borderBase: "border-data/30",
    borderHover: "hover:border-data/60",
    tagBg: "bg-data/10",
    tagText: "text-data/80",
    tagBorder: "border-data/20",
    titleHover: "group-hover:text-data",
    traceBg: "from-data/40 via-data/20",
  },
  company: {
    color: "cognition",
    dotBg: "bg-cognition",
    dotGlow: "shadow-[0_0_10px_rgba(0,217,255,0.5)]",
    lineBg: "from-cognition/60",
    borderBase: "border-cognition/30",
    borderHover: "hover:border-cognition/60",
    tagBg: "bg-cognition/10",
    tagText: "text-cognition/80",
    tagBorder: "border-cognition/20",
    titleHover: "group-hover:text-cognition",
    traceBg: "from-cognition/40 via-cognition/20",
  },
  achievement: {
    color: "emergence",
    dotBg: "bg-emergence",
    dotGlow: "shadow-[0_0_10px_rgba(139,92,246,0.5)]",
    lineBg: "from-emergence/60",
    borderBase: "border-emergence/30",
    borderHover: "hover:border-emergence/60",
    tagBg: "bg-emergence/10",
    tagText: "text-emergence/80",
    tagBorder: "border-emergence/20",
    titleHover: "group-hover:text-emergence",
    traceBg: "from-emergence/40 via-emergence/20",
  },
  creative: {
    color: "memory",
    dotBg: "bg-memory",
    dotGlow: "shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    lineBg: "from-memory/60",
    borderBase: "border-memory/30",
    borderHover: "hover:border-memory/60",
    tagBg: "bg-memory/10",
    tagText: "text-memory/80",
    tagBorder: "border-memory/20",
    titleHover: "group-hover:text-memory",
    traceBg: "from-memory/40 via-memory/20",
  },
};

/**
 * TimelineMemory: Past work accumulating in the substrate
 * 
 * Concept: Time as the third dimension. Recent events are bright and present;
 * older events fade into depth, like sediment layers in an archaeological dig.
 * The visual suggests memory: accumulated experience that forms the foundation
 * of current capability. Scrolling is traveling through time.
 */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient suggesting depth/time */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(13, 27, 42, 0.3) 30%,
              rgba(13, 27, 42, 0.5) 100%
            )
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
            <span className="text-memory/60">◈</span> 04_TRAJECTORY
          </p>
          <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
            Timeline
          </h2>
          <p className="text-neutral-400 max-w-xl text-base">
            Three companies, six hackathon wins, hundreds of builders met. The last 12 months.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline spine with gradient fade */}
          <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-cognition/50 via-emergence/30 to-memory/20" />
            {/* Animated pulse traveling down the line */}
            <motion.div
              className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-cognition to-transparent"
              animate={{ y: ["-100%", "500%"] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 2,
              }}
              style={{ opacity: 0.5 }}
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-8">
            {timelineData.map((entry, index) => {
              const style = typeStyles[entry.type];
              const depth = index / (timelineData.length - 1); // 0 to 1
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative pl-16 lg:pl-24"
                  style={{
                    // Depth effect: older entries slightly faded and smaller
                    opacity: 1 - depth * 0.15,
                    transform: `scale(${1 - depth * 0.02})`,
                  }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 lg:left-8 top-2">
                    {/* Outer glow ring */}
                    <div 
                      className={`
                        absolute -inset-2 rounded-full 
                        ${style.dotBg} opacity-20 blur-sm
                      `}
                    />
                    {/* Node dot */}
                    <div 
                      className={`
                        relative w-4 h-4 rounded-full 
                        ${style.dotBg} ${style.dotGlow}
                        ring-2 ring-substrate-void
                      `}
                    />
                    {/* Connection line to content */}
                    <div 
                      className={`
                        absolute left-full top-1/2 w-6 lg:w-10 h-px
                        bg-gradient-to-r ${style.lineBg} to-transparent
                      `}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`
                      glass-panel p-6 lg:p-8 group
                      border-l-2 ${style.borderBase}
                      ${style.borderHover}
                      transition-all duration-400
                    `}
                  >
                    {/* Date stamp */}
                    <p className="text-meta mb-3 flex items-center gap-3">
                      <span>{entry.date}</span>
                      <span className={`
                        px-2 py-0.5 rounded text-[10px] uppercase
                        ${style.tagBg} ${style.tagText}
                        border ${style.tagBorder}
                      `}>
                        {entry.type}
                      </span>
                    </p>

                    {/* Title */}
                    <h3 className={`
                      text-xl lg:text-2xl text-display font-light mb-4
                      ${style.titleHover}
                      transition-colors duration-300
                    `}>
                      {entry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-400 leading-relaxed">
                      {entry.desc}
                    </p>

                    {/* Memory trace - appears on hover */}
                    <div
                      className={`
                        absolute bottom-0 left-0 right-0 h-px
                        bg-gradient-to-r ${style.traceBg} to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                      `}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline terminus - fading into deeper past */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative mt-12 pl-16 lg:pl-24"
          >
            <div className="absolute left-4 lg:left-8 top-0">
              <div className="w-4 h-4 rounded-full bg-substrate-mid/50 ring-1 ring-glass-border" />
            </div>
            <p className="text-neutral-600 text-sm italic">
              ...and the substrate continues to accumulate
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
