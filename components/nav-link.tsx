"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label,
  onClick
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground",
        isActive && "bg-secondary text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
