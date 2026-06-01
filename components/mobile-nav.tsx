"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="lg:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription>文章、主题与订阅入口</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1" aria-label="移动端导航">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setOpen(false)}
            />
          ))}
          <NavLink href="/rss.xml" label="RSS" onClick={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
