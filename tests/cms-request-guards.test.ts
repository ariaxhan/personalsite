import { describe, expect, it } from "vitest";
import {
  CmsAuthError,
  isCmsEditorEnabled,
  requireJsonRequest,
  requireSameOrigin,
} from "../app/content/auth";

function request(headers: Record<string, string> = {}) {
  return new Request("https://preview.example/api/cms/publish", {
    method: "POST",
    headers,
  });
}

describe("CMS mutation request guards", () => {
  it("accepts same-origin JSON and rejects absent or cross-site origins", () => {
    expect(() =>
      requireJsonRequest(
        request({
          origin: "https://preview.example",
          "sec-fetch-site": "same-origin",
          "content-type": "application/json; charset=utf-8",
        }),
      ),
    ).not.toThrow();

    expect(() => requireSameOrigin(request())).toThrow(CmsAuthError);
    expect(() =>
      requireSameOrigin(
        request({
          origin: "https://evil.example",
          "sec-fetch-site": "cross-site",
        }),
      ),
    ).toThrow("same-origin request required");
  });

  it("rejects non-JSON mutation bodies", () => {
    expect(() =>
      requireJsonRequest(
        request({
          origin: "https://preview.example",
          "content-type": "text/plain",
        }),
      ),
    ).toThrow("application/json required");
  });

  it("requires an explicit editor-enable switch", () => {
    expect(isCmsEditorEnabled("true")).toBe(true);
    expect(isCmsEditorEnabled("false")).toBe(false);
    expect(isCmsEditorEnabled("enabled")).toBe(false);
    expect(isCmsEditorEnabled(undefined)).toBe(false);
  });
});
