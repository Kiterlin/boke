import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { FadeIn } from "@/components/animated";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";
import { getAllCategories, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "文章",
  description: "浏览 DeepFrame Lab 的全部文章。",
  path: "/blog"
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
        <div>
          <Badge variant="accent">Archive</Badge>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            文章列表
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            按发布时间整理 Agent 工程、PEFT 学习文档与 MCP 面试题等知识库文章。
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 border-l pl-5 text-sm text-muted-foreground lg:grid-cols-1">
          <div>
            <dt>文章</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">{posts.length}</dd>
          </div>
          <div>
            <dt>分类</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">{categories.length}</dd>
          </div>
        </dl>
      </FadeIn>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-sm border bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {category.name} · {category.count}
          </Link>
        ))}
      </div>

      <Separator className="my-10" />

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
