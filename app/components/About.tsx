"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

const stats: Stat[] = [
  { value: "3", label: "Companies", sublabel: "founded" },
  { value: "6", label: "Hackathons", sublabel: "won" },
  { value: "3,000+", label: "Hours", sublabel: "building" },
  { value: "1", label: "Year", sublabel: "all-in" },
];

const tools = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "FastAPI",
  "LangChain",
  "OpenAI API",
  "Anthropic API",
  "AWS Bedrock",
  "Google Cloud",
  "Convex",
  "Supabase",
  "PostgreSQL",
  "Vector DBs",
  "RAG Systems",
  "Fine-tuning",
  "Prompt Engineering",
  "Multi-agent Systems",
  "RL Frameworks",
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
            I build AI systems<br className="hidden sm:block" /> that actually work.
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-400 leading-relaxed max-w-3xl">
            I&apos;m Aria. I&apos;ve spent the last year building, 
            learning, and thinking about AI. 8-12 hours a day. Almost every day.
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
            {/* Origin */}
            <div>
              <h2 className="text-lg sm:text-xl text-white/90 mb-4 font-light">
                The Background
              </h2>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  I started as a writer. English, history, literature. I spent high school 
                  doing business and debate, but mostly I was writing: essays, poetry, fiction. 
                  That&apos;s how I learned to think: through words.
                </p>
                <p>
                  Then came computer science. Two and a half years of it in college. 
                  Data structures, algorithms, systems. I was good at it, but something 
                  was missing. Coding felt mechanical. I was implementing, not creating.
                </p>
                <p>
                  Then AI changed everything. Suddenly, writing code meant writing prose. 
                  Understanding systems meant understanding language. The skills I&apos;d 
                  built as a writer became 
                  the skills that mattered most.
                </p>
              </div>
            </div>

            {/* What I do */}
            <div>
              <h2 className="text-lg sm:text-xl text-white/90 mb-4 font-light">
                What I Actually Do
              </h2>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  I design and build AI systems. Not just prompts: full architectures. 
                  Multi-agent coordination. Memory systems. Self-improving loops. 
                  The infrastructure that lets AI work together and get better over time.
                </p>
                <p>
                  I read research papers and implement them the same day. I test every 
                  major AI tool and model as they come out. I go to hackathons and build 
                  under pressure. 
                </p>
                <p>
                  Most importantly, I ship. Three companies. Six hackathon wins. 
                  Open-source tools. Production systems. I don&apos;t just think about 
                  this stuff. I build it.
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <div>
              <h2 className="text-lg sm:text-xl text-white/90 mb-4 font-light">
                How I Think About AI
              </h2>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  Most people try to make AI do what they want. I think that&apos;s backwards. 
                  AI has its own nature, its own strengths and patterns. The best systems 
                  don&apos;t fight that. They work with it.
                </p>
                <p>
                  I believe in emergence over explicit programming. In coordination over 
                  raw capability. In letting multiple agents work together rather than 
                  trying to build one perfect model. The complexity comes from composition, 
                  not from any single part.
                </p>
                <p>
                  I also believe that understanding AI is understanding language. The same 
                  skills that make good writing: precision, structure, knowing your audience, also make 
                  good AI systems. That&apos;s why I don&apos;t call myself an engineer anymore. 
                  I&apos;m a writer who builds with code.
                </p>
              </div>
            </div>

            {/* The context */}
            <div>
              <h2 className="text-lg sm:text-xl text-white/90 mb-4 font-light">
                The Context
              </h2>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  I did all of this without a safety net. No salary. No investors. 
                  No degree yet. Just work and curiosity and the conviction that this is 
                  the most important thing I could be doing.
                </p>
                <p>
                  I&apos;ve led teams: UX researchers, designers, engineers, cofounders. I&apos;ve made the 
                  hard calls and lived with the consequences. I&apos;ve failed publicly, 
                  learned quickly, and kept going.
                </p>
                <p>
                  When I say I understand AI 
                  systems, I mean I&apos;ve bet everything on that understanding. And so far, 
                  the evidence says I wasn&apos;t wrong.
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
                Building HeyContext, a multi-agent orchestration platform. Agents that 
                coordinate, learn, and improve through experience.
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">
                Live in beta. Everything I&apos;ve learned, deployed.
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

