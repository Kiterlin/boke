import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { pageMetadata } from "@/lib/metadata";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

type Props = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

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
    description: match ? match.description : "查看分类文章。",
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
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <p className="editorial-kicker">Category archive</p>
      <h1 className="display-title mt-6 text-balance text-5xl sm:text-7xl">
        {match.name}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
        {match.description}
      </p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{posts.length} 篇文章归档在此分类下</p>
      <div className="mt-10 max-w-5xl">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
