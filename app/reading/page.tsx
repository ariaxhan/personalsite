import { Metadata } from "next";
import Bookshelf from "../components/Bookshelf";
import StudioFooter from "../components/StudioFooter";
import { pageMeta } from "../utils/pageMeta";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.reading,
});

export default function ReadingPage() {
  return (
    <main className="relative">
      <Bookshelf />
      <StudioFooter />
    </main>
  );
}
