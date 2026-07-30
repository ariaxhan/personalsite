import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import HackathonsGrid from "../components/HackathonsGrid";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.hackathons }, content.SITE);
}

export default function HackathonsPage() {
  return (
    <main className="relative">
      <HackathonsGrid />
      <StudioFooter />
    </main>
  );
}
