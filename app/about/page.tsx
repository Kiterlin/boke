import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "关于",
  description: "了解 DeepFrame Lab 的内容方向、写作原则与技术栈。",
  path: "/about"
});

const principles = ["本地 MDX 优先，内容可迁移", "排版与阅读体验优先于装饰", "SEO、RSS、Sitemap 默认开启", "暗色模式与移动端作为一等体验"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium text-accent">About</p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-normal">
            记录 AI 研究与工程实践的地方。
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-9 text-muted-foreground">
          <p>
            DeepFrame Lab 是一个专注于 AI、计算机视觉与多模态技术的个人技术博客。这里记录研究过程中的思考、项目复盘，以及工程实践中沉淀下来的经验与方法。
          </p>
          <p>
            站点保留清晰的信息架构：主页建立概览，文章页专注阅读，标签与分类负责发现，搜索负责快速定位，RSS 与 Sitemap 支撑订阅与搜索引擎抓取。
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {principles.map((item) => (
          <Card key={item} className="flex items-center gap-4 bg-card/70 p-5">
            <CheckCircle2 className="size-5 text-accent" />
            <span className="font-medium">{item}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
