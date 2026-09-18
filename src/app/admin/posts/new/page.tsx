import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PostEditor } from "../../post-editor";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  if (!(await getSession())) redirect("/admin/login");
  return <PostEditor mode="new" />;
}
