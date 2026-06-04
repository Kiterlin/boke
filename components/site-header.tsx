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
  const primaryNav = siteConfig.nav.filter((item) => item.href !== "/search");

  return (
    <header className="sticky top-3 z-40 px-3">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-border/70 bg-background/78 px-3 shadow-[0_20px_60px_rgba(15,15,15,0.08)] backdrop-blur-xl sm:px-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} 首页`}>
          <span className="relative grid size-9 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
            DF
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border border-background bg-accent" />
          </span>
          <span className="text-sm font-semibold tracking-normal sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-border/65 bg-background/70 p-1 shadow-sm shadow-foreground/[0.03] lg:flex"
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
                    variant: "outline",
                    size: "icon",
                    className: "max-sm:hidden bg-background/80 sm:inline-flex"
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
                    variant: "outline",
                    size: "icon",
                    className: "max-sm:hidden bg-background/80 sm:inline-flex"
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
