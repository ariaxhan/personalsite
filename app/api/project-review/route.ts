import { NextRequest, NextResponse } from "next/server";

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
  return new Response(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Send JSON, not form encoding." }, { status: 415 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: "That submission is too long. Send the shorter version first." },
      { status: 413 },
    );
  }

  let body: ProjectReviewSubmission;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Could not read the form payload." }, { status: 400 });
  }

  if (stringValue(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const submission = normalizeSubmission(body);
  const errors = validateSubmission(submission);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  return NextResponse.json(
    {
      error:
        "Local Next dev received this form, but email delivery runs through Cloudflare Pages. Use wrangler pages dev or the deployed site to test delivery.",
    },
    { status: 503 },
  );
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
