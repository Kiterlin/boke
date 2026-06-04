import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const postsDir = join(process.cwd(), "content/posts");
const publicImagesDir = join(process.cwd(), "public/images/posts");
const exportWhiteboards =
  process.env.FEISHU_EXPORT_WHITEBOARDS !== "0" &&
  process.env.FEISHU_EXPORT_WHITEBOARDS !== "false";

const posts = [
  {
    token: "BLx4d56sDonHPlxkN9ScU6PCnDd",
    slug: "harness-engineering-agent-work-environment",
    title:
      "Harness 工程深入解读：当模型是函数、Agent 是新员工，你该给它配什么样的工作环境",
    description:
      "从模型是无状态概率函数这一第一性原理出发，解释 Agent 漂移、Harness 工程五件套、AGENTS.md 分层和 Linter 反馈环路。",
    date: "2026-06-01",
    category: "Agent 工程",
    tags: ["Agent", "Harness", "上下文工程", "工程实践"],
    author: "Feishu Knowledge Base",
    featured: true
  },
  {
    token: "QsX5do8TDoM9bYxCQdtcW4ILn1c",
    slug: "peft-from-basics-to-practice",
    title: "PEFT 入门到实战",
    description:
      "面向参数高效微调的系统学习手册，覆盖 LoRA、P-Tuning、QLoRA、IA3、peft 库和 LLaMA-Factory 实战。",
    date: "2026-05-31",
    category: "学习文档",
    tags: ["PEFT", "LoRA", "QLoRA", "微调", "学习笔记"],
    author: "Feishu Knowledge Base",
    featured: true,
    tldr:
      "一份从微调基础到 PEFT 实操的系统手册，覆盖 Transformer 前置知识、LoRA/P-Tuning/QLoRA/IA3、peft 库和 LLaMA-Factory 训练流程。",
    audience: [
      "刚开始系统学习大模型微调和 PEFT 的读者",
      "需要按章节搭建 LoRA、QLoRA 实验环境的工程师"
    ],
    takeaways: [
      "理解为什么全量微调在大模型时代成本过高",
      "区分 LoRA、P-Tuning、QLoRA 和 IA3 的适用场景",
      "跑通 peft 与 LLaMA-Factory 的基础训练、保存和推理流程"
    ],
    diagrams: [
      {
        file: "diagram-01-lora-bypass-structure.png",
        title: "LoRA 旁路结构与冻结权重",
        caption:
          "原始线性层保持冻结，LoRA 只训练低秩旁路 A/B；推理时可把旁路合并回主权重。"
      },
      {
        file: "diagram-02-ptuning-v1-vs-v2.png",
        title: "P-Tuning v1 与 v2 的提示插入位置",
        caption:
          "v1 主要在输入端学习连续提示，v2 将深度提示注入多层 Transformer，稳定性和表达力更强。"
      },
      {
        file: "diagram-03-memory-ledger-7b.png",
        title: "7B 模型全量微调与 PEFT 的显存账本",
        caption:
          "冻结主干参数后，梯度和 Adam 状态不再为全部权重维护，显存压力从集群级降到单卡级。"
      },
      {
        file: "diagram-04-llama-factory-pipeline.png",
        title: "LLaMA-Factory 从数据到导出的训练流水线",
        caption:
          "把数据格式、数据集注册、训练配置、评估和导出串成可复用的工程流程。"
      }
    ]
  },
  {
    token: "WXbDdw6Uiov9JgxUwg4c37MsnBh",
    slug: "peft-advanced-practical-handbook",
    title: "PEFT 进阶实战手册",
    description:
      "围绕 PEFT 工程实战和面试准备，深入拆解 LoRA、QLoRA、P-Tuning、LLaMA-Factory、多 LoRA 推理与训练排错。",
    date: "2026-05-30",
    category: "学习文档",
    tags: ["PEFT", "LoRA", "面试准备", "工程实践"],
    author: "Feishu Knowledge Base",
    tldr:
      "面向 PEFT 工程实战和面试复盘，集中拆解 LoRA、QLoRA、P-Tuning、LLaMA-Factory、多 LoRA 推理和常见训练排错。",
    audience: [
      "已经了解大模型微调基础、想补工程细节的读者",
      "准备围绕 PEFT、LoRA 和训练排错展开技术面试的人"
    ],
    takeaways: [
      "从数学、代码和 peft API 三层理解 LoRA",
      "掌握 QLoRA、P-Tuning 和多 LoRA 推理的工程取舍",
      "形成训练配置、评估和排错的实战清单"
    ],
    diagrams: [
      {
        file: "diagram-01-memory-ledger-peft.png",
        title: "PEFT 显存账本拆解",
        caption:
          "PEFT 的核心节省来自冻结参数不保存梯度和优化器状态，而不是让基座权重消失。"
      },
      {
        file: "diagram-02-lora-forward-gradient.png",
        title: "LoRA 前向与梯度路径",
        caption:
          "B=0 初始化让模型从原始行为起步，训练早期先更新 B，再逐步激活 A 的梯度。"
      },
      {
        file: "diagram-03-lora-variants-family.png",
        title: "LoRA 变体家族与适用边界",
        caption:
          "rsLoRA、DoRA、LoRA+ 等变体分别处理大 rank 稳定性、幅度/方向解耦和优化器配置问题。"
      },
      {
        file: "diagram-04-int4-vs-nf4.png",
        title: "INT4 与 NF4 量化桶对比",
        caption:
          "NF4 为正态分布权重设计非均匀量化桶，比线性 INT4 更贴合大模型权重分布。"
      },
      {
        file: "diagram-05-qlora-joint-mechanism.png",
        title: "QLoRA 的冻结量化权重与 LoRA 训练旁路",
        caption:
          "基座权重以 4-bit 形式常驻显存，反向传播只更新 LoRA 旁路，从而兼顾显存和效果。"
      }
    ]
  },
  {
    token: "KiYydrtvIoKBTnxHnhwcDfuNnqf",
    slug: "mcp-model-context-protocol-interview-questions",
    title: "MCP 模型上下文协议高频面试题",
    description:
      "整理 MCP 高频面试题与典型回答，覆盖 MCP、Function Calling、CLI、Skill、安全机制和 Agent 工具编排。",
    date: "2026-05-29",
    category: "面试题",
    tags: ["MCP", "Agent", "面试题", "工具协议"],
    author: "Feishu Knowledge Base",
    featured: true
  }
];

