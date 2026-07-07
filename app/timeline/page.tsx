import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import Timeline from "../components/Timeline";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.timeline,
});

export default function TimelinePage() {
  return (
    <main className="relative">
      <Timeline />
      <StudioFooter />
    </main>
  );
}
