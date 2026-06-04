"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CodeBlockProps = {
  children: React.ReactNode;
  code: string;
  language?: string;
  className?: string;
};

export function CodeBlock({
  children,
  code,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const label = language || "text";

  async function copyCode() {
    if (!code) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div
      className={cn(
        "not-prose my-8 max-w-[68ch] overflow-hidden rounded-xl border border-border/60 bg-[#0d1117] shadow-sm dark:border-white/10",
        className,
      )}
    >
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-4">
        <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          aria-label="复制代码"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          <span className="text-[0.75rem]">{copied ? "已复制" : "复制"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed" data-language={label}>
        {children}
      </pre>
    </div>
  );
}
