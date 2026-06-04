import { cn } from "@/lib/utils";

export function KeyTakeaways({
  title = "核心结论",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "not-prose my-10 max-w-[68ch] rounded-xl border border-accent/20 bg-accent/[0.03] p-6",
        "dark:border-accent/25 dark:bg-accent/[0.04]",
      )}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex size-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent dark:bg-accent/20">
          ✓
        </span>
        <span className="text-sm font-semibold tracking-tight text-accent">
          {title}
        </span>
      </div>
      <div className="text-[0.9375rem] leading-7 text-foreground/80 [&_ul]:m-0 [&_ul]:space-y-2 [&_ul]:p-0 [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:leading-7 [&_li]:text-foreground/75 [&_li]:before:mt-[0.6rem] [&_li]:before:block [&_li]:before:size-1.5 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-accent/50 [&_li]:before:content-['']">
        {children}
      </div>
    </div>
  );
}
