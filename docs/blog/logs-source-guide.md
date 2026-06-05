## 세 줄 요약

- `bocastle/logs` 저장소의 글은 frontmatter가 없으므로 포트폴리오에서는 별도 어댑터로 대표글 메타데이터를 관리한다.
- 목록과 카테고리는 로컬 메타데이터로 만들고, 상세 본문은 GitHub raw Markdown을 가져와 렌더링한다.
- 공개 범위는 `src/app/(blogLayout)/api/github-logs.ts`의 `LOGS_ARTICLES` 배열에서 관리한다.

# GitHub logs 글 소스 운영 가이드

## 목적

`bocastle/logs` 저장소에는 면접 준비, 운영, 백엔드, 프론트엔드, JavaScript, Go 글이 많이 있다.

다만 원본 글에는 포트폴리오 블로그가 요구하는 frontmatter가 없으므로, 포트폴리오에서는 선별된 글만 메타데이터를 붙여 공개한다.

## 구조

```text
src/app/(blogLayout)/api/github-logs.ts
```

이 파일에서 다음을 관리한다.

- 공개할 원본 Markdown 경로
- 포트폴리오 URL slug
- 블로그 목록 제목
- 설명 문구
- 공개일
- 카테고리
- 태그
- 카테고리별 썸네일

본문은 아래 형식의 raw URL에서 읽는다.

```text
https://raw.githubusercontent.com/bocastle/logs/main/<path>
```

## URL 규칙

`slug` 앞에 `logs-` prefix가 붙는다.

```text
slug: "jpa-n-plus-one"
=> /blog/logs-jpa-n-plus-one
```

기존 로컬 Markdown 글은 `/blog/github-...`를 사용하고, `logs` 저장소 글은 `/blog/logs-...`를 사용한다.

## 썸네일 규칙

카테고리별 기본 썸네일은 아래 경로에 둔다.

```text
public/images/blog/logs/backend.svg
public/images/blog/logs/frontend.svg
public/images/blog/logs/devops.svg
public/images/blog/logs/javascript.svg
public/images/blog/logs/go.svg
```

대표글을 더 강하게 보여주고 싶을 때는 개별 썸네일을 추가하고 해당 글의 `thumbnailUrl`만 바꾼다.

## 공개 기준

처음 공개하는 글은 채용 포트폴리오 관점에서 아래 기준을 우선한다.

- 운영, 배포, 장애 대응, 캐시, 인증, DB, 트랜잭션처럼 실무 신뢰를 주는 글
- 프론트엔드와 백엔드 연결 흐름을 보여주는 글
- 테스트, E2E, 접근성, 성능 최적화처럼 품질 감각을 보여주는 글

알고리즘 풀이, 짧은 메모, 중복 주제는 바로 공개하지 않고 나중에 아카이브나 검색 페이지가 준비되면 다시 검토한다.

## 추가 절차

새 글을 공개할 때는 다음 순서로 진행한다.

1. `bocastle/logs`에서 원본 Markdown 경로를 확인한다.
2. `LOGS_ARTICLES`에 메타데이터를 추가한다.
3. `slug`가 기존 글과 겹치지 않는지 확인한다.
4. `npm.cmd test -- --runTestsByPath __tests__/github-logs-blog.test.ts --runInBand`를 실행한다.
5. 상세 URL이 열리고 TOC가 생성되는지 브라우저 QA로 확인한다.

## 현재 공개 묶음

현재는 대표글 21개를 공개한다.

- Backend: CI/CD, API Gateway, CORS, DB Replication, JPA N+1, 인덱스, Spring Transaction, 외부 서비스 장애 대응, Rate Limiting, Lock
- Frontend: React Query, SSR/CSR, 브라우저 렌더링, React Error Boundary, Spring Boot와 Next.js 캐시, Next.js 아키텍처, 웹 접근성
- DevOps: Zendesk i18n, 테스트하기 쉬운 코드
- JavaScript: async-mutex
- Go: goroutine

홈의 `대표 글` 섹션은 이 중 채용 근거가 강한 6개만 먼저 보여준다.

- 운영/배포: CI/CD 파이프라인 정리
- 장애 대응: 외부 서비스 장애 대응 전략 정리
- 성능/DB: JPA N+1 문제
- 풀스택 연결: Spring Boot와 Next.js 캐시 정리
- 품질/테스트: 테스트하기 쉬운 코드의 조건
- AI QA: Codex로 포트폴리오 QA 자동화하기
