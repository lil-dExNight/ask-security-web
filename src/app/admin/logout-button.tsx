"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="rounded-md border border-(--dk-line) px-3 py-1.5 text-sm text-(--dk-mist) transition-colors hover:border-(--dk-acid) hover:text-(--dk-ink) disabled:opacity-50"
    >
      {pending ? "Logging out…" : "Logout"}
    </button>
  );
}
