import { cn } from "@/lib/utils";

type HighlightVariant = "yellow" | "blue" | "green" | "pink" | "purple" | "amber" | "sky";

const variantStyles: Record<
  HighlightVariant,
  { light: string; dark: string }
> = {
  yellow: {
    light: "bg-yellow-100/80 text-yellow-800",
    dark: "dark:bg-yellow-400/15 dark:text-yellow-200",
  },
  blue: {
    light: "bg-blue-100/80 text-blue-800",
    dark: "dark:bg-blue-400/15 dark:text-blue-200",
  },
  green: {
    light: "bg-emerald-100/80 text-emerald-800",
    dark: "dark:bg-emerald-400/15 dark:text-emerald-200",
  },
  pink: {
    light: "bg-pink-100/80 text-pink-800",
    dark: "dark:bg-pink-400/15 dark:text-pink-200",
  },
  purple: {
    light: "bg-violet-100/80 text-violet-800",
    dark: "dark:bg-violet-400/15 dark:text-violet-200",
  },
  amber: {
    light: "bg-amber-100/80 text-amber-800",
    dark: "dark:bg-amber-400/15 dark:text-amber-200",
  },
  sky: {
    light: "bg-sky-100/80 text-sky-800",
    dark: "dark:bg-sky-400/15 dark:text-sky-200",
  },
};

/**
 * Inline highlight for emphasizing key terms or short phrases.
 * Use HighlightBox for short inline highlights within paragraphs.
 * For block-level highlights, use Callout or KeyTakeaways instead.
 */
export function HighlightBox({
  children,
  variant = "yellow",
}: {
  children: React.ReactNode;
  variant?: HighlightVariant;
}) {
  const style = variantStyles[variant];

  return (
    <mark
      className={cn(
        "inline rounded-[0.3rem] px-1.5 py-0.5 text-[0.9375em] font-medium leading-relaxed",
        style.light,
        style.dark,
        "no-underline",
      )}
    >
      {children}
    </mark>
  );
}
