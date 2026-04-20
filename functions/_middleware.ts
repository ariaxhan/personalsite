// Cloudflare Pages middleware: Markdown content negotiation + hidden-directive strip.
// If Accept: text/markdown → try /{path}/index.md or /{path}.md, fall back to HTML.
// Adds Link headers for agent discovery on the homepage.

type Env = Record<string, unknown>;

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, next } = ctx;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // Respond with Markdown for agent clients.
  if (request.method === "GET" && accept.includes("text/markdown")) {
    const candidates = buildMdCandidates(url.pathname);
    for (const p of candidates) {
      const probe = new URL(p, url);
      const res = await fetch(probe.toString(), { headers: request.headers });
      if (res.ok && (res.headers.get("content-type") || "").includes("text/")) {
        const body = await res.text();
        return new Response(body, {
          status: 200,
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "cache-control": "public, max-age=3600",
            "x-served-as": "markdown",
            link: buildLinkHeader(url.origin),
          },
        });
      }
    }
  }

  const response = await next();

  // Add Link headers to the homepage.
  if (url.pathname === "/" || url.pathname === "/index.html") {
    const headers = new Headers(response.headers);
    headers.append("link", buildLinkHeader(url.origin));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};

function buildMdCandidates(pathname: string): string[] {
  if (pathname === "/" || pathname === "") return ["/index.md"];
  const trimmed = pathname.replace(/\/$/, "");
  return [`${trimmed}/index.md`, `${trimmed}.md`];
}

function buildLinkHeader(origin: string): string {
  const rels: Array<[string, string]> = [
    ["/.well-known/api-catalog", "api-catalog"],
    ["/.well-known/agent-card.json", "https://a2a-protocol.org/rel/agent-card"],
    ["/.well-known/mcp/server-card.json", "https://modelcontextprotocol.io/rel/server-card"],
    ["/.well-known/agent-skills/index.json", "https://agentskills.io/rel/index"],
    ["/llms.txt", "https://llmstxt.org/rel/index"],
    ["/sitemap.xml", "sitemap"],
  ];
  return rels.map(([p, rel]) => `<${origin}${p}>; rel="${rel}"`).join(", ");
}
