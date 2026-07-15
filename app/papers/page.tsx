import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeIn, ParallaxMedia } from "@/components/animated";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "论文展示",
  description: "MARSNet 与 LH-DETR 的研究成果、方法贡献、实验指标和论文材料展示。",
  path: "/papers"
});

const papers = [
  {
    number: "01",
    title: "MARSNet: Multimodal Adaptive Refined Small-Object Detection with Fusion Enhanced by Omni Perception",
    venue: "Information Fusion 投稿",
    status: "SCI 一区方向",
    role: "第二作者",
    image: "/research/marsnet-framework.png",
    pdf: "/research/marsnet-information-fusion.pdf",
    summary: "面向 RGB-T 小目标检测，提出计算感知的全流程证据保真框架，系统应对早期空间证据侵蚀、模态噪声传播和跨尺度定位畸变。",
    contributions: ["DualSOE 空间细节增强", "AF 模态可靠性自适应融合", "ARFP 抗混叠特征金字塔"],
    metrics: [
      { label: "RGBTDronePerson mAP50", value: "49.89%" },
      { label: "Tiny-object mAP50", value: "50.90%" },
      { label: "实时速度", value: "35.48 FPS" },
      { label: "评测数据集", value: "4 个 RGB-T Benchmark" }
    ]
  },
  {
    number: "02",
    title: "LH-DETR: A Lightweight Hybrid Architecture for End-to-End Object Detection in UAV Images",
    venue: "ICRA 2026",
    status: "机器人顶会 CCF-B",
    role: "第二作者",
    image: "/research/lh-detr-poster.png",
    pdf: "/research/lh-detr-icra.pdf",
    summary: "面向无人机图像中的小目标、密集目标和端侧实时部署，构建轻量化端到端检测器，在精度、速度和参数量之间取得更稳的平衡。",
    contributions: ["WMHB Wavelet-Mamba 骨干", "FAD-FFN 高频细节增强", "ASVLoss 自滑动训练目标"],
    metrics: [
      { label: "VisDrone AP", value: "22.4%" },
      { label: "VisDrone AP50", value: "39.6%" },
      { label: "参数量", value: "14.3M" },
      { label: "推理速度", value: "57.0 FPS" }
    ]
  }
];

const researchAxis = [
  ["A.01", "小目标证据保护", "围绕高频边界、稀疏纹理和浅层结构信息，减少下采样、融合和重采样对小目标证据的持续损耗。"],
  ["A.02", "多模态可靠融合", "在 RGB-T 场景中显式建模模态质量，让融合策略按环境退化情况动态调节，而不是固定叠加。"],
  ["A.03", "实时部署约束", "论文设计始终围绕参数量、GFLOPs、FPS 和检测精度的平衡，面向 UAV 与边缘设备落地。"]
];

export default function PapersPage() {
  return (
    <div>
      <section className="editorial-shell pb-20 pt-14 sm:pb-28 sm:pt-20">
        <FadeIn className="grid gap-10 border-b border-border/80 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="editorial-kicker">Selected research</p>
            <h1 className="display-title mt-7 max-w-5xl text-5xl leading-[1.06] sm:text-7xl">
              在复杂环境里，保住小目标真正有用的证据。
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">研究主线聚焦 UAV 图像和 RGB-T 场景，以轻量化、实时性和环境鲁棒性为共同约束。</p>
          </div>
          <div className="border-l border-border/80 pl-5 font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-muted-foreground lg:col-span-2 lg:col-start-11">
            <p>02 papers</p><p>CV / UAV</p><p>Multimodal</p>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-border/70 bg-secondary/34">
        <div className="editorial-shell">
          {papers.map((paper, paperIndex) => (
            <article key={paper.title} className="grid gap-10 border-b border-border/80 py-20 last:border-b-0 sm:py-28 lg:grid-cols-12">
              <FadeIn className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-xs text-accent">RESEARCH / {paper.number}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  <span>{paper.venue}</span><span>{paper.status}</span><span>{paper.role}</span>
                </div>
                <h2 className="section-title mt-7 text-3xl leading-tight sm:text-4xl">{paper.title}</h2>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">{paper.summary}</p>
                <Link href={paper.pdf} target="_blank" rel="noreferrer" className="editorial-link mt-8">打开论文 PDF <ArrowUpRight className="size-4" /></Link>
              </FadeIn>

              <div className="lg:col-span-7 lg:col-start-6">
                <FadeIn delay={0.08}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-background/70">
                    <ParallaxMedia className="absolute inset-[-5%]">
                      <Image src={paper.image} alt={`${paper.title} 方法与实验视觉`} fill className="object-contain p-6" sizes="(min-width: 1024px) 58vw, 100vw" priority={paperIndex === 0} />
                    </ParallaxMedia>
                  </div>
                </FadeIn>
                <FadeIn className="mt-10 grid grid-cols-2 border-t border-border/80 sm:grid-cols-4">
                  {paper.metrics.map((metric) => (
                    <div key={metric.label} className="border-b border-l border-border/80 px-3 py-5 first:border-l-0 sm:border-b-0">
                      <p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                      <p className="mt-3 font-mono text-lg tabular-nums">{metric.value}</p>
                    </div>
                  ))}
                </FadeIn>
                <FadeIn className="mt-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Core contributions</p>
                  <ol className="mt-4 border-t border-border/80">
                    {paper.contributions.map((item, index) => (
                      <li key={item} className="grid grid-cols-[3rem_1fr] border-b border-border/80 py-4 text-sm leading-7"><span className="font-mono text-xs text-accent">0{index + 1}</span><span>{item}</span></li>
                    ))}
                  </ol>
                </FadeIn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-shell py-20 sm:py-28">
        <FadeIn className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><p className="editorial-kicker">Research axis</p><h2 className="section-title mt-5 text-4xl">一条连续的研究叙事</h2></div>
          <div className="lg:col-span-8 lg:col-start-5">
            {researchAxis.map(([number, title, text]) => (
              <div key={number} className="grid gap-4 border-t border-border/80 py-7 sm:grid-cols-12"><span className="font-mono text-xs text-accent sm:col-span-2">{number}</span><h3 className="section-title text-xl sm:col-span-3">{title}</h3><p className="text-sm leading-7 text-muted-foreground sm:col-span-7">{text}</p></div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
