import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_CONTENT,
  type SiteContent,
} from "../app/content/defaultContent";
import {
  SITEMAP_STATIC_ROUTES,
  calculateSignificantChangeDates,
  type PublicationSnapshot,
} from "../app/content/sitemapHistory";
import { canonicalizeContent } from "../app/content/validation";

type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key] extends object
    ? Mutable<T[Key]>
    : T[Key];
};

const baseline = Object.fromEntries([
  ...SITEMAP_STATIC_ROUTES.map((route) => [
    route,
    "2026-01-01T00:00:00.000Z",
  ]),
  ["projects", "2026-01-01T00:00:00.000Z"],
]);

function snapshot(
  publicationId: string,
  publishedAt: string,
  mutate: (content: Mutable<SiteContent>) => void,
): PublicationSnapshot {
  const content = structuredClone(DEFAULT_SITE_CONTENT) as Mutable<SiteContent>;
  mutate(content);
  return {
    publicationId,
    publishedAt,
    content: canonicalizeContent(content).content,
  };
}

describe("sitemap significant-change history", () => {
  it("keeps route dates independent and ignores same-content cache rebuilds", () => {
    const about = snapshot(
      "pub-about",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.PAGE_COPY.about.title += " updated";
      },
    );
    const contact = snapshot(
      "pub-contact",
      "2026-03-01T00:00:00.000Z",
      (content) => {
        content.PAGE_COPY.about.title += " updated";
        content.PAGE_COPY.contact.title += " updated";
      },
    );
    const rebuild: PublicationSnapshot = {
      publicationId: "pub-rebuild",
      publishedAt: "2026-04-01T00:00:00.000Z",
      content: canonicalizeContent(contact.content).content,
    };

    const result = calculateSignificantChangeDates(
      [about, contact, rebuild],
      rebuild.publicationId,
      rebuild.content,
      baseline,
    );

    expect(result.get("/about/")).toBe(about.publishedAt);
    expect(result.get("/contact/")).toBe(contact.publishedAt);
    expect(result.get("/writing/")).toBe(baseline["/writing/"]);
  });

  it("dates a rollback when the public representation changes back", () => {
    const changed = snapshot(
      "pub-changed",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.PAGE_COPY.about.title += " updated";
        content.PAGE_COPY.contact.title += " updated";
      },
    );
    const rollback: PublicationSnapshot = {
      publicationId: "pub-rollback",
      publishedAt: "2026-03-01T00:00:00.000Z",
      content: canonicalizeContent(DEFAULT_SITE_CONTENT).content,
    };

    const result = calculateSignificantChangeDates(
      [changed, rollback],
      rollback.publicationId,
      rollback.content,
      baseline,
    );

    expect(result.get("/about/")).toBe(rollback.publishedAt);
    expect(result.get("/contact/")).toBe(rollback.publishedAt);
    expect(result.get("/writing/")).toBe(baseline["/writing/"]);
  });

  it("fails closed when the canonical publication is missing", () => {
    expect(() =>
      calculateSignificantChangeDates(
        [],
        "pub-missing",
        canonicalizeContent(DEFAULT_SITE_CONTENT).content,
        baseline,
      ),
    ).toThrow("canonical publication is absent from sitemap history");
  });

  it("keeps product and open-source listing dates independent", () => {
    const openSourceEdit = snapshot(
      "pub-open-source",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        const agentmailkit = content.projects.find(
          (project) => project.slug === "agentmailkit",
        );
        if (!agentmailkit) throw new Error("agentmailkit fixture is missing");
        agentmailkit.thesis += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [openSourceEdit],
      openSourceEdit.publicationId,
      openSourceEdit.content,
      baseline,
    );

    expect(result.get("/open-source/")).toBe(openSourceEdit.publishedAt);
    expect(result.get("/systems/")).toBe(baseline["/systems/"]);
  });

  it("dates About when shared identity data changes", () => {
    const identityEdit = snapshot(
      "pub-identity",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.SITE.tldr += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [identityEdit],
      identityEdit.publicationId,
      identityEdit.content,
      baseline,
    );

    expect(result.get("/about/")).toBe(identityEdit.publishedAt);
  });

  it("dates Contact when its project-review bullets change", () => {
    const contactEdit = snapshot(
      "pub-contact-bullet",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.projectReviewBullets[0] += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [contactEdit],
      contactEdit.publicationId,
      contactEdit.content,
      baseline,
    );

    expect(result.get("/contact/")).toBe(contactEdit.publishedAt);
    expect(result.get("/project-review/")).toBe(contactEdit.publishedAt);
  });

  it("dates connected project pages when a displayed project name changes", () => {
    const relatedNameEdit = snapshot(
      "pub-related-name",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        const connected = content.projects.find(
          (project) => project.slug === "llm-bench",
        );
        if (!connected) throw new Error("llm-bench fixture is missing");
        connected.name += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [relatedNameEdit],
      relatedNameEdit.publicationId,
      relatedNameEdit.content,
      baseline,
    );

    expect(result.get("/projects/llm-bench/")).toBe(relatedNameEdit.publishedAt);
    expect(result.get("/projects/modelmind/")).toBe(relatedNameEdit.publishedAt);
  });

  it("dates every HTML route when shared site identity changes", () => {
    const sharedEdit = snapshot(
      "pub-shared",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.SITE.role += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [sharedEdit],
      sharedEdit.publicationId,
      sharedEdit.content,
      baseline,
    );

    for (const route of result.keys()) {
      expect(result.get(route), route).toBe(sharedEdit.publishedAt);
    }
  });

  it("dates the homepage when server-rendered homepage copy changes", () => {
    const homeCopyEdit = snapshot(
      "pub-home-copy",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.PAGE_COPY.systemDiagram.label += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [homeCopyEdit],
      homeCopyEdit.publicationId,
      homeCopyEdit.content,
      baseline,
    );

    expect(result.get("/")).toBe(homeCopyEdit.publishedAt);
    expect(result.get("/about/")).toBe(baseline["/about/"]);
  });

  it("dates the homepage when a displayed homepage collection changes", () => {
    const homeCollectionEdit = snapshot(
      "pub-home-collection",
      "2026-02-01T00:00:00.000Z",
      (content) => {
        content.deskObjects[0].caption += " updated";
      },
    );

    const result = calculateSignificantChangeDates(
      [homeCollectionEdit],
      homeCollectionEdit.publicationId,
      homeCollectionEdit.content,
      baseline,
    );

    expect(result.get("/")).toBe(homeCollectionEdit.publishedAt);
    expect(result.get("/writing/")).toBe(baseline["/writing/"]);
  });
});
