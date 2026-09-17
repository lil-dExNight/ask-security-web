import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

function postPath(slug: string): string | null {
  if (!isValidSlug(slug)) return null;
  const file = path.join(BLOG_DIR, `${slug}.md`);
  // Defense in depth: the resolved path must stay inside BLOG_DIR.
  if (path.dirname(file) !== BLOG_DIR) return null;
  return file;
}

function parseMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : new Date().toISOString(),
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    tags: Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === "string") : [],
    draft: data.draft === true,
  };
}

function readPostFile(file: string, slug: string): Post | null {
  try {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    return { ...parseMeta(slug, data), content: content.trim() };
  } catch {
    return null;
  }
}

export function listPosts(opts?: { includeDrafts?: boolean }): PostMeta[] {
  let files: string[];
  try {
    files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const posts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    if (!isValidSlug(slug)) continue;
    const post = readPostFile(path.join(BLOG_DIR, file), slug);
    if (!post) continue;
    if (post.draft && !opts?.includeDrafts) continue;
    const meta: PostMeta = {
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags,
      draft: post.draft,
    };
    posts.push(meta);
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string, opts?: { includeDrafts?: boolean }): Post | null {
  const file = postPath(slug);
  if (!file) return null;
  const post = readPostFile(file, slug);
  if (!post) return null;
  if (post.draft && !opts?.includeDrafts) return null;
  return post;
}

export function savePost(post: Post): void {
  const slug = isValidSlug(post.slug) ? post.slug : slugify(post.title);
  const file = postPath(slug);
  if (!file) throw new Error(`Invalid post slug: ${post.slug}`);

  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const { content, ...meta } = post;
  const frontmatter: Record<string, unknown> = {
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    tags: meta.tags,
  };
  if (meta.draft) frontmatter.draft = true;

  const output = matter.stringify(`\n${content.trim()}\n`, frontmatter);

  // Atomic-ish write: temp file in the same directory, then rename.
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, output, "utf8");
  fs.renameSync(tmp, file);
}

export function deletePost(slug: string): boolean {
  const file = postPath(slug);
  if (!file) return false;
  try {
    fs.unlinkSync(file);
    return true;
  } catch {
    return false;
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of listPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
