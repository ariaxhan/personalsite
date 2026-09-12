"use client";

import Link from "next/link";
import { useSiteCopy } from "./LocaleProvider";

export default function ProjectArticle({ slug }: { slug: string }) {
  const { PAGE_COPY, projectBySlug } = useSiteCopy();
  const project = projectBySlug(slug);
  if (!project) return null;

  const sections = PAGE_COPY.workshopWall.sections;
  const listPath = project.kind === "open-source" ? "/open-source/" : "/systems/";
  const listLabel = project.kind === "open-source"
    ? PAGE_COPY.agentText.labels.openSourcePrefix
    : PAGE_COPY.agentText.labels.systemsPrefix;
  const related = project.connections
    .map((s) => projectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
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
        <h2 className="kicker mb-3">{sections.problem}</h2>
        <p className="leading-relaxed">{project.problem}</p>
      </section>

      <section className="mb-12 max-w-prose">
        <h2 className="kicker mb-3">{sections.built}</h2>
        {project.built.map((para) => (
          <p key={para.slice(0, 40)} className="mb-4 leading-relaxed">
            {para}
          </p>
        ))}
      </section>

      <section className="mb-12 max-w-prose">
        <h2 className="kicker mb-3">{sections.proof}</h2>
        <p className="leading-relaxed">{project.proof}</p>
      </section>

      <section className="mb-12 max-w-prose">
        <h2 className="kicker mb-3">{sections.learned}</h2>
        <p className="mb-4 leading-relaxed">{project.learned}</p>
        <p className="leading-relaxed">{project.proves}</p>
      </section>

      <section className="mb-12">
        <h2 className="kicker mb-3">{sections.stack}</h2>
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
          <h2 className="kicker mb-3">{PAGE_COPY.agentText.labels.links}</h2>
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
          <h2 className="kicker mb-3">{sections.connected}</h2>
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
  );
}
