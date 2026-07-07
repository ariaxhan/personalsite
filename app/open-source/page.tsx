import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { openSourceProjects } from "../utils/projectsData";
import { projectsToWallItems } from "../utils/wallItems";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.openSource,
});

const items: WallItem[] = projectsToWallItems(openSourceProjects);

export default function OpenSourcePage() {
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(openSourceProjects, "/open-source/")} />
      <WorkshopWall
        {...PAGE_COPY.sections.openSource}
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
