import {
  contentDiagnosticHeaders,
  getSiteContent,
  type ResolvedSiteContent,
} from "@/app/content/repository";
import {
  renderAboutMd,
  renderOpenSourceMd,
  renderSystemsMd,
  renderWritingMd,
} from "@/app/content/machine";

export const dynamic = "force-dynamic";

const PROTOCOL_VERSION = "2025-06-18";
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
    description: "Return Aria Han's public projects.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_writing",
    title: "Get Writing",
    description: "Return Aria Han's public writing.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function json(
  body: unknown,
  resolved: Pick<ResolvedSiteContent, "revisionId" | "publicationId" | "source">,
  status = 200,
) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      ...contentDiagnosticHeaders(resolved),
    },
  });
}

export async function GET() {
  const resolved = await getSiteContent();
  return json(
    {
      serverInfo: SERVER_INFO,
      protocolVersion: PROTOCOL_VERSION,
      capabilities: CAPABILITIES,
    },
    resolved,
  );
}

export async function POST(request: Request) {
  const resolved = await getSiteContent();
  let payload: {
    id?: unknown;
    method?: unknown;
    params?: { name?: unknown };
  };
  try {
    payload = await request.json();
  } catch {
    return json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      resolved,
      400,
    );
  }

  const { id, method, params } = payload;
  if (method === "initialize") {
    return json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          serverInfo: SERVER_INFO,
          capabilities: CAPABILITIES,
        },
      },
      resolved,
    );
  }
  if (method === "tools/list") {
    return json({ jsonrpc: "2.0", id, result: { tools: TOOLS } }, resolved);
  }
  if (method === "tools/call") {
    const text =
      params?.name === "get_bio"
        ? renderAboutMd(resolved.content)
        : params?.name === "get_projects"
          ? `${renderSystemsMd(resolved.content)}\n\n${renderOpenSourceMd(resolved.content)}`
          : params?.name === "get_writing"
            ? renderWritingMd(resolved.content)
            : null;
    if (text === null) {
      return json(
        {
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: `Unknown tool: ${String(params?.name)}` },
        },
        resolved,
        400,
      );
    }
    return json(
      { jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } },
      resolved,
    );
  }
  return json(
    {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Unknown method: ${String(method)}` },
    },
    resolved,
    400,
  );
}

