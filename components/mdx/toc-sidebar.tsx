"use client";

import { useEffect, useState } from "react";
import { BookOpen, List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/posts";

/* ── Scroll-spy link ── */

function TocLink({ item, activeId }: { item: TocItem; activeId: string }) {
  const isActive = activeId === item.id;
  return (
    <a
      href={`#${item.id}`}
      className={cn(
        "block truncate text-sm leading-6 transition-all duration-150",
        item.level === 3 ? "pl-4 text-[0.8125rem]" : "",
        isActive
          ? "font-medium text-accent before:absolute before:inset-y-0 before:-left-5 before:w-0.5 before:rounded-full before:bg-accent relative"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {item.text}
    </a>
  );
}

/* ── Desktop sticky TOC ── */

export function TOCSidebar({
  toc,
  words,
  readingTime,
}: {
  toc: TocItem[];
  words: number;
  readingTime: string;
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -75% 0px" },
    );

    const headings = document.querySelectorAll(
      ".prose-content h2[id], .prose-content h3[id]",
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (!toc.length) return null;

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-border/60 pl-5">
        {/* Header */}
        <div className="mb-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/60">
            <BookOpen className="size-3.5" />
            目录
          </p>
          <p className="mt-1.5 text-[0.75rem] leading-5 text-muted-foreground/60">
            {words.toLocaleString("zh-CN")} 字 · {readingTime}
          </p>
        </div>

        {/* TOC links */}
        <div className="grid gap-2">
          {toc.map((item) => (
            <TocLink key={item.id} item={item} activeId={activeId} />
          ))}
        </div>
      </nav>
    </aside>
  );
}

/* ── Mobile floating TOC ── */

export function MobileTOC({ toc }: { toc: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (!toc.length) return null;

  return (
    <div className="lg:hidden">
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="打开目录"
      >
        <List className="size-5" />
      </button>

      {/* Bottom sheet */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[65vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-2xl">
            {/* Sheet handle */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />

            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="size-4 text-accent" />
                目录
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
                aria-label="关闭目录"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="grid gap-2.5">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors",
                    item.level === 3 && "pl-4 text-[0.8125rem]",
                  )}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
