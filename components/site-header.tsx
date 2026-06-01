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
    <header className="sticky top-0 z-40 border-b bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} 首页`}>
          <span className="grid size-8 place-items-center rounded-md border bg-primary text-xs font-semibold text-primary-foreground">
            DF
          </span>
          <span className="text-sm font-semibold tracking-normal sm:text-base">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
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
                    className: "hidden sm:inline-flex"
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
                    className: "hidden sm:inline-flex"
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
