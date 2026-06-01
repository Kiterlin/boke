import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { pageMetadata } from "@/lib/metadata";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const match = getAllCategories().find(
    (item) => item.slug === decodeURIComponent(category)
  );
  return pageMetadata({
    title: match ? `分类：${match.name}` : "分类",
    description: match ? `查看 ${match.name} 分类下的文章。` : "查看分类文章。",
    path: `/categories/${category}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const match = getAllCategories().find(
    (item) => item.slug === decodeURIComponent(category)
  );

  if (!match || posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">Category</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-normal">{match.name}</h1>
      <p className="mt-5 text-muted-foreground">{posts.length} 篇文章归档在此分类下。</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
