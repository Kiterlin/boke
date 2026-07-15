"use client";

import Link from "next/link";
import { Rss, Search } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const primaryNav = siteConfig.nav.filter((item) =>
    ["/blog", "/papers", "/projects", "/about"].includes(item.href)
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="editorial-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} 首页`}>
          <span className="grid size-9 place-items-center bg-primary font-mono text-[10px] font-semibold tracking-wider text-primary-foreground">
            SL
          </span>
          <span className="grid leading-none">
            <span className="text-sm font-semibold">Sun Lupeng</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              DeepFrame Lab
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label="主导航"
        >
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <TooltipProvider delayDuration={200}>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/search"
                  aria-label="搜索"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "max-sm:hidden sm:inline-flex"
                  })}
                >
                  <Search />
                </Link>
              </TooltipTrigger>
              <TooltipContent>搜索文章</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/rss.xml"
                  aria-label="RSS"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "max-sm:hidden sm:inline-flex"
                  })}
                >
                  <Rss />
                </Link>
              </TooltipTrigger>
              <TooltipContent>订阅 RSS</TooltipContent>
            </Tooltip>
            <ThemeToggle />
            <MobileNav />
          </div>
        </TooltipProvider>
      </div>
    </header>
  );
}
