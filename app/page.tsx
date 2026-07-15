import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { FadeIn, ParallaxMedia } from "@/components/animated";
import { getAllCategories, getAllPosts, getAllTags, getFeaturedPosts } from "@/lib/posts";

const selectedResearch = [
  {
    index: "R.01",
    title: "MARSNet：让 RGB-T 小目标证据在融合链路中被保留下来",
    description: "围绕空间细节、模态可靠性与跨尺度重采样，建立多模态小目标检测的完整证据保真链路。",
    image: "/research/marsnet-framework.png",
    href: "/papers",
    meta: "Information Fusion · RGB-T · 35.48 FPS"
  },
  {
    index: "R.02",
    title: "LH-DETR：面向无人机图像的轻量化端到端检测器",
    description: "在小目标精度、参数量与实时速度之间寻找可部署的平衡，并将高频结构纳入轻量化骨干设计。",
    image: "/research/lh-detr-poster.png",
    href: "/papers",
    meta: "ICRA 2026 · UAV · 14.3M"
  }
];

const practice = [
  {
    index: "P.01",
    title: "车载任务型 LLM 对话系统",
    text: "覆盖 12 个领域、400+ 技能与 10w+ 日均指令，把拒识、召回、Function Calling 和 MCP 组织成低延迟工具链。",
    meta: "Agent · MCP · NLU"
  },
  {
    index: "P.02",
    title: "电力信息安全辅助培训问答系统",
    text: "从 11000+ 份 PDF 到 NL2SQL、RAG 与模型微调，让结构化查询和开放式问答进入同一条行业知识链路。",
    meta: "RAG · NL2SQL · PEFT"
  }
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const leadPost = featured[0] || posts[0];
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="overflow-hidden">
      <section className="editorial-shell relative pb-24 pt-16 sm:pt-24 lg:pb-32">
        <div className="mb-10 flex items-center justify-between border-b border-border/80 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Issue 01 · Research & Engineering</span>
          <span>Shanghai · CN</span>
        </div>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7 lg:pb-8">
            <p className="editorial-kicker">Researcher / AI engineer</p>
            <h1 className="display-title mt-8 max-w-4xl text-[clamp(3.3rem,7.4vw,7.4rem)] leading-[0.94]">
              研究感知，
              <span className="block text-accent">也构建智能。</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              我是 Sun Lupeng。研究无人机与多模态小目标检测，也负责把 RAG、Agent、Function Calling 与 MCP 变成可落地的工程系统。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Link href="/papers" className="editorial-link">查看研究成果 <ArrowRight className="size-4" /></Link>
              <Link href="/projects" className="editorial-link">浏览工程项目 <ArrowRight className="size-4" /></Link>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-3 border-y border-border/80 py-5">
              {[
                ["论文", "02"],
                ["项目", "02"],
                ["长文", String(posts.length).padStart(2, "0")]
              ].map(([label, value]) => (
                <div key={label} className="border-l border-border/80 pl-4 first:border-l-0 first:pl-0">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
                  <dd className="mt-2 font-mono text-2xl tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-5">
            <div className="portrait-frame aspect-[4/5] min-h-0" role="img" aria-label="Sun Lupeng 个人照片">
              <span className="portrait-fallback">SL</span>
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-5 text-white">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Profile portrait</p>
                  <p className="mt-1 font-serif text-xl font-semibold">Sun Lupeng</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">2026</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/36 py-24 sm:py-32">
        <div className="editorial-shell">
          <FadeIn className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4">
              <p className="editorial-kicker">Selected research</p>
              <h2 className="section-title mt-5 text-4xl sm:text-5xl">研究不是结果陈列，而是问题如何被拆开。</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:col-span-5 lg:col-start-8">
              两条研究线都围绕一个约束展开：在小目标、复杂环境和实时部署同时存在时，如何让真正重要的视觉证据留下来。
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-16">
            {selectedResearch.map((item, index) => (
              <FadeIn key={item.title} className="grid gap-7 border-t border-border/80 pt-7 lg:grid-cols-12 lg:items-center">
                <div className={`lg:col-span-6 ${index % 2 ? "lg:col-start-7" : ""}`}>
                  <ParallaxMedia className="relative aspect-[16/10] overflow-hidden bg-background/70">
                    <Image src={item.image} alt={`${item.title} 研究图示`} fill className="object-contain p-5" sizes="(min-width: 1024px) 50vw, 100vw" />
                  </ParallaxMedia>
                </div>
                <div className={`lg:col-span-5 ${index % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
                  <p className="font-mono text-xs text-accent">{item.index}</p>
                  <h3 className="section-title mt-4 text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.meta}</p>
                  <Link href={item.href} className="editorial-link mt-7">阅读研究档案 <ArrowUpRight className="size-4" /></Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-shell py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="editorial-kicker">Engineering practice</p>
            <h2 className="section-title mt-5 text-4xl sm:text-5xl">模型之外，系统仍然需要被设计。</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">从数据、召回和模型分层，到工具协议与线上延迟，每个工程判断都要能被追踪和复用。</p>
            <Link href="/projects" className="editorial-link mt-8">查看完整项目 <ArrowRight className="size-4" /></Link>
          </FadeIn>
          <div className="lg:col-span-7 lg:col-start-6">
            {practice.map((item) => (
              <FadeIn key={item.index} className="border-t border-border/80 py-9 first:pt-0">
                <div className="grid gap-4 sm:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-xs text-accent">{item.index}</span>
                  <div>
                    <h3 className="section-title text-2xl">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.meta}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/28 py-24 sm:py-28">
        <div className="editorial-shell grid gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-3">
            <p className="editorial-kicker">Latest writing</p>
            <h2 className="section-title mt-5 text-4xl">最近写下的判断</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">长文不是资讯摘要，而是把一个问题的上下文、取舍与结论留住。</p>
          </FadeIn>
          <FadeIn className="lg:col-span-8 lg:col-start-5">
            {posts.slice(0, 4).map((post, index) => (
              <ArticleCard key={post.slug} post={post} featured={post.slug === leadPost?.slug} index={index} />
            ))}
            <Link href="/blog" className="editorial-link mt-8">进入全部文章 <ArrowRight className="size-4" /></Link>
          </FadeIn>
        </div>
      </section>

      <section className="editorial-shell py-20 sm:py-24">
        <FadeIn className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="editorial-kicker">Knowledge index</p>
            <h2 className="section-title mt-5 text-3xl">继续探索</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Categories</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {categories.map((item) => <Link key={item.slug} href={`/categories/${item.slug}`} className="editorial-link">{item.name} <span className="font-mono text-[10px]">{item.count}</span></Link>)}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Topics</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 8).map((item) => <Link key={item.slug} href={`/tags/${item.slug}`} className="border border-border/80 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent">#{item.name}</Link>)}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
