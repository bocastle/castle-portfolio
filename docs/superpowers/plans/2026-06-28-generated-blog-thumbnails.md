# Generated Blog Thumbnails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the repeated blog thumbnail look with generated, permanent, CDN-served thumbnails for the most visible portfolio writing.

**Architecture:** Store final thumbnail assets under `public/images/blog/generated/` and expose them through Vercel CDN. Add a small `pageId` mapping module in the blog API layer so GitHub Markdown, GitHub logs, and Notion articles can all prefer permanent generated thumbnails without changing each source module.

**Tech Stack:** Next.js App Router, TypeScript, Jest, `next/image`, static assets in `public/`, Vercel CDN.

---

## File Structure

- Create: `public/images/blog/generated/*.webp`
  - Generated 16:9 thumbnail assets.
- Create: `src/app/(blogLayout)/api/blog-thumbnails.ts`
  - Owns `pageId -> generated thumbnail URL` mapping and helper functions.
- Modify: `src/app/(blogLayout)/api/blog.ts`
  - Applies generated thumbnails in the facade for list, category, and header data.
- Create: `__tests__/blog-thumbnails.test.ts`
  - Verifies direct mapping and helper behavior.
- Modify: `__tests__/blog-api.test.ts`
  - Verifies public facade applies generated thumbnails to GitHub Markdown items.

## Target Articles

First implementation targets the 2 GitHub Markdown posts and all 21 GitHub logs posts:

- `github-fullstack-service-ops`
- `github-codex-portfolio-qa`
- `logs-cicd-pipeline`
- `logs-api-gateway`
- `logs-cors`
- `logs-db-replication`
- `logs-jpa-n-plus-one`
- `logs-database-index`
- `logs-spring-transaction-aop`
- `logs-external-service-failure`
- `logs-rate-limiting`
- `logs-optimistic-pessimistic-lock`
- `logs-spring-next-cache`
- `logs-react-query-server-state`
- `logs-ssr-csr`
- `logs-browser-rendering`
- `logs-react-error-boundary`
- `logs-nextjs-architecture`
- `logs-web-accessibility`
- `logs-zendesk-i18n-js`
- `logs-testable-code`
- `logs-async-mutex`
- `logs-goroutine`

## Task 1: Add Thumbnail Mapping Tests

**Files:**
- Create: `__tests__/blog-thumbnails.test.ts`

- [x] **Step 1: Write the failing mapping test**

```typescript
/**
 * @jest-environment node
 */
import {
  getGeneratedBlogThumbnailUrl,
  withGeneratedBlogThumbnail,
  withGeneratedBlogThumbnailForPageId,
} from "../src/app/(blogLayout)/api/blog-thumbnails";

describe("generated blog thumbnails", () => {
  it("returns permanent generated thumbnail URLs for selected page ids", () => {
    expect(getGeneratedBlogThumbnailUrl("logs-cicd-pipeline")).toBe(
      "/images/blog/generated/logs-cicd-pipeline.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("github-fullstack-service-ops")).toBe(
      "/images/blog/generated/github-fullstack-service-ops.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("unknown-page")).toBeUndefined();
  });

  it("keeps the original article when no generated thumbnail exists", () => {
    const article = {
      pageId: "notion-page",
      thumbnailUrl: "https://example.com/notion.png",
      title: "Notion article",
    };

    expect(withGeneratedBlogThumbnail(article)).toBe(article);
  });

  it("replaces article and header thumbnails when a generated thumbnail exists", () => {
    const article = {
      pageId: "logs-cicd-pipeline",
      thumbnailUrl: "/images/blog/logs/backend.svg",
      title: "CI/CD",
    };
    const header = {
      title: "CI/CD",
      thumbnailUrl: "/images/blog/logs/backend.svg",
      blurDataUrl: "/images/blog/logs/backend.svg",
    };

    expect(withGeneratedBlogThumbnail(article)).toMatchObject({
      thumbnailUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
    });
    expect(
      withGeneratedBlogThumbnailForPageId("logs-cicd-pipeline", header)
    ).toMatchObject({
      thumbnailUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
      blurDataUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
    });
  });
});
```

- [x] **Step 2: Run the test to verify it fails**

Run:

```powershell
node .\node_modules\jest\bin\jest.js __tests__/blog-thumbnails.test.ts --runInBand
```

