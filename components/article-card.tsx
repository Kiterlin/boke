import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { HoverLift } from "@/components/animated";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Post } from "@/lib/posts";
import { formatDate, slugify } from "@/lib/utils";

export function ArticleCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <HoverLift className="h-full">
      <Card className="group h-full overflow-hidden bg-card/72 backdrop-blur transition-colors hover:border-accent/60">
        <Link href={`/blog/${post.slug}`} className="flex h-full flex-col p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Badge variant={featured ? "accent" : "secondary"}>{post.category}</Badge>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <h3 className="text-balance text-2xl font-semibold leading-tight tracking-normal">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
          </div>
        </Link>
      </Card>
    </HoverLift>
  );
}

export function TaxonomyLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border bg-background/65 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
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
