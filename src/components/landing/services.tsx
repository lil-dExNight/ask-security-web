import { Reveal } from "./reveal";

type Service = {
  num: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Code Audit",
    description:
      "Review of smart contracts and off-chain infrastructure. Solidity, Vyper, Rust, and zk-circuits — read line by line, not scanned.",
    tags: ["solidity", "vyper", "rust", "zk-circuits"],
  },
  {
    num: "02",
    title: "Infrastructure Audit",
    description:
      "Review of nodes, validators, bridges, and cloud infrastructure. Configuration, key management, and network exposure — all in scope.",
    tags: ["validators", "bridges", "cloud"],
  },
  {
    num: "03",
    title: "Security Research",
    description:
      "Research on new mechanisms and primitives. From mechanism design to a working exploit PoC, before someone else publishes it.",
    tags: ["mechanism design", "exploit poc"],
  },
  {
    num: "04",
    title: "Continuous Security Monitoring",
    description:
      "Real-time alerts on deployed contracts, with support after the report. On-chain alerting and incident response when it matters.",
    tags: ["on-chain alerts", "incident response"],
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-5 pt-20 md:px-10 md:pt-28">
        <Reveal className="indent-1">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em]">
              What we do
            </h2>
            <span className="font-mono text-[12px] text-(--dk-mist)">
              ( 01 → 04 )
            </span>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-14 max-w-[1200px] px-5 pb-20 md:px-10 md:pb-28">
        {SERVICES.map((service, i) => (
          <Reveal key={service.num} delay={i * 60}>
            <div className="svc-row group border-t border-(--dk-line) last:border-b">
              <div className="grid gap-4 px-1 py-8 md:grid-cols-12 md:gap-8 md:px-4 md:py-12">
                <span className="text-[clamp(40px,5vw,64px)] font-bold leading-none tracking-[-0.03em] text-(--dk-acid) md:col-span-2">
                  {service.num}
                </span>
                <div className="md:col-span-4">
                  <h3 className="text-[clamp(22px,2.6vw,32px)] font-semibold tracking-[-0.03em]">
                    {service.title}
                  </h3>
                  <ul className="font-mono mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start justify-between gap-6 md:col-span-6">
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-(--dk-mist)">
                    {service.description}
                  </p>
                  <span
                    aria-hidden
                    className="row-arrow mt-1 shrink-0 text-[22px] leading-none"
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
