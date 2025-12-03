import { Metadata } from "next";
import OpenSource from "../components/OpenSource";

export const metadata: Metadata = {
  title: "Open Source | Aria Han",
  description: "Vector Native protocol and The Convergence RL framework. Contributing back to the collective substrate of AI development.",
};

export default function OpenSourcePage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <OpenSource />
    </main>
  );
}



