import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { articleListSchema } from "../utils/jsonLd";
import ThinkingSection from "../components/ThinkingSection";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.writing,
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
