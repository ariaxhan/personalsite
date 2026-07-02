"use client";

/**
 * CalEmbed: inline Cal.com booker, themed to the studio palette.
 *
 * Rides the Cal.com backend (which holds all the calendar connections and
 * conflict-checks across them), but renders inline and in the light, warm theme
 * so it reads as part of the paper rather than a bolted-on iframe.
 */
export default function CalEmbed({
  calLink = "aria-han/15min",
  minHeight = 640,
}: {
  calLink?: string;
  minHeight?: number;
}) {
  return (
    <iframe
      title="Book a call with Aria Han"
      src={`https://cal.com/${calLink}?embed=1&theme=light&layout=month_view`}
      className="block w-full border-0"
      loading="lazy"
      style={{ minHeight: `${minHeight}px` }}
    />
  );
}
