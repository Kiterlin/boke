import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { escapeXml } from "@/lib/utils";

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <description>${escapeXml(post.description)}</description>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <category>${escapeXml(post.category)}</category>
</item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.title)}</title>
  <description>${escapeXml(siteConfig.description)}</description>
  <link>${siteConfig.url}</link>
  <language>zh-CN</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
