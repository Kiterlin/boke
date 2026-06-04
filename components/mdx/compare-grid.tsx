import { cn } from "@/lib/utils";

type CompareColumn = {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
};

export function CompareGrid({
  left,
  right,
}: {
  left?: CompareColumn;
  right?: CompareColumn;
}) {
  if (!left || !right) return null;

  return (
    <div className="not-prose my-10 grid overflow-hidden rounded-xl border border-border/60 sm:grid-cols-2">
      {[left, right].map((col, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col p-6",
            i === 0 && "border-b border-border/40 sm:border-b-0 sm:border-r sm:border-border/40",
            col.highlight && "bg-accent/[0.03] dark:bg-accent/[0.02]",
          )}
        >
          <h4 className="mb-4 text-sm font-semibold tracking-tight text-foreground/90">
            {col.title}
          </h4>
          <div className="flex-1 text-[0.9375rem] leading-7 text-foreground/75 [&_ul]:m-0 [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_li]:leading-7 [&_li]:text-foreground/70 [&_code]:rounded [&_code]:bg-black/[0.06] dark:[&_code]:bg-white/[0.08]">
            {col.children}
          </div>
        </div>
      ))}
    </div>
  );
}
