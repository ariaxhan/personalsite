import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { articleListSchema } from "../utils/jsonLd";
import ThinkingSection from "../components/ThinkingSection";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = pageMeta({
  title: "Writing | Aria Han",
  description: "Essays and field notes by Aria Han on multi-agent systems, memory, model behavior, and what actually survives contact with real work.",
  path: "/writing/",
});

export default function WritingPage() {
  return (
    <main className="relative">
      <JsonLd data={articleListSchema()} />
      <ThinkingSection />
      <StudioFooter />
    </main>
  );
}
