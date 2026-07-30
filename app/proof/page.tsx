import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import SectionHeader from "../components/studio/SectionHeader";
import StudioFooter from "../components/StudioFooter";
import MotionStrata from "../components/motion/MotionStrata";
import { GRAND_TOTAL, REPO_COUNT, motionData, monthLabel } from "../components/motion/motionShared";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.proof }, content.SITE);
}

export default async function ProofPage() {
  const { content: { PAGE_COPY } } = await getSiteContent();
  const total = GRAND_TOTAL.toLocaleString();
  const span = `${monthLabel(motionData.firstMonth)} to ${monthLabel(motionData.lastMonth)}`;

  return (
    <main className="relative">
      <section className="mx-auto max-w-[1280px] px-5 pt-32 pb-4 sm:px-8 sm:pt-40 lg:px-14">
        <SectionHeader
          as="h1"
          {...PAGE_COPY.proof.header}
        />

        <div className="mt-12 max-w-prose space-y-5 text-[17px] leading-relaxed text-ink-soft sm:mt-16">
          <p>
            {PAGE_COPY.proof.paragraph1Start} {total} {PAGE_COPY.proof.paragraph2CommitsAcross}{" "}
            {REPO_COUNT} {PAGE_COPY.proof.paragraph2RepositoriesOnMachine} {span},{" "}
            {PAGE_COPY.proof.paragraph1End}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-8 pt-10 sm:px-8 lg:px-14">
        <MotionStrata />
      </section>

      <StudioFooter />
    </main>
  );
}
