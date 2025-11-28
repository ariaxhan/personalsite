import { Metadata } from "next";
import EvidenceGrid from "../components/EvidenceGrid";

export const metadata: Metadata = {
  title: "Evidence | Aria Han",
  description: "Six hackathon wins in two years. Projects built in 24-48 hours, validated by judges, often continued into production.",
};

export default function EvidencePage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <EvidenceGrid />
    </main>
  );
}

