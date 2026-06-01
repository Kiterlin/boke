# 论文与项目展示 — 设计文档

- 日期：2026-06-01
- 状态：设计已确认，待实现
- 所属：DeepFrame Lab 博客

## 目标

在博客新增「研究 / 论文」与「项目」两个板块，展示作者的学术论文与工程项目，均含**列表页 + 详情页**。

- 论文：**LH-DETR**（ICRA 2026，CCF-B，已录用）、**MARSNet**（Information Fusion，SCI 一区，投稿中）
- 项目：**领克车型任务型 LLM 对话系统**、**电力信息安全辅助培训问答系统**（上海电网省级项目）

## 信息架构与路由

| 路由 | 说明 |
|---|---|
| `/research` | 论文列表（富卡片）|
| `/research/[slug]` | 论文详情（摘要、配图、BibTeX、下载）|
| `/projects` | 项目列表（富卡片）|
| `/projects/[slug]` | 项目详情（背景/方案/职责/成果）|

顶部导航（`lib/site.ts` 的 `nav`）新增「研究」「项目」。

## 语言约定（中英混合）

- 论文官方标题、会议名、方法名、技术术语：保留英文
- 摘要、贡献、项目说明：中文叙述
- 关键名词首次出现时中英对照

## 数据模型（沿用 MDX + gray-matter，与 `content/posts` 同构）

### `content/research/*.mdx` frontmatter

```yaml
title:        # 英文论文标题
titleZh:      # 可选中文译名
venue:        # "ICRA 2026" / "Information Fusion"
venueRank:    # "CCF-B" / "SCI 一区"
status:       # "已录用" / "投稿中"
year:         # 2026
authors: []
abstract:     # 中文摘要
contributions: []   # 中文要点
tags: []
links: { pdf, poster, code, doi }
cover:        # 缩略图
figures: [{ src, caption }]
bibtex:       # 引用
featured: true
date:
```

正文（MDX）：方法与亮点的中文叙述。

### `content/projects/*.mdx` frontmatter

```yaml
title:
role:         # "核心开发"
org:          # 可选，如 "上海电网省级项目"
period:       # "2025.09 – 2025.12"
summary:      # 一句话
stack: []     # 技术栈
highlights: []   # 量化亮点，如 "日均 10w+ 指令"
outcomes: []     # 成果，可选
links: []
cover:
featured: true
date:
```

正文（MDX）：背景 / 方案 / 我的职责 / 成果。

## 加载器与组件

- `lib/research.ts`、`lib/projects.ts`：仿 `lib/posts.ts`，提供 `getAll* / get*BySlug`，复用 `slugify` 与 `metadata.ts`
- `components/paper-card.tsx`、`components/project-card.tsx`：仿 `article-card.tsx`
- 详情页复用 `prose-content` 样式与 `FadeIn` 动效；论文详情含 figures 画廊、BibTeX 复制、下载按钮；项目详情含 highlights、stack 标签

## 内容来源

| 项 | 来源 |
|---|---|
| LH-DETR | `F:\A原桌面\slp\论文\ICRA`（ICRA.pdf / poster / 技术分享 docx）|
| MARSNet | `~/my-projects/Scientific_paper_writing/IF`（英文 main.tex + 图 PDF + myrefs.bib）|
| 项目 | 简历 `resume_template_zh.tex`（已读）+ 飞书 wiki（lark-wiki，space `7641404629615512757`）|

## 资产管线

- 论文 PDF / poster 拷到 `public/papers/<slug>/`
- 关键图（架构图、定性结果）PDF→PNG，放 `public/papers/<slug>/figs/`
- 无封面的项目用渐变卡占位

## 文件清单

- **新增**：`lib/research.ts`、`lib/projects.ts`、`content/research/*.mdx`、`content/projects/*.mdx`、`app/research/{page,[slug]/page}.tsx`、`app/projects/{page,[slug]/page}.tsx`、`components/paper-card.tsx`、`components/project-card.tsx`、`public/papers/**`
- **修改**：`lib/site.ts`（nav）

## 非目标（本节不做）

- 替换/清理原有 5 篇示例博客文章（单独处理）
- `package.json` 版本锁定、删除 `.eslintrc.json`（配置隐患，用户暂未选）
- Vercel 部署（已就绪，待用户操作）
