import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { projectListSchema } from "../utils/jsonLd";
import WorkshopWall from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { productProjects } from "../utils/projectsData";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.systems,
});

export default function SystemsPage() {
  return (
    <main className="relative">
      <JsonLd data={projectListSchema(productProjects)} />
      <WorkshopWall room="systems" />
      <StudioFooter />
    </main>
  );
}
