// ============================================================================
// GENERATE OG IMAGE
// Rasterizes a paper-toned Open Graph card to public/og.png at 1200x630 using
// sharp (a devDependency). Runs at `prebuild`, so the static export always has
// a real og:image and never a 404. Deterministic, no runtime, no network: the
// safe path for output:'export', where a next/og ImageResponse route could
// break `next build` if a font fetch fails at build time.
//
// Copy text is read from app/utils/siteMeta.ts so the card cannot drift from
// the site's own words. If sharp text rendering falls back on a headless build
// image, the paper background and terracotta rule still yield a valid card.
// ============================================================================

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PAPER = "#f3ede0";
const INK = "#2c2823";
const TERRACOTTA = "#b56a4f";
const OUT = join(root, "public", "og.png");

function extract(src, key) {
  const m = src.match(new RegExp(key + ':\\s*"([^"]+)"'));
  return m ? m[1] : "";
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Naive word wrap by character budget, good enough for a fixed-size card.
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

async function main() {
  let name = "Aria Han";
  let role = "AI systems architect and implementation specialist";
  let oneLiner =
    "I turn messy workflows into reliable AI systems: memory, context, evals, agent coordination.";
  try {
    const meta = await readFile(join(root, "app", "utils", "siteMeta.ts"), "utf8");
    name = extract(meta, "name") || name;
    role = extract(meta, "role") || role;
    oneLiner = extract(meta, "oneLiner") || oneLiner;
  } catch {
    // Fall back to the defaults above.
  }

  const serif = "Georgia, 'Times New Roman', 'Noto Serif', serif";
  const sans = "'Helvetica Neue', Arial, sans-serif";
  const linerLines = wrap(oneLiner, 46);
  const linerSvg = linerLines
    .map(
      (l, i) =>
        `<text x="100" y="${430 + i * 52}" font-family="${sans}" font-size="34" fill="${INK}" fill-opacity="0.72">${escapeXml(
          l,
        )}</text>`,
    )
    .join("");

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${INK}" stroke-opacity="0.10" stroke-width="2"/>
  <text x="100" y="230" font-family="${serif}" font-size="140" font-weight="500" fill="${INK}">${escapeXml(
    name,
  )}</text>
  <rect x="104" y="272" width="132" height="8" fill="${TERRACOTTA}"/>
  <text x="100" y="336" font-family="${sans}" font-size="30" letter-spacing="0.5" fill="${INK}" fill-opacity="0.85">${escapeXml(
    role,
  )}</text>
  ${linerSvg}
</svg>`;

  await mkdir(join(root, "public"), { recursive: true });

  try {
    await sharp(Buffer.from(svg)).png().toFile(OUT);
    console.log(`generate-og: wrote ${OUT}`);
  } catch (err) {
    console.warn("generate-og: SVG raster failed, writing plain fallback.", err?.message);
    try {
      await sharp({
        create: { width: 1200, height: 630, channels: 3, background: PAPER },
      })
        .png()
        .toFile(OUT);
      console.log(`generate-og: wrote fallback ${OUT}`);
    } catch (err2) {
      console.warn("generate-og: fallback failed, skipping og.png.", err2?.message);
    }
  }
}

main().catch((e) => {
  // Never block the build on a social card.
  console.warn("generate-og: unexpected error, skipping.", e?.message);
});
