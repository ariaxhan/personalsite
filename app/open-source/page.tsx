import { Metadata } from "next";
import OpenSource from "../components/OpenSource";

export const metadata: Metadata = {
  title: "Open Source | Aria Han",
  description: "Current public work from Aria Han: KERNEL, llm-bench, model-familiarity-engine, the-agent-library, metabrain, Substrate, and latent-diagnostics. Agent infrastructure, benchmarks, model familiarity, portable skills, memory, and computational poetry.",
};

export default function OpenSourcePage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <OpenSource />
    </main>
  );
}


