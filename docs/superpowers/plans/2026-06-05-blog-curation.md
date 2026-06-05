# Blog Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show curated writing first on `/blog`, localize blog display labels, and lock GitHub logs metadata quality.

**Architecture:** Reuse `FeaturedWriting` as the shared curated-writing component. Keep API category/tag names canonical and localize only at render boundaries through `blog-labels.ts`. Keep logs article slugs stable while polishing public metadata.

**Tech Stack:** Next.js, React, Tailwind CSS, Jest, Testing Library, Playwright.

---

### Task 1: Reuse Featured Writing On Blog

**Files:**
- Modify: `src/components/FeaturedWriting/index.tsx`
- Modify: `src/app/(blogLayout)/blog/page.tsx`
- Test: `__tests__/featured-writing.test.jsx`
- Test: `__tests__/blog-page.test.jsx`

- [x] Export the curated writing list and add copy props to `FeaturedWriting`.
- [x] Render `FeaturedWriting` at the top of `/blog`.
- [x] Add `전체 글` / `글 목록` heading before the full list.
- [x] Test exact six hrefs and ordering before the all-article list.

### Task 2: Localize Category And Tag Display

**Files:**
- Create: `src/utils/blog-labels.ts`
- Modify: `src/app/(blogLayout)/components/ArticleCategory/index.tsx`
- Modify: `src/components/ArticleTagList/index.tsx`
- Modify: `src/components/BlogList/index.tsx`
- Modify: `src/components/BlogHeader/index.tsx`
- Test: `__tests__/blog-labels.test.ts`
- Test: `__tests__/article-category.test.jsx`
- Test: `__tests__/article-tag-list.test.jsx`

- [x] Add display-only category and tag label helpers.
- [x] Keep category URLs and tag filter objects canonical.
- [x] Cover category links and tag filter calls with tests.

### Task 3: Review GitHub Logs Quality

**Files:**
- Modify: `src/app/(blogLayout)/api/github-logs.ts`
- Modify: `src/app/(blogLayout)/categories/[categoriesName]/page.tsx`
- Create: `docs/blog/logs-quality-review.md`
- Modify: `docs/blog/logs-source-guide.md`
- Test: `__tests__/github-logs-blog.test.ts`
- Test: `__tests__/category-page.test.ts`

- [x] Polish titles that still read like raw interview notes.
- [x] Document the 21-public-article review result.
- [x] Fix category static params to use categories rather than tags.
- [x] Test metadata quality and category route params.

### Task 4: Verify

- [x] Run `npm.cmd test -- --runInBand`.
- [x] Run `npm.cmd run build`.
- [x] Run `npm.cmd exec tsc -- --noEmit`.
- [x] Run `npm.cmd run qa:browser`.
