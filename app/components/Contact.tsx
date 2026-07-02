import Link from "next/link";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { CONTACT_EMAIL, contactLinks } from "../utils/studioData";

export default function Contact() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
      <SectionHeader
        fig="Fig. 10"
        label="Contact"
        title="Building with AI? Make it yours."
        note="A one-time async review for the idea, the architecture, the tools, and what really matters: the human building it."
      />

      <Reveal className="mt-12 grid gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="kicker mb-4">Project Review</div>
          <p className="m-0 max-w-prose font-serif text-[clamp(28px,4vw,46px)] leading-[1.08] text-ink">
            Send me what you&apos;re building.
          </p>
          <p className="m-0 mt-4 max-w-prose font-serif text-[clamp(18px,2.4vw,24px)] italic leading-[1.4] text-ink-ghost">
            I&apos;ll get you to a place you won&apos;t get to from YouTube videos and AI conversations.
          </p>
        </div>

        <div className="lg:border-l lg:border-[rgba(44,40,35,0.18)] lg:pl-8">
          <p className="m-0 text-[17px] leading-[1.75] text-ink-muted">
            Origin story, architecture, tools, repo, docs, screenshots, messy
            AI-generated code. I care less about perfect code and more about
            whether the thing has a real shape.
          </p>
          <p className="m-0 mt-5 font-serif text-[21px] italic leading-snug text-ink-ghost">
            Not another template project. Something sharper, stranger, and more yours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 pl-12 sm:pl-0">
            <Link
              href="/project-review"
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-studio-paper transition-colors hover:border-terracotta hover:bg-terracotta sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
            >
              Submit project
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-11 items-center border border-[rgba(44,40,35,0.28)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-terracotta hover:text-terracotta sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
            >
              Email me
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          "Idea, origin, and what makes it yours",
          "Architecture, agents, docs, and tool choices",
          "What to keep, cut, rebuild, or rethink",
        ].map((item) => (
          <div key={item} className="border-t border-[rgba(44,40,35,0.16)] pt-4">
            <p className="m-0 font-serif text-[20px] leading-snug text-ink">{item}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-16">
        <div className="kicker mb-6">Links</div>
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          {contactLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[clamp(20px,2.6vw,28px)] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
