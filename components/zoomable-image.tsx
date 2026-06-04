"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Allow click-to-zoom lightbox. */
  allowZoom?: boolean;
  /** Invert colors in dark mode (only for line-art on transparent bg). */
  darkModeInvert?: boolean;
  /** Sizing hint for the responsive image. */
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Responsive image with an optional click-to-zoom lightbox built on Radix
 * Dialog. The thumbnail uses next/image; the lightbox shows the full-res
 * source on a near-opaque backdrop. Diagrams keep a light surface so colored
 * exports stay readable in dark mode (no inversion unless darkModeInvert).
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
  allowZoom = true,
  darkModeInvert = false,
  sizes = "(max-width: 768px) 100vw, 760px",
  className,
  priority = false,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".gif") || src.endsWith(".svg")}
      className={cn(
        "h-auto w-full",
        darkModeInvert && "dark:invert dark:hue-rotate-180",
        className
      )}
    />
  );

  if (!allowZoom) return img;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`放大查看：${alt}`}
          className="group/zoom relative block w-full cursor-zoom-in focus-visible:outline-none"
        >
          {img}
          <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-foreground/75 px-2 py-1 text-[0.6875rem] font-medium text-background opacity-0 backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100">
            <Maximize2 className="size-3" />
            点击放大
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 focus:outline-none"
          onClick={() => setOpen(false)}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[96vw] cursor-zoom-out rounded-lg bg-white object-contain shadow-2xl ring-1 ring-white/10"
          />
          <Dialog.Close
            aria-label="关闭"
            className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
