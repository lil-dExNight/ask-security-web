import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Post } from "./blog";

// blog.ts resolves content/blog from process.cwd() at import time, so each
// test runs from a fresh temp directory and re-imports the module there.
let blog: typeof import("./blog");
let dir: string;
const originalCwd = process.cwd();

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    slug: "hello-world",
    title: "Hello World",
    date: "2026-01-15",
    excerpt: "Intro",
    tags: ["news"],
    draft: false,
    content: "Body text",
    ...overrides,
  };
}

beforeEach(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-test-"));
  process.chdir(dir);
  vi.resetModules();
  blog = await import("./blog");
});

afterEach(() => {
  process.chdir(originalCwd);
  fs.rmSync(dir, { recursive: true, force: true });
});

describe("listPosts", () => {
  it("returns an empty list for an empty directory", () => {
    expect(blog.listPosts()).toEqual([]);
  });

  it("lists posts sorted by date descending", () => {
    blog.createPost(makePost({ slug: "old-post", date: "2025-12-01" }));
    blog.createPost(makePost({ slug: "new-post", date: "2026-03-01" }));
    const slugs = blog.listPosts().map((post) => post.slug);
    expect(slugs).toEqual(["new-post", "old-post"]);
  });

  it("hides drafts by default and includes them on demand", () => {
    blog.createPost(makePost({ slug: "public-post", date: "2026-01-15" }));
    blog.createPost(makePost({ slug: "draft-post", date: "2026-01-10", draft: true }));
    expect(blog.listPosts().map((post) => post.slug)).toEqual(["public-post"]);
    expect(blog.listPosts({ includeDrafts: true }).map((post) => post.slug)).toEqual([
      "public-post",
      "draft-post",
    ]);
  });

  it("skips files whose names are not valid slugs", () => {
    const blogDir = path.join(dir, "content", "blog");
    fs.mkdirSync(blogDir, { recursive: true });
    fs.writeFileSync(path.join(blogDir, "Bad Slug.md"), "---\ntitle: Bad\n---\nBody\n", "utf8");
    blog.createPost(makePost());
    expect(blog.listPosts().map((post) => post.slug)).toEqual(["hello-world"]);
  });

  it("skips files larger than 1MB", () => {
    const blogDir = path.join(dir, "content", "blog");
    fs.mkdirSync(blogDir, { recursive: true });
    const frontmatter = "---\ntitle: Huge\n---\n";
    fs.writeFileSync(path.join(blogDir, "huge-post.md"), frontmatter + "x".repeat(1_048_576), "utf8");
    expect(blog.listPosts()).toEqual([]);
    expect(blog.getPost("huge-post")).toBeNull();
  });
});

describe("getPost", () => {
  it("returns null for a missing slug", () => {
    expect(blog.getPost("no-such-post")).toBeNull();
  });

  it("returns null for a draft unless includeDrafts is set", () => {
    blog.createPost(makePost({ draft: true }));
    expect(blog.getPost("hello-world")).toBeNull();
    expect(blog.getPost("hello-world", { includeDrafts: true })?.title).toBe("Hello World");
  });

  it("roundtrips content and metadata", () => {
    blog.createPost(makePost({ content: "  Some *markdown* body  " }));
    const post = blog.getPost("hello-world");
    expect(post).toMatchObject({
      slug: "hello-world",
      title: "Hello World",
      date: "2026-01-15",
      excerpt: "Intro",
      tags: ["news"],
      draft: false,
      content: "Some *markdown* body",
    });
  });
});

describe("slug validation", () => {
  it.each(["../etc", "..", "a/b", "Foo", "HELLO", "hello world", "hello_world", "-lead", "trail-", ""])(
    "rejects %j",
    (slug) => {
      expect(blog.getPost(slug)).toBeNull();
      expect(blog.deletePost(slug)).toBe(false);
    },
  );

  it("never resolves a path outside the blog directory", () => {
    blog.createPost(makePost({ slug: "real-post" }));
    expect(blog.getPost("../blog/real-post")).toBeNull();
  });

  it("createPost rejects an unrecoverable slug", () => {
    expect(() => blog.createPost(makePost({ slug: "a/b", title: "!!!" }))).toThrow(
      "Invalid post slug",
    );
  });
});

describe("createPost / savePost / deletePost", () => {
  it("createPost fails on a duplicate slug (O_EXCL)", () => {
    blog.createPost(makePost());
    expect(() => blog.createPost(makePost({ title: "Second" }))).toThrow(blog.PostExistsError);
    expect(blog.getPost("hello-world")?.title).toBe("Hello World");
  });

  it("savePost overwrites an existing post", () => {
    blog.createPost(makePost());
    blog.savePost(makePost({ title: "Updated", content: "New body" }));
    const post = blog.getPost("hello-world");
    expect(post?.title).toBe("Updated");
    expect(post?.content).toBe("New body");
  });

  it("deletePost removes the file and reports success once", () => {
    blog.createPost(makePost());
    expect(blog.deletePost("hello-world")).toBe(true);
    expect(blog.getPost("hello-world")).toBeNull();
    expect(blog.deletePost("hello-world")).toBe(false);
  });

  it("savePost leaves no temp files behind", () => {
    blog.savePost(makePost());
    expect(fs.readdirSync(path.join(dir, "content", "blog"))).toEqual(["hello-world.md"]);
  });
});

describe("slugify", () => {
  it("normalizes titles into slugs", () => {
    expect(blog.slugify("Hello, World!")).toBe("hello-world");
    expect(blog.slugify("  Multiple   Spaces  and--dashes  ")).toBe("multiple-spaces-and-dashes");
    expect(blog.slugify("Crème Brûlée")).toBe("creme-brulee");
  });
});
