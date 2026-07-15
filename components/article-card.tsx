import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/posts";
import { formatDate, slugify } from "@/lib/utils";

export function ArticleCard({
  post,
  featured = false,
  index
}: {
  post: Post;
  featured?: boolean;
  index?: number;
}) {
  return (
    <article className="group border-t border-border/80 transition-colors hover:border-accent">
      <Link href={`/blog/${post.slug}`} className="grid gap-5 py-7 sm:grid-cols-12 sm:items-start sm:py-8">
        <div className="flex items-center justify-between sm:col-span-2 sm:block">
          <span className="font-mono text-xs text-muted-foreground">
            {typeof index === "number" ? String(index + 1).padStart(2, "0") : formatDate(post.date)}
          </span>
          <Badge variant={featured ? "accent" : "outline"} className="sm:mt-5">
            {post.category}
          </Badge>
        </div>
        <div className="sm:col-span-7">
          <h3 className="section-title text-balance text-xl leading-snug transition-colors group-hover:text-accent sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {post.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground sm:col-span-3 sm:justify-end sm:gap-8">
          <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" />{post.readingTime}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </article>
  );
}

export function TaxonomyLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-sm border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
    >
      {label}
    </Link>
  );
}

export function tagHref(tag: string) {
  return `/tags/${slugify(tag)}`;
}

export function categoryHref(category: string) {
  return `/categories/${slugify(category)}`;
}
