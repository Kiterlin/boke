import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function Gallery({
  images = [],
  columns = 2,
  gap = "default",
}: {
  images?: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: "tight" | "default" | "wide";
}) {
  if (!images.length) return null;

  const gridCols: Record<number, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  const gaps: Record<string, string> = {
    tight: "gap-2",
    default: "gap-4",
    wide: "gap-6",
  };

  return (
    <div
      className={cn(
        "not-prose my-10 grid grid-cols-1",
        gridCols[columns],
        gaps[gap],
      )}
    >
      {images.map((img, i) => (
        <figure
          key={i}
          className={cn(
            "group/figure overflow-hidden rounded-xl border border-border/60 bg-secondary/20",
            "transition-shadow hover:shadow-md",
            "dark:bg-white/[0.02] dark:hover:shadow-black/30",
          )}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover/figure:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={img.src.endsWith(".gif") || img.src.endsWith(".svg")}
            />
          </div>
          {img.caption && (
            <figcaption className="border-t border-border/40 px-4 py-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
