"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONTACTS, SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { label: "services", href: "/#services" },
  { label: "stats", href: "/#stats" },
  { label: "cases", href: "/#cases" },
  { label: "contact", href: "/#contact" },
  { label: "blog", href: "/blog" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-(--dk-line) bg-(--dk-void)/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="ASK Security — home" className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt=""
            width={920}
            height={520}
            sizes="28px"
            className="logo-invert h-7 w-auto"
          />
          <span className="text-[15px] font-semibold tracking-[-0.03em]">
            {SITE_NAME}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="font-mono hidden items-center gap-7 text-[12px] text-(--dk-mist) md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={SITE_CONTACTS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill shrink-0 px-4 py-2 text-[13px]"
        >
          Request an audit
        </a>
      </div>
    </header>
  );
}
