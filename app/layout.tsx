import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Builder",
  description:
    "Three-time CEO. Six competition wins. 3,000+ hours building production AI systems that work with AI's nature, not against it.",
  keywords: [
    "AI",
    "machine learning",
    "multi-agent systems",
    "reinforcement learning",
    "startup founder",
  ],
  authors: [{ name: "Aria Han" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
