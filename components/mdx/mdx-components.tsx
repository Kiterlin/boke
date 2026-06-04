import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { Callout } from "@/components/mdx/callout";
import { Figure } from "@/components/mdx/figure";
import { Gallery } from "@/components/mdx/gallery";
import { QuoteBlock } from "@/components/mdx/quote-block";
import { KeyTakeaways } from "@/components/mdx/key-takeaways";
import { StepList } from "@/components/mdx/step-list";
import { CompareGrid } from "@/components/mdx/compare-grid";
import { InfoCard } from "@/components/mdx/info-card";
import { SectionLead } from "@/components/mdx/section-lead";
import { ResourceLink } from "@/components/mdx/resource-link";
import { HighlightBox } from "@/components/mdx/highlight-box";
import { DataTable } from "@/components/mdx/data-table";
import { Diagram } from "@/components/mdx/diagram";
import { CodeBlock } from "@/components/mdx/code-block";
import {
  MissingDiagram,
  FeishuBoardPlaceholder,
} from "@/components/mdx/missing-diagram";

/* ── Heading overrides ── */

function H1({ id, children, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 id={id} className="sr-only" {...props}>
      {children}
    </h1>
  );
}

function H2({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      id={id}
      className="group mt-16 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground first:mt-0 sm:text-[1.65rem]"
      {...props}
    >
      <span className="relative">
        {children}
        <a
          href={`#${id}`}
          className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100"
          aria-hidden="true"
        >
          <span className="text-accent">#</span>
        </a>
      </span>
    </h2>
  );
}

function H3({ id, children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      id={id}
      className="group mt-12 scroll-mt-28 text-lg font-semibold tracking-tight text-foreground/90 first:mt-0"
      {...props}
    >
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100"
        aria-hidden="true"
      >
        <span className="text-accent">#</span>
      </a>
    </h3>
  );
}

function H4({ id, children, ...props }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      id={id}
      className="mt-10 scroll-mt-28 text-base font-semibold text-foreground/85"
      {...props}
    >
      {children}
    </h4>
  );
}

/* ── Paragraph ── */

function CustomParagraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  // A paragraph that wraps a single block component (image/figure/diagram)
  // should render it directly — avoid invalid <p><figure></p> nesting.
  if (children && typeof children === "object" && "type" in (children as never)) {
    const childType = (children as { type?: unknown }).type;
    if (typeof childType === "function" || childType === "img") {
      return <>{children}</>;
    }
  }
  return (
    <p className="my-5 max-w-[68ch] text-[1.0625rem] leading-[1.85] text-foreground/80 first:mt-0" {...props}>
      {children}
    </p>
  );
}

/* ── Image (slug-bound) ── */

function makeImage(slug: string) {
  return function CustomImage(props: ComponentPropsWithoutRef<"img">) {
    const { src, alt = "" } = props;
    const srcStr = typeof src === "string" ? src : "";

    if (!srcStr || srcStr.includes("placeholder") || srcStr.includes("missing")) {
      return <MissingDiagram title={alt || undefined} />;
    }

    return <Figure slug={slug} src={srcStr} alt={alt} caption={alt || undefined} />;
  };
}

/* ── Lists ── */

function CustomUnorderedList({ children, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="my-5 max-w-[68ch] space-y-1.5 pl-6 leading-8 text-foreground/80 [&_ul]:my-1.5 [&_ul]:space-y-1 [&_ul]:pl-5"
      {...props}
    >
      {children}
    </ul>
  );
}

function CustomOrderedList({ children, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="my-5 max-w-[68ch] space-y-1.5 pl-6 leading-8 text-foreground/80 [&_ol]:my-1.5 [&_ol]:space-y-1 [&_ol]:pl-5"
      {...props}
    >
      {children}
    </ol>
  );
}

function CustomListItem({ children, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li className="my-0.5 leading-[1.85] [&::marker]:text-accent/60" {...props}>
      {children}
    </li>
  );
}

/* ── Blockquote ── */

function CustomBlockquote({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="not-prose my-8 max-w-[68ch] border-l-[3px] border-accent/40 bg-accent/[0.03] py-3 pl-5 text-base italic leading-8 text-foreground/70 dark:border-accent/25 dark:bg-accent/[0.02]"
      {...props}
    >
      {children}
    </blockquote>
  );
}

