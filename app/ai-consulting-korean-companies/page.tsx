import { Metadata } from "next";
import { pageMeta } from "../utils/pageMeta";
import KoreanConsultingRoom from "../components/KoreanConsultingRoom";
import StudioFooter from "../components/StudioFooter";
import { getSiteContent } from "../content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  return pageMeta({ ...content.PAGE_COPY.metadata.koreanConsulting }, content.SITE);
}

export default function KoreanConsultingPage() {
  return (
    <main className="relative">
      <KoreanConsultingRoom />
      <StudioFooter />
    </main>
  );
}
