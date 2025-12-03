"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

const stats: Stat[] = [
  { value: "3x", label: "CEO", sublabel: "founded" },
  { value: "6", label: "Hackathons", sublabel: "won" },
  { value: "3,300+", label: "Hours", sublabel: "building AI systems" },
  { value: "1", label: "Year", sublabel: "all in" },
];

const tools = [
	"Multi-agent Orchestration",
	"Coordination Protocols",
	"Cursor Mastery",
	"Reinforcement Learning",
	"Memory Systems",
	"Prompt Architecture",
	"Agno",
	"Weave",
	"Google Cloud",
	"AWS Bedrock",
	"Convex",
	"Vercel",
];

/**
 * About: The comprehensive introduction
 * 
 * Not a resume. Not a pitch. Just who I am and what I've done.
 */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <p className="text-data tracking-[0.2em] mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="text-cognition/60">○</span> ABOUT
          </p>
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white/90 mb-6 sm:mb-8 leading-[0.95]">
            Background
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-400 leading-relaxed max-w-3xl">
            Writer turned engineer. I spent years studying how language creates meaning. For the past year, I&apos;ve applied that to how machines communicate.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-panel p-5 sm:p-6 lg:p-8 text-center"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white/90 mb-1 sm:mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-mono">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="text-[0.625rem] sm:text-xs text-neutral-600 font-mono">
                  {stat.sublabel}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
          {/* Left column - narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 sm:space-y-10"
          >
            <div>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  English was never my first language, but it&apos;s always been my favorite subject. I spent most of my life reading and writing endlessly—debating ideas, reporting stories, diving into text. 
                </p>
                <p>
                  Then I discovered computer science. And I realized something that changed everything: it was just writing. Different syntax, different rules, but writing all the same. The ability to create elaborate systems, to build and control with precision using strange new languages—it felt surreal.
                </p>
                <p>
                  But at the end of last year, I came full circle.
                </p>
                <p>
                  I started my first company after a hackathon win earned through hours of intensive thinking and prompting. I didn&apos;t realize it then, but from that moment forward, I wasn&apos;t writing code anymore. I was writing English—the language I&apos;d already spent my life perfecting, just channeled through a new medium.
                </p>
                <p>
                  Over the past year, I&apos;ve spent 3,300+ hours immersed in AI. Cursor evolved from a convenient tool into something I use constantly—8-12 hours daily, alongside ChatGPT, Claude, Gemini. I&apos;ve attended dozens of hackathons and AI events across San Francisco, hands-on with cutting-edge technology, talking directly with the people who built the infrastructure defining this generation.
                </p>
                <p>
                  I&apos;ve seen the wave. I&apos;m riding it.
                </p>
                <p>
                  But here&apos;s what I&apos;ve learned: we&apos;re not using AI correctly.
                </p>
                <p>
                  Most people are optimizing for the wrong things. They&apos;re building chatbots when they should be building coordination systems. They&apos;re replacing human thought instead of augmenting it. They&apos;re solving the problem they know how to solve instead of the problem that actually matters.
                </p>
                <p>
                  I&apos;ve built three production platforms, won six hackathons, and published open-source frameworks. I&apos;ve led teams and made hard calls. I&apos;ve failed publicly and kept going. Why?
                </p>
                <p>
                  Because I believe AI should give people back their time. It should make us more human, more creative, more focused on the things that require actual thinking. Use AI to synthesize research, not do it. Use AI to build systems, not have mindless conversations. Use AI as infrastructure for human intelligence, not as a replacement for it.
                </p>
                <p>
                  When I say I understand AI systems, I mean I&apos;ve bet everything on that understanding. I&apos;ve lived in production systems for over a year. I&apos;ve optimized not just what we built, but how we worked—constantly challenging existing notions of what&apos;s possible. I&apos;ve studied the landscape thoroughly enough to know what&apos;s real and what&apos;s hype.
                  
                  And I keep learning.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column - tools & links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Tools */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4 sm:mb-6">
                What I Work With
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[0.625rem] sm:text-xs font-mono
                             bg-substrate-deep border border-glass-border rounded
                             text-neutral-400 hover:text-cognition hover:border-cognition/30
                             transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Current focus */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
                Current Focus
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                HeyContext—multi-agent orchestration platform. Live in beta with real users.
              </p>
            </div>

            {/* Location */}
            <div className="glass-panel p-5 sm:p-6 lg:p-8">
              <h3 className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
                Location
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base">
                San Francisco, CA
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

