import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listPosts, type PostMeta } from "@/lib/blog";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

// CSP nonces require dynamic rendering, so ISR is disabled here.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Research notes, audit post-mortems, and security engineering write-ups from the ASK Security team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — ASK Security",
    description:
      "Research notes, audit post-mortems, and security engineering write-ups from the ASK Security team.",
    url: "/blog",
    type: "website",
  },
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFmt.format(date);
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group block border border-(--dk-line) bg-(--dk-panel)/40 p-6 transition-colors duration-300 hover:border-(--dk-acid)/50 hover:bg-(--dk-panel)/70 sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <time
            dateTime={post.date}
            className="pd-mono text-[11px] uppercase tracking-[0.25em] text-(--dk-mist)"
          >
            {formatDate(post.date)}
          </time>
          <ArrowUpRight className="size-4 shrink-0 text-(--dk-mist) transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--dk-acid)" />
        </div>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-(--dk-ink) transition-colors group-hover:text-(--dk-acid-soft) sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-(--dk-mist) sm:text-base">
          {post.excerpt}
        </p>
        {post.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="pd-mono border border-(--dk-line) px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-(--dk-mist) transition-colors group-hover:border-(--dk-acid)/40 group-hover:text-(--dk-acid)"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </li>
  );
}

export default function BlogIndexPage() {
  const posts = listPosts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
          <p className="pd-mono flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-(--dk-acid)">
            <span className="inline-block h-px w-8 bg-(--dk-acid)/60" />
            {"// Research notes"}
          </p>
          <div className="mt-5 border-b border-(--dk-line) pb-8">
            <h1 className="text-4xl font-semibold tracking-tight text-(--dk-ink) sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-(--dk-mist)">
              Audit post-mortems, vulnerability research, and security engineering
              write-ups from the ASK Security team
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="pd-mono mt-16 border border-dashed border-(--dk-line) bg-(--dk-panel)/30 px-6 py-14 text-center text-xs uppercase tracking-[0.25em] text-(--dk-mist)">
              No posts published yet — check back soon
            </p>
          ) : (
            <ul className="mt-12 grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
