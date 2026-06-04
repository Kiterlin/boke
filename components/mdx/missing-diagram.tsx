import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

type MissingDiagramProps = {
  /** Human title of the intended diagram. */
  title?: string;
  /** Expected on-disk path, surfaced so it's obvious what to export. */
  expectedPath?: string;
  /** Optional caption to keep surrounding copy meaningful. */
  caption?: string;
  /** Optional sequence number, kept consistent with <Diagram>. */
  number?: number;
};

/**
 * Aesthetic placeholder for a diagram whose image export is not yet
 * available. Never renders a broken <img>; preserves layout and shows the
 * intended title plus the expected resource path so the gap is actionable.
 * Replaces the older FeishuBoardPlaceholder.
 */
export function MissingDiagram({
  title,
  expectedPath,
  caption,
  number,
}: MissingDiagramProps) {
  return (
    <figure className="not-prose my-10">
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-secondary/25 px-6 py-12 text-center",
          "dark:bg-white/[0.02]"
        )}
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-secondary/60 dark:bg-white/[0.04]">
          <ImageOff className="size-5 text-muted-foreground/45" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground/70">
            {number ? `图 ${number} · ` : ""}
            {title || "示意图待补充"}
          </p>
          <p className="text-xs text-muted-foreground/60">
            图示资源尚未导出，已为其预留版位
          </p>
          {expectedPath && (
            <code className="mt-1 inline-block rounded bg-black/[0.05] px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground/70 dark:bg-white/[0.06]">
              {expectedPath}
            </code>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.8125rem] leading-relaxed text-muted-foreground/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** @deprecated Back-compat alias; prefer <MissingDiagram>. */
export function FeishuBoardPlaceholder({
  label,
  description,
}: {
  label?: string;
  description?: string;
}) {
  return <MissingDiagram title={label} caption={description} />;
}
