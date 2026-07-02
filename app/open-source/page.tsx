import { Metadata } from "next";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { repos } from "../utils/studioData";

export const metadata: Metadata = {
  title: "Open Source | Aria Han",
  description:
    "Public work from Aria Han: KERNEL, the-agent-library, llm-bench, model-familiarity-engine, metabrain, Substrate, and latent-diagnostics. Agent memory, LLM evaluation, benchmarks, and computational poetry.",
};

// Editorial risograph plates, one per repo.
const art: Record<string, string> = {
  "the-agent-library": "/studio/repo-agent-library.jpg",
  KERNEL: "/studio/repo-kernel.jpg",
  "llm-bench": "/studio/repo-llm-bench.jpg",
  "model-familiarity-engine": "/studio/repo-model-familiarity.jpg",
  metabrain: "/studio/repo-metabrain.jpg",
  Substrate: "/studio/repo-substrate.jpg",
  "latent-diagnostics": "/studio/repo-latent-diagnostics.jpg",
};

const items: WallItem[] = repos.map((r) => ({
  title: r.name,
  tag: "Open Source",
  accent: r.accent,
  hook: r.evidence,
  body: r.description,
  meta: r.meta,
  link: { label: "View repository", href: r.url },
  image: art[r.name],
  images: art[r.name] ? [art[r.name]] : undefined,
}));

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
