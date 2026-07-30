import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { projectsToWallItems } from "../utils/wallItems";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.systems }, content.SITE);
}

export default async function SystemsPage() {
  const { content } = await getSiteContent();
  const items: WallItem[] = projectsToWallItems(content.productProjects, content);
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(content, content.productProjects)} />
      <WorkshopWall
        {...content.PAGE_COPY.sections.systems}
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
