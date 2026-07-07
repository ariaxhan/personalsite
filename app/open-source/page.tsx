import { Metadata } from "next";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { openSourceProjects } from "../utils/projectsData";
import { projectsToWallItems } from "../utils/wallItems";

export const metadata: Metadata = {
  title: "Open Source | Aria Han",
  description:
    "Public and research work from Aria Han, each with the problem, what was built, the stack, repository links, verifiable proof, and what it proves. KERNEL, llm-bench, the-agent-library, model-familiarity-engine, metabrain, Substrate, and latent-diagnostics: agent memory, LLM evaluation, and a daily generative-art pipeline.",
};

const items: WallItem[] = projectsToWallItems(openSourceProjects);

export default function OpenSourcePage() {
  return (
    <main className="relative">
      <WorkshopWall
        fig="Fig. 02b"
        label="Open Source"
        title="Public work, in the open"
        note="Memory, benchmarks, evaluation, and a daily art experiment. All readable, all installable. Contributions welcome."
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
