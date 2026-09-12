import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.systems }, content.SITE);
}

export default async function SystemsPage() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(content, content.productProjects)} />
      <WorkshopWall room="systems" />
      <StudioFooter />
    </main>
  );
}
