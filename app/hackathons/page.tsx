import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import HackathonsGrid from "../components/HackathonsGrid";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.hackathons,
});

export default function HackathonsPage() {
  return (
    <main className="relative">
      <HackathonsGrid />
      <StudioFooter />
    </main>
  );
}
