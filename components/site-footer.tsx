import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const footerNav = siteConfig.nav.filter((item) => item.href !== "/");

  return (
    <footer className="border-t border-border/70 bg-secondary/28">
      <div className="editorial-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-border/70 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="editorial-kicker">Research archive · 2026</p>
            <h2 className="section-title mt-5 max-w-xl text-3xl sm:text-4xl">
              记录研究判断，也公开工程取舍。
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Sun Lupeng 的个人研究与工程档案，长期关注计算机视觉、多模态感知、LLM 应用与 Agent 系统。
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm lg:col-span-3 lg:col-start-9" aria-label="页脚导航">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
            <Link href="/rss.xml" className="text-muted-foreground transition-colors hover:text-accent">
              RSS
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Sun Lupeng / DeepFrame Lab</span>
          <Link href="mailto:qq13961090143@163.com" className="transition-colors hover:text-accent">
            Contact · qq13961090143@163.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
