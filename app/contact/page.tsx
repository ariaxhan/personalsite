import { Metadata } from "next";
import Contact from "../components/Contact";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = {
  title: "Contact | Aria Han",
  description:
    "Contact Aria Han or submit an AI build, repo, prototype, or coding workflow for an async project review.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <Contact />
      <StudioFooter />
    </main>
  );
}
