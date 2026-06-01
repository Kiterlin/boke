import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
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
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Button asChild variant="ghost" className="-ml-4 mb-8">
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
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.06] tracking-normal sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-muted-foreground">
            {post.description}
          </p>

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
                  remarkPlugins: [remarkGfm],
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
                    ]
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
                className="rounded-[var(--radius)] border bg-card/70 p-5 transition-colors hover:border-accent"
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
                className="rounded-[var(--radius)] border bg-card/70 p-5 text-right transition-colors hover:border-accent"
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
          <div className="sticky top-24 rounded-[var(--radius)] border bg-card/70 p-5">
            <p className="text-sm font-medium">目录</p>
            <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {post.toc.length ? (
                post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={item.level === 3 ? "pl-4 hover:text-foreground" : "hover:text-foreground"}
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
