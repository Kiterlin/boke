# DeepFrame Lab

> DeepFrame Lab · 探索 AI 时代的技术、研究与工程实践

一个专注于 AI、计算机视觉、多模态技术与工程实践的技术博客，记录研究思考、项目复盘与高质量开发经验。

## 技术栈

- **框架**：Next.js（App Router）+ React + TypeScript（strict）
- **样式**：Tailwind CSS v4（主题变量在 `app/globals.css`）
- **组件**：shadcn/ui（new-york 风格）+ Radix + lucide 图标
- **内容**：本地 MDX（`content/posts/`），`next-mdx-remote` + gray-matter，自动计算阅读时长、目录、标签与分类
- **其他**：next-themes 暗色模式、Motion 动效、RSS、Sitemap、robots

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器 http://localhost:3000
npm run build      # 生产构建
npm run start      # 运行生产构建
npm run lint       # ESLint 检查
npm run typecheck  # TypeScript 类型检查
```

要求 Node.js ≥ 18（本机使用 Node 24）。

## 写文章

在 `content/posts/` 下新建 `.md` 或 `.mdx` 文件，文件名即文章 URL（slug）。文件顶部用 frontmatter 描述元信息：

```mdx
---
title: "文章标题"
description: "一句话摘要，用于列表与 SEO"
date: "2026-06-01"
updated: "2026-06-02"      # 可选
category: "计算机视觉"
tags: ["目标检测", "DETR"]
author: "DeepFrame Team"   # 可选，缺省用默认作者
featured: true             # 可选，true 时进首页精选
draft: false               # 可选，true 时不发布
---

正文用 Markdown / MDX 编写……
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并按需填写：

| 变量 | 说明 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 站点公开地址，用于生成 RSS / sitemap / Open Graph 的绝对链接。本地可留空（默认 `http://localhost:3000`）。 |

## 部署到 Vercel

本项目是独立 git 仓库，推荐用 Vercel 部署：

1. 在 GitHub 新建空仓库，然后推送：
   ```bash
   git remote add origin git@github.com:<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录并导入该仓库。Vercel 会自动识别为 Next.js 项目，无需额外配置。
3. 在 Vercel 项目的 **Settings → Environment Variables** 添加 `NEXT_PUBLIC_SITE_URL`，值为 Vercel 分配的地址（如 `https://<项目名>.vercel.app`）。
4. 重新部署，使 RSS / sitemap / OG 链接使用正确域名。

之后每次 `git push` 到 `main` 都会自动触发部署。

## 目录结构

```
app/            页面与路由（首页、/blog、/tags、/categories、/search、/about、RSS、sitemap、robots）
components/     UI 组件（含 components/ui 下的 shadcn 原语）
content/posts/  MDX 文章
lib/            站点配置（site.ts）、文章加载（posts.ts）、元数据（metadata.ts）
public/         静态资源
```
