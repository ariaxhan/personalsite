import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Private portfolio editor",
  robots: { index: false, follow: false, nocache: true },
};

export default function EditorPage() {
  redirect("/?edit=true");
}
