import type { Metadata } from "next";

import { FadeIn } from "@/components/animated";
import { TaxonomyDirectory } from "@/components/taxonomy-directory";
import { pageMetadata } from "@/lib/metadata";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "标签",
  description: "以知识地图方式浏览 DeepFrame Lab 的核心标签。",
  path: "/tags"
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <FadeIn className="grid gap-8 border-b border-border/80 pb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="editorial-kicker">Knowledge index</p>
          <h1 className="display-title mt-6 text-5xl sm:text-7xl">沿着问题继续阅读</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">每个标签都是一条可继续深入的阅读路径，用来保留模型、协议与工程问题之间的上下文关系。</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground lg:col-span-2 lg:col-start-11">{String(tags.length).padStart(2, "0")} TOPICS</p>
      </FadeIn>
      <FadeIn className="pt-10"><TaxonomyDirectory items={tags} basePath="/tags" /></FadeIn>
    </div>
  );
}
