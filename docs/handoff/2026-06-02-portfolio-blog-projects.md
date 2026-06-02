# 2026-06-02 Portfolio Blog And Projects Handoff

## Current Branch

`dev`

## Goal

Keep `dev` as the default working branch for portfolio changes, while `main` remains the production release branch. Prepare the portfolio for future toy projects and GitHub-based blog content.

## Context

- `dev` was updated to match `main`.
- Personal project support was added with a `Projects` section.
- `castleCms` was added as the first personal project.
- Home now uses tabs for `경력` and `개인 프로젝트`.
- Blog access was moved behind `src/app/(blogLayout)/api/blog.ts` so future sources can be added without importing Notion directly from pages/components.

## Key Files

- `AGENTS.md`
- `src/app/page.tsx`
- `src/components/ProfileTabs/index.tsx`
- `src/components/Projects/data.json`
- `src/app/(blogLayout)/api/blog.ts`
- `src/app/(blogLayout)/api/notion.ts`
- `docs/handoff/`

## Verification

Recently verified before this handoff structure was added:

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
```

Known note: Jest may print a coverage output permission warning even when tests pass.

## Open Decisions

- Decide how GitHub-written posts will be stored:
  - local `content/blog/*.md`
  - a separate GitHub repository
  - GitHub issues/discussions
- Decide whether Vercel production deployment should remain `main` only or also preview `dev`.

## Next Steps

1. Add GitHub Markdown post loading behind `api/blog.ts`.
2. Keep Notion-specific implementation inside `api/notion.ts`.
3. Add a source-aware post type before mixing Notion and GitHub posts.
4. Commit handoff updates only after user approval.
