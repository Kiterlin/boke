import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { FadeIn } from "@/components/animated";
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-medium text-accent">Archive</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-normal">文章列表</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          所有内容来自 `content/posts` 下的本地 Markdown/MDX 文件，按发布时间自动排序。
        </p>
      </FadeIn>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-full border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground hover:border-accent hover:text-foreground"
          >
            {category.name} · {category.count}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
