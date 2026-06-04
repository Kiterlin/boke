import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { slugify } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author: string;
  featured?: boolean;
  draft?: boolean;
  tldr: string;
  audience: string[];
  takeaways: string[];
  readingTime: string;
  words: number;
  excerpt: string;
  content: string;
  toc: TocItem[];
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  updated?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  draft?: boolean;
  tldr?: string;
  audience?: string[];
  takeaways?: string[];
};

export type TaxonomyItem = {
  name: string;
  slug: string;
  count: number;
  description: string;
};

const defaultAuthor = "Sun Lupeng · DeepFrame Lab";

const tagDescriptions: Record<string, string> = {
  Agent: "围绕智能体工作流、工具调用、上下文约束和长任务执行稳定性的工程笔记。",
  Harness: "把模型放进可控工作环境的方法，包括规则、反馈、状态与工具边界。",
  上下文工程: "关注信息如何进入、排序、压缩和保留在模型上下文中，减少任务漂移。",
  工程实践: "从真实项目或可复现实验中提炼出的架构、调试、部署和性能经验。",
  MCP: "围绕 Model Context Protocol 的概念、工具协议、面试题和工程接入方式。",
  工具协议: "把外部服务抽象成可调用工具的接口设计、路由和治理方法。",
  面试题: "将技术体系拆成高频问题、回答框架和可追问细节，服务系统化复习。",
  PEFT: "参数高效微调的理论、方法谱系、工程配置和常见排错路径。",
  LoRA: "聚焦低秩适配、QLoRA、多适配器推理和微调参数选择。",
  QLoRA: "关注 4-bit 量化、NF4、双重量化、分页优化器与低显存训练。",
  微调: "从数据准备、训练配置到评估部署的大模型适配流程。",
  学习笔记: "偏体系化整理的长文资料，适合建立概念地图和复习索引。",
  面试准备: "面向技术面试的知识整理，强调原理表达、工程取舍和追问边界。"
};

const categoryDescriptions: Record<string, string> = {
  "Agent 工程": "智能体系统的工作环境、工具编排、上下文管理和长任务可靠性。",
  学习文档: "体系化学习材料和实战手册，适合按章节阅读、复习和反查。",
  面试题: "将协议、模型和工程知识拆成问答结构，帮助建立可表达的知识框架。"
};

function fallbackTakeaways(post: {
  title: string;
  category: string;
  tags: string[];
  toc: TocItem[];
}) {
  const headingTakeaways = post.toc
    .filter((item) => item.level === 2)
    .slice(0, 3)
    .map((item) => item.text.replace(/^\d+[\s.、-]*/, ""));

  if (headingTakeaways.length >= 2) {
    return headingTakeaways;
  }

  return [
    `理解 ${post.title} 的核心问题与适用边界`,
    `把 ${post.category} 相关概念整理成可复用的判断框架`,
    `结合 ${post.tags.slice(0, 2).join("、") || "主题"} 场景形成实践清单`
  ];
}

function fallbackAudience(post: {
  category: string;
  tags: string[];
}) {
  if (post.tags.includes("面试题") || post.tags.includes("面试准备")) {
    return ["准备 AI/LLM 工程面试的读者", "需要把概念讲清楚的工程师"];
  }

  if (post.tags.includes("PEFT") || post.tags.includes("LoRA")) {
    return ["正在做大模型微调的工程师", "需要系统复习 PEFT 方法的研究或开发者"];
  }

  if (post.category === "Agent 工程") {
    return ["正在搭建 Agent 工作流的工程师", "关注长任务稳定性和上下文治理的团队"];
  }

  return ["希望快速建立主题地图的读者", "需要从文章中提炼实践清单的工程师"];
}

function taxonomyDescription(
  name: string,
  descriptions: Record<string, string>,
  fallback: string
) {
  return descriptions[name] || fallback;
}

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .sort();
}

function stripMdx(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#>*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractToc(content: string): TocItem[] {
  const seen = new Map<string, number>();
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const text = match[2].replace(/[#`*_]/g, "").trim();
      let id = slugify(text);
      // Deduplicate: if slug is already used, append -1, -2, etc.
      const count = seen.get(id) || 0;
      if (count > 0) id = `${id}-${count}`;
      seen.set(slugify(text), count + 1);
      return { id, text, level: match[1].length };
    })
    .filter(Boolean) as TocItem[];
}

