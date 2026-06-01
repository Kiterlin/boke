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
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-medium text-accent">Search</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-normal">搜索知识库</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          客户端即时搜索本地文章元数据与摘要，适合中小型个人/团队博客第一版。
        </p>
      </FadeIn>
      <div className="mt-10">
        <SearchClient posts={posts} />
      </div>
    </div>
  );
}
