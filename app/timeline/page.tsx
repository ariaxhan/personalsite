import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import Timeline from "../components/Timeline";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = pageMeta({
  title: "Timeline | Aria Han",
  description: "A walk through the years: journalism, code, three companies, six hackathon wins, a poetry collection, and a long obsession with memory systems.",
  path: "/timeline/",
});

export default function TimelinePage() {
  return (
    <main className="relative">
      <Timeline />
      <StudioFooter />
    </main>
  );
}
