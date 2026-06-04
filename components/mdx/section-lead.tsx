export function SectionLead({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="not-prose my-5 max-w-[68ch] text-sm leading-7 text-muted-foreground [&>p]:my-0">
        {children}
      </div>
    );
  }

  return (
    <div className="not-prose my-8 max-w-[68ch]">
      <div className="border-l-[3px] border-accent/40 bg-accent/[0.02] py-3 pl-5 text-[1.0625rem] leading-8 text-foreground/65 dark:border-accent/25 dark:bg-accent/[0.015] [&>p]:my-0">
        {children}
      </div>
    </div>
  );
}
