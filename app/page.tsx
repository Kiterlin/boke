import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { FadeIn } from "@/components/animated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllCategories, getAllPosts, getAllTags, getFeaturedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const latest = posts.slice(0, 4);
  const tags = getAllTags().slice(0, 8);
  const categories = getAllCategories();

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <FadeIn className="flex flex-col justify-center">
          <Badge variant="accent" className="w-fit">
            AI · Computer Vision · Multimodal
          </Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl">
            把 AI 研究、工程实践与项目复盘，沉淀为长期可检索的知识。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            DeepFrame Lab 专注于 AI、计算机视觉与多模态技术，分享研究思考、项目复盘与高质量开发经验。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href="/blog">
                阅读文章
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/search">搜索知识库</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="lg:pt-10">
          <div className="grid gap-4">
            <Card className="overflow-hidden bg-primary text-primary-foreground">
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-foreground/70">Content Signal</span>
                  <Sparkles className="size-5" />
                </div>
                <p className="mt-12 text-4xl font-semibold tracking-normal">{posts.length}</p>
                <p className="mt-2 text-sm text-primary-foreground/70">篇本地文章已接入检索、RSS 和站点地图</p>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/72 p-6 backdrop-blur">
                <Layers className="mb-8 size-5 text-accent" />
                <p className="text-3xl font-semibold">{categories.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">内容分类</p>
              </Card>
              <Card className="bg-card/72 p-6 backdrop-blur">
                <BookOpen className="mb-8 size-5 text-accent" />
                <p className="text-3xl font-semibold">{tags.length}+</p>
                <p className="mt-2 text-sm text-muted-foreground">主题标签</p>
              </Card>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent">Featured</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal">精选深度文章</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog">
                全部文章
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {(featured.length ? featured : latest.slice(0, 3)).map((post) => (
              <ArticleCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <p className="text-sm font-medium text-accent">Latest</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">最新更新</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            首页优先露出近期内容，同时通过标签与分类帮助读者快速建立知识地图。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="rounded-full border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground hover:border-accent hover:text-foreground"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {latest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
