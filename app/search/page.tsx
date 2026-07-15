import type { Metadata } from "next";

import { FadeIn } from "@/components/animated";
import { SearchClient } from "@/components/search-client";
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
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <FadeIn>
        <p className="editorial-kicker">Search archive</p>
        <h1 className="display-title mt-6 text-5xl sm:text-7xl">搜索文章</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          输入标题、标签、分类或摘要关键词，快速定位已发布内容。
        </p>
      </FadeIn>
      <div className="mt-12 max-w-5xl">
        <SearchClient posts={posts} />
      </div>
    </div>
  );
}
