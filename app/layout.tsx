import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navigation from "./components/Navigation";
import SubstrateBackground from "./components/SubstrateBackground";

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Builder",
  description:
    "Three-time CEO. Six hackathon wins. 3,000+ hours building production AI systems that work with AI's nature, not against it.",
  keywords: [
    "AI",
    "machine learning",
    "multi-agent systems",
    "reinforcement learning",
    "startup founder",
    "AI civilization",
    "cognitive substrates",
  ],
  authors: [{ name: "Aria Han" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aria Han | AI Systems Builder",
    description:
      "Three-time CEO. Six hackathon wins. Building production AI systems that work with AI's nature.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aria Han | AI Systems Builder",
    description:
      "Building AI systems that understand how intelligence actually works.",
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
