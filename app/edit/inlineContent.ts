import type { SiteContent } from "../content/defaultContent";
import { isEditableContentPath } from "../content/editablePaths";

export type EditableField = {
  path: string;
  value: string;
};

export function flattenEditableContent(value: unknown, path = ""): EditableField[] {
  if (typeof value === "string") {
    return path && isEditableContentPath(path) ? [{ path, value }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((child, index) =>
      flattenEditableContent(child, path ? `${path}.${index}` : `${index}`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      flattenEditableContent(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

export function replaceContentAtPath(
  content: SiteContent,
  path: string,
  value: string,
): SiteContent {
  const clone = structuredClone(content) as unknown as Record<string, unknown>;
  const parts = path.split(".");
  let cursor: Record<string, unknown> | unknown[] = clone;
  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = (cursor as Record<string, unknown>)[parts[index]] as
      | Record<string, unknown>
      | unknown[];
  }
  (cursor as Record<string, unknown>)[parts.at(-1)!] = value;
  return clone as unknown as SiteContent;
}
