import { Quote } from "lucide-react";

export function QuoteBlock({
  children,
  source,
  variant = "default",
}: {
  children: React.ReactNode;
  source?: string;
  variant?: "default" | "pull" | "highlight";
}) {
  if (variant === "pull") {
    return (
      <aside className="not-prose my-10 max-w-[68ch]">
        <blockquote className="relative border-l-[3px] border-accent/40 bg-accent/[0.03] py-4 pl-6 pr-4 dark:border-accent/30 dark:bg-accent/[0.02]">
          <span className="absolute left-3 top-3 font-serif text-5xl leading-none text-accent/15 select-none">
            &ldquo;
          </span>
          <div className="text-lg leading-relaxed text-foreground/80 [&>p]:my-2">
            {children}
          </div>
          {source && (
            <footer className="mt-4 text-sm font-medium text-muted-foreground before:mr-2 before:content-['—']">
              {source}
            </footer>
          )}
        </blockquote>
      </aside>
    );
  }

  if (variant === "highlight") {
    return (
      <div className="not-prose my-10 max-w-[68ch]">
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/70 px-6 py-5 dark:border-amber-500/20 dark:bg-amber-950/20">
          <div className="flex gap-3">
            <Quote className="mt-0.5 size-4 shrink-0 text-amber-500/60" />
            <div className="text-[0.9375rem] leading-relaxed text-foreground/80 [&>p]:my-2 [&>p]:leading-relaxed">
              {children}
            </div>
          </div>
          {source && (
            <div className="mt-3 pl-7 text-sm font-medium text-muted-foreground">
              — {source}
            </div>
          )}
        </div>
      </div>
    );
  }

  // default
  return (
    <div className="not-prose my-10 max-w-[68ch]">
      <div className="relative rounded-xl border border-border/60 bg-secondary/30 px-6 py-5 dark:bg-white/[0.02]">
        <Quote className="absolute left-4 top-4 size-5 text-foreground/8" />
        <div className="pl-7 text-base leading-relaxed text-foreground/78 [&>p]:my-2 [&>p]:leading-relaxed">
          {children}
        </div>
        {source && (
          <footer className="mt-4 pl-7 text-sm font-medium text-muted-foreground">
            — {source}
          </footer>
        )}
      </div>
    </div>
  );
}
