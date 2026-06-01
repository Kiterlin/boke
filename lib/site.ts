export const siteConfig = {
  name: "DeepFrame Lab",
  title: "DeepFrame Lab · 探索 AI 时代的技术、研究与工程实践",
  description:
    "一个专注于 AI、计算机视觉、多模态技术与工程实践的技术博客，记录研究思考、项目复盘与高质量开发经验。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "DeepFrame Team",
  nav: [
    { href: "/", label: "首页" },
    { href: "/blog", label: "文章" },
    { href: "/papers", label: "论文" },
    { href: "/projects", label: "项目" },
    { href: "/tags", label: "标签" },
    { href: "/categories", label: "分类" },
    { href: "/about", label: "关于" },
    { href: "/search", label: "搜索" }
  ]
};
