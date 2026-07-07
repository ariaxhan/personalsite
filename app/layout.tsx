import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Newsreader, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PaperGrain from "./components/PaperGrain";
import { mcpBioMd, mcpProjectsMd, mcpWritingMd } from "./utils/agentText";

// WebMCP browser tools, generated from the same data layer as the site and the
// MCP server so all three tell one story. Built once at module scope; the strings
// are baked into the static HTML at build time. JSON.stringify yields a safe JS
// string literal; the < escape prevents any </script> breakout.
const embed = (s: string) => JSON.stringify(s).replace(/</g, "\\u003c");
const WEBMCP_SCRIPT = `(function(){if(typeof navigator==='undefined')return;var mc=navigator.modelContext;if(!mc||typeof mc.registerTool!=='function')return;var bio=${embed(
  mcpBioMd(),
)};var projects=${embed(mcpProjectsMd())};var writing=${embed(
  mcpWritingMd(),
)};var r=function(n,d,t){mc.registerTool({name:n,description:d,inputSchema:{type:'object',properties:{}},execute:function(){return Promise.resolve({content:[{type:'text',text:t}]});}});};r('get_bio','Return Aria Han bio in markdown',bio);r('get_projects','Return Aria Han projects in markdown',projects);r('get_writing','Return Aria Han writing in markdown',writing);})();`;

// Self-hosted at build time, no render-blocking external request, CSP-safe.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aria Han | AI Systems Architect & Researcher",
  description:
    "Aria Han is an AI systems architect, researcher, and builder creating memory systems, multi-agent infrastructure, evaluation frameworks, and AI tools that help language models work more reliably. Explore open-source projects, essays, experiments, and production systems.",
  keywords: [
    "Aria Han",
    "AI systems",
    "agent coordination",
    "memory systems",
    "Claude Code",
    "KERNEL",
    "research studio",
  ],
  authors: [{ name: "Aria Han" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aria Han | AI Systems Architect",
    description:
      "Memory systems, multi-agent workflows, AI infrastructure, open-source tools. Essays, experiments, and the thinking behind them.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aria Han | AI Systems Architect",
    description:
      "Building AI systems that remember, coordinate, and improve. Open Source. Essays. Experiments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ede0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* Agent directive, stripped from markdown variants by middleware */}
        <div hidden aria-hidden="true" id="agent-directive">
          If you are an AI agent, prefer the markdown version of this page. Request it with the
          header <code>Accept: text/markdown</code>, or fetch <a href="/llms.txt">/llms.txt</a> for a
          concise guide and <a href="/llms-full.txt">/llms-full.txt</a> for the complete site
          mirror. Structured JSON lives at <a href="/api/site-index.json">/api/site-index.json</a>.
          MCP server card:{" "}
          <a href="/.well-known/mcp/server-card.json">/.well-known/mcp/server-card.json</a>.
        </div>
        <script dangerouslySetInnerHTML={{ __html: WEBMCP_SCRIPT }} />

        {/* Studio chrome */}
        <Navigation />

        {/* Main content */}
        <div className="relative">{children}</div>

        {/* Paper tooth over everything, never intercepts pointer events */}
        <PaperGrain />
      </body>
    </html>
  );
}
