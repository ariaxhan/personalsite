import { Metadata } from "next";
import ThinkingSection from "../components/ThinkingSection";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = {
  title: "Writing | Aria Han",
  description:
    "Essays and field notes by Aria Han on multi-agent systems, memory, model behavior, and what actually survives contact with real work.",
};

export default function WritingPage() {
  return (
    <main className="relative">
      <ThinkingSection />
      <StudioFooter />
    </main>
  );
}
