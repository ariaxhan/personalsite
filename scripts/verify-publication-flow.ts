import { CONTENT_PUBLIC_PATHS } from "../app/content/publicRoutes";
import type { SiteContent } from "../app/content/defaultContent";

type MutableSiteContent = Omit<SiteContent, "SITE"> & {
  SITE: Omit<SiteContent["SITE"], "tldr"> & { tldr: string };
};

const base = new URL(process.argv[2] ?? process.env.PREVIEW_BASE_URL ?? "");
const token = process.env.CMS_PREVIEW_TOKEN;
if (!token) throw new Error("CMS_PREVIEW_TOKEN is required");

const authHeaders = {
  "x-cms-dev-token": token,
  origin: base.origin,
  "sec-fetch-site": "same-origin",
};

async function api<T>(
  path: string,
  init: RequestInit = {},
  expectedStatuses = [200],
): Promise<{ status: number; data: T }> {
  const response = await fetch(new URL(path, base), {
    ...init,
    headers: {
      ...authHeaders,
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...init.headers,
    },
  });
  const data = (await response.json().catch(() => ({}))) as T;
  if (!expectedStatuses.includes(response.status)) {
    throw new Error(`${path} returned ${response.status}: ${JSON.stringify(data)}`);
  }
  return { status: response.status, data };
}

async function state() {
  return (
    await api<{
      publishedRevisionId: string;
      publishedOperationId: string;
      effectiveContent: SiteContent;
      revisions: Array<{ id: string }>;
      operations: Array<{ id: string; state: string }>;
    }>("/api/cms/state")
  ).data;
}

async function createRevision(
  content: unknown,
  basePublishedRevisionId: string,
) {
  return (
    await api<{ revision: { id: string } }>(
      "/api/cms/revisions",
      {
        method: "POST",
        body: JSON.stringify({ content, basePublishedRevisionId }),
      },
      [201],
    )
  ).data.revision.id;
}

async function publish(
  targetRevisionId: string,
  expectedRevisionId: string,
  idempotencyKey: string,
  forceFailure = false,
) {
  return api<{
    operation?: {
      id: string;
      target_revision_id: string;
      state: string;
    };
    error?: string;
  }>(
    "/api/cms/publish",
    {
      method: "POST",
      headers: forceFailure ? { "x-cms-force-invalidation-failure": "true" } : {},
      body: JSON.stringify({
        targetRevisionId,
        expectedRevisionId,
        idempotencyKey,
      }),
    },
    [200, 409],
  );
}

async function converge(operationId: string, revisionId: string) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const result = await api<{ ok?: boolean; error?: string }>(
      "/api/cms/converge",
      {
        method: "POST",
        body: JSON.stringify({
          operationId,
          observedRevisionId: revisionId,
        }),
      },
      [200, 409],
    );
    if (result.status === 200) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`publication ${operationId} did not converge`);
}

function htmlPair(body: string) {
  const tag = body.match(/<meta[^>]+name="aria-content-revision"[^>]*>/)?.[0] ?? "";
  return {
    revision: tag.match(/content="([^"]+)"/)?.[1],
    publication: tag.match(/data-publication="([^"]+)"/)?.[1],
  };
}

async function observePath(path: string) {
  const response = await fetch(new URL(path, base));
  const body = await response.text();
  const pair = response.headers.get("x-content-revision")
    ? {
        revision: response.headers.get("x-content-revision") ?? undefined,
        publication: response.headers.get("x-content-publication") ?? undefined,
      }
    : htmlPair(body);
  return { path, status: response.status, body, pair };
}

async function assertSnapshot(
  revisionId: string,
  publicationId: string,
  marker?: string,
) {
  const observations = await Promise.all(CONTENT_PUBLIC_PATHS.map(observePath));
  for (const item of observations) {
    if (item.status !== 200) throw new Error(`${item.path} returned ${item.status}`);
    if (
      item.pair.revision !== revisionId ||
      item.pair.publication !== publicationId
    ) {
      throw new Error(
        `${item.path} exposed ${item.pair.revision}:${item.pair.publication}`,
      );
    }
  }
  if (marker) {
    for (const path of ["/", "/index.md", "/llms.txt", "/api/site-index.json"]) {
      const item = observations.find((observation) => observation.path === path);
      if (!item?.body.includes(marker)) {
        throw new Error(`${path} did not expose edited marker`);
      }
    }
  }
  const sitemap = observations.find((item) => item.path === "/sitemap.xml")?.body ?? "";
  const lastModified = new Set(
    [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]),
  );
  if (lastModified.size < 2) throw new Error("sitemap lost route-level lastModified");
}

