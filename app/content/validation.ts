import { createHash } from "node:crypto";
import { DEFAULT_SITE_CONTENT, type SiteContent } from "./defaultContent";
import { isEditableContentPath } from "./editablePaths";
export { isEditableContentPath } from "./editablePaths";

const MAX_BYTES = 512 * 1024;
const MAX_DEPTH = 16;
const RAW_HTML = /<\s*\/?\s*[a-z][^>]*>/i;

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

function normalize(value: unknown): unknown {
  if (typeof value === "string") return value.normalize("NFC");
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, normalize(child)]),
    );
  }
  return value;
}

function compareShape(candidate: unknown, template: unknown, path: string, depth: number): void {
  if (depth > MAX_DEPTH) throw new ContentValidationError(`${path} exceeds maximum nesting depth`);

  if (typeof template === "string") {
    if (typeof candidate !== "string") throw new ContentValidationError(`${path} must be text`);
    if (RAW_HTML.test(candidate)) throw new ContentValidationError(`${path} cannot contain raw HTML`);
    return;
  }

  if (typeof template === "number" || typeof template === "boolean") {
    if (typeof candidate !== typeof template) {
      throw new ContentValidationError(`${path} must be ${typeof template}`);
    }
    return;
  }

  if (template === null) {
    if (candidate !== null) throw new ContentValidationError(`${path} must be null`);
    return;
  }

  if (Array.isArray(template)) {
    if (!Array.isArray(candidate)) throw new ContentValidationError(`${path} must be a list`);
    if (candidate.length !== template.length) {
      throw new ContentValidationError(`${path} must keep ${template.length} items`);
    }
    candidate.forEach((child, index) =>
      compareShape(child, template[index], `${path}.${index}`, depth + 1),
    );
    return;
  }

  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    throw new ContentValidationError(`${path} must be an object`);
  }

  const expected = Object.keys(template as Record<string, unknown>).sort();
  const actual = Object.keys(candidate as Record<string, unknown>).sort();
  if (expected.join("\0") !== actual.join("\0")) {
    throw new ContentValidationError(`${path} has missing or unknown fields`);
  }

  for (const key of expected) {
    compareShape(
      (candidate as Record<string, unknown>)[key],
      (template as Record<string, unknown>)[key],
      `${path}.${key}`,
      depth + 1,
    );
  }
}

function compareProtected(candidate: unknown, template: unknown, path: string): void {
  if (Array.isArray(template) && Array.isArray(candidate)) {
    template.forEach((child, index) => compareProtected(candidate[index], child, `${path}.${index}`));
    return;
  }
  if (
    template &&
    candidate &&
    typeof template === "object" &&
    typeof candidate === "object" &&
    !Array.isArray(template) &&
    !Array.isArray(candidate)
  ) {
    for (const key of Object.keys(template as Record<string, unknown>)) {
      compareProtected(
        (candidate as Record<string, unknown>)[key],
        (template as Record<string, unknown>)[key],
        path ? `${path}.${key}` : key,
      );
    }
    return;
  }
  if (!isEditableContentPath(path) && candidate !== template) {
    throw new ContentValidationError(`${path} is fixed in code`);
  }
}

export function canonicalizeContent(candidate: unknown): {
  content: SiteContent;
  json: string;
  sha256: string;
} {
  compareShape(candidate, DEFAULT_SITE_CONTENT, "site", 0);
  compareProtected(candidate, DEFAULT_SITE_CONTENT, "");
  const content = normalize(candidate) as SiteContent;
  const json = JSON.stringify(content);
  const bytes = new TextEncoder().encode(json).byteLength;
  if (bytes > MAX_BYTES) {
    throw new ContentValidationError(`content is ${bytes} bytes; maximum is ${MAX_BYTES}`);
  }
  return {
    content,
    json,
    sha256: createHash("sha256").update(json).digest("hex"),
  };
}
