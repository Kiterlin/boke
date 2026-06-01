import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "关于",
  description: "了解 DeepFrame Lab 的内容方向、写作原则与技术栈。",
  path: "/about"
});

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
            记录 AI 研究与工程实践的地方。
          </h1>
        </div>
        <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
          <p>
            DeepFrame Lab 是一个专注于 AI、计算机视觉与多模态技术的个人技术博客。这里记录研究过程中的思考、项目复盘，以及工程实践中沉淀下来的经验与方法。
          </p>
          <p>
            站点保留清晰的信息架构：主页建立概览，文章页专注阅读，标签与分类负责发现，搜索负责快速定位，RSS 与 Sitemap 支撑订阅与搜索引擎抓取。
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="grid gap-4 md:grid-cols-2">
        {principles.map((item) => (
          <Card key={item.title} className="p-5">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
