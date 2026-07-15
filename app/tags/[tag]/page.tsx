import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { pageMetadata } from "@/lib/metadata";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const match = getAllTags().find((item) => item.slug === decodeURIComponent(tag));
  return pageMetadata({
    title: match ? `标签：${match.name}` : "标签",
    description: match ? match.description : "查看标签文章。",
    path: `/tags/${tag}`
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const match = getAllTags().find((item) => item.slug === decodeURIComponent(tag));

  if (!match || posts.length === 0) notFound();

  return (
    <div className="editorial-shell pb-24 pt-14 sm:pt-20">
      <p className="editorial-kicker">Topic archive</p>
      <h1 className="display-title mt-6 text-balance text-5xl sm:text-7xl">
        {match.name}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
        {match.description}
      </p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{posts.length} 篇文章归档在此标签下</p>
      <div className="mt-10 max-w-5xl">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
