import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import StudioFooter from "../components/StudioFooter";
import MotionStrata from "../components/motion/MotionStrata";
import ProofIntro from "../components/ProofIntro";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.proof,
});

export default function ProofPage() {
  return (
    <main className="relative">
      <ProofIntro />
      <section className="mx-auto max-w-[1280px] px-5 pb-8 pt-10 sm:px-8 lg:px-14">
        <MotionStrata />
      </section>
      <StudioFooter />
    </main>
  );
}
