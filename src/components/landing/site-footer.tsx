import Image from "next/image";
import { Mail, Send } from "lucide-react";

const FOOTER_NAV = [
  { label: "Services", href: "#services" },
  { label: "Stats", href: "#stats" },
  { label: "Cases", href: "#cases" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-(--dk-line) bg-(--dk-abyss)">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/logo.png"
              alt="ASK Security"
              width={1797}
              height={875}
              sizes="66px"
              className="pd-logo h-8 w-auto"
            />
            <p className="pd-mono mt-5 text-[11px] font-medium uppercase tracking-[0.4em] text-(--dk-acid)">
              Audit / Protect / Enable
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className="pd-mono text-[10px] uppercase tracking-[0.3em] text-(--dk-mist)">
              Navigate
            </p>
            {FOOTER_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="pd-mono text-xs uppercase tracking-[0.2em] text-(--dk-mist) transition-colors hover:text-(--dk-acid)"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className="pd-mono text-[10px] uppercase tracking-[0.3em] text-(--dk-mist)">
              Contact
            </p>
            <a
              href="https://t.me/asksecurity"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-(--dk-mist) transition-colors hover:text-(--dk-acid)"
            >
              <Send className="size-3.5" />
              Telegram — @asksecurity
            </a>
            <a
              href="mailto:ask.security@gmail.com"
              className="pd-mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-(--dk-mist) transition-colors hover:text-(--dk-acid)"
            >
              <Mail className="size-3.5" />
              ask.security@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-(--dk-line) pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="pd-mono text-[11px] tracking-[0.15em] text-(--dk-mist)">
            © 2026 ASK Security. All rights reserved.
          </p>
          <p className="pd-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-(--dk-mist)">
            <span className="pd-dot" />
            status: operational
          </p>
        </div>
      </div>
    </footer>
  );
}
