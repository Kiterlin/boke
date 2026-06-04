import { cn } from "@/lib/utils";

type InfoCardVariant = "default" | "tip" | "reference" | "definition";

const variantStyles: Record<
  InfoCardVariant,
  { border: string; bg: string; darkBg: string; darkBorder: string }
> = {
  default: {
    border: "border-border/60",
    bg: "bg-card",
    darkBg: "dark:bg-card",
    darkBorder: "dark:border-border/30",
  },
  tip: {
    border: "border-emerald-200/60",
    bg: "bg-emerald-50/50",
    darkBg: "dark:bg-emerald-950/20",
    darkBorder: "dark:border-emerald-500/20",
  },
  reference: {
    border: "border-violet-200/60",
    bg: "bg-violet-50/50",
    darkBg: "dark:bg-violet-950/20",
    darkBorder: "dark:border-violet-500/20",
  },
  definition: {
    border: "border-sky-200/60",
    bg: "bg-sky-50/50",
    darkBg: "dark:bg-sky-950/20",
    darkBorder: "dark:border-sky-500/20",
  },
};

export function InfoCard({
  title,
  children,
  icon,
  variant = "default",
}: {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: InfoCardVariant;
}) {
  const style = variantStyles[variant];

  return (
    <div
      className={cn(
        "not-prose my-8 max-w-[68ch] rounded-xl border p-5 transition-colors",
        style.border,
        style.bg,
        style.darkBg,
        style.darkBorder,
      )}
    >
      {title && (
        <div className="mb-3 flex items-center gap-2.5">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <h4 className="text-sm font-semibold tracking-tight text-foreground/85">
            {title}
          </h4>
        </div>
      )}
      <div className="block-prose text-[0.9375rem] leading-7 text-foreground/75 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5 [&_code]:rounded [&_code]:bg-black/[0.06] dark:[&_code]:bg-white/[0.08] [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
