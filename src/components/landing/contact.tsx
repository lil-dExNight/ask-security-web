import { SITE_CONTACTS } from "@/lib/site";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="indent-3">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="max-w-[14ch] text-[clamp(36px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Tell us what you&rsquo;re building.
            </h2>
            <span className="font-mono hidden text-[12px] text-(--dk-mist) md:block">
              ( contact )
            </span>
          </div>
        </Reveal>
        <Reveal className="indent-3" delay={100}>
          <div>
            <p className="font-mono mt-6 text-[13px] text-(--dk-mist)">
              <span className="mr-2 text-(--dk-acid)">●</span>
              available for engagements
            </p>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-(--dk-mist)">
              Code, nodes, or something that doesn&rsquo;t exist yet — we read
              it before someone else does. We are taking on new audits.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={SITE_CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill text-[15px]"
              >
                Message us on Telegram
              </a>
              <a
                href={SITE_CONTACTS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="acid-link font-mono text-[13px]"
              >
                x.com/asksecurity
              </a>
              <a
                href={`mailto:${SITE_CONTACTS.email}`}
                className="acid-link font-mono text-[13px]"
              >
                {SITE_CONTACTS.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
