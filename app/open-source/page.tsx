import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { openSourceProjects } from "../utils/projectsData";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.openSource,
});

export default function OpenSourcePage() {
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(openSourceProjects)} />
      <WorkshopWall room="open-source" />
      <StudioFooter />
    </main>
  );
}
