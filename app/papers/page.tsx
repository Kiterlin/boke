import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "论文展示",
  description: "MARSNet 与 LH-DETR 的研究成果、方法贡献、实验指标和论文材料展示。",
  path: "/papers"
});

const papers = [
  {
    title: "MARSNet: Multimodal Adaptive Refined Small-Object Detection with Fusion Enhanced by Omni Perception",
    venue: "Information Fusion 投稿",
    status: "SCI 一区方向",
    role: "第二作者",
    image: "/research/marsnet-framework.png",
    pdf: "/research/marsnet-information-fusion.pdf",
    summary:
      "面向 RGB-T 小目标检测，提出计算感知的全流程证据保真框架，系统应对早期空间证据侵蚀、模态噪声传播和跨尺度定位畸变。",
    contributions: ["DualSOE 空间细节增强", "AF 模态可靠性自适应融合", "ARFP 抗混叠特征金字塔"],
    metrics: [
      { label: "RGBTDronePerson mAP50", value: "49.89%" },
      { label: "Tiny-object mAP50", value: "50.90%" },
      { label: "实时速度", value: "35.48 FPS" },
      { label: "评测数据集", value: "4 个 RGB-T Benchmark" }
    ]
  },
  {
    title: "LH-DETR: A Lightweight Hybrid Architecture for End-to-End Object Detection in UAV Images",
    venue: "ICRA 2026",
    status: "机器人顶会 CCF-B",
    role: "第二作者",
    image: "/research/lh-detr-poster.png",
    pdf: "/research/lh-detr-icra.pdf",
    summary:
      "面向无人机图像中的小目标、密集目标和端侧实时部署，构建轻量化端到端检测器，在精度、速度和参数量之间取得更稳的平衡。",
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
  {
    title: "小目标证据保护",
    text: "围绕高频边界、稀疏纹理和浅层结构信息，减少下采样、融合和重采样对小目标证据的持续损耗。"
  },
  {
    title: "多模态可靠融合",
    text: "在 RGB-T 场景中显式建模模态质量，让融合策略按环境退化情况动态调节，而不是固定叠加。"
  },
  {
    title: "实时部署约束",
    text: "论文设计始终围绕参数量、GFLOPs、FPS 和检测精度的平衡，面向 UAV 与边缘设备落地。"
  }
];

export default function PapersPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:px-8">
        <div>
          <Badge variant="accent">Research</Badge>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            面向无人机与多模态感知的小目标检测研究。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            当前研究主线聚焦 UAV 图像和 RGB-T 场景下的小目标检测，以轻量化、实时性和复杂环境鲁棒性为核心约束。
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 border-l pl-5 text-sm text-muted-foreground lg:grid-cols-1">
          <div>
            <dt>论文</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">{papers.length}</dd>
          </div>
          <div>
            <dt>方向</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">CV / UAV</dd>
          </div>
        </dl>
      </section>

      <section id="paper-list" className="border-y bg-secondary/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent">Selected papers</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal">论文成果</h2>
            </div>
            <Badge variant="outline">Computer Vision · Robotics · Multimodal</Badge>
          </div>
          <div className="grid gap-6">
            {papers.map((paper) => (
              <Card key={paper.title} className="overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
                  <div className="relative min-h-[240px] border-b bg-secondary/45 lg:border-b-0 lg:border-r">
                    <Image
                      src={paper.image}
                      alt={`${paper.title} visual preview`}
                      fill
                      className="object-contain p-5"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="accent">{paper.venue}</Badge>
                      <Badge variant="secondary">{paper.status}</Badge>
                      <Badge variant="outline">{paper.role}</Badge>
                    </div>
                    <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-normal sm:text-3xl">
                      {paper.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{paper.summary}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {paper.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-md border bg-background p-4">
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                          <p className="mt-2 font-mono text-xl text-foreground">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {paper.contributions.map((item) => (
                        <span
                          key={item}
                          className="rounded-sm border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="mt-7">
                      <Link href={paper.pdf} target="_blank" rel="noreferrer">
                        打开论文 PDF
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-normal">研究叙事</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {researchAxis.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
