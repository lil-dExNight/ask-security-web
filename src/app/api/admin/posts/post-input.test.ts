import { describe, expect, it } from "vitest";
import { buildNewPost, buildUpdatedPost } from "./post-input";
import type { Post } from "@/lib/blog";

const validBody = {
  title: "Hello World",
  content: "Body text",
  excerpt: "Intro",
  date: "2026-01-15",
  tags: ["news", "release"],
  draft: false,
  slug: "hello-world",
};

const existing: Post = {
  slug: "old-post",
  title: "Old Title",
  date: "2025-01-01",
  excerpt: "Old excerpt",
  tags: ["old"],
  draft: true,
  content: "Old content",
};

describe("buildNewPost", () => {
  it("accepts valid input", () => {
    const result = buildNewPost(validBody);
    expect(result).toEqual({ ok: true, post: { ...validBody } });
  });

  it("derives the slug from the title when omitted", () => {
    const result = buildNewPost({ ...validBody, slug: undefined });
    expect(result.ok && result.post.slug).toBe("hello-world");
  });

  it("defaults draft to true and date to today", () => {
    const result = buildNewPost({ title: "Hi", content: "x" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.post.draft).toBe(true);
      expect(result.post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(result.post.excerpt).toBe("");
      expect(result.post.tags).toEqual([]);
    }
  });

  it.each([null, undefined, "string", 42, ["array"]])("rejects a non-object body: %j", (body) => {
    expect(buildNewPost(body)).toEqual({ ok: false, error: "Invalid request body" });
  });

  it("rejects missing, empty and over-200-char titles", () => {
    expect(buildNewPost({ ...validBody, title: undefined }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, title: "   " }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, title: "x".repeat(201) }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, title: "x".repeat(200) }).ok).toBe(true);
  });

  it("rejects a non-string title", () => {
    expect(buildNewPost({ ...validBody, title: 42 }).ok).toBe(false);
  });

  it("rejects non-string and over-1MB content", () => {
    expect(buildNewPost({ ...validBody, content: 42 }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, content: "x".repeat(1_000_001) }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, content: "x".repeat(1_000_000) }).ok).toBe(true);
  });

  it("rejects invalid slugs and accepts up to 120 chars", () => {
    expect(buildNewPost({ ...validBody, slug: "../etc" }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, slug: "a/b" }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, slug: 42 }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, slug: `a-${"x".repeat(119)}` }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, slug: `a-${"x".repeat(118)}` }).ok).toBe(true);
  });

  it("lowercases an explicit slug", () => {
    const result = buildNewPost({ ...validBody, slug: "Hello-World" });
    expect(result.ok && result.post.slug).toBe("hello-world");
  });

  it("rejects malformed dates", () => {
    expect(buildNewPost({ ...validBody, date: "15/01/2026" }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, date: "2026-13-40" }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, date: 20260115 }).ok).toBe(false);
  });

  it("rejects an excerpt over 500 chars", () => {
    expect(buildNewPost({ ...validBody, excerpt: "x".repeat(501) }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, excerpt: "x".repeat(500) }).ok).toBe(true);
  });

  it("rejects invalid tags and truncates beyond 20", () => {
    expect(buildNewPost({ ...validBody, tags: "news" }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, tags: [1] }).ok).toBe(false);
    expect(buildNewPost({ ...validBody, tags: ["x".repeat(51)] }).ok).toBe(false);
    const many = Array.from({ length: 25 }, (_, i) => `tag-${i}`);
    const result = buildNewPost({ ...validBody, tags: many });
    expect(result.ok && result.post.tags).toHaveLength(20);
  });

  it("rejects a non-boolean draft", () => {
    expect(buildNewPost({ ...validBody, draft: "yes" }).ok).toBe(false);
  });
});

describe("buildUpdatedPost", () => {
  it("keeps the existing post for an empty patch", () => {
    expect(buildUpdatedPost(existing, {})).toEqual({ ok: true, post: existing });
  });

  it("applies a partial update", () => {
    const result = buildUpdatedPost(existing, { title: "New Title", draft: false });
    expect(result.ok && result.post).toMatchObject({
      slug: "old-post",
      title: "New Title",
      draft: false,
      content: "Old content",
    });
  });

  it("renames the slug only when explicitly provided", () => {
    const result = buildUpdatedPost(existing, { title: "New Title" });
    expect(result.ok && result.post.slug).toBe("old-post");
    const renamed = buildUpdatedPost(existing, { slug: "new-slug" });
    expect(renamed.ok && renamed.post.slug).toBe("new-slug");
  });

  it("rejects invalid field updates", () => {
    expect(buildUpdatedPost(existing, { title: "" }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { content: null }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { slug: "a/b" }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { date: "nope" }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { excerpt: "x".repeat(501) }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { tags: [null] }).ok).toBe(false);
    expect(buildUpdatedPost(existing, { draft: 1 }).ok).toBe(false);
  });

  it("rejects a non-object body", () => {
    expect(buildUpdatedPost(existing, null).ok).toBe(false);
  });
});
