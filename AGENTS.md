# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router blog built with TypeScript, MDX, and Tailwind CSS.

- `app/` contains routes, layouts, metadata routes, RSS, sitemap, and global styles.
- `components/` contains reusable React components; `components/ui/` holds shared UI primitives.
- `content/posts/` contains MDX blog posts. The filename becomes the post slug.
- `lib/` contains content parsing, metadata, site configuration, and utility helpers.
- `public/` stores static assets served from the site root.
- `artifacts/` is for generated previews or local output; do not import app code from it.

## Build, Test, and Development Commands

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates the production build and validates static generation.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs ESLint across the repository.
- `npm run typecheck` runs TypeScript with `tsc --noEmit`.

Run `npm run lint` and `npm run typecheck` before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React Server Components by default. Add `"use client"` only for components that need browser APIs, state, effects, or event handlers. Use two-space indentation and double quotes, matching the existing code.

Use `PascalCase` for React components, `camelCase` for functions and variables, and lowercase kebab-case for route folders and MDX filenames, for example `content/posts/seo-basics-for-expert-blogs.mdx`.

Prefer the `@/` path alias for local imports. Keep UI primitives in `components/ui/`, page-specific composition in route files, and content logic in `lib/`.

## Testing Guidelines

There is no dedicated test runner configured yet. Treat linting, type checking, and `next build` as the current quality gate. If adding tests later, place them near the feature or in a clear test directory, name files `*.test.ts` or `*.test.tsx`, and document the new command in `package.json`.

## Commit & Pull Request Guidelines

Recent history uses concise Conventional Commit-style messages such as `docs: ...`, `docs(thesis): ...`, and `chore: ...`. Follow that pattern: `type(scope): summary`, with the scope optional.

Pull requests should include a short description, validation commands run, linked issues when relevant, and screenshots for visible UI changes. For MDX posts, mention new slugs, categories, and tags.

## Content & Configuration Notes

Every MDX post needs frontmatter fields used by listing, search, RSS, and sitemap generation: `title`, `description`, `date`, `category`, `tags`, `author`, and optionally `featured`. Keep secrets out of committed config files and prefer environment variables for deployment-specific values.
