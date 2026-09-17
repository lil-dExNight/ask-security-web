import { NextRequest, NextResponse } from "next/server";
import { listPosts, savePost } from "@/lib/blog";
import { buildNewPost, slugExists } from "./post-input";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await listPosts({ includeDrafts: true });
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to list posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const result = buildNewPost(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  try {
    if (await slugExists(result.post.slug)) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }
    await savePost(result.post);
    return NextResponse.json({ post: result.post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
