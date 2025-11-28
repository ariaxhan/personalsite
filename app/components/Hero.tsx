"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatItem {
  label: string;
  value: string;
  color: "cognition" | "emergence" | "memory" | "data";
}

const stats: StatItem[] = [
  { label: "Companies Founded", value: "3", color: "cognition" },
  { label: "hackathons Won", value: "6", color: "emergence" },
  { label: "Hours Building", value: "3000+", color: "memory" },
  { label: "Systems Live", value: "3", color: "data" },
];

const colorMap = {
  cognition: {
    text: "text-cognition",
    border: "border-cognition/30",
    glow: "shadow-cognition",
    bg: "bg-cognition/5",
  },
  emergence: {
    text: "text-emergence",
    border: "border-emergence/30",
    glow: "shadow-emergence",
    bg: "bg-emergence/5",
  },
  memory: {
    text: "text-memory",
    border: "border-memory/30",
    glow: "shadow-memory",
    bg: "bg-memory/5",
  },
  data: {
    text: "text-data",
    border: "border-data/30",
    glow: "shadow-data",
    bg: "bg-data/5",
  },
};

/**
 * CognitiveHero: Name emerging from the substrate
 * 
 * Concept: The identity floats on glass layers above the cognitive substrate.
 * Stats pulse with different cognitive states - each color represents a different
 * type of information. The hero breathes with subtle ambient motion, indicating
 * an active, living system.
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left: Identity emerging from substrate */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Meta label - data structure aesthetic */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-data tracking-[0.2em] mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm"
            >
              <span className="text-cognition/60">○</span> AI EXPERT · FOUNDER · BUILDER
            </motion.p>

            {/* Name with glow effect */}
            <div className="relative">
              {/* Glow layer behind text */}
              <div
                className="absolute inset-0 blur-3xl opacity-20"
                style={{
                  background: "linear-gradient(135deg, #00d9ff 0%, #8b5cf6 50%, #fbbf24 100%)",
                }}
                aria-hidden="true"
              />
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative text-display text-[clamp(4rem,12vw,8rem)] leading-[0.9] tracking-[-0.03em] font-extralight"
              >
                <span className="block">Aria</span>
                <span className="block text-white/90">Han</span>
              </motion.h1>
            </div>

            {/* Description - information being processed */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-[50ch]"
            >
              Building AI systems that understand how intelligence actually works.
              Three companies, six hackathon wins, and thousands of hours
              exploring what&apos;s possible when you work with AI&apos;s nature.
            </motion.p>

            {/* Location + Time - memory timestamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 sm:mt-8 lg:mt-10 flex items-center gap-3 sm:gap-4"
            >
              <span className="text-meta text-[0.6875rem] sm:text-sm">SAN FRANCISCO · 2024</span>
              <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-cognition/50 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right: Evidence stats as glass cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Decorative connection line */}
            <div className="absolute -left-8 lg:-left-12 top-1/2 w-8 lg:w-12 h-px bg-gradient-to-r from-transparent to-cognition/30 hidden lg:block" />
            
            <div className="space-y-3 sm:space-y-4">
              {stats.map((stat, index) => {
                const colors = colorMap[stat.color];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.classList.add('touch-active');
                    }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        e.currentTarget.classList.remove('touch-active');
                      }, 300);
                    }}
                    className={`
                      glass-panel group relative overflow-hidden
                      p-4 sm:p-5 lg:p-6 cursor-default touch-manipulation
                      ${colors.glow}
                    `}
                  >
                    {/* Animated border gradient on hover */}
                    <div 
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100 group-touch-active:opacity-100 
                        transition-opacity duration-500
                        bg-gradient-to-r ${colors.bg} via-transparent to-transparent
                      `}
                    />
                    
                    {/* Pulsing indicator */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <span 
                        className={`
                          block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${colors.bg} ${colors.text}
                          animate-pulse
                        `}
                        style={{
                          boxShadow: `0 0 8px currentColor`,
                          animationDelay: `${index * 200}ms`,
                        }}
                      />
                    </div>

                    <div className="relative">
                      <p className="text-meta mb-1.5 sm:mb-2 text-[0.6875rem] sm:text-sm">{stat.label}</p>
                      <p className={`text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight ${colors.text}`}>
                        {mounted ? stat.value : ";"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-meta tracking-wider text-[0.6875rem] sm:text-sm">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 sm:h-8 bg-gradient-to-b from-cognition/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
