import { AlertTriangle, CheckCircle2, Info, Lightbulb, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "tip" | "note" | "warning" | "danger" | "check" | "summary";

const variantConfig: Record<
  CalloutVariant,
  {
    icon: typeof Info;
    label: string;
    border: string;
    bg: string;
    iconColor: string;
    darkBg: string;
    darkBorder: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    label: "提示",
    border: "border-l-blue-400",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    darkBg: "dark:bg-blue-950/30",
    darkBorder: "dark:border-l-blue-500/60",
  },
  note: {
    icon: Info,
    label: "说明",
    border: "border-l-sky-400",
    bg: "bg-sky-50",
    iconColor: "text-sky-500",
    darkBg: "dark:bg-sky-950/30",
    darkBorder: "dark:border-l-sky-500/60",
  },
  warning: {
    icon: AlertTriangle,
    label: "注意",
    border: "border-l-amber-400",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    darkBg: "dark:bg-amber-950/30",
    darkBorder: "dark:border-l-amber-500/60",
  },
  danger: {
    icon: XCircle,
    label: "警告",
    border: "border-l-red-400",
    bg: "bg-red-50",
    iconColor: "text-red-500",
    darkBg: "dark:bg-red-950/30",
    darkBorder: "dark:border-l-red-500/60",
  },
  check: {
    icon: CheckCircle2,
    label: "要点",
    border: "border-l-emerald-400",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    darkBg: "dark:bg-emerald-950/30",
    darkBorder: "dark:border-l-emerald-500/60",
  },
  summary: {
    icon: CheckCircle2,
    label: "总结",
    border: "border-l-violet-400",
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    darkBg: "dark:bg-violet-950/30",
    darkBorder: "dark:border-l-violet-500/60",
  },
};

export function Callout({
  children,
  variant = "note",
  title,
}: {
  children: React.ReactNode;
  variant?: CalloutVariant;
  title?: string;
}) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "not-prose group/callout my-8 max-w-[68ch] rounded-lg border border-l-[3px] p-5",
        "transition-colors",
        config.border,
        config.bg,
        config.darkBg,
        config.darkBorder,
        "dark:border-border/30",
      )}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <Icon className={cn("size-4 shrink-0", config.iconColor)} />
        <span className="text-sm font-semibold tracking-tight text-foreground/85">
          {title || config.label}
        </span>
      </div>
      <div className="block-prose text-[0.9375rem] leading-7 text-foreground/75 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5 [&_code]:bg-black/[0.06] dark:[&_code]:bg-white/[0.08] [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
