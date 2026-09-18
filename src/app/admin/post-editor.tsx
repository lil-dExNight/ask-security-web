"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import type { Post } from "@/lib/blog";

const Markdown = dynamic(() => import("@/components/markdown").then((mod) => mod.Markdown), {
  ssr: false,
  loading: () => <p className="text-sm text-(--dk-mist)">Loading preview…</p>,
});

const inputClass =
  "w-full rounded-md border border-(--dk-line) bg-(--dk-panel) px-3 py-2 text-sm text-(--dk-ink) placeholder:text-(--dk-mist) focus:border-(--dk-acid) focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-(--dk-mist)";

function slugifyInput(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

interface PostEditorProps {
  mode: "new" | "edit";
  initialPost?: Post;
}

export function PostEditor({ mode, initialPost }: PostEditorProps) {
  const router = useRouter();
  const originalSlug = initialPost?.slug ?? "";

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [date, setDate] = useState(initialPost?.date ?? todayIso());
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [tagsInput, setTagsInput] = useState((initialPost?.tags ?? []).join(", "));
  const [draft, setDraft] = useState(initialPost?.draft ?? true);
  const [content, setContent] = useState(initialPost?.content ?? "");
  const deferredContent = useDeferredValue(content);
  const [showPreview, setShowPreview] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function handleTitleChange(value: string) {
    setTitle(value);
    setDirty(true);
    if (!slugEdited) setSlug(slugifyInput(value));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      date: date || undefined,
      excerpt: excerpt.trim(),
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      draft,
      content,
    };
    try {
      const res = await fetch(
        mode === "new"
          ? "/api/admin/posts"
          : `/api/admin/posts/${encodeURIComponent(originalSlug)}`,
        {
          method: mode === "new" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        setDirty(false);
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? `Save failed (${res.status})`);
    } catch {
      setError("Network error, please try again");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    router.push("/admin");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            onClick={(event) => {
              if (dirty && !window.confirm("Discard unsaved changes?")) {
                event.preventDefault();
              }
            }}
            className="text-sm text-(--dk-mist) transition-colors hover:text-(--dk-ink)"
          >
            ← Posts
          </Link>
          <h1 className="text-xl font-semibold">
            {mode === "new" ? "New post" : `Edit: ${initialPost?.title ?? ""}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((value) => !value)}
            className="rounded-md border border-(--dk-line) px-4 py-2 text-sm text-(--dk-mist) transition-colors hover:border-(--dk-acid) hover:text-(--dk-ink)"
          >
            {showPreview ? "Hide preview" : "Preview"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-(--dk-line) px-4 py-2 text-sm text-(--dk-mist) transition-colors hover:border-(--dk-acid) hover:text-(--dk-ink)"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="rounded-md bg-(--dk-acid) px-4 py-2 text-sm font-semibold text-(--dk-abyss) transition hover:brightness-110 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Post title"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugEdited(true);
              setDirty(true);
            }}
            placeholder="auto-generated-from-title"
            className={`${inputClass} pd-mono`}
          />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setDirty(true);
            }}
            className={`${inputClass} pd-mono`}
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-(--dk-mist)">
            <input
              type="checkbox"
              checked={draft}
              onChange={(event) => {
                setDraft(event.target.checked);
                setDirty(true);
              }}
              className="accent-(--dk-acid)"
            />
            Draft (hidden from the public blog)
          </label>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(event) => {
              setExcerpt(event.target.value);
              setDirty(true);
            }}
            rows={2}
            placeholder="Short summary shown in the post list"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="tags" className={labelClass}>
            Tags (comma separated)
          </label>
          <input
            id="tags"
            value={tagsInput}
            onChange={(event) => {
              setTagsInput(event.target.value);
              setDirty(true);
            }}
            placeholder="security, research"
            className={inputClass}
          />
        </div>
      </div>

      <div className={`mt-6 grid gap-4 ${showPreview ? "lg:grid-cols-2" : ""}`}>
        <div>
          <label htmlFor="content" className={labelClass}>
            Content (Markdown)
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setDirty(true);
            }}
            rows={24}
            spellCheck={false}
            placeholder="Write your post in Markdown…"
            className={`${inputClass} pd-mono resize-y leading-relaxed`}
          />
        </div>
        {showPreview && (
          <div>
            <p className={labelClass}>Preview</p>
            <div className="min-h-96 rounded-md border border-(--dk-line) bg-(--dk-panel) p-4">
              {content.trim() ? (
                <Markdown source={deferredContent} />
              ) : (
                <p className="text-sm text-(--dk-mist)">Nothing to preview yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
