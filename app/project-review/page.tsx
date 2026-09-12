import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import ProjectReviewRoom from "../components/ProjectReviewRoom";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.projectReview,
});

export default function ProjectReviewPage() {
  return (
    <main className="relative">
      <ProjectReviewRoom />
      <StudioFooter />
    </main>
  );
}
