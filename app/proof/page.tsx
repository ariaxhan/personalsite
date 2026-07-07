import { Metadata } from "next";
import SectionHeader from "../components/studio/SectionHeader";
import StudioFooter from "../components/StudioFooter";
import MotionStrata from "../components/motion/MotionStrata";
import { GRAND_TOTAL, REPO_COUNT, motionData, monthLabel } from "../components/motion/motionShared";

export const metadata: Metadata = {
  title: "Proof of Motion | Aria Han",
  description:
    "An archaeological build record generated from real git history on the machine this site is built on. Commit activity across products, agents, memory systems, evals, and client work, grouped into constellations. Bursts and continuity, not a single launch.",
};

export default function ProofPage() {
  const total = GRAND_TOTAL.toLocaleString();
  const span = `${monthLabel(motionData.firstMonth)} to ${monthLabel(motionData.lastMonth)}`;

  return (
    <main className="relative">
      <section className="mx-auto max-w-[1280px] px-5 pt-32 pb-4 sm:px-8 sm:pt-40 lg:px-14">
        <SectionHeader
          fig="Fig. 06"
          label="Proof of Motion"
          title="The record of motion"
          note="Real commit history from the machine this site is built on, grouped into constellations. Client work and private experiments appear as activity, never as names."
        />

        <div className="mt-12 max-w-prose space-y-5 text-[17px] leading-relaxed text-ink-soft sm:mt-16">
          <p>
            Most portfolios claim motion. This page shows the ledger. Every mark below comes from a{" "}
            <span className="font-mono text-[15px] text-ink">git log</span> on my own machine, bucketed by
            month, then grouped by what the work was for: memory, evals, agents, products, companies,
            implementation, experiments. Nothing here is typed by hand. A script reads the history and writes
            the numbers, so the picture cannot drift from the truth without the commits drifting first.
          </p>
          <p>
            What I want you to read is not any single launch. It is the shape: {total} commits across{" "}
            {REPO_COUNT} repositories on this machine, {span}, and the way the bursts move from one
            constellation to the next as the work changes. Continuity is the claim. The months that spike are
            real weeks I remember. Client work and private experiments are counted as activity and left
            unnamed, because the point is the motion, not the names.
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
