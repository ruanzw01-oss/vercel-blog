# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal knowledge base (知识库) built with **Next.js 16 + Nextra v4 + nextra-theme-docs**. Content is written in Chinese. Deployed on Vercel.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint (next core-web-vitals + typescript)

## Architecture

### Nextra v4 File-System Routing

All pages are driven by files in `content/`. Nextra's catch-all route (`app/[[...mdxPath]]/page.tsx`) maps content files to URLs automatically:

- `content/index.mdx` → `/`
- `content/tech/frontend.md` → `/tech/frontend`
- `content/finance/dual-momentum.md` → `/finance/dual-momentum`

The App Router has only three files: the catch-all page, `layout.tsx` (theme configuration, navbar, footer, sidebar settings), and `globals.css`.

### Navigation via `_meta` Files

Each content directory has a `_meta.json` or `_meta.tsx` that controls sidebar order and display names.

- **`_meta.json`** — Simple key-value mapping of filename to display title (used in most subdirectories)
- **`_meta.tsx`** — JSX-enabled, used at root and `tech/` level to render lucide-react icons alongside nav titles

When adding a new page, you **must** register it in the corresponding `_meta` file or it won't appear in navigation.

### Content Sections

Five top-level sections defined in `content/_meta.tsx`: tech, finance, reading, social, thoughts. Each has its own subdirectory with `index.md` as the landing page.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js` — v4 convention)
- Custom theme styles in `app/globals.css` (gradient effects, card hover animations, dark mode, scrollbar, sidebar highlights)
- Icons: `lucide-react` (primary) and `react-icons` (tech brand icons like SiReact, SiSpring)

### Key Configuration

- `next.config.mjs`: Nextra wraps Next.js config; enables `latex: true` and `defaultShowCopyCode: true`
- `mdx-components.tsx`: Extends nextra-theme-docs components; add custom MDX components here
- `app/layout.tsx`: Theme layout — navbar (gradient logo), footer, sidebar (collapse level 1), TOC with back-to-top

## Adding Content

1. Create a `.md` or `.mdx` file in the appropriate `content/` subdirectory (kebab-case filename)
2. Add the file's key and Chinese display title to the directory's `_meta.json` or `_meta.tsx`
3. For a new section landing page, use `index.md`
4. For nested subsections (like `tech/backend/`), create a subdirectory with its own `_meta.json` and `index.md`

## Conventions

- Content language is Chinese; UI labels and nav titles are in Chinese
- Section index pages use Nextra `Cards` component for navigation grids
- `_meta.tsx` files at root and tech level use colored lucide-react icons per category (blue=tech, emerald=finance, amber=reading, rose=social, purple=thoughts)
- LaTeX math is supported in all content files
