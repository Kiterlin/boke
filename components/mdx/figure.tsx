import { cn } from "@/lib/utils";
import { getImageSize, postImage, publicFileExists } from "@/lib/posts";
import { ZoomableImage } from "@/components/zoomable-image";
import { MissingDiagram } from "@/components/mdx/missing-diagram";

type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  /** Show a subtle border around the image. */
  border?: boolean;
  /** Show a subtle box shadow. */
  shadow?: boolean;
  /** Use rounded corners. */
  rounded?: boolean;
  /** Click-to-zoom lightbox. Default true. */
  zoom?: boolean;
  /** Injected by the per-post MDX component map; resolves bare filenames. */
  slug?: string;
};

/**
 * Captioned image card for screenshots, photos and ordinary figures (as
 * opposed to <Diagram>, which frames technical board exports). Server
 * component: resolves bare filenames against the post's image dir, checks
 * existence (→ <MissingDiagram>) and reads intrinsic size to avoid CLS.
 */
export function Figure({
  src,
  alt = "",
  caption,
  width,
  height,
  border = true,
  shadow = true,
  rounded = true,
  zoom = true,
  slug = "",
}: FigureProps) {
  const isExternal = /^https?:\/\//.test(src) || src.startsWith("data:");
  const href = !isExternal && src && !src.startsWith("/") ? postImage(slug, src) : src;

  // Missing / placeholder sources → graceful placeholder, never a broken img.
  if (!href || href.startsWith("data:image/svg+xml")) {
    return <MissingDiagram title={caption || alt} />;
  }

  const isLocal = href.startsWith("/");
  if (isLocal && !publicFileExists(href)) {
    return <MissingDiagram title={caption || alt} expectedPath={href} />;
  }

  const dims =
    (isLocal ? getImageSize(href) : null) ??
    ({ width: width ?? 1200, height: height ?? 675 } as const);

  return (
    <figure className="not-prose group/figure my-10">
      <div
        className={cn(
          "relative overflow-hidden bg-secondary/20",
          rounded && "rounded-xl",
          border && "border border-border/60",
          shadow && "shadow-sm",
          "dark:bg-white/[0.02] dark:shadow-black/20"
        )}
      >
        <ZoomableImage
          src={href}
          alt={alt || caption || "插图"}
          width={dims.width}
          height={dims.height}
          allowZoom={zoom}
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.8125rem] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
