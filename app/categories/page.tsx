import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";
import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "分类",
  description: "查看所有博客分类。",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="accent">Categories</Badge>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
        分类
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
        按内容类型组织文章，方便从研究、工程、设计与分发视角浏览。
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.slug} className="transition-colors hover:border-accent/60">
            <Link href={`/categories/${category.slug}`} className="block p-5">
              <span className="text-lg font-semibold">{category.name}</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                {category.count} 篇文章
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
