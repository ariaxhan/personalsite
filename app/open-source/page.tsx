import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.openSource }, content.SITE);
}

export default async function OpenSourcePage() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(content, content.openSourceProjects)} />
      <WorkshopWall room="open-source" />
      <StudioFooter />
    </main>
  );
}
