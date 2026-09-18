import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPost } from "@/lib/blog";
import type { Post } from "@/lib/blog";
import { PostEditor } from "../../../post-editor";

export const metadata: Metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await getSession())) redirect("/admin/login");
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await getPost(slug, { includeDrafts: true });
  } catch {
    post = null;
  }
  if (!post) notFound();
  return <PostEditor mode="edit" initialPost={post} />;
}
