import { ArrowUpRight, MessageSquarePlus, ShieldCheck, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type CaseStudy = {
  icon: LucideIcon;
  tag: string;
  code: string;
  title: string;
  outcome: string;
  meta: string;
  href?: string;
  linkLabel?: string;
  quiet?: boolean;
};

const CASES: CaseStudy[] = [
  {
    icon: Trophy,
    tag: "Contest audits",
    code: "CASE_01",
    title: "Sherlock Audit Contests",
    outcome:
      "Competing in public audit contests on Sherlock. 4 Medium severity findings confirmed.",
    meta: "4 Medium findings",
    href: "https://audits.sherlock.xyz/watson/AskSecurity",
    linkLabel: "View profile",
  },
  {
    icon: ShieldCheck,
    tag: "Private audit · with Shieldify",
    code: "CASE_02",
    title: "Private Protocol Audit",
    outcome:
      "Full-scope audit of a web3 protocol, delivered with Shieldify. All findings acknowledged by the client.",
    meta: "2 High · 4 Medium · 8 Low · 6 Informational",
  },
  {
    icon: MessageSquarePlus,
    tag: "Next",
    code: "CASE_03",
    title: "Your project here",
    outcome: "We're taking on new audits. Tell us about your protocol.",
    meta: "Slots open",
    href: "https://t.me/asksecurity",
    linkLabel: "Request an audit",
    quiet: true,
  },
];

export function Cases() {
  return (
    <section id="cases" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Cases"
          title="Selected engagements"
          description="Public contest results and private audit work. Contest findings are verifiable on our Sherlock profile."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {CASES.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              y={36}
              duration={0.65}
              margin="-60px"
              delay={i * 0.1}
              blur={false}
              className={
                item.quiet
                  ? "group relative overflow-hidden rounded-xl border border-dashed border-(--dk-line) bg-(--dk-panel)/30 transition-colors duration-300 hover:border-(--dk-acid)/40"
                  : "group relative overflow-hidden rounded-xl border border-(--dk-line) bg-(--dk-panel)/70 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-(--dk-acid)/60 hover:shadow-[0_0_50px_-16px_var(--dk-acid)]"
              }
            >
              {/* Decorative header strip */}
              <div className="relative h-28 overflow-hidden border-b border-(--dk-line) bg-(--dk-abyss)">
                <div aria-hidden className={`pd-grid absolute inset-0 ${item.quiet ? "opacity-30" : "opacity-70"}`} />
                <span
                  aria-hidden
                  className="pd-mono absolute right-4 top-3 text-lg font-bold tracking-[0.15em] text-(--dk-acid)/15 transition-colors duration-300 group-hover:text-(--dk-acid)/30"
                >
                  {item.code}
                </span>
                <div className={`absolute bottom-4 left-5 grid size-10 place-items-center rounded-lg border border-(--dk-line) bg-(--dk-void) transition-shadow duration-300 ${item.quiet ? "text-(--dk-mist)" : "text-(--dk-acid) group-hover:shadow-[0_0_20px_-4px_var(--dk-acid)]"}`}>
                  <item.icon className="size-5" />
                </div>
              </div>

              <div className="p-6">
                <span className={`pd-mono inline-block rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] ${item.quiet ? "border-(--dk-line) text-(--dk-mist)" : "border-(--dk-acid)/40 text-(--dk-acid)"}`}>
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-(--dk-ink)">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-(--dk-mist)">
                  {item.outcome}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-(--dk-line) pt-4">
                  <span className="pd-mono text-[11px] uppercase tracking-[0.15em] text-(--dk-mist)">
                    {item.meta}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-mono inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-(--dk-acid) transition-colors hover:text-(--dk-acid-soft)"
                    >
                      {item.linkLabel}
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="grid size-7 place-items-center rounded border border-(--dk-line) text-(--dk-mist) transition-all duration-300 group-hover:border-(--dk-acid)/60 group-hover:text-(--dk-acid)">
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
