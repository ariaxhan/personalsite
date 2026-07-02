type EmailBinding = {
  send(message: {
    to: string;
    from: { email: string; name: string };
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
  }): Promise<{ messageId?: string }>;
};

type Env = {
  EMAIL?: EmailBinding;
  PROJECT_REVIEW_TO_EMAIL?: string;
  PROJECT_REVIEW_FROM_EMAIL?: string;
};

type ProjectReviewSubmission = {
  name?: unknown;
  email?: unknown;
  projectName?: unknown;
  projectStage?: unknown;
  projectTypes?: unknown;
  origin?: unknown;
  uniqueContribution?: unknown;
  artifactIntent?: unknown;
  architecture?: unknown;
  links?: unknown;
  question?: unknown;
  timeline?: unknown;
  company?: unknown;
};

const TO_EMAIL = "ariaxhan@gmail.com";
const FROM_EMAIL = "reviews@ariaxhan.com";
const MAX_FIELD_LENGTH = 4000;
const MAX_BODY_LENGTH = 24000;

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, 405);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Send JSON, not form encoding." }, 415);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_LENGTH) {
    return json({ error: "That submission is too long. Send the shorter version first." }, 413);
  }

  let body: ProjectReviewSubmission;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Could not read the form payload." }, 400);
  }

  if (stringValue(body.company)) {
    return json({ ok: true });
  }

  const submission = normalizeSubmission(body);
  const errors = validateSubmission(submission);
  if (errors.length > 0) {
    return json({ error: errors.join(" ") }, 400);
  }

  if (!env.EMAIL) {
    return json({ error: "Email delivery is not configured yet." }, 503);
  }

  const to = env.PROJECT_REVIEW_TO_EMAIL || TO_EMAIL;
  const from = env.PROJECT_REVIEW_FROM_EMAIL || FROM_EMAIL;
  const subject = `Project review: ${submission.projectName || submission.name}`;

  try {
    const result = await env.EMAIL.send({
      to,
      from: { email: from, name: "Aria Han" },
      replyTo: submission.email,
      subject,
      text: buildTextEmail(submission),
      html: buildHtmlEmail(submission),
    });

    return json({ ok: true, messageId: result.messageId || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email delivery failed.";
    console.error("Project review email failed", message);
    return json({ error: "Could not send the submission. Email me directly if this keeps happening." }, 502);
  }
};

function normalizeSubmission(body: ProjectReviewSubmission) {
  return {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    projectName: clean(body.projectName),
    projectStage: clean(body.projectStage),
    projectTypes: Array.isArray(body.projectTypes)
      ? body.projectTypes.map(clean).filter(Boolean).slice(0, 12)
      : [],
    origin: clean(body.origin),
    uniqueContribution: clean(body.uniqueContribution),
    artifactIntent: clean(body.artifactIntent),
    architecture: clean(body.architecture),
    links: clean(body.links),
    question: clean(body.question),
    timeline: clean(body.timeline),
  };
}

function validateSubmission(submission: ReturnType<typeof normalizeSubmission>): string[] {
  const errors: string[] = [];

  if (!submission.name) errors.push("Name is required.");
  if (!isEmail(submission.email)) errors.push("A valid email is required.");
  if (!submission.projectStage) errors.push("Project stage is required.");
  if (!submission.origin) errors.push("Origin story is required.");
  if (!submission.uniqueContribution) errors.push("What makes it yours is required.");
  if (!submission.artifactIntent) errors.push("What it is meant to be is required.");
  if (!submission.question) errors.push("What you want help deciding is required.");

  return errors;
}

function buildTextEmail(submission: ReturnType<typeof normalizeSubmission>): string {
  const lines = [
    "New project review submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Project: ${submission.projectName || "Not provided"}`,
    `Stage: ${submission.projectStage}`,
    `Review focus: ${submission.projectTypes.join(", ") || "Not selected"}`,
    `Timeline: ${submission.timeline || "Not provided"}`,
    "",
    "What inspired this:",
    submission.origin,
    "",
    "What makes it theirs:",
    submission.uniqueContribution,
    "",
    "What it is meant to be:",
    submission.artifactIntent,
    "",
    "Architecture / tools:",
    submission.architecture || "Not provided",
    "",
    "Links / docs:",
    submission.links || "Not provided",
    "",
    "What they want help deciding:",
    submission.question,
  ];

  return lines.join("\n");
}

function buildHtmlEmail(submission: ReturnType<typeof normalizeSubmission>): string {
  const rows: Array<[string, string]> = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Project", submission.projectName || "Not provided"],
    ["Stage", submission.projectStage],
    ["Review focus", submission.projectTypes.join(", ") || "Not selected"],
    ["Timeline", submission.timeline || "Not provided"],
    ["What inspired this", submission.origin],
    ["What makes it theirs", submission.uniqueContribution],
    ["What it is meant to be", submission.artifactIntent],
    ["Architecture / tools", submission.architecture || "Not provided"],
    ["Links / docs", submission.links || "Not provided"],
    ["What they want help deciding", submission.question],
  ];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #2c2823; line-height: 1.55;">
      <h1 style="font-size: 22px; margin: 0 0 18px;">New project review submission</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="border-top: 1px solid #d8cdbc; padding: 12px 14px 12px 0; text-align: left; vertical-align: top; width: 190px; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: #8a8275;">${escapeHtml(label)}</th>
                <td style="border-top: 1px solid #d8cdbc; padding: 12px 0; white-space: pre-wrap;">${linkify(escapeHtml(value))}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().slice(0, MAX_FIELD_LENGTH);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function linkify(value: string): string {
  return value.replace(
    /\bhttps?:\/\/[^\s<]+/g,
    (url) => `<a href="${url}" style="color: #9b4f38;">${url}</a>`,
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}

function corsHeaders(): Record<string, string> {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}
