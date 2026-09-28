import { describe, expect, it } from "vitest";
import {
  hasKoreanPage,
  localizeHref,
  parseLocaleCookie,
  preferredLocaleRedirect,
} from "../app/utils/locale";

const page = (path: string, cookie?: string, extra: Record<string, string> = {}) => {
  const url = new URL(`https://ariaxhan.com${path}`);
  const headers: Record<string, string> = { accept: "text/html", ...extra };
  if (cookie) headers.cookie = cookie;
  return preferredLocaleRedirect(new Request(url, { headers }), url);
};

describe("locale links", () => {
  it("keeps internal links in Korean and leaves the rest alone", () => {
    expect(localizeHref("/contact/", "ko")).toBe("/ko/contact/");
    expect(localizeHref("/systems/#kernel", "ko")).toBe("/ko/systems/#kernel");
    expect(localizeHref("/", "ko")).toBe("/ko/");
    expect(localizeHref("/ko/proof/", "ko")).toBe("/ko/proof/");
    expect(localizeHref("/contact/", "en")).toBe("/contact/");
    expect(localizeHref("https://medium.com/x", "ko")).toBe("https://medium.com/x");
    expect(localizeHref("mailto:a@b.c", "ko")).toBe("mailto:a@b.c");
    expect(localizeHref("/llms.txt", "ko")).toBe("/llms.txt");
    expect(localizeHref("/mcp/", "ko")).toBe("/mcp/");
  });

  it("knows which pages have a Korean mirror", () => {
    expect(hasKoreanPage("/projects/kernel/")).toBe(true);
    expect(hasKoreanPage("/edit/")).toBe(false);
    expect(hasKoreanPage("/api/site-index.json")).toBe(false);
  });

  it("reads only a valid locale cookie", () => {
    expect(parseLocaleCookie("a=1; locale=ko")).toBe("ko");
    expect(parseLocaleCookie("locale=fr")).toBeNull();
    expect(parseLocaleCookie(null)).toBeNull();
  });
});

describe("saved language redirect", () => {
  it("sends a Korean-preferring visitor to the Korean page", () => {
    expect(page("/writing/?x=1", "locale=ko")).toBe("/ko/writing/?x=1");
    expect(page("/", "locale=ko")).toBe("/ko/");
  });

  it("sends an English-preferring visitor back to English", () => {
    expect(page("/ko/about/", "locale=en")).toBe("/about/");
  });

  it("does nothing without a choice, on matching pages, or for non-documents", () => {
    expect(page("/writing/")).toBeNull();
    expect(page("/ko/writing/", "locale=ko")).toBeNull();
    expect(page("/mcp/", "locale=ko")).toBeNull();
    expect(page("/writing/", "locale=ko", { rsc: "1" })).toBeNull();
    expect(page("/writing/", "locale=ko", { accept: "*/*" })).toBeNull();
    expect(page("/writing/?edit=true", "locale=ko")).toBeNull();
  });
});
