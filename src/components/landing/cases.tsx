import { SITE_CONTACTS } from "@/lib/site";
import { Reveal } from "./reveal";

type Finding = {
  label: string;
  count: string;
  note?: string;
};

type CaseStudy = {
  ref: string;
  tag: string;
  title: string;
  outcome: string;
  findings: Finding[];
  href: string;
  linkLabel: string;
};

const CASES: CaseStudy[] = [
  {
    ref: "case · 01",
    tag: "contest audits · sherlock",
    title: "Sherlock Audit Contests",
    outcome:
      "Public audit contests on Sherlock, competing against other auditors on live codebases.",
    findings: [{ label: "medium", count: "4", note: "confirmed" }],
    href: "https://audits.sherlock.xyz/watson/AskSecurity",
    linkLabel: "view sherlock profile",
  },
  {
    ref: "case · 02",
    tag: "private audit · with shieldify",
    title: "Private Protocol Audit",
    outcome: "Private audit of a web3 protocol, run together with Shieldify.",
    findings: [
      { label: "high", count: "2" },
      { label: "medium", count: "4" },
      { label: "low", count: "8" },
      { label: "informational", count: "6" },
    ],
    href: SITE_CONTACTS.telegram,
    linkLabel: "request details",
  },
];

export function Cases() {
  return (
    <section id="cases" className="scroll-mt-20 bg-(--dk-panel)">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="indent-2">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em]">
              Selected engagements
            </h2>
            <span className="font-mono text-[12px] text-(--dk-mist)">
              ( 2 of 2 )
            </span>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CASES.map((item, i) => (
            <Reveal key={item.ref} delay={i * 80}>
              <article className="case-panel flex h-full flex-col">
                <div className="font-mono flex items-baseline justify-between border-b border-(--dk-line) px-6 py-4 text-[12px] text-(--dk-mist) md:px-8">
                  <span>{item.ref}</span>
                  <span>{item.tag}</span>
                </div>
                <div className="flex grow flex-col px-6 py-8 md:px-8 md:py-10">
                  <h3 className="text-[clamp(26px,3vw,38px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-(--dk-mist)">
                    {item.outcome}
                  </p>
                  <ul className="font-mono mt-8 space-y-2 text-[13px]">
                    {item.findings.map((f) => (
                      <li
                        key={f.label}
                        className="flex items-baseline justify-between gap-4 border-b border-(--dk-line) pb-2 last:border-b-0"
                      >
                        <span className="text-(--dk-mist)">{f.label}</span>
                        <span>
                          {f.count}
                          {f.note ? (
                            <span className="text-(--dk-mist)">
                              {" "}
                              · {f.note}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="acid-link font-mono mt-auto inline-flex items-center gap-2 pt-8 text-[13px]"
                  >
                    {item.linkLabel}
                    <span aria-hidden className="row-arrow">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
