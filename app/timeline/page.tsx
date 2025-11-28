import { Metadata } from "next";
import Timeline from "../components/Timeline";

export const metadata: Metadata = {
  title: "Timeline | Aria Han",
  description: "Three companies. Six hackathon wins. 3,000+ hours of building. This is what one year of full commitment looks like.",
};

export default function TimelinePage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <Timeline />
    </main>
  );
}
