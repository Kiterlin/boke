import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "关于",
  description: "了解 Sun Lupeng 的研究方向、项目经历、博客内容范围和联系方式。",
  path: "/about"
});

const researchDirections = [
  "计算机视觉与小目标检测，关注 UAV 图像、RGB-T 多模态融合和实时部署约束。",
  "LLM 应用工程，关注 RAG、NL2SQL、Function Calling、MCP 与任务型 Agent 编排。",
  "参数高效微调与模型适配，关注 LoRA、QLoRA、P-Tuning 和行业数据闭环。"
];

const projectExperience = [
  {
    title: "车载任务型 LLM 对话系统",
    text: "参与意图识别、拒识模型、工具候选召回、Function Calling 和 MCP 工具接入，面向低延迟车载语音场景。"
  },
  {
    title: "电力信息安全辅助培训问答系统",
    text: "参与 PDF 解析、结构化大宽表、问题分流、NL2SQL、RAG 总结和 Qwen 系列模型微调。"
  },
  {
    title: "小目标检测研究",
    text: "围绕 MARSNet 与 LH-DETR 展开多模态、轻量化和无人机场景检测研究，整理论文材料与实验指标。"
  }
];

const contentScope = [
  "研究论文阅读、方法复盘和实验指标整理",
  "LLM、Agent、RAG、MCP、微调等工程实践",
  "面试准备、概念地图和可复用学习手册",
  "个人项目复盘、技术判断和长期维护经验"
];

const principles = [
  {
    title: "内容可迁移",
    text: "文章使用本地 MDX 管理，元数据清楚，方便长期维护和版本管理。"
  },
  {
    title: "阅读优先",
    text: "页面用排版、行长和边界建立层级，避免用装饰抢走正文注意力。"
  },
  {
    title: "默认可发现",
    text: "列表、标签、分类、RSS 与 Sitemap 都围绕内容发现建立，而不是作为附加项。"
  },
  {
    title: "体验一致",
    text: "浅色、暗色和移动端共用同一套视觉语言，保证文章阅读稳定。"
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <Badge variant="accent">About</Badge>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            关于我
          </h1>
        </div>
        <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
          <p>
            我是 Sun Lupeng，关注计算机视觉、LLM 应用工程和参数高效微调。DeepFrame Lab 是我整理研究判断、项目经验和学习材料的个人博客。
          </p>
          <p>
            这里的内容更偏长期可引用的技术笔记：少做资讯追逐，多保留问题定义、方法拆解、工程取舍和复盘结论。
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      <section className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="text-sm font-medium text-accent">Research direction</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">研究方向</h2>
        </div>
        <div className="grid gap-3">
          {researchDirections.map((item) => (
            <p
              key={item}
              className="border-l-2 border-accent/45 pl-4 text-sm leading-7 text-muted-foreground"
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="text-sm font-medium text-accent">Project experience</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">项目经历</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projectExperience.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="text-sm font-medium text-accent">Writing scope</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">博客内容范围</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {contentScope.map((item) => (
            <div key={item} className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="text-sm font-medium text-accent">Contact</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">联系方式</h2>
        </div>
        <Card className="p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            欢迎围绕论文研究、LLM 工程、Agent 系统和项目合作交流。
          </p>
          <Link
            href="mailto:qq13961090143@163.com"
            className="mt-4 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            qq13961090143@163.com
          </Link>
        </Card>
      </section>

      <Separator className="my-12" />

      <section>
        <div className="mb-6">
          <p className="text-sm font-medium text-accent">Site principles</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">站点原则</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
        {principles.map((item) => (
          <Card key={item.title} className="p-5">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
          </Card>
        ))}
        </div>
      </section>
    </div>
  );
}
