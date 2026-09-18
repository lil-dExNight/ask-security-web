import { Reveal } from "./reveal";
import { Counter } from "./counter";

type Stat = {
  value: number;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { value: 24, label: "Vulnerabilities reported", sub: "2 High · 8 Medium" },
  { value: 2, label: "Audit engagements", sub: "Sherlock contest · private audit" },
];

export function StatsBand() {
  return (
    <section id="stats" aria-label="Key statistics" className="relative scroll-mt-20 border-y border-(--dk-line) bg-(--dk-abyss)/70">
      <div aria-hidden className="pd-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              y={28}
              duration={0.6}
              margin="-60px"
              delay={i * 0.1}
              blur={false}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute -left-3 top-1 h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-transparent via-(--dk-acid)/50 to-transparent md:-left-6"
              />
              <p className="pd-mono pd-glow text-4xl font-bold tracking-tight text-(--dk-acid) md:text-5xl">
                <Counter value={stat.value} />
              </p>
              <p className="pd-mono mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-(--dk-mist)">
                {stat.label}
              </p>
              <p className="pd-mono mt-1.5 text-[10px] uppercase tracking-[0.15em] text-(--dk-mist)/60">
                {stat.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
