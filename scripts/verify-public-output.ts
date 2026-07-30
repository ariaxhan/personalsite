import {
  HUMAN_PUBLIC_PATHS,
  MACHINE_PUBLIC_PATHS,
} from "../app/content/publicRoutes";

type Observation = {
  path: string;
  status: number;
  finalUrl: string;
  headers: Record<string, string>;
  body: string;
};

const positionalBaseUrl = process.argv
  .slice(2)
  .find((argument) => !argument.startsWith("--"));
const baseUrl = new URL(
  positionalBaseUrl ?? process.env.PREVIEW_BASE_URL ?? "",
);
const selfTest = process.argv.includes("--selftest");

function headerRecord(headers: Headers): Record<string, string> {
  return Object.fromEntries(headers.entries());
}

async function observe(path: string, init?: RequestInit): Promise<Observation> {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "follow",
    ...init,
  });
  return {
    path,
    status: response.status,
    finalUrl: response.url,
    headers: headerRecord(response.headers),
    body: await response.text(),
  };
}

function htmlMarker(body: string, attribute: "content" | "data-publication") {
  const tag = body.match(/<meta[^>]+name="aria-content-revision"[^>]*>/)?.[0] ?? "";
  return tag.match(new RegExp(`${attribute}="([^"]+)"`))?.[1] ?? null;
}

function canonicalHref(body: string): string | null {
  const tag =
    body.match(/<link[^>]+rel="canonical"[^>]*>/)?.[0] ??
    body.match(/<link[^>]+href="[^"]+"[^>]+rel="canonical"[^>]*>/)?.[0] ??
    "";
  return tag.match(/href="([^"]+)"/)?.[1] ?? null;
}

function jsonLdIsValid(body: string): boolean {
  const scripts = [
    ...body.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  if (scripts.length === 0) return false;
  return scripts.every((match) => {
    try {
      const parsed = JSON.parse(match[1]) as unknown;
      return typeof parsed === "object" && parsed !== null;
    } catch {
      return false;
    }
  });
}

function isPreviewHost(hostname: string): boolean {
  return (
    hostname.endsWith(".workers.dev") ||
    hostname.endsWith(".pages.dev") ||
    hostname === "cms-preview.ariaxhan.com"
  );
}

function validate(
  human: Observation[],
  machine: Observation[],
  sitemap: Observation,
  markdownNegotiation: Observation,
  mcp: Observation,
  privateRoutes: Observation[],
): string[] {
  const errors: string[] = [];
  const revisionPairs = new Set<string>();

  for (const item of human) {
    if (item.status !== 200) errors.push(`${item.path}: expected 200, got ${item.status}`);
    const h1Count = item.body.match(/<h1(?:\s|>)/g)?.length ?? 0;
    if (h1Count !== 1) errors.push(`${item.path}: expected one h1, got ${h1Count}`);
    const expectedCanonical = new URL(item.path, "https://ariaxhan.com").href;
    if (canonicalHref(item.body) !== expectedCanonical) {
      errors.push(`${item.path}: wrong production canonical`);
    }
    const expectsJsonLd =
      item.path === "/" ||
      item.path === "/about/" ||
      item.path === "/contact/" ||
      item.path === "/systems/" ||
      item.path === "/open-source/" ||
      item.path === "/writing/" ||
      item.path.startsWith("/projects/");
    if (expectsJsonLd && !jsonLdIsValid(item.body)) {
      errors.push(`${item.path}: missing or invalid JSON-LD`);
    }
    if (item.body.includes("/edit/ContentEditor") || item.body.includes("Private editor")) {
      errors.push(`${item.path}: public HTML includes editor code or copy`);
    }
    const revision = htmlMarker(item.body, "content");
    const publication = htmlMarker(item.body, "data-publication");
    if (!revision || !publication) {
      errors.push(`${item.path}: missing revision/publication marker`);
    } else {
      revisionPairs.add(`${revision}:${publication}`);
    }
  }

  for (const item of machine) {
    if (item.status !== 200) errors.push(`${item.path}: expected 200, got ${item.status}`);
    const revision = item.headers["x-content-revision"];
    const publication = item.headers["x-content-publication"];
    if (!revision || !publication) {
      errors.push(`${item.path}: missing revision/publication headers`);
    } else {
      revisionPairs.add(`${revision}:${publication}`);
    }
  }

  if (revisionPairs.size !== 1) {
    errors.push(`public output resolved ${revisionPairs.size} revision/publication pairs`);
  }

  const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  const expectedSitemap = HUMAN_PUBLIC_PATHS.filter(
    (path) => path !== "/books/",
  ).sort();
  if (JSON.stringify(sitemapUrls.sort()) !== JSON.stringify([...expectedSitemap].sort())) {
    errors.push("sitemap membership differs from the fixed public route catalog");
  }
  const lastModified = new Set(
    [...sitemap.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]),
  );
  if (lastModified.size < 2) errors.push("sitemap lastModified has no route-level diversity");

  if (
    markdownNegotiation.status !== 200 ||
    !markdownNegotiation.headers["content-type"]?.startsWith("text/markdown") ||
    markdownNegotiation.headers["x-served-as"] !== "markdown"
  ) {
    errors.push("Accept: text/markdown negotiation failed");
  }
  if (
    mcp.status !== 200 ||
    !mcp.headers["content-type"]?.startsWith("application/json") ||
    !mcp.body.includes('"tools"')
  ) {
    errors.push("MCP tools/list failed");
  }
  const apiCatalog = machine.find(
    (item) => item.path === "/.well-known/api-catalog",
  );
  if (
    !apiCatalog?.headers["content-type"]?.startsWith(
      "application/linkset+json",
    )
  ) {
    errors.push("API catalog has the wrong media type");
  }
  const expectedPair = [...revisionPairs][0];
  for (const item of [markdownNegotiation, mcp]) {
    const pair = `${item.headers["x-content-revision"]}:${item.headers["x-content-publication"]}`;
    if (pair !== expectedPair) errors.push(`${item.path}: does not share the public snapshot`);
  }

  for (const item of privateRoutes) {
    if (item.status === 200 && item.path !== "/edit/login/") {
      errors.push(`${item.path}: unauthenticated private route returned 200`);
    }
    if (!item.headers["cache-control"]?.includes("no-store")) {
      errors.push(`${item.path}: private response is cacheable`);
    }
    if (!item.headers["x-robots-tag"]?.includes("noindex")) {
      errors.push(`${item.path}: private response is indexable`);
    }
  }

  if (isPreviewHost(baseUrl.hostname)) {
    for (const item of [...human, ...machine]) {
      if (!item.headers["x-robots-tag"]?.includes("noindex")) {
        errors.push(`${item.path}: Worker preview is indexable`);
      }
    }
  }

  return errors;
}

