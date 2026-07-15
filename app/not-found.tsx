import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

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
    <div className="editorial-shell flex min-h-[72dvh] flex-col justify-center py-16">
      <p className="editorial-kicker">Error / 404</p>
      <h1 className="display-title mt-7 max-w-3xl text-balance text-5xl sm:text-7xl">
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
