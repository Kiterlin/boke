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