function normalizePost(fileName: string): Post {
  const slug = fileName.replace(/\.(md|mdx)$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as Frontmatter;
  const plainText = stripMdx(content);
  const stats = readingTime(plainText);
  const toc = extractToc(content);
  const category = frontmatter.category || "未分类";
  const tags = frontmatter.tags || [];
  const title = frontmatter.title || slug;
  const description = frontmatter.description || plainText.slice(0, 156);

  return {
    slug,
    title,
    description,
    date: frontmatter.date || new Date().toISOString(),
    updated: frontmatter.updated,
    category,
    tags,
    author: frontmatter.author || defaultAuthor,
    featured: frontmatter.featured,
    draft: frontmatter.draft,
    tldr: frontmatter.tldr || description,
    audience:
      frontmatter.audience && frontmatter.audience.length
        ? frontmatter.audience
        : fallbackAudience({ category, tags }),
    takeaways:
      frontmatter.takeaways && frontmatter.takeaways.length
        ? frontmatter.takeaways
        : fallbackTakeaways({ title, category, tags, toc }),
    readingTime: `${Math.max(1, Math.ceil(stats.minutes))} 分钟阅读`,
    words: stats.words,
    excerpt: plainText.slice(0, 180),
    content,
    toc
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  return ensurePostsDirectory()
    .map(normalizePost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured).slice(0, 3);
}

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: false }).find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined
  };
}

export function getAllTags() {
  const counts = new Map<string, number>();
  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
      description: taxonomyDescription(
        name,
        tagDescriptions,
        "与该主题相关的文章集合，用来串联概念、案例和实践路径。"
      )
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getAllCategories() {
  const counts = new Map<string, number>();
  getAllPosts().forEach((post) => {
    counts.set(post.category, (counts.get(post.category) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
      description: taxonomyDescription(
        name,
        categoryDescriptions,
        "按内容类型组织的文章集合，方便从相近问题进入阅读。"
      )
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTag(slug: string) {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugify(tag) === decodeURIComponent(slug))
  );
}

export function getPostsByCategory(slug: string) {
  return getAllPosts().filter(
    (post) => slugify(post.category) === decodeURIComponent(slug)
  );
}

/**
 * Resolve a post image path (raster: PNG / JPG / WebP / GIF).
 * Always returns a static path like /images/posts/[slug]/filename.
 * A bare filename is resolved against the post's image directory; an
 * absolute path (starting with "/") is returned unchanged.
 */
export function postImage(slug: string, filename: string): string {
  if (filename.startsWith("/")) return filename;
  return `/images/posts/${slug}/${filename}`;
}

/**
 * Resolve a post diagram path. Vector assets (SVG / PDF) live under
 * /diagrams/posts/[slug]/, raster exports under /images/posts/[slug]/.
 * Mirrors `postImage` so MDX authors can reference a bare filename and
 * the resource directory is chosen automatically by extension.
 */
export function postDiagram(slug: string, filename: string): string {
  if (filename.startsWith("/")) return filename;
  const dir = /\.(svg|pdf)$/i.test(filename) ? "diagrams" : "images";
  return `/${dir}/posts/${slug}/${filename}`;
}

/**
 * Check whether a file under /public exists on disk (server-only).
 * Accepts a public-relative path such as "/images/posts/slug/x.png".
 * Returns false when missing so callers can render a placeholder.
 */
export function publicFileExists(publicPath: string): boolean {
  const target = path.join(
    process.cwd(),
    "public",
    publicPath.replace(/^\/+/, "")
  );
  return fs.existsSync(target);
}

/** Back-compat: existence check for a post image by bare filename. */
export function postImageExists(slug: string, filename: string): boolean {
  return publicFileExists(postImage(slug, filename));
}

/**
 * Read intrinsic pixel dimensions of a PNG or JPEG under /public, parsing
 * the file header directly (no image library) so server components can set
 * width/height up front and avoid layout shift. Returns null if the file is
 * missing or the format isn't understood (e.g. SVG).
 */
export function getImageSize(
  publicPath: string
): { width: number; height: number } | null {
  const target = path.join(
    process.cwd(),
    "public",
    publicPath.replace(/^\/+/, "")
  );
  if (!fs.existsSync(target)) return null;

  let buf: Buffer;
  try {
    const fd = fs.openSync(target, "r");
    buf = Buffer.alloc(65536);
    const bytes = fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, bytes);
  } catch {
    return null;
  }

  // PNG: signature then IHDR with width/height as BE uint32 at offsets 16/20.
  if (buf.length >= 24 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk segment markers to the Start-Of-Frame (SOFn).
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) {
        off += 1;
        continue;
      }
      const marker = buf[off + 1];
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSOF) {
        return {
          height: buf.readUInt16BE(off + 5),
          width: buf.readUInt16BE(off + 7),
        };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }

  return null;
}
