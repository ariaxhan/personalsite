import { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact | Aria Han",
  description: "Get in touch. Building something interesting? The network is open for new connections.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <Contact />
    </main>
  );
}