/* ── Table ── */

function CustomTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-10 max-w-[68ch] overflow-x-auto rounded-xl border border-border/60">
      <table className="min-w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function CustomThead({ children, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className="border-b border-border bg-secondary/40 dark:bg-white/[0.02]" {...props}>
      {children}
    </thead>
  );
}

function CustomTh({ children, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground/65"
      {...props}
    >
      {children}
    </th>
  );
}

function CustomTd({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="border-b border-border/40 px-5 py-3 text-foreground/75 last:border-b-0"
      {...props}
    >
      {children}
    </td>
  );
}

function CustomTr({ children, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className="border-b border-border/40 transition-colors last:border-0 hover:bg-accent/[0.03] dark:hover:bg-white/[0.03]"
      {...props}
    >
      {children}
    </tr>
  );
}

/* ── Horizontal rule ── */

function CustomHr(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-12 max-w-[68ch] border-border/60" {...props} />;
}

/* ── Inline code ── */

function CustomCode({ children, className, ...props }: ComponentPropsWithoutRef<"code">) {
  const isInline = !className;
  if (isInline) {
    return (
      <code
        className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[0.875em] font-medium text-foreground/85 dark:bg-white/[0.1]"
        {...props}
      >
        {children}
      </code>
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

/* ── Code block wrapper ── */

function nodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as { props?: { children?: React.ReactNode } }).props?.children);
  }
  return "";
}

function CustomPre({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
}) {
  const child = Array.isArray(children) ? children[0] : children;
  const childProps =
    child && typeof child === "object" && "props" in child
      ? (child as {
          props?: {
            className?: string;
            "data-language"?: string;
            "data-theme"?: string;
          };
        }).props
      : undefined;
  const language =
    props["data-language"] ||
    childProps?.["data-language"] ||
    childProps?.className?.match(/language-([\w-]+)/)?.[1];

  return (
    <CodeBlock
      code={nodeText(children).replace(/\n$/, "")}
      language={language}
      className={className}
    >
      {children}
    </CodeBlock>
  );
}

/* ── Anchor / Link ── */

function CustomAnchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const className =
    "font-medium text-accent underline underline-offset-[3px] decoration-accent/25 hover:decoration-accent/60 transition-colors";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

/* ── Strong / Bold ── */

function Strong({ children, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong className="font-semibold text-foreground/90" {...props}>
      {children}
    </strong>
  );
}

/* ── Exported component map ── */

/** Element overrides + rich blocks that don't need the post slug. */
const baseComponents = {
  /* Override default HTML elements */
  a: CustomAnchor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: CustomParagraph,
  ul: CustomUnorderedList,
  ol: CustomOrderedList,
  li: CustomListItem,
  blockquote: CustomBlockquote,
  table: CustomTable,
  thead: CustomThead,
  th: CustomTh,
  td: CustomTd,
  tr: CustomTr,
  hr: CustomHr,
  code: CustomCode,
  pre: CustomPre,
  strong: Strong,

  /* Custom rich content blocks */
  Callout,
  Gallery,
  QuoteBlock,
  KeyTakeaways,
  StepList,
  CompareGrid,
  InfoCard,
  SectionLead,
  ResourceLink,
  HighlightBox,
  DataTable,
  MissingDiagram,
  FeishuBoardPlaceholder,
};

/**
 * Build the MDX component map for a given post. `img`, `Figure` and
 * `Diagram` are bound to the slug so authors can reference a bare filename
 * (e.g. `diagram-01-foo.png`) and it resolves to the post's resource dir.
 * An explicit `slug` prop on a component still wins over the bound default.
 */
export function getMdxComponents(slug = "") {
  return {
    ...baseComponents,
    img: makeImage(slug),
    Figure: (props: ComponentProps<typeof Figure>) => (
      <Figure slug={slug} {...props} />
    ),
    Diagram: (props: ComponentProps<typeof Diagram>) => (
      <Diagram slug={slug} {...props} />
    ),
  };
}

/** Back-compat static map (no slug binding); prefer getMdxComponents(slug). */
export const mdxComponents = getMdxComponents("");
