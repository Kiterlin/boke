import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User, PenLine } from "lucide-react";

import { categoryHref, tagHref, TaxonomyLink } from "@/components/article-card";
import { getMdxComponents } from "@/components/mdx/mdx-components";
import { TOCSidebar, MobileTOC } from "@/components/mdx/toc-sidebar";
import { ReadingProgress } from "@/components/reading-progress";
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
    return { title: "文章未找到" };
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": "/rss.xml",
      },
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
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);
  const hasTOC = post.toc.length > 0;

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Back link */}
        <div className="mb-10">
          <Button asChild variant="ghost" size="sm" className="-ml-2.5 gap-1.5 text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="size-3.5" />
              文章列表
            </Link>
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:justify-between">
          {/* Main content */}
          <div className="min-w-0 max-w-[760px]">
            {/* ── Header ── */}
            <header className="mb-12">
              {/* Category + meta row */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href={categoryHref(post.category)}>
                  <Badge variant="accent" className="px-2.5 py-0.5 text-xs font-medium">
                    {post.category}
                  </Badge>
                </Link>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="hidden h-3.5 w-px bg-border/60 sm:block" />
                <span className="hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
                <span className="hidden h-3.5 w-px bg-border/60 sm:block" />
                <span className="hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
                  <PenLine className="size-3.5" />
                  {post.words.toLocaleString("zh-CN")} 字
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight">
                {post.title}
              </h1>

              {/* Description / Abstract */}
              <p className="mt-4 max-w-[68ch] text-lg leading-8 text-muted-foreground">
                {post.description}
              </p>

              {/* Author + updated */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <User className="size-3.5" />
                  {post.author}
                </span>
                {post.updated && (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
                    <Calendar className="size-3.5" />
                    更新于 {formatDate(post.updated)}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TaxonomyLink key={tag} label={`#${tag}`} href={tagHref(tag)} />
                ))}
              </div>
            </header>

            {/* ── TL;DR + Audience + Takeaways card ── */}
            {(post.tldr || post.audience.length > 0 || post.takeaways.length > 0) && (
              <div className="mb-12 rounded-xl border border-border/60 bg-card/50 p-6 sm:p-7">
                {post.tldr && (
                  <div className="mb-5">
                    <p className="text-sm leading-7 text-foreground/75">
                      <span className="mr-2 inline-flex items-center rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                        TL;DR
                      </span>
                      {post.tldr}
                    </p>
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  {post.audience.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent/70">
                        适合谁阅读
                      </p>
                      <ul className="space-y-1.5">
                        {post.audience.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/40" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {post.takeaways.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent/70">
                        你将学到
                      </p>
                      <ul className="space-y-1.5">
                        {post.takeaways.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                          >
                            <span className="mt-1 shrink-0 text-accent/50">-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Article body ── */}
            <div className="prose-content">
              <MDXRemote
                source={post.content}
                components={getMdxComponents(post.slug)}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMath],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark-dimmed",
                          keepBackground: false,
                        },
                      ],
                      rehypeKatex,
                    ],
                  },
                }}
              />
            </div>

            {/* ── Footer: tags + prev/next ── */}
            <Separator className="my-14" />

            {/* Tags at bottom */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-muted-foreground/50" />
              {post.tags.map((tag) => (
                <TaxonomyLink key={tag} label={tag} href={tagHref(tag)} />
              ))}
            </div>

            {/* Prev / Next navigation */}
            <nav
              className="grid gap-4 sm:grid-cols-2"
              aria-label="上一篇和下一篇"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-xl border border-border/60 bg-card/50 p-5 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft className="size-3" /> 上一篇
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold leading-snug text-foreground/85 group-hover:text-accent transition-colors line-clamp-2">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-xl border border-border/60 bg-card/50 p-5 text-right transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    下一篇 <ArrowRight className="size-3" />
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold leading-snug text-foreground/85 group-hover:text-accent transition-colors line-clamp-2">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>

          {/* Desktop TOC sidebar */}
          {hasTOC && (
            <TOCSidebar
              toc={post.toc}
              words={post.words}
              readingTime={post.readingTime}
            />
          )}
        </div>
      </article>

      {/* Mobile floating TOC button */}
      {hasTOC && <MobileTOC toc={post.toc} />}
    </>
  );
}
