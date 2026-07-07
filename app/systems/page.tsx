import { Metadata } from "next";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { productProjects } from "../utils/projectsData";
import { projectsToWallItems } from "../utils/wallItems";

export const metadata: Metadata = {
  title: "Systems | Aria Han",
  description:
    "Products and companies Aria Han has shipped, each with the problem it solved, what was built, the stack, live links, verifiable proof, and what it proves she can do. ModelMind, Paper Rooms, our4cuts, HeyContext, HeyContent, and Brink Mind.",
};

const items: WallItem[] = projectsToWallItems(productProjects);

export default function SystemsPage() {
  return (
    <main className="relative">
      <WorkshopWall
        fig="Fig. 02"
        label="Workshop Wall"
        title="The work, pinned up"
        note="Apps and systems, each built around a question I couldn't let go of."
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
