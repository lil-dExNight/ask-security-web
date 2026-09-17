import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPost, savePost } from "@/lib/blog";
import type { Post } from "@/lib/blog";
import { SLUG_RE, buildUpdatedPost, slugExists } from "../post-input";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

async function loadPost(slug: string): Promise<Post | null> {
  if (!SLUG_RE.test(slug)) return null;
  try {
    const post = await getPost(slug, { includeDrafts: true });
    return post ?? null;
  } catch {
    return null;
  }
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const existing = await loadPost(slug);
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const result = buildUpdatedPost(existing, body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const updated = result.post;
  const renamed = updated.slug !== existing.slug;
  if (renamed && (await slugExists(updated.slug))) {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 },
    );
  }
  // Crash-safe rename: write the new file first; the old file is removed only
  // after the save succeeds, so a failed save never loses the post.
  try {
    await savePost(updated);
  } catch {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
  if (renamed) {
    try {
      await deletePost(existing.slug);
    } catch {
      return NextResponse.json(
        { error: "Post saved, but the old file could not be deleted" },
        { status: 500 },
      );
    }
  }
  return NextResponse.json({ post: updated });
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const existing = await loadPost(slug);
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
