import { Metadata } from "next";
import Bookshelf from "../components/Bookshelf";
import StudioFooter from "../components/StudioFooter";
import { pageMeta } from "../utils/pageMeta";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.reading }, content.SITE);
}

export default function ReadingPage() {
  return (
    <main className="relative">
      <Bookshelf />
      <StudioFooter />
    </main>
  );
}
