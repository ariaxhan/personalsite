import { Metadata } from "next";
import Contact from "../components/Contact";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = {
  title: "Work With Me | Aria Han",
  description:
    "Hire Aria Han, an AI systems architect in Los Angeles, for AI workflow implementation, internal AI tools and automation, agentic system architecture, evals and monitoring, Claude Code workflow hardening, memory and context systems, and Dify low-code apps.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <Contact />
      <StudioFooter />
    </main>
  );
}
