import type { Metadata } from "next";

import { FadeIn } from "@/components/animated";
import { SearchClient } from "@/components/search-client";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "搜索",
  description: "按标题、摘要、标签和分类搜索博客文章。",
  path: "/search"
});

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <Badge variant="accent">Search</Badge>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
          搜索文章
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          输入标题、标签、分类或摘要关键词，快速定位已发布内容。
        </p>
      </FadeIn>
      <div className="mt-10">
        <SearchClient posts={posts} />
      </div>
    </div>
  );
}
