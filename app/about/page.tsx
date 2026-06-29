import { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "About | Aria Han",
  description: "AI systems architect and writer. Three companies, six hackathon wins, and KERNEL, an open-source agent framework. Building AI systems and explaining how they actually work.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <About />
    </main>
  );
}




