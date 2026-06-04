# GitHub Markdown 블로그와 QA 자동화 핸드오프

## 세 줄 요약

- `api/blog.ts` facade가 Notion 글과 GitHub Markdown 글을 하나의 블로그 목록으로 병합하도록 확장되었다.
- GitHub Markdown 글은 `public/markdown/blog/*.md`에 frontmatter와 본문을 두면 `/blog/github-...` 상세 페이지로 노출된다.
- 로컬 Notion env가 없거나 token이 invalid여도 상세 페이지가 500으로 터지지 않도록 fallback을 반환하고, Playwright 기반 브라우저 QA 명령을 추가했다.

## 작업 브랜치

- 브랜치: `feature/github-markdown-qa-env`
- 기준 브랜치: `dev`

## GitHub Markdown 글 규칙

기본 글 위치:

`public/markdown/blog/*.md`

파일명은 pageId의 기반이 된다.

- 예: `codex-portfolio-qa.md`
- 생성 pageId: `github-codex-portfolio-qa`
- 접근 URL: `/blog/github-codex-portfolio-qa`

frontmatter 규칙:

```markdown
---
title: "글 제목"
description: "글 설명"
createdAt: "2026-06-04"
updatedAt: "2026-06-04"
category:
  - "AI 개발"
tags:
  - "Codex"
  - "QA"
thumbnailUrl: "/images/projects/castlecms/dashboard-posts-media.png"
releasable: true
---
```

규칙:

- `title`과 `createdAt`이 없으면 글 목록에서 제외된다.
- `releasable: false`이면 글 목록에서 제외된다.
- `updatedAt`이 없으면 `createdAt`을 사용한다.
- `thumbnailUrl`이 없으면 기본 공개 이미지를 사용한다.
- `category`, `tags`는 YAML 배열 형식과 인라인 배열 형식을 모두 지원한다.

## 블로그 facade 동작

변경 파일:

- `src/app/(blogLayout)/api/blog.ts`
- `src/app/(blogLayout)/api/github-markdown.ts`
- `src/app/(blogLayout)/api/types.ts`

동작:

- `getPageList`는 Notion 글과 GitHub Markdown 글을 병합하고 `createdAt` 기준 최신순으로 정렬한다.
- `getArticleCategoryList`, `getArticleTagList`는 두 출처의 카테고리/태그를 병합하고 이름 중복을 제거한다.
- `getCategoryList`는 병합된 목록에서 category 이름 기준으로 다시 필터링한다.
- `github-`로 시작하는 pageId는 Notion을 거치지 않고 GitHub Markdown 소스에서 상세/본문/footer를 읽는다.
- Notion 상세/본문/footer 조회가 실패하면 fallback header/content/footer를 반환해 로컬 상세 페이지 500을 방지한다.

## 로컬 Notion env 정리

로컬에서 Notion 글을 실제로 확인하려면 `.env`에 아래 값이 필요하다.

```text
NOTION_SECRET=...
NOTION_DATABASE_ID=...
```

env가 없거나 token이 invalid인 경우:

- Notion 목록은 빈 목록으로 처리된다.
- GitHub Markdown 글은 계속 노출된다.
- Notion 상세 URL로 직접 접근하면 fallback 제목과 안내 본문이 렌더링된다.
- 배포 환경과 로컬 환경의 env 차이가 있어도 빌드가 깨지지 않아야 한다.

## 브라우저 QA 자동화

추가 파일:

- `playwright.config.ts`
- `e2e/portfolio-browser-qa.spec.ts`
- `tools/browser-qa.cjs`

명령:

```powershell
npm.cmd run qa:browser
```

`qa:browser`는 기본적으로 `127.0.0.1:3100`에서 Next dev 서버를 띄우고, QA 종료 후 서버 프로세스 트리를 정리한다.

확인 항목:

- 개인 프로젝트 탭 클릭 후 `castleCms` 표시 확인
- 이미지 썸네일 클릭 후 큰 이미지 링크 변경 확인
- 큰 이미지 클릭 후 원본 이미지가 새 창으로 열리는지 확인
- 블로그 TOC 클릭 후 heading hash로 이동하는지 확인
- 모바일 홈 화면 캡처
- 다크모드 홈 화면 캡처

기본 브라우저 채널은 `msedge`이다. 다른 채널이 필요하면 아래처럼 실행한다.

```powershell
$env:PLAYWRIGHT_BROWSER_CHANNEL="chrome"; npm.cmd run qa:browser
```

이미 실행 중인 서버를 쓰려면 `QA_BASE_URL`을 지정한다. 이 경우 스크립트는 서버를 새로 띄우지 않는다.

```powershell
$env:QA_BASE_URL="http://127.0.0.1:3000"; npm.cmd run qa:browser
```

## 남은 참고사항

- Playwright는 `@playwright/test` devDependency를 사용한다.
- 브라우저 바이너리는 별도 다운로드 대신 로컬 Edge/Chrome 채널을 우선 사용한다.
- 브라우저 QA 결과 캡처는 Playwright output 경로에 생성되며 커밋 대상이 아니다.
