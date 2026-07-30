import { describe, expect, it } from "vitest";
import {
  CONTENT_RECOVERY_MARKER,
  normalizeRecoveryResponse,
} from "../app/content/recoveryResponse";

describe("content recovery response", () => {
  it("turns the recovery error page into a non-cacheable 503", async () => {
    const response = await normalizeRecoveryResponse(
      new Response("OpenNext internal error", {
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=3600",
          "Content-Type": "text/html; charset=utf-8",
          ETag: '"stale"',
        },
      }),
    );

    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("retry-after")).toBe("60");
    expect(response.headers.get("x-content-source")).toBe("git-recovery");
    expect(response.headers.get("etag")).toBeNull();
    await expect(response.text()).resolves.toContain(CONTENT_RECOVERY_MARKER);
    await expect(
      normalizeRecoveryResponse(
        new Response("OpenNext internal error", {
          status: 500,
          headers: { "Content-Type": "text/html" },
        }),
      ).then((result) => result.text()),
    ).resolves.toContain("AI for work, AI for humans.");
  });

  it("does not relabel unrelated failures or successful responses", async () => {
    const unrelated = await normalizeRecoveryResponse(
      new Response("broken", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      }),
    );
    const success = await normalizeRecoveryResponse(
      new Response(`<main ${CONTENT_RECOVERY_MARKER}>not an error</main>`, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }),
    );

    expect(unrelated.status).toBe(500);
    expect(success.status).toBe(200);
  });
});
