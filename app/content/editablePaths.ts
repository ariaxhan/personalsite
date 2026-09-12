const PROTECTED_KEY = new Set([
  "slug",
  "href",
  "url",
  "path",
  "link",
  "image",
  "plate",
  "gallery",
  "logo",
  "video",
  "poster",
  "accent",
  "color",
  "kind",
  "themes",
  "connections",
  "key",
  "type",
  "external",
  "x",
  "y",
]);

export function isEditableContentPath(path: string): boolean {
  if (path.startsWith("SITE.proof.")) return false;
  return !path.split(".").some((segment) => PROTECTED_KEY.has(segment));
}
