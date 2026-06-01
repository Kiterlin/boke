## Stage 1: Project Foundation
**Goal**: Create a runnable Next.js App Router project with TypeScript, Tailwind CSS v4, shadcn/ui-style primitives, Motion, and MDX dependencies.
**Success Criteria**: Dependencies and config files exist; app shell compiles.
**Tests**: `npm run lint`, `npm run build`.
**Status**: Complete

## Stage 2: Content System
**Goal**: Load local Markdown/MDX posts from `content/posts`, derive metadata, reading time, tags, categories, table of contents, adjacent posts, RSS, and sitemap.
**Success Criteria**: Home, post list, detail, tags/categories, RSS, and sitemap all read from local files.
**Tests**: Build-time route generation; browser checks for `/blog`, `/blog/[slug]`, `/rss.xml`, `/sitemap.xml`.
**Status**: Complete

## Stage 3: Experience & Visual Quality
**Goal**: Ship a polished enterprise-grade blog interface with responsive layout, dark mode, motion, search, 404, and accessible navigation.
**Success Criteria**: Core pages are visually coherent on desktop/mobile and dark/light themes.
**Tests**: Playwright checks for navigation, search, mobile menu, theme toggle, and meta tags.
**Status**: Complete

## Stage 4: Verification & Delivery
**Goal**: Run local server, verify required pages and feeds, fix issues, and document usage/deployment.
**Success Criteria**: Commands pass and final report covers stack, commands, structure, implementation, test results, and deployment.
**Tests**: `npm run build`; Playwright smoke tests.
**Status**: In Progress

## Stage 5: Research & Project Source Review
**Goal**: Extract paper and project facts from local IF/ICRA materials, resume LaTeX, and Feishu Wiki docs.
**Success Criteria**: Key paper titles, contributions, metrics, and project architecture points are available for page copy.
**Tests**: Manual source cross-check against PDFs, TeX, resume, and fetched Wiki docs.
**Status**: Complete

## Stage 6: Papers & Projects Pages
**Goal**: Add polished `/papers` and `/projects` pages and expose them in the site navigation.
**Success Criteria**: Pages render responsive research/project showcases with concrete metrics, visual assets, and clear links between sections.
**Tests**: `npm run lint`, `npm run typecheck`, `npm run build`.
**Status**: Complete

## Stage 7: Visual Verification
**Goal**: Run the site locally and validate the new pages in browser automation.
**Success Criteria**: Desktop and mobile views load without layout breakage; major content and images are visible.
**Tests**: Browser automation DOM checks, image natural-size checks, and mobile overflow checks for `/papers` and `/projects`.
**Status**: Complete
