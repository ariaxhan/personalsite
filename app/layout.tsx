import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Newsreader, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PaperGrain from "./components/PaperGrain";
import { SiteContentProvider } from "./content/SiteContentProvider";
import { getSiteContent } from "./content/repository";
import type { DerivedSiteContent } from "./content/defaultContent";

const embed = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

function webMcpScript(content: DerivedSiteContent): string {
  const bio = `# ${content.SITE.name}\n\n${content.SITE.tldr}`;
  const projects = content.projects
    .map((project) => `## ${project.name}\n\n${project.thesis}\n\n${project.proof}`)
    .join("\n\n");
  const writing = content.articles
    .map((article) => `## ${article.title}\n\n${article.excerpt}\n\n${article.href}`)
    .join("\n\n");
  return `(function(){if(typeof navigator==='undefined')return;var mc=navigator.modelContext;if(!mc||typeof mc.registerTool!=='function')return;var r=function(n,d,t){mc.registerTool({name:n,description:d,inputSchema:{type:'object',properties:{}},execute:function(){return Promise.resolve({content:[{type:'text',text:t}]});}});};r('get_bio',${embed(content.PAGE_COPY.layout.webMcpTools.bio)},${embed(bio)});r('get_projects',${embed(content.PAGE_COPY.layout.webMcpTools.projects)},${embed(projects)});r('get_writing',${embed(content.PAGE_COPY.layout.webMcpTools.writing)},${embed(writing)});})();`;
}

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

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  const { SITE, PAGE_COPY } = content;
  const image = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: `${SITE.name}, ${SITE.role}`,
  };
  return {
    metadataBase: new URL(SITE.url),
    title: `${SITE.name}, ${SITE.role}`,
    description: SITE.tldr,
    keywords: [...PAGE_COPY.layout.keywords],
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
      images: [image],
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ede0",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const resolved = await getSiteContent();
  const { PAGE_COPY } = resolved.content;
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body>
        <meta
          name="aria-content-revision"
          content={resolved.revisionId ?? "git-default"}
          data-source={resolved.source}
          data-publication={resolved.publicationId ?? "git-default"}
        />
        <div hidden aria-hidden="true" id="agent-directive">
          {PAGE_COPY.layout.agentDirective.intro} <code>Accept: text/markdown</code>, or fetch{" "}
          <a href="/llms.txt">/llms.txt</a> {PAGE_COPY.layout.agentDirective.concise}{" "}
          <a href="/llms-full.txt">/llms-full.txt</a> {PAGE_COPY.layout.agentDirective.complete}{" "}
          <a href="/api/site-index.json">/api/site-index.json</a>. {PAGE_COPY.layout.agentDirective.mcp}{" "}
          <a href="/.well-known/mcp/server-card.json">/.well-known/mcp/server-card.json</a>.
        </div>
        <script dangerouslySetInnerHTML={{ __html: webMcpScript(resolved.content) }} />
        <SiteContentProvider content={resolved.siteContent}>
          <Navigation />
          <div className="relative">{children}</div>
          <PaperGrain />
        </SiteContentProvider>
      </body>
    </html>
  );
}
