import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, isAdminConfigured } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin login" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (isAdminConfigured() && (await getSession())) {
    redirect("/admin");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--dk-void) px-4">
      <LoginForm configured={isAdminConfigured()} />
    </div>
  );
}
