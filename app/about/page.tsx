import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import About from "../components/About";
import CuriosityMap from "../components/CuriosityMap";
import Obsessions from "../components/Obsessions";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.about,
});

export default function AboutPage() {
  return (
    <main className="relative">
      <About />
      <CuriosityMap />
      <Obsessions />
      <StudioFooter />
    </main>
  );
}
