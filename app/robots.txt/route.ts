import { siteConfig } from "@/lib/site";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
`, {
    headers: {
      "content-type": "text/plain"
    }
  });
}
