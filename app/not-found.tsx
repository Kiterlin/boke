import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "页面没有找到",
  description: "请求的页面不存在或已移动。",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <Badge variant="accent" className="w-fit">
        404
      </Badge>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
        页面没有找到
      </h1>
      <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
        这个地址可能已变更，或文章还没有发布。你可以返回文章列表，或者直接搜索知识库。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/blog">
            <ArrowLeft />
            返回文章
          </Link>
        </Button>
        <Button asChild variant="accent">
          <Link href="/search">
            <Search />
            搜索
          </Link>
        </Button>
      </div>
    </div>
  );
}
