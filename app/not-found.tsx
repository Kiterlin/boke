import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-normal">页面没有找到</h1>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
        这个地址可能已变更，或文章还没有发布。你可以返回文章列表，或者直接搜索知识库。
      </p>
      <div className="mt-8 flex justify-center gap-3">
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
