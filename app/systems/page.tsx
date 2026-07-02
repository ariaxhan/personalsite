import { Metadata } from "next";
import WorkshopWall, { WallItem } from "../components/WorkshopWall";
import StudioFooter from "../components/StudioFooter";
import { systemsData } from "../utils/systemsData";

export const metadata: Metadata = {
  title: "Systems | Aria Han",
  description:
    "Systems by Aria Han: solo-built apps, multi-agent systems, memory that survives across platforms, and AI tools built on evidence instead of vibes.",
};

const accents = ["#b56a4f", "#56695a", "#6f8696", "#b08a4c", "#8a4b3a"];

const statusLabel: Record<string, string> = {
  LIVE: "Live",
  SHIPPED: "Shipped",
  INTEGRATED: "Integrated",
  "TESTFLIGHT PHASE": "TestFlight",
};

// Real assets: App Store icons for the shipped apps, product screenshots for
// image-led systems. HeyContext and HeyContent use only their demo videos.
const media: Record<string, string[]> = {
  ModelMind: ["/studio/modelmind-1.jpg", "/studio/modelmind-3.jpg", "/studio/modelmind-2.jpg", "/studio/modelmind-4.jpg"],
  "Paper Rooms": ["/studio/paperrooms-reader.jpg", "/studio/paperrooms-desk.jpg", "/studio/paperrooms-study.jpg", "/studio/paperrooms-search.jpg"],
  our4cuts: ["/studio/our4cuts-home.png"],
  "Brink Mind": ["/studio/brink-landing.jpg", "/studio/brink-app-1.jpg", "/studio/brink-app-2.jpg"],
};

// Card plates: every system shows its brand mark, square app-icon style, so the
// wall reads as a consistent set of logos rather than a mix of screenshots.
const plate: Record<string, string> = {
  ModelMind: "/studio/modelmind-icon.jpg",
  "Paper Rooms": "/studio/paperrooms-icon.jpg",
  HeyContext: "/studio/logo-heycontext.svg",
  HeyContent: "/studio/logo-heycontent.png",
  our4cuts: "/studio/logo-our4cuts.svg",
  "Brink Mind": "/studio/logo-brinkmind.png",
};

// Brink's wordmark is wide, so its plate is contained with padding rather than
// cover-filled like the square app icons.
const contain = new Set(["Brink Mind", "our4cuts"]);

// Brand mark shown as a chip in the story modal header.
const logo: Record<string, string> = {
  ModelMind: "/studio/modelmind-icon.jpg",
  "Paper Rooms": "/studio/paperrooms-icon.jpg",
  HeyContext: "/studio/logo-heycontext.svg",
  HeyContent: "/studio/logo-heycontent.png",
  our4cuts: "/studio/logo-our4cuts.svg",
  "Brink Mind": "/studio/logo-brinkmind.png",
};

// Salvaged product demos, compressed to muted loops that play only inside the
// story modal.
const demo: Record<string, { video: string; poster: string }> = {
  HeyContext: { video: "/studio/demo-heycontext.mp4", poster: "/studio/demo-heycontext-poster.jpg" },
  HeyContent: { video: "/studio/demo-heycontent.mp4", poster: "/studio/demo-heycontent-poster.jpg" },
};

const items: WallItem[] = systemsData.map((s, i) => ({
  title: s.name,
  tag: statusLabel[s.status] ?? "System",
  accent: accents[i % accents.length],
  hook: s.evidence,
  body: s.description,
  meta: s.meta,
  link: s.appStore
    ? { label: "Download on the App Store", href: s.appStore }
    : s.website
      ? { label: "Visit the site", href: s.website }
      : undefined,
  image: plate[s.name],
  imageFit: contain.has(s.name) ? "contain" : "cover",
  images: media[s.name],
  logo: logo[s.name],
  video: demo[s.name]?.video,
  poster: demo[s.name]?.poster,
}));

export default function SystemsPage() {
  return (
    <main className="relative">
      <WorkshopWall
        fig="Fig. 02"
        label="Workshop Wall"
        title="The work, pinned up"
        note="Apps and systems, each built around a question I couldn't let go of."
        items={items}
      />
      <StudioFooter />
    </main>
  );
}
