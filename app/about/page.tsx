import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import About from "../components/About";
import CuriosityMap from "../components/CuriosityMap";
import Obsessions from "../components/Obsessions";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = pageMeta({
  title: "About | Aria Han",
  description: "From journalism to AI systems architecture. Aria Han on language, memory, and building AI tools worth trusting.",
  path: "/about/",
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
