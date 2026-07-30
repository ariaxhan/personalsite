import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { articleListSchema } from "../utils/jsonLd";
import ThinkingSection from "../components/ThinkingSection";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.writing }, content.SITE);
}

export default async function WritingPage() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={articleListSchema(content)} />
      <ThinkingSection />
      <StudioFooter />
    </main>
  );
}
