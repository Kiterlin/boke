import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Cpu, FileText } from "lucide-react";

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
  const leadPost = featured[0] || posts[0];
  const latest = posts.filter((post) => post.slug !== leadPost?.slug).slice(0, 3);
  const tags = getAllTags().slice(0, 8);
  const categories = getAllCategories();
  const promptChips = [
    "解释一篇无人机小目标检测论文",
    "整理 RAG 项目的工程复盘",
    "比较 RGB-T 与多模态检测路线",
    "生成一份 NL2SQL 调优清单",
    "总结车载 Agent 的低延迟链路",
    "提炼实验指标中的关键结论",
    "把研究问题写成技术博客",
    "追踪 Function Calling 设计取舍"
  ];
  const capabilityEntries = [
    {
      href: "/papers",
      icon: FileText,
      label: "论文展示",
      title: "无人机与多模态小目标检测研究",
      text: "集中展示 MARSNet、LH-DETR 的研究问题、方法贡献、实验指标和论文材料。",
      meta: "CV · UAV · RGB-T"
    },
    {
      href: "/projects",
      icon: BriefcaseBusiness,
      label: "项目经历",
      title: "行业 LLM、RAG 与车载 Agent 工程",
      text: "梳理数据治理、微调、NL2SQL、Function Calling、MCP 与线上低延迟链路。",
      meta: "LLM · RAG · Agent"
    }
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32 lg:px-8">
        <FadeIn className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="min-w-0 max-w-3xl">
            <div className="inline-flex rounded-full bg-foreground/[0.04] p-1 ring-1 ring-foreground/[0.06]">
              <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Research OS
              </span>
            </div>
            <h1 className="mt-8 text-balance text-5xl font-semibold leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl">
              DeepFrame Lab
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              面向 AI、计算机视觉与工程实践的研究型内容系统。论文、项目和工程经验不再散落，而是被整理成可检索、可复用、可长期引用的知识结构。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_50px_rgba(15,15,15,0.16)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
              >
                阅读最新文章
                <span className="grid size-8 place-items-center rounded-full bg-primary-foreground/12 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link
                href="/papers"
                className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/80 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-foreground shadow-[0_18px_50px_rgba(15,15,15,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-foreground/15"
              >
                查看研究论文
                <span className="grid size-8 place-items-center rounded-full bg-secondary transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="min-w-0 rounded-[2rem] bg-foreground/[0.055] p-2 shadow-[0_30px_90px_rgba(15,15,15,0.12)] ring-1 ring-foreground/[0.06]">
            <div className="overflow-hidden rounded-[1.5rem] bg-[oklch(0.16_0.006_96)] text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-xs text-white/55">
                <span>DeepFrame Console</span>
                <span className="font-mono">ready</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="text-sm text-white/55">Ask the lab</p>
                  <p className="mt-3 text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    把论文、项目和工程判断整理成一条清晰的研究路线。
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {promptChips.slice(0, 4).map((chip, index) => (
                    <Link
                      key={chip}
                      href={index % 2 === 0 ? "/papers" : "/projects"}
                      className="rounded-2xl bg-white/[0.045] p-4 text-sm leading-6 text-white/72 ring-1 ring-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.08] hover:text-white"
                    >
                      {chip}
                    </Link>
                  ))}
                </div>
                <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/[0.045] p-4 ring-1 ring-white/[0.08]">
                    <dt className="text-white/45">Posts</dt>
                    <dd className="mt-2 font-mono text-2xl font-semibold text-white">{posts.length}</dd>
                  </div>
                  <div className="rounded-2xl bg-white/[0.045] p-4 ring-1 ring-white/[0.08]">
                    <dt className="text-white/45">Categories</dt>
                    <dd className="mt-2 font-mono text-2xl font-semibold text-white">{categories.length}</dd>
                  </div>
                  <div className="rounded-2xl bg-white/[0.045] p-4 ring-1 ring-white/[0.08]">
                    <dt className="text-white/45">Tags</dt>
                    <dd className="mt-2 font-mono text-2xl font-semibold text-white">{getAllTags().length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-border/60 bg-secondary/35">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <FadeIn>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-accent">Editors pick</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-normal">精选文章</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">
                  全部文章
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            {leadPost ? (
              <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15">
                <Link href={`/blog/${leadPost.slug}`} className="block p-7 sm:p-9">
                  <Badge variant="accent">{leadPost.category}</Badge>
                  <h3 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
                    {leadPost.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {leadPost.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={leadPost.date}>
                      {formatDate(leadPost.date)}
                    </time>
                    <span className="h-px w-5 bg-border" />
                    <span>{leadPost.readingTime}</span>
                  </div>
                </Link>
              </Card>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mb-5">
              <p className="text-sm font-medium text-accent">Latest</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal">最新更新</h2>
            </div>
            <div className="grid gap-3">
              {latest.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 rounded-2xl border border-border/65 bg-background/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-background"
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="text-sm font-medium text-accent">Knowledge map</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">方向入口</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              先按内容类型进入，再用标签细分到具体问题。完整文章列表保留在 /blog。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:border-foreground/15 hover:bg-secondary/70 hover:text-foreground"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.slug} className="transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15">
                <Link href={`/categories/${category.slug}`} className="block p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold">{category.name}</h3>
                    <span className="font-mono text-sm text-muted-foreground">
                      {category.count}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/35">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent">Research and work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal">
                论文与项目入口
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/about">
                关于我
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {capabilityEntries.map((entry) => {
              const Icon = entry.icon;
              const SupportIcon = entry.href === "/papers" ? BookOpen : Cpu;

              return (
                <Card key={entry.href} className="transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15">
                  <Link href={entry.href} className="block p-7">
                    <div className="flex items-center justify-between gap-4">
                      <Badge variant="accent">{entry.label}</Badge>
                      <span className="grid size-10 place-items-center rounded-full bg-secondary text-foreground">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-normal">
                      {entry.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.text}</p>
                    <Separator className="my-6" />
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <SupportIcon className="size-4" />
                        {entry.meta}
                      </span>
                      <span className="font-medium text-foreground underline decoration-border underline-offset-4">
                        查看详情
                      </span>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
