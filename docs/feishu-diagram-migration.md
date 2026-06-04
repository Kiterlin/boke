# Feishu diagram migration

This project keeps Feishu/Lark whiteboard exports as local static assets and references them from MDX. Do not paste exported diagrams as hardcoded HTML.

## Asset folders

Raster exports:

```text
public/images/posts/[slug]/
```

Use this folder for PNG, JPG, JPEG, and WebP. High-resolution PNG is the default for Feishu whiteboards because it preserves layout and avoids broken external media links.

Vector exports:

```text
public/diagrams/posts/[slug]/
```

Use this folder for SVG and PDF if Feishu or the whiteboard source can provide them. The `Diagram` component resolves bare `.svg` and `.pdf` filenames to this vector folder automatically.

## Naming

Use semantic, ordered filenames:

```text
diagram-01-memory-ledger-peft.png
diagram-02-lora-forward-gradient.png
diagram-03-lora-variants-family.png
diagram-04-int4-vs-nf4.png
diagram-05-qlora-joint-mechanism.png
```

Keep the number aligned with the article order. Prefer a short domain phrase over generic names such as `image1.png`.

## MDX usage

Use `Diagram` for technical architecture, flow, concept, and Feishu whiteboard exports:

```mdx
<Diagram
  number={1}
  src="diagram-01-memory-ledger-peft.png"
  title="PEFT 显存账本拆解"
  caption="PEFT 的核心节省来自冻结参数不保存梯度和优化器状态。"
/>
```

For ordinary screenshots or photos, use `Figure`:

```mdx
<Figure
  src="training-dashboard.png"
  alt="LLaMA-Factory training dashboard"
  caption="训练过程中的 loss 与 learning-rate 曲线。"
/>
```

Both components are slug-bound by `getMdxComponents(post.slug)`, so a bare raster filename resolves to `/images/posts/[slug]/filename`.

## Fallback

If an export is missing, use `MissingDiagram` rather than a broken image:

```mdx
<MissingDiagram
  number={3}
  title="LoRA 变体家族与适用边界"
  expectedPath="/images/posts/peft-advanced-practical-handbook/diagram-03-lora-variants-family.png"
  caption="Feishu 白板导出失败时保留版位和说明。"
/>
```

`Diagram` also performs a server-side existence check. If the referenced local file does not exist, it renders `MissingDiagram` automatically.

## Import workflow

The importer is `scripts/import-feishu-posts.mjs`.

1. Fetch Feishu docs with `lark-cli docs +fetch --api-version v2 --doc <token> --doc-format markdown --format json`.
2. Preserve callouts as `<Callout>`.
3. Convert `<whiteboard ... />` blocks into `<Diagram>` when the PNG exists or can be exported.
4. Convert failed whiteboard exports into `<MissingDiagram>` with the expected local path.
5. Preserve fenced code, Markdown tables, and math blocks while escaping unsafe MDX text.
6. Preserve `tldr`, `audience`, and `takeaways` frontmatter for article headers.

Whiteboard PNG export is enabled by default. To fetch article Markdown without attempting whiteboard image export:

```bash
FEISHU_EXPORT_WHITEBOARDS=0 node scripts/import-feishu-posts.mjs
```

If export is enabled, the script calls:

```bash
lark-cli whiteboard +query \
  --whiteboard-token "<whiteboard-token>" \
  --output_as image \
  --output public/images/posts/[slug]/diagram-xx-name.png \
  --overwrite
```

When SVG or PDF source is available, place it under `public/diagrams/posts/[slug]/` and reference the bare filename with `type="svg"` or `type="pdf"` as needed.
