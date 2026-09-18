import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, listPosts } from "@/lib/blog";
import { Markdown } from "@/components/markdown";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

// CSP nonces require dynamic rendering, so ISR is disabled here.
export const dynamic = "force-dynamic";

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

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = listPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
          <Link
            href="/blog"
            className="pd-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-(--dk-mist) transition-colors hover:text-(--dk-acid)"
          >
            <ArrowLeft className="size-3.5" />
            All posts
          </Link>

          <header className="mt-10 border-b border-(--dk-line) pb-10">
            <p className="pd-mono flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-(--dk-acid)">
              <span className="inline-block h-px w-8 bg-(--dk-acid)/60" />
              {"// article"}
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-(--dk-ink) sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <time
                dateTime={post.date}
                className="pd-mono text-[11px] uppercase tracking-[0.25em] text-(--dk-mist)"
              >
                {formatDate(post.date)}
              </time>
              {post.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="pd-mono border border-(--dk-line) px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-(--dk-mist)"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </header>

          <Markdown source={post.content} />

          {related.length > 0 ? (
            <nav aria-label="More posts" className="mt-16 border-t border-(--dk-line) pt-10">
              <p className="pd-mono text-[10px] uppercase tracking-[0.3em] text-(--dk-mist)">
                Keep reading
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group block border border-(--dk-line) bg-(--dk-panel)/40 p-5 transition-colors hover:border-(--dk-acid)/50 hover:bg-(--dk-panel)/70"
                    >
                      <span className="text-sm font-semibold tracking-tight text-(--dk-ink) transition-colors group-hover:text-(--dk-acid-soft)">
                        {p.title}
                      </span>
                      <span className="pd-mono mt-2 block text-[10px] uppercase tracking-[0.25em] text-(--dk-mist)">
                        {formatDate(p.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
