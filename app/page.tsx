import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { FadeIn } from "@/components/animated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllCategories, getAllPosts, getAllTags, getFeaturedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const latest = posts.slice(0, 4);
  const tags = getAllTags().slice(0, 8);
  const categories = getAllCategories();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <FadeIn className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <Badge variant="accent">Research Blog</Badge>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              DeepFrame Lab
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              面向 AI、计算机视觉与工程实践的技术编辑部。这里保留研究判断、项目复盘和可以反复引用的开发经验。
            </p>
          </div>
          <div className="border-l pl-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">内容索引</p>
            <dl className="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-1">
              <div>
                <dt>文章</dt>
                <dd className="mt-1 font-mono text-xl text-foreground">{posts.length}</dd>
              </div>
              <div>
                <dt>分类</dt>
                <dd className="mt-1 font-mono text-xl text-foreground">{categories.length}</dd>
              </div>
              <div>
                <dt>标签</dt>
                <dd className="mt-1 font-mono text-xl text-foreground">{getAllTags().length}</dd>
              </div>
            </dl>
          </div>
        </FadeIn>
      </section>

      <section className="border-y bg-secondary/35">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <FadeIn>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-accent">Editors Pick</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal">精选文章</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">
                  全部文章
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            {(featured[0] || latest[0]) ? (
              <Card className="overflow-hidden">
                <Link href={`/blog/${(featured[0] || latest[0]).slug}`} className="block p-6 sm:p-7">
                  <Badge variant="accent">{(featured[0] || latest[0]).category}</Badge>
                  <h3 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                    {(featured[0] || latest[0]).title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {(featured[0] || latest[0]).description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={(featured[0] || latest[0]).date}>
                      {formatDate((featured[0] || latest[0]).date)}
                    </time>
                    <span className="h-px w-5 bg-border" />
                    <span>{(featured[0] || latest[0]).readingTime}</span>
                  </div>
                </Link>
              </Card>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mb-5">
              <p className="text-sm font-medium text-accent">Latest</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal">最新更新</h2>
            </div>
            <div className="grid gap-0 border-y">
              {latest.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 border-b py-4 last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.category}</span>
                    <span className="h-px w-4 bg-border" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug tracking-normal group-hover:text-accent">
                    {post.title}
                  </h3>
                  {index === 0 ? (
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {post.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.32fr_0.68fr] lg:px-8">
        <div>
          <p className="text-sm font-medium text-accent">Topics</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">主题入口</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            用标签和分类组织长期内容，方便读者从一个问题进入一组文章。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="rounded-sm border bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-normal">文章目录</h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {latest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
