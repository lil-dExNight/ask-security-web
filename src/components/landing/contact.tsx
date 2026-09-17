import Image from "next/image";
import { ArrowUpRight, Mail, Send, X } from "lucide-react";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 px-5 pb-24 md:px-8 md:pb-32">
      <Reveal
        y={48}
        scale={0.98}
        duration={0.85}
        margin="-80px"
        blur={false}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-(--dk-acid)/30 bg-(--dk-panel) shadow-[0_0_100px_-30px_var(--dk-acid)]"
      >
        <div aria-hidden className="pd-grid absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -top-32 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-(--dk-acid)/10 blur-[110px]" />
        <span aria-hidden className="absolute left-0 top-0 size-9 border-l-2 border-t-2 border-(--dk-acid)/70" />
        <span aria-hidden className="absolute bottom-0 right-0 size-9 border-b-2 border-r-2 border-(--dk-acid)/70" />

        <div className="relative flex flex-col items-center px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <Image
              src="/logo.png"
              alt="ASK Security"
              width={1797}
              height={875}
              sizes="115px"
              className="pd-logo mx-auto h-12 w-auto md:h-14"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="pd-mono mt-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-(--dk-acid)">
              <span className="pd-dot" />
              {"// Contact — open channel"}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-(--dk-ink) md:text-6xl">
              Ready to <span className="pd-glow text-(--dk-acid)">ship secure</span>?
            </h2>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-(--dk-mist)">
              Tell us what you are building. We reply within 24 hours with a
              scoped plan and a timeline.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://t.me/asksecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="pd-mono inline-flex items-center gap-2 rounded-md bg-(--dk-acid) px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-[#04120b] transition-shadow duration-300 hover:shadow-[0_0_50px_-8px_var(--dk-acid)]"
              >
                <Send className="size-4" />
                t.me/asksecurity
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="https://x.com/asksecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="pd-mono inline-flex items-center gap-2 rounded-md border border-(--dk-line) bg-(--dk-void)/60 px-7 py-3.5 text-sm font-medium text-(--dk-ink) transition-colors duration-300 hover:border-(--dk-acid)/60 hover:text-(--dk-acid)"
              >
                <X className="size-4" />
                x.com/asksecurity
              </a>
              <a
                href="mailto:ask.security@gmail.com"
                className="pd-mono inline-flex items-center gap-2 rounded-md border border-(--dk-line) bg-(--dk-void)/60 px-7 py-3.5 text-sm font-medium text-(--dk-ink) transition-colors duration-300 hover:border-(--dk-acid)/60 hover:text-(--dk-acid)"
              >
                <Mail className="size-4" />
                ask.security@gmail.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <p className="pd-mono mt-10 text-[11px] uppercase tracking-[0.25em] text-(--dk-mist)">
              {"PGP available on request · NDA-friendly"}
            </p>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
