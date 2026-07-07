import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { productProjects } from "../utils/projectsData";
import { projectsToWallItems } from "../utils/wallItems";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.systems,
});

const items: WallItem[] = projectsToWallItems(productProjects);

export default function SystemsPage() {
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(productProjects, "/systems/")} />
      <WorkshopWall
        {...PAGE_COPY.sections.systems}
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
