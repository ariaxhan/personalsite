import { Metadata } from "next";
import SystemBlock from "../components/SystemBlock";
import { systemsData } from "../utils/systemsData";

export const metadata: Metadata = {
  title: "Systems | Aria Han",
  description: "Production AI systems that work with AI's nature, not against it. Multi-agent orchestration, cross-platform memory, voice AI with biometrics.",
};

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
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
    </main>
  );
}



