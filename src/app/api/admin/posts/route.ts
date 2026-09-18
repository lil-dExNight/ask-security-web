import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PostExistsError, createPost, listPosts } from "@/lib/blog";
import { getSession } from "@/lib/auth";
import { buildNewPost } from "./post-input";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const posts = await listPosts({ includeDrafts: true });
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to list posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
    await createPost(result.post);
  } catch (err) {
    if (err instanceof PostExistsError) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${result.post.slug}`);
  revalidatePath("/blog/rss.xml");
  return NextResponse.json({ post: result.post }, { status: 201 });
}