Expected: FAIL because `blog-thumbnails.ts` does not exist yet.

## Task 2: Implement Thumbnail Mapping

**Files:**
- Create: `src/app/(blogLayout)/api/blog-thumbnails.ts`

- [x] **Step 1: Add the mapping implementation**

```typescript
type ThumbnailOwner = {
  thumbnailUrl: string;
  blurDataUrl?: string;
};

const GENERATED_BLOG_THUMBNAILS = {
  "github-fullstack-service-ops":
    "/images/blog/generated/github-fullstack-service-ops.webp",
  "github-codex-portfolio-qa":
    "/images/blog/generated/github-codex-portfolio-qa.webp",
  "logs-cicd-pipeline": "/images/blog/generated/logs-cicd-pipeline.webp",
  "logs-api-gateway": "/images/blog/generated/logs-api-gateway.webp",
  "logs-jpa-n-plus-one": "/images/blog/generated/logs-jpa-n-plus-one.webp",
  "logs-external-service-failure":
    "/images/blog/generated/logs-external-service-failure.webp",
  "logs-spring-next-cache":
    "/images/blog/generated/logs-spring-next-cache.webp",
  "logs-react-query-server-state":
    "/images/blog/generated/logs-react-query-server-state.webp",
} as const;

export type GeneratedBlogThumbnailPageId =
  keyof typeof GENERATED_BLOG_THUMBNAILS;

export const getGeneratedBlogThumbnailUrl = (pageId: string) =>
  GENERATED_BLOG_THUMBNAILS[pageId as GeneratedBlogThumbnailPageId];

export const withGeneratedBlogThumbnailForPageId = <T extends ThumbnailOwner>(
  pageId: string,
  item: T
): T => {
  const thumbnailUrl = getGeneratedBlogThumbnailUrl(pageId);

  if (!thumbnailUrl) {
    return item;
  }

  return {
    ...item,
    thumbnailUrl,
    ...("blurDataUrl" in item ? { blurDataUrl: thumbnailUrl } : {}),
  } as T;
};

export const withGeneratedBlogThumbnail = <
  T extends ThumbnailOwner & { pageId: string },
>(
  item: T
) => withGeneratedBlogThumbnailForPageId(item.pageId, item);
```

- [x] **Step 2: Run the mapping test**

Run:

```powershell
node .\node_modules\jest\bin\jest.js __tests__/blog-thumbnails.test.ts --runInBand
```

Expected: PASS.

## Task 3: Apply Mapping In Blog Facade

**Files:**
- Modify: `src/app/(blogLayout)/api/blog.ts`
- Modify: `__tests__/blog-api.test.ts`

- [x] **Step 1: Add a failing facade test**

Add assertions to the existing GitHub Markdown facade test:

```typescript
const pageList = await blogApi.getPageList();
const fullstackArticle = pageList.find(
  (article) => article.pageId === "github-fullstack-service-ops"
);

expect(fullstackArticle?.thumbnailUrl).toBe(
  "/images/blog/generated/github-fullstack-service-ops.webp"
);
await expect(
  blogApi.fetchArticlePageHeaderData("github-fullstack-service-ops")
).resolves.toMatchObject({
  thumbnailUrl: "/images/blog/generated/github-fullstack-service-ops.webp",
});
```

- [x] **Step 2: Run the facade test to verify it fails**

Run:

```powershell
node .\node_modules\jest\bin\jest.js __tests__/blog-api.test.ts --runInBand
```

Expected: FAIL because `blog.ts` has not applied the mapping yet.

- [x] **Step 3: Apply generated thumbnails in `blog.ts`**

Use these imports:

```typescript
import {
  withGeneratedBlogThumbnail,
  withGeneratedBlogThumbnailForPageId,
} from "./blog-thumbnails";
```

Apply the helper to merged lists and headers:

```typescript
return sortArticleList([
  ...withSource(notionPageList, "notion"),
  ...withSource(githubPageList, "github"),
  ...withSource(githubLogsPageList, "github"),
]).map(withGeneratedBlogThumbnail);
```

For headers:

```typescript
return withGeneratedBlogThumbnailForPageId(
  pageId,
  await githubLogsBlogSource.fetchArticlePageHeaderData(pageId)
);
```

- [x] **Step 4: Run the facade tests**

Run:

