import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type TaxonomyItem = {
  slug: string;
  name: string;
  count: number;
  description: string;
};

export function TaxonomyDirectory({
  items,
  basePath
}: {
  items: TaxonomyItem[];
  basePath: "/categories" | "/tags";
}) {
  return (
    <div className="border-t border-border/80">
      {items.map((item, index) => (
        <Link
          key={item.slug}
          href={`${basePath}/${item.slug}`}
          className="group grid gap-4 border-b border-border/80 py-7 transition-colors hover:border-accent sm:grid-cols-12 sm:items-center"
        >
          <span className="font-mono text-xs text-muted-foreground sm:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="sm:col-span-3">
            <h2 className="section-title text-2xl transition-colors group-hover:text-accent">{item.name}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:col-span-6">{item.description}</p>
          <div className="flex items-center justify-between sm:col-span-2 sm:justify-end sm:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.count} 篇</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}
