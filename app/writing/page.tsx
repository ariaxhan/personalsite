import { Metadata } from "next";
import ThinkingSection from "../components/ThinkingSection";

export const metadata: Metadata = {
  title: "Writing | Aria Han",
  description: "Technical writing on AI development, multi-agent systems, and building meaningful technology.",
};

export default function WritingPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <ThinkingSection />
    </main>
  );
}



