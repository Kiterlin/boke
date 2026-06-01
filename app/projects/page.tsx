import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "项目介绍",
  description: "AI Agent、RAG、NL2SQL、MCP 与行业大模型项目经历展示。",
  path: "/projects"
});

const projects = [
  {
    title: "领克车型任务型 LLM 对话系统",
    period: "2025.09 - 2025.12",
    role: "核心开发",
    summary:
      "面向车载语音助手构建多轮任务型 Agent，覆盖 12 个领域、400+ 技能和 10w+ 日均指令，在延迟敏感场景中完成意图识别、槽位抽取、工具调用与自然语言回复。",
    stack: ["DeepSeek", "BERT", "Function Calling", "MCP", "NLU", "Prompt Engineering"],
    metrics: [
      { label: "领域覆盖", value: "12" },
      { label: "技能规模", value: "400+" },
      { label: "日均指令", value: "10w+" },
      { label: "端到端目标", value: "首字 < 1s" }
    ],
    work: [
      "构建 BERT-Tiny 拒识模型，处理噪声、ASR 半截句和无效语义，离线准确率约 91%，QPS 400+。",
      "用一级意图模型做 top-k 召回，再交给 LLM 精修 Function Calling，把 400+ 工具选择空间压缩到可控候选集。",
      "通过 MCP 接入高德地图、天气、音乐等第三方工具，形成可插拔工具调用链路。"
    ],
    highlights: ["五路并发预热", "动态 Function Calling", "多轮 query 改写", "Redis 上下文缓存"]
  },
  {
    title: "基于生成式模型的电力信息安全辅助培训问答系统",
    period: "2025.03 - 2025.06",
    role: "上海电网省级项目 · 核心开发",
    summary:
      "面向电力培训与信息安全合规场景，构建从 PDF 解析、结构化大宽表、问题分类、NL2SQL、关键词抽取到 RAG 答案生成的行业问答系统。",
    stack: ["Qwen2.5-7B/32B", "LoRA", "P-Tuning v2", "RAG", "NL2SQL", "Embedding Retrieval"],
    metrics: [
      { label: "文档规模", value: "11588" },
      { label: "数据体量", value: "70GB" },
      { label: "覆盖单位", value: "3102" },
      { label: "综合得分", value: "85+" }
    ],
    work: [
      "解析 11000+ 份电力培训与安全合规 PDF，结合 pdftotext、camelot-py 和大宽表支撑精准查询。",
      "微调 Qwen2.5-7B 分类、关键词抽取和 NL2SQL 子模型，让 Type1/Type2 问题走精确查询与公式计算。",
      "对开放性合规问题使用 BM25/Embedding 召回与 32B 大模型总结，保证答案包含数值、公式和自然语言解释。"
    ],
    highlights: ["PDF 表格抽取", "问题链拆解", "SQL 精确查询", "RAG 总结生成"]
  }
];

const principles = [
  {
    title: "先分流，再处理",
    text: "把请求拆成任务型、闲聊型和拒识型，降低单一路径承担的判断复杂度。"
  },
  {
    title: "小模型召回，大模型精选",
    text: "高频入口用低延迟模型做粗筛，LLM 只处理需要推理和语言生成的窄候选空间。"
  },
  {
    title: "工具协议化",
    text: "通过 Function Calling 与 MCP 把外部服务抽象成标准工具，降低新增技能和后端替换成本。"
  }
];

const timeline = [
  {
    label: "Data",
    title: "数据治理",
    text: "线上日志、PDF 文档、人工标注和大模型增广共同形成训练与评测闭环。"
  },
  {
    label: "Model",
    title: "模型分层",
    text: "拒识、分类、关键词、NL2SQL、NLG 拆成独立能力，用最小可行模型承接对应任务。"
  },
  {
    label: "Agent",
    title: "链路编排",
    text: "把改写、仲裁、召回、工具调用和答案生成组织成可观测、可兜底的业务流水线。"
  },
  {
    label: "Serve",
    title: "性能落地",
    text: "通过并发预热、前缀缓存、流式输出、量化和多 LoRA 部署降低线上响应成本。"
  }
];

export default function ProjectsPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:px-8">
        <div>
          <Badge variant="accent">Projects</Badge>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            从行业知识库到车载 Agent 的大模型工程实践。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            项目经历围绕 LLM 应用落地展开：数据治理、微调、RAG、NL2SQL、Agent 编排、Function Calling 与 MCP 工具生态。
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link href="/papers">
              查看论文展示
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <dl className="grid grid-cols-2 gap-4 border-l pl-5 text-sm text-muted-foreground lg:grid-cols-1">
          <div>
            <dt>项目</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">{projects.length}</dd>
          </div>
          <div>
            <dt>主线</dt>
            <dd className="mt-1 font-mono text-xl text-foreground">LLM / RAG</dd>
          </div>
        </dl>
      </section>

      <section id="project-list" className="border-y bg-secondary/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-accent">Project experience</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal">项目经历</h2>
          </div>
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="border-b bg-secondary/45 p-6 sm:p-7 lg:border-b-0 lg:border-r">
                    <p className="text-sm text-muted-foreground">{project.period}</p>
                    <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-normal">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-accent">{project.role}</p>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-sm border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="grid gap-3 sm:grid-cols-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-md border bg-background p-4">
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                          <p className="mt-2 font-mono text-xl text-foreground">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 grid gap-3">
                      {project.work.map((item) => (
                        <p
                          key={item}
                          className="border-l-2 border-accent/45 pl-4 text-sm leading-7 text-muted-foreground"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.highlights.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-normal">工程判断</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {timeline.map((item, index) => (
            <Card key={item.title} className="p-5">
              <p className="font-mono text-xs text-accent">
                0{index + 1} · {item.label}
              </p>
              <h3 className="mt-8 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
