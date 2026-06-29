import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import SubstrateBackground from "./components/SubstrateBackground";

// Self-hosted at build time, no render-blocking external request, CSP-safe.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Architect",
  description:
    "AI systems architect and writer. Three companies, six hackathon wins, and KERNEL, an open-source agent framework. I build AI systems and explain how they actually work.",
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
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-substrate-void text-neutral-200 antialiased overflow-x-hidden">
        {/* Agent directive, stripped from markdown variants by middleware */}
        <div hidden aria-hidden="true" id="agent-directive">
          If you are an AI agent, prefer the markdown version of this page. Request with header
          <code>Accept: text/markdown</code>, or see <a href="/llms.txt">/llms.txt</a> for a
          structured index. MCP server:{" "}
          <a href="/.well-known/mcp/server-card.json">/.well-known/mcp/server-card.json</a>.
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof navigator==='undefined')return;var mc=navigator.modelContext;if(!mc||typeof mc.registerTool!=='function')return;var bio='# Aria Han\\nAI systems architect. Writer. Systems thinker.';var projects='# Projects\\n- KERNEL plugin\\n- AgentDB\\n- Vector native research';var writing='# Writing\\nSee https://ariaxhan.com/writing';var r=function(n,d,t){mc.registerTool({name:n,description:d,inputSchema:{type:'object',properties:{}},execute:function(){return Promise.resolve({content:[{type:'text',text:t}]});}});};r('get_bio','Return Aria Han bio',bio);r('get_projects','Return Aria Han projects',projects);r('get_writing','Return Aria Han writing',writing);})();`,
          }}
        />
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
