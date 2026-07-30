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
  return pageMeta({ ...content.PAGE_COPY.metadata.openSource }, content.SITE);
}

export default async function OpenSourcePage() {
  const { content } = await getSiteContent();
  const items: WallItem[] = projectsToWallItems(content.openSourceProjects, content);
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(content, content.openSourceProjects)} />
      <WorkshopWall
        {...content.PAGE_COPY.sections.openSource}
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
