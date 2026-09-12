import { koProjectMeta } from "../../../utils/koMeta";

export { default, generateStaticParams } from "../../../projects/[slug]/page";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return koProjectMeta(slug);
}
