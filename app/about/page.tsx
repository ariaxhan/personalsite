import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import About from "../components/About";
import CuriosityMap from "../components/CuriosityMap";
import Obsessions from "../components/Obsessions";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";
import JsonLd from "../components/studio/JsonLd";
import { profilePageSchema, personSchema, breadcrumbSchema } from "../utils/jsonLd";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.about,
});

export default function AboutPage() {
  return (
    <main className="relative">
      <JsonLd data={personSchema()} />
      <JsonLd data={profilePageSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about/" }])} />
      <About />
      <CuriosityMap />
      <Obsessions />
      <StudioFooter />
    </main>
  );
}
