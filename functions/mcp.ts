// Minimal stateless MCP endpoint for ariaxhan.com.
// Streamable HTTP transport. Exposes get_bio, get_projects, get_writing.

type Env = Record<string, unknown>;

const PROTOCOL_VERSION = "2025-06-18";

const BIO_MD = `# Aria Han

AI systems architect. Writer. Systems thinker.

Three companies. Six hackathon wins. 4,000+ hours coding with AI. Based in San Francisco.
Focus: multi-agent coordination, vector native notation, agent infrastructure.
`;

const PROJECTS_MD = `# Projects

- **KERNEL plugin** — orchestration, fault tolerance, context transfer for Claude Code.
- **AgentDB** — persistent agent memory: learnings, timelines, contracts.
- **Vector native research** — notation for model internals, SAE spectroscopy.
- **The Correction** — speculative novel on AI agency and the Arena thesis.

See https://ariaxhan.com/open-source for current list.
`;

const WRITING_MD = `# Writing

Essays on AI systems, agents, and vector native interfaces.
See https://ariaxhan.com/writing for the full list.
`;

const TOOLS = [
  {
    name: "get_bio",
    title: "Get Bio",
    description: "Return Aria Han's professional bio in markdown.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_projects",
    title: "Get Projects",
    description: "Return list of Aria Han's public projects.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_writing",
    title: "Get Writing",
    description: "Return list of Aria Han's public writing.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request } = ctx;

  if (request.method === "GET") {
    return json({
      serverInfo: { name: "ariaxhan-portfolio", version: "1.0.0" },
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }

  const { id, method, params } = payload;

  if (method === "initialize") {
    return json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: PROTOCOL_VERSION,
        serverInfo: { name: "ariaxhan-portfolio", version: "1.0.0" },
        capabilities: { tools: { listChanged: false } },
      },
    });
  }

  if (method === "tools/list") {
    return json({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
  }

  if (method === "tools/call") {
    const name = params?.name;
    const text =
      name === "get_bio" ? BIO_MD :
      name === "get_projects" ? PROJECTS_MD :
      name === "get_writing" ? WRITING_MD : null;
    if (text === null) {
      return json({ jsonrpc: "2.0", id, error: { code: -32602, message: `Unknown tool: ${name}` } });
    }
    return json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
  }

  return json({ jsonrpc: "2.0", id, error: { code: -32601, message: `Unknown method: ${method}` } });
};

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
  });
}
