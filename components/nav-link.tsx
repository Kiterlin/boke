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
        "relative px-2 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 after:absolute after:inset-x-2 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-foreground hover:after:scale-x-100",
        isActive && "text-foreground after:scale-x-100"
      )}
    >
      {label}
    </Link>
  );
}
