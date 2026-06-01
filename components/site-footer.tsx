import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              DF
            </span>
            <span className="font-semibold">{siteConfig.name}</span>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            专注 AI、计算机视觉与多模态技术的技术博客，记录研究思考、项目复盘与工程实践经验。
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-x-5 gap-y-3 text-sm text-muted-foreground lg:justify-end">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/rss.xml" className="hover:text-foreground">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
