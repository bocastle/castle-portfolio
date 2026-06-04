# GitHub Markdown 블로그 운영 가이드

## 세 줄 요약

- GitHub Markdown 글은 `public/markdown/blog/*.md`에 frontmatter와 본문을 함께 둔다.
- 공개 URL은 기본적으로 파일명에서 만들고, `slug`를 쓰면 `/blog/github-<slug>` 형태로 고정할 수 있다.
- `releasable: false` 글은 목록과 상세 조회에서 제외하므로 초안 관리에 사용할 수 있다.

## 글 위치

Markdown 글은 아래 폴더에 둔다.

```text
public/markdown/blog/
```

파일명은 소문자 영문과 하이픈 중심으로 작성한다.

```text
fullstack-service-ops.md
codex-portfolio-qa.md
```

## frontmatter 규칙

권장 템플릿:

```md
---
title: "글 제목"
description: "목록과 상세 상단에 보일 요약"
slug: "stable-url-slug"
createdAt: "2026-06-05"
updatedAt: "2026-06-05"
category:
  - "커리어"
tags:
  - "Fullstack"
  - "운영"
thumbnailUrl: "/images/projects/castlecms/external-api-clients.png"
releasable: true
---

## 본문 첫 제목

본문을 작성합니다.
```

필수 필드:

- `title`
- `createdAt`

권장 필드:

- `description`
- `slug`
- `updatedAt`
- `category`
- `tags`
- `thumbnailUrl`
- `releasable`

## URL 규칙

`slug`가 있으면 slug를 우선 사용한다.

```text
slug: "fullstack-service-ops"
=> /blog/github-fullstack-service-ops
```

`slug`가 없으면 파일명을 사용한다.

```text
codex-portfolio-qa.md
=> /blog/github-codex-portfolio-qa
```

`github-` prefix는 코드에서 자동으로 붙인다. `slug`에 이미 `github-`를 넣은 경우에는 중복으로 붙이지 않는다.

## 운영 체크리스트

- 새 글을 추가한 뒤 `npm.cmd test -- --runInBand`를 실행한다.
- 상세 URL이 `/blog/github-<slug>`로 열리는지 확인한다.
- TOC가 필요한 글은 `##`, `###` heading을 사용한다.
- 코드블록 안의 heading 문법은 TOC에서 제외된다.
- 썸네일은 공개 경로 또는 외부 이미지 URL을 사용한다.

## 현재 공개 글

- `/blog/github-codex-portfolio-qa`
- `/blog/github-fullstack-service-ops`
