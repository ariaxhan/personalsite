import Hero from "./components/Hero";
import SystemDiagram from "./components/home/SystemDiagram";
import WhatIBuild from "./components/home/WhatIBuild";
import ProjectConstellation from "./components/home/ProjectConstellation";
import MotionStrip from "./components/motion/MotionStrip";
import NowBlock from "./components/home/NowBlock";
import WritingHighlights from "./components/home/WritingHighlights";
import WorkWithMeDoor from "./components/home/WorkWithMeDoor";
import Manifesto from "./components/Manifesto";
import Thesis from "./components/Thesis";
import LivingDesk from "./components/LivingDesk";
import StudioFooter from "./components/StudioFooter";
import type { Metadata } from "next";
import { pageMeta } from "./utils/pageMeta";
import JsonLd from "./components/studio/JsonLd";
import { personSchema, webSiteSchema } from "./utils/jsonLd";
import { SITE } from "./utils/siteMeta";
import { PAGE_COPY } from "./utils/siteCopy";

export const metadata: Metadata = pageMeta({
  title: `${SITE.name}, ${SITE.role}`,
  description: SITE.tldr,
  path: PAGE_COPY.metadata.home.path,
});

export default function Home() {
  return (
    <main className="relative">
      <JsonLd data={personSchema()} />
      <JsonLd data={webSiteSchema()} />
      <Hero />

      {/* The system diagram rides in the hero's right column on large screens;
          on small screens it gets its own section here so it is never lost. */}
      <section className="mx-auto max-w-content px-5 pb-4 sm:px-8 lg:hidden">
        <SystemDiagram />
      </section>

      <WhatIBuild />
      <ProjectConstellation />

      <section className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <MotionStrip />
      </section>

      <NowBlock />
      <WritingHighlights />
      <WorkWithMeDoor />
      <Manifesto />
      <Thesis />
      <LivingDesk />
      <StudioFooter />
    </main>
  );
}
