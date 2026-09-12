"use client";

import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import ProjectReviewForm from "./ProjectReviewForm";
import { useSiteCopy } from "./LocaleProvider";

export default function ProjectReviewRoom() {
  const { PAGE_COPY } = useSiteCopy();

  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: "calc(var(--masthead-height, 7.5rem) + 1.75rem)" }}>
      <SectionHeader as="h1" {...PAGE_COPY.projectReview.header} />
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
  );
}
