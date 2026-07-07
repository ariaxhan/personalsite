import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Newsreader, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PaperGrain from "./components/PaperGrain";
import { mcpBioMd, mcpProjectsMd, mcpWritingMd } from "./utils/agentText";
import { SITE } from "./utils/siteMeta";

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

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name}, ${SITE.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name}, ${SITE.role}`,
  description: SITE.tldr,
  keywords: [
    "Aria Han",
    "AI systems architect",
    "agent coordination",
    "memory systems",
    "evals",
    "Claude Code",
    "KERNEL",
    "Los Angeles",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE.name}, ${SITE.role}`,
    description: SITE.tldr,
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}, ${SITE.role}`,
    description: SITE.tldr,
    images: ["/og.png"],
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
