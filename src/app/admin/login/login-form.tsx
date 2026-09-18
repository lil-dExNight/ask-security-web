"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!configured) {
    return (
      <div className="w-full max-w-md rounded-lg border border-(--dk-line) bg-(--dk-panel) p-6">
        <h1 className="font-mono text-lg font-semibold text-(--dk-ink)">
          ASK <span className="text-(--dk-acid)">Admin</span>
        </h1>
        <p className="mt-4 text-sm text-(--dk-mist)">
          The admin password is not configured. Set the{" "}
          <code className="font-mono text-(--dk-acid)">ADMIN_PASSWORD</code> environment
          variable and restart the server:
        </p>
        <pre className="font-mono mt-4 overflow-x-auto rounded-md border border-(--dk-line) bg-(--dk-abyss) p-3 text-xs text-(--dk-ink)">
          ADMIN_PASSWORD=your-strong-password
        </pre>
        <p className="mt-3 text-xs text-(--dk-mist)">
          For local development, put it in <code className="font-mono">.env.local</code>.
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Login failed");
    } catch {
      setError("Network error, please try again");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-lg border border-(--dk-line) bg-(--dk-panel) p-6"
    >
      <h1 className="font-mono text-lg font-semibold text-(--dk-ink)">
        ASK <span className="text-(--dk-acid)">Admin</span>
      </h1>
      <label htmlFor="password" className="mt-6 block text-sm text-(--dk-mist)">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        autoFocus
        autoComplete="current-password"
        className="mt-1.5 w-full rounded-md border border-(--dk-line) bg-(--dk-abyss) px-3 py-2 text-sm text-(--dk-ink) focus:border-(--dk-acid) focus:outline-none"
      />
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-md bg-(--dk-acid) px-3 py-2 text-sm font-semibold text-(--dk-abyss) transition hover:brightness-110 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
