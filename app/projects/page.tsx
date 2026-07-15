import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/animated";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "项目介绍",
  description: "AI Agent、RAG、NL2SQL、MCP 与行业大模型项目经历展示。",
  path: "/projects"
});

const projects = [
  {
    number: "01",
    title: "领克车型任务型 LLM 对话系统",
    period: "2025.09 — 2025.12",
    role: "核心开发",
    summary: "面向车载语音助手构建多轮任务型 Agent，覆盖 12 个领域、400+ 技能和 10w+ 日均指令，在延迟敏感场景中完成意图识别、槽位抽取、工具调用与自然语言回复。",
    stack: ["DeepSeek", "BERT", "Function Calling", "MCP", "NLU", "Prompt Engineering"],
    metrics: [["领域覆盖", "12"], ["技能规模", "400+"], ["日均指令", "10w+"], ["端到端目标", "首字 < 1s"]],
    work: [
      "构建 BERT-Tiny 拒识模型，处理噪声、ASR 半截句和无效语义，离线准确率约 91%，QPS 400+。",
      "用一级意图模型做 top-k 召回，再交给 LLM 精修 Function Calling，把 400+ 工具选择空间压缩到可控候选集。",
      "通过 MCP 接入高德地图、天气、音乐等第三方工具，形成可插拔工具调用链路。"
    ]
  },
  {
    number: "02",
    title: "基于生成式模型的电力信息安全辅助培训问答系统",
    period: "2025.03 — 2025.06",
    role: "上海电网省级项目 · 核心开发",
    summary: "面向电力培训与信息安全合规场景，构建从 PDF 解析、结构化大宽表、问题分类、NL2SQL、关键词抽取到 RAG 答案生成的行业问答系统。",
    stack: ["Qwen2.5-7B/32B", "LoRA", "P-Tuning v2", "RAG", "NL2SQL", "Embedding Retrieval"],
    metrics: [["文档规模", "11588"], ["数据体量", "70GB"], ["覆盖单位", "3102"], ["综合得分", "85+"]],
    work: [
      "解析 11000+ 份电力培训与安全合规 PDF，结合 pdftotext、camelot-py 和大宽表支撑精准查询。",
      "微调 Qwen2.5-7B 分类、关键词抽取和 NL2SQL 子模型，让 Type1/Type2 问题走精确查询与公式计算。",
      "对开放性合规问题使用 BM25/Embedding 召回与 32B 大模型总结，保证答案包含数值、公式和自然语言解释。"
    ]
  }
];

const timeline = [
  ["01", "Data", "数据治理", "线上日志、PDF 文档、人工标注和大模型增广共同形成训练与评测闭环。"],
  ["02", "Model", "模型分层", "拒识、分类、关键词、NL2SQL、NLG 拆成独立能力，用最小可行模型承接对应任务。"],
  ["03", "Agent", "链路编排", "把改写、仲裁、召回、工具调用和答案生成组织成可观测、可兜底的业务流水线。"],
  ["04", "Serve", "性能落地", "通过并发预热、前缀缓存、流式输出、量化和多 LoRA 部署降低线上响应成本。"]
];

export default function ProjectsPage() {
  return (
    <div>
      <section className="editorial-shell pb-20 pt-14 sm:pb-28 sm:pt-20">
        <FadeIn className="grid gap-10 border-b border-border/80 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="editorial-kicker">Engineering field notes</p>
            <h1 className="display-title mt-7 max-w-5xl text-5xl leading-[1.06] sm:text-7xl">让模型进入业务之前，先把系统设计清楚。</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">项目覆盖数据治理、微调、RAG、NL2SQL、Agent 编排、Function Calling 与 MCP 工具生态。</p>
            <Link href="/papers" className="editorial-link mt-8">查看研究成果 <ArrowRight className="size-4" /></Link>
          </div>
          <div className="border-l border-border/80 pl-5 font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-muted-foreground lg:col-span-2 lg:col-start-11"><p>02 projects</p><p>LLM / RAG</p><p>Agent systems</p></div>
        </FadeIn>
      </section>

      <section className="border-y border-border/70 bg-secondary/34">
        <div className="editorial-shell">
          {projects.map((project) => (
            <article key={project.title} className="grid gap-12 border-b border-border/80 py-20 last:border-b-0 sm:py-28 lg:grid-cols-12">
              <FadeIn className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-xs text-accent">PROJECT / {project.number}</p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{project.period}</p>
                <h2 className="section-title mt-5 text-3xl leading-tight sm:text-4xl">{project.title}</h2>
                <p className="mt-4 text-sm font-medium text-accent">{project.role}</p>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">{project.summary}</p>
                <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </FadeIn>
              <div className="lg:col-span-7 lg:col-start-6">
                <FadeIn className="grid grid-cols-2 border-t border-border/80 sm:grid-cols-4">
                  {project.metrics.map(([label, value]) => <div key={label} className="border-b border-l border-border/80 px-3 py-5 first:border-l-0 sm:border-b-0"><p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-3 font-mono text-xl tabular-nums">{value}</p></div>)}
                </FadeIn>
                <FadeIn className="mt-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">What I worked on</p>
                  <ol className="mt-5 border-t border-border/80">
                    {project.work.map((item, index) => <li key={item} className="grid gap-3 border-b border-border/80 py-6 sm:grid-cols-[4rem_1fr]"><span className="font-mono text-xs text-accent">0{index + 1}</span><p className="text-sm leading-7 text-muted-foreground">{item}</p></li>)}
                  </ol>
                </FadeIn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-shell py-20 sm:py-28">
        <FadeIn className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><p className="editorial-kicker">System method</p><h2 className="section-title mt-5 text-4xl">一条可复用的工程链路</h2></div>
          <div className="grid sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {timeline.map(([number, label, title, text]) => <div key={number} className="border-t border-border/80 py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"><p className="font-mono text-xs text-accent">{number} · {label}</p><h3 className="section-title mt-5 text-2xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p></div>)}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
