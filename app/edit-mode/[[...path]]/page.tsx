import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Home from "../../page";
import About from "../../about/page";
import Contact from "../../contact/page";
import Hackathons from "../../hackathons/page";
import OpenSource from "../../open-source/page";
import ProjectReview from "../../project-review/page";
import Proof from "../../proof/page";
import Reading from "../../reading/page";
import Systems from "../../systems/page";
import Timeline from "../../timeline/page";
import Writing from "../../writing/page";
import Project from "../../projects/[slug]/page";
import { authorizeCms } from "../../content/auth";
import EditModeLoader from "../../edit/EditModeLoader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private portfolio editor",
  robots: { index: false, follow: false, nocache: true },
};

type ServerPage = () => ReactNode | Promise<ReactNode>;

const pages: Record<string, ServerPage> = {
  "": Home,
  about: About,
  contact: Contact,
  hackathons: Hackathons,
  "open-source": OpenSource,
  "project-review": ProjectReview,
  proof: Proof,
  reading: Reading,
  systems: Systems,
  timeline: Timeline,
  writing: Writing,
};

export default async function InlineEditPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost";
  const protocol = incoming.has("cf-ray")
    ? incoming.get("x-forwarded-proto") ?? "https"
    : "http";
  try {
    await authorizeCms(
      new Request(`${protocol}://${host}/edit-mode`, { headers: incoming }),
    );
  } catch {
    const returnTo = incoming.get("x-cms-edit-return") ?? "/?edit=true";
    redirect(`/edit/start/?return=${encodeURIComponent(returnTo)}`);
  }

  const segments = (await params).path ?? [];
  const publicUrl = incoming.get("x-cms-edit-return") ?? "/?edit=true";
  if (segments[0] === "projects" && segments.length === 2) {
    return (
      <>
        <Project params={Promise.resolve({ slug: segments[1] })} />
        <EditModeLoader publicUrl={publicUrl} />
      </>
    );
  }

  const key = segments.join("/");
  const Page = pages[key];
  if (!Page) notFound();
  const rendered = await Page();
  return (
    <>
      {rendered}
      <EditModeLoader publicUrl={publicUrl} />
    </>
  );
}