async function main() {
const sitemapPath = "/sitemap.xml";
const human = await Promise.all(
  HUMAN_PUBLIC_PATHS.filter((path) => path !== "/books/").map((path) => observe(path)),
);
const machine = await Promise.all(MACHINE_PUBLIC_PATHS.map((path) => observe(path)));
const sitemap = machine.find((item) => item.path === sitemapPath);
if (!sitemap) throw new Error("sitemap route is absent from machine route catalog");
const markdownNegotiation = await observe("/", {
  headers: { accept: "text/markdown" },
});
const mcp = await observe("/mcp/", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }),
});
const privateRoutes = await Promise.all([
  observe("/edit/"),
  observe("/edit/login/"),
  observe("/api/cms/state"),
]);

const errors = validate(
  human,
  machine,
  sitemap,
  markdownNegotiation,
  mcp,
  privateRoutes,
);
if (errors.length > 0) {
  process.stderr.write(`${errors.join("\n")}\n`);
  process.exitCode = 1;
} else {
  const revision = htmlMarker(human[0].body, "content");
  const publication = htmlMarker(human[0].body, "data-publication");
  process.stdout.write(
    `verified ${human.length} HTML routes, ${machine.length} machine routes, markdown negotiation, MCP, and private isolation at ${revision}:${publication}\n`,
  );
}

if (selfTest) {
  const seededHuman = structuredClone(human);
  seededHuman[0].body = seededHuman[0].body
    .replace(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/, "<div>seeded missing h1</div>")
    .replace(/<meta[^>]+name="aria-content-revision"[^>]*>/, "")
    .replace(
      /<link[^>]+rel="canonical"[^>]*>/,
      '<link rel="canonical" href="https://example.invalid/">',
    );
  const jsonLdRoute = seededHuman.find((item) => item.path === "/about/");
  if (!jsonLdRoute) throw new Error("selftest fixture lacks /about/");
  jsonLdRoute.body = jsonLdRoute.body.replace(
    /(<script[^>]+type="application\/ld\+json"[^>]*>)[\s\S]*?(<\/script>)/,
    "$1{seeded invalid json$2",
  );
  if (isPreviewHost(baseUrl.hostname)) {
    delete seededHuman[0].headers["x-robots-tag"];
  }
  const seededMachine = structuredClone(machine);
  const seededCatalog = seededMachine.find(
    (item) => item.path === "/.well-known/api-catalog",
  );
  if (!seededCatalog) throw new Error("selftest fixture lacks API catalog");
  seededCatalog.headers["content-type"] = "application/json";
  seededMachine[0].headers["x-content-publication"] = "seeded-stale-publication";
  const seededErrors = validate(
    seededHuman,
    seededMachine,
    sitemap,
    markdownNegotiation,
    mcp,
    privateRoutes,
  );
  if (
    !seededErrors.some((error) => error.includes("expected one h1")) ||
    !seededErrors.some((error) =>
      error.includes("missing revision/publication marker"),
    ) ||
    !seededErrors.some((error) => error.includes("wrong production canonical")) ||
    !seededErrors.some((error) => error.includes("missing or invalid JSON-LD")) ||
    !seededErrors.some((error) =>
      error.includes("API catalog has the wrong media type"),
    ) ||
    !seededErrors.some((error) =>
      error.includes("public output resolved"),
    ) ||
    (isPreviewHost(baseUrl.hostname) &&
      !seededErrors.some((error) => error.includes("preview is indexable")))
  ) {
    process.stderr.write(
      `selftest failed: verifier missed seeded defects\n${seededErrors.join("\n")}\n`,
    );
    process.exitCode = 1;
  } else {
    process.stdout.write(
      "selftest passed: seeded heading, canonical, JSON-LD, media type, preview indexing, and snapshot defects were detected\n",
    );
  }
}
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
