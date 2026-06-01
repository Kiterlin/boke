import Link from "next/link";
import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Post } from "@/lib/posts";
import { formatDate, slugify } from "@/lib/utils";

export function ArticleCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Card className="group h-full overflow-hidden transition-colors hover:border-accent/55">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge variant={featured ? "accent" : "secondary"}>{post.category}</Badge>
          <span className="text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
        </div>
        <h3 className="text-balance text-xl font-semibold leading-tight tracking-normal sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-sm border bg-background px-2 py-1 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-7 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
          <span className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:decoration-accent">
            阅读
          </span>
        </div>
      </Link>
    </Card>
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
