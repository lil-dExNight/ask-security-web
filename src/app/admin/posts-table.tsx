"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";

export function PostsTable({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const [showDrafts, setShowDrafts] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visible = useMemo(
    () => (showDrafts ? posts : posts.filter((post) => !post.draft)),
    [posts, showDrafts],
  );

  async function handleDelete(slug: string) {
    if (!window.confirm(`Delete post "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    setError(null);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? `Delete failed (${res.status})`);
      }
      router.refresh();
    } catch {
      setError("Network error, please try again");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">
          Posts <span className="pd-mono text-sm text-(--dk-mist)">({visible.length})</span>
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-(--dk-mist)">
            <input
              type="checkbox"
              checked={showDrafts}
              onChange={(event) => setShowDrafts(event.target.checked)}
              className="accent-(--dk-acid)"
            />
            Show drafts
          </label>
          <Link
            href="/admin/posts/new"
            className="rounded-md bg-(--dk-acid) px-4 py-2 text-sm font-semibold text-(--dk-abyss) transition hover:brightness-110"
          >
            New post
          </Link>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-(--dk-line) bg-(--dk-panel) p-10 text-center">
          <p className="text-(--dk-mist)">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="mt-2 inline-block text-sm text-(--dk-acid) hover:underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-(--dk-line)">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-(--dk-line) bg-(--dk-panel) text-xs uppercase tracking-wide text-(--dk-mist)">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-(--dk-line) last:border-0 hover:bg-(--dk-panel)/60"
                >
                  <td className="max-w-56 truncate px-4 py-3 font-medium text-(--dk-ink)">
                    {post.title}
                  </td>
                  <td className="pd-mono max-w-44 truncate px-4 py-3 text-xs text-(--dk-mist)">
                    {post.slug}
                  </td>
                  <td className="pd-mono px-4 py-3 text-xs text-(--dk-mist)">{post.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex max-w-48 flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="pd-mono rounded border border-(--dk-line) bg-(--dk-abyss) px-1.5 py-0.5 text-xs text-(--dk-mist)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {post.draft ? (
                      <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-300">
                        Draft
                      </span>
                    ) : (
                      <span className="rounded-full border border-(--dk-acid)/30 bg-(--dk-acid)/10 px-2 py-0.5 text-xs text-(--dk-acid)">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 text-sm">
                      {!post.draft && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-(--dk-mist) transition-colors hover:text-(--dk-ink)"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="text-(--dk-mist) transition-colors hover:text-(--dk-ink)"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.slug)}
                        disabled={deleting === post.slug}
                        className="text-red-400/80 transition-colors hover:text-red-400 disabled:opacity-50"
                      >
                        {deleting === post.slug ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
