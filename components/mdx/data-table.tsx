import { cn } from "@/lib/utils";

type ColumnDef = {
  header: string;
  accessor: string;
  /** Optionally right-align this column */
  align?: "left" | "right" | "center";
};

export function DataTable({
  columns = [],
  data = [],
  caption,
  striped = true,
}: {
  columns?: ColumnDef[];
  data?: Record<string, string | number>[];
  caption?: string;
  striped?: boolean;
}) {
  if (!columns.length || !data.length) {
    return (
      <div className="not-prose my-10 max-w-[68ch] rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
        暂无数据
      </div>
    );
  }

  const alignClass: Record<string, string> = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <div className="not-prose my-10 max-w-[68ch] overflow-x-auto rounded-xl border border-border/60">
      <table className="min-w-full border-collapse text-sm">
        {caption && (
          <caption className="border-b border-border/40 px-5 py-3 text-left text-xs font-medium text-muted-foreground">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-border bg-secondary/40 dark:bg-white/[0.02]">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={cn(
                  "whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground/65",
                  alignClass[col.align || "left"],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/40 transition-colors last:border-0",
                striped && i % 2 === 0 && "bg-secondary/15 dark:bg-white/[0.01]",
                "hover:bg-accent/[0.03] dark:hover:bg-white/[0.03]",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className={cn(
                    "px-5 py-3 text-foreground/75",
                    alignClass[col.align || "left"],
                  )}
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
