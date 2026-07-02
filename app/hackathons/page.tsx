import { Metadata } from "next";
import HackathonsGrid from "../components/HackathonsGrid";
import StudioFooter from "../components/StudioFooter";

export const metadata: Metadata = {
  title: "Hackathons | Aria Han",
  description:
    "Six hackathon wins in two years. Darwin (AWS). Armature (RL Track). Content Creator Connector. TheraVoice. HotAgents. Freetime. Each built in 24 to 48 hours under pressure.",
};

export default function HackathonsPage() {
  return (
    <main className="relative">
      <HackathonsGrid />
      <StudioFooter />
    </main>
  );
}
