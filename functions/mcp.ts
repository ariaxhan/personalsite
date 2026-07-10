// Minimal stateless MCP endpoint for ariaxhan.com.
// Streamable HTTP transport. Exposes get_bio, get_projects, get_writing.
// Content is generated from the shared data layer (app/utils/*), the same
// source the human pages and llms-full.txt read, so nothing drifts. No em dashes.

import { mcpBioMd, mcpProjectsMd, mcpWritingMd } from "../app/utils/agentText";

type Env = Record<string, unknown>;

const PROTOCOL_VERSION = "2025-06-18";

// Matches /.well-known/mcp/server-card.json exactly.
const SERVER_INFO = {
  name: "ariaxhan-portfolio",
  title: "Aria Han Portfolio",
  version: "1.0.0",
};

const CAPABILITIES = { tools: { listChanged: false } };

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
      serverInfo: SERVER_INFO,
      protocolVersion: PROTOCOL_VERSION,
      capabilities: CAPABILITIES,
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
        serverInfo: SERVER_INFO,
        capabilities: CAPABILITIES,
      },
    });
  }

  if (method === "tools/list") {
    return json({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
  }

  if (method === "tools/call") {
    const name = params?.name;
    const text =
      name === "get_bio" ? mcpBioMd() :
      name === "get_projects" ? mcpProjectsMd() :
      name === "get_writing" ? mcpWritingMd() : null;
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
