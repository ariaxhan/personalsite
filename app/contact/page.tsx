import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import JsonLd from "../components/studio/JsonLd";
import { contactSchema } from "../utils/jsonLd";
import Contact from "../components/Contact";
import StudioFooter from "../components/StudioFooter";
import { PAGE_COPY } from "../utils/siteCopy";

export const metadata: Metadata = pageMeta({
  ...PAGE_COPY.metadata.contact,
});

export default function ContactPage() {
  return (
    <main className="relative">
      <JsonLd data={contactSchema()} />
      <Contact />
      <StudioFooter />
    </main>
  );
}
