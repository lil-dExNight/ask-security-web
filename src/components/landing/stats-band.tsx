import { Reveal } from "./reveal";

const SEVERITY_MIX = [
  { label: "high", count: 2 },
  { label: "medium", count: 8 },
  { label: "low", count: 8 },
  { label: "informational", count: 6 },
];

export function StatsBand() {
  return (
    <section
      id="stats"
      aria-label="Key statistics"
      className="scroll-mt-20 border-y border-(--dk-line) bg-(--dk-abyss)"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-4">
          <div>
            <p className="text-[clamp(80px,10vw,140px)] font-bold leading-[0.9] tracking-[-0.04em] text-(--dk-acid)">
              24
            </p>
            <p className="font-mono mt-4 text-[12px] text-(--dk-mist)">
              vulnerabilities found
              <br />
              across all engagements
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-4" delay={80}>
          <div>
            <p className="text-[clamp(80px,10vw,140px)] font-bold leading-[0.9] tracking-[-0.04em] text-(--dk-acid)">
              2
            </p>
            <p className="font-mono mt-4 text-[12px] text-(--dk-mist)">
              engagements — contest audits
              <br />
              and one private audit
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-4 md:self-end" delay={160}>
          <div>
            <p className="font-mono text-[12px] text-(--dk-mist)">
              severity mix to date
            </p>
            <ul className="font-mono mt-4 space-y-2 text-[13px]">
              {SEVERITY_MIX.map((row, i) => (
                <li
                  key={row.label}
                  className={`flex justify-between ${i < SEVERITY_MIX.length - 1 ? "border-b border-(--dk-line) pb-2" : ""}`}
                >
                  <span>{row.label}</span>
                  <span className="text-(--dk-mist)">{row.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
