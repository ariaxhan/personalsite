import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import Timeline from "../components/Timeline";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.timeline }, content.SITE);
}

export default function TimelinePage() {
  return (
    <main className="relative">
      <Timeline />
      <StudioFooter />
    </main>
  );
}
