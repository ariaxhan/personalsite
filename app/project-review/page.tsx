import { Metadata } from "next";
import ProjectReviewForm from "../components/ProjectReviewForm";
import StudioFooter from "../components/StudioFooter";
import SectionHeader from "../components/studio/SectionHeader";
import Reveal from "../components/studio/Reveal";

export const metadata: Metadata = {
  title: "Project Review | Aria Han",
  description:
    "Submit an AI project, idea, repo, architecture, or tool choice for a one-time async review.",
};

export default function ProjectReviewPage() {
  return (
    <main className="relative">
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
        <SectionHeader
          fig="Fig. 10A"
          label="Project Review"
          title="Send the idea."
          note="One-time async review, free. If there is more to do, we can talk case by case."
        />

        <Reveal className="mt-12 mb-10 max-w-[760px]">
          <p className="m-0 font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.12] text-ink">
            I&apos;ll look at the origin story, the architecture, the tools, and
            what makes the project yours.
          </p>
          <p className="m-0 mt-5 text-[16.5px] leading-[1.75] text-ink-muted">
            AGENTS.md, CLAUDE.md, specs, prompts, diagrams, and notes are welcome.
            I&apos;ll probably read those before the code.
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
