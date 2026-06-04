# 飞书画板 + MDX 富文本文章系统重构 — 设计规范

- 日期: 2026-06-02
- 范围: 仅重构「文章内容渲染」与「文章详情页阅读体验」
- 第一优先级: **展示美观度**

## 1. 背景与问题

DeepFrame Lab 博客的 4 篇文章由飞书知识库经
`lark-cli docs +fetch --doc-format markdown` 导入。Markdown 导出造成三个问题:

1. 飞书**画板(画板,架构/流程/对比示意图)** 被降级为文字占位
   (`> 原飞书文档此处包含画板…`),约 10 个,集中在两篇 PEFT 长文。
2. 飞书 **callout 等富块**被降级为引用块。
3. 正文呈**扁平 Markdown**,12 个已注册的富组件**实际使用 0 次**。

结果:文章页观感"原始",与飞书云文档展示不一致,图示缺失。

现状已建好约 85% 的渲染系统:文章页布局、单一 H1(frontmatter)、sticky 目录、
移动端目录、阅读进度条、元素样式覆盖、12 个富组件已注册但未使用。

## 2. 最高准则

**展示美观度 > 机械转换。** 不允许只把飞书内容机械转成 MDX。
文章详情页必须接近"精心设计过的飞书云文档 + 企业技术博客 + 技术白皮书":
第一眼不像普通 Markdown,信息展示有丰富层次。首页可克制,文章详情页必须丰富。
重点不是炫技,而是让长文更易读、更高级、更像正式发布内容。

## 3. 范围约束(保留承诺)

- 保留:文章列表 / 标签 / 分类 / 搜索 / RSS / Sitemap / SEO meta /
  上一篇下一篇 / 暗色模式 / 移动端适配 / 所有现有路由。
- 不重做整个项目;保留 MDX 系统,**不改成硬编码 HTML**。

## 4. 关键决策(已与用户确认)

| 决策 | 选择 |
|---|---|
| 画板处理 | 用 `lark-cli` 重新拉取并导出为图片(高清 PNG;SVG 若可得优先),失败兜底 `MissingDiagram` |
| 内容富化 | 脚本自动映射**打底** + 人工**精修**;精修后 MDX 即「活动内容源」 |
| 美观度 | 第一优先级:每篇长文须视觉重排、内容分块、组件化呈现 |

## 5. 资源与目录规范

- `public/images/posts/[slug]/` — PNG / JPG / WebP(位图、照片、画板 PNG 导出)
- `public/diagrams/posts/[slug]/` — SVG / PDF(矢量图示)
- 命名: `diagram-NN-<short-slug>.png`,`NN` 为文内顺序编号
- MDX 中**禁止裸 `![]()`**;统一用 `<Figure>` / `<Diagram>` / `<Gallery>`
- `lib/posts.ts` 增加 `postDiagram(slug, file)` 与文件存在性检查(镜像现有 `postImage`)

## 6. 组件设计

### 6.1 新增 `Diagram`(技术图卡片)
Props: `src`, `title`, `caption`, `number?`(可自动编号), `type: "png" | "svg" | "pdf"`,
`allowZoom`(默认 `true`), `bordered`(默认 `true`), `darkModeInvert`(默认 `false`)。

样式: 轻边框、柔和背景、充足留白、标题 + 编号 + caption、点击放大(Radix Dialog 灯箱)、
移动端自适应、长图保清晰度。服务端检测文件是否存在 → 缺失渲染 `MissingDiagram`;
图片尺寸服务端解析避免 CLS;缩放交互为客户端子组件。`type:"pdf"` 渲染预览/链接。

### 6.2 新增 `MissingDiagram`
美观占位:显示图示标题 + 预期路径 + 友好说明;不破坏布局;暗色适配。
(升级/取代现有 `feishu-placeholder`。)

### 6.3 复用并强化现有 12 组件
`Callout` / `Figure` / `Gallery` / `QuoteBlock` / `KeyTakeaways` / `StepList` /
`CompareGrid` / `InfoCard` / `SectionLead` / `ResourceLink` / `HighlightBox` / `DataTable`
—— 全部暗色适配、统一低饱和设计系统配色。

## 7. 内容富化规则(每篇 PEFT 长文 ≥ 6 类富组件)

- 开篇: TL;DR + 适合读者 + 你将学到(已有卡片),视情况加 `KeyTakeaways`
- 章节: `SectionLead` 导语
- 重点概念 / 警告 / 总结: `Callout` / `HighlightBox`
- 方法对比(LoRA vs QLoRA 等): `CompareGrid` / `DataTable`
- 流程 / 步骤(数学推导、LLaMA-Factory 全流程): `StepList`
- 画板: `Diagram` 卡片,**前后必须有解释性文字**,不能孤立插图
- 参考资料: `ResourceLink`
- **视觉节奏: 每 3–5 段出现一次视觉变化**(提示块/图示/对比/表格/引用/步骤/小结)

## 8. 视觉系统

- 低饱和浅色块: 浅蓝 / 绿 / 黄 / 红 / 紫 / 暖灰,克制、统一、设计系统化
  (集中在 `globals.css` 设计 token + 组件)
- 禁: 霓虹色、大面积渐变、玻璃拟态、强阴影、AI SaaS 风
- 字体: 中文系统字体;拉丁 Geist / system-ui;代码 JetBrains Mono
- 暗色: 所有块 / 卡 / 代码 / 表 / 图卡重新适配,**非简单反色**
- 排版: 清晰标题层级、舒适段宽(~68ch)、适合中文长文的行距与段距

## 9. 画板导出管线

1. `lark-cli` 重新拉取 4 篇 docx(保留 `<whiteboard token>` 与媒体 token)
2. `lark-whiteboard` 导出每个画板为高清 PNG → `public/images/posts/[slug]/`
3. 嵌入位图(若有)→ `docs:document.media:download` 下载到同目录
4. 升级 `scripts/import-feishu-posts.mjs`: `callout`→`<Callout>`、
   `whiteboard`→`<Diagram>`、保留代码/表/公式、合并扩展 frontmatter
5. **先验证单个画板导出可行性,再批量**;失败用 `MissingDiagram` 兜底

## 10. 交付物

- 《飞书画板迁移规范》`docs/feishu-diagram-migration.md`:导出后放哪个目录、
  如何在 MDX 用 `<Diagram>` 引用
- 最终报告: 改动文件清单、文章新写法、图片/图示资源规范、组件使用示例、
  浏览器测试结果 + **每篇长文所用富组件清单**

## 11. 验收标准

- 打开 2 篇 PEFT 长文,**第一眼不像普通 Markdown**
- 可见多种内容块、图示卡片、重点结论块、对比展示
- 画板导出图清晰、美观、可放大
- 移动端不拥挤,图示不溢出
- 暗色模式不降低可读性
- `build` / `typecheck` / `lint` 通过;SEO title·description·/rss.xml·/sitemap.xml 未损坏
- Playwright 检查说明或截图佐证

## 12. 风险与兜底

- **最大风险: 飞书画板导出的实际可用性** → 第一步先验证单个画板;
  成功批量,失败用 `MissingDiagram`(显示标题 + 预期路径)
- `user` token `needs_refresh` → 首次调用自动刷新;失败则请用户运行
  `! lark-cli auth login`
- 重跑 import 脚本会覆盖手工精修 → 迁移规范注明「精修后 MDX 为活动内容源」
