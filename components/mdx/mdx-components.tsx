import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

function Callout({
  children,
  tone = "default"
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <div
      className={cn(
        "my-6 max-w-[68ch] rounded-md border p-5 text-sm leading-7",
        tone === "accent"
          ? "border-accent/35 bg-accent/8"
          : "bg-secondary/55 text-muted-foreground"
      )}
    >
      {children}
    </div>
  );
}

export const mdxComponents = {
  a: Anchor,
  Callout
};
