import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navigation from "./components/Navigation";
import SubstrateBackground from "./components/SubstrateBackground";

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Architect",
  description:
    "AI systems architect. Writer. Systems thinker. Three companies, six hackathon wins, 4,000+ hours coding with AI.",
  keywords: [
    "AI systems architect",
    "Claude Code",
    "multi-agent systems",
    "agent coordination",
    "KERNEL plugin",
    "AgentDB",
    "startup founder",
    "systems thinking",
  ],
  authors: [{ name: "Aria Han" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aria Han | AI Systems Architect",
    description:
      "AI systems architect. Writer. Systems thinker. Building infrastructure for multi-agent coordination.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aria Han | AI Systems Architect",
    description:
      "Architecture, coordination, emergence, and fundamental design patterns in AI systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0814",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload fonts for performance */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-substrate-void text-neutral-200 antialiased overflow-x-hidden">
        {/* Global background */}
        <SubstrateBackground />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