```powershell
node .\node_modules\jest\bin\jest.js __tests__/blog-api.test.ts __tests__/blog-thumbnails.test.ts --runInBand
```

Expected: PASS.

## Task 4: Generate And Save Image Assets

**Files:**
- Create: `public/images/blog/generated/github-fullstack-service-ops.webp`
- Create: `public/images/blog/generated/github-codex-portfolio-qa.webp`
- Create: `public/images/blog/generated/logs-cicd-pipeline.webp`
- Create: `public/images/blog/generated/logs-api-gateway.webp`
- Create: `public/images/blog/generated/logs-cors.webp`
- Create: `public/images/blog/generated/logs-db-replication.webp`
- Create: `public/images/blog/generated/logs-jpa-n-plus-one.webp`
- Create: `public/images/blog/generated/logs-database-index.webp`
- Create: `public/images/blog/generated/logs-spring-transaction-aop.webp`
- Create: `public/images/blog/generated/logs-external-service-failure.webp`
- Create: `public/images/blog/generated/logs-rate-limiting.webp`
- Create: `public/images/blog/generated/logs-optimistic-pessimistic-lock.webp`
- Create: `public/images/blog/generated/logs-spring-next-cache.webp`
- Create: `public/images/blog/generated/logs-react-query-server-state.webp`
- Create: `public/images/blog/generated/logs-ssr-csr.webp`
- Create: `public/images/blog/generated/logs-browser-rendering.webp`
- Create: `public/images/blog/generated/logs-react-error-boundary.webp`
- Create: `public/images/blog/generated/logs-nextjs-architecture.webp`
- Create: `public/images/blog/generated/logs-web-accessibility.webp`
- Create: `public/images/blog/generated/logs-zendesk-i18n-js.webp`
- Create: `public/images/blog/generated/logs-testable-code.webp`
- Create: `public/images/blog/generated/logs-async-mutex.webp`
- Create: `public/images/blog/generated/logs-goroutine.webp`

- [x] **Step 1: Generate images using the image generation tool**

Use one prompt per target. All prompts must include:

```text
16:9 landscape blog thumbnail, dark technical editorial style, polished abstract 3D/isometric technical concept, central safe composition for mobile, no readable text, no logos, no watermark, no people, deep navy and charcoal with teal/cyan/amber accents.
```

- [x] **Step 2: Save the final generated files into the project**

Place final files under:

```text
public/images/blog/generated/
```

- [x] **Step 3: Verify all mapped assets exist**

Run:

```powershell
Get-ChildItem .\public\images\blog\generated\*.webp | Select-Object Name,Length
```

Expected: 23 files with non-zero sizes.

## Task 5: Build And Browser QA

**Files:**
- Read-only verification.

- [x] **Step 1: Run TypeScript and Jest checks**

Run:

```powershell
node .\node_modules\typescript\bin\tsc --noEmit
node .\node_modules\jest\bin\jest.js __tests__/blog-api.test.ts __tests__/blog-thumbnails.test.ts __tests__/blog-list.test.jsx --runInBand
```

Expected: PASS.

- [x] **Step 2: Run production build**

Run:

```powershell
node .\node_modules\next\dist\bin\next build
```

Expected: PASS.

- [x] **Step 3: Verify `/blog` desktop and mobile**

Run the local app and inspect:

- Desktop: first screen thumbnails are not repeated backend cards.
- Mobile 390px and 430px: center subjects are not cropped badly.
- No broken images.

## Task 6: Commit And Sync Branches

**Files:**
- All implementation files and generated assets.

- [x] **Step 1: Review diff**

Run:

```powershell
git status -sb
git diff --stat
```

- [x] **Step 2: Commit**

Run:

```powershell
git add __tests__/blog-api.test.ts __tests__/blog-thumbnails.test.ts src/app/(blogLayout)/api/blog.ts src/app/(blogLayout)/api/blog-thumbnails.ts public/images/blog/generated docs/superpowers/plans/2026-06-28-generated-blog-thumbnails.md
git commit -m "Add generated blog thumbnails"
```

- [x] **Step 3: Push `dev`, fast-forward `main`, push `main`, return to `dev`**

Run:

```powershell
git push origin dev
git checkout main
git merge --ff-only dev
git push origin main
git checkout dev
git status -sb
```

Expected: `origin/main` and `origin/dev` point to the same final commit.
