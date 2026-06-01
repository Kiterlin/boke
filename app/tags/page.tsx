import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/metadata";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "标签",
  description: "查看所有博客标签。",
  path: "/tags"
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">Tags</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-normal">标签</h1>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="rounded-[var(--radius)] border bg-card/70 p-5 transition-colors hover:border-accent"
          >
            <span className="text-lg font-semibold">{tag.name}</span>
            <span className="mt-2 block text-sm text-muted-foreground">{tag.count} 篇文章</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
