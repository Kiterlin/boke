"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function SearchClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return posts;
    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.description,
        post.category,
        post.tags.join(" "),
        post.excerpt
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [normalized, posts]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题、标签、分类或摘要"
          className="h-14 pl-11 text-base"
          autoFocus
        />
      </div>

      <div className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          {normalized ? `找到 ${results.length} 篇相关文章` : `共 ${posts.length} 篇文章`}
        </p>
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-[var(--radius)] border bg-card/70 p-5 transition-colors hover:border-accent/60"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{post.category}</span>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-normal group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
