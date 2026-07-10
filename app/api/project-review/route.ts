import { NextRequest, NextResponse } from "next/server";
import { PAGE_COPY } from "../../utils/siteCopy";

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
    return NextResponse.json({ error: PAGE_COPY.projectReviewApi.errors.jsonOnly }, { status: 415 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: PAGE_COPY.projectReviewApi.errors.tooLong },
      { status: 413 },
    );
  }

  let body: ProjectReviewSubmission;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: PAGE_COPY.projectReviewApi.errors.unreadable }, { status: 400 });
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
    { error: PAGE_COPY.projectReviewApi.errors.localEmail },
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

  if (!submission.name) errors.push(PAGE_COPY.projectReviewApi.errors.missingName);
  if (!isEmail(submission.email)) errors.push(PAGE_COPY.projectReviewApi.errors.invalidEmail);
  if (!submission.projectStage) errors.push(PAGE_COPY.projectReviewApi.errors.missingStage);
  if (!submission.origin) errors.push(PAGE_COPY.projectReviewApi.errors.missingOrigin);
  if (!submission.uniqueContribution) errors.push(PAGE_COPY.projectReviewApi.errors.missingUniqueContribution);
  if (!submission.artifactIntent) errors.push(PAGE_COPY.projectReviewApi.errors.missingArtifactIntent);
  if (!submission.question) errors.push(PAGE_COPY.projectReviewApi.errors.missingQuestion);

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
