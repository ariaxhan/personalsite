import { Metadata } from "next";
import Hero from "./components/Hero";
import EvidenceGrid from "./components/EvidenceGrid";
import SystemBlock from "./components/SystemBlock";
import { systemsData } from "./utils/systemsData";
import ThinkingSection from "./components/ThinkingSection";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <EvidenceGrid />

      {/* Systems Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-xs font-mono text-gray-500 mb-4">
              02_PRODUCTION
            </p>
            <h2 className="text-4xl lg:text-6xl font-light">Systems Built</h2>
          </div>

          {/* System Blocks */}
          {systemsData.map((system, index) => (
            <SystemBlock key={system.name} system={system} index={index} />
          ))}
        </div>
      </section>

      <ThinkingSection />
      <Timeline />
      <Contact />

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 font-mono">
                ARIA HAN · SAN FRANCISCO · 2024
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-600">
                Building systems that work with AI&apos;s nature, not against it.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
