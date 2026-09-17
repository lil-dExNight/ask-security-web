"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/asset";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Stats", href: "#stats" },
  { label: "Cases", href: "#cases" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-(--dk-line) bg-(--dk-void)/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" aria-label="ASK Security — back to top" className="flex items-center gap-3">
          <Image
            src={asset("/logo-mark.png")}
            alt=""
            width={920}
            height={520}
            priority
            sizes="28px"
            className="pd-logo h-7 w-auto"
          />
          <span className="text-lg font-semibold tracking-tight text-(--dk-ink)">
            ASK <span className="font-normal text-(--dk-mist)">Security</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pd-link pd-mono text-[11px] font-medium uppercase tracking-[0.25em] text-(--dk-mist) transition-colors hover:text-(--dk-acid)"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            render={<a href="https://t.me/asksecurity" target="_blank" rel="noopener noreferrer" />}
            className="pd-mono hidden h-9 rounded-md border-(--dk-acid)/50 bg-(--dk-acid)/10 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--dk-acid) transition-shadow hover:bg-(--dk-acid)/15 hover:shadow-[0_0_28px_-6px_var(--dk-acid)] sm:inline-flex"
          >
            Request an audit
            <ArrowUpRight className="size-3.5" />
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-(--dk-line) text-(--dk-ink) transition-colors hover:border-(--dk-acid)/60 hover:text-(--dk-acid) lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-(--dk-line) bg-(--dk-void)/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="pd-mono rounded-md px-3 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-(--dk-mist) transition-colors hover:bg-(--dk-acid)/10 hover:text-(--dk-acid)"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://t.me/asksecurity"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="pd-mono mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-(--dk-acid)/50 bg-(--dk-acid)/10 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-(--dk-acid)"
              >
                Request an audit
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}
