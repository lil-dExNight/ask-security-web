import { Reveal } from "./reveal";
import { Counter } from "./counter";

type Stat = {
  prefix?: string;
  value?: number;
  suffix?: string;
  staticText?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Audits completed" },
  { value: 1200, suffix: "+", label: "Vulnerabilities found" },
  { prefix: "$", value: 400, suffix: "M+", label: "Assets secured" },
  { staticText: "24/7", label: "Post-deployment monitoring" },
];

const BADGES = [
  "ISO/IEC 27001",
  "SOC 2 Type II",
  "OWASP SCVS",
  "CVSS v3.1",
  "EIP & ERC",
];

export function StatsBand() {
  return (
    <section id="stats" aria-label="Key statistics" className="relative scroll-mt-20 border-y border-(--dk-line) bg-(--dk-abyss)/70">
      <div aria-hidden className="pd-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
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
                {stat.value !== undefined ? (
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.staticText
                )}
              </p>
              <p className="pd-mono mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-(--dk-mist)">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          y={24}
          duration={0.6}
          margin="-60px"
          delay={0.2}
          blur={false}
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-(--dk-line) pt-8"
        >
          <span className="pd-mono text-[11px] uppercase tracking-[0.25em] text-(--dk-mist)">
            Methodology aligned with
          </span>
          <ul className="flex flex-wrap items-center gap-2.5">
            {BADGES.map((badge) => (
              <li
                key={badge}
                className="pd-mono flex items-center gap-2 rounded border border-(--dk-line) px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-(--dk-ink)/75 transition-colors hover:border-(--dk-acid)/50 hover:text-(--dk-acid)"
              >
                <span aria-hidden className="size-1 bg-(--dk-acid)" />
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
