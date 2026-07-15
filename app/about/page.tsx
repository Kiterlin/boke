import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/animated";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "关于",
  description: "了解 Sun Lupeng 的研究方向、项目经历、博客内容范围和联系方式。",
  path: "/about"
});

const researchDirections = [
  ["01", "计算机视觉与小目标检测", "关注 UAV 图像、RGB-T 多模态融合和实时部署约束。"],
  ["02", "LLM 应用工程", "关注 RAG、NL2SQL、Function Calling、MCP 与任务型 Agent 编排。"],
  ["03", "参数高效微调与模型适配", "关注 LoRA、QLoRA、P-Tuning 和行业数据闭环。"]
];

const experience = [
  ["2025", "车载任务型 LLM 对话系统", "参与意图识别、拒识模型、工具候选召回、Function Calling 和 MCP 工具接入。"],
  ["2025", "电力信息安全辅助培训问答系统", "参与 PDF 解析、结构化大宽表、问题分流、NL2SQL、RAG 总结和模型微调。"],
  ["2026", "MARSNet / LH-DETR", "围绕多模态、轻量化和无人机场景检测展开研究，整理论文材料与实验指标。"]
];

export default function AboutPage() {
  return (
    <div>
      <section className="editorial-shell pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="mb-10 flex items-center justify-between border-b border-border/80 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><span>Profile / Sun Lupeng</span><span>Research & Engineering</span></div>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7 lg:pb-8">
            <p className="editorial-kicker">About the author</p>
            <h1 className="display-title mt-7 text-5xl leading-[1.04] sm:text-7xl">把研究问题讲清楚，也把工程系统做扎实。</h1>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground">
              <p>我是 Sun Lupeng，关注计算机视觉、LLM 应用工程和参数高效微调。DeepFrame Lab 是我的个人研究与工程档案。</p>
              <p>这里少做资讯追逐，更重视问题定义、方法拆解、工程取舍和可以长期引用的复盘结论。</p>
            </div>
            <Link href="mailto:qq13961090143@163.com" className="editorial-link mt-9">联系我 <ArrowUpRight className="size-4" /></Link>
          </FadeIn>
          <FadeIn delay={0.12} className="lg:col-span-5"><div className="portrait-frame aspect-[4/5] min-h-0" role="img" aria-label="Sun Lupeng 个人照片"><span className="portrait-fallback">SL</span><div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Sun Lupeng / 2026</p></div></div></FadeIn>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/34 py-20 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-3"><p className="editorial-kicker">Research direction</p><h2 className="section-title mt-5 text-4xl">持续投入的三个方向</h2></FadeIn>
          <FadeIn className="lg:col-span-8 lg:col-start-5">
            {researchDirections.map(([number, title, text]) => <div key={number} className="grid gap-4 border-t border-border/80 py-7 sm:grid-cols-12"><span className="font-mono text-xs text-accent sm:col-span-2">{number}</span><h3 className="section-title text-xl sm:col-span-4">{title}</h3><p className="text-sm leading-7 text-muted-foreground sm:col-span-6">{text}</p></div>)}
          </FadeIn>
        </div>
      </section>

      <section className="editorial-shell py-20 sm:py-28">
        <FadeIn className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><p className="editorial-kicker">Selected experience</p><h2 className="section-title mt-5 text-4xl">研究与项目经历</h2></div>
          <div className="lg:col-span-8 lg:col-start-5">
            {experience.map(([year, title, text]) => <div key={title} className="grid gap-4 border-t border-border/80 py-7 sm:grid-cols-12"><span className="font-mono text-xs text-accent sm:col-span-2">{year}</span><h3 className="section-title text-xl sm:col-span-4">{title}</h3><p className="text-sm leading-7 text-muted-foreground sm:col-span-6">{text}</p></div>)}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-border/70 bg-primary py-20 text-primary-foreground sm:py-24">
        <FadeIn className="editorial-shell grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/55">Open for conversation</p><h2 className="section-title mt-5 text-4xl sm:text-6xl">欢迎交流论文研究、Agent 系统和 AI 工程实践。</h2></div><div className="lg:col-span-3 lg:col-start-10"><Link href="mailto:qq13961090143@163.com" className="inline-flex items-center gap-3 border-b border-primary-foreground/40 pb-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">发送邮件 <ArrowUpRight className="size-4" /></Link></div></FadeIn>
      </section>
    </div>
  );
}
