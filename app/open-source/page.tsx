import { Metadata } from "next";
import OpenSource from "../components/OpenSource";

export const metadata: Metadata = {
  title: "Open Source | Aria Han",
  description: "metabrain self-improving agent memory, KERNEL agent-development plugin, llm-bench local LLM benchmark, Vector Native A2A protocol, and Armature self-improving agent framework. Building blocks for multi-agent systems.",
};

export default function OpenSourcePage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <OpenSource />
    </main>
  );
}




