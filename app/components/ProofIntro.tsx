"use client";

import SectionHeader from "./studio/SectionHeader";
import { GRAND_TOTAL, REPO_COUNT, motionData, monthLabel } from "./motion/motionShared";
import { useSiteCopy } from "./LocaleProvider";

export default function ProofIntro() {
  const { PAGE_COPY } = useSiteCopy();
  const total = GRAND_TOTAL.toLocaleString();
  const span = `${monthLabel(motionData.firstMonth)} to ${monthLabel(motionData.lastMonth)}`;

  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-32 pb-4 sm:px-8 sm:pt-40 lg:px-14">
      <SectionHeader as="h1" {...PAGE_COPY.proof.header} />
      <div className="mt-12 max-w-prose space-y-5 text-[17px] leading-relaxed text-ink-soft sm:mt-16">
        <p>
          {PAGE_COPY.proof.paragraph1Start} {total} {PAGE_COPY.proof.paragraph2CommitsAcross}{" "}
          {REPO_COUNT} {PAGE_COPY.proof.paragraph2RepositoriesOnMachine} {span},{" "}
          {PAGE_COPY.proof.paragraph1End}
        </p>
      </div>
    </section>
  );
}
