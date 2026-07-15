import type { Metadata } from "next";

import { FadeIn } from "@/components/animated";
import { TaxonomyDirectory } from "@/components/taxonomy-directory";
import { pageMetadata } from "@/lib/metadata";
import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "分类",
  description: "以内容类型浏览 DeepFrame Lab 的核心分类。",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <FadeIn className="grid gap-8 border-b border-border/80 pb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="editorial-kicker">Content sections</p>
          <h1 className="display-title mt-6 text-5xl sm:text-7xl">按内容类型浏览</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">先判断阅读目的，再进入对应的文章集合。分类表达文章承担的任务，标签表达文章讨论的问题。</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground lg:col-span-2 lg:col-start-11">{String(categories.length).padStart(2, "0")} SECTIONS</p>
      </FadeIn>
      <FadeIn className="pt-10"><TaxonomyDirectory items={categories} basePath="/categories" /></FadeIn>
    </div>
  );
}
