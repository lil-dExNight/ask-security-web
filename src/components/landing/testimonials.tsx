"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./section-heading";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ASK found what two other firms missed. The report was clear, fast, and every fix was verified within days.",
    name: "Alex Chen",
    role: "CTO, DeFi protocol",
    initials: "AC",
  },
  {
    quote:
      "They think like attackers and write like engineers. The infrastructure review changed how we run our validators.",
    name: "Maria Kovacs",
    role: "Head of Engineering, L2 network",
    initials: "MK",
  },
  {
    quote:
      "Responsive, rigorous, and honest about scope. The post-deployment monitoring alone has paid for itself.",
    name: "Daniel Roth",
    role: "Founder, wallet startup",
    initials: "DR",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-20 border-t border-(--dk-line) py-24 md:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-72 w-160 -translate-x-1/2 rounded-full bg-(--dk-acid)/5 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Testimonials"
          title="Trusted by teams that ship"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-xl border border-(--dk-line) bg-(--dk-panel)/70 p-6 transition-[border-color,box-shadow] duration-300 hover:border-(--dk-acid)/60 hover:shadow-[0_0_50px_-16px_var(--dk-acid)] md:p-7"
            >
              <span
                aria-hidden
                className="pd-mono pd-glow text-5xl leading-none text-(--dk-acid)"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-(--dk-ink)/85">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-(--dk-line) pt-5">
                <span className="pd-mono grid size-9 place-items-center rounded border border-(--dk-line) bg-(--dk-void) text-[11px] font-semibold tracking-[0.1em] text-(--dk-acid)">
                  {item.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-(--dk-ink)">{item.name}</span>
                  <span className="pd-mono mt-0.5 block text-[10px] uppercase tracking-[0.15em] text-(--dk-mist)">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
