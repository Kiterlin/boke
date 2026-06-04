import { cn } from "@/lib/utils";

type Step = {
  title: string;
  children: React.ReactNode;
};

export function StepList({
  steps = [],
  variant = "numbered",
}: {
  steps?: Step[];
  variant?: "numbered" | "timeline";
}) {
  if (!steps.length) return null;

  return (
    <div className={cn("not-prose my-10 max-w-[68ch]")}>
      {variant === "timeline" ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
          {steps.map((step, i) => (
            <div key={i} className="relative mb-8 pl-12 last:mb-0">
              <span
                className={cn(
                  "absolute left-0 top-0.5 flex size-10 items-center justify-center rounded-full border-2 border-accent/20 bg-card text-sm font-semibold text-accent shadow-sm",
                  "dark:border-accent/30 dark:bg-card",
                )}
              >
                {i + 1}
              </span>
              <h4 className="mb-2 text-base font-semibold text-foreground">
                {step.title}
              </h4>
              <div className="block-prose text-[0.9375rem] leading-7 text-foreground/75 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5 [&_code]:rounded [&_code]:bg-black/[0.06] dark:[&_code]:bg-white/[0.08]">
                {step.children}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Numbered variant
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                  "bg-accent/10 text-accent ring-1 ring-inset ring-accent/20",
                  "dark:bg-accent/15 dark:ring-accent/25",
                )}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="mb-1.5 pt-0.5 text-base font-semibold text-foreground">
                  {step.title}
                </h4>
                <div className="block-prose text-[0.9375rem] leading-7 text-foreground/75 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5 [&_code]:rounded [&_code]:bg-black/[0.06] dark:[&_code]:bg-white/[0.08]">
                  {step.children}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
