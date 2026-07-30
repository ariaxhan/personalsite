import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import ProjectReviewForm from "../components/ProjectReviewForm";
import StudioFooter from "../components/StudioFooter";
import SectionHeader from "../components/studio/SectionHeader";
import Reveal from "../components/studio/Reveal";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.projectReview }, content.SITE);
}

export default async function ProjectReviewPage() {
  const { content: { PAGE_COPY } } = await getSiteContent();
  return (
    <main className="relative">
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
        <SectionHeader
          as="h1"
          {...PAGE_COPY.projectReview.header}
        />

        <Reveal className="mt-12 mb-10 max-w-[760px]">
          <p className="m-0 font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.12] text-ink">
            {PAGE_COPY.projectReview.intro}
          </p>
          <p className="m-0 mt-5 text-[16.5px] leading-[1.75] text-ink-muted">
            {PAGE_COPY.projectReview.note}
          </p>
        </Reveal>

        <Reveal>
          <ProjectReviewForm />
        </Reveal>
      </section>
      <StudioFooter />
    </main>
  );
}
