"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Layers, Network, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";

type CaseStudy = {
  icon: LucideIcon;
  tag: string;
  code: string;
  title: string;
  outcome: string;
  meta: string;
};

const CASES: CaseStudy[] = [
  {
    icon: Layers,
    tag: "DeFi",
    code: "CASE_01",
    title: "DeFi Protocol Audit",
    outcome:
      "Full audit of a lending protocol holding $80M TVL. Six critical findings patched before launch; zero incidents since.",
    meta: "38 findings · 6 critical",
  },
  {
    icon: Network,
    tag: "L2",
    code: "CASE_02",
    title: "L2 Infrastructure Review",
    outcome:
      "End-to-end review of sequencer and bridge infrastructure for a major L2. Hardened key management and RPC exposure.",
    meta: "21 findings · 4 critical",
  },
  {
    icon: Wallet,
    tag: "Wallet",
    code: "CASE_03",
    title: "Wallet Security Research",
    outcome:
      "Adversarial research on a multi-sig wallet used by 200k users. Closed signing-flow gaps and shipped a safer UX.",
    meta: "14 findings · 2 critical",
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
          description="Representative work across protocols, infrastructure, and wallets. Details anonymized; references available on request."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {CASES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-xl border border-(--dk-line) bg-(--dk-panel)/70 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-(--dk-acid)/60 hover:shadow-[0_0_50px_-16px_var(--dk-acid)]"
            >
              {/* Decorative header strip */}
              <div className="relative h-28 overflow-hidden border-b border-(--dk-line) bg-(--dk-abyss)">
                <div aria-hidden className="pd-grid absolute inset-0 opacity-70" />
                <span
                  aria-hidden
                  className="pd-mono absolute right-4 top-3 text-lg font-bold tracking-[0.15em] text-(--dk-acid)/15 transition-colors duration-300 group-hover:text-(--dk-acid)/30"
                >
                  {item.code}
                </span>
                <div className="absolute bottom-4 left-5 grid size-10 place-items-center rounded-lg border border-(--dk-line) bg-(--dk-void) text-(--dk-acid) transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_var(--dk-acid)]">
                  <item.icon className="size-5" />
                </div>
              </div>

              <div className="p-6">
                <span className="pd-mono inline-block rounded border border-(--dk-acid)/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-(--dk-acid)">
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
                  <span className="grid size-7 place-items-center rounded border border-(--dk-line) text-(--dk-mist) transition-all duration-300 group-hover:border-(--dk-acid)/60 group-hover:text-(--dk-acid)">
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
