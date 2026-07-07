const weeks = [
  [0, 1, 0, 2, 0, 3, 1],
  [0, 2, 4, 1, 0, 1, 2],
  [3, 1, 4, 2, 0, 3, 2],
  [1, 3, 0, 2, 4, 1, 0],
  [0, 1, 3, 4, 2, 0, 3],
  [2, 4, 1, 0, 3, 1, 2],
  [3, 0, 2, 4, 1, 3, 0],
  [0, 3, 1, 2, 4, 0, 2],
  [1, 4, 2, 0, 3, 4, 1],
  [2, 3, 0, 1, 4, 2, 3],
  [0, 2, 4, 3, 1, 0, 2],
  [1, 3, 2, 4, 0, 3, 1],
  [2, 4, 1, 3, 0, 2, 4],
  [3, 1, 0, 4, 2, 1, 3],
  [0, 3, 4, 2, 1, 0, 2],
  [2, 1, 3, 0, 4, 2, 1],
  [4, 2, 0, 3, 1, 4, 2],
  [1, 0, 2, 4, 3, 1, 0],
];

const colors = ["#ece4d4", "#d8cdbc", "#b08a4c", "#b56a4f", "#56695a"];

export default function GitHubContribPreview() {
  return (
    <a
      href="https://github.com/ariaxhan"
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label="View Aria Han on GitHub"
    >
      <div className="relative overflow-hidden border border-[rgba(44,40,35,0.16)] bg-[#f8f4ea] shadow-paper">
        <div className="flex items-center justify-between border-b border-[rgba(44,40,35,0.12)] px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
            GitHub activity
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta">
            ariaxhan
          </span>
        </div>

        <div className="relative aspect-[1.52/1] min-h-[260px] bg-[#f3ede0] p-5">
          <div className="absolute inset-x-6 top-8 h-[150px] overflow-visible sm:inset-x-8">
            <div className="origin-top-right translate-x-4 skew-y-[-18deg] rotate-[-5deg] scale-[0.92] sm:scale-100">
              <div className="flex justify-end gap-1.5">
                {weeks.map((days, weekIndex) => (
                  <div key={weekIndex} className="grid gap-1.5">
                    {days.map((level, dayIndex) => (
                      <span
                        key={`${weekIndex}-${dayIndex}`}
                        className="block h-3.5 w-3.5 border border-[rgba(44,40,35,0.09)] transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{
                          background: colors[level],
                          boxShadow:
                            level > 0
                              ? `${level * 1.5}px ${level * 1.5}px 0 rgba(44,40,35,0.08)`
                              : "none",
                          transform: `translateY(${-level * 2}px)`,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 grid gap-2">
            <span className="font-serif text-[30px] font-light italic leading-none text-ink">
              3D contribution map
            </span>
            <span className="max-w-[390px] text-[13px] leading-6 text-ink-faint">
              Warm-paper preview now; profile SVG generation lives in GitHub.
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
