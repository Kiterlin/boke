"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/article-card";
import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/posts";

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

      <div>
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {normalized ? `找到 ${results.length} 篇相关文章` : `共 ${posts.length} 篇文章`}
        </p>
        {results.length > 0 ? results.map((post, index) => (
          <ArticleCard key={post.slug} post={post} index={index} />
        )) : (
          <div className="border-y border-border/80 py-14">
            <p className="section-title text-2xl">没有匹配的文章</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">换一个更短的关键词，或尝试搜索分类名称和技术缩写。</p>
          </div>
        )}
      </div>
    </div>
  );
}
