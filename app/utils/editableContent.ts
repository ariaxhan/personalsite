import {
  PAGE_COPY,
  SITE,
  WRITING_THEMES,
  articles,
  books,
  deskObjects,
  engagements,
  goodFit,
  hackathons,
  mapDefaultBlurb,
  moments,
  notAFit,
  notForAudience,
  obsessions,
  openSourceProjects,
  productProjects,
  projectReviewBullets,
  projects,
  reviewAudience,
  reviewDeliverables,
  timelineTerminus,
  topics,
  workingStyle,
} from "./siteCopy";

export interface EditableContentEntry {
  key: string;
  group: string;
  label: string;
  value: string;
}

const roots = {
  site: SITE,
  projects,
  productProjects,
  openSourceProjects,
  studio: {
    deskObjects,
    books,
    obsessions,
    topics,
    mapDefaultBlurb,
    moments,
    timelineTerminus,
    hackathons,
  },
  services: {
    projectReviewBullets,
    reviewDeliverables,
    reviewAudience,
    notForAudience,
    engagements,
    goodFit,
    notAFit,
    workingStyle,
  },
  writing: {
    themes: WRITING_THEMES,
    articles,
  },
  page: PAGE_COPY,
};

const structuralKeys = new Set([
  "accent",
  "connections",
  "external",
  "gallery",
  "href",
  "image",
  "key",
  "kind",
  "link",
  "logo",
  "meta",
  "path",
  "plate",
  "plateFit",
  "poster",
  "slug",
  "source",
  "themes",
  "url",
  "verified",
  "video",
]);

export function editableContentCatalog(): EditableContentEntry[] {
  const entries: EditableContentEntry[] = [];
  flatten("", roots, entries);
  return dedupe(entries);
}

function flatten(
  path: string,
  value: unknown,
  entries: EditableContentEntry[],
): void {
  if (typeof value === "string") {
    const parts = path.split(".");
    const leaf = parts.at(-1) ?? path;
    if (!isEditable(parts, leaf, value)) return;
    entries.push({
      key: path,
      group: groupLabel(parts[0] ?? "site"),
      label: fieldLabel(parts),
      value,
    });
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(`${path}.${index}`, item, entries));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      flatten(path ? `${path}.${key}` : key, item, entries);
    });
  }
}

function isEditable(parts: string[], leaf: string, value: string): boolean {
  if (!value.trim()) return false;
  if (parts.some((part) => structuralKeys.has(part))) return false;
  if (leaf === "value" && parts.includes("proof")) return false;
  if (/^(https?:\/\/|mailto:|\/)/i.test(value)) return false;
  if (/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(value)) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(value)) return false;
  return true;
}

function fieldLabel(parts: string[]): string {
  const meaningful = parts
    .slice(1)
    .filter((part) => !/^\d+$/.test(part))
    .slice(-3)
    .map(humanize);
  return meaningful.join(" · ") || humanize(parts.at(-1) ?? "Text");
}

function groupLabel(value: string): string {
  return humanize(value);
}

function humanize(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function dedupe(entries: EditableContentEntry[]): EditableContentEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.key)) return false;
    seen.add(entry.key);
    return true;
  });
}
