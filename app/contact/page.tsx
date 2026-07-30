import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { contactSchema, professionalServiceSchema, breadcrumbSchema } from "../utils/jsonLd";
import Contact from "../components/Contact";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.contact }, content.SITE);
}

export default async function ContactPage() {
  const { content } = await getSiteContent();
  return (
    <main className="relative">
      <JsonLd data={contactSchema(content)} />
      <JsonLd data={professionalServiceSchema(content)} />
      <JsonLd data={breadcrumbSchema(content, [{ name: "Work With Me", path: "/contact/" }])} />
      <Contact />
      <StudioFooter />
    </main>
  );
}
