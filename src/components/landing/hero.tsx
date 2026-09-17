"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { ArrowUpRight, ChevronDown, ChevronRight, Mail } from "lucide-react";
import { asset } from "@/lib/asset";

type TermPart = { text: string; cls: string };

const TERM_LINES: TermPart[][] = [
  [
    { text: "ask@security", cls: "text-(--dk-acid)" },
    { text: ":~$ ", cls: "text-(--dk-mist)" },
    { text: "asksec audit --target ./contracts", cls: "text-(--dk-ink)" },
  ],
  [
    { text: "[INIT] ", cls: "text-(--dk-mist)" },
    { text: "loading 214 detectors .......... ", cls: "text-(--dk-ink)/75" },
    { text: "ok", cls: "text-(--dk-acid)" },
  ],
  [
    { text: "[SCAN] ", cls: "text-(--dk-mist)" },
    { text: "static analysis, 142 checks .... ", cls: "text-(--dk-ink)/75" },
    { text: "passed", cls: "text-(--dk-acid)" },
  ],
  [
    { text: "[FUZZ] ", cls: "text-(--dk-mist)" },
    { text: "1,200,000 executions .......... ", cls: "text-(--dk-ink)/75" },
    { text: "0 crashes", cls: "text-(--dk-acid)" },
  ],
  [
    { text: "[FAIL] ", cls: "text-red-400" },
    { text: "reentrancy in withdraw() ...... ", cls: "text-(--dk-ink)/75" },
    { text: "CRITICAL", cls: "text-red-400" },
  ],
  [
    { text: "[FAIL] ", cls: "text-amber-300" },
    { text: "stale oracle price ............ ", cls: "text-(--dk-ink)/75" },
    { text: "HIGH", cls: "text-amber-300" },
  ],
  [
    { text: "[FIX]  ", cls: "text-(--dk-mist)" },
    { text: "remediation ", cls: "text-(--dk-ink)/75" },
    { text: "████████████", cls: "pd-glow text-(--dk-acid)" },
    { text: " 100%", cls: "text-(--dk-acid)" },
  ],
  [
    { text: "[DONE] ", cls: "text-(--dk-mist)" },
    { text: "2 findings reported — fixes ..... ", cls: "text-(--dk-ink)/75" },
    { text: "verified", cls: "text-(--dk-acid)" },
  ],
];

const TRUST_ITEMS = ["response < 24h", "fix verification included", "continuous monitoring"];

export function Hero() {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    let i = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setLines(i);
        if (i >= TERM_LINES.length && interval !== undefined) {
          window.clearInterval(interval);
        }
      }, 500);
    }, 1200);
    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-20">
      {/* Background layers */}
      <div aria-hidden className="pd-grid absolute inset-0 [mask-image:radial-gradient(ellipse_90%_75%_at_50%_0%,black,transparent_78%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full bg-(--dk-acid)/10 blur-[140px]" />
      <div aria-hidden className="absolute right-[-10%] bottom-[-20%] h-100 w-100 rounded-full bg-(--dk-acid)/5 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left: brand + pitch */}
        <div>
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={asset("/logo-mark.png")}
              alt="ASK Security eye mark"
              width={920}
              height={520}
              priority
              sizes="142px"
              className="pd-logo h-16 w-auto md:h-20"
            />
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pd-mono mt-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-(--dk-acid)"
          >
            <span className="pd-dot" />
            Web3 security audit unit
          </m.p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-(--dk-ink) sm:text-6xl lg:text-7xl">
            Ship with <span className="pd-glow text-(--dk-acid)">confidence</span>
            <span aria-hidden className="pd-caret" />
          </h1>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-(--dk-mist) md:text-lg"
          >
            Independent security audits for web3 protocols, infrastructure, and
            wallets. We find the vulnerabilities before someone with worse
            intentions does.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://t.me/asksecurity"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-mono inline-flex items-center gap-2 rounded-md bg-(--dk-acid) px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#04120b] transition-shadow duration-300 hover:shadow-[0_0_45px_-8px_var(--dk-acid)]"
            >
              Request an audit
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="mailto:ask.security@gmail.com"
              className="pd-mono inline-flex items-center gap-2 rounded-md border border-(--dk-line) px-6 py-3 text-sm font-medium text-(--dk-ink) transition-colors duration-300 hover:border-(--dk-acid)/60 hover:text-(--dk-acid)"
            >
              <Mail className="size-4" />
              ask.security@gmail.com
            </a>
          </m.div>

          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pd-mono mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-(--dk-mist)"
          >
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <ChevronRight className="size-3 text-(--dk-acid)" />
                {item}
              </li>
            ))}
          </m.ul>
        </div>

        {/* Right: terminal window */}
        <m.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-px rounded-xl bg-linear-to-b from-(--dk-acid)/40 via-(--dk-line) to-transparent"
          />
          <div className="relative overflow-hidden rounded-xl border border-(--dk-line) bg-(--dk-abyss)/95 shadow-[0_0_90px_-24px_var(--dk-acid)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-(--dk-line) px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-300/70" />
              <span className="size-2.5 rounded-full bg-(--dk-acid)/70" />
              <span className="pd-mono ml-3 text-[11px] tracking-[0.2em] text-(--dk-mist)">
                ask@security: audit
              </span>
            </div>
            <div className="pd-mono min-h-72 space-y-2.5 px-5 py-5 text-[11px] leading-relaxed sm:text-xs md:text-[13px]">
              {TERM_LINES.slice(0, lines).map((parts, i) => (
                <m.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-pre-wrap break-all"
                >
                  {parts.map((part, j) => (
                    <span key={j} className={part.cls}>
                      {part.text}
                    </span>
                  ))}
                </m.p>
              ))}
              <p>
                {lines >= TERM_LINES.length ? (
                  <>
                    <span className="text-(--dk-acid)">ask@security</span>
                    <span className="text-(--dk-mist)">:~$ </span>
                  </>
                ) : null}
                <span className="pd-caret" />
              </p>
            </div>
            <div className="pd-mono flex items-center justify-between border-t border-(--dk-line) px-5 py-3 text-[10px] uppercase tracking-[0.2em]">
              <span className="text-(--dk-mist)">report ASK-0142</span>
              <span className="flex items-center gap-2 text-(--dk-acid)">
                <span aria-hidden className="size-1.5 rounded-full bg-(--dk-acid)" />
                status: accepted
              </span>
            </div>
          </div>
        </m.div>
      </div>

      {/* Scroll cue */}
      <m.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="pd-mono absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-(--dk-mist) transition-colors hover:text-(--dk-acid) md:flex"
      >
        Scroll
        <m.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="size-4" />
        </m.span>
      </m.a>
    </section>
  );
}
