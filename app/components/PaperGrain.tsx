/**
 * PaperGrain: a fixed, full-bleed grain overlay.
 *
 * Tiny imperfections so nothing reads as sterile, the site should feel
 * touched by human hands. SVG fractal noise, multiplied over the ivory so it
 * reads as paper tooth rather than a filter. Pure decoration: pointer-events
 * off, sits above content but never intercepts it.
 */
export default function PaperGrain() {
  const noise =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.32"/></svg>`
    );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.5,
        mixBlendMode: "multiply",
        backgroundImage: `url("${noise}")`,
      }}
    />
  );
}
