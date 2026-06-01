import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const match = getAllTags().find((item) => item.slug === decodeURIComponent(tag));
  return pageMetadata({
    title: match ? `标签：${match.name}` : "标签",
    description: match ? `查看 ${match.name} 标签下的文章。` : "查看标签文章。",
    path: `/tags/${tag}`
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const match = getAllTags().find((item) => item.slug === decodeURIComponent(tag));

  if (!match || posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="accent">Tag</Badge>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
        {match.name}
      </h1>
      <p className="mt-5 text-muted-foreground">{posts.length} 篇文章归档在此标签下。</p>
      <Separator className="my-10" />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
