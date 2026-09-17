import { listPosts, slugify } from "@/lib/blog";
import type { Post } from "@/lib/blog";

// Slugs are lowercase URL-safe segments only; this also blocks path traversal.
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostInputResult = { ok: true; post: Post } | { ok: false; error: string };

function fail(error: string): PostInputResult {
  return { ok: false, error };
}

function parseTitle(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const title = value.trim();
  if (title.length < 1 || title.length > 200) return null;
  return title;
}

function parseContent(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseExcerpt(value: unknown): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const excerpt = value.trim();
  return excerpt.length <= 500 ? excerpt : null;
}

function parseDate(value: unknown): string | null | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return null;
  const date = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return null;
  return date;
}

function parseTags(value: unknown): string[] | null {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return null;
  const tags: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") return null;
    const tag = item.trim();
    if (tag) tags.push(tag);
  }
  return tags.slice(0, 20);
}

function parseDraft(value: unknown): boolean | null {
  if (value === undefined || value === null) return true;
  return typeof value === "boolean" ? value : null;
}

function parseSlug(value: unknown, title: string): string | null {
  if (value !== undefined && value !== null && value !== "") {
    if (typeof value !== "string") return null;
    const slug = value.trim().toLowerCase();
    return SLUG_RE.test(slug) && slug.length <= 120 ? slug : null;
  }
  const slug = slugify(title);
  return SLUG_RE.test(slug) ? slug : null;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function asRecord(body: unknown): Record<string, unknown> | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  return body as Record<string, unknown>;
}

export function buildNewPost(body: unknown): PostInputResult {
  const input = asRecord(body);
  if (!input) return fail("Invalid request body");

  const title = parseTitle(input.title);
  if (!title) return fail("title is required (1-200 characters)");

  const content = parseContent(input.content);
  if (content === null) return fail("content must be a string");

  const slug = parseSlug(input.slug, title);
  if (!slug) return fail("Invalid slug (lowercase letters, digits and dashes)");

  const date = parseDate(input.date);
  if (date === null) return fail("Invalid date (expected YYYY-MM-DD)");

  const excerpt = parseExcerpt(input.excerpt);
  if (excerpt === null) return fail("Invalid excerpt (max 500 characters)");

  const tags = parseTags(input.tags);
  if (!tags) return fail("tags must be an array of strings");

  const draft = parseDraft(input.draft);
  if (draft === null) return fail("draft must be a boolean");

  return {
    ok: true,
    post: { slug, title, date: date ?? todayIso(), excerpt, tags, draft, content },
  };
}

export function buildUpdatedPost(existing: Post, body: unknown): PostInputResult {
  const input = asRecord(body);
  if (!input) return fail("Invalid request body");

  let title = existing.title;
  if (input.title !== undefined) {
    const parsed = parseTitle(input.title);
    if (!parsed) return fail("title is required (1-200 characters)");
    title = parsed;
  }

  let content = existing.content;
  if (input.content !== undefined) {
    const parsed = parseContent(input.content);
    if (parsed === null) return fail("content must be a string");
    content = parsed;
  }

  // The slug only changes when explicitly provided (rename), never with the title.
  let slug = existing.slug;
  if (input.slug !== undefined && input.slug !== null && input.slug !== "") {
    const parsed = parseSlug(input.slug, title);
    if (!parsed) return fail("Invalid slug (lowercase letters, digits and dashes)");
    slug = parsed;
  }

  let date = existing.date;
  if (input.date !== undefined) {
    const parsed = parseDate(input.date);
    if (parsed === null) return fail("Invalid date (expected YYYY-MM-DD)");
    date = parsed ?? existing.date;
  }

  let excerpt = existing.excerpt;
  if (input.excerpt !== undefined) {
    const parsed = parseExcerpt(input.excerpt);
    if (parsed === null) return fail("Invalid excerpt (max 500 characters)");
    excerpt = parsed;
  }

  let tags = existing.tags;
  if (input.tags !== undefined) {
    const parsed = parseTags(input.tags);
    if (!parsed) return fail("tags must be an array of strings");
    tags = parsed;
  }

  let draft = existing.draft;
  if (input.draft !== undefined) {
    const parsed = parseDraft(input.draft);
    if (parsed === null) return fail("draft must be a boolean");
    draft = parsed;
  }

  return { ok: true, post: { slug, title, date, excerpt, tags, draft, content } };
}

export async function slugExists(slug: string): Promise<boolean> {
  const posts = await listPosts({ includeDrafts: true });
  return posts.some((post) => post.slug === slug);
}