async function main() {
  const before = await state();
  const originalRevisionId = before.publishedRevisionId;
  const originalPublicationId = before.publishedOperationId;
  const originalContent = structuredClone(before.effectiveContent);
  let currentRevisionId = originalRevisionId;
  let currentPublicationId = originalPublicationId;
  const runId = crypto.randomUUID().slice(0, 8);

  try {
    const markerA = ` cms-e2e-a-${runId}`;
    const contentA = structuredClone(originalContent) as MutableSiteContent;
    contentA.SITE.tldr += markerA;
    const revisionA = await createRevision(contentA, originalRevisionId);
    const publicBeforePublish = await fetch(new URL("/", base)).then((response) =>
      response.text(),
    );
    if (publicBeforePublish.includes(markerA)) {
      throw new Error("saving a draft changed public output");
    }

    const publishA = await publish(
      revisionA,
      originalRevisionId,
      crypto.randomUUID(),
    );
    if (publishA.status !== 200 || !publishA.data.operation) {
      throw new Error(`publish A failed: ${JSON.stringify(publishA.data)}`);
    }
    await converge(publishA.data.operation.id, revisionA);
    currentRevisionId = revisionA;
    currentPublicationId = publishA.data.operation.id;
    await assertSnapshot(revisionA, currentPublicationId, markerA);

    const markerB = ` cms-e2e-b-${runId}`;
    const contentB = structuredClone(contentA) as MutableSiteContent;
    contentB.SITE.tldr = originalContent.SITE.tldr + markerB;
    const revisionB = await createRevision(contentB, revisionA);
    const idempotencyKey = crypto.randomUUID();
    const [firstB, replayB] = await Promise.all([
      publish(revisionB, revisionA, idempotencyKey, true),
      publish(revisionB, revisionA, idempotencyKey, true),
    ]);
    if (
      firstB.status !== 200 ||
      replayB.status !== 200 ||
      !firstB.data.operation ||
      !replayB.data.operation ||
      firstB.data.operation.id !== replayB.data.operation.id
    ) {
      throw new Error("concurrent idempotent publish did not return one operation");
    }
    if (firstB.data.operation.state !== "published_with_stale_cache") {
      throw new Error("forced invalidation failure was not recorded truthfully");
    }
    const conflictReplay = await publish(
      revisionA,
      revisionA,
      idempotencyKey,
    );
    if (conflictReplay.status !== 409) {
      throw new Error("changed idempotency fingerprint did not conflict");
    }
    currentRevisionId = revisionB;
    currentPublicationId = firstB.data.operation.id;

    await api(
      "/api/cms/retry",
      {
        method: "POST",
        body: JSON.stringify({ operationId: currentPublicationId }),
      },
      [200],
    );
    await converge(currentPublicationId, revisionB);
    await assertSnapshot(revisionB, currentPublicationId, markerB);

    const raceOne = structuredClone(contentB) as MutableSiteContent;
    raceOne.SITE.tldr = `${originalContent.SITE.tldr} cms-race-one-${runId}`;
    const raceTwo = structuredClone(contentB) as MutableSiteContent;
    raceTwo.SITE.tldr = `${originalContent.SITE.tldr} cms-race-two-${runId}`;
    const [raceRevisionOne, raceRevisionTwo] = await Promise.all([
      createRevision(raceOne, revisionB),
      createRevision(raceTwo, revisionB),
    ]);
    const raceResults = await Promise.all([
      publish(raceRevisionOne, revisionB, crypto.randomUUID()),
      publish(raceRevisionTwo, revisionB, crypto.randomUUID()),
    ]);
    const winner = raceResults.find((result) => result.status === 200)?.data.operation;
    const loser = raceResults.find((result) => result.status === 409);
    if (!winner || !loser) throw new Error("stale publish race did not produce one winner");
    await converge(winner.id, winner.target_revision_id);
    currentRevisionId = winner.target_revision_id;
    currentPublicationId = winner.id;

    const rollback = await publish(
      originalRevisionId,
      currentRevisionId,
      crypto.randomUUID(),
    );
    if (rollback.status !== 200 || !rollback.data.operation) {
      throw new Error(`rollback failed: ${JSON.stringify(rollback.data)}`);
    }
    await converge(rollback.data.operation.id, originalRevisionId);
    currentRevisionId = originalRevisionId;
    currentPublicationId = rollback.data.operation.id;
    await assertSnapshot(originalRevisionId, currentPublicationId);

    const after = await state();
    if (after.revisions.length !== before.revisions.length + 4) {
      throw new Error("publication drill created an unexpected revision count");
    }
    if (after.operations.length !== before.operations.length + 4) {
      throw new Error("publication drill created an unexpected operation count");
    }
    process.stdout.write(
      JSON.stringify({
        draftDidNotPublish: true,
        concurrentIdempotency: true,
        retryAfterFailure: true,
        staleRace: true,
        rollback: true,
        finalRevision: after.publishedRevisionId,
        finalPublication: after.publishedOperationId,
      }) + "\n",
    );
  } finally {
    if (currentRevisionId !== originalRevisionId) {
      const emergencyRollback = await publish(
        originalRevisionId,
        currentRevisionId,
        crypto.randomUUID(),
      );
      if (emergencyRollback.status === 200 && emergencyRollback.data.operation) {
        await converge(emergencyRollback.data.operation.id, originalRevisionId);
      }
    }
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exit(1);
  },
);
