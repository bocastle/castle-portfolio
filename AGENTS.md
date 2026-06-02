# AGENTS.md

## Project

This repository is the personal portfolio site for Kim Boseong.

- Framework: Next.js App Router
- Language: TypeScript, React
- Styling: Tailwind CSS
- Deployment: Vercel
- Default working branch: `dev`
- Production branch: `main`

## Branch Workflow

- Do normal agent work on `dev`.
- Push feature and cleanup commits to `dev` first.
- Merge or PR `dev` into `main` only after the user approves production release.
- `main` is expected to trigger Vercel production deployment.
- Do not switch branches, merge, or push to `main` unless the user explicitly asks.

## Safety Rules

- Do not revert user changes unless the user explicitly asks.
- Before editing, check:
  - `git status --short --branch`
  - relevant files with `rg` or `Get-Content`
- Keep changes scoped to the requested task.
- Avoid broad refactors unless they directly support the task.
- Use Korean commit messages unless the user requests otherwise.
- Do not commit or push without explicit user approval.

## Handoff Notes

Use `docs/handoff/` for ongoing work notes that future agents or sessions should continue from.

- Add or update a handoff note when work spans multiple sessions.
- Prefer one Markdown file per topic or workstream.
- Include current branch, goal, changed files, verification results, open decisions, and next steps.
- Keep handoff notes factual and concise.
- Do not put secrets, tokens, private credentials, or personal account data in handoff notes.
- If a task is complete and merged, leave a short final status instead of deleting the note.

## Common Commands

Use PowerShell on Windows.

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
```

Notes:

- `npm` may fail in PowerShell because of script execution policy. Use `npm.cmd`.
- `npm.cmd run lint` currently uses deprecated `next lint` and may open an ESLint setup prompt. Prefer `tsc`, `test`, and `build` until the lint script is migrated.
- Jest tests currently pass but may print a coverage write warning if filesystem permissions block `coverage/coverage-final.json`.

## Portfolio Structure

Home page:

- `src/app/page.tsx`
- `src/components/Information`
- `src/components/ProfileTabs`
- `src/components/WorkHistory`
- `src/components/Projects`

Work history:

- Data: `src/components/WorkHistory/data.json`
- Markdown details: `public/markdown/workHistory/*.md`

Personal projects:

- Data: `src/components/Projects/data.json`
- Component: `src/components/Projects`
- Screenshots: `public/images/projects/<project-name>/`

When adding future toy projects, prefer adding data and screenshots instead of hardcoding UI.

## Blog Structure

The blog UI should depend on the blog facade, not Notion directly.

- Facade: `src/app/(blogLayout)/api/blog.ts`
- Current source implementation: `src/app/(blogLayout)/api/notion.ts`

Rules:

- Pages and components should import blog functions from `api/blog`.
- Keep Notion-specific code inside `api/notion.ts`.
- Future GitHub Markdown support should be added behind `api/blog.ts` so the UI does not care whether a post comes from Notion or GitHub.

Important blog routes:

- List: `src/app/(blogLayout)/blog/page.tsx`
- Detail: `src/app/(blogLayout)/blog/[pageId]/page.tsx`
- Categories: `src/app/(blogLayout)/categories`

## Environment Notes

- The site should build even when Notion, Cloudinary, GTM, or GA environment variables are missing.
- Missing optional integrations should degrade gracefully instead of breaking build.
- Do not commit `.env`, local media, build output, or generated credentials.

## Verification Before Reporting Done

Before saying a change is complete, run as much as is relevant:

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
git status --short --branch
```

Report any command that could not be run and why.
