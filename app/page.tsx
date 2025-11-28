import { Metadata } from "next";
import Hero from "./components/Hero";
import EvidenceGrid from "./components/EvidenceGrid";
import SystemBlock from "./components/SystemBlock";
import { systemsData } from "./utils/systemsData";
import ThinkingSection from "./components/ThinkingSection";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import OpenSource from "./components/OpenSource";
import SubstrateBackground from "./components/SubstrateBackground";

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Builder",
  description:
    "Three-time CEO. Six competition wins. 3,000+ hours building production AI systems that work with AI's nature, not against it.",
  keywords: [
    "AI",
    "machine learning",
    "multi-agent systems",
    "reinforcement learning",
    "startup founder",
  ],
  authors: [{ name: "Aria Han" }],
  openGraph: {
    title: "Aria Han | AI Systems Builder",
    description:
      "Three-time CEO. Six competition wins. Building production AI systems.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Cognitive Substrate Background - layered intelligence made visible */}
      <SubstrateBackground />
      
      {/* Main content layer */}
      <div className="relative z-10">
        <Hero />
        <EvidenceGrid />

        {/* Systems Section */}
        <section className="relative py-32 lg:py-40">
          {/* Section background gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(0, 217, 255, 0.04) 0%, transparent 50%),
                radial-gradient(ellipse 40% 50% at 70% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
              `,
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="mb-20">
              <p className="text-data tracking-[0.2em] mb-6">
                <span className="text-cognition/60">□</span> 02_PRODUCTION
              </p>
              <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
                Systems Built
              </h2>
              <p className="text-neutral-400 max-w-xl text-base">
                Production systems that work with AI&apos;s nature, not against it. 
                Each layer builds on the previous.
              </p>
            </div>

            {/* System Blocks */}
            {systemsData.map((system, index) => (
              <SystemBlock key={system.name} system={system} index={index} />
            ))}
          </div>
        </section>

        <OpenSource />
        <ThinkingSection />
        <Timeline />
        <Contact />

        {/* Footer */}
        <footer className="relative border-t border-glass-border py-16">
          {/* Subtle gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(13, 27, 42, 0.3) 100%)",
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-meta">
                  ARIA HAN · SAN FRANCISCO · 2024
                </p>
              </div>
              
              {/* Network status indicator */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cognition animate-pulse shadow-[0_0_8px_rgba(0,217,255,0.5)]" />
                <p className="text-xs text-neutral-500">
                  Building systems that work with AI&apos;s nature
                </p>
              </div>
            </div>
            
            {/* Decorative substrate layers indicator */}
            <div className="mt-12 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, 
                      rgba(0, 217, 255, ${0.3 - i * 0.05}) 0%, 
                      rgba(139, 92, 246, ${0.2 - i * 0.03}) 100%
                    )`,
                    opacity: 1 - i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
