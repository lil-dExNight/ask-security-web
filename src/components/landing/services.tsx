import { CodeXml, Crosshair, Radar, ServerCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  span: string;
};

const SERVICES: Service[] = [
  {
    icon: CodeXml,
    title: "Code Audit",
    description:
      "Line-by-line review of smart contracts and off-chain code. We hunt for logic flaws, reentrancy, and economic exploits, then verify every fix.",
    tags: ["solidity", "rust", "zk-circuits"],
    span: "lg:col-span-7",
  },
  {
    icon: ServerCog,
    title: "Infrastructure Audit",
    description:
      "Nodes, validators, bridges, and cloud setups reviewed end to end. We test configurations, key management, and network exposure.",
    tags: ["validators", "bridges", "cloud"],
    span: "lg:col-span-5",
  },
  {
    icon: Crosshair,
    title: "Security Research",
    description:
      "Adversarial research on novel mechanisms and primitives. We break assumptions with proof-of-concept exploits before attackers do.",
    tags: ["mechanism design", "exploit poc"],
    span: "lg:col-span-5",
  },
  {
    icon: Radar,
    title: "Post-Deployment Monitoring & Support",
    description:
      "24/7 on-chain monitoring with real-time alerts. We watch your contracts after launch and respond when it matters most.",
    tags: ["on-chain alerts", "incident response"],
    span: "lg:col-span-7",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="Full-spectrum offensive security"
          description="From first commit to post-deployment, one team covers the whole attack surface of your protocol."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              as="article"
              y={36}
              duration={0.65}
              margin="-60px"
              delay={i * 0.08}
              blur={false}
              className={`group relative overflow-hidden rounded-xl border border-(--dk-line) bg-(--dk-panel)/70 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-(--dk-acid)/60 hover:shadow-[0_0_50px_-16px_var(--dk-acid)] md:p-8 ${service.span}`}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--dk-acid)/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between">
                <div className="grid size-11 place-items-center rounded-lg border border-(--dk-line) bg-(--dk-void) text-(--dk-acid) transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_var(--dk-acid)]">
                  <service.icon className="size-5" />
                </div>
                <span className="pd-mono text-xs tracking-[0.2em] text-(--dk-mist)">
                  /0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-(--dk-ink)">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-(--dk-mist)">
                {service.description}
              </p>
              <ul className="pd-mono mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-(--dk-line) px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-(--dk-mist) transition-colors group-hover:border-(--dk-acid)/40 group-hover:text-(--dk-acid)"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
