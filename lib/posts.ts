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
};

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
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const text = match[2].replace(/[#`*_]/g, "").trim();
      return {
        id: slugify(text),
        text,
        level: match[1].length
      };
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

  return {
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || plainText.slice(0, 156),
    date: frontmatter.date || new Date().toISOString(),
    updated: frontmatter.updated,
    category: frontmatter.category || "未分类",
    tags: frontmatter.tags || [],
    author: frontmatter.author || "DeepFrame Team",
    featured: frontmatter.featured,
    draft: frontmatter.draft,
    readingTime: `${Math.max(1, Math.ceil(stats.minutes))} 分钟阅读`,
    words: stats.words,
    excerpt: plainText.slice(0, 180),
    content,
    toc: extractToc(content)
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
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getAllCategories() {
  const counts = new Map<string, number>();
  getAllPosts().forEach((post) => {
    counts.set(post.category, (counts.get(post.category) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
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
