import { Metadata } from "next";
import VectorNativeDocument from "../components/VectorNativeDocument";

export const metadata: Metadata = {
  title: "VN Translation | Aria Han",
  description: "Complete portfolio as Vector Native protocol. A2A communication syntax—natural language is inefficient for agent coordination.",
};

export default function VNPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <VectorNativeDocument />
    </main>
  );
}




