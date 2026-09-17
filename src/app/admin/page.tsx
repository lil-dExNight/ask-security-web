import type { Metadata } from "next";
import { listPosts } from "@/lib/blog";
import { PostsTable } from "./posts-table";

export const metadata: Metadata = { title: "Posts" };
export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await listPosts({ includeDrafts: true });
  const sorted = [...posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return <PostsTable posts={sorted} />;
}
