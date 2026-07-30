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
import Link from "next/link";
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
  const related = project.connections
    .map((s) => content.projectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="relative">
      <JsonLd data={projectSchema(content, project)} />
      <JsonLd
        data={breadcrumbSchema(content, [
          { name: listLabel, path: listPath },
          { name: project.name, path: `/projects/${project.slug}/` },
        ])}
      />

      <article className="mx-auto max-w-content px-5 pb-24 pt-28 sm:px-8">
        <nav aria-label="Breadcrumb" className="kicker mb-8">
          <Link href={listPath} className="underline-offset-4 hover:underline">
            {listLabel}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{project.name}</span>
        </nav>

        <header className="mb-12">
          <p className="kicker mb-3">{project.status}</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-5 max-w-prose font-serif text-xl italic leading-relaxed">
            {project.thesis}
          </p>
        </header>

        <section className="mb-12 max-w-prose">
          <h2 className="kicker mb-3">The problem</h2>
          <p className="leading-relaxed">{project.problem}</p>
        </section>

        <section className="mb-12 max-w-prose">
          <h2 className="kicker mb-3">What I built</h2>
          {project.built.map((para) => (
            <p key={para.slice(0, 40)} className="mb-4 leading-relaxed">
              {para}
            </p>
          ))}
        </section>

        <section className="mb-12 max-w-prose">
          <h2 className="kicker mb-3">Proof</h2>
          <p className="leading-relaxed">{project.proof}</p>
        </section>

        <section className="mb-12 max-w-prose">
          <h2 className="kicker mb-3">What I learned</h2>
          <p className="mb-4 leading-relaxed">{project.learned}</p>
          <p className="leading-relaxed">{project.proves}</p>
        </section>

        <section className="mb-12">
          <h2 className="kicker mb-3">Stack</h2>
          <p className="leading-relaxed">{project.stack}</p>
          <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {Object.entries(project.meta).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="kicker">{k}</dt>
                <dd className="m-0">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {project.links.length > 0 && (
          <section className="mb-12">
            <h2 className="kicker mb-3">Links</h2>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="underline underline-offset-4" rel="noopener">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="max-w-prose font-serif text-xl italic leading-relaxed">
          {project.closing}
        </p>

        {related.length > 0 && (
          <section className="mt-16 border-t pt-8">
            <h2 className="kicker mb-3">Connected work</h2>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/projects/${r.slug}/`} className="underline underline-offset-4">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <StudioFooter />
    </main>
  );
}
