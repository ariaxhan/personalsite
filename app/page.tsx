import Hero from "./components/Hero";
import SystemDiagram from "./components/home/SystemDiagram";
import WhatIBuild from "./components/home/WhatIBuild";
import Elsewhere from "./components/home/Elsewhere";
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
import { personSchema, webSiteSchema, professionalServiceSchema } from "./utils/jsonLd";
import { getSiteContent } from "./content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({
    title: `${content.SITE.role} in Los Angeles | ${content.SITE.name}`,
    ogTitle: `${content.SITE.name}, ${content.SITE.role}`,
    description: content.SITE.tldr,
    path: content.PAGE_COPY.metadata.home.path,
  }, content.SITE);
}

export default async function Home() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={personSchema(content)} />
      <JsonLd data={webSiteSchema(content)} />
      <JsonLd data={professionalServiceSchema(content)} />
      <Hero />

      {/* The system diagram rides in the hero's right column on large screens;
          on small screens it gets its own section here so it is never lost. */}
      <section className="mx-auto max-w-content px-5 pb-4 sm:px-8 lg:hidden">
        <SystemDiagram />
      </section>

      <WhatIBuild />

      {/* The address, high on the page. See components/home/Elsewhere.tsx. */}
      <Elsewhere />

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