function fetchDoc(token) {
  const stdout = execFileSync(
    "lark-cli",
    [
      "docs",
      "+fetch",
      "--api-version",
      "v2",
      "--doc",
      token,
      "--doc-format",
      "markdown",
      "--format",
      "json"
    ],
    {
      encoding: "utf8",
      maxBuffer: 80 * 1024 * 1024
    }
  );

  const start = stdout.indexOf("{");
  const end = stdout.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error(`lark-cli did not return JSON for ${token}`);
  }

  const payload = JSON.parse(stdout.slice(start, end + 1));
  if (!payload.ok) {
    throw new Error(`lark-cli returned an error for ${token}`);
  }

  return payload.data.document.content;
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function stripEmoji(value) {
  return value.replace(/[\u{1f300}-\u{1faff}\u{2600}-\u{27bf}]/gu, "");
}

function escapeMdxText(line) {
  return line
    .split(/(\$[^$\n]+\$)/g)
    .map((part) => {
      if (part.startsWith("$") && part.endsWith("$")) return part;
      return part
        .replace(/\{/g, "&#123;")
        .replace(/\}/g, "&#125;")
        .replace(/<(?!br\s*\/?>)(?=[A-Za-z0-9/])/g, "&lt;");
    })
    .join("");
}

function parseAttrs(attrs = "") {
  const out = {};
  attrs.replace(/([\w:-]+)=["']([^"']*)["']/g, (_match, key, value) => {
    out[key] = value;
    return "";
  });
  return out;
}

function normalizeCalloutVariant(type = "") {
  const normalized = type.toLowerCase();
  if (["warning", "warn", "alert"].includes(normalized)) return "warning";
  if (["danger", "error"].includes(normalized)) return "danger";
  if (["tip", "tips"].includes(normalized)) return "tip";
  if (["success", "check"].includes(normalized)) return "check";
  if (normalized === "summary") return "summary";
  return "note";
}

function escapeMdxBlock(content) {
  const lines = content.trim().split("\n");
  let fenced = false;
  let mathBlock = false;

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        fenced = !fenced;
        return line;
      }

      if (!fenced && trimmed.startsWith("$$")) {
        mathBlock = !mathBlock;
        return line;
      }

      if (fenced || mathBlock) return line;
      return escapeMdxText(line);
    })
    .join("\n");
}

function exportWhiteboardImage(token, outputPath) {
  if (!exportWhiteboards || !token || existsSync(outputPath)) return false;

  try {
    execFileSync(
      "lark-cli",
      [
        "whiteboard",
        "+query",
        "--whiteboard-token",
        token,
        "--output_as",
        "image",
        "--output",
        outputPath,
        "--overwrite"
      ],
      {
        encoding: "utf8",
        maxBuffer: 40 * 1024 * 1024
      }
    );
    return existsSync(outputPath);
  } catch (error) {
    console.warn(
      `[whiteboard] export failed for ${token}; MDX will use MissingDiagram fallback.`
    );
    if (error?.stderr) console.warn(String(error.stderr).slice(0, 500));
    return false;
  }
}

