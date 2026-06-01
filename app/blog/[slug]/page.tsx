import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { categoryHref, tagHref, TaxonomyLink } from "@/components/article-card";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到"
    };
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": "/rss.xml"
      }
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,760px)_240px] lg:justify-between">
        <div className="min-w-0">
          <Button asChild variant="ghost" className="-ml-3 mb-8">
            <Link href="/blog">
              <ArrowLeft />
              返回文章列表
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={categoryHref(post.category)}>
              <Badge variant="accent">{post.category}</Badge>
            </Link>
            <span className="text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="h-px w-4 bg-border" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">作者：{post.author}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TaxonomyLink key={tag} label={`#${tag}`} href={tagHref(tag)} />
            ))}
          </div>

          <Separator className="my-10" />

          <div className="prose-content max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap"
                      }
                    ],
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark-dimmed",
                        keepBackground: false
                      }
                    ],
                    rehypeKatex
                  ]
                }
              }}
            />
          </div>

          <Separator className="my-10" />

          <nav className="grid gap-4 sm:grid-cols-2" aria-label="上一篇和下一篇">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="rounded-md border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <span className="text-sm text-muted-foreground">上一篇</span>
                <span className="mt-2 block font-semibold">{previous.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="rounded-md border bg-card p-5 text-right transition-colors hover:border-accent/60"
              >
                <span className="text-sm text-muted-foreground">下一篇</span>
                <span className="mt-2 flex items-center justify-end gap-2 font-semibold">
                  {next.title}
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l pl-5">
            <p className="text-sm font-medium">目录</p>
            <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {post.toc.length ? (
                post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={
                      item.level === 3
                        ? "pl-4 leading-6 hover:text-foreground"
                        : "leading-6 hover:text-foreground"
                    }
                  >
                    {item.text}
                  </a>
                ))
              ) : (
                <span>暂无目录</span>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </article>
  );
}
