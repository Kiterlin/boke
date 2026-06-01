import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const postsDir = join(process.cwd(), "content/posts");

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
    featured: true
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
    author: "Feishu Knowledge Base"
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

function quoteBlock(content) {
  return content
    .trim()
    .split("\n")
    .map((line) => (line.trim() ? `> ${line}` : ">"))
    .join("\n");
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

function normalizeMarkdown(content) {
  let next = content
    .replace(/<title>[\s\S]*?<\/title>\n*/g, "")
    .replace(/<whiteboard[^>]*><\/whiteboard>/g, "> 原飞书文档此处包含画板，文章版保留文字说明。")
    .replace(/<\/?(grid|column)(?:\s[^>]*)?>/g, "")
    .replace(/<callout[^>]*>([\s\S]*?)<\/callout>/g, (_match, body) => quoteBlock(body))
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
  lines.push("---", "");
  return lines.join("\n");
}

for (const post of posts) {
  const raw = fetchDoc(post.token);
  const body = normalizeMarkdown(raw);
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
