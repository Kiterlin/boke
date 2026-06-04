import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="accent">Tags</Badge>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
        标签
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
        按主题聚合文章，保留技术问题之间的上下文关系。每个标签都是一条可继续深入的阅读路径。
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Card key={tag.slug} className="transition-colors hover:border-accent/60">
            <Link href={`/tags/${tag.slug}`} className="block p-5">
              <span className="text-lg font-semibold">{tag.name}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{tag.count} 篇文章</span>
              <span className="mt-4 block text-sm leading-6 text-muted-foreground">
                {tag.description}
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
