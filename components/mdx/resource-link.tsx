import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, Link2, Play, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type ResourceType = "article" | "paper" | "tool" | "video" | "book" | "link";

const typeConfig: Record<
  ResourceType,
  { icon: typeof Link2; label: string; color: string }
> = {
  article: {
    icon: FileText,
    label: "文章",
    color:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  },
  paper: {
    icon: BookOpen,
    label: "论文",
    color:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  },
  tool: {
    icon: Wrench,
    label: "工具",
    color:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  video: {
    icon: Play,
    label: "视频",
    color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
  book: {
    icon: BookOpen,
    label: "书籍",
    color:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  link: {
    icon: Link2,
    label: "链接",
    color: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  },
};

export function ResourceLink({
  title,
  url,
  description,
  type = "article",
}: {
  title: string;
  url: string;
  description?: string;
  type?: ResourceType;
}) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const isInternal = url.startsWith("/");

  const cardContent = (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all",
        "hover:border-accent/30 hover:shadow-sm",
        "dark:hover:border-accent/25 dark:hover:bg-white/[0.02]",
      )}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
          config.color,
        )}
      >
        <Icon className="size-3" />
        {config.label}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/85">
          <span className="truncate">{title}</span>
          {!isInternal && (
            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/50" />
          )}
        </div>
        {description && (
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (isInternal) {
    return (
      <Link href={url} className="not-prose my-4 block max-w-[68ch]">
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="not-prose my-4 block max-w-[68ch]"
    >
      {cardContent}
    </a>
  );
}
