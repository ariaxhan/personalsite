import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DEFAULT_SITE_CONTENT } from "../../content/defaultContent";

const MAX_FIELD_LENGTH = 4000;
const MAX_BODY_LENGTH = 24000;

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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  const { PAGE_COPY } = DEFAULT_SITE_CONTENT;
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ error: PAGE_COPY.projectReviewApi.errors.jsonOnly }, 415);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_LENGTH) {
    return json({ error: PAGE_COPY.projectReviewApi.errors.tooLong }, 413);
  }

  let body: ProjectReviewSubmission;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: PAGE_COPY.projectReviewApi.errors.unreadable }, 400);
  }

  if (stringValue(body.company)) {
    return json({ ok: true });
  }

  const submission = normalizeSubmission(body);
  const errors = validateSubmission(submission, PAGE_COPY.projectReviewApi.errors);
  if (errors.length > 0) {
    return json({ error: errors.join(" ") }, 400);
  }

  let env: CloudflareEnv;
  try {
    ({ env } = await getCloudflareContext({ async: true }));
  } catch {
    return json({ error: PAGE_COPY.projectReviewApi.errors.localEmail }, 503);
  }

  let submissionId: number | null = null;
  try {
    const result = await env.DB.prepare(
      `INSERT INTO project_review_submissions (
        name, email, project_name, project_stage, project_types_json,
        origin, unique_contribution, artifact_intent, architecture,
        links, question, timeline, payload_json
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`,
    )
      .bind(
        submission.name,
        submission.email,
        submission.projectName || null,
        submission.projectStage,
        JSON.stringify(submission.projectTypes),
        submission.origin,
        submission.uniqueContribution,
        submission.artifactIntent,
        submission.architecture || null,
        submission.links || null,
        submission.question,
        submission.timeline || null,
        JSON.stringify(submission),
      )
      .run();
    submissionId = result.meta.last_row_id ?? null;
  } catch (error) {
    console.error("Project review database write failed", safeError(error));
    return json({ error: PAGE_COPY.projectReviewApi.errors.localEmail }, 503);
  }

  if (!env.EMAIL) {
    await updateEmailStatus(env.DB, submissionId, "not_configured", null, null);
    return json({ ok: true, submissionId, emailSent: false });
  }

  try {
    const result = await env.EMAIL.send({
      to: env.PROJECT_REVIEW_TO_EMAIL,
      from: { email: env.PROJECT_REVIEW_FROM_EMAIL, name: "Aria Han" },
      replyTo: submission.email,
      subject: `Project review: ${submission.projectName || submission.name}`,
      text: buildTextEmail(submission),
      html: buildHtmlEmail(submission),
    });
    await updateEmailStatus(env.DB, submissionId, "sent", result.messageId ?? null, null);
    return json({
      ok: true,
      submissionId,
      emailSent: true,
      messageId: result.messageId ?? null,
    });
  } catch (error) {
    const message = safeError(error);
    console.error("Project review email failed", message);
    await updateEmailStatus(env.DB, submissionId, "failed", null, message);
    return json({ ok: true, submissionId, emailSent: false });
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders() });
}

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

function validateSubmission(
  submission: ReturnType<typeof normalizeSubmission>,
  copy: {
    missingName: string;
    invalidEmail: string;
    missingStage: string;
    missingOrigin: string;
    missingUniqueContribution: string;
    missingArtifactIntent: string;
    missingQuestion: string;
  },
): string[] {
  const errors: string[] = [];

  if (!submission.name) errors.push(copy.missingName);
  if (!isEmail(submission.email)) errors.push(copy.invalidEmail);
  if (!submission.projectStage) errors.push(copy.missingStage);
  if (!submission.origin) errors.push(copy.missingOrigin);
  if (!submission.uniqueContribution) errors.push(copy.missingUniqueContribution);
  if (!submission.artifactIntent) errors.push(copy.missingArtifactIntent);
  if (!submission.question) errors.push(copy.missingQuestion);

  return errors;
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

async function updateEmailStatus(
  db: D1Database,
  submissionId: number | null,
  status: string,
  messageId: string | null,
  error: string | null,
) {
  if (submissionId === null) return;
  try {
    await db
      .prepare(
        `UPDATE project_review_submissions
         SET email_status = ?2, email_message_id = ?3, email_error = ?4
         WHERE id = ?1`,
      )
      .bind(submissionId, status, messageId, error)
      .run();
  } catch (updateError) {
    console.error("Project review email status update failed", safeError(updateError));
  }
}

function safeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function buildTextEmail(submission: ReturnType<typeof normalizeSubmission>): string {
  return [
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
  ].join("\n");
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

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#2c2823">
    <h1 style="font-size:20px">New project review submission</h1>
    ${rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
      )
      .join("")}
  </body></html>`;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );
}
