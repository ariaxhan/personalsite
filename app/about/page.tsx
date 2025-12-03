import { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "About | Aria Han",
  description: "AI systems architect. Writer. Systems thinker. Three companies, six hackathon wins, 3,300+ hours building production AI systems.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <About />
    </main>
  );
}




