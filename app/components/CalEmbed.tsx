"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * CalEmbed: inline Cal.com booker, themed to match the cognition palette.
 *
 * Rides the Cal.com backend (which holds all three calendar connections —
 * iCloud + both Google accounts — and conflict-checks across them), but
 * renders inline so it reads as part of the site, not a bolted-on iframe.
 */
export default function CalEmbed({
  calLink = "aria-han/15min",
  minHeight = 640,
}: {
  calLink?: string;
  minHeight?: number;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#00d9ff",
          },
          dark: {
            "cal-brand": "#00d9ff",
          },
        },
      });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: `${minHeight}px`, overflow: "scroll" }}
      config={{ theme: "dark", layout: "month_view" }}
    />
  );
}
