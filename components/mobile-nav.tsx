"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <Button
        size="icon"
        variant="outline"
        aria-label={open ? "关闭菜单" : "打开菜单"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-[var(--radius)] border bg-card p-3 shadow-2xl">
          <nav className="grid gap-1" aria-label="移动端导航">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/rss.xml"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              RSS
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
