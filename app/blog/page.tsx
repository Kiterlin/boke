import type { Metadata } from "next";
import Link from "next/link";

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
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <FadeIn className="grid gap-10 border-b border-border/80 pb-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="editorial-kicker">Writing archive</p>
          <h1 className="display-title mt-6 text-5xl leading-none sm:text-7xl">文章与长期笔记</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">
            不追逐短期资讯，主要记录 Agent 工程、参数高效微调、工具协议与研究方法中值得长期引用的上下文和判断。
          </p>
        </div>
        <dl className="grid grid-cols-2 border-l border-border/80 pl-5 lg:col-span-3 lg:col-start-10">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Articles</dt>
            <dd className="mt-2 font-mono text-2xl">{String(posts.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sections</dt>
            <dd className="mt-2 font-mono text-2xl">{String(categories.length).padStart(2, "0")}</dd>
          </div>
        </dl>
      </FadeIn>

      <FadeIn className="grid gap-10 pt-10 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Browse by category</p>
          <nav className="mt-5 grid border-t border-border/80" aria-label="文章分类">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="flex items-center justify-between border-b border-border/80 py-3 text-sm transition-colors hover:text-accent">
                <span>{category.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{String(category.count).padStart(2, "0")}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5">
          {posts.map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}
        </div>
      </FadeIn>
    </div>
  );
}
