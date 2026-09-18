import { SITE_CONTACTS } from "@/lib/site";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 pb-24 pt-36 md:px-10 md:pb-36 md:pt-48">
      <Reveal>
        <p className="font-mono text-[13px] text-(--dk-mist)">
          <span className="mr-2 text-(--dk-acid)">●</span>
          Independent security audits for web3 protocols
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-8 text-[clamp(40px,8vw,96px)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Someone will read
          <br />
          your code line by line.
          <br />
          <span className="hero-glow text-(--dk-acid)">
            Make sure it&rsquo;s us.
          </span>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href={SITE_CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill text-[15px]"
          >
            Request an audit
          </a>
          <p className="font-mono text-[12px] text-(--dk-mist)">
            24 vulnerabilities found · 2 engagements
          </p>
        </div>
      </Reveal>
    </section>
  );
}