function diagramFor(post, index) {
  return (
    post.diagrams?.[index] || {
      file: `diagram-${String(index + 1).padStart(2, "0")}-feishu-whiteboard.png`,
      title: `Feishu whiteboard ${index + 1}`,
      caption: "原飞书文档中的画板导出图。"
    }
  );
}

function whiteboardBlock(post, attrs, index) {
  const diagram = diagramFor(post, index);
  const token = attrs.token || attrs.whiteboard_token || attrs.block_token || "";
  const imageDir = join(publicImagesDir, post.slug);
  const outputPath = join(imageDir, diagram.file);
  mkdirSync(imageDir, { recursive: true });

  const exported = exportWhiteboardImage(token, outputPath);
  if (exported || existsSync(outputPath)) {
    return `\n<Diagram number={${index + 1}} src="${diagram.file}" title="${diagram.title}" caption="${diagram.caption}" />\n`;
  }

  return `\n<MissingDiagram number={${index + 1}} title="${diagram.title}" expectedPath="/images/posts/${post.slug}/${diagram.file}" caption="${diagram.caption}" />\n`;
}

function normalizeMarkdown(content, post) {
  const mdxBlocks = [];
  const protect = (value) => {
    const key = `\u0000MDX_BLOCK_${mdxBlocks.length}\u0000`;
    mdxBlocks.push(value);
    return key;
  };
  let whiteboardIndex = 0;

  let next = content
    .replace(/<title>[\s\S]*?<\/title>\n*/g, "")
    .replace(/<whiteboard\b([^>]*)\/>/g, (_match, attrs) =>
      protect(whiteboardBlock(post, parseAttrs(attrs), whiteboardIndex++))
    )
    .replace(/<whiteboard\b([^>]*)><\/whiteboard>/g, (_match, attrs) =>
      protect(whiteboardBlock(post, parseAttrs(attrs), whiteboardIndex++))
    )
    .replace(/<\/?(grid|column)(?:\s[^>]*)?>/g, "")
    .replace(/<callout\b([^>]*)>([\s\S]*?)<\/callout>/g, (_match, attrs, body) => {
      const parsed = parseAttrs(attrs);
      const variant = normalizeCalloutVariant(parsed.type || parsed.variant);
      const title = parsed.title ? ` title="${parsed.title}"` : "";
      return protect(
        `\n<Callout variant="${variant}"${title}>\n\n${escapeMdxBlock(body)}\n\n</Callout>\n`
      );
    })
    .replace(/\\\*\\\*/g, "**")
    .replace(/\\\*/g, "*");

  next = stripEmoji(next);

  const lines = next.split("\n");
  let fenced = false;
  let mathBlock = false;

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        fenced = !fenced;
        return line;
      }

      if (!fenced && trimmed.startsWith("$$")) {
        mathBlock = !mathBlock;
        return line;
      }

      if (fenced || mathBlock) return line;

      return escapeMdxText(line);
    })
    .join("\n")
    .replace(/\u0000MDX_BLOCK_(\d+)\u0000/g, (_match, index) => mdxBlocks[Number(index)])
    .replace(/<(?=[0-9])/g, "&lt;")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function frontmatter(post) {
  const lines = [
    "---",
    `title: ${yamlString(post.title)}`,
    `description: ${yamlString(post.description)}`,
    `date: ${yamlString(post.date)}`,
    `category: ${yamlString(post.category)}`,
    `tags: [${post.tags.map(yamlString).join(", ")}]`,
    `author: ${yamlString(post.author)}`
  ];

  if (post.featured) lines.push("featured: true");
  if (post.tldr) lines.push(`tldr: ${yamlString(post.tldr)}`);
  if (post.audience?.length) {
    lines.push("audience:");
    post.audience.forEach((item) => lines.push(`  - ${yamlString(item)}`));
  }
  if (post.takeaways?.length) {
    lines.push("takeaways:");
    post.takeaways.forEach((item) => lines.push(`  - ${yamlString(item)}`));
  }
  lines.push("---", "");
  return lines.join("\n");
}

for (const post of posts) {
  const raw = fetchDoc(post.token);
  const body = normalizeMarkdown(raw, post);
  writeFileSync(join(postsDir, `${post.slug}.mdx`), `${frontmatter(post)}${body}\n`);
}

for (const slug of [
  "dark-mode-as-product-quality",
  "designing-premium-reading-experience",
  "mdx-content-workflow",
  "operating-system-for-team-writing",
  "seo-basics-for-expert-blogs"
]) {
  rmSync(join(postsDir, `${slug}.mdx`), { force: true });
}
