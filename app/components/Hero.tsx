"use client";

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { label: "Companies Founded", value: "3" },
  { label: "Competitions Won", value: "6" },
  { label: "Hours Building", value: "3000+" },
  { label: "Systems Live", value: "3" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-black">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-16 lg:gap-24 items-start">
          {/* Left: Identity */}
          <div className="opacity-0 animate-fade-up">
            <p className="mono-meta mb-6">
              AI Expert · Founder · Builder
            </p>
            
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-extralight tracking-[-0.03em] leading-[1.1] mb-8">
              Aria
              <br />
              Han
            </h1>
            
            <p className="text-base font-normal text-[#666] max-w-[45ch] leading-[1.6]">
              Building AI systems that understand how intelligence actually works. 
              Three companies, six competition wins, and thousands of hours 
              exploring what&apos;s possible when you work with AI&apos;s nature.
            </p>
            
            <p className="mono-meta mt-8">
              San Francisco · 2024
            </p>
          </div>

          {/* Right: Evidence */}
          <div className="opacity-0 animate-fade-up delay-2 pt-2">
            <div className="border-l border-[#222] pl-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-6 ${i !== stats.length - 1 ? "border-b border-[#222]" : ""}`}
                >
                  <p className="mono-meta mb-2">
                    {stat.label}
                  </p>
                  <p className="text-[2.5rem] lg:text-[3rem] font-extralight tracking-[-0.02em] text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
