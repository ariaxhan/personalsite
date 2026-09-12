// ============================================================================
// PROJECT DETAIL
// Every project already carried a full narrative (thesis, problem, built,
// stack, proof, learned, proves, closing) and none of it had a URL: it all
// rendered inside /systems/ and /open-source/ behind a card interaction. That
// left roughly seventeen pieces of long-form technical writing structurally
// unable to rank, and is the most likely reason /open-source/ was not indexed
// at all. Measured 2026-07-28, see
// _meta/research/2026-07-28-discoverability-audit.md.
//
// This route renders the same data as static HTML, one URL per project. No new
// content, no new source of truth: it reads projectsData like every other
// surface. No em dashes.
// ============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectArticle from "../../components/ProjectArticle";
import { projects } from "../../utils/projectsData";
import { pageMeta } from "../../utils/pageMeta";
import JsonLd from "../../components/studio/JsonLd";
import { projectSchema, breadcrumbSchema } from "../../utils/jsonLd";
import StudioFooter from "../../components/StudioFooter";
import { getSiteContent } from "../../content/repository";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { content } = await getSiteContent();
  const project = content.projectBySlug(slug);
  if (!project) return {};

  const kindLabel =
    project.kind === "open-source"
      ? "open source"
      : project.kind === "research"
        ? "research"
        : project.kind === "company"
          ? "company"
          : "product";

  return pageMeta({
    title: `${project.name}, ${kindLabel} by Aria Han`,
    ogTitle: `${project.name} | Aria Han`,
    description: `${project.thesis} ${project.stack}`.slice(0, 300),
    path: `/projects/${project.slug}/`,
    type: "article",
  }, content.SITE);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content } = await getSiteContent();
  const project = content.projectBySlug(slug);
  if (!project) notFound();

  const listPath = project.kind === "open-source" ? "/open-source/" : "/systems/";
  const listLabel = project.kind === "open-source" ? "Open Source" : "Systems";

  return (
    <main className="relative">
      <JsonLd data={projectSchema(content, project)} />
      <JsonLd
        data={breadcrumbSchema(content, [
          { name: listLabel, path: listPath },
          { name: project.name, path: `/projects/${project.slug}/` },
        ])}
      />

      <ProjectArticle slug={project.slug} />

      <StudioFooter />
    </main>
  );
}
