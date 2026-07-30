import type { DerivedSiteContent, SiteContent } from "../content/defaultContent";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "public, max-age=3600",
};

const TEXT_HEADERS = {
  "content-type": "text/markdown; charset=utf-8",
  "cache-control": "public, max-age=3600",
};

const inputSchema = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

export function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify(data, null, 2), { headers: JSON_HEADERS });
}

export function markdownResponse(markdown: string): Response {
  return new Response(markdown, { headers: TEXT_HEADERS });
}

export function agentCardJson(content: DerivedSiteContent) {
  const { PAGE_COPY, SITE } = content;
  const copy = PAGE_COPY.wellKnown.agentCard;

  return {
    name: copy.name,
    version: copy.version,
    description: copy.description,
    url: SITE.url,
    provider: {
      organization: SITE.name,
      url: SITE.url,
    },
    supportedInterfaces: [
      {
        protocol: "http",
        transport: "https",
        url: SITE.url,
      },
      {
        protocol: "mcp",
        transport: "streamable-http",
        url: `${SITE.url}/mcp`,
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/markdown", "application/json"],
    skills: Object.values(copy.skills),
  };
}

export function mcpServerCardJson(content: DerivedSiteContent) {
  const { PAGE_COPY } = content;
  const copy = PAGE_COPY.wellKnown.mcpServerCard;

  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: "2025-06-18",
    serverInfo: {
      name: copy.name,
      title: copy.title,
      version: copy.version,
    },
    description: copy.description,
    transport: {
      type: "streamable-http",
      endpoint: "/mcp",
    },
    authentication: {
      required: false,
    },
    tools: Object.values(copy.tools).map((tool) => ({
      ...tool,
      inputSchema,
    })),
  };
}

export function agentSkillsIndexJson(content: DerivedSiteContent) {
  const { PAGE_COPY, SITE } = content;
  const copy = PAGE_COPY.wellKnown.agentSkillsIndex;

  return {
    $schema: "https://agentskills.io/schemas/index.v0.2.0.json",
    version: "0.2.0",
    skills: Object.values(copy).map((skill) => ({
      ...skill,
      url: `${SITE.url}/.well-known/agent-skills/${skill.name}/SKILL.md`,
    })),
  };
}

export function apiCatalogJson(content: DerivedSiteContent) {
  const { PAGE_COPY, SITE } = content;
  const copy = PAGE_COPY.wellKnown.apiCatalog;

  return {
    linkset: [
      {
        anchor: `${SITE.url}/`,
        "service-desc": [
          { href: `${SITE.url}/llms-full.txt`, type: "text/plain", title: copy.fullSite },
          { href: `${SITE.url}/api/site-index.json`, type: "application/json", title: copy.siteIndex },
          { href: `${SITE.url}/api/projects.json`, type: "application/json", title: copy.projects },
          { href: `${SITE.url}/api/writing.json`, type: "application/json", title: copy.writing },
          { href: `${SITE.url}/api/work-with-me.json`, type: "application/json", title: copy.workWithMe },
        ],
        "service-doc": [
          { href: `${SITE.url}/llms.txt`, type: "text/plain", title: copy.conciseGuide },
          { href: `${SITE.url}/about/index.md`, type: "text/markdown", title: copy.aboutMarkdown },
        ],
        status: [
          {
            href: `${SITE.url}/`,
            type: "text/html",
          },
        ],
        related: [
          { href: `${SITE.url}/sitemap.xml`, type: "application/xml", title: copy.sitemap },
          { href: `${SITE.url}/.well-known/agent-card.json`, type: "application/json", title: copy.agentCard },
          { href: `${SITE.url}/.well-known/mcp/server-card.json`, type: "application/json", title: copy.mcpServerCard },
        ],
      },
    ],
  };
}

export function agentSkillMarkdown(
  content: DerivedSiteContent,
  key: keyof SiteContent["PAGE_COPY"]["wellKnown"]["agentSkills"],
): string {
  const { PAGE_COPY } = content;
  if (key === "headings") return "";
  const skill = PAGE_COPY.wellKnown.agentSkills[key];
  const headings = PAGE_COPY.wellKnown.agentSkills.headings;
  const output = skill.output.length > 0 ? skill.output.map((line) => `- ${line}`) : [];

  return [
    "---",
    `name: ${skill.name}`,
    `description: ${skill.description}`,
    "---",
    "",
    `# ${skill.name}`,
    "",
    `## ${headings.purpose}`,
    skill.purpose,
    "",
    `## ${headings.invocation}`,
    ...skill.invocation,
    "",
    `## ${headings.output}`,
    skill.outputIntro,
    ...output,
    "",
    `## ${headings.attribution}`,
    skill.attribution,
    "",
  ].join("\n");
}
