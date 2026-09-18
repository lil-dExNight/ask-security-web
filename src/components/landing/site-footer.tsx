import Link from "next/link";
import { SITE_CONTACTS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--dk-line) bg-(--dk-abyss)">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 md:px-10 md:pt-20">
        <p className="text-[clamp(56px,11vw,160px)] font-bold leading-[0.92] tracking-[-0.03em]">
          ASK Security
        </p>
        <div className="mt-14 grid gap-10 border-t border-(--dk-line) pt-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[12px] text-(--dk-mist)">index</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>
                <Link href="/#services" className="acid-link">
                  What we do
                </Link>
              </li>
              <li>
                <Link href="/#cases" className="acid-link">
                  Selected engagements
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="acid-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="acid-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[12px] text-(--dk-mist)">contact</p>
            <ul className="font-mono mt-4 space-y-2 text-[13px]">
              <li>
                <a
                  href={SITE_CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="acid-link"
                >
                  telegram → t.me/asksecurity
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACTS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="acid-link"
                >
                  x → x.com/asksecurity
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONTACTS.email}`} className="acid-link">
                  {SITE_CONTACTS.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-[12px] text-(--dk-mist)">record</p>
            <p className="font-mono mt-4 text-[13px] leading-relaxed">
              24 vulnerabilities found
              <br />
              2 engagements
            </p>
          </div>
        </div>
        <div className="font-mono mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-(--dk-line) pt-6 text-[12px] text-(--dk-mist)">
          <p>© 2026 {SITE_NAME} · web3 security audits</p>
          <p>
            <Link href="/blog" className="nav-link">
              blog
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
