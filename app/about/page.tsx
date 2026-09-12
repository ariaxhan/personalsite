import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import About from "../components/About";
import CuriosityMap from "../components/CuriosityMap";
import Obsessions from "../components/Obsessions";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";
import JsonLd from "../components/studio/JsonLd";
import { profilePageSchema, personSchema, breadcrumbSchema } from "../utils/jsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.about }, content.SITE);
}

export default async function AboutPage() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={personSchema(content)} />
      <JsonLd data={profilePageSchema(content)} />
      <JsonLd data={breadcrumbSchema(content, [{ name: "About", path: "/about/" }])} />
      <About />
      <CuriosityMap />
      <Obsessions />
      <StudioFooter />
    </main>
  );
}
