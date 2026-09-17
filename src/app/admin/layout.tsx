import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    // Bare rendering for the login page: no admin shell without a session.
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-(--dk-void) text-(--dk-ink)">
      <header className="sticky top-0 z-20 border-b border-(--dk-line) bg-(--dk-abyss)/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="pd-mono text-sm font-semibold tracking-wide">
              ASK <span className="text-(--dk-acid)">Admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-(--dk-mist)">
              <Link href="/admin" className="transition-colors hover:text-(--dk-ink)">
                Posts
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
