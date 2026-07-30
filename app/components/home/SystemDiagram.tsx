import { getSiteContent } from "../../content/repository";

// SystemDiagram: a blueprint of the work, left to right. A messy workflow on the
// left (drawn as a terracotta scribble), flowing through four labeled chambers
// (memory, context, evals, agents), into a clean square on the right (a working
// implementation). Server component: the stroke draw is pure CSS (see the
// .sd-draw rule in globals.css) and collapses to a static drawing under
// prefers-reduced-motion. Every label is real DOM text inside the SVG.

const CH_W = 78;
const CH_H = 56;
const MID_Y = 120;

export default async function SystemDiagram() {
  const { content: { PAGE_COPY } } = await getSiteContent();
  const CHAMBERS = [
    { label: PAGE_COPY.systemDiagram.chambers[0], cx: 205, rot: -1.1 },
    { label: PAGE_COPY.systemDiagram.chambers[1], cx: 300, rot: 1.2 },
    { label: PAGE_COPY.systemDiagram.chambers[2], cx: 395, rot: -0.9 },
    { label: PAGE_COPY.systemDiagram.chambers[3], cx: 490, rot: 1.4 },
  ];
  return (
    <figure className="m-0">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        {PAGE_COPY.systemDiagram.label}
      </div>
      <div
        className="relative overflow-hidden rounded-[4px] border border-[rgba(44,40,35,0.16)] bg-studio-card shadow-paper"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(60,80,90,.05) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(60,80,90,.05) 0 1px, transparent 1px 22px)",
        }}
      >
        <svg
          viewBox="0 0 640 240"
          className="block h-auto w-full"
          role="img"
          aria-label={PAGE_COPY.systemDiagram.aria}
          style={{ transform: "rotate(-0.5deg)" }}
        >
          {/* Left node: the messy workflow, a terracotta scribble. */}
          <path
            className="sd-draw"
            d="M40 132 C58 96 78 150 96 116 C110 92 62 100 78 128 C92 150 116 110 118 132"
            pathLength={1}
            fill="none"
            stroke="#b56a4f"
            strokeWidth={1.8}
            strokeLinecap="round"
            style={{ animationDelay: "0ms" }}
          />

          {/* The flow line running through the chambers. */}
          <line
            className="sd-draw"
            x1={120}
            y1={MID_Y}
            x2={557}
            y2={MID_Y}
            pathLength={1}
            stroke="#2c2823"
            strokeWidth={1.4}
            strokeLinecap="round"
            style={{ animationDelay: "220ms", strokeDasharray: 1 }}
          />

          {/* Four chambers. */}
          {CHAMBERS.map((c, i) => (
            <g key={c.label} transform={`rotate(${c.rot} ${c.cx} ${MID_Y})`}>
              <rect
                className="sd-draw"
                x={c.cx - CH_W / 2}
                y={MID_Y - CH_H / 2}
                width={CH_W}
                height={CH_H}
                rx={3}
                pathLength={1}
                fill="rgba(248,244,234,0.85)"
                stroke="#2c2823"
                strokeWidth={1.5}
                style={{ animationDelay: `${420 + i * 120}ms` }}
              />
              <text
                x={c.cx}
                y={MID_Y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono), monospace"
                fontSize={12.5}
                letterSpacing="0.04em"
                fill="#3f3a32"
              >
                {c.label}
              </text>
            </g>
          ))}

          {/* Right node: the clean, working square. */}
          <g transform={`rotate(0.6 585 ${MID_Y})`}>
            <rect
              className="sd-draw"
              x={557}
              y={MID_Y - CH_H / 2}
              width={CH_H}
              height={CH_H}
              rx={2}
              pathLength={1}
              fill="rgba(86,105,90,0.12)"
              stroke="#2c2823"
              strokeWidth={1.8}
              style={{ animationDelay: "980ms" }}
            />
          </g>

          {/* End labels, two lines each so they never overrun the frame. */}
          <text
            x={78}
            y={188}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize={11}
            letterSpacing="0.08em"
            fill="#8a8275"
          >
            <tspan x={78} dy={0}>
              {PAGE_COPY.systemDiagram.messy[0]}
            </tspan>
            <tspan x={78} dy={15}>
              {PAGE_COPY.systemDiagram.messy[1]}
            </tspan>
          </text>
          <text
            x={585}
            y={188}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize={11}
            letterSpacing="0.08em"
            fill="#8a8275"
          >
            <tspan x={585} dy={0}>
              {PAGE_COPY.systemDiagram.working[0]}
            </tspan>
            <tspan x={585} dy={15}>
              {PAGE_COPY.systemDiagram.working[1]}
            </tspan>
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 max-w-[560px] text-[14.5px] leading-[1.65] text-ink-soft">
        {PAGE_COPY.systemDiagram.captionStart}
      </figcaption>
    </figure>
  );
}
