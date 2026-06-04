import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { getImageSize, postDiagram, publicFileExists } from "@/lib/posts";
import { ZoomableImage } from "@/components/zoomable-image";
import { MissingDiagram } from "@/components/mdx/missing-diagram";

type DiagramProps = {
  /** Bare filename (resolved against the post dir) or an absolute /public path. */
  src: string;
  /** Title shown in the card header, next to the figure number. */
  title?: string;
  /** Caption shown beneath the figure. */
  caption?: string;
  /** Optional explicit figure number (e.g. 1 → "图 1"). */
  number?: number;
  /** Resource kind. PDF renders an open-in-new-tab card. */
  type?: "png" | "svg" | "pdf";
  /** Click-to-zoom lightbox. Default true. */
  allowZoom?: boolean;
  /** Card border + surface. Default true. */
  bordered?: boolean;
  /** Invert image colors in dark mode (line-art only). Default false. */
  darkModeInvert?: boolean;
  /** Injected by the per-post MDX component map; not authored by hand. */
  slug?: string;
};

/**
 * Technical figure card for Feishu-board diagram exports (and any other
 * architecture / flow / concept image). Server component: it resolves the
 * resource path, checks existence (falling back to <MissingDiagram>), and
 * reads intrinsic dimensions to avoid layout shift. Colored diagrams sit on
 * a light "paper" surface in both themes so they stay crisp in dark mode.
 */
export function Diagram({
  src,
  title,
  caption,
  number,
  type = "png",
  allowZoom = true,
  bordered = true,
  darkModeInvert = false,
  slug = "",
}: DiagramProps) {
  const href = src.startsWith("/") ? src : postDiagram(slug, src);

  if (!publicFileExists(href)) {
    return (
      <MissingDiagram
        title={title}
        expectedPath={href}
        caption={caption}
        number={number}
      />
    );
  }

  const header = (title || number) && (
    <figcaption className="flex items-center gap-2.5 border-b border-border/50 px-4 py-2.5 sm:px-5">
      {number != null && (
        <span className="inline-flex shrink-0 items-center rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[0.6875rem] font-semibold text-accent dark:bg-accent/15">
          图 {number}
        </span>
      )}
      {title && (
        <span className="text-[0.8125rem] font-semibold leading-snug tracking-tight text-foreground/80">
          {title}
        </span>
      )}
    </figcaption>
  );

  const frame = cn(
    "not-prose my-10 overflow-hidden rounded-xl",
    bordered && "border border-border/60 bg-card/40 dark:bg-white/[0.015]"
  );

  // PDF: no inline raster — offer an open/preview affordance.
  if (type === "pdf") {
    return (
      <figure className={frame}>
        {header}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-5 transition-colors hover:bg-accent/[0.04] sm:px-5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground dark:bg-white/[0.05]">
            <FileText className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-foreground/85">
              {title || "查看矢量图示 (PDF)"}
            </span>
            <span className="block truncate font-mono text-xs text-muted-foreground">
              {href}
            </span>
          </span>
        </a>
        {caption && (
          <p className="border-t border-border/50 px-4 py-3 text-[0.8125rem] leading-relaxed text-muted-foreground sm:px-5">
            {caption}
          </p>
        )}
      </figure>
    );
  }

  const dims = getImageSize(href) ?? { width: 1600, height: 1000 };

  return (
    <figure className={frame}>
      {header}
      {/* Light "paper" surface keeps colored diagrams readable in dark mode */}
      <div className="bg-white p-3 sm:p-4 dark:bg-[#fbfbfa]">
        <div className="overflow-hidden rounded-md ring-1 ring-black/[0.04]">
          <ZoomableImage
            src={href}
            alt={title || caption || "技术图示"}
            width={dims.width}
            height={dims.height}
            allowZoom={allowZoom}
            darkModeInvert={darkModeInvert}
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-border/50 px-4 py-3 text-[0.8125rem] leading-relaxed text-muted-foreground sm:px-5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
